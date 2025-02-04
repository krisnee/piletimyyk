<script>
import { loginAsAdmin } from '@/auth'; // Impordi loginAsAdmin
import { ref } from 'vue';

export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
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
    submitForm() {
      if (this.isLogin) {
        // Sisselogimise loogika
        if (!this.validateEmail(this.email)) {
          this.error = 'Please enter a valid e-mail address.';
          return;
        }
        // Siin saad lisada oma autentimise loogika
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
        alert(`Signing up with e-mail: ${this.email}, Password: ${this.password}`);
      }
      this.closeModal();
    },
    toggleMode() {
      this.isLogin = !this.isLogin; // Vahetab režiimi
      this.resetForm(); // Lähtestab vormi
    },
    resetForm() {
      this.email = '';
      this.password = '';
      this.confirmPassword = '';
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
  /* Siin saad lisada oma stiilid */
  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }
  .modal-content {
    background-color: #E0F7FA;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: 400px;
  }
  .close {
    cursor: pointer;
    float: right;
    font-size: 1.5rem;
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
    color: #0056b3;
  }
  </style>