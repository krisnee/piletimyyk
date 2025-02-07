<template>
  <form @submit.prevent="submitUser">
    <input v-model="user.first_name" placeholder="First Name" required />
    <input v-model="user.last_name" placeholder="Last Name" required />
    <input v-model="user.email" type="email" placeholder="Email" required />
    <button type="submit">Add User</button>
  </form>
</template>

<script>
import { ref } from 'vue';

export default {
  setup(props, { emit }) {
    const user = ref({ first_name: '', last_name: '', email: '' });

    const submitUser = async () => {
      await fetch('http://localhost:8080/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user.value),
      });
      emit('user-added'); // Teata, et kasutaja on lisatud
      user.value = { first_name: '', last_name: '', email: '' }; // Tühjenda vorm
    };

    return {
      user,
      submitUser,
    };
  },
};
</script>