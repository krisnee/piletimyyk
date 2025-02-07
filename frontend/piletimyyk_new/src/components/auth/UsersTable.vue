<template>
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.user_id">
          <td>{{ user.first_name }}</td>
          <td>{{ user.last_name }}</td>
          <td>{{ user.email }}</td>
          <td>
            <button @click="editUser(user)">Edit</button>
            <button @click="deleteUser(user.user_id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </template>
  
  <script>
  export default {
    props: {
      users: Array,
    },
    methods: {
      editUser(user) {
        this.$emit('edit-user', user); // Edastage redigeerimise sündmus
      },
      async deleteUser(userId) {
        await fetch(`http://localhost:8080/users/${userId}`, {
          method: 'DELETE',
        });
        // Siin saate uuendada kasutajate loendit
      },
    },
  };
  </script>