<script>
import EventsTable from '@/components/EventsTable.vue'
export default {
  components: { 
    EventsTable
  },
  data() { 
    return {
    allEvents: []
  }
},
  async created() {
    this.allEvents = await (await fetch('http://localhost:8080/events')).json()
  }
}
</script>

<template>
  <main>
    <EventsTable :items="allEvents
    
    "/>
  </main>
</template>