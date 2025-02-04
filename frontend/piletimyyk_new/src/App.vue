<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router';
import AuthModal from './components/AuthModal.vue';
import { ref } from 'vue';

const authModalRef = ref(null); // Muuda see null-ks

const showAuthModal = () => {
  authModalRef.value.openModal(); // Ava modal
};
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/events">Events</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <button @click="showAuthModal" class="btn btn-secondary">Log In / Register</button>
      <RouterLink to="/admin">Admin</RouterLink>
    </nav>
    <p v-if="error" class="text-danger">{{ error }}</p>
    
  </header>

  <div class="container">
    <main>
      <RouterView />
    </main>
  </div>

  <AuthModal ref="authModalRef" />
</template>

<style scoped>
header {
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  overflow-x: hidden;
}

.container {
  padding-top: 5rem; /* Jätab ruumi päise all */
}

nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}

nav a {
  text-decoration: none;
  font-size: 1rem;
  color: #333;
  font-weight: bold;
  transition: color 0.3s;
}

nav a:hover {
  color: #007bff;
}

.btn-secondary {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 9px 18px;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-secondary:hover {
  background-color: #0056b3;
}
main {
  margin-top: 2rem;
  padding: 2rem;
  max-width: 800px;
}

</style>