<template>
  <div class="not-found">
    <h1>404 - Lehte ei leitud</h1>
    <p>Otsitud lehte ei leitud. Palun kontrolli URL-i või mine tagasi <router-link to="/">avalehele</router-link>.</p>
  </div>
</template>

<script>
export default {
  name: 'NotFoundView',
}
</script>

<style scoped>
.not-found {
  text-align: center;
  margin-top: 50px;
}

.not-found h1 {
  font-size: 2em;
  color: #ff0000; /* Punane värv 404 jaoks */
}

.not-found p {
  font-size: 1.2em;
}
</style>