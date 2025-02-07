<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import EventsTable from '@/components/EventsTable.vue';

const search = ref('');
const getAllEvents = ref([]);
const filteredEvents = ref([]);

// Andmete tõmbamine serverist
onMounted(async () => {
  try {
    const response = await fetch('http://localhost:8080/events');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    getAllEvents.value = await response.json();
    filteredEvents.value = getAllEvents.value; // Initialize filtered events with all events
  } catch (error) {
    console.error('Error fetching events:', error);
    // You might want to set an error state here to display to the user
  }
});

// Filtreeritud ja vormindatud üritused
const formattedEvents = computed(() => {
  return filteredEvents.value.map(event => ({
    ...event,
    date: formatEventDate(event.date),
    time: formatEventTime(event.time),
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
const formatEventTime = (timeString) => {
  const [hours, minutes] = timeString.split(':');
  return `${hours}:${minutes}`;
};

// Otsingu funktsioon
const performSearch = () => {
  filteredEvents.value = getAllEvents.value.filter(event => 
    event.name.toLowerCase().includes(search.value.toLowerCase()) ||
    event.location.toLowerCase().includes(search.value.toLowerCase())
  );
};

// Vaata otsingut
watch(search, (newSearch) => {
  performSearch();
});

</script>

<template>
  <div class="w-full max-w-6xl mx-auto p-4">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Events</h1>
      <div class="search-container">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          placeholder="Search events..."
          class="search-input"
          v-model="search"
        />
        </div>
    </div>  
  </div>
  <div class="events-container">
    <EventsTable :items="formattedEvents" />
    </div>
</template>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
}
.search-container {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  padding: 12px;
  left: 12px;
  color: #888;
}

.search-input {
  width: 100%; /* Muuda laius 100% */
  padding: 12px 12px 12px 40px; /* Suurenda paddingut ja lisage vasakule padding ikooni jaoks */
  border: 1px solid #ccc; /* Piirjoon */
  border-radius: 25px; /* Ümaramad äärted */
  font-size: 16px; /* Suurenda fondi suurust */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Lisa kerge vari */
}

.search-input:focus {
  outline: none; /* Eemalda fookuse kontuur */
  border-color: #007bff; /* Muuda piirjoone värv fookuses */
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Lisa fookuse vari */
}

.mb-6 {
  margin-bottom: 24px; /* Suurenda vahe ürituste kaartide vahel */
}

</style>