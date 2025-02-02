<script setup>
import { RouterLink, RouterView } from 'vue-router'
import AuthModal from './components/AuthModal.vue'
import { ref } from 'vue';
//import HelloWorld from './components/HelloWorld.vue'
const authModalRef = ref(null); // Viidatud AuthModalile

const showAuthModal = () => {
    authModalRef.value.openModal(); // Avab AuthModal
};
</script>

<template>
  <header>
    <div>
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
    <div class="wrapper"><HelloWorld msg="You did it!" />   </div>-->
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/events">Events</RouterLink>
        <div class="topnav">
          <input type="text" placeholder="Search events.." class="search-input">
        </div>
        <RouterLink to="/about">About</RouterLink>
        <button  @click="showAuthModal" type="submit" class="btn btn-secondary w-100">Log In / Register</button>
        <p v-if="error" class="text-danger mt-3 text-center">{{ error }}</p>
      </nav>
  </div>
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
  margin-bottom: 1rem;
  line-height: 1.5;
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
  background-color: transparent;
}
nav a.router-link-exact-active {
  color: #007bff;
}
.search-input {
  padding: 0.5rem;
  border-radius: 20px;
  border: 1px solid #ccc;
  width: 360px;
  text-align: center;
}
main {
  padding-top: 5rem;
}

ul {
  display: flex;
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 1em;
}

@media (max-width: 768px) {
  .topnav {
    flex-direction: column; /* Muutke paigutust väiksematel ekraanidel */
  }
}
.btn-secondary {
    background-color: #007bff; /* Sinine nupp */
    color: white; /* Tekst valge */
    border: none;
    padding: 9px 18px; /* Suurenda nupu sisedisaini */
    border-radius: 5px; /* Ümarad nurgad */
    cursor: pointer;
    transition: background-color 0.3s ease; /* Ülemineku efekt */ 
    font-size: 16px; /* Muuda fondi suurust, et see sobiks teistega */
    font-family: Arial, sans-serif; /* Muuda fondi tüüp, et see sobiks teistele elementidele */
    font-weight: small; /* Muuda fondi paksus, et see sobiks teistele elementidele */
}

.btn-secondary:hover {
    background-color: #0056b3; /* Tumenev sinine hover-efekt */
}
</style>
