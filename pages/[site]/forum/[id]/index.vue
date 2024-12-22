<script setup>
import { formatTimeAgo } from "@vueuse/core";

const user = useUserStore();
const route = useRoute();

definePageMeta({
  layout: "user",
  middleware: ["user-auth"]
});

onMounted(() => {
  getAllThreads();
});

const threads = ref([]);
const getAllThreads = async () => {
  await useAxios(`/forums/${route.params.id}/threads`).then((res) => {
    threads.value = res.threads;
  });
};

const form = ref({
  title: "",
  content: "",
});

const submit = (isActive) => {
  console.log(user);
  useAxios(`/forums/${route.params.id}/threads`, {
    method: "POST",
    body: form.value,
    query: {
      user_id: user.user.id,
    },
  }).then((res) => {
    console.log(res);
    isActive.value = false;
    getAllThreads();
  });
};
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6" class="pb-0">
        <h1>Threads</h1>
      </v-col>
      <v-col cols="12" md="6" class="pb-0">
        <div class="d-flex">
          <v-spacer></v-spacer>
          <v-dialog scrim="black" width="500">
            <template v-slot:activator="{ props: activatorProps }">
              <v-btn
                v-bind="activatorProps"
                text="Create New Thread"
                variant="flat"
              ></v-btn>
            </template>

            <template v-slot:default="{ isActive }">
              <v-form @submit.prevent="submit(isActive)">
                <v-card border title="Create New Thread">
                  <v-card-text>
                    <lazy-common-shared-field-label
                      >Title</lazy-common-shared-field-label
                    >
                    <v-text-field
                      v-model="form.title"
                      persistent-hint
                      hint="e.g. recycleable materials"
                    ></v-text-field>
                    <lazy-common-shared-field-label
                      >Description</lazy-common-shared-field-label
                    >
                    <v-textarea
                      v-model="form.content"
                      persistent-hint
                      hint="e.g. lorem ipsum"
                    ></v-textarea>
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
      <template v-for="{ id, title, author, createdAt } in threads" :key="id">
        <v-col cols="12" class="pb-0">
          <v-card border flat :to="`/forum/thread/${id}`">
            <v-list>
              <v-list-item
                density="comfortable"
                :title="title"
                :subtitle="`${author.name} . ${formatTimeAgo(
                  new Date(createdAt)
                )}`"
              >
                <template #prepend>
                  <v-avatar border rounded="lg">
                    <v-img :src="author.image?.url"></v-img>
                  </v-avatar>
                </template>
                <!-- <template #append>
                  <v-divider vertical></v-divider>
                  <v-list-item
                    class="px-0"
                    title="Termux"
                    subtitle="2 mins ago"
                  >
                    <template #prepend>
                      <v-avatar border rounded="lg" class="me-6">
                        <v-img :src="author.image?.url" />
                      </v-avatar>
                    </template>
                  </v-list-item>
                </template> -->
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>
<style></style>
