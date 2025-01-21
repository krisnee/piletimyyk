<template>
  <main>
    <EventsTable :items="allEvents" />
    <!-- <TicketsTable :items="allTickets" /> -->
  </main>
</template>

<script>
import EventsTable from '@/components/EventsTable.vue';
// import TicketsTable from '@/components/TicketsTable.vue';

export default {
  components: { 
    EventsTable, // Lisa EventsTable komponent
    // TicketsTable
  },
  data() { 
    return {
      // allTickets: [],
      allEvents: [] // Lisa allEvents muutuja
    };
  },
  async created() {
    try {
      // Laadi ürituste andmed
      this.allEvents = await (await fetch('http://localhost:8080/events')).json();
      // Laadi piletite andmed
      // this.allTickets = await (await fetch('http://localhost:8080/tickets')).json();
    } catch (error) {
      console.error('Andmete laadimise viga:', error);
    }
  }
}
</script>