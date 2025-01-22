<template>
    <main class="container">
        <div class="card">
            <h2 class="card-header">Join TicketZone</h2>
            <form @submit.prevent="signup">
                <div class="form-group mb-3">
                    <input 
                        type="text" 
                        v-model="name" 
                        class="form-control" 
                        placeholder="Full Name" 
                        required 
                    />
                </div>
                <div class="form-group mb-3">
                    <input 
                        type="text" 
                        v-model="email" 
                        class="form-control" 
                        placeholder="Enter your email or username" 
                        required 
                    />
                </div>
                <div class="form-group mb-3">
                    <input 
                        type="password" 
                        v-model="password" 
                        class="form-control" 
                        placeholder="Create a password" 
                        required 
                    />
                </div>
                <button type="submit" class="btn btn-success w-100">Sign Up</button>
                <p v-if="error" class="text-danger mt-3 text-center">{{ error }}</p>
            </form>
            <div class="text-center mt-3">
                <p>Already have an account? <router-link to="/login" class="text-success">Login</router-link></p>
            </div>
        </div>
    </main>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            name: '',
            email: '',
            password: '',
            error: null,
        };
    },
    methods: {
        signup() {
            this.error = null;

            axios.post('http://localhost:8080/api/auth/signup', {
                name: this.name,
                email: this.email,
                password: this.password
            })
                .then(response => {
                    console.log('User created successfully', response);
                    this.$router.push({ name: 'login' }); // Redirect to login page
                })
                .catch(error => {
                    console.log('Signup failed:', error);

                    // Kuvame täpsema vea vastavalt serveri tagastatud sõnumile
                    if (error.response && error.response.data && error.response.data.message) {
                        this.error = error.response.data.message;
                    } else {
                        this.error = 'Signup failed. Please try again.';
                    }
                });
        }
    }
};
</script>

<style scoped>
html, body {
    height: 100%;
    margin: 0;
    padding: 0;
}

.container {
    max-width: 400px;
    margin: 0 auto; /* Keskenda horisontaalselt */
    display: flex;
    flex-direction: column;
    justify-content: center; /* Keskenda vertikaalselt */
    align-items: center; /* Keskenda sisu */
    height: 100vh; /* Täiskõrgus, et oleks keskel */
}

.card {
    width: 100%; /* Mobiilis kaardi laius */
    max-width: 400px; /* Suuremate ekraanide maksimaalne laius */
    padding: 2rem; /* Lisa ruumi kaardile */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
}

.card-header {
    font-size: 1.5rem;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
    background-color: #28a745;
    color: white;
    border-radius: 5px;
    padding: 1rem;
    margin-bottom: 1rem;
}

.form-control {
    border-radius: 5px;
    padding: 0.5rem;
    font-size: 1rem;
}

.btn-success {
    background-color: #28a745;
    border: none;
    font-weight: bold;
    transition: background-color 0.3s;
}

.btn-success:hover {
    background-color: #218838;
}

.text-success {
    text-decoration: underline;
    cursor: pointer;
}

.text-success:hover {
    color: #1e7e34;
}

/* Meediapäring väiksemate ekraanide jaoks */
@media (max-width: 768px) {
    .card {
        padding: 1.5rem;
    }

    .card-header {
        font-size: 1.2rem;
    }

    .form-control {
        font-size: 1rem;
    }
}
</style>
