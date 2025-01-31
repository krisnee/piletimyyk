<template>
  <form>
      <div class="mb-3">
          <label for="ticketName" class="form-label">Pileti nimi</label>
          <input type="text" class="form-control" id="ticketName" v-model="TicketName" @input="$emit('update:TicketName', TicketName)">
      </div>
      <div class="mb-3">
          <label for="eventDate" class="form-label">Sündmuse kuupäev</label>
          <input type="date" class="form-control" id="eventDate" v-model="EventDate" @input="$emit('update:EventDate', EventDate)">
      </div>
      <div class="mb-3">
          <label for="price" class="form-label">Hind</label>
          <input type="number" class="form-control" id="price" v-model="Price" @input="$emit('update:Price', Price)">
      </div>
  </form>
</template>

<script>
import TicketForm from "./TicketForm.js";

export default TicketForm;
</script>

<style scoped>
/* Siia saad lisada oma stiilid */
</style>