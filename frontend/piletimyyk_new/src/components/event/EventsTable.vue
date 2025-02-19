<script setup>
import { ref, onMounted, computed } from 'vue';

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
const showModal = ref(false); // Modal'i nähtavuse haldamiseks
const selectedEvent = ref(null); // Valitud üritus pileti ostmiseks

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

// Pileti loomise funktsioon
const createTicket = async (event_id, user_id, quantity) => {
       try {
           const response = await fetch('/tickets', {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json',
               },
               body: JSON.stringify({ EventEventId: event_id, UserUserId: user_id, quantity, purchase_date: new Date() }),
           });

           const responseText = await response.text(); // Saame vastuse tekstina
           console.log('Serveri vastus:', responseText); // Logime vastuse

           if (!response.ok) {
               const errorData = JSON.parse(responseText); // Proovime JSON-iks muuta
               throw new Error(errorData.error || 'Tundmatu viga');
           }

           const data = JSON.parse(responseText); // Muudame vastuse JSON-iks
           console.log('Pilet loodud:', data);
           showModal.value = false; // Sulge modali pärast ostu
       } catch (error) {
           console.error('Pileti loomise viga:', error);
       }
   };
   

// Funktsioon pileti ostmiseks
const buyTicket = (event) => {
    selectedEvent.value = event; // Salvestame valitud ürituse
    showModal.value = true; // Näitame modali
};

// Funktsioon ostu kinnitamiseks
const confirmPurchase = () => {
    const user_id = 1; // Asendage see tegeliku kasutaja ID-ga
    const quantity = 1; // Asendage see soovitud kogusega
    createTicket(selectedEvent.value.event_id, user_id, quantity);
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
        <button class="button" @click="buyTicket(event)">
          Buy ticket
        </button>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h2>Ostu kinnitamine</h2>
        <p>Kas olete kindel, et soovite osta piletit üritusele: {{ selectedEvent?.title }}?</p>
        <button @click="confirmPurchase">Kinnita</button>
        <button @click="showModal = false">Tühista</button>
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

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}
</style>