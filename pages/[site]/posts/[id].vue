<script setup>
definePageMeta({
  layout: "user",
  middleware: ["user-auth"],
});

const route = useRoute();

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
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card border flat height="450">
          <template v-if="post.image?.url">
            <v-img cover :src="post.image.url" :alt="post.image.name">
              <div
                class="d-flex align-end h-100"
                style="
                  background: linear-gradient(
                    180deg,
                    rgba(0, 0, 0, 0) 70%,
                    rgba(1, 1, 1, 0.9)
                  ) !important;
                "
              >
                <v-card-text class="text-h4">{{ post.title }}</v-card-text>
              </div>
            </v-img>
          </template>
        </v-card>
      </v-col>
      <v-col cols="12">
        <template v-if="post.content">
          <lazy-common-shared-dynamic-content :content="post.content" />
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>
<style></style>
