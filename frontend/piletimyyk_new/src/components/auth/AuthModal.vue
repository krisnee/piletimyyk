<script>
import { loginAsAdmin } from '@/auth'; // Impordi loginAsAdmin
import { ref } from 'vue';

export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '', // Eesnimi
      lastName: '', // Perekonnanimi
      isVisible: false,
      isLogin: true,
      error: null,
    };
  },
  methods: {
    openModal() {
      this.isVisible = true; // Avab hüpikakna
    },
    closeModal() {
      this.isVisible = false; // Sulgeb hüpikakna
      this.resetForm(); // Lähtestab vormi, kui hüpikaken suletakse
    },
    async submitForm() {
      if (this.isLogin) {
        // Sisselogimise loogika
        if (!this.validateEmail(this.email)) {
          this.error = 'Please enter a valid e-mail address.';
          return;
        }
        // Siin on adminkonto autentimise loogika
        if (this.email === 'admin@example.com' && this.password === 'password') { // Näiteks
          loginAsAdmin(); // Logi sisse adminina
          this.closeModal(); // Sulge modal
        } else {
          this.error = 'Invalid credentials';
        }
      } else {
        // Registreerimise loogika
        if (!this.validateEmail(this.email)) {
          this.error = 'Please enter a valid e-mail address.';
          return;
        }
        if (this.password !== this.confirmPassword) {
          this.error = 'Passwords don\'t match.';
          return;
        }
        // Siin saad sa saata POST päringu uue kasutaja loomiseks
        await this.registerUser();
      }
      this.closeModal();
    },
    async registerUser() {
      const response = await fetch('http://localhost:8080/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: this.firstName,
          last_name: this.lastName,
          email: this.email,
          password: this.password,
        }),
      });

      if (response.ok) {
        alert('User registered successfully!');
      } else {
        this.error = 'Registration failed. Please try again.';
      }
    },
    toggleMode() {
      this.isLogin = !this.isLogin; // Vahetab režiimi
      this.resetForm(); // Lähtestab vormi
    },
    resetForm() {
      this.email = '';
      this.password = '';
      this.confirmPassword = '';
      this.firstName = ''; // Lähtesta eesnimi
      this.lastName = ''; // Lähtesta perekonnanimi
      this.error = null;
    },
    validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // E-posti regulaaravaldis
      return re.test(email);
    }
  }
};
</script>

<template>
  <div v-if="isVisible" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2 class="card-header">{{ isLogin ? 'Log In' : 'Sign Up' }}</h2>
      <form @submit.prevent="submitForm" class="card-body">

        <div class="form-group mb-3" v-if="!isLogin">
          <input type="text" v-model="firstName" class="form-control" placeholder="First Name" required />
        </div>
        <div class="form-group mb-3" v-if="!isLogin">
          <input type="text" v-model="lastName" class="form-control" placeholder="Last Name" required />
        </div>
        <div class="form-group mb-3">
          <input type="email" v-model="email" class="form-control" placeholder="Enter your e-mail address" required />
        </div>
        <div class="form-group mb-3" v-if="!isLogin">
          <input type="password" v-model="password" class="form-control" placeholder="Create a password" required />
        </div>
        <div class="form-group mb-3" v-if="!isLogin">
          <input type="password" v-model="confirmPassword" class="form-control" placeholder="Confirm your password" required />
        </div>
        <div class="form-group mb-3" v-if="isLogin">
          <input type="password" v-model="password" class="form-control" placeholder="Enter your password" required />
        </div>
        <button type="submit" class="btn btn-secondary w-100">{{ isLogin ? 'Log In' : 'Sign Up' }}</button>
        <p v-if="error" class="text-danger mt-3 text-center">{{ error }}</p>
      </form>
      <p @click="toggleMode" class="toggle-mode">
        {{ isLogin ? 'Don\'t have an account? Sign up' : 'Already have an account? Log in' }}
      </p>
    </div>
  </div>
</template>
  
  <style scoped>
  .container {
      max-width: 400px;
  }
  .card-header {
      font-size: 1.5rem;
      font-weight: bold;
      text-transform: uppercase;
      margin-top: 20px;
      font: 1.5rem;
      margin-bottom: 20px;
  }
  .form-control {
      height: 50px; /* Suurenda kõrgust */
      font-size: 16px; /* Suurenda fondi suurust */
      padding: 10px; /* Lisa sisedisain */
      border: 1px solid #ccc; /* Piiride värv */
      border-radius: 5px; /* Ümarad nurgad */
      width: 90%; /* Täida kogu saadaval olev ruum */
      margin-bottom: 15px; /* Lisa vahe lahtrite vahel */
  }
  .btn-secondary {
      background-color: #007bff; /* Sinine nupp */
      color: white; /* Tekst valge */
      border: none;
      padding: 12px 20px; /* Nupu sisedisain */
      border-radius: 5px; /* Ümarad nurgad */
      cursor: pointer;
      transition: background-color 0.3s ease; /* Ülemineku efekt */ 
      font-size: 18px;
  }
  .btn-secondary:hover {
      background-color: #0056b3; /* Hover efekt */
  }
  .text-danger {
      color: red;
  }


  .toggle-mode {
      color: #007bff;
      cursor: pointer;
      text-align: center;
      margin-top: 10px;
  }
  .toggle-mode:hover {
      color: #0056b3; /* Heledam hover-efekt */
  }
  
  </style>