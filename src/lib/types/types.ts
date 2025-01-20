// types.ts
export interface Timeslot {
	id: number;
	dayOfWeek: string;
	startTime: string;
	endTime: string;
}

export interface Room {
	id: number;
	name: string;
}

export interface Lesson {
	id: string;
	subject: string;
	teacher: string;
	studentGroup: string;
	timeslot: number;
	room: string;
}

export interface Schedule {
	timeslots: Timeslot[];
	rooms: Room[];
	lessons: Lesson[];
	solverStatus?: string;
	score?: string;
}

export interface ScoreAnalysis {
	constraints: ConstraintAnalysis[];
}

export interface ConstraintAnalysis {
	name: string;
	type: 'hard' | 'medium' | 'soft';
	weight: number;
	score: string;
	matches: ConstraintMatch[];
}

export interface ConstraintMatch {
	justification: {
		description: string;
	};
}
