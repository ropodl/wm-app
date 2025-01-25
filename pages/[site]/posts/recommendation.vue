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
    <template
      v-for="{ post: { title, image, slug }, similarity } in recommendation"
    >
      <v-col cols="12" md="4">
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            border
            flat
            color="transparent"
            :to="`/posts/${slug}`"
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
                  {{ title }}
                </v-card-text>
              </v-card>
            </v-img>
          </v-card>
        </v-hover>
      </v-col>
    </template>
  </v-row>
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
  transition: max-height 0.3s ease, opacity 0.3s ease;
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
