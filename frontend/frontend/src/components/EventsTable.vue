<template>
    <div class="table-responsive">
      <table class="table table-striped table-bordered">
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
            <td>{{ event.title }}</td>
            <td>{{ event.description }}</td>
            <td>{{ event.date }}</td>
            <td>{{ event.time }}</td>
            <td>{{ event.price.toFixed(2) }} €</td>
            <td>{{ event.location }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    name: "EventsTable",
    props: {
      events: Array,
    },
  };
  </script>
  
  <style scoped>
  .table {
    width: 100%;
    margin-top: 20px;
  }
  
  .table th, .table td {
    text-align: center;
  }
  
  .table th {
    font-size: 1.1rem;
  }
  
  .table td {
    font-size: 0.9rem;
  }
  
  .table-responsive {
    overflow-x: auto;
  }
  </style>