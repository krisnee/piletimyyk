<script>
import EventManagement from './EventManagement.vue';
import UserManagement from './UserManagement.vue';
import TicketTable from './TicketTable.vue';

export default {
  data() {
    return {
      currentView: 'EventManagement',
    };
  },
  computed: {
    currentViewComponent() {
      return {
        EventManagement,
        TicketTable,
        UserManagement,
      }[this.currentView];
    },
  },
};
</script>


<template>
  <main class="dashboard-container">  
    <div class="sidebar">
      <h1 class="dashboard-title">Admin Dashboard</h1>
      <nav class="nav-menu">
        <button 
          class="nav-button"
          :class="{ active: currentView === 'EventManagement' }"
          @click="currentView = 'EventManagement'"
        >
          Manage Events
        </button>
        <button 
          class="nav-button"
          :class="{ active: currentView === 'UserManagement' }"
          @click="currentView = 'UserManagement'"
        >
          Manage Users
        </button>
        <button 
          class="nav-button"
          :class="{ active: currentView === 'TicketTable' }"
          @click="currentView = 'TicketTable'"
        >
          Manage tickets
        </button>
      </nav>
    </div>
    <div class="content">
      <component :is="currentViewComponent" />
    </div>
  </main>
</template>

<style scoped>
.dashboard-container {
  display: flex;
  position: fixed; /* Fikseerib kogu dashboardi */
  top: 60px; /* Jätab ruumi ülemisele nav-barile */
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f5f5f5;
}

.sidebar {
  position: fixed;
  left: 0;
  top: 60px; /* Jätab ruumi ülemisele nav-barile */
  bottom: 0;
  width: 250px;
  background-color: #fff;
  padding: 2rem;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
}

.dashboard-title {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #eee;
}

.nav-menu {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.nav-button {
  width: 100%;
  padding: 1rem;
  text-align: left;
  background: transparent;
  border: none;
  border-radius: 8px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-button:hover {
  background-color: #f0f0f0;
  color: #333;
}

.nav-button.active {
  background-color: #e0e0e0;
  color: #000;
  font-weight: 500;
}

.content {
  margin-left: 250px; /* Vastab sidebar'i laiusele */
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
