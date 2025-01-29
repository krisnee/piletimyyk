import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080', // Muuda see vastavalt oma backendi URL-ile
  withCredentials: false, // See on vajalik, kui tegelete autentimisega
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default {
  getEvents() {
    return apiClient.get('/events');
  },
  getEvents(event_id) {
    return apiClient.get('/events/' + event_id);
  },
  buyTickets(ticket_id) {
    return apiClient.post('/tickets', { ticket_id });
  }
  // Lisage siia teised funktsioonid, mis teevad API päringuid
};