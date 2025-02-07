<script>
import SummaryManagement from './SummaryManagement.vue';
import EventManagement from './EventManagement.vue';
import UserManagement from './UserManagement.vue';

export default {
  data() {
    return {
      currentView: 'SummaryManagement',
    };
  },
  computed: {
    currentViewComponent() {
      return {
        SummaryManagement,
        EventManagement,
        UserManagement,
      }[this.currentView];
    },
  },
};
</script>

<template>
  <div>
    <h1>Admin Dashboard</h1>
    <nav>
      <button @click="currentView = 'SummaryManagement'">Manage Summaries</button>
      <button @click="currentView = 'EventManagement'">Manage Events</button>
      <button @click="currentView = 'UserManagement'">Manage Users</button>
    </nav>
    <component :is="currentViewComponent" />
  </div>
</template>

