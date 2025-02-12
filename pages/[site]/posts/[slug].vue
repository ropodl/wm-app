<script setup>
const route = useRoute();
const appearance = useApperanceStore();
const user = useUserStore();
const { setSnackbar } = useSnackbarStore();

definePageMeta({
  layout: "user",
  middleware: ["user-auth"],
});

const post = ref({});
const recommendation = ref([]);
onMounted(() => {
  useAxios(`user/post/${route.params.slug}`)
    .then((res) => {
      post.value = res;
    })
    .then(async () => {
      recommendation.value = await useAxios(
        `user/post/recommendation/${post.value._id}`
      );
    });
});

const addToUserInterest = (id) => {
  useAxios(`interest/add-user-interest`, {
    method: "PATCH",
    query: {
      user_id: `${user.user.id}`,
      interest_id: `${id}`,
    },
  })
    .then((res) => {
      user.user.interests = res.interests;
      setSnackbar(res.message, "success");
    })
    .catch((err) => {
      console.log(err.response._data.error);
      setSnackbar(err.response._data.error, "error");
    });
};

const removeFromUserInterest = (id) => {
  useAxios(`interest/remove-interest`, {
    method: "PATCH",
    query: {
      user_id: `${user.user.id}`,
      interest_id: `${id}`,
    },
  })
    .then((res) => {
      user.user.interests = res.interests;
      setSnackbar(res.message, "success");
    })
    .catch((err) => {
      setSnackbar(err.response._data.error, "error");
    });
};
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card border flat rounded="lg" height="350">
          <template v-if="post.image?.url">
            <v-img cover :src="post.image.url" :alt="post.image?.name">
              <div
                class="d-flex align-end h-100"
                :class="appearance.dark ? 'dark-overlay' : 'light-overlay'"
              >
                <div>
                  <v-card-text class="text-h5 pb-0">{{
                    post.title
                  }}</v-card-text>
                  <v-card-text>
                    <template
                      v-for="({ _id, title }, index) in post.tags"
                      :key="_id"
                    >
                      <v-chip
                        border
                        variant="text"
                        :text="title"
                        class="mb-1"
                        :class="post.tags.length - 1 > index ? 'mr-1' : ''"
                        :append-icon="
                          user.user?.interests.includes(_id)
                            ? 'mdi-minus'
                            : 'mdi-plus'
                        "
                        @click="
                          user.user?.interests.includes(_id)
                            ? removeFromUserInterest(_id)
                            : addToUserInterest(_id)
                        "
                      >
                        {{ title }}
                        <template>
                          <v-tooltip
                            activator="parent"
                            theme="light"
                            text="Click + to follow interests"
                            location="top"
                          />
                        </template>
                      </v-chip>
                    </template>
                  </v-card-text>
                </div>
              </div>
            </v-img>
          </template>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <template v-if="post.excerpt">
        <v-col cols="12" class="text-h5 font-weight-thin">
          {{ post.excerpt }}
        </v-col>
      </template>
      <v-col cols="12">
        <template v-if="post.content">
          <lazy-common-shared-dynamic-content :content="post.content" />
        </template>
      </v-col>
      <v-col cols="12">
        <v-row>
          <v-col cols="12">
            <h1>Similar Posts</h1>
          </v-col>
          <template
            v-for="{ title, image, slug, similarity } in recommendation.posts"
          >
            <v-col cols="12" md="3">
              <v-hover v-slot="{ isHovering, props }">
                <v-card
                  border
                  flat
                  rounded="lg"
                  color="transparent"
                  :to="`/posts/${slug}`"
                  :ripple="false"
                  v-bind="props"
                >
                  <v-img
                    cover
                    rounded="sm"
                    height="150"
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
                        {{ title }}--{{ similarity }}
                      </v-card-text>
                    </v-card>
                  </v-img>
                </v-card>
              </v-hover>
            </v-col>
          </template>
        </v-row>
      </v-col>
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
