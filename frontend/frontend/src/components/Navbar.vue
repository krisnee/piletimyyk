<template>
  <nav>
      <ul>
          <li><router-link to="/">Avaleht</router-link></li>
          <li><router-link to="/events">Üritused</router-link></li>
          <li><router-link to="/about">Teave</router-link></li>

          <!-- Näita väljalogimise nuppu, kui kasutaja on sisse logitud -->
          <li v-if="isAuthenticated">
              <button @click="logout">Logi välja</button>
          </li>
      </ul>
  </nav>
</template>

<script>
export default {
  data() {
      return {
          isAuthenticated: !!localStorage.getItem('token'),  // Algne olek põhineb localStorage'il
      };
  },
  methods: {
      logout() {
          // Eemalda token localStorage'ist, et kasutaja välja logida
          localStorage.removeItem('token');
          
          // Uuenda autentimise olek
          this.isAuthenticated = false;
          
          // Suuna sisselogimise lehele
          this.$router.push({ name: 'login' });
      }
  },
  watch: {
      // Jälgi muutusi localStorage'is ja uuenda autentimise olekut
      '$route'(to, from) {
          this.isAuthenticated = !!localStorage.getItem('token');
      }
  }
};
</script>

<style scoped>
nav {
  background-color: #333;
  color: white;
  padding: 1em;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  margin-bottom: 1rem;
}

ul {
  display: flex;
  list-style-type: none;
  padding: 0;
}

li {
  margin: 0 1em;
}

button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 0.5em 1em;
  cursor: pointer;
}

button:hover {
  background-color: #c0392b;
}
</style>