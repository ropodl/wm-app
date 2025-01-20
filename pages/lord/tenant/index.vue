<script setup>
definePageMeta({
  layout: "lord",
  auth: true,
});

const headers = [
  {
    title: "Name",
    value: "name",
  },
  {
    title: "Sub Domain",
    value: "sub",
  },
  {
    title: "Actions",
    value: "actions",
    width: 130,
  },
];

const items = ref([]);

onMounted(() => {
  callTenants();
});

const callTenants = () => {
  useAxios("system/tenant")
    .then((res) => {
      items.value = res;
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>All Tenants</h1>
      </v-col>
      <v-col cols="12">
        <v-card border>
          <v-data-table :headers :items>
            <template #item.actions>
              <v-btn
                class="mr-3"
                color="primary"
                icon="mdi-pen"
                variant="text"
              ></v-btn>
              <v-btn
                rounded="lg"
                color="error"
                variant="text"
                icon="mdi-delete"
              ></v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style></style>
