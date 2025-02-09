  <script>
  import { ref } from 'vue';
  
  // export default {
  //   emits: ['event-added'],
  //   setup(props, { emit }) {
  //     const event = ref({
  //       title: '',
  //       description: '',
  //       date: '',
  //       time: '',
  //       location: '',
  //       price: ''
  //     });

  const event = ref({
  title: '',
  description: '',
  date: '',
  location: '',
  price: 0,
});
// const submitEvent = () => {
//   // Siin saate lisada loogika, et saata andmed serverisse
//   console.log('Uus üritus:', event.value);
//   // Siin saate kutsuda event-added sündmust
// };
  
      const submitEvent = async () => {
        await fetch('http://localhost:8080/events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(event.value)
        });
        emit('event-added'); // Teata, et üritus on lisatud
        event.value = { title: '', description: '', date: '', time: '', location: '', price: '' }; // Tühjenda vorm
      };
  
      // return {
      //   event,
      //   submitEvent
      // };
    //}
  //};
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
                <input id="description" v-model="event.description" placeholder="Description" required></input>
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
            <button type="submit">Add new event</button>
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
