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
      users: [],
      selectedUser: null,
      isModalOpen: false,
    };
  },
  methods: {
    showSuccess() {
      this.notificationMessage = 'User has been changed!';
      this.notificationType = 'success';
      this.notificationVisible = true;

      setTimeout(() => {
        this.notificationVisible = false;
      }, 3000);
    },
    showError() {
      this.notificationMessage = 'User deletion failed!';
      this.notificationType = 'error';
      this.notificationVisible = true;

      setTimeout(() => {
        this.notificationVisible = false;
      }, 3000);
    },
    closeModal() {
      this.isModalOpen = false; // Sulge modaalaken
      this.selectedUser = null; // Tühjenda valitud kasutaja
    },
    editUser(user) {
      this.selectedUser = user; // Määra valitud kasutaja
      this.isModalOpen = true; // Ava modaalaken
    },
    async deleteUser(user_id) {
      await fetch(`http://localhost:8080/users/${user_id}`, {
        method: 'DELETE',
      });
      await this.fetchUsers();
      this.showSuccess(); // Kasuta oma teavitust
    },
    async fetchUsers() {
      const response = await fetch('http://localhost:8080/users');
      this.users = await response.json();
    },
  },
  mounted() {
    this.fetchUsers(); // Laadi kasutajad
  },
};
</script>

<template>
  <div class="main">
    <h2>User Management</h2>
    <UserForm v-if="isModalOpen" @user-updated="fetchUsers" :user="selectedUser" @close="closeModal" />
    
    <div class="table-container">
      <table class="users-table" v-if="users.length > 0">
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

            </td>
          </tr>
        </tbody>
      </table>
        <div v-else>
        <p>No users found.</p>
        </div>
    </div>
    <Notification v-if="notificationVisible" :message="notificationMessage" :type="notificationType" />
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