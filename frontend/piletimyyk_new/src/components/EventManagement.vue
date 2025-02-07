<template>
  <div class="event-management">
    <div class="header">
      <h2>Ürituste haldus</h2>
      <button @click="addEvent" class="add-button">Lisa uus üritus</button>
    </div>
    <table>
      <thead>
        <tr>
          <th>Ürituse nimi</th>
          <th>Kuupäev</th>
          <th>Müüdud/Kokku</th>
          <th>Staatus</th>
          <th>Tegevused</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="event in events" :key="event.id">
          <td>{{ event.title }}</td>
          <td>{{ event.date }}</td>
          <td>{{ event.sold }}/{{ event.total }}</td>
          <td>{{ event.status }}</td>
          <td>
            <button @click="editEvent(event.event_id)">Redigeeri</button>
            <button @click="deleteEvent(event.event_id)">Kustuta</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    events: Array,
  },
  methods: {
    addEvent() {
      // Funktsioon uue ürituse lisamiseks
    },
    editEvent(id) {
      // Funktsioon ürituse redigeerimiseks
    },
    deleteEvent(id) {
      // Funktsioon ürituse kustutamiseks
    },
  },
};
</script>

<style scoped>
.event-management {
  margin-top: 24px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.add-button {
  background-color: #007bff;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 12px;
  border-bottom: 1px solid #ddd;
}
</style>