<script>
import { ref, onMounted } from 'vue';
import EventForm from '../event/EventForm.vue';

export default {
  components: { EventForm },
  setup() {
    const isModalOpen = ref(false);
    const events = ref([]);

    const openModal = () => {
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };

    const fetchEvents = async () => {
      const response = await fetch('http://localhost:8080/events');
      events.value = await response.json();
    };

     const editEvent = (event) => {
       selectedEvent.value = event; // Määra valitud üritus
       openModal(); // Ava modaalaken
     };

     const deleteEvent = async (event_id) => {
       await fetch(`http://localhost:8080/events/${event_id}`, {
         method: 'DELETE',
       });
       fetchEvents(); // Uuenda ürituste loend
     };

    onMounted(fetchEvents);

    return {
      isModalOpen,
      openModal,
      closeModal,
      events,
      fetchEvents,
      editEvent,
      deleteEvent,
      // selectedEvent,
    };
  },
};
</script>

<template>
  <main class="main">
    <h2>Event Management</h2>
    <button class="add-event-button" @click="openModal">Add new event</button>

    <div class="modal2" v-if="isModalOpen">
      <div class="modal2-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Event details</h2>
        <EventForm @event-added="handleEventAdded" />
      </div>
    </div>

    <div class="table-container">
      <table class="events-table">
        <thead>
          <tr>
            <th>Evenet title</th>
            <th>Date</th>
            <th>Sold/Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="event in events" :key="event.event_id">
            <td>{{ event.title }}</td>
            <td>{{ event.date }}</td>
            <td>{{ event.sold }}/{{ event.total }}</td>
            <td>{{ event.status }}</td>
            <td>
            <button class="edit-button" @click="editEvent (event)">Edit</button>
            <button class="delete-button" @click="deleteEvent(event.event_id)">Delete</button>
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
  padding: 10px 20px; /* Väiksem padding */
  font-size: 14px; /* Väiksem font */
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
  background-color: #1ac94f;
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