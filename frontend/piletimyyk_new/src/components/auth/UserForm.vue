<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  user: {
    type: Object,
    default: () => null
  }
});

const emit = defineEmits(['close', 'user-updated']);

const userData = ref({
  first_name: '',
  last_name: '',
  email: ''
});

// Täidame vormi valitud kasutaja andmetega
watch(() => props.user, (newUser) => {
  if (newUser) {
    userData.value = {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email
    };
  }
}, { immediate: true });

const submitForm = async () => {
  try {
    const url = props.user 
      ? `http://localhost:8080/users/${props.user.user_id}` // UPDATE olemasolevat kasutajat
      : 'http://localhost:8080/users';                      // Lisa uus kasutaja
      
    const response = await fetch(url, {
      method: props.user ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData.value)
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    emit('user-updated');
    emit('close');
  } catch (error) {
    console.error('Error:', error);
  }
};
</script>

<template>
  <div class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h3>{{ props.user ? 'Edit User' : 'Add New User' }}</h3>
        <button class="close-button" @click="$emit('close')">&times;</button>
      </div>
      
      <form @submit.prevent="submitForm" class="form-container">
        <div class="form-group">
          <label for="firstName">First Name:</label>
          <input 
            id="firstName"
            v-model="userData.first_name"
            class="form-control"
            required
          />
        </div>

        <div class="form-group">
          <label for="lastName">Last Name:</label>
          <input 
            id="lastName"
            v-model="userData.last_name"
            class="form-control"
            required
          />
        </div>

        <div class="form-group">
          <label for="email">Email:</label>
          <input 
            id="email"
            type="email"
            v-model="userData.email"
            class="form-control"
            required
          />
        </div>

        <div class="button-group">
          <button type="button" class="btn btn-secondary" @click="$emit('close')">
            Cancel
          </button>
          <button type="submit" class="btn btn-primary">
            {{ props.user ? 'Save Changes' : 'Add User' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.25rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-control {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 14px;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
}

.btn-primary {
  background-color: #0d6efd;
  color: white;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-primary:hover {
  background-color: #0b5ed7;
}

.btn-secondary:hover {
  background-color: #5c636a;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6c757d;
}

.close-button:hover {
  color: #343a40;
}
</style>