<script setup>
import { ref } from 'vue';
import EventsTable from '@/components/event/EventsTable.vue';

const search = ref('');

</script>

<template>
  <div class="w-full max-w-6xl mx-auto p-4">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Events</h1>
        <div class="events-container">

          <EventsTable :search="search" :maxEvents="Infinity" />
        </div>
    </div>
  </div>   
</template>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
}
.search-container {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  width: 100%; /* Muuda laius 100% */
  padding: 12px 12px 12px 40px; /* Suurenda paddingut ja lisage vasakule padding ikooni jaoks */
  border: 1px solid #ccc; /* Piirjoon */
  border-radius: 25px; /* Ümaramad äärted */
  font-size: 16px; /* Suurenda fondi suurust */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Lisa kerge vari */
}

.search-input:focus {
  outline: none; /* Eemalda fookuse kontuur */
  border-color: #007bff; /* Muuda piirjoone värv fookuses */
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Lisa fookuse vari */
}

.mb-6 {
  margin-bottom: 24px; /* Suurenda vahe ürituste kaartide vahel */
}

</style>