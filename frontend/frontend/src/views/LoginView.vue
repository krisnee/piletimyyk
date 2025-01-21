<template>
  <main class="container col-12 col-sm-3">
      <div class="card">
          <h2 class="card-header text-center">Logi sisse</h2>
          <form @submit.prevent="login" class="card-body">
              <div>
                  <input type="email" v-model="email" class="w-100 mb-1" placeholder="E-post" required />
              </div>
              <div>
                  <input type="password" v-model="password" class="w-100 mb-1" placeholder="Parool" required />
              </div>
              <button type="submit" class="w-100 btn btn-primary">Logi sisse</button>
              <p v-if="error" class="error">{{ error }}</p>
          </form>
          <p class="ps-1 pe-1 text-center">Ei ole veel kontot? <router-link to="/signup">Registreeru</router-link></p>
      </div>
  </main>
</template>

<script>
import axios from 'axios';

export default {
  data() {
      return {
          email: '',
          password: '',
          error: null,
      };
  },
  methods: {
      login() {
          // Tühjenda eelmine veateade
          this.error = null;

          axios.post('http://localhost:8080/api/auth/login', {
              email: this.email,
              password: this.password
          })
              .then(response => {
                  // Eduka sisselogimise korral salvestage token ja suunake kasutaja
                  console.log('Sisselogimine edukas', response);
                  // Siin saad salvestada tokeni ja suunata kasutaja peamise lehe juurde
                  this.$router.push({ name: 'home' }); // Suuna peamise lehe juurde
              })
              .catch(error => {
                  // Ebaõnnestumise korral kuva veateade
                  console.log('Sisselogimine ebaõnnestus:', error);
                  this.error = 'Sisselogimine ebaõnnestus. Palun proovi uuesti.';
              });
      }
  }
};
</script>

<style scoped>
.error {
  color: red;
  margin-top: 10px;
}
</style>