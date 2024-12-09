<script setup>
const admin = useAdminUserStore();
definePageMeta({
  layout: "admin",
});

const headers = ref([
  { title: "Image", key: "image", sortable: false, width: 180 },
  {
    title: "Forum's Name",
    key: "name",
  },
  {
    title: "Actions",
    key: "action",
    sortable: false,
    width: 150,
  },
]);

onMounted(() => {
  getAllForums();
});

const items = ref([]);
const getAllForums = async () => {
  await useAxios("/forums").then((res) => {
    items.value = res.forums;
  });
};
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <div class="text-h4 font-weight-bold">All Forums</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card border rounded="lg">
          <v-data-table :headers :items>
            <template v-slot:item.image="{ item }">
              <div>
                <v-img
                  cover
                  width="160"
                  class="border rounded-lg"
                  :aspect-ratio="16 / 9"
                  :src="item.image?.url"
                  :alt="item.image.name"
                ></v-img>
              </div>
            </template>
            <template v-slot:item.name="{ item }">
              <v-list lines="three">
                <v-list-item class="pl-0">
                  <v-list-item-title>
                    {{ item.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle> </v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </template>
            <template v-slot:item.action="{ item }">
              <v-btn
                class="mr-2"
                variant="tonal"
                color="success"
                rounded="lg"
                icon="mdi-pencil"
                :to="`/admin/forums/${item.id}`"
              ></v-btn>
              <template v-if="admin.user.role === 'admin'">
                <v-btn
                  variant="tonal"
                  color="error"
                  rounded="lg"
                  icon="mdi-delete"
                ></v-btn>
              </template>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<style></style>
