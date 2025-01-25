<script setup>
definePageMeta({
  layout: "user",
  middleware: ["user-auth"],
});

const currentIframe = ref("");
const searchQuery = ref("");
const searchResults = ref([]);
const loading = ref(false);

// Debounced search function using VueUse
const searchCenters = useDebounceFn(async () => {
  if (!searchQuery.value) {
    searchResults.value = [];
    return;
  }

  loading.value = true;
  await useAxios(`user/map/search?query=${searchQuery.value}`)
    .then((res) => {
      searchResults.value = res;
    })
    .catch((err) => {
      searchResults.value = [];
      console.log(err);
    })
    .finally(() => {
      loading.value = false;
    });
}, 500);

watch(searchQuery, () => {
  searchCenters();
});

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
          rounded="0"
          clearable
          :loading="loading"
          @click:clear="searchResults = []"
        >
        </v-text-field>
      </v-form>
      <!-- Search Results Dropdown -->
      <template v-if="searchResults.length">
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
  </div>
</template>
