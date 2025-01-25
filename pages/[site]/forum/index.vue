<script setup>
definePageMeta({
  layout: "user",
  middleware: ["user-auth"],
});

onMounted(() => {
  getAllForums();
});

const forums = ref([]);
const loading = ref(true);
const pagination = ref({
  totalPage: 1,
  totalItems: 0,
  itemsPerPage: 9,
  currentPage: 1,
});

const getAllForums = () => {
  useAxios("forums", {
    query: {
      page: pagination.value.currentPage,
      itemsPerPage: pagination.value.itemsPerPage,
    },
  })
    .then((res) => {
      forums.value = res.forums;
      pagination.value = res.pagination;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Forums</h1>
      </v-col>
    </v-row>
    <v-row>
      <template v-if="loading">
        <v-col cols="12">
          <v-progress-circular indeterminate></v-progress-circular>
        </v-col>
      </template>
      <template v-else-if="forums.length">
        <template v-for="{ name, id, image } in forums">
          <v-col cols="12" md="4">
            <v-hover #default="{ isHovering, props }">
              <v-card
                v-bind="props"
                border
                flat
                color="transparent"
                :to="`/forum/${id}`"
                :ripple="false"
              >
                <v-img
                  cover
                  rounded="lg"
                  height="200"
                  class="align-end"
                  :class="isHovering ? 'zoom-image' : ''"
                  :src="image?.url"
                  :alt="image?.name"
                >
                  <v-card
                    border="t"
                    class="blur"
                    color="rgba(var(--v-theme-background),0.8)"
                    rounded="0"
                  >
                    <v-card-text>{{ name }}</v-card-text>
                  </v-card>
                </v-img>
              </v-card>
            </v-hover>
          </v-col>
        </template>
        <v-col cols="12">
          <v-pagination
            v-model="pagination.currentPage"
            :length="pagination.totalPage"
            @update:model-value="getAllForums"
            density="compact"
          ></v-pagination>
        </v-col>
      </template>
      <template v-else>
        <v-col cols="12">
          <v-card text="Sorry but no forum are available right now"></v-card>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>
