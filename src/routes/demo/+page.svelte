<script lang="ts">
    // Definicja domyślnych danych testowych
    interface Timeslot {
        id: string;
        dayOfWeek: string;
        startTime: string;
        endTime: string;
    }

    interface Lesson {
        id: string;
        subject: string;
        teacher: string;
        studentGroup: string;
        timeslot: Timeslot;
        room: { id: string; name: string };
    }

    interface Room {
        id: string;
        name: string;
    }

    interface Schedule {
        timeslots: Timeslot[];
        lessons: Lesson[];
        rooms: Room[];
    }

    let schedule: Schedule = {
        timeslots: [
            { id: '1', dayOfWeek: 'Monday', startTime: '08:00', endTime: '09:00' },
            { id: '2', dayOfWeek: 'Monday', startTime: '09:00', endTime: '10:00' }
        ],
        lessons: [
            {
                id: '1',
                subject: 'Math',
                teacher: 'Mr. Smith',
                studentGroup: 'Group A',
                timeslot: { id: '1', dayOfWeek: 'Monday', startTime: '08:00', endTime: '09:00' },
                room: { id: '1', name: 'Room 101' }
            }
        ],
        rooms: [{ id: '1', name: 'Room 101' }]
    };

    let activeTab: 'byRoom' | 'byTeacher' | 'byStudentGroup' = 'byRoom';

    function getViewData() {
        const timeslots = schedule.timeslots;
        let headers: { id: string; name: string }[] = [];

        if (activeTab === 'byRoom') {
            headers = schedule.rooms.map(room => ({ id: room.id, name: room.name }));
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
</script>

<style>
    .tab {
        padding: 10px;
        margin: 5px;
        border: 1px solid #ddd;
        cursor: pointer;
    }
    .tab.active {
        background-color: red;
        color: white;
    }
</style>

<!-- Przełączniki między widokami -->
<div class="tabs">
    <button
            class="tab {activeTab === 'byRoom' ? 'active' : ''}"
            on:click={() => (activeTab = 'byRoom')}
    >
        By Room
    </button>
    <button
            class="tab {activeTab === 'byTeacher' ? 'active' : ''}"
            on:click={() => (activeTab = 'byTeacher')}
    >
        By Teacher
    </button>
    <button
            class="tab {activeTab === 'byStudentGroup' ? 'active' : ''}"
            on:click={() => (activeTab = 'byStudentGroup')}
    >
        By Student Group
    </button>
</div>

<!-- Wyświetlanie danych w zależności od aktywnej zakładki -->
<div class="schedule">
    {#each getViewData().headers as header}
        <div class="header">
            <h3>{header.name}</h3>
        </div>
    {/each}

    <div class="timeslots">
        {#each getViewData().timeslots as timeslot}
            <div class="timeslot">
                {timeslot.dayOfWeek}: {timeslot.startTime} - {timeslot.endTime}
            </div>
        {/each}
    </div>
</div>
