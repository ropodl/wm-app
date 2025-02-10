<script setup>
const admin = useAdminUserStore();
const { setSnackbar } = useSnackbarStore();

definePageMeta({
  layout: "admin",
  middleware: ["admin-auth"],
});

const headers = [
  { key: "title", title: "Title" },
  { key: "slug", title: "Slug" },
  {
    key: "status",
    title: "Status",
    sortable: false,
    width: 100,
  },
  { key: "action", title: "Actions", sortable: false, width: 150 },
];

const items = ref([]);
const pagination = ref({
  totalPage: 1,
  totalItems: 0,
  itemsPerPage: 10,
  currentPage: 1,
});
const loading = ref(true);

const loadInterests = async ({ page, itemsPerPage, sortBy }) => {
  const res = await useAxios("interest", {
    query: {
      page,
      itemsPerPage,
      sortBy: sortBy.length ? sortBy : [{ order: "desc", key: "updatedAt" }],
    },
  });
  items.value = res.interests;
  pagination.value = res.pagination;
  loading.value = false;
};

const deleteInterest = async (item, active) => {
  await useAxios(`interest/${item.id}`, {
    method: "DELETE",
  })
    .then((res) => {
      setSnackbar(res.message, "success");
      active.value = false;
      loadInterests({
        page: pagination.currentPage,
        itemsPerPage: pagination.itemsPerPage,
        sortBy: [],
      });
    })
    .catch((err) => {
      setSnackbar(err.response._data.error, "error");
    });
};
</script>
<template>
  <v-container>
    <v-row justify="space-between">
      <v-col cols="12" md="4">
        <div class="text-h4 font-weight-bold">All Interests</div>
      </v-col>
      <v-col cols="12" md="2">
        <div class="d-flex justify-end">
          <v-btn color="primary" to="/admin/interest/create">
            New Interest
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-data-table-server
            :headers
            :items
            :loading
            :items-per-page="pagination.itemsPerPage"
            :items-length="pagination.totalItems"
            @update:options="loadInterests"
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
                icon="mdi-pencil"
                size="small"
                :to="`/admin/interest/${item.id}`"
              ></v-btn>
              <template v-if="admin.user.role === 'admin'">
                <lazy-common-layout-datatable-delete-dialog
                  :item
                  :title="item.title"
                  type="interest"
                  @remove="deleteInterest"
                />
              </template>
            </template>
          </v-data-table-server>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
