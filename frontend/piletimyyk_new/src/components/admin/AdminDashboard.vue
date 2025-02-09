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
  <main class="main">  
    <div class="min-h-screen bg-gray-50 p-8">
      <h1 class="fade">Admin Dashboard</h1>
      <nav>
        <button class="button" @click="currentView = 'SummaryManagement'">Manage Summaries</button>
        <button class="button" @click="currentView = 'EventManagement'">Manage Events</button>
        <button class="button" @click="currentView = 'UserManagement'">Manage Users</button>
      </nav>
      <component :is="currentViewComponent" />
    </div>
  </main>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
