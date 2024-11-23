<script setup>
const route = useRoute();
definePageMeta({
  layout: "user",
});

onMounted(() => {
  getAllThreads();
});

const threads = ref([]);
const getAllThreads = async() => {
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
      {{threads}}
      <template v-for="{ id, title } in threads">
        <v-col cols="12" class="pb-0">
          <v-card border flat :to="`/forum/thread/${id}`">
            <v-card-title>{{ title }}</v-card-title>
          </v-card>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>
<style></style>
