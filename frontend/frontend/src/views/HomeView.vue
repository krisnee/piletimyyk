<script>
import EventsTable from '@/components/EventsTable.vue';

export default {
  components: {
    EventsTable,
  },
  data() {
    return {
      allEvents: [], // API-st saadud sündmused
      isLoading: true, // Näitab laadimise olekut
      error: null, // Vigade kuvamine
    };
  },
  async created() {
    try {
      const response = await fetch('http://localhost:8080/events'); // Laadib sündmused backendist
      if (!response.ok) {
       console.log(response); // Logige vastus, et näha, mis on valesti
       throw new Error('Failed to fetch events');
    }
  }
     catch (err) {
      this.error = err.message; // Kuvab vea, kui midagi läheb valesti
    } finally {
      this.isLoading = false; // Lõpetab laadimise oleku
    }
  }
}
</script>

<template>
  <main class="container">
    <h1>Available Events</h1>
    <p v-if="isLoading">Loading events...</p>
    <p v-if="error" style="color: red;">{{ error }}</p>
      
    <!-- Sorting and Category Options -->
    <div class="row d-flex align-items-center mb-2">
      <div class="col-auto">
        <label for="category" class="form-label me-2">Category:</label>
        <select id="category" v-model="selectedCategory" class="form-select form-select-sm d-inline-block w-auto">
          <option value="events">All</option>
          <option value="music">Music</option>
          <option value="sport">Sport</option>
          <option value="theatre">Theatre</option>
        </select>
      </div>
      <div class="col-auto ms-auto">
        <div class="sorting-options">
          <label for="sortColumn" class="form-label me-2">Sort By:</label>
          <select id="sortColumn" v-model="sortOption" class="form-select form-select-sm d-inline-block w-auto">
            <option value="title:asc">Location (A-Z)</option>
            <option value="title:desc">Location (Z-A)</option>
            <option value="date:asc">Date (Ascending)</option>
            <option value="date:desc">Date (Descending)</option>
            <option value="price:asc">Price (Ascending)</option>
            <option value="price:desc">Price (Descending)</option>
          </select>
        </div>
      </div>
    </div>
  
  </main>
</template>

<style>
main {
  text-align: center;
  padding: 20px;
}

h1 {
  color: #0056b3;
}
.container {
  max-width: 1200px; /* Määrake soovitud maksimaalne laius */
  margin: 0 auto; /* Keskendage konteiner */
}

</style>
