<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});

const buyTicket = (event_id) => {
  // Parandatud event_id -> eventId
  alert(`Your ticket has been successfully purchased and will be sent to your email address!`);
};
</script>

<template>
    <!-- Font Awesome ikoonid -->
        <div class="events-container">
            <div class="event-card" v-for="event in items" :key="event.event_id">
            <h2 class="text-xl font-bold mb-2">{{ event.title }}</h2>
            
            <p class="mb-2"><i class="fa-solid fa-calendar"></i>&nbsp;&nbsp;{{ event.date }}&nbsp;&nbsp;<i class="fa-solid fa-clock"></i>&nbsp;{{ event.time }}</p>
            <p class="mb-2"><i class="fa-regular fa-compass"></i>&nbsp;&nbsp;{{ event.location }}</p>
            <p class="mb-4"><i class="fa-solid fa-money-bill-1"></i>&nbsp;&nbsp;{{ event.price }} €</p>
            <button class="buy-ticket"
                @click="buyTicket(event.event_id)"
            >
                Buy Ticket
            </button>
            </div>
        </div>
</template>

<style scoped>
.event-card {
  width: 300px; /* Fikseeritud laius */
  height: 250px; /* Fikseeritud kõrgus */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 1.15); /* Lisa kerge vari */
  border-radius: 8px; /* Ümaramad äärted */
  padding: 16px; /* Padding kaardi sees */
  background-color: white; /* Taustavärv */
  display: flex; /* Kasutame flexboxi kaardi sees */
  flex-direction: column; /* Paigutame sisu veergudesse */
  justify-content: space-between; /* Jagame sisu ühtlaselt */
}
@media (max-width: 768px) {
  .event-card {
    width: 100%; /* Muuda laius 100% väiksematel ekraanidel */
  }
}
.events-container {
  width: 940px; /* Fikseeritud laius */
  display: flex; /* Kasutame flexboxi */
  flex-wrap: wrap; /* Lubame elementidel mähkuda järgmisele reale */
  gap: 18px; /* Vahe kaardikeste vahel */
  justify-content: flex-start; /* Paigutame kaardid vasakule */
}

.event-card h2 {
  font-size: 1.5em;
  margin-bottom: 8px;
}

.event-date, .event-location, .event-price, .tickets-available {
  margin: 4px 0;
}

.buy-ticket {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 20px;
  cursor: pointer;
}

.buy-ticket:hover {
  background-color: #0056b3;
}

</style>