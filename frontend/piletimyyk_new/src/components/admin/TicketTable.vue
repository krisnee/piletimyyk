<script setup>
import { ref, onMounted, computed } from 'vue';
/* import TicketForm from '../ticket/TicketForm.vue'; */ // Eeldame, et teil on TicketForm komponent

const tickets = ref([]);

const fetchTickets = async () => {
  try {
    const response = await fetch('http://localhost:8080/tickets'); // Muuda URL vastavalt oma API-le
    tickets.value = await response.json();
    console.log('Fetched tickets:', tickets.value); // Debugging
  } catch (error) {
    console.error('Error fetching tickets:', error);
  }
};

// Kuupäeva vormindamine
const formatTicketDate = (dateTimeString) => {
  const date = new Date(dateTimeString);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('et-EE', options);
};

// Vormindatud piletid
const formattedTickets = computed(() => {
  return tickets.value.map(ticket => ({
    ...ticket,
    purchase_date: formatTicketDate(ticket.purchase_date) // Eeldame, et teil on purchase_date
  }));
});


onMounted(fetchTickets);
</script>

<template>
  <h2>Ticket Management</h2>
  <div class="management-container">


    <div class="table-container">
      <table class="tickets-table">
        <thead>
          <tr>
            <th>Event ID</th>
            <th>User ID</th>
            <th>Quantity</th>
            <th>Purchase Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ticket in formattedTickets" :key="ticket.ticket_id">
            <td>{{ ticket.event_id }}</td>
            <td>{{ ticket.user_id }}</td>
            <td>{{ ticket.quantity }}</td>
            <td>{{ ticket.purchase_date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.management-container {
  height: 120%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 10%;
}

.add-ticket-button {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  background-color: #0d6efd;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-bottom: 1.5rem;
}

.add-ticket-button:hover {
  background-color: #0b5ed7;
}

.table-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.tickets-table {
  width: 100%;
  border-collapse: collapse;
}

.tickets-table th,
.tickets-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.tickets-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.tickets-table tr:hover {
  background-color: #f8f9fa;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.25rem;
  color: #212529;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #6c757d;
  cursor: pointer;
  padding: 0;
}

.close-button:hover {
  color: #212529;
}
</style>