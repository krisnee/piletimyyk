<script>
export default {
  props: {
    message: String,
    type: {
      type: String,
      default: 'success', // 'success', 'error', 'info', jne.
    },
  },
  data() {
    return {
      visible: true,
    };
  },
  methods: {
    close() {
      this.visible = false;
    },
  },
};
</script>

<template>
  <div v-if="visible" class="notification" :class="type">
    <span>{{ message }}</span>
    <button @click="close">X</button>
  </div>
</template>

<style scoped>
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px;
  border-radius: 5px;
  color: white;
}
.success {
  background-color: green;
}
.error {
  background-color: red;
}
</style>