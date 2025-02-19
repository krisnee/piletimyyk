<script setup>
import { ref, onMounted, computed } from 'vue';
import EventForm from '../event/EventForm.vue';

const isModalOpen = ref(false);
const events = ref([]);
const selectedEvent = ref(null);
const isEditMode = ref(false); // Lisa see rida!

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedEvent.value = null;
  isEditMode.value = false; // Lähtesta edit mode
};

const fetchEvents = async () => {
  try {
    const response = await fetch('http://localhost:8080/events');
    events.value = await response.json();
    console.log('Fetched events:', events.value); // Debugging
  } catch (error) {
    console.error('Error fetching events:', error);
  }
};

// Kuupäeva vormindamine
const formatEventDate = (dateTimeString) => {
  const date = new Date(dateTimeString);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('et-EE', options);
};

// Vormindatud sündmused
const formattedEvents = computed(() => {
  return events.value.map(event => ({
    ...event,
    date: formatEventDate(event.date)
  }));
});

// Edit funktsioon
const editEvent = (event) => {
  selectedEvent.value = event;
  isEditMode.value = true; // Määra edit mode
  openModal();
};

const addNewEvent = () => {
  selectedEvent.value = null;
  isEditMode.value = false;
  openModal();
};

// Delete funktsioon
const deleteEvent = async (event_id) => {
  console.log('Deleting event with ID:', event_id); // Debugging
  if (!event_id) {
    console.error('Event ID is undefined');
    return; // Välju funktsioonist, kui event_id on undefined
  }
  
  try {
    const response = await fetch(`http://localhost:8080/events/${event_id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error deleting event:', errorData.error);
      return; // Välju funktsioonist, kui kustutamine ebaõnnestus
    }
    
    await fetchEvents(); // Uuenda sündmuste loend
  } catch (error) {
    console.error('Error deleting event:', error);
  }
};

onMounted(fetchEvents);
</script>

<template>
  <h2>Event Management</h2>
  <div class="management-container">
    <div class="content-wrapper">
      <button class="add-event-button" @click="addNewEvent">Add new event</button>
    </div>

    <div class="table-container">
      <table class="events-table">
        <thead>
          <tr>
            <th>Event title</th>
            <th>Date</th>
            <th>Sold/Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="event in formattedEvents" :key="event.event_id">
            <td>{{ event.title }}</td>
            <td>{{ event.date }}</td>
            <td>{{ event.sold }}/{{ event.total }}</td>
            <td>{{ event.status || 'N/A' }}</td>
            <td>
              <div class="action-buttons">
                <button class="edit-button" @click="editEvent(event)">Edit</button>
                <button class="delete-button" @click="deleteEvent(event.event_id)">Delete</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="modal" v-if="isModalOpen">
      <div class="modal-content">
        <div class="modal-header">
          <h3>{{ selectedEvent ? 'Edit Event' : 'Add New Event' }}</h3>
          <button class="close-button" @click="closeModal">&times;</button>
        </div>
        <EventForm 
          :event="selectedEvent"
          :isEditMode="isEditMode"
          @close="closeModal"
          @event-added="fetchEvents"
          @event-updated="fetchEvents"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.management-container {
  height: 120%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 10%;
}
.management-title {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1.5rem;
  padding-left: 1rem;
}
.management-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #dee2e6;
}

.management-header h2 {
  margin: 0;
  font-size: 1.5rem;
  color: #212529;
  font-weight: 600;
}
h2 {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  text-align: justify;
 
}

.add-event-button {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  background-color: #0d6efd;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-bottom: 1.5rem;
}

.add-event-button:hover {
  background-color: #0b5ed7;
}

.table-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.events-table {
  width: 100%;
  border-collapse: collapse;
}

.events-table th,
.events-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.events-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.events-table tr:hover {
  background-color: #f8f9fa;
}

.status {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: capitalize;
}

.status.active {
  background-color: #d1e7dd;
  color: #0f5132;
}

.status.inactive {
  background-color: #f8d7da;
  color: #842029;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

/* .edit-button,
.delete-button {
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.edit-button {
  background-color: #198754;
  color: white;
}

.delete-button {
  background-color: #dc3545;
  color: white;
}

.edit-button:hover,
.delete-button:hover {
  opacity: 0.9;
} */

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.25rem;
  color: #212529;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #6c757d;
  cursor: pointer;
  padding: 0;
}

.close-button:hover {
  color: #212529;
}
</style>