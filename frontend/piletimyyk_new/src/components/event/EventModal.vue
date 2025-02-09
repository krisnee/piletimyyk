<template>
  <div class="modal" v-if="isOpen">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <slot></slot> <!-- Siin kuvatakse sisu, mis on modaalis -->
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isOpen = ref(false);

const openModal = () => {
  isOpen.value = true;
};

const closeModal = () => {
  isOpen.value = false;
};

defineExpose({ openModal, closeModal }); // Eksponeerime funktsioonid
</script>

<style scoped>
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
</style>