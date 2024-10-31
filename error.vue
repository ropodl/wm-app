<script setup>
const route = useRoute();

defineProps({
  error: {
    type: Object,
    required: true,
  },
});

const to = computed(()=>{
  if(route.fullPath.includes('admin')) return "/admin"
  else return "/"
})
</script>
<template>
  <v-app>
    <v-main>
      <v-container class="fill-height">
        <v-row>
          <v-col cols="12">
            <v-card-title class="text-h1 px-0">
              {{ error.statusCode }}
            </v-card-title>
            <v-card-text class="text-h4 px-0 font-weight-light">
              {{ error.message }}
            </v-card-text>
            <v-btn color="primary" :to>Go back home</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
