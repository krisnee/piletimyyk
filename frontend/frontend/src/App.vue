<template>
<<<<<<< HEAD
  <div>
    <Navbar />  <!-- Include the Navbar -->
    <router-view /> <!-- This is where the routed components will be displayed -->
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  components: {
    Navbar,
  },
};
</script>
=======
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
/* Header stiil */
header {
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

/* Nav stiil */
nav {
  display: flex;
  justify-content: center; /* Keskenda lingid horisontaalselt */
  align-items: center; /* Joonda lingid vertikaalselt */
  gap: 2rem; /* Ruumi lingide vahel */
}

nav a {
  text-decoration: none;
  font-size: 1rem;
  color: #333;
  font-weight: bold;
  transition: color 0.3s;
}

nav a.router-link-exact-active {
  color: #007bff; 
}

nav a:hover {
  color: #0056b3; 
}


main {
  padding-top: 5rem; 
}
</style>
>>>>>>> 7ae190b5dc2c5cafad0e069dbfe0defe9d8c2771
