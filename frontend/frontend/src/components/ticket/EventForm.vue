<template>
    <div>
      <h1>Add event</h1>
      <form @submit.prevent="addEvent">
        <input v-model="event.title" placeholder="Events name" required />
        <input v-model="event.date" type="date" required />
        <input v-model="event.price" type="number" placeholder="price" required />
        <input v-model="event.location" placeholder="location" required />
        <button type="submit">Add</button>
      </form>
      <p v-if="error">{{ error }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        event: {
          title: '',
          date: '',
          price: '',
          location: ''
        },
        error: ''
      };
    },
    methods: {
      async addEvent() {
        try {
          const response = await fetch('http://localhost:8080/events', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.event)
          });
          if (!response.ok) {
            throw new Error('Viga andmete saatmisel');
          }
          // Tühjenda vormi pärast edukat lisamist
          this.event = { title: '', date: '', price: '', location: '' };
        } catch (err) {
          this.error = err.message;
        }
      }
    }
  };
  </script>