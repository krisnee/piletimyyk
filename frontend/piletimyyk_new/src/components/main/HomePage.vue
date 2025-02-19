<script setup>
import EventsTable from '@/components/event/EventsTable.vue';

const maxEvents = 3; // Määrake, kui palju üritusi kuvada
</script>

<template>
  <div>
    <h1>Welcome to Piletimüük</h1>
    <!-- <p>Find the best events in Estonia!</p>

    <h2>Popular events</h2> -->
    <div class="events-container">
      <EventsTable :maxEvents="maxEvents" />
    </div>

    <div class="info-columns">
      <div class="info-column">
        <h2>Quick links</h2>
        <div class="info-box">
          <p>❓ KKK</p>
        </div>
        <div class="info-box">
          <p>📱 Lae alla mobiilirakendus</p>
        </div>
        <div class="info-box">
          <p>📞 Võta ühendust</p>
        </div>
      </div>

      <div class="info-column">
        <h2>Notifications</h2>
        <div class="info-box">
          <p>🎫 Uus broneerimissüsteem on avatud!</p>
        </div>
        <div class="info-box">
          <p>💰 Märtsi ürituste soodusmüük kuni 1. märtsini</p>
        </div>
        <div class="info-box">
          <p>📧 Liitu uudiskirjaga - saa esimesena infot!</p>
        </div>
      </div>

      <div class="info-column">
        <h2>User reviews</h2>
        <div class="info-box">
          <p>⭐<strong>Maria:</strong> "Suurepärane kogemus! Soovitan!"</p>
        </div>
        <div class="info-box">
          <p>⭐<strong>Jaan:</strong> "Tore üritus, kindlasti tulen uuesti!"</p>
        </div>
        <div class="info-box">
          <p>⭐<strong>Kristiina:</strong> "Piletite ostmine oli lihtne ja kiire."</p>
        </div>
      </div>
    </div>
  
  </div>
</template>

<style scoped>
h1, h2 {
  margin: 20px 0;
  color: #333; /* Pealkirjade värv */
}

.events-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px; /* Vahe ürituste vahel */
}

.columns {
  display: flex;
  justify-content: space-between; /* Jagab tulbad ühtlaselt */
  margin-top: 20px;
}

.column {
  flex: 1; /* Iga tulba laius on ühtlane */
  margin: 0 10px; /* Vahe tulbade vahel */
  background: #f9f9f9; /* Taustavärv */
  padding: 15px; /* Padding tulba sees */
  border-radius: 5px; /* Ümarad nurgad */
}

.news-list {
  list-style-type: none;
  padding: 0;
}

.news-list li {
  margin: 10px 0;
}

.reviews {
  margin-top: 20px;
}

.review {
  background: #e9ecef; /* Arvustuste taust */
  padding: 10px;
  border-radius: 5px; /* Nurgad ümaraks */
  margin: 10px 0;
}
.info-columns {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 30px;
}

.info-column {
  flex: 1;
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
}

.info-box {
  background: #e9ecef;
  padding: 15px;
  margin: 10px 0;
  border-radius: 6px;
  transition: transform 0.2s;
}

.info-box:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

h2 {
  color: #333;
  margin-bottom: 20px;
}
</style>
