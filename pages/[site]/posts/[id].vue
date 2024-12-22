<script setup>
definePageMeta({
  layout: "user",
  middleware: ["user-auth"]
});

const route = useRoute();
const appearance = useApperanceStore();

const post = ref({});
onMounted(() => {
  useAxios(`/post/${route.params.id}`, {
    query: {
      populate: true,
    },
  }).then((res) => {
    post.value = res;
  });
});
</script>
<template>
  <v-card border="b" flat rounded="0" height="450"
  >
    <template v-if="post.image?.url">
      <v-img cover :src="post.image.url" :alt="post.image.name">
        <div
          class="d-flex align-end h-100"
          :class="appearance.dark ? 'dark-overlay' : 'light-overlay'"
        >
          <div>
            <v-card-text class="text-h4 pb-0">{{ post.title }}</v-card-text>
            <v-card-text>
              <template v-for="({ title },index) in post.tags">
                <v-chip :class="post.tags.length-1 <= index+1 ? 'mr-3':''">
                  {{ title }}
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
      <v-col cols="12">
        <template v-if="post.content">
          <lazy-common-shared-dynamic-content :content="post.content" />
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>
