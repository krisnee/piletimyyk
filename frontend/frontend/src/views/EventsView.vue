<template>
  <main class="container col-12 col-sm-7">
    <h2 class="text-center">Events</h2>

    <!-- Sorting Options -->
    <div class="row d-flex align-items-center mb-2">
      <div class="col-auto">
        <button v-if="!showAddForm && !editingEvent && isAdmin" @click="showAddForm = true" class="btn btn-primary btn-sm">Add Event</button>
      </div>
      <div class="col-auto ms-auto">
        <div class="sorting-options">
          <label for="sortColumn" class="form-label me-2">Sort By:</label>
          <select id="sortColumn" v-model="sortOption" class="form-select form-select-sm d-inline-block w-auto">
            <option value="title:asc">Title (A-Z)</option>
            <option value="title:desc">Title (Z-A)</option>
            <option value="date:asc">Date (Ascending)</option>
            <option value="date:desc">Date (Descending)</option>
            <option value="price:asc">Price (Ascending)</option>
            <option value="price:desc">Price (Descending)</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Add Event Form -->
    <div v-if="showAddForm && isAdmin" class="edit-form container">
      <h2>Add New Event</h2>
      <form @submit.prevent="addItem">
        <div class="row col-12 col-sm-6 mb-2">
          <div class="row d-flex mb-1">
            <div class="col-4">
              <label for="title">Title:</label>
            </div>
            <div class="col-8">
              <input type="text" v-model="newEvent.title" required />
            </div>
          </div>
          <div class="row d-flex mb-1">
            <div class="col-4">
              <label for="price">Price:</label>            
            </div>
            <div class="col-8">
              <input type="number" v-model="newEvent.price" required />
            </div>
          </div>
          <div class="row d-flex mb-1">
            <div class="col-4">
              <label for="description">Description:</label>
            </div>
            <div class="col-8">
              <input type="text" v-model="newEvent.description" />
            </div>
          </div>
          <div class="row d-flex mb-1">
            <div class="col-4">
              <label for="date">Date:</label>
            </div>
            <div class="col-8">
              <input type="date" v-model="newEvent.date" />
            </div>
          </div>
          <div class="row d-flex mb-1">
            <div class="col-4">
              <label for="time">Time:</label>
            </div>
            <div class="col-8">
              <input type="time" v-model="newEvent.time" />
            </div>
          </div>
          <div class="d-flex justify-content-end">
            <button class="btn btn-info btn-sm me-1" type="button" @click="showAddForm = false">Cancel</button>
            <button class="btn btn-primary btn-sm" type="submit">Add Event</button>
          </div>
        </div>
      </form>
    </div>

    <!-- Edit Event Form -->
    <div v-if="editingEvent && isAdmin" class="edit-form container">
      <h2>Edit Event</h2>
      <form @submit.prevent="updateItem">
        <div class="row col-12 col-sm-6 mb-2">
          <div class="row d-flex mb-1">
            <div class="col-4">
              <label for="editTitle">Title:</label>
            </div>
            <div class="col-8">
              <input type="text" v-model="editingEvent.title" required />
            </div>
          </div>
          <div class="row d-flex mb-1">
            <div class="col-4">
              <label for="editPrice">Price:</label>
            </div>
            <div class="col-8">
              <input type="number" v-model="editingEvent.price" required />
            </div>
          </div>
          <div class="row d-flex mb-1">
            <div class="col-4">
              <label for="editDescription">Description:</label>
            </div>
            <div class="col-8">
              <input type="text" v-model="editingEvent.description" />
            </div>
          </div>
          <div class="row d-flex mb-1">
            <div class="col-4">
              <label for="editDate">Date:</label>
            </div>
            <div class="col-8">
              <input type="date" v-model="editingEvent.date" />
            </div>
          </div>
          <div class="row d-flex mb-1">
            <div class="col-4">
              <label for="editTime">Time:</label>
            </div>
            <div class="col-8">
              <input type="time" v-model="editingEvent.time" />
            </div>
          </div>
          <div class="d-flex justify-content-end">
            <button class="btn btn-info btn-sm me-1" type="button" @click="cancelEdit">Cancel</button>
            <button class="btn btn-primary btn-sm" type="submit">Save Changes</button>
          </div>
        </div>
      </form>
    </div>

    <!-- Events Table -->
    <EventsTable
      :items="sortedEvents"
      :isAdmin="isAdmin"
      @delete-item="deleteItem"
      @edit-item="editItem"
    />

  </main>
</template>

<script>
import EventsTable from "../components/EventsTable.vue";
//import jwt_decode from "jwt-decode";

export default {
  components: { EventsTable },
  data() {
    return {
      allEvents: [],
      sortOption: "title:asc",
      editingEvent: null,
      showAddForm: false,
      newEvent: {
        title: "",
        price: "",
        description: "",
        date: "",
        time: "",
      },
      isAdmin: false,
    };
  },
  computed: {
    sortColumn() {
      return this.sortOption.split(":")[0];
    },
    sortOrder() {
      return this.sortOption.split(":")[1];
    },
    sortedEvents() {
      return [...this.allEvents].sort((a, b) => {
        let result = 0;
        if (this.sortColumn === "price" || this.sortColumn === "date") {
          result = a[this.sortColumn] > b[this.sortColumn] ? 1 : -1;
        } else {
          result = a[this.sortColumn]?.localeCompare(b[this.sortColumn] || "");
        }
        return this.sortOrder === "asc" ? result : -result;
      });
    },
  },
  async created() {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = jwt_decode(token);
        this.isAdmin = decoded?.role === "admin";
      }

      const response = await fetch("http://localhost:8080/events");
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      this.allEvents = await response.json();
    } catch (error) {
      console.error("Error fetching events:", error.message);
    }
  },
  methods: {
    cancelEdit() {
      this.editingEvent = null;
    },
    async deleteItem(eventId) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:8080/events/${eventId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to delete event");

        this.allEvents = this.allEvents.filter((event) => event.event_id !== eventId);
      } catch (error) {
        console.error("Error deleting event:", error.message);
      }
    },
    editItem(event) {
      this.editingEvent = { ...event };
    },
    async updateItem() {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:8080/events/${this.editingEvent.event_id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(this.editingEvent),
          }
        );

        if (!response.ok) throw new Error("Failed to update event");

        const updatedEvent = await response.json();
        const index = this.allEvents.findIndex(
          (event) => event.event_id === updatedEvent.event_id
        );
        if (index !== -1) {
          this.allEvents.splice(index, 1, updatedEvent);
        }
        this.editingEvent = null;
      } catch (error) {
        console.error("Error updating event:", error.message);
      }
    },
    async addItem() {
      try {
        const token = localStorage.getItem("token");
        const eventPayload = {
          title: this.newEvent.title.trim(),
          price: Number(this.newEvent.price),
          description: this.newEvent.description.trim(),
          date: this.newEvent.date,
          time: this.newEvent.time,
        };

        const response = await fetch("http://localhost:8080/events", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(eventPayload),
        });

        if (!response.ok) throw new Error("Failed to add event");

        const createdEvent = await response.json();
        this.allEvents.push(createdEvent);
        this.showAddForm = false;
        this.newEvent = { title: "", price: "", description: "", date: "", time: "" };
      } catch (error) {
        console.error("Error adding event:", error.message);
      }
    },
  },
};
</script>

<style scoped>
/* Siin saad lisada oma stiilid */
</style>