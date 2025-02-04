<!-- <script setup>
import { ref, computed, watchEffect } from "vue";
import { useDebounceFn } from "@vueuse/core";

definePageMeta({
  layout: "user",
  middleware: ["user-auth"],
});

const currentIframe = ref("");
const searchQuery = ref("");
const searchResults = ref([]);
const loading = ref(false);

// Debounced search function
const searchCenters = useDebounceFn(async () => {
  if (!searchQuery.value.trim()) {
    searchResults.value = [];
    return;
  }

  try {
    loading.value = true;
    const res = await useAxios.get(
      `user/map/search?query=${searchQuery.value.trim()}`
    );
    searchResults.value = res.data || [];
  } catch (error) {
    searchResults.value = [];
    console.error("Search error:", error);
  } finally {
    loading.value = false;
  }
}, 500);

// Computed property to check if results exist
const hasResults = computed(() => searchResults.value.length > 0);

// Watch search query changes
watchEffect(() => {
  searchCenters();
});

// Select a recycling center
const selectCenter = (center) => {
  currentIframe.value = center.iframe;
  searchQuery.value = center.name;
  searchResults.value = [];
};
</script>

<template>
  <div class="d-flex fill-height">
    <v-card border="e" rounded="0" class="fill-height" width="300"> </v-card>
    <div class="fill-height position-relative" style="overflow: hidden">
      <iframe
        v-if="currentIframe"
        :src="currentIframe"
        style="border: 0"
        allowfullscreen
        loading="lazy"
        class="w-100 h-100"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </div>
  <!-- previous -->
<!-- <v-card
    border
    class="position-absolute"
    style="top: 10px; right: 10px; z-index: 9999; width: 300px"
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
        clearable
        :loading="loading"
        @click:clear="searchResults = []"
      />
    </v-form>

    Search Results
    <template v-if="hasResults">
      <v-divider></v-divider>
      <v-list density="compact">
        <v-list-item
          v-for="result in searchResults"
          :key="result.slug"
          :title="result.name"
          @click="selectCenter(result)"
        ></v-list-item>
      </v-list>
    </template>
  </v-card>
</template> -->
<script setup>
// import { ref, computed, watchEffect, onMounted } from "vue";
import { useDebounceFn } from "@vueuse/core";

definePageMeta({
  layout: "user",
  middleware: ["user-auth"],
});

const currentIframe = ref("");
const searchQuery = ref("");
const searchResults = ref([]);
const nearestCenter = ref(null);
const loading = ref(false);
const userLocation = ref({ lat: null, long: null });

const pagination = ref({
  page: 1,
  itemsPerPage: 10,
  totalPages: 1,
});

// Get user's location
const fetchUserLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        userLocation.value.lat = position.coords.latitude;
        userLocation.value.long = position.coords.longitude;
        fetchNearestCenters();
      },
      (error) => {
        console.error("Geolocation error:", error);
      }
    );
  }
};

// Fetch nearest centers
const fetchNearestCenters = async () => {
  if (!userLocation.value.lat || !userLocation.value.long) return;

  loading.value = true;
  await useAxios(
    `user/map/search?lat=${userLocation.value.lat}&long=${userLocation.value.long}&page=${pagination.value.page}`
  )
    .then((res) => {
      nearestCenter.value = res.nearestCenter || null;
      searchResults.value = res.relatedCenters || [];
      pagination.value.totalPages = res.pagination.totalPages;
    })
    .catch((error) => {
      console.error("Error fetching centers:", error);
    })
    .finally(() => {
      loading.value = false;
    });
};

// Debounced search function
const searchCenters = useDebounceFn(async () => {
  if (!searchQuery.value.trim()) {
    fetchNearestCenters();
    return;
  }

  try {
    loading.value = true;
    const res = await useAxios(
      `user/map/search?query=${searchQuery.value.trim()}&lat=${
        userLocation.value.lat
      }&long=${userLocation.value.long}&page=1`
    );

    searchResults.value = res.relatedCenters || [];
  } catch (error) {
    console.error("Search error:", error);
  } finally {
    loading.value = false;
  }
}, 500);

watchEffect(() => {
  searchCenters();
});

const selectCenter = (center) => {
  currentIframe.value = center.iframe;
  searchQuery.value = center.name;
};

onMounted(() => {
  fetchUserLocation();
});
</script>

<template>
  <div class="fill-height position-relative" style="overflow: hidden">
    <iframe
      v-if="currentIframe"
      :src="currentIframe"
      style="border: 0"
      allowfullscreen
      loading="lazy"
      class="w-100 h-100"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>

    <v-card
      border
      class="position-absolute"
      style="top: 10px; right: 10px; z-index: 9999; width: 300px"
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
          clearable
          :loading="loading"
          @click:clear="searchResults = []"
        />
      </v-form>

      <template v-if="nearestCenter">
        <v-divider></v-divider>
        <v-list density="compact">
          <v-list-item
            class="font-weight-bold"
            :title="nearestCenter.name + ' (Nearest)'"
            @click="selectCenter(nearestCenter)"
          ></v-list-item>
        </v-list>
      </template>

      <template v-if="searchResults.length">
        <v-divider></v-divider>
        <v-list density="compact">
          <v-list-item
            v-for="result in searchResults"
            :key="result.id"
            :title="result.name"
            @click="selectCenter(result)"
          ></v-list-item>
        </v-list>
      </template>
    </v-card>
  </div>
</template>
