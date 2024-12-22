<script setup>
const route = useRoute();

definePageMeta({
  layout: "user",
  middleware: ["user-auth"]
});

onMounted(() => {
  getThread();
});

const thread = ref({});
const getThread = async () => {
  await useAxios(`/forums/threads/${route.params.id}`).then((res) => {
    thread.value = res;
    getThreadComments();
  });
};
const comments = ref([]);
const pagination = ref({});
const getThreadComments = async () => {
  await useAxios(`/forums/threads/${route.params.id}/comments`).then((res) => {
    comments.value = res.comments;
    pagination.value = res.pagination;
  });
};
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card border flat :title="thread.title" :subtitle="thread.content" />
      </v-col>
      <v-col cols="12" class="pb-0">
        <h3>Comments</h3>
      </v-col>
      <v-col cols="12">
        {{ comments }}
        <template v-for="{ author, content } in comments">
          <v-list border flat rounded="lg">
            <v-list-item
              :prepend-avatar="author.image?.url"
              :title="author.name"
              :subtitle="content"
            />
          </v-list>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>
<style></style>
