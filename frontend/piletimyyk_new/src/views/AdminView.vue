<script>
import { ref } from 'vue';
import { isAdmin } from '@/auth'; // Impordi isAdmin
import EventForm from '@/components/event/EventForm.vue'; // Impordi EventForm

export default {
  components: {
    EventForm // Lisa EventForm komponent
  },
  setup() {
    const events = ref([]);

    const fetchEvents = async () => {
      const response = await fetch('http://localhost:8080/events');
      events.value = await response.json();
    };

    const deleteEvent = async (id) => {
      await fetch(`http://localhost:8080/events/${id}`, {
        method: 'DELETE'
      });
      fetchEvents(); // Uuenda ürituste nimekiri
    };

    fetchEvents();

    return {
      events,
      fetchEvents,
      deleteEvent,
      isAdmin // Lisa isAdmin
    };
  }
};
</script>

<template>
  <div v-if="isAdmin">
    <h1>Admin Panel</h1>
    <div>
      <h2>Add New Event</h2>
      <EventForm @event-added="fetchEvents" /> <!-- Kasuta EventForm komponenti -->
    </div>
    <div>
      <h2>Existing Events</h2>
      <ul>
        <li v-for="event in events" :key="event.id">
          {{ event.title }} - {{ event.date }} at {{ event.time }} - {{ event.price }} €
          <button @click="deleteEvent(event.id)">Delete</button>
        </li>
      </ul>
    </div>
  </div>
  <div v-else>
    <p>You do not have permission to view this page.</p>
  </div>
</template>

<style scoped>
.admin-view {
  padding: 20px;
}
</style>