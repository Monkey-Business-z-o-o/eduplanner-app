<script lang="ts">
    import LessonColor from '$lib/components/LessonColor.svelte';
    import { format } from 'date-fns';

    interface Schedule {
        timeslots: Array<{ id: string; dayOfWeek: string; startTime: string; endTime: string }>;
        rooms: Array<{ id: string; name: string }>;
        lessons: Array<{ timeslot: string; room: string; teacher: string; studentGroup: string; subject: string; id: string }>;
    }

    interface Header {
        id: string;
        name: string;
    }

    export let schedule: Schedule;
    export let activeTab: 'byRoom' | 'byTeacher' | 'byStudentGroup';

    let showTimeslots = true;
    let showUnassignedLessons = true;

    $: view = getViewData(schedule, activeTab);

    function getViewData(schedule: Schedule, activeTab: 'byRoom' | 'byTeacher' | 'byStudentGroup') {
        const timeslots = schedule.timeslots.reduce((acc, timeslot) => {
            if (!acc[timeslot.dayOfWeek]) {
                acc[timeslot.dayOfWeek] = [];
            }
            acc[timeslot.dayOfWeek].push(timeslot);
            return acc;
        }, {});

        let headers: Header[] = [];

        if (activeTab === 'byRoom') {
            headers = schedule.rooms;
        } else if (activeTab === 'byTeacher') {
            headers = [...new Set(schedule.lessons.map(l => l.teacher))].map(teacher => ({
                id: btoa(teacher),
                name: teacher
            }));
        } else {
            headers = [...new Set(schedule.lessons.map(l => l.studentGroup))].map(group => ({
                id: btoa(group),
                name: group
            }));
        }

        return { timeslots, headers };
    }

    function mapActiveTabToRole(activeTab: 'byRoom' | 'byTeacher' | 'byStudentGroup'): 'Room' | 'Teacher' | 'Student' {
        if (activeTab === 'byRoom') return 'Room';
        if (activeTab === 'byTeacher') return 'Teacher';
        return 'Student';
    }

    function formatTime(time: string) {
        return format(new Date(`2024-01-01T${time}`), 'HH:mm');
    }
</script>

<section class="mt-8">
    <button class="text-2xl font-semibold text-gray-800 mb-4 cursor-pointer flex items-center hover:text-blue-500" on:click={() => (showTimeslots = !showTimeslots)}>
        Timeslots
        <span class="ml-2">{showTimeslots ? '▼' : '▶'}</span>
    </button>
    {#if showTimeslots}
        <div class="overflow-x-auto">
            <table class="min-w-full border-collapse">
                <thead>
                <tr class="bg-gray-50">
                    <th class="border border-gray-200 p-3 text-left">Timeslot</th>
                    {#each ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as day}
                        <th class="border border-gray-200 p-3 text-left">{day}</th>
                    {/each}
                </tr>
                </thead>
                <tbody>
                {#each Object.keys(view.timeslots) as dayOfWeek}
                    {#each view.timeslots[dayOfWeek] as timeslot}
                        <tr>
                            <th class="border border-gray-200 p-3 text-left bg-gray-50">
                                {formatTime(timeslot.startTime)}-{formatTime(timeslot.endTime)}
                            </th>
                            {#each ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as day}
                                <td class="border border-gray-200 p-3">
                                    {#if day === dayOfWeek}
                                        {#each schedule.lessons.filter(lesson => lesson.timeslot === timeslot.id) as lesson}
                                            <LessonColor {lesson} selectedRole={mapActiveTabToRole(activeTab)} />
                                        {/each}
                                    {/if}
                                </td>
                            {/each}
                        </tr>
                    {/each}
                {/each}
                </tbody>
            </table>
        </div>
    {/if}
</section>

<section class="mt-8">
    <button class="text-2xl font-semibold text-gray-800 mb-4 cursor-pointer flex items-center hover:text-blue-500" on:click={() => (showUnassignedLessons = !showUnassignedLessons)}>
        Unassigned Lessons
        <span class="ml-2">{showUnassignedLessons ? '▼' : '▶'}</span>
    </button>
    {#if showUnassignedLessons}
        <div class="overflow-x-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {#each schedule.lessons.filter(lesson => lesson.timeslot == null || lesson.room == null) as lesson}
                    <div class="bg-gray-50 rounded p-2">
                        <LessonColor {lesson} selectedRole={mapActiveTabToRole(activeTab)} />
                    </div>
                {/each}
            </div>
        </div>
    {/if}
</section>