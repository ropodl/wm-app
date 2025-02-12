<script setup>
import { useDebounceFn } from "@vueuse/core";

const { setSnackbar } = useSnackbarStore();
const { coords, locatedAt, error, resume, pause } = useGeolocation();

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

// Function to select a center
const handleSelection = (iframe) => {
  const selected = searchResults.value.find((item) => item.iframe === iframe);
  if (selected) {
    currentIframe.value = selected.iframe;
    searchQuery.value = selected.name;
  }
};

// Set the default center to the nearest one
const setDefaultCenter = () => {
  if (nearestCenter.value) {
    selectCenter(nearestCenter.value);
  } else if (searchResults.value.length) {
    selectCenter(searchResults.value[0]);
  }
};
// Get user's location
const fetchUserLocation = () => {
  loading.value = true;
  console.log(coords);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        userLocation.value.lat = position.coords.latitude;
        userLocation.value.long = position.coords.longitude;
        fetchNearestCenters();
      },
      (error) => {
        // console.error("Geolocation error:", error);
        setSnackbar(`Geolocation error: ${error}`, "error");

        loading.value = false;
      }
    );
  }
};

// Fetch nearest centers
const fetchNearestCenters = async () => {
  if (!userLocation.value.lat || !userLocation.value.long) return;

  try {
    loading.value = true;
    const res = await useAxios(
      `user/map/search?lat=${userLocation.value.lat}&long=${userLocation.value.long}&page=${pagination.value.page}`
    );

    nearestCenter.value = res.nearestCenter || null;
    searchResults.value = res.relatedCenters || [];
    pagination.value.totalPages = res.pagination.totalPages;

    // setDefaultCenter(); // Ensure the first center is selected by default
  } catch (error) {
    console.error("Error fetching centers:", error);
  } finally {
    loading.value = false;
  }
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
    // setDefaultCenter(); // Ensure default center after search
  } catch (error) {
    console.error("Search error:", error);
  } finally {
    loading.value = false;
  }
}, 500);

// Select center function
const selectCenter = (center) => {
  currentIframe.value = center.iframe;
  searchQuery.value = center.name;
};

watchEffect(() => {
  searchCenters();
});

onMounted(() => {
  fetchUserLocation();
});
</script>
<template>
  <div class="d-flex fill-height">
    <v-card
      color="rgba(var(--v-theme-background),0.8)"
      rounded="0"
      border="e"
      flat
      class="fill-height"
      style="min-width: 300px; width: 300px; max-width: 300px"
    >
      <v-card border="b" rounded="0" color="transparent">
        <v-form @submit.prevent="searchCenters">
          <v-text-field
            v-model="searchQuery"
            item-title="name"
            item-value="iframe"
            flat
            hide-details
            clearable
            focused
            autofocus
            autocomplete="off"
            density="comfortable"
            bg-color="transparent"
            persistent-clear
            placeholder="Search for recycling center"
            prepend-inner-icon="mdi-magnify"
            rounded="0"
            variant="solo"
            :loading="loading"
            @update:modelValue="handleSelection"
            @click:clear="fetchNearestCenters"
          ></v-text-field>
        </v-form>
      </v-card>
      <v-list lines="two">
        <v-list-item title="Your Location">
          <v-list-item-subtitle>
            Longitude: {{ userLocation.long }}<br />
            Latitude: {{ userLocation.lat }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
      <template v-if="loading">
        <v-divider></v-divider>
        <v-card class="border-e-0" rounded="0" text="Loading..."></v-card>
        <v-divider></v-divider>
      </template>
      <template v-else-if="searchResults.length">
        <v-divider></v-divider>
        <v-list
          class="py-0"
          density="default"
          bg-color="transparent"
          style="height: calc(100vh - 200px)"
        >
          <template v-for="item in searchResults">
            <v-list-item
              lines="three"
              density="default"
              @click="handleSelection(item.iframe)"
            >
              <v-list-item-title>{{ item.name }}</v-list-item-title>
              <v-list-item-subtitle>
                Distance: {{ item.displayDistance?.value }}
                {{ item.displayDistance?.unit }}<br />
                Longitude: {{ item.longitude }}<br />
                Latitude: {{ item.latitude }}
              </v-list-item-subtitle>
            </v-list-item>
            <v-divider></v-divider>
          </template>
        </v-list>
      </template>
      <template v-else>
        <v-divider></v-divider>
        <v-card
          class="border-e-0"
          rounded="0"
          text="Search resulted to nothing."
        ></v-card>
        <v-divider></v-divider>
      </template>
    </v-card>
    <iframe
      v-if="currentIframe"
      :src="currentIframe"
      style="border: 0"
      allowfullscreen
      class="fill-height w-100 h-100"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
</template>
