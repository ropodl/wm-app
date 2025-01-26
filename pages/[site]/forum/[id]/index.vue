<script setup>
import { formatTimeAgo } from "@vueuse/core";

const route = useRoute();
const user = useUserStore();
const { setSnackbar } = useSnackbarStore();

definePageMeta({
  layout: "user",
  middleware: ["user-auth"],
});

onMounted(() => {
  getAllThreads();
});

const threads = ref([]);
const loading = ref(true);
const pagination = ref({
  totalPage: 1,
  totalItems: 0,
  itemsPerPage: 9,
  currentPage: 1,
});
const getAllThreads = () => {
  useAxios(`/forums/${route.params.id}/threads`, {
    query: {
      page: pagination.value.currentPage,
      itemsPerPage: pagination.value.itemsPerPage,
    },
  })
    .then((res) => {
      threads.value = res.threads;
      pagination.value = res.pagination;
    })
    .finally(() => {
      loading.value = false;
    });
};

const form = ref({
  title: "",
  content: "",
});

const rules = {
  title: [
    (v) => !!v || "Thread name is required",
    (v) => (v && v.length > 3) || "Thread name must be 3 characters or more",
  ],
  content: [
    (v) => !!v || "Content is required",
    (v) => (v && v.length > 3) || "Content must be 3 characters or more",
  ],
};

const submit = (isActive) => {
  console.log(user);
  useAxios(`/forums/${route.params.id}/threads`, {
    method: "POST",
    body: form.value,
    query: {
      user_id: user.user.id,
    },
  })
    .then((res) => {
      console.log(res);
      isActive.value = false;
      setSnackbar("Thread created successfully", "success");
      getAllThreads();
    })
    .catch((err) => {
      setSnackbar(err.response._data.error, "error");
    });
};
</script>
<template>
  <v-container>
    <v-row align="center">
      <v-col cols="12" md="6" class="pb-0">
        <h1>Threads</h1>
      </v-col>
      <v-col cols="12" md="6" class="pb-0">
        <div class="d-flex">
          <v-spacer></v-spacer>
          <v-dialog scrollable scrim="black" width="450">
            <template v-slot:activator="{ props: activatorProps }">
              <v-btn v-bind="activatorProps" color="primary" variant="flat">
                Create New
              </v-btn>
            </template>

            <template v-slot:default="{ isActive }">
              <v-form @submit.prevent="submit(isActive)">
                <v-card border title="Create New Thread">
                  <v-card-text class="pb-0">
                    <lazy-common-shared-field-label>
                      Title
                    </lazy-common-shared-field-label>
                    <v-text-field
                      v-model="form.title"
                      persistent-hint
                      :rules="rules.title"
                      class="mb-3"
                      hint="e.g. recycleable materials"
                    ></v-text-field>
                    <lazy-common-shared-quill-editor
                      v-model:content="form.content"
                      label="Content"
                      style="height: 100px"
                    />
                  </v-card-text>
                  <v-card-actions>
                    <v-btn
                      block
                      variant="flat"
                      color="primary"
                      type="submit"
                      text="Submit"
                    ></v-btn>
                  </v-card-actions>
                </v-card>
              </v-form>
            </template>
          </v-dialog>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <template v-if="loading">
        <v-col cols="12">
          <v-progress-circular indeterminate></v-progress-circular>
        </v-col>
      </template>
      <template v-else-if="threads.length">
        <template
          v-for="{
            id,
            title,
            content,
            author,
            createdAt,
            upvote,
            downvote,
          } in threads"
          :key="id"
        >
          <v-col cols="12" class="pb-0">
            <v-card border flat :to="`/forum/thread/${id}`">
              <v-card-title>{{ title }}</v-card-title>
              <v-list-item
                bg-color="transparent"
                density="comfortable"
                :title="author.name"
                :subtitle="`${formatTimeAgo(new Date(createdAt))}`"
              >
                <template #prepend>
                  <v-avatar border rounded="lg">
                    <v-img :src="author.image?.url"></v-img>
                  </v-avatar>
                </template>
                <template #append>
                  <v-icon icon="mdi-thumb-up-outline"></v-icon>
                  <span class="mx-3">
                    {{ upvote }}
                  </span>
                  <v-icon icon="mdi-thumb-down-outline"></v-icon>
                  <span class="ml-3">
                    {{ downvote }}
                  </span>
                </template>
              </v-list-item>
              <v-card-text
                v-html="content"
                class="pb-0 mb-3 max-line"
              ></v-card-text>
            </v-card>
          </v-col>
        </template>
        <v-col cols="12">
          <v-pagination
            v-model="pagination.currentPage"
            :length="pagination.totalPage"
            @update:model-value="getAllThreads"
            density="compact"
          ></v-pagination>
        </v-col>
      </template>
      <template v-else>
        <v-col>
          <v-card text="Sorry, no threads are currently available."></v-card>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>
<style lang="scss" scoped>
.max-line {
  display: -webkit-box;
  -webkit-line-clamp: 5;
  line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
