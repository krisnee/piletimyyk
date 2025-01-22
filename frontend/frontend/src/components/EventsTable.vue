<template>
  <table class="table table-striped">
      <thead class="table-dark">
          <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Date</th>
              <th>Time</th>
              <th>Price</th>
              <th>Location</th>
          </tr>
      </thead>
      <tbody>
          <tr v-for="event in events" :key="event.event_id">
              <td>{{ event.event_id }}</td>
              <td>{{ event.title }}</td>
              <td>{{ event.descritpion }}</td>
              <td>{{ event.date }}</td>
              <td>{{ event.time }}</td>
              <td>{{ event.price }}</td>
              <td>{{ event.location }}</td>
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