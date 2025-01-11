<script setup>
const admin = useAdminUserStore();
definePageMeta({
  layout: "admin",
  middleware: ["admin-auth"],
});

onMounted(() => {
  getDahboardStats();
});

const stats_bar = ref({});
const getDahboardStats = async () => {
  await useAxios("/admin/dashboard").then((res) => {
    stats_bar.value = res.stats_bar;
  });
};
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Welcome back, {{ admin.user?.name }}</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="3">
        <v-card border flat>
          <v-card-text class="d-flex justify-space-between align-center pb-0">
            <span class="text-h4 font-weight-bold">
              {{ stats_bar.total_post }}
            </span>
            <v-icon
              class="card-icon"
              color="primary"
              icon="mdi-note-outline"
            ></v-icon>
          </v-card-text>
          <v-card-text class="text-h6 pt-0">Total Posts</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card border flat>
          <v-card-text class="d-flex justify-space-between align-center pb-0">
            <span class="text-h4 font-weight-bold">
              {{ stats_bar.total_interest }}
            </span>
            <v-icon
              class="card-icon"
              color="primary"
              icon="mdi-thumb-up-outline"
            ></v-icon>
          </v-card-text>
          <v-card-text class="text-h6 pt-0">Total Interest</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card border flat>
          <v-card-text class="d-flex justify-space-between align-center pb-0">
            <span class="text-h4 font-weight-bold">
              {{ stats_bar.total_forum }}
            </span>
            <v-icon
              class="card-icon"
              color="primary"
              icon="mdi-forum-outline"
            ></v-icon>
          </v-card-text>
          <v-card-text class="text-h6 pt-0">Total Forums</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card border flat>
          <v-card-text class="d-flex justify-space-between align-center pb-0">
            <span class="text-h4 font-weight-bold">
              {{ stats_bar.total_thread }}
            </span>
            <v-icon
              class="card-icon"
              color="primary"
              icon="mdi-vector-triangle"
            ></v-icon>
          </v-card-text>
          <v-card-text class="text-h6 pt-0">Total Threads</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
