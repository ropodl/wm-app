<script setup>
import { ref } from "vue";

definePageMeta({
  layout: "user",
  middleware: ["user-auth"],
});

const currentIframe = ref(
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.3037015233126!2d85.3106774!3d27.738777199999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1935856a6fa9%3A0xcda47ee70e2fb593!2sPaper%2C%20plastic%20and%20steel%20recycle!5e0!3m2!1sen!2snp!4v1737492814782!5m2!1sen!2snp"
);
const searchQuery = ref("");
const searchResults = ref([]);
const loading = ref(false);

// Debounced search function using VueUse
const searchCenters = useDebounceFn(async () => {
  console.log("test");
  if (!searchQuery.value) {
    searchResults.value = [];
    return;
  }

  loading.value = true;
  // try {
  await useAxios(`map/search?query=${encodeURIComponent(searchQuery.value)}`)
    .then((res) => {
      searchResults.value = res;
    })
    .catch((error) => {
      console.error("Error searching centers:", error);
      searchResults.value = [];
    });
  loading.value = false;
}, 300);

// Using watchEffect instead of watch
watchEffect(() => {
  searchCenters();
});

// Function to select a center
const selectCenter = (center) => {
  currentIframe.value = center.iframe;
  searchQuery.value = center.name;
  searchResults.value = [];
};
</script>

<template>
  <div class="fill-height position-relative" style="overflow: hidden">
    <iframe
      v-if="currentIframe"
      :src="currentIframe"
      style="border: 0"
      allowfullscreen=""
      loading="lazy"
      class="w-100 h-100"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>

    <v-card
      border
      class="position-absolute"
      style="top: 10px; left: 10px; z-index: 9999; width: 300px"
    >
      <v-form @submit.prevent="searchCenters">
        <v-text-field
          v-model.trim="searchQuery"
          variant="solo"
          placeholder="Search for recycling center"
          autofocus
          autocomplete="off"
          hide-details
          prepend-inner-icon="mdi-magnify"
          rounded="0"
          clearable
          :loading="loading"
        >
        </v-text-field>
      </v-form>

      <!-- Search Results Dropdown -->
      <v-list
        v-if="searchResults.length > 0"
        density="compact"
        class="search-results"
      >
        <v-list-item
          v-for="result in searchResults"
          :key="result.slug"
          :title="result.name"
          @click="selectCenter(result)"
        ></v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<style scoped>
.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 9999;
}
</style>
