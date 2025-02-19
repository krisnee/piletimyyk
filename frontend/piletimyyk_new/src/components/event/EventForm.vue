<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  event: {
    type: Object,
    default: () => null
  },
  isEditMode: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['close', 'event-added', 'event-updated']);

const eventData = ref({
  title: '',
  description: '',
  date: '',
  time: '',
  location: '',
  price: 0
});

// Abifunktsioon kuupäeva parsimiseks
const parseEstonianDate = (dateStr) => {
  const months = {
    'jaanuar': '01', 'veebruar': '02', 'märts': '03', 'aprill': '04',
    'mai': '05', 'juuni': '06', 'juuli': '07', 'august': '08',
    'september': '09', 'oktoober': '10', 'november': '11', 'detsember': '12'
  };
  
  const parts = dateStr.split(' ');
  const day = parts[0].replace('.', '').padStart(2, '0');
  const month = months[parts[1].toLowerCase()];
  const year = parts[2];
  
  return `${year}-${month}-${day}`;
};

watch(() => props.event, (newEvent) => {
  if (newEvent) {
    try {
      // Kontrollime, kas kuupäev on juba ISO formaadis
      let formattedDate;
      if (newEvent.date.includes('T')) {
        // ISO formaat
        formattedDate = newEvent.date.split('T')[0];
      } else {
        // Eesti keelne formaat
        formattedDate = parseEstonianDate(newEvent.date);
      }

      eventData.value = {
        ...newEvent,
        date: formattedDate,
        time: newEvent.time ? newEvent.time.substring(0, 5) : '',
        price: Number(newEvent.price) // Veendume, et hind on number
      };
      
      console.log('Loaded event data:', eventData.value); // Debug
    } catch (error) {
      console.error('Error parsing date:', error);
    }
  } else {
    eventData.value = {
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      price: 0
    };
  }
}, { immediate: true });

const submitEvent = async () => {
  const url = props.isEditMode 
    ? `http://localhost:8080/events/${props.event.event_id}`
    : 'http://localhost:8080/events';

  try {
    const response = await fetch(url, {
      method: props.isEditMode ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData.value),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    emit(props.isEditMode ? 'event-updated' : 'event-added');
    emit('close');
  } catch (error) {
    console.error('Error:', error);
  }
};
</script>

<template>
  <div class="event-form">
    <form @submit.prevent="submitEvent" class="form-container">
      <div class="form-group">
        <label for="title">Event title:</label>
        <input 
          id="title" 
          v-model="eventData.title" 
          class="form-control"
          placeholder="Event title" 
          required 
        />
      </div>

      <div class="form-group">
        <label for="description">Description:</label>
        <textarea 
          id="description" 
          v-model="eventData.description" 
          class="form-control"
          placeholder="Event description"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="date">Date:</label>
        <input 
          id="date" 
          type="date" 
          v-model="eventData.date" 
          class="form-control"
          required 
        />
      </div>

      <div class="form-group">
        <label for="time">Time:</label>
        <input 
          id="time" 
          type="time" 
          v-model="eventData.time" 
          class="form-control"
          required 
        />
      </div>

      <div class="form-group">
        <label for="location">Location:</label>
        <input 
          id="location" 
          v-model="eventData.location" 
          class="form-control"
          placeholder="Event location" 
          required 
        />
      </div>

      <div class="form-group">
        <label for="price">Price:</label>
        <input 
          id="price" 
          type="number" 
          v-model="eventData.price" 
          class="form-control"
          required 
        />
      </div>

      <div class="button-group">
        <button type="button" class="btn btn-secondary" @click="$emit('close')">
          Cancel
        </button>
        <button type="submit" class="btn btn-primary">
          {{ props.isEditMode ? 'Save Changes' : 'Add Event' }}
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.event-form {
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

.form-container {
  max-width: 100%;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
  font-size: 14px;
}

/* Ühtlustame kõik input ja textarea väljad */
.form-control {
  width: 100%;
  padding: 8px 12px;
  font-size: 14px;
  line-height: 1.5;
  color: #333;
  background-color: #fff;
  border: 1px solid #ced4da;
  border-radius: 4px;
  transition: border-color 0.15s ease-in-out;
  font-family: inherit; /* Pärime .event-form'i font-family */
}
input,
select,
textarea {
  -webkit-appearance: none;
  appearance: none;
  border: 1px solid #ced4da;
  border-radius: 4px;
  padding: 8px 12px;
  width: 100%;
  font-size: 14px;
}

/* Eemaldame date input'i custom nooled Chromiumis */
input[type="date"]::-webkit-calendar-picker-indicator {
  background: transparent;
  bottom: 0;
  color: transparent;
  cursor: pointer;
  height: auto;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: auto;
}

/* Eemaldame number input'i nooled */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

.form-control:focus {
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

textarea.form-control {
  height: 100px;
  resize: vertical;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

.btn {
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;
  font-family: inherit;
}

.btn-primary {
  background-color: #0d6efd;
  color: white;
}

.btn-primary:hover {
  background-color: #0b5ed7;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5c636a;
}

/* Ühtlustame placeholder teksti stiili */
::placeholder {
  color: #6c757d;
  opacity: 0.75;
}
/* Ühtlustame focus oleku kõigil elementidel */
*:focus {
  outline: none;
  border-color: #80bdff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}
</style>