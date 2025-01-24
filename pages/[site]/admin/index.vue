<script setup>
const admin = useAdminUserStore();
definePageMeta({
  layout: "admin",
  middleware: ["admin-auth"],
});

onMounted(() => {
  getDashboardStats();
});

const stats_bar = ref({});
const latest_posts = ref({});
const getDashboardStats = async () => {
  await useAxios("/admin/dashboard").then((res) => {
    stats_bar.value = res.stats_bar;
    latest_posts.value = res.latest_posts;
    // latest_interest.value = res.latest_interest;
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
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Posts</v-card-title>
          <v-divider></v-divider>
          <v-data-table
            hover
            density="comfortable"
            style="background-color: transparent"
            :headers="[{ title: 'Title', key: 'title', sortable: false }]"
            :items="latest_posts.documents"
            hide-default-footer
          ></v-data-table>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Interests</v-card-title>
          <v-divider></v-divider>
          <v-data-table
            style="background-color: transparent"
            :items="[
              {
                title: 'Simple way to recycle as a working person',
                status: 'Draft',
              },
              {
                title: '5 ways to find know more about recycling manners',
                status: 'Draft',
              },
            ]"
            hide-default-footer
          ></v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
