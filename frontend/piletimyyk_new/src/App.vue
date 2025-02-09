<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router';
import AuthModal from './components/auth/AuthModal.vue';
import { ref, onMounted, onUnmounted } from 'vue';

const authModalRef = ref(null); // Muuda see null-ks
const error = ref(null);

const showAuthModal = () => {
  if (authModalRef.value) {
    authModalRef.value.openModal();
  } else {
    error.value = "Unable to open auth modal";
  }
};
const isHeaderHidden = ref(false);
let lastScrollPosition = 0;

const onScroll = () => {
  const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  if (currentScrollPosition < 0) {
    return;
  }
  isHeaderHidden.value = currentScrollPosition > lastScrollPosition && currentScrollPosition > 50;
  lastScrollPosition = currentScrollPosition;
};

onMounted(() => {
  window.addEventListener('scroll', onScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
});

</script>

<template>
  <header> <!-- :class="{ 'header-hidden': isHeaderHidden }" -->
    <div class="header">
      <nav class="header-nav">
        <RouterLink class="nav-link" to="/">Home</RouterLink>
        <RouterLink class="nav-link" to="/events">Events</RouterLink>
        <RouterLink class="nav-link" to="/about">About</RouterLink>
        <button class="nav-button" @click="showAuthModal">Log In / Register</button>
        <RouterLink class="nav-link" to="/admin">Admin Panel</RouterLink>
      </nav>
        <p v-if="error" class="text-danger">{{ error }}</p>
    </div>
  </header>
  <main class="main">
    <RouterView />
    <AuthModal ref="authModalRef" />
  </main>
</template>

<style scoped>
/*
.header-hidden {
  transform: translateY(-100%);
}
*/

.container {
  padding-top: 0.1rem; /* Jätab ruumi päise all */
}
</style>