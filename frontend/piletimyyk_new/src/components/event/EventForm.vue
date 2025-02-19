<script>
import { ref, defineEmits, watch } from 'vue';

export default {
  props: {
    isEditMode: {
      type: Boolean,
      default: false,
    },
    eventData: {
      type: Object,
      default: () => ({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        price: 0,
      }),
    },
  },
  emits: ['event-added', 'event-updated'],
  setup(props, { emit }) {
    const event = ref({ ...props.eventData });

    const submitEvent = async () => {
      const method = props.isEditMode ? 'PUT' : 'POST';
      const url = props.isEditMode ? `http://localhost:8080/events/${event.value.event_id}` : 'http://localhost:8080/events';

      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event.value),
      });

      if (props.isEditMode) {
        emit('event-updated'); // Teata, et üritus on uuendatud
      } else {
        emit('event-added'); // Teata, et üritus on lisatud
      }

      event.value = { title: '', description: '', date: '', time: '', location: '', price: 0 }; // Tühjenda vorm
    };

    watch(() => props.eventData, (newVal) => {
      event.value = { ...newVal }; // Uuenda vormi andmed, kui prop muutub
    });

    return {
      event,
      submitEvent,
    };
  },
};
</script>

<template>
  <div class="event-form">
    <form @submit.prevent="submitEvent">
      <div>
        <label for="title">Event title:</label>
        <input id="title" v-model="event.title" placeholder="Event title" required />
      </div>
      <div>
        <label for="description">Description:</label>
        <input id="description" v-model="event.description" placeholder="Description" required />
      </div>
      <div>
        <label for="date">Date:</label>
        <input id="date" v-model="event.date" type="date" required />
      </div>
      <div>
        <label for="time">Time:</label>
        <input id="time" v-model="event.time" type="time" required />
      </div>
      <div>
        <label for="location">Location:</label>
        <input id="location" v-model="event.location" placeholder="Location" required />
      </div>
      <div>
        <label for="price">Price:</label>
        <input id="price" v-model="event.price" type="number" placeholder="Price" required />
      </div>
      <button type="submit">{{ isEditMode ? 'Edit Event' : 'Add New Event' }}</button>
    </form>
  </div>
</template>

<style scoped>
.event-form {
  display: flex;
  flex-direction: column;
  gap: 1rem; /* Vahe elementide vahel */
}

input, textarea {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%; /* Täida kogu laius */
}

button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3; /* Tumeda värvi hover efekt */
}
</style>