<template>
  <header>
    <nav>
      <RouterLink>Piletimüük-API</RouterLink>
      <div class="topnav">
        <input type="text" placeholder="Search events.." class="search-input">
      </div>
      <RouterLink to="/events">Events</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/login">Tickets</RouterLink>
<RouterLink to="/signup">Sign Up</RouterLink>

    </nav>
  </header>
</template>

<style scoped>
/* Header stiil */
header {
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  margin-bottom: 1rem;
}

/* Nav stiil */
nav {
  display: flex;
  justify-content: center; /* Keskenda lingid horisontaalselt */
  align-items: center; /* Joonda lingid vertikaalselt */
  gap: 2rem; /* Ruumi lingide vahel */
}

nav a {
  text-decoration: none;
  font-size: 1rem;
  color: #333;
  font-weight: bold;
  transition: color 0.3s;
}

nav a.router-link-exact-active {
  color: #007bff; 
}

nav a:hover {
  color: #0056b3; 
}


main {
  padding-top: 5rem; 
}

.search-input {
  padding: 0.5rem;
  border-radius: 20px; /* Ümarad nurgad */
  border: 1px solid #ccc;
  width: 360px; /* Suurem otsinguriba */
}
@media (max-width: 768px) {
  .topnav {
    flex-direction: column; /* Muutke paigutust väiksematel ekraanidel */
  }
}
ul {
  display: flex;
  list-style-type: none;
  padding: 0;
}

li {
  margin: 0 1em;
}

button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 0.5em 1em;
  cursor: pointer;
}

button:hover {
  background-color: #c0392b;
}

</style>
