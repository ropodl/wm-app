<script setup>
const route = useRoute();
const { setSnackbar } = useSnackbarStore();

definePageMeta({
  layout: "admin",
  middleware: ["admin-auth"],
});

const form = ref({
  title: "",
  content: "",
  excerpt: "",
  content: "",
  image: null,
  tags: [],
  status: "Draft",
});

const tags = ref([]);
const getInterests = async () => {
  tags.value = await useAxios("interest?itemsPerPage=100");
};

onMounted(() => {
  useAxios(`/admin/post/${route.params.id}`).then((res) => {
    form.value = res;
  });
  getInterests();
});

const submit = async () => {
  const formData = new FormData();
  for (const key in form.value) {
    const value = form.value[key];
    formData.append(key, value);
  }
  await useAxios(`/admin/post/${route.params.id}`, {
    method: "PATCH",
    body: formData,
  })
    .then((res) => {
      setSnackbar(res.message, "success");
    })
    .catch((err) => {
      setSnackbar(err.response._data.error, "error");
    });
};
</script>
<template>
  <v-form ref="formRef" @submit.prevent="submit">
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1>Update Posts</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="8">
          <lazy-common-shared-field-label
            >Post Title</lazy-common-shared-field-label
          >
          <v-text-field v-model="form.title"></v-text-field>
          <lazy-common-shared-field-label
            >Interests</lazy-common-shared-field-label
          >
          <v-select
            v-model="form.tags"
            chips
            multiple
            item-value="id"
            item-title="title"
            variant="outlined"
            density="compact"
            :items="tags.interests"
          />
          <lazy-common-shared-field-label
            >Excerpt</lazy-common-shared-field-label
          >
          <v-textarea v-model="form.excerpt" :counter="120"></v-textarea>
          <lazy-common-shared-quill-editor
            v-model:content="form.content"
            label="Post Content"
          />
        </v-col>
        <v-col cols="12" md="4">
          <lazy-common-shared-image-upload :form />
          <lazy-common-shared-actions :form />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
<style></style>
