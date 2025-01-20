<script setup>
const admin = useAdminUserStore();
const { setSnackbar } = useSnackbarStore();

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
const loading = ref(true);
const pagination = ref({
  totalPage: 1,
  totalItems: 0,
  itemsPerPage: 10,
  currentPage: 1,
});

const loadPosts = async ({ page, itemsPerPage, sortBy }) => {
  useAxios("post/latest", {
    query: {
      page,
      itemsPerPage,
      sortBy: sortBy.length ? sortBy : [{ order: "desc", key: "updatedAt" }],
    },
  })
    .then((res) => {
      items.value = res.posts;
      pagination.value = res.pagination;
    })
    .finally(() => {
      loading.value = false;
    });
};

const deletePost = async (item, active) => {
  await useAxios(`post/${item.id}`, {
    method: "DELETE",
  }).then((res) => {
    console.log(res);
    setSnackbar(res.message, "success");
    active.value = false;
    loadPosts({
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
        <div class="text-h4 font-weight-bold">All Posts</div>
      </v-col>
      <v-col cols="12" md="2">
        <div class="d-flex justify-end">
          <v-btn color="primary" variant="flat" to="/admin/posts/create">
            New Post
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
            @update:options="loadPosts"
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
                <lazy-common-layout-datatable-delete-dialog
                  :item
                  :title="item.title"
                  type="post"
                  @remove="deletePost"
                />
              </template>
            </template>
          </v-data-table-server>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
