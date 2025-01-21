<script lang="ts">
    import LessonColor from '$lib/components/lessons/LessonColor.svelte';
    import { format } from 'date-fns';
    import SectionHeader from '../common/SectionHeader.svelte';
    import type { Schedule, Header } from '$lib/types/types';

    export let schedule: Schedule;
    export let activeTab: 'byRoom' | 'byTeacher' | 'byStudentGroup';
    let showTimeslots = true;

    $: view = getViewData(schedule, activeTab);

    function getViewData(schedule: Schedule, activeTab: 'byRoom' | 'byTeacher' | 'byStudentGroup') {
        const timeslots = schedule.timeslots;
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
    <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <SectionHeader
                title="Plan Zajęć"
                bind:isOpen={showTimeslots}
                textColor="text-green-600"
        />

        {#if showTimeslots}
            <div class="p-4">
                <div class="flex space-x-4 mb-4">
                    <button
                            on:click={() => activeTab = 'byRoom'}
                            class="tab-card {activeTab === 'byRoom' ? 'active' : ''}"
                            role="tab"
                            aria-selected={activeTab === 'byRoom'}
                    >
                        <span>By Room</span>
                    </button>
                    <button
                            on:click={() => activeTab = 'byTeacher'}
                            class="tab-card {activeTab === 'byTeacher' ? 'active' : ''}"
                            role="tab"
                            aria-selected={activeTab === 'byTeacher'}
                    >
                        <span>By Teacher</span>
                    </button>
                    <button
                            on:click={() => activeTab = 'byStudentGroup'}
                            class="tab-card {activeTab === 'byStudentGroup' ? 'active' : ''}"
                            role="tab"
                            aria-selected={activeTab === 'byStudentGroup'}
                    >
                        <span>By Student Group</span>
                    </button>
                </div>

                <div class="overflow-x-auto">
                    <table class="min-w-full border-collapse">
                        <thead>
                        <tr class="bg-gray-300">
                            <th class="border border-gray-200 p-3 text-left">Timeslot</th>
                            {#each view.headers as header}
                                <th class="border border-gray-200 p-3 text-left">{header.name}</th>
                            {/each}
                        </tr>
                        </thead>
                        <tbody>
                        {#each view.timeslots as timeslot}
                            <tr>
                                <th class="border border-gray-200 p-3 text-left bg-gray-100">
                                    {timeslot.dayOfWeek} {formatTime(timeslot.startTime)}-{formatTime(timeslot.endTime)}
                                </th>
                                {#each view.headers as header}
                                    <td class="border border-gray-200 p-3">
                                        {#each schedule.lessons.filter(lesson => {
                                            if (activeTab === 'byRoom') {
                                                return lesson.timeslot === timeslot.id && lesson.room === header.id;
                                            } else if (activeTab === 'byTeacher') {
                                                return lesson.timeslot === timeslot.id && lesson.teacher === header.name;
                                            } else {
                                                return lesson.timeslot === timeslot.id && lesson.studentGroup === header.name;
                                            }
                                        }) as lesson}
                                            <LessonColor
                                                    {lesson}
                                                    selectedRole={mapActiveTabToRole(activeTab)}
                                                    onDelete={() => {}}
                                                    onEdit={() => {}}
                                                    onUpdate={() => {}}
                                                    onCancelEdit={() => {}}
                                            />
                                        {/each}
                                    </td>
                                {/each}
                            </tr>
                        {/each}
                        </tbody>
                    </table>
                </div>
            </div>
        {/if}
    </div>
</section>

<style>
    .tab-card {
        padding: 1rem;
        border-radius: 8px;
        background-color: #f8fafc; /* light gray */
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        width: 150px;
        font-weight: 500;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .tab-card:hover {
        background-color: #e0f2fe; /* light blue */
        transform: translateY(-2px); /* Slight lift effect */
    }

    .tab-card.active {
        background-color: #1d4ed8; /* blue */
        color: white;
        box-shadow: 0 4px 8px rgba(29, 78, 216, 0.5); /* Stronger blue glow */
        transform: translateY(-5px); /* Elevated effect */
    }
</style>
