<template>
  <div>
      <h2>Pileti Detailid</h2>
      <p><strong>Pileti ID:</strong> {{ ticketInModal.TicketID }}</p>
      <p><strong>Pileti nimi:</strong> {{ ticketInModal.TicketName }}</p>
      <p><strong>Sündmuse kuupäev:</strong> {{ ticketInModal.EventDate }}</p>
      <p><strong>Hind:</strong> {{ ticketInModal.Price }} €</p>
  </div>
</template>

<script>
import TicketDetails from "./TicketDetails.js";

export default TicketDetails;
</script>

<style scoped>
/* Siia saad lisada oma stiilid */
</style>