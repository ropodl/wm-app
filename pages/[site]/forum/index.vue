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
          <v-col cols="12" sm="6" md="4">
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
                    <v-card-text
                      class="font-weight-bold pb-0 mb-3"
                      :class="isHovering ? 'line-all' : 'line-two'"
                    >
                      {{ name }}
                    </v-card-text>
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
<style lang="scss" scoped>
.line-two {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  max-height: 4em;
  opacity: 0.8;
  transition: all 0.3s linear max-height 0.3s ease, opacity 0.3s ease;
}

.line-all {
  display: -webkit-box;
  -webkit-line-clamp: 10;
  line-clamp: 10;
  -webkit-box-orient: vertical;
  overflow: hidden;
  max-height: 20em;
  opacity: 1;
  transition: max-height 0.3s ease, opacity 0.3s ease;
}
</style>
