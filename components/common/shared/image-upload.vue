<script setup>
defineProps({
  form: {
    type: Object,
    required: true,
  },
});

const image = defineModel();
const url = useObjectUrl(image);

const onFileChange = (event) => {
  image.value = event.target.files[0];
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
    <template v-if="form.image">
      <v-hover #default="{ props, isHovering }">
        <v-img v-bind="props" cover height="200" :src="url">
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
<style></style>
