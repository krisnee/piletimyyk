<script setup>
import { ref } from 'vue';

const newEvent = ref({
  title: '',
  date: '',
  time: '',
  location: '',
  price: ''
});

const searchQuery = ref('');

const addEvent = () => {
  // Lisa siia event lisamise loogika
  console.log('Event added:', newEvent.value);
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-2xl font-bold text-gray-800">Admin Panel</h1>
        <div class="flex items-center gap-2">
          <span class="text-gray-600">Admin Kasutaja</span>
          <i class="fas fa-user-circle text-gray-500"></i>
        </div>
      </div>

      <!-- Add Event Form -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Ürituse pealkiri</label>
            <input
              v-model="newEvent.title"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Sisesta ürituse pealkiri"
            />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Kuupäev</label>
              <input
                v-model="newEvent.date"
                type="date"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Kellaaeg</label>
              <input
                v-model="newEvent.time"
                type="time"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Asukoht</label>
            <input
              v-model="newEvent.location"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Sisesta asukoht"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Hind</label>
            <div class="relative">
              <input
                v-model="newEvent.price"
                type="number"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                placeholder="0.00"
              />
              <span class="absolute right-3 top-2 text-gray-500">€</span>
            </div>
          </div>
        </div>
        <button
          @click="addEvent"
          class="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Lisa üritus
        </button>
      </div>

      <!-- Events List -->
      <div class="bg-white rounded-lg shadow-sm">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-semibold text-gray-800">Olemasolevad Üritused</h2>
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                class="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Otsi üritusi..."
              />
              <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>
          
          <div class="overflow-x-auto">
            <table class="min-w-full">
              <thead>
                <tr class="border-b">
                  <th class="text-left py-3 px-4 text-sm font-medium text-gray-500">Üritus</th>
                  <th class="text-left py-3 px-4 text-sm font-medium text-gray-500">Kuupäev</th>
                  <th class="text-left py-3 px-4 text-sm font-medium text-gray-500">Kellaaeg</th>
                  <th class="text-left py-3 px-4 text-sm font-medium text-gray-500">Hind</th>
                  <th class="text-right py-3 px-4 text-sm font-medium text-gray-500">Tegevused</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="event in events" :key="event.id" class="border-b hover:bg-gray-50">
                  <td class="py-3 px-4">{{ event.title }}</td>
                  <td class="py-3 px-4">{{ new Date(event.date).toLocaleDateString('et-EE') }}</td>
                  <td class="py-3 px-4">{{ event.time }}</td>
                  <td class="py-3 px-4">{{ event.price }}€</td>
                  <td class="py-3 px-4 text-right">
                    <button class="text-blue-600 hover:text-blue-800 mr-3">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button class="text-red-600 hover:text-red-800">
                      <i class="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>