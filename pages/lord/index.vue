<script setup>
definePageMeta({
  layout: "lord",
});

onMounted(() => {
  getDashboardInfo();
});

const tenants  = ref({})
const users  = ref({})
const getDashboardInfo = () => {
  useAxios("/system/dashboard").then((res) => {
    // console.log(res);
    tenants.value = res.tenant;
    users.value = res.users;
  });
};
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <v-card border>
          <v-card-title>Total Tenants</v-card-title>
          <v-card-text>{{tenants.total}}</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card border>
          <v-card-title>Total Lord Users</v-card-title>
          <v-card-text>{{users.total}}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
