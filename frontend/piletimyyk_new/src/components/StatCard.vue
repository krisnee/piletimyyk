<template>
  <div class="stat-card">
    <div class="content">
      <p class="label">{{ title }}</p>
      <p class="value">{{ value }}</p>
    </div>
    <component :is="icon" class="icon" />
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    value: String,
    icon: String,
  },
};
</script>

<style scoped>
.stat-card {
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.content {
  display: flex;
  justify-content: space-between;
}
.label {
  color: #666;
}
.value {
  font-size: 24px;
  font-weight: bold;
}
.icon {
  height: 32px;
  width: 32px;
}
</style>