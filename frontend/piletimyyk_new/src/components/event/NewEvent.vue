<script>
import { ref } from 'vue';
import EventForm from './EventForm.vue';

export default {
  components: {
    EventForm
  },
  setup() {
    const events = ref([]);

    const handleEventAdded = () => {
      // Siin saate uuendada ürituste loetelu, näiteks:
      fetchEvents(); // Funktsioon, mis tõmbab uuesti ürituste loendi
    };

    const fetchEvents = async () => {
      const response = await fetch('http://localhost:8080/events');
      const data = await response.json();
      events.value = data; // Uuendage ürituste loetelu
    };

    return {
      events,
      handleEventAdded,
      fetchEvents
    };
  }
};
</script>

<template>
  <div>
    <EventForm @event-added="handleEventAdded" />
    <!-- Siin saate kuvada ürituste loetelu -->
  </div>
</template>