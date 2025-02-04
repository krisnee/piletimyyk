<script>
//import axios from 'axios';

export default {
    data() {
        return {
            email: '',
            password: '',
            confirmPassword: '',
            isVisible: false, // Hüpikakna nähtavuse haldamiseks
            isLogin: true, // Alguses on sisselogimise režiim
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
                alert(`Logging in with e-mail: ${this.email}, Password: ${this.password}`);
            } else {
                // Registreerimise loogika
                if (!this.validateEmail(this.email)) {
                    this.error = 'Please enter  valid e-mail address.';
                    return;
                }
                if (this.password !== this.confirmPassword) {
                    this.error = 'Passwords don\'t match.';
                    return;
                }
                alert(`Signing up with e-amail: ${this.email}, Password: ${this.password}`);
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
          <h2 class="card-header">{{ isLogin ? 'Log in' : 'Sign up' }}</h2>
          <form @submit.prevent="submitForm" class="card-body">
              <div class="form-group mb-3">
                  <input type="email" id="email" v-model="email" class="form-control" placeholder="Enter your e-mail aadress" required />
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
              <button type="submit" class="btn btn-secondary w-100">{{ isLogin ? 'Log in' : 'Sign up' }}</button>
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
    text-align: center;
}
.form-control {
    height: 45px; /* Suurenda kõrgust */
    font-size: 16px; /* Suurenda fondi suurust */
    padding: 10px; /* Lisa sisedisain */
    border: 1px solid #ccc; /* Piiride värv */
    border-radius: 5px; /* Ümarad nurgad */
    width: 96%; /* Täida kogu saadaval olev ruum */
    margin-bottom: 15px; /* Lisa vahe lahtrite vahel */
}
.btn-secondary {
    background-color: #007bff; /* Sinine nupp */
    color: white; /* Tekst valge */
    border: none;
    padding: 12px 140px; /* Nupu sisedisain */
    border-radius: 30px; /* Ümarad nurgad */
    cursor: pointer;
    transition: background-color 0.3s ease; /* Ülemineku efekt */ 
    font-size: 18px;
    width: 95%; /* Täida kogu saadaval olev ruum */
}
.btn-secondary:hover {
    background-color: #0056b3; /* Hover efekt */
}
.text-danger {
    color: red;
}
.modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Tumeda tausta efekt */
    z-index: 1000; /* Veendu, et see on üle teiste elementide */
}
.modal-content {
    background-color: #E0F7FA;
    padding: 20px;
    border-radius: 8px; /* Nurgad on ümarad */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Varju efekt */
    width: 400px; /* Saad muuta vastavalt vajadusele */
}
.close {
    cursor: pointer; /* Muuda kursor, et näidata, et see on klikitav */
    float: right; /* Paiguta sulgemisnupp paremale */
    font-size: 1.5rem; /* Suurenda sulgemisnupu suurust */
}
.close:hover {
    color: grey; /* Heledam hover-efekt */
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
