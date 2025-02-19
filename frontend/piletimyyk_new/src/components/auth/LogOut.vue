<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const handleLogout = () => {
  try {
    // Kustuta token
    localStorage.removeItem('token');
    // Kustuta ka muud võimalikud auth andmed
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    
    // Suuna kasutaja login lehele
    router.push('/login');
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
</script>

<template>
  <button class="btn btn-secondary" @click="handleLogout">
    Logout
  </button>
</template>

<style scoped>
.btn {
  padding: 6px 12px;
  border: none;
  border-radius: 20px;
  padding: 9px 18px;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5c636a;
}
</style>