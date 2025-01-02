<script setup>
const admin = useAdminUserStore();

definePageMeta({
  layout: "admin",
  middleware: ["admin-auth"],
});

const headers = [
  { key: "title", title: "Title" },
  { key: "slug", title: "Slug" },
  { key: "action", title: "Actions", sortable: false, width: 150 },
];

const items = ref([]);
const pagination = ref({});
const loading = ref(true);

onMounted(() => {
  getInterests();
});

const getInterests = async () => {
  const res = await useAxios("interest");
  items.value = res.interests;
  pagination.value = res.pagination;
  loading.value = false;
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
        <v-card>
          <v-data-table
            :headers
            :items
            :loading
            :items-per-page="pagination.itemsPerPage"
          >
            <template v-slot:item.action="{ item }">
              <v-btn
                class="mr-1"
                variant="text"
                rounded="lg"
                icon="mdi-pencil"
                size="small"
                :to="`/admin/interest/${item.id}`"
              ></v-btn>
              <template v-if="admin.user.role === 'admin'">
                <v-btn
                  variant="text"
                  rounded="lg"
                  size="small"
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
