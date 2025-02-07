/*{ <script>
import axios from 'axios';

export default {
    data() {
        return {
            email: '',
            password: '',
            error: null,
            isVisible: false, // Hüpikakna nähtavuse haldamiseks
        };
    },
    methods: {
        openModal() {
            this.isVisible = true; // Avab hüpikakna
        },
        closeModal() {
            this.isVisible = false; // Sulgeb hüpikakna
        },
        login() {
            this.error = null;

            axios.post('http://localhost:8080/api/auth/login', {
                email: this.email,
                password: this.password // Lisa parool
            })
            .then(response => {
                const token = response.data.token;
                localStorage.setItem('token', token);
                console.log('Login successful');
                this.$router.push({ name: 'events' });
                this.closeModal(); // Sulge hüpikaken pärast sisselogimist
            })
            .catch(error => {
                console.log('Login failed:', error);
                this.error = 'Login failed. Please check your credentials.';
            });
        }
    }
};
</script>
 }*/
