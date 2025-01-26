<script setup>
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

const interests = ref([]);
const getInterests = async () => {
  interests.value = await useAxios("interest?itemsPerPage=100");
};

onMounted(() => {
  getInterests();
});

const submit = async () => {
  const formData = new FormData();
  for (const key in form.value) {
    const value = form.value[key];
    formData.append(key, value);
  }
  await useAxios("/admin/post", {
    method: "POST",
    body: formData,
  })
    .then((res) => {
      setSnackbar("Post created successfully", "success");
      navigateTo(`/admin/posts/${res.id}`);
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
          <h1>Add Posts</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="8">
          <lazy-common-shared-field-label
            >Post Title</lazy-common-shared-field-label
          >
          <v-text-field v-model="form.title"></v-text-field>
          <lazy-common-shared-field-label>Tags</lazy-common-shared-field-label>
          <v-autocomplete
            v-model="form.tags"
            chips
            item-value="id"
            multiple
            variant="outlined"
            density="compact"
            :items="interests.interests"
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
          <lazy-common-shared-image-upload v-model="form.image" :form />
          <lazy-common-shared-actions :form />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
