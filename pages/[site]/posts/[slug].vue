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
onMounted(() => {
  useAxios(`user/post/${route.params.slug}`).then((res) => {
    post.value = res;
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
  <v-card border="b" flat rounded="0" height="450">
    <template v-if="post.image?.url">
      <v-img cover :src="post.image.url" :alt="post.image?.name">
        <div
          class="d-flex align-end h-100"
          :class="appearance.dark ? 'dark-overlay' : 'light-overlay'"
        >
          <div>
            <v-card-text class="text-h5 pb-0">{{ post.title }}</v-card-text>
            <v-card-text>
              <template v-for="({ _id, title }, index) in post.tags" :key="_id">
                <v-chip
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
  <v-container>
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
    </v-row>
  </v-container>
</template>
