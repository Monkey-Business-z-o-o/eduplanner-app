<script lang="ts">
    // Interfejs do reprezentacji lekcji
    interface Lesson {
        subject: string;
        teacher: string;
        studentGroup: string;
        room: { name: string };
        timeslot: {
            dayOfWeek: string;
            startTime: { hour: number; minute: number };
            endTime: { hour: number; minute: number };
        };
    }

    let newLesson: Lesson = {
        subject: '',
        teacher: '',
        studentGroup: '',
        room: { name: '' },
        timeslot: {
            dayOfWeek: 'MONDAY',
            startTime: { hour: 0, minute: 0 },
            endTime: { hour: 0, minute: 0 }
        }
    };

    // Funkcja do wysyłania zapytania POST do backendu
    const addLesson = async () => {
        try {
            const response = await fetch('https://backend.kebson.fun/lessons', {
                method: 'POST',
                headers: {
                    'Accept': 'application/hal+json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newLesson),
            });

            if (!response.ok) {
                throw new Error('Failed to add lesson');
            }

            newLesson = {  // Resetowanie formularza po udanym dodaniu
                subject: '',
                teacher: '',
                studentGroup: '',
                room: { name: '' },
                timeslot: {
                    dayOfWeek: 'MONDAY',
                    startTime: { hour: 0, minute: 0 },
                    endTime: { hour: 0, minute: 0 }
                }
            };
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error(err.message);
            }
        }
    };
</script>

<button on:click={addLesson}>Add Lesson</button>