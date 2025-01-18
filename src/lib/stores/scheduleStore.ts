import { writable } from 'svelte/store';

// Typy dla modelu danych
interface Timeslot {
 id: string;
 dayOfWeek: string;
 startTime: string;
 endTime: string;
}

interface Room {
 id: string;
 name: string;
}

interface Lesson {
 id: string;
 subject: string;
 teacher: string;
 studentGroup: string;
 timeslot: string | null;
 room: string | null;
}

interface Schedule {
 rooms: Room[];
 timeslots: Timeslot[];
 lessons: Lesson[];
 score: string | null;
 solverStatus: string | null;
}

interface ScoreComponent {
 hard: number;
 medium: number;
 soft: number;
}

interface ConstraintMatch {
 justification: {
  description: string;
 };
}

interface ConstraintAnalysis {
 name: string;
 weight: string;
 score: string;
 matches: ConstraintMatch[];
 type?: 'hard' | 'medium' | 'soft';
 implicitScore?: number;
}

interface ScoreAnalysis {
 constraints: ConstraintAnalysis[];
}

interface ScheduleState {
 schedule: Schedule | null;
 solving: boolean;
 demoDataId: string | null;
 scheduleId: string | null;
 authtoken: string | null;
 error: string | null;
 autoRefreshInterval: number | null;
}

