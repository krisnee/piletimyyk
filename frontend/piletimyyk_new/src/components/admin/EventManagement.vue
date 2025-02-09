<script>
import { ref, onMounted } from 'vue';
import EventForm from '../event/EventForm.vue'; // Kui EventManagement.vue on admin kaustas
//import NewEvent from '../event/NewEvent.vue'; // Kui EventManagement.vue on admin kaustas
//import EventModal from '../event/EventModal.vue';

// export default {
//   components: {
//     EventForm,
//    // NewEvent,
//   },
//   data() {
//     return {
//       events: [],
//     };
//   },
//   methods: {
//     async fetchEvents() {
//       const response = await fetch('http://localhost:8080/events');
//       this.events = await response.json();
//       console.log(events.value);
//     },
//     async deleteEvent(event_id) {
//       await fetch(`http://localhost:8080/events/${event_id}`, {
//         method: 'DELETE',
//       });
//       this.fetchEvents(); // Uuendage ürituste loendit
      
//     },
//   },
//   mounted() {
//     this.fetchEvents();
//   },
// };
const isModalOpen = ref(false);
const events = ref([]); // Ürituste loend

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const handleEventAdded = () => {
  fetchEvents(); // Uuenda ürituste loend
};

const fetchEvents = async () => {
  const response = await fetch('http://localhost:8080/events');
  const data = await response.json();
  events.value = data; // Uuenda ürituste loend
};

// Laadige ürituste loend, kui komponent on mountitud
onMounted(() => {
  fetchEvents();
});

</script>

<template>
  <main class="main">
    <h2>Event Management</h2>
    <button class="add-event-button" @click="openModal">Add new event</button>

    <div class="modal" v-if="isModalOpen">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <EventForm @event-added="handleEventAdded" />
      </div>
    </div>

    <div class="table-container">
      <table class="events-table">
        <thead>
          <tr>
            <th>Ürituse nimi</th>
            <th>Kuupäev</th>
            <th>Müüdud/Kokku</th>
            <th>Staatus</th>
            <th>Tegevused</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="event in events" :key="event.id">
            <td>{{ event.title }}</td>
            <td>{{ event.date }}</td>
            <td>{{ event.sold }}/{{ event.total }}</td>
            <td>{{ event.status }}</td>
            <td>
              <!-- Tegevused, nt Muuda ja Kustuta nupud -->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<style scoped>
.table-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
}

.add-event-button {
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.events-table {
  width: 100%;
  border-collapse: collapse;
}

.events-table th,
.events-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.events-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.status {
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
}

.status.active {
  background-color: #28a745; /* Roheline */
}

.edit-button,
.delete-button {
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.edit-button {
  background-color: #007bff;
  color: white;
}

.delete-button {
  background-color: #dc3545;
  color: white;
}

.edit-button:hover,
.delete-button:hover {
  opacity: 0.8;
}
</style>