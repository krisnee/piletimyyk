<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});

const buyTicket = (event_id) => {
  // Parandatud event_id -> eventId
  alert(`Ostetud pilet üritusele ID: ${event_id}`);
};
</script>

<template>
  <div>
    <div v-for="event in items" :key="event.event_id" class="event-card">
      <h2 class="text-xl font-bold mb-2">{{ event.title }}</h2>
      <!-- Eemaldatud "at" sõna, kuna nüüd on "kell" juba time stringis -->
      <p class="mb-2">{{ event.date }} {{ event.time }}</p>
      <p class="mb-2">{{ event.location }}</p>
      <!-- Eemaldatud euro märk, kuna see tuleb juba price väljaga kaasa -->
      <p class="mb-4">Price: {{ event.price }} €</p>
      <button 
        @click="buyTicket(event.event_id)"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Buy Ticket
      </button>
    </div>
  </div>
</template>

<style scoped>
.event-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>