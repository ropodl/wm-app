<script setup>
definePageMeta({
  layout: "user-post",
  middleware: ["user-auth"],
});

const latest = ref([]);
const pagination = ref({});

onMounted(() => {
  getLatest();
});

const getLatest = async () => {
  await useAxios("post/latest").then((res) => {
    latest.value = res.posts;
    pagination.value = res.pagination;
  });
  console.log(latest.value);
};
</script>
<template>
  <v-row>
    <template v-for="{ title, image, id } in latest">
      <v-col cols="12" md="6">
        <v-card
          border
          flat
          color="transparent"
          :to="`/posts/${id}`"
          :ripple="false"
        >
          <v-card-title>{{ title }}</v-card-title>
          <v-img height="250" :src="image?.url"></v-img>
        </v-card>
      </v-col>
    </template>
  </v-row>
</template>
<style></style>
