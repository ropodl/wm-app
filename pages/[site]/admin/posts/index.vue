<script setup>
const admin = useAdminUserStore();
definePageMeta({
  layout: "admin",
  middleware: ["admin-auth"],
});

const headers = [
  { key: "title", title: "Title" },
  {
    key: "status",
    title: "Status",
    sortable: false,
    width: 100,
  },
  {
    key: "action",
    title: "Actions",
    sortable: false,
    align: "center",
    width: 140,
  },
];

const items = ref([]);
const pagination = ref({});
const loading = ref(true);

onMounted(() => {
  getPosts();
});

const getPosts = async () => {
  useAxios("post/latest").then((res) => {
    items.value = res.posts;
    pagination.value = res.pagination;
    loading.value = false;
  });
};
</script>
<template>
  <v-container>
    <v-row justify="space-between" align="center">
      <v-col cols="12" md="4">
        <div class="text-h4 font-weight-bold">All Posts</div>
      </v-col>
      <v-col cols="12" md="2">
        <div class="d-flex justify-end">
          <v-btn variant="tonal" color="white" rounded="lg">New Post</v-btn>
        </div>
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
            <template v-slot:item.status="{ item }">
              <v-chip
                variant="text"
                class="w-100 pa-0"
                :color="item.status === 'Draft' ? 'warning' : 'success'"
                >{{ item.status }}</v-chip
              >
            </template>
            <template v-slot:item.action="{ item }">
              <v-btn
                class="mr-1"
                variant="text"
                rounded="lg"
                size="small"
                icon="mdi-pencil"
                :to="`/admin/posts/${item.id}`"
              ></v-btn>
              <template v-if="admin.user.role === 'admin'">
                <v-btn
                  variant="text"
                  rounded="lg"
                  size="small"
                  icon="mdi-delete"
                ></v-btn>
              </template>
              <!-- <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn
                    flat
                    icon="mdi-dots-horizontal"
                    color="transparent"
                    size="small"
                    v-bind="props"
                  />
                </template>
                <v-list border class="py-0" density="compact">
                  <v-list-item title="Edit" :to="`/admin/posts/${item.id}`" />
                  <v-list-item title="Delete" to="/a" />
                </v-list>
              </v-menu> -->
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
