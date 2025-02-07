<script setup>
//import TheWelcome from '../components/TheWelcome.vue'
import ShortEventsTable from '@/components/event/ShortEventsTable.vue';
import { ref, onMounted } from 'vue';

// Töötleme andmete muutumist
const events = ref([]);

// Andmete tõmbamine serverist
onMounted(async () => {
  const response = await fetch('http://localhost:8080/events');
  events.value = await response.json();
});
</script>


<template>
  <div class="header">
    <!-- <TheWelcome />  -->
    <h1>Welcome to Piletimüük</h1>
    <p>Siin saad hallata oma üritusi ja pileteid.</p>
  </div>

  <div>
    <h2>Populaarsed Üritused</h2>
    <ShortEventsTable :items="events" />
    
    <h2>Uudised</h2>
    <ul>
      <li>Uus kontsert Tallinnas 15. märtsil!</li>
      <li>Teater "Kolm õde" esietendus 20. märtsil.</li>
      <li>Kevadkontsert toimub 1. aprillil.</li>
    </ul>

    <h2>Teated</h2>
    <p>Palun kontrollige oma pileti ostu kinnitust e-posti teel.</p>
    <p>Ürituste toimumise ajad võivad muutuda, jälgige meie lehte.</p>

    <h2>Kasutajate Arvustused</h2>
    <div class="review">
      <p><strong>Maria:</strong> "Suurepärane kogemus! Soovitan!"</p>
    </div>
    <div class="review">
      <p><strong>Jaan:</strong> "Tore üritus, kindlasti tulen uuesti!"</p>
    </div>
  </div>
</template>

<style scoped>
body {
    margin: 0; /* Eemalda vaikimisi marginaalid */
    padding: 0; /* Eemalda vaikimisi padding */
    min-height: 100vh; /* Veendu, et keha katab kogu kõrguse */
}

.header {
    /* Kui sul on pealkiri või menüü, veendu, et see oleks üleval */
    position: relative; /* Või fixed, kui soovid, et see jääks paika */
    z-index: 1000; /* Veendu, et see on teiste elementide kohal */
}

h1, p {
    margin: 0; /* Eemalda marginaalid */
    padding: 0; /* Eemalda padding */
}
.main-content {
    margin-top: 20px; /* Lisa ülemine vahe, kui vajalik */
    padding: 20px; /* Lisa sisedisain */
    width: 80%; /* Määra kindel laius */
    max-width: 600px; /* Määra maksimaalne laius */
    margin: 20px auto; /* Keskenda element */
}

</style>