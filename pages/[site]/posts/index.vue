<script setup>
definePageMeta({
  layout: "user-post",
  middleware: ["user-auth"],
});

const appearance = useApperanceStore();

const latest = ref([]);
const pagination = ref({
  totalPage: 1,
  totalItems: 0,
  itemsPerPage: 9,
  currentPage: 1,
});

onMounted(() => {
  getLatest();
});

const getLatest = async () => {
  await useAxios("user/post/", {
    query: {
      page: pagination.value.currentPage,
      itemsPerPage: pagination.value.itemsPerPage,
    },
  })
    .then((res) => {
      latest.value = res.posts;
      pagination.value = res.pagination;
      console.log(pagination.value);
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>
<template>
  <v-row>
    <template v-for="{ title, image, id } in latest">
      <v-col cols="12" md="4">
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            border
            flat
            color="transparent"
            :to="`/posts/${id}`"
            :ripple="false"
            v-bind="props"
          >
            <v-img
              cover
              rounded="sm"
              height="250"
              class="align-end"
              :class="isHovering ? 'zoom-image' : ''"
              :src="image?.url"
            >
              <v-card
                border="t"
                class="blur"
                color="rgba(var(--v-theme-background),0.8)"
                rounded="0"
              >
                <v-card-text class="font-weight-bold">
                  {{ title }}
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
        @update:model-value="getLatest"
        density="compact"
      ></v-pagination>
    </v-col>
  </v-row>
</template>
