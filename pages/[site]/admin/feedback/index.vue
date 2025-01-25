<script setup>
const { setSnackbar } = useSnackbarStore();

definePageMeta({
  layout: "admin",
  middleware: ["admin-auth"],
});

const headers = ref([
  {
    title: "Feedback Title",
    key: "title",
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

const loadFeedback = async ({ page, itemsPerPage, sortBy }) => {
  await useAxios("admin/feedback", {
    query: {
      page,
      itemsPerPage,
      sortBy: sortBy.length ? sortBy : [{ order: "desc", key: "updatedAt" }],
    },
  })
    .then((res) => {
      items.value = res.feedbacks;
      pagination.value = res.pagination;
    })
    .catch((err) => {
      setSnackbar(err.response._data.error, "error");
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <div class="text-h4 font-weight-bold">All Feedback</div>
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
            @update:options="loadFeedback"
          >
            <template v-slot:item.action="{ item }">
              <v-dialog persistent scrim="black" width="500">
                <template v-slot:activator="{ props: activatorProps }">
                  <v-btn
                    v-bind="activatorProps"
                    variant="text"
                    rounded="lg"
                    size="small"
                    icon="mdi-eye"
                  ></v-btn>
                </template>

                <template v-slot:default="{ isActive }">
                  <v-card :title="item.title">
                    <v-card-text class="pb-0">
                      Suggestions: {{ item.suggestions }}
                      <br />
                      UI Rating: {{ item.ratings.ui }}
                      <br />
                      Navigation Rating: {{ item.ratings.navigation }}
                      <br />
                      Performance Rating: {{ item.ratings.performance }}
                      <br />
                      Content Rating: {{ item.ratings.content }}
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        class="px-6"
                        variant="flat"
                        color="white"
                        text="Close Dialog"
                        @click="isActive.value = false"
                      ></v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
            </template>
          </v-data-table-server>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