// Store factory
function createScheduleSolver() {
 const initialState: ScheduleState = {
  schedule: null,
  solving: false,
  demoDataId: null,
  scheduleId: null,
  authtoken: null,
  error: null,
  autoRefreshInterval: null
 };

 const { subscribe, set, update } = writable<ScheduleState>(initialState);

 const store = {
  subscribe,

  async initialize(authtoken: string): Promise<void> {
   try {
    const response = await fetch('https://backend.kebson.fun/demo-data', {
     method: "GET",
     headers: {'Authorization': `Bearer ${authtoken}`}
    });
    const data: string[] = await response.json();
    if (data && data.length > 0) {
     await this.setDemoData(data[0], authtoken);
    }
   } catch {
    this.setError('Failed to fetch demo data');
   }
  },

  async setDemoData(demoId: string, authtoken: string): Promise<void> {
   update(state => ({ ...state, demoDataId: demoId, scheduleId: null, authtoken: authtoken}));
   await this.refreshSchedule();
  },

  async refreshSchedule(): Promise<void> {
   try {
    update(state => ({ ...state, error: null }));

    const state = getState();
    if (!state.demoDataId && !state.scheduleId && !state.authtoken) return;

    const path = state.scheduleId
     ? `https://backend.kebson.fun/timetables/${state.scheduleId}`
     : `https://backend.kebson.fun/demo-data/${state.demoDataId}`;

    const response = await fetch(path, {
     method: "GET",
     headers: {'Authorization': `Bearer ${state.authtoken}`}
    });
    const schedule: Schedule = await response.json();

    update(s => ({
     ...s,
     schedule,
     solving: schedule.solverStatus !== null &&
      schedule.solverStatus !== "NOT_SOLVING"
    }));

    if (schedule.solverStatus !== null &&
     schedule.solverStatus !== "NOT_SOLVING" &&
     !state.autoRefreshInterval) {
     this.startAutoRefresh();
    } else if ((schedule.solverStatus === null ||
      schedule.solverStatus === "NOT_SOLVING") &&
     state.autoRefreshInterval) {
     this.stopAutoRefresh();
    }
   } catch {
    this.setError('Failed to refresh schedule');
    this.stopAutoRefresh();
   }
  },

  async solve(): Promise<void> {
   try {
    const state = getState();
    if (!state.schedule) return;

    const response = await fetch('https://backend.kebson.fun/timetables', {
     method: 'POST',
     headers: {
      'Content-Type': 'application/json',
      'Accept': 'text/plain',
      'Authorization': `Bearer ${state.authtoken}`
     },
     body: JSON.stringify(state.schedule)
    });

    const scheduleId = await response.text();
    update(s => ({ ...s, scheduleId, solving: true }));
    this.startAutoRefresh();
   } catch {
    this.setError('Failed to start solving');
   }
  },

  async stopSolving(): Promise<void> {
   try {
    const state = getState();
    if (!state.scheduleId) return;

    await fetch(`https://backend.kebson.fun/timetables/${state.scheduleId}`, {
     method: 'DELETE',
     headers: {
      'Authorization': `Bearer ${state.authtoken}`
     },
    });

    this.stopAutoRefresh();
    update(s => ({ ...s, solving: false }));
    await this.refreshSchedule();
   } catch {
    this.setError('Failed to stop solving');
   }
  },

  async analyzeSchedule(): Promise<ScoreAnalysis | null> {
   try {
    const state = getState();
    if (!state.schedule || !state.schedule.score ||
     state.schedule.score.includes('init')) {
     return null;
    }

    const response = await fetch('https://backend.kebson.fun/timetables/analyze', {
     method: 'PUT',
     headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${state.authtoken}`
     },
     body: JSON.stringify(state.schedule)
    });

    const analysis: ScoreAnalysis = await response.json();

    const constraints = analysis.constraints
     .map(constraint => {
      const components = getScoreComponents(constraint.weight);
      return {
       ...constraint,
       type: components.hard !== 0 ? 'hard' as const :
        components.medium !== 0 ? 'medium' as const : 'soft' as const,
       implicitScore: getImplicitScore(constraint.score)
      };
     })
     .sort(compareConstraints);

    return { ...analysis, constraints };
   } catch {
    this.setError('Failed to analyze schedule');
    return null;
   }
  },

  setError(message: string): void {
   update(s => ({ ...s, error: message }));
  },

  startAutoRefresh(): void {
   update(state => {
    if (state.autoRefreshInterval) {
     clearInterval(state.autoRefreshInterval);
    }
    const interval = setInterval(() => this.refreshSchedule(), 2000);
    return { ...state, autoRefreshInterval: interval };
   });
  },

  stopAutoRefresh(): void {
   update(state => {
    if (state.autoRefreshInterval) {
     clearInterval(state.autoRefreshInterval);
    }
    return { ...state, autoRefreshInterval: null, solving: false };
   });
  },

  reset(): void {
   this.stopAutoRefresh();
   set(initialState);
  }
 };

 function getState(): ScheduleState {
  let currentState: ScheduleState;
  store.subscribe(state => {
   currentState = state;
  })();
  return currentState!;
 }

 function getScoreComponents(score: string): ScoreComponent {
  const components: ScoreComponent = { hard: 0, medium: 0, soft: 0 };
  const matches = score.matchAll(/(-?[0-9]+)(hard|medium|soft)/g);
  for (const match of Array.from(matches)) {
   components[match[2] as keyof ScoreComponent] = parseInt(match[1], 10);
  }
  return components;
 }

 function getImplicitScore(score: string): number {
  const components = getScoreComponents(score);
  return components.hard !== 0 ? components.hard :
   components.medium !== 0 ? components.medium :
    components.soft;
 }

 function compareConstraints(a: ConstraintAnalysis, b: ConstraintAnalysis): number {
  const aComponents = getScoreComponents(a.score);
  const bComponents = getScoreComponents(b.score);

  if (aComponents.hard < 0 && bComponents.hard > 0) return -1;
  if (aComponents.hard > 0 && bComponents.hard < 0) return 1;
  if (Math.abs(aComponents.hard) > Math.abs(bComponents.hard)) return -1;

  if (aComponents.medium < 0 && bComponents.medium > 0) return -1;
  if (aComponents.medium > 0 && bComponents.medium < 0) return 1;
  if (Math.abs(aComponents.medium) > Math.abs(bComponents.medium)) return -1;

  if (aComponents.soft < 0 && bComponents.soft > 0) return -1;
  if (aComponents.soft > 0 && bComponents.soft < 0) return 1;
  return Math.abs(bComponents.soft) - Math.abs(aComponents.soft);
 }

 return store;
}

export const scheduleSolver = createScheduleSolver();