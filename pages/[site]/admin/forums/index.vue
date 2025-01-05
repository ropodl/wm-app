<script setup>
const admin = useAdminUserStore();
const { setSnackbar } = useSnackbarStore();

definePageMeta({
  layout: "admin",
  middleware: ["admin-auth"],
});

const headers = ref([
  // { title: "Image", key: "image", sortable: false, width: 180 },
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
const pagination = ref({});
const getAllForums = async () => {
  await useAxios("/forums").then((res) => {
    items.value = res.forums;
    pagination.value = res.pagination;
  });
};

const deleteItem = async (item, active) => {
  console.log(item.id);
  await useAxios(`/forums/${item.id}`, {
    method: "DELETE",
  }).then((res) => {
    setSnackbar(res.message, "success");
    getAllForums();
    active.value = false;
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
        <v-card>
          <v-data-table-server
            :headers
            :items
            :items-per-page="pagination.itemsPerPage"
            :items-length="pagination.totalPage"
          >
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
                <v-dialog scrim="black" width="500">
                  <template v-slot:activator="{ props: dialog }">
                    <v-btn
                      v-bind="dialog"
                      variant="text"
                      size="small"
                      rounded="lg"
                      icon="mdi-delete"
                    ></v-btn>
                  </template>
                  <template v-slot:default="{ isActive }">
                    <v-card border flat title="Delete Forum">
                      <v-card-text>
                        Are you sure, you want to delete forum with name<br />"<span
                          class="text-red"
                        >
                          {{ item.name }}</span
                        >"?
                      </v-card-text>
                      <v-card-actions>
                        <v-btn
                          border
                          class="px-6"
                          text="Cancel"
                          @click="isActive.value = false"
                        ></v-btn>
                        <v-btn
                          variant="flat"
                          color="primary"
                          class="px-6"
                          text="Continue"
                          @click="deleteItem(item, isActive)"
                        ></v-btn>
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>
              </template>
            </template>
          </v-data-table-server>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
