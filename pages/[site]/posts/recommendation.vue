<script setup>
const user = useUserStore();
console.log(user.user);

definePageMeta({
  layout: "user-post",
  middleware: ["user-auth"],
});

onMounted(() => {
  getRecommendation();
});

const recommendation = ref([]);
const pagination = ref({});

const getRecommendation = async () => {
  await useAxios(`post/recommended/${user.user.id}`).then((res) => {
    recommendation.value = res.documents;
    pagination.value = res.pagination;
  });
};
</script>
<template>
  <v-row>
    <template v-for="({ post }, index) in recommendation">
      <v-col cols="12" md="6">
        {{ post }}
        <v-card
          border
          flat
          color="transparent"
          :to="`/posts/${post._id}`"
          :ripple="false"
        >
          <v-card-title>{{ post.title }}</v-card-title>
          <v-img height="250" :src="post.image?.url"></v-img>
        </v-card>
      </v-col>
    </template>
  </v-row>
</template>
