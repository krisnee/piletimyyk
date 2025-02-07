<template>
  <div>
    <h2>Manage Summaries</h2>
    <form @submit.prevent="submitSummary">
      <input v-model="summary.title" placeholder="Summary Title" required />
      <textarea v-model="summary.content" placeholder="Summary Content" required></textarea>
      <button type="submit">Add/Update Summary</button>
    </form>
    <!-- Siin saate kuvada olemasolevaid kokkuvõtteid -->
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const summary = ref({ title: '', content: '' });

    const submitSummary = async () => {
      // Siin saadate andmed serverisse
    };

    return {
      summary,
      submitSummary,
    };
  },
};
</script>