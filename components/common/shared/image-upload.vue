<!-- <script setup>
defineProps({
  form: {
    type: [Object, undefined],
    required: true,
  },
});

const emits = defineEmits(['changeImage'])

const image = defineModel();
const url = ref(null);
// console.log(url);

const onFileChange = (event) => {
  image.value = event.target.files[0];
  url.value = useObjectUrl(image).value;
  console.log(url.value);
};
</script>
<template>
  <v-card border flat class="mb-3">
    <v-card-title class="d-flex">
      Featured Image <v-spacer></v-spacer>
      <v-tooltip theme="light" text="Image will upload after form submission.">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            variant="flat"
            theme="dark"
            icon="mdi-information"
            size="x-small"
          />
        </template>
      </v-tooltip>
    </v-card-title>
    <template v-if="form.image?.url">
      <v-hover #default="{ props, isHovering }">
        <v-img v-bind="props" cover height="200" :src="form.image.url">
          <template v-if="isHovering">
            <div
              class="fill-height d-flex justify-center align-center"
              style="
                background-color: rgba(1, 1, 1, 0.5);
                backdrop-filter: blur(3px);
              "
            >
              <v-btn
                color="primary"
                icon="mdi-close"
                rounded="lg"
                @click="form.image = null"
              />
            </div>
          </template>
        </v-img>
      </v-hover>
    </template>
    <template v-else>
      <v-card-text>
        <input type="file" @change="onFileChange" />
      </v-card-text>
    </template>
  </v-card>
</template>
<style></style> -->
<script setup>
const props = defineProps({
  title: { type: String, required: true },
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
  <v-card border flat class="mb-3">
    <v-card-title>Upload Image</v-card-title>
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
                flat
                icon="mdi-close"
                color="primary"
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
