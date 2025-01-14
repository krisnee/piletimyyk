<template>
  <table class="table table-striped">
      <thead class="table-dark">
          <tr>
              <th>EventName</th>
              <th>Description</th>
              <th>Location</th>
              <th>Date</th>
              <th>Time</th>
              <th>Price</th>
          </tr>
      </thead>
      <tbody>
          <tr v-for="event in events" :key="event.EventID">
              <td>{{ event.EventID }}</td>
              <td>{{ event.EventName }}</td>
              <td>{{ event.Descritpion }}</td>
              <td>{{ event.Location }}</td>
              <td>{{ event.Date }}</td>
              <td>{{ event.Time }}</td>
              <td>{{ event.Price }}</td>
          </tr>
      </tbody>
  </table>
</template>

<script>
export default {
  name: "EventsTable",
  props: {
      events: Array
  }
}
</script>

<style scoped>
/* Siia saad lisada oma stiilid, kui on vajalik */
</style>