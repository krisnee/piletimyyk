
<script>
import UserForm from '../auth/UserForm.vue';
import Notification from '../main/Notification.vue';

export default {
  components: {
    UserForm,
    Notification,
  },
  data() {
    return {
      notificationVisible: false,
      notificationMessage: '',
      notificationType: 'success',
    };
  },
  methods: {
    showSuccess() {
      this.notificationMessage = 'Kasutaja on muudetud!';
      this.notificationType = 'success';
      this.notificationVisible = true;
      setTimeout(() => {
        this.notificationVisible = false;
      }, 3000);
    },
    showError() {
      this.notificationMessage = 'Kasutaja kustutamine ebaõnnestus!';
      this.notificationType = 'error';
      this.notificationVisible = true;
      setTimeout(() => {
        this.notificationVisible = false;
      }, 3000);
    },
  },
  setup() {
    const toast = useToast(); // Impordi toast
    const users = ref([]);
    const selectedUser = ref(null);
    const isModalOpen = ref(false);

    const fetchUsers = async () => {
      const response = await fetch('http://localhost:8080/users');
      users.value = await response.json();
    };

    const deleteUser = async (user_id) => {
      await fetch(`http://localhost:8080/users/${user_id}`, {
        method: 'DELETE',
      });
      fetchUsers();
      toast.success('User is successfully deleted!'); // Teavitus kustutamise kohta
    };

    const editUser = (user) => {
      selectedUser.value = user; // Määra valitud kasutaja
      isModalOpen.value = true; // Ava modaalaken
    };

    const closeModal = () => {
      isModalOpen.value = false; // Sulge modaalaken
      selectedUser.value = null; // Tühjenda valitud kasutaja
    };

    // Fetch users on mount
    onMounted(fetchUsers);

    return {
      users,
      selectedUser,
      isModalOpen,
      fetchUsers,
      deleteUser,
      editUser,
      closeModal,
    };
  },
};
</script>

<template>
  <div class="main">
    <h2>User Management</h2>
    <UserForm @user-updated="fetchUsers" :user="selectedUser" v-if="isModalOpen" @close="closeModal" />
    
    <div class="table-container">
      <table class="users-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>Actions</th> <!-- Uus veerg tegevuste jaoks -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.user_id">
            <td>{{ user.user_id }}</td>
            <td>{{ user.first_name }}</td>
            <td>{{ user.last_name }}</td>
            <td>{{ user.email }}</td>
            <td>
              <button class="edit-button" @click="editUser(user)">Edit</button>
              <button  class="delete-button" @click="deleteUser(user.user_id)">Delete</button>
              <button @click="showSuccess">Show Success</button>
    <button @click="showError">Show Error</button>
    <Notification v-if="notificationVisible" :message="notificationMessage" :type="notificationType" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.table-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
}

.edit-user-button {
  margin-bottom: 20px;
  padding: 10px 20px; /* Väiksem padding */
  font-size: 14px; /* Väiksem font */
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
}

.users-table th,
.users-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.users-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}
</style>