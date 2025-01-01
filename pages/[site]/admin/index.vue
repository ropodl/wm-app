<script setup>
const admin = useAdminUserStore();
definePageMeta({
  layout: "admin",
  middleware: ["admin-auth"],
});
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
          <v-card-text class="text-h4 font-weight-bold pb-0">5</v-card-text>
          <v-card-text class="text-h6 pt-0">Total Posts</v-card-text>
          <v-icon
            class="card-icon"
            color="primary"
            icon="mdi-post-outline"
          ></v-icon>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card border flat>
          <v-card-text class="text-h4 font-weight-bold pb-0">5</v-card-text>
          <v-card-text class="text-h6 pt-0">Total Interest</v-card-text>
          <v-icon
            class="card-icon"
            color="primary"
            icon="mdi-thumb-up"
          ></v-icon>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card border flat>
          <v-card-text class="text-h4 font-weight-bold pb-0">5</v-card-text>
          <v-card-text class="text-h6 pt-0">Total Forums</v-card-text>
          <v-icon class="card-icon" color="primary" icon="mdi-forum"></v-icon>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card border flat>
          <v-card-text class="text-h4 font-weight-bold pb-0">5</v-card-text>
          <v-card-text class="text-h6 pt-0">Total Threads</v-card-text>
          <v-icon
            class="card-icon"
            color="primary"
            icon="mdi-dots-triangle"
          ></v-icon>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<style lang="scss">
.card-icon {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 100px;
  transform: skewY(20deg);
}
</style>
