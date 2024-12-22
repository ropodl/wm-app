<script setup>
const admin = useAdminUserStore();

definePageMeta({
  layout: "admin",
  middleware: ["admin-auth"]
});

const headers = [
  { key: "title", title: "Title" },
  { key: "slug", title: "Slug" },
  { key: "action", title: "Actions", sortable: false, width: 150 },
];

const items = ref([]);
const pagination = ref({});

onMounted(() => {
  getInterests();
});

const getInterests = async () => {
  const res = await useAxios("interest");
  items.value = res.interests;
  pagination.value = res.pagination;
};
</script>
<template>
  <v-container>
    <v-row justify="space-between">
      <v-col cols="12">
        <div class="text-h4 font-weight-bold">All Interests</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card border rounded="lg">
          <v-data-table
            :headers
            :items
            :items-per-page="pagination.itemsPerPage"
          >
            <template v-slot:item.image="{ item }">
              <div>
                <v-img
                  cover
                  width="160"
                  class="border rounded-lg"
                  :aspect-ratio="16 / 9"
                  :src="item.image?.url"
                ></v-img>
              </div>
            </template>
            <template v-slot:item.title="{ item }">
              <v-list lines="three">
                <v-list-item class="pl-0">
                  <v-list-item-title>
                    {{ item.title }}
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
                :to="`/admin/interest/${item.id}`"
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
