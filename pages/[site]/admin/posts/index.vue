<script setup>
const admin = useAdminUserStore();
definePageMeta({
  layout: "admin",
  middleware: ["admin-auth"],
});

const headers = [
  {
    align: "start",
    key: "image",
    sortable: false,
    title: "Featured Image",
    width: 180,
  },
  { key: "title", title: "Title" },
  { key: "action", title: "Actions", sortable: false, width: 150 },
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
    <v-row justify="space-between">
      <v-col cols="12" md="4">
        <div class="text-h4 font-weight-bold">All Posts</div>
      </v-col>
      <v-col cols="12" md="2">
        <v-btn variant="tonal">Add New Post</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card border flat rounded="lg">
          <v-data-table
            :headers
            :items
            :loading
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
                :to="`/admin/posts/${item.id}`"
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
