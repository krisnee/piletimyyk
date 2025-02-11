<script>
import { ref, watch } from 'vue';

export default {
  props: {
    user: Object,
  },
  setup(props, { emit }) {
    const user = ref({ first_name: '', last_name: '', email: '' });
    const isEdit = ref(false);

    watch(() => props.user, (newUser) => {
      if (newUser) {
        user.value = { ...newUser };
        isEdit.value = true;
      } else {
        user.value = { first_name: '', last_name: '', email: '' };
        isEdit.value = false;
      }
    });

    const createUser = async () => {
      const url = 'http://localhost:8080/users';
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user.value),
      });
      emit('user-added');
      emit('close'); // Sulge modaal pärast edastamist
    };

    const updateUser = async () => {
      const url = `http://localhost:8080/users/${user.value.user_id}`;
      await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user.value),
      });
      emit('user-updated');
      emit('close'); // Sulge modaal pärast edastamist
    };

    const deleteUser = async () => {
      const url = `http://localhost:8080/users/${user.value.user_id}`;
      await fetch(url, {
        method: 'DELETE',
      });
      emit('user-deleted'); // Edasta sündmus, et kasutaja on kustutatud
      emit('close'); // Sulge modaal pärast kustutamist
    };

    return {
      user,
      createUser,
      updateUser,
      isEdit,
      deleteUser,
    };
  },
};
</script>

<template>
  <div class="modal">
    <div class="modal-content">
      <span class="close" @click="$emit('close')">&times;</span>
      <form @submit.prevent="submitUser">
        <input v-model="user.user_id" placeholder="User ID" required/>
        <input v-model="user.first_name" placeholder="First name" required />
        <input v-model="user.last_name" placeholder="Last name" required />
        <input v-model="user.email" type="email" placeholder="Email" required />
        <button type="submit">Edit user</button>
      </form>
    </div>
  </div>
</template>

