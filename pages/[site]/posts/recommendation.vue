<script setup>
const appearance = useApperanceStore();
const user = useUserStore();

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
  console.log(user.user.id);
  await useAxios(`post/recommended/${user.user.id}`).then((res) => {
    recommendation.value = res.documents;
    pagination.value = res.pagination;
  });
};
</script>
<template>
  <v-row>
    <template v-for="{ post, similarity } in recommendation">
      <v-col cols="12" md="4">
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            border
            flat
            color="transparent"
            :to="`/posts/${post._id}`"
            :ripple="false"
            v-bind="props"
          >
            <v-img
              cover
              rounded="sm"
              height="150"
              :class="isHovering ? 'zoom-image' : ''"
              :src="post.image?.url"
            >
              <v-card
                height="150"
                class="d-flex align-end"
                :class="appearance.dark ? 'dark-overlay' : 'light-overlay'"
              >
                <v-chip
                  rounded="lg"
                  class="position-absolute top-0 right-0 rounded-t-0 rounded-e-0"
                  >{{ similarity.toFixed(2) }}</v-chip
                >
                <v-card-text class="font-weight-bold">
                  {{ post.title }}
                </v-card-text>
              </v-card>
            </v-img>
          </v-card>
        </v-hover>
      </v-col>
    </template>
  </v-row>
</template>
