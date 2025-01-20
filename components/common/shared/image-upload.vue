<script setup>
const apperance = useApperanceStore();

const props = defineProps({
  title: { type: String, required: false, default: "Upload Image" },
  form: { type: Object, required: true },
});

// Image Upload
const file = shallowRef();
const url = useObjectUrl(file);

const selectImage = ({ target }) => {
  const { value, files, name } = target;
  if (name === "image") {
    file.value = files[0];
    props.form.image = files[0];
    return;
  }
};
</script>

<template>
  <v-card border :density="apperance.density" flat class="mb-3">
    <v-card-title>{{ title }}</v-card-title>
    <v-divider></v-divider>
    <v-card-text
      class="d-flex align-center justify-center position-relative pa-0"
    >
      <template v-if="form.image !== null">
        <v-hover v-slot="{ isHovering, props }">
          <v-img
            cover
            v-bind="props"
            :src="url || form.image.url"
            height="200"
            class="w-100"
          >
            <v-overlay
              contained
              :model-value="isHovering"
              content-class="w-100 h-100 d-flex align-center justify-center"
              scrim="black"
            >
              <v-btn
                icon="mdi-close"
                color="primary"
                size="x-small"
                rounded="lg"
                @click="form.image = null"
              />
            </v-overlay>
          </v-img>
        </v-hover>
      </template>
      <template v-else>
        <input
          @change="selectImage"
          type="file"
          name="image"
          accept="image/*"
          class="py-4"
        />
      </template>
    </v-card-text>
  </v-card>
</template>
