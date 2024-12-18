<script setup>
import { formatTimeAgo } from "@vueuse/core";

const route = useRoute();
definePageMeta({
  layout: "user",
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
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="pb-0">
        <h1>Threads</h1>
      </v-col>
      <template v-for="{ id, title, author, createdAt } in threads">
        <v-col cols="12" class="pb-0">
          <v-card border flat :to="`/forum/thread/${id}`">
            <v-list>
              <v-list-item
                density="comfortable"
                :title
                :subtitle="`${author.name} . ${formatTimeAgo(
                  new Date(createdAt)
                )}`"
              >
                <template #prepend>
                  <v-avatar border rounded="lg">
                    <v-img :src="author.image.url"></v-img>
                  </v-avatar>
                </template>
                <template #append>
                  <v-divider vertical></v-divider>
                  <v-list-item
                    class="px-0"
                    title="Termux"
                    subtitle="2 mins ago"
                  >
                    <template #prepend>
                      <v-avatar border rounded="lg" class="me-6">
                        <v-img :src="author.image.url" />
                      </v-avatar>
                    </template>
                  </v-list-item>
                </template>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>
<style></style>
