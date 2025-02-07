<template>
  <div>
    <h2>User Management</h2>
    <UserForm @user-added="fetchUsers" />
    <UsersTable :users="users" @edit-user="editUser" />
  </div>
</template>

<script>
import UserForm from '../auth/UserForm.vue'; // Komponent kasutaja lisamiseks
import UsersTable from '../auth/UsersTable.vue'; // Komponent kasutajate kuvamiseks

export default {
  components: {
    UserForm,
    UsersTable,
  },
  data() {
    return {
      users: [], // Algne kasutajate loend
    };
  },
  methods: {
    async fetchUsers() {
      // Siin tõmbate kasutajate andmed serverist
      const response = await fetch('http://localhost:8080/users');
      this.users = await response.json();
    },
    async deleteUser(userId) {
      await fetch(`http://localhost:8080/users/${userId}`, {
        method: 'DELETE',
      });
      this.fetchUsers(); // Uuendage kasutajate loendit
    },
    editUser(user) {
      // Redigeerimise loogika
    },
  },
  mounted() {
    this.fetchUsers(); // Tõmmake kasutajad, kui komponent on mountitud
  },
};
</script>