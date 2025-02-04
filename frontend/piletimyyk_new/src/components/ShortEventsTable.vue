<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});

const viewDetails = (id) => {
  // Suuna kasutaja EventsView lehele
  // Näiteks: router.push({ name: 'events', params: { id } });
};
</script>

<template>
  <div>
    <!-- <h2>Populaarsed Üritused</h2> -->
    <div v-for="event in items.slice(0, 3)" :key="event.id" class="event-card">
      <h3>{{ event.title }}</h3>
      <p>{{ event.date }} at {{ event.time }}</p>
      <button @click="viewDetails(event.id)">Vaata rohkem</button>
    </div>
  </div>
</template>

<style scoped>
.event-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}
</style>