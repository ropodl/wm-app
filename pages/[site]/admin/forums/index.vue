<script setup>
const admin = useAdminUserStore();
definePageMeta({
  layout: "admin",
});

const headers = ref([
  { title: "Image", key: "image" },
  {
    title: "Forum's Name",
    key: "name",
  },{
    title: "Actions",
    key: "action",
    sortable: false,
    width: 150
  }
]);

onMounted(()=>{
  getAllForums();
})

const items = ref([])
const getAllForums = async() => {
  await useAxios('/forums').then((res)=>{
    items.value = res.forums;
  })
}
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
