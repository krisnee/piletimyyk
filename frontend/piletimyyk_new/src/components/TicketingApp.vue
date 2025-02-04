<script setup>
import { ref, onMounted, computed } from 'vue';
import EventsTable from '@/components/EventsTable.vue';

const search = ref('');
const getAllEvents = ref([]);

// Andmete tõmbamine serverist
onMounted(async () => {
  const response = await fetch('http://localhost:8080/events');
  getAllEvents.value = await response.json();
});

// Filtreeritud ja vormindatud üritused
const formattedEvents = computed(() => {
  return getAllEvents.value.map(event => ({
    ...event,
    date: formatEventDate(event.date), // Kasuta ainult kuupäeva
    time: formatEventTime(event.time), // Kasuta eraldi time väärtust
    price: `${event.price}`
  }));
});

// Funktsioon kuupäeva vormindamiseks
const formatEventDate = (dateTimeString) => {
  const date = new Date(dateTimeString);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('et-EE', options);
};

// Funktsioon kellaaja vormindamiseks
// Funktsioon kellaaja vormindamiseks
const formatEventTime = (timeString) => {
  const [hours, minutes] = timeString.split(':');
  return `${hours}:${minutes}`;
};
</script>

<template>
  <div class="w-full max-w-6xl mx-auto p-4">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Events</h1>
      <input
        type="text"
        placeholder="Search events..."
        class="border rounded-lg pl-2"
        v-model="search"
      />
    </div>
    <EventsTable :items="formattedEvents" />
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
}
</style>