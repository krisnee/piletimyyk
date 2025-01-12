<template>
  <table class="table table-striped">
      <thead class="table-dark">
          <tr>
              <th>TicketID</th>
              <th>EventName</th>
              <th>UserID</th>
              <th>PurchaseDate</th>
              <th>Price</th>
          </tr>
      </thead>
      <tbody>
          <tr v-for="ticket in tickets" :key="ticket.TicketID">
              <td>{{ ticket.TicketID }}</td>
              <td>{{ ticket.EventName }}</td>
              <td>{{ ticket.UserID }}</td>
              <td>{{ ticket.PurchaseDate }}</td>
              <td>{{ ticket.Price }}</td>
          </tr>
      </tbody>
  </table>
</template>

<script>
export default {
  name: "TicketsTable",
  props: {
      tickets: Array
  }
}
</script>

<style scoped>
/* Siia saad lisada oma stiilid, kui on vajalik */
</style>