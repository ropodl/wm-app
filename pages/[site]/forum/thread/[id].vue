<script setup>
const user = useUserStore();
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

const form = ref({
  content: "",
});

const submit = () => {
  useAxios(`/forums/threads/${route.params.id}/comments`, {
    method: "POST",
    body: form.value,
    query: {
      author_id: user.user.id,
    },
  }).then((res) => {
    // console.log(res);
    getThreadComments();
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
        <template v-for="{ id, author, content } in comments" :key="id">
          <v-list border flat class="mb-3" rounded="lg">
            <v-list-item
              :prepend-avatar="author.image?.url"
              :title="author.name"
              :subtitle="content"
            />
          </v-list>
        </template>
        <v-form @submit.prevent="submit">
          <v-textarea v-model="form.content"></v-textarea>
          <v-btn type="submit">Submit</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
<style></style>
