<template>
  <main class="container col-12 col-sm-3">
      <div class="card">
          <h2 class="card-header text-center">Registreeru</h2>
          <form @submit.prevent="signup" class="card-body">
              <div>
                  <input type="text" v-model="firstName" class="w-100 mb-1" placeholder="Eesnimi" required />
              </div>
              <div>
                  <input type="text" v-model="lastName" class="w-100 mb-1" placeholder="Perekonnanimi" required />
              </div>
              <div>
                  <input type="email" v-model="email" class="w-100 mb-1" placeholder="E-post" required />
              </div>
              <div>
                  <input type="password" v-model="password" class="w-100 mb-1" placeholder="Parool" required />
              </div>
              <button type="submit" class="w-100 btn btn-primary">Registreeru</button>
              <p v-if="error" class="error">{{ error }}</p>
          </form>
          <p class="ps-1 pe-1 text-center">Juba on konto? <router-link to="/login">Logi sisse</router-link></p>
      </div>
  </main>
</template>

<script>
import axios from 'axios';

export default {
  data() {
      return {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          error: null,
      };
  },
  methods: {
      signup() {
          // Tühjenda eelmine veateade
          this.error = null;
          
          axios.post('http://localhost:8080/api/auth/signup', {
              first_name: this.firstName,
              last_name: this.lastName,
              email: this.email,
              password: this.password
          })
              .then(response => {
                  // Eduka registreerimise korral suuna sisselogimise lehele
                  console.log('Kasutaja loodud edukalt', response);
                  this.$router.push({ name: 'login' }); // Suuna sisselogimise lehele
              })
              .catch(error => {
                  // Ebaõnnestumise korral kuva veateade
                  console.log('Registreerimine ebaõnnestus:', error);
                  this.error = 'Registreerimine ebaõnnestus. Palun proovi uuesti.';
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