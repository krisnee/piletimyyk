<script>
import TicketTable from '@/components/EventsTable.vue'
export default {
  components: { 
    TicketTable
  },
  data() {
    return {
    allTickets: []
  }
},
  async created() {
    this.allTickets = await (await fetch('http://localhost:8080/tickets')).json()
  }
}
</script>

<template>
  <main>
    <TicketTable :items="allTickets
    
    "/>
  </main>
</template>