<script setup>
import EventsTable from '@/components/event/EventsTable.vue';

const maxEvents = 3; // Määrake, kui palju üritusi kuvada
</script>

<template>
  <div>
    <h1>Welcome to Piletimüük</h1>
    <p>Find the best events in Estonia!</p>

    <h2>Popular events</h2>
    <EventsTable :maxEvents="maxEvents" />

    <h2>News </h2>
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
h1, h2 {
  margin: 20px 0;
}

.review {
  margin: 10px 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 10px 0;
}
</style>

