<script setup>
import { ref, onMounted, computed, defineEmits } from 'vue';

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  maxEvents: {
    type: Number,
    default: Infinity,
  },
  search: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:search']);
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
    filteredEvents.value = getAllEvents.value;
  } catch (error) {
    console.error('Error fetching events:', error);
  }
});

// Filtreeritud ja vormindatud üritused
const formattedEvents = computed(() => {
  return filteredEvents.value
    .filter(event => 
      event.title.toLowerCase().includes(props.search.toLowerCase()) ||
      event.location.toLowerCase().includes(props.search.toLowerCase())
    )
    .map(event => ({
      ...event,
      date: formatEventDate(event.date), // Kuupäev
      time: formatEventTime(event.time), // Kellaaeg
      price: `${event.price}`
    }))
    .slice(0, props.maxEvents);
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
  return `${hours}:${minutes}`; // Tagastame ainult kellaaja
};
</script>

<template>
  <div>
    <input
      type="text"
      :value="search"
      @input="emit('update:search', $event.target.value)"
      placeholder="Search for an event, performer or venue..."
      class="large-search-input"
    />
    <div class="events-container">
      <div class="events-card" v-for="event in formattedEvents" :key="event.event_id">
        <h2 class="text-xl font-bold mb-2">{{ event.title }}</h2>
        <h3 class="mb-1">{{ event.description }}</h3>
        <p class="mb-2">
          <i class="fa-solid fa-calendar"></i>
          &nbsp;&nbsp;{{ event.date }}&nbsp;&nbsp;
          <i class="fa-solid fa-clock"></i>
          &nbsp;{{ event.time }}
        </p>
        <p class="mb-2">
          <i class="fa-solid fa-compass"></i>
          &nbsp;&nbsp;{{ event.location }}
        </p>
        <p class="mb-4">
          <i class="fa-solid fa-money-bill-1"></i>
          &nbsp;&nbsp;{{ event.price }} €
        </p>
        <button class="button" @click="buyTicket(event.event_id)">
          Buy ticket
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.events-container {
  width: 1300px;
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  justify-content: flex-start;
}

.events-card {
  width: 400px; /* Fikseeritud laius */
  height: 300px; /* Muuda kõrgus automaatseks */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15); /* Kerge vari */
  padding: 16px; /* Padding kaardi sees */
  background-color: white; /* Taustavärv */
  display: flex; /* Kasutame flexboxi kaardi sees */
  flex-direction: column; /* Paigutame sisu veergudesse */
  justify-content: space-between; /* Jagame sisu ühtlaselt */
  border: 1.1px solid #ccc; /* Piirjoon */
  border-radius: 20px; /* Ümaramad ääred */
}
</style>