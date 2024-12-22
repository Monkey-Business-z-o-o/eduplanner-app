<script lang="ts">
  interface Lesson {
    subject: keyof typeof subjectColors;
    teacher: string;
    studentGroup: string;
    id: string;
  }

  export let lesson: Lesson;

  const subjectColors: Record<string, string> = {
    'Math': 'bg-blue-100 border-blue-200',
    'English': 'bg-green-100 border-green-200',
    'Science': 'bg-yellow-100 border-yellow-200',
    'History': 'bg-red-100 border-red-200',
    'Geography': 'bg-purple-100 border-purple-200',
    'Physics': 'bg-indigo-100 border-indigo-200',
    'Chemistry': 'bg-pink-100 border-pink-200',
    'Biology': 'bg-teal-100 border-teal-200'
  };

  $: cardColor = subjectColors[lesson.subject] || 'bg-gray-100 border-gray-200';
</script>

<div class="rounded-lg shadow border {cardColor} p-3 mb-2 transition-all hover:shadow-md">
  <h5 class="font-bold text-gray-800">{lesson.subject}</h5>
  <p class="text-sm text-gray-600 italic">by {lesson.teacher}</p>
  <p class="text-sm text-gray-700">{lesson.studentGroup}</p>
  <small class="text-gray-500 text-xs">{lesson.id}</small>
</div>