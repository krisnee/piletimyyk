<script>
import UsersTable from '@/components/UsersTable.vue'
export default {
  components: { 
    UsersTable
  },
  data() { 
    return {
    allUsers: []
  }
},
  async created() {
    this.allUsers = await (await fetch('http://localhost:8080/users')).json()
  }
}
</script>

<template>
  <main>
    <EventsTable :items="allUsers
    
    "/>
  </main>
</template>