<script setup>
const route = useRoute();

definePageMeta({
  layout: "user",
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
        <template v-for="{ content } in comments">
          <v-list border flat rounded="lg">
            <v-list-item
              prepend-avatar="https://images.unsplash.com/photo-1645378198905-bca326a21167?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              title="Saroj Poudel"
              :subtitle="content"
            />
          </v-list>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>
<style></style>
