<!-- <script setup>
import { ref } from 'vue';
import EventForm from './EventForm.vue';

const isModalOpen = ref(false);
const events = ref([]); // Ürituste loend

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const handleEventAdded = () => {
  fetchEvents(); // Uuenda ürituste loend
};

const fetchEvents = async () => {
  const response = await fetch('http://localhost:8080/events');
  const data = await response.json();
  events.value = data; // Uuenda ürituste loend
};
</script>

<template>
  <div>
    <button class="add-event-button" @click="openModal">Lisa uus üritus</button>
    <Modal v-if="isModalOpen" @close="closeModal">
      <EventForm @event-added="handleEventAdded" />
    </Modal>
  </div>
</template>

<style scoped>
.add-event-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
}

.close {
  cursor: pointer;
  float: right;
}
</style> -->