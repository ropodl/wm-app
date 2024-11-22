<script setup>
definePageMeta({
  layout: "user-post",
  middleware: ["user-auth"],
});

const latest = ref([]);
const pagination = ref({
  totalPage: "",
  totalItems: "",
  itemsPerPage: "",
  currentPage: "",
});

onMounted(() => {
  getLatest();
});

const getLatest = async (page, itemsPerPage = 100) => {
  await useAxios("post/latest", {
    query: {
      page,
      per_page: itemsPerPage,
    },
  })
    .then((res) => {
      console.log(res, page);
      latest.value = res.posts;
      pagination.value = res.pagination;
    })
    .catch((err) => {
      console.log(err);
    });
};

const paginate = async (val) => {
  await getLatest(val);
};

const load = () => {
  done("ok");
};
</script>
<template>
  <v-row>
    <template v-for="({ title, image, id }, index) in latest">
      <v-col cols="12" md="6">
        <v-card
          border
          flat
          color="transparent"
          :to="`/posts/${id}`"
          :ripple="false"
        >
          <v-img cover rounded="sm" height="150" :src="image?.url"></v-img>
          <v-card-text class="font-weight-bold">{{ title }}</v-card-text>
        </v-card>
      </v-col>
    </template>
  </v-row>
</template>
