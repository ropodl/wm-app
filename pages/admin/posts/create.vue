<script setup>
const route = useRoute();

definePageMeta({
  layout: "admin",
});

const form = ref({
  title: "",
  content: "",
  image: "",
  status: false,
});
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <h1>Add Posts</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="8">
        <v-text-field label="Post Title" v-model="form.title"></v-text-field>
        <ClientOnly fallback="Loading editor...">
          <QuillEditor v-model:content="form.content" theme="snow" />
        </ClientOnly>
      </v-col>
      <v-col cols="12" md="4">
        <v-card border flat class="mb-3">
          <v-card-title>Actions</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <span class="font-weight-bold">Status:&nbsp;</span>
            {{ form.status ? "Published" : "Draft" }}
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-row>
              <v-col cols="6">
                <v-btn
                  block
                  color="warning"
                  height="40"
                  class="text-capitalize"
                  @click="form.status = false"
                >
                  Save as Draft
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn
                  block
                  type="submit"
                  color="primary"
                  height="40"
                  variant="tonal"
                  class="text-capitalize"
                  @click="form.status = true"
                >
                  {{ route.params.id ? "Update" : "Publish Now" }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>

        <!-- <v-card border flat class="mb-3" :loading :disabled="loading">
          <v-card-title>Featured Image</v-card-title>
          <v-divider></v-divider>
          <v-card-text
            class="d-flex align-center justify-center position-relative pa-0"
          >
            
              <v-hover v-slot="{ isHovering, props }">
                <v-img cover v-bind="props" :src="form[type]?.url" height="200">
                  <v-overlay
                    contained
                    :model-value="isHovering"
                    content-class="w-100 h-100 d-flex align-center justify-center"
                    scrim="black"
                  >
                    <v-btn
                      icon
                      color="error"
                      @click="form.featured_image.url = null"
                    >
                      <Icon icon="mdi:close" />
                    </v-btn>
                  </v-overlay>
                </v-img>
              </v-hover>
            
            
              <input
                @change="selectFeaturedImage"
                type="file"
                name="image"
                class="py-4"
              />
            
          </v-card-text>
          <template v-if="errors">
            <v-divider></v-divider>
            <v-card-text>{{ errors.message }}</v-card-text>
          </template>
        </v-card> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<style></style>
