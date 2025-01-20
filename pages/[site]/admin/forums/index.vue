<script setup>
const admin = useAdminUserStore();
const { setSnackbar } = useSnackbarStore();

definePageMeta({
  layout: "admin",
  middleware: ["admin-auth"],
});

const headers = ref([
  {
    title: "Forum's Name",
    key: "name",
  },
  {
    key: "status",
    title: "Status",
    sortable: false,
    width: 100,
  },
  {
    title: "Actions",
    key: "action",
    sortable: false,
    width: 150,
  },
]);

const items = ref([]);
const loading = ref(true);
const pagination = ref({
  totalPage: 1,
  totalItems: 0,
  itemsPerPage: 10,
  currentPage: 1,
});

const loadForums = async ({ page, itemsPerPage, sortBy }) => {
  await useAxios("/forums", {
    query: {
      page,
      itemsPerPage,
      sortBy: sortBy.length ? sortBy : [{ order: "desc", key: "updatedAt" }],
    },
  })
    .then((res) => {
      items.value = res.forums;
      pagination.value = res.pagination;
    })
    .finally(() => {
      loading.value = false;
    });
};

const deleteForum = async (item, active) => {
  console.log(item.id);
  await useAxios(`/forums/${item.id}`, {
    method: "DELETE",
  }).then((res) => {
    setSnackbar(res.message, "success");
    active.value = false;
    loadForums({
      page: pagination.currentPage,
      itemsPerPage: pagination.itemsPerPage,
      sortBy: [],
    });
  });
};
</script>
<template>
  <v-container>
    <v-row justify="space-between" align="center">
      <v-col cols="12" md="4">
        <div class="text-h4 font-weight-bold">All Forums</div>
      </v-col>
      <v-col cols="12" md="4">
        <div class="d-flex justify-end">
          <v-btn color="primary" to="/admin/forums/create"> New Forum </v-btn>
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
            :items-length="pagination.totalPage"
            @update:options="loadForums"
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
                :to="`/admin/forums/${item.id}`"
              ></v-btn>
              <template v-if="admin.user.role === 'admin'">
                <lazy-common-layout-datatable-delete-dialog
                  :item
                  :title="item.name"
                  type="forum"
                  @remove="deleteForum"
                />
              </template>
            </template>
          </v-data-table-server>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
