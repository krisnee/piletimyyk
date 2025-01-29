<template>
    <div class="container col-12 col-sm-4 mt-5">
        <div class="card shadow-lg p-3 bg-white rounded">
            <h2 class="card-header text-center bg-primary text-white">Login</h2>
            <form @submit.prevent="login" class="card-body">
                <div class="form-group mb-3">
                    <input 
                        type="email" 
                        v-model="email" 
                        class="form-control" 
                        placeholder="Enter your email" 
                        required 
                    />
                </div>
                <div class="form-group mb-3">
                    <input 
                        type="password" 
                        v-model="password" 
                        class="form-control" 
                        placeholder="Enter your password" 
                        required 
                    />
                </div>
                <button type="submit" class="btn btn-primary w-100">Login</button>
                <p v-if="error" class="text-danger mt-3 text-center">{{ error }}</p>
            </form>
        </div>
    </div>
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
            this.error = null;

            axios.post('http://localhost:8080/api/auth/login', {
                email: this.email,
                password: this.password
            })
                .then(response => {
                    // Salvestame tokeni lokaalselt
                    const token = response.data.token;
                    localStorage.setItem('token', token);

                    // Siin ei dekodeerita JWT-d, lihtsalt salvestame
                    console.log('Login successful');
                    this.$router.push({ name: 'events' }); // Suuname sündmuste vaatesse
                })
                .catch(error => {
                    console.log('Login failed:', error);
                    this.error = 'Login failed. Please check your credentials.';
                });
        }
    }
};
</script>

<style scoped>
.container {
    max-width: 400px;
}
.card-header {
    font-size: 1.5rem;
    font-weight: bold;
    text-transform: uppercase;
}
.form-control {
    border-radius: 5px;
}
.btn-primary {
    background-color: #007bff;
    border: none;
    font-weight: bold;
}
.text-danger {
    color: red;
}
</style>