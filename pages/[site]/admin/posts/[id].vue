<script setup>
const route = useRoute();

definePageMeta({
  layout: "admin"
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
  tags.value = await useAxios("interest");
};

onMounted(() => {
  useAxios(`/post/${route.params.id}`).then((res) => {
    console.log(res);
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
  console.log(formData);
  await useAxios(`post/${route.params.id}`, {
    method: "PATCH",
    body: formData,
  })
    .then((res) => {
      console.log(res,'res');
    })
    .catch((err) => {
      console.log(err,'err');
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
          {{ form.tags }}
          <v-select
            v-model="form.tags"
            chips
            multiple
            item-value="id"
            item-title="title"
            variant="outlined"
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
          <v-card border flat class="mb-3">
            <v-card-title>Actions</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <span class="font-weight-bold">Status:&nbsp;</span>
              {{ form.status === "Published" ? "Published" : "Draft" }}
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-row>
                <v-col cols="6">
                  <v-btn
                    block
                    color="warning"
                    height="40"
                    class="text-capitalize"
                    @click="form.status = 'Draft'"
                  >
                    Save as Draft
                  </v-btn>
                </v-col>
                <v-col cols="6">
                  <v-btn
                    block
                    type="submit"
                    color="primary"
                    height="40"
                    variant="tonal"
                    class="text-capitalize"
                    @click="form.status = 'Published'"
                  >
                    {{ route.params.id ? "Update" : "Publish Now" }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
<style></style>
