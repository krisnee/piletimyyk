<script>
import AdminDashboard from '@/components/admin/AdminDashboard.vue';

export default {
  components: {
    AdminDashboard,
  },
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-2xl font-bold text-gray-800">Admin Panel</h1>
      <AdminDashboard />
    </div>
  </div>
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