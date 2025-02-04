  <script>
  import { ref } from 'vue';
  
  export default {
    emits: ['event-added'],
    setup(props, { emit }) {
      const event = ref({
        title: '',
        date: '',
        time: '',
        location: '',
        price: ''
      });
  
      const submitEvent = async () => {
        await fetch('http://localhost:8080/events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(event.value)
        });
        emit('event-added'); // Teata, et üritus on lisatud
        event.value = { title: '', date: '', time: '', location: '', price: '' }; // Tühjenda vorm
      };
  
      return {
        event,
        submitEvent
      };
    }
  };
  </script>
  
  <template>
    <form @submit.prevent="submitEvent">
      <input v-model="event.title" placeholder="Event Title" required />
      <input v-model="event.date" type="date" required />
      <input v-model="event.time" type="time" required />
      <input v-model="event.location" placeholder="Location" required />
      <input v-model="event.price" type="number" placeholder="Price" required />
      <button type="submit">Add Event</button>
    </form>
  </template>
  
