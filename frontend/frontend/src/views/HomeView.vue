<script>
import TicketTable from '@/components/EventsTable.vue';

export default {
  components: {
    TicketTable,
  },
  data() {
    return {
      allTickets: [], // API-st saadud sündmused
      isLoading: true, // Näitab laadimise olekut
      error: null, // Vigade kuvamine
    };
  },
  async created() {
    try {
      const response = await fetch('http://localhost:8081/events'); // Laadib sündmused backendist
      if (!response.ok) throw new Error('Failed to fetch events');
      this.allTickets = await response.json(); // Salvesta sündmused
    } catch (err) {
      this.error = err.message; // Kuvab vea, kui midagi läheb valesti
    } finally {
      this.isLoading = false; // Lõpetab laadimise oleku
    }
  },
};
</script>

<template>
  <main>
    <h1>Available Events</h1>
    <p v-if="isLoading">Loading events...</p>
    <p v-if="error" style="color: red;">{{ error }}</p>
    <TicketTable v-if="!isLoading && !error" :items="allTickets" />
  </main>
</template>

<style>
main {
  text-align: center;
  padding: 20px;
}

h1 {
  color: #4CAF50;
}
</style>