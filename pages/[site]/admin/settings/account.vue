<script setup>
const user = useAdminUserStore();
const { setSnackbar } = useSnackbarStore();

definePageMeta({
  layout: "admin-settings",
  middleware: ["admin-auth"],
});

const form = ref({
  name: "",
  user_name: "",
  phone_number: "",
  email: "",
});

const rules = ref({
  name: [
    (v) => !!v || "First Name is required",
    (v) => (v && v.length > 2) || "First Name must be 3 characters or more",
  ],
  user_name: [
    (v) => !!v || "User Name is required",
    (v) => (v && v.length > 2) || "User Name must be 3 characters or more",
  ],
});

onMounted(() => {
  callProfileInfo();
});

const callProfileInfo = () => {
  useAxios(`/user/${user.user.id}`).then((res) => {
    form.value.name = res.name;
    form.value.user_name = res.user_name;
    form.value.phone_number = res.phone_number;
    form.value.email = res.email;
  });
};

const passwordForm = ref({
  current: "",
  newer: "",
});
const confirm = ref("");

const changePassword = ref({
  current: [
    (v) => !!v || "Current Password is required",
    (v) => (v && v.length > 5) || "Password must be 5 or more characters",
  ],
  confirm: [
    (v) => !!v || "Confirm Password is required",
    (v) => (v && v.length > 5) || "Password must be 5 or more characters",
    (v) => v === passwordForm.value.newer || "Passwords do not match",
  ],
});

const submit = async () => {
  await useAxios(`/user/${user.user.id}`, {
    method: "PATCH",
    body: form.value,
  }).then((res) => {
    setSnackbar(res.message, "success");
    user.user.name = res.name;
    user.user.user_name = res.user_name;
    user.user.email = res.email;
    user.user.phone_number = res.phone_number;
  });
};
// upload profile pic
const uploadProfilePicture = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("image", file);

  await useAxios(`user/${user.user.id}/picture`, {
    method: "PATCH",
    body: formData,
  })
    .then((res) => {
      user.user.image = res.image;
      setSnackbar(res.message, "success");
    })
    .catch((err) => {
      console.error("Failed to upload image:", err);
    });
};
// password update
const passwordRef = ref(null);
const changePasswordRequest = async (isActive) => {
  const { valid } = await passwordRef.value.validate();
  if (valid)
    await useAxios(`user/${user.user.id}/password`, {
      method: "PATCH",
      body: passwordForm.value,
    })
      .then((res) => {
        setSnackbar(res.message, "success");
        isActive.value = false;
      })
      .catch((err) => {
        setSnackbar(err.response._data.error, "error");
      });
};
</script>
<template>
  <v-row>
    <v-col cols="12" class="px-0 pb-0">
      <v-card-title class="pt-0">Profile</v-card-title>
    </v-col>
    <v-col cols="12" md="3">
      <v-hover #default="{ props, isHovering }">
        <v-card
          border
          rounded="lg"
          v-bind="props"
          style="position: sticky; top: 70px"
        >
          <v-img cover height="180" :src="user.user?.image?.url">
            <v-overlay
              :model-value="isHovering"
              contained
              scrim="black"
              content-class="h-100 w-100 d-flex align-center justify-center"
            >
              <v-btn
                color="gray"
                icon="mdi-cloud-upload"
                @click="$refs.fileInput.click()"
              ></v-btn>
            </v-overlay>
          </v-img>
          <input
            type="file"
            ref="fileInput"
            style="display: none"
            accept="image/*"
            @change="uploadProfilePicture"
          />
        </v-card>
      </v-hover>
    </v-col>
    <v-col cols="12" md="9">
      <v-form @submit.prevent="submit">
        <v-row>
          <v-col cols="12" md="6">
            <lazy-common-shared-field-label
              >Full Name</lazy-common-shared-field-label
            >
            <v-text-field
              v-model="form.name"
              persistent-hint
              hint="e.g John Doe"
              :rules="rules.name"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <lazy-common-shared-field-label
              >User Name</lazy-common-shared-field-label
            >
            <v-text-field
              v-model="form.user_name"
              persistent-hint
              hint="e.g john.doe"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <lazy-common-shared-field-label
              >Phone Number</lazy-common-shared-field-label
            >
            <v-text-field
              v-model="form.phone_number"
              persistent-hint
              hint="e.g 98XXXXXXXX"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <lazy-common-shared-field-label
              >Email Address</lazy-common-shared-field-label
            >
            <v-text-field
              v-model="form.email"
              persistent-hint
              hint="e.g john.doe@example.com"
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="d-flex">
            <v-spacer></v-spacer>
            <v-btn color="primary" type="submit" rounded="lg"
              >Update Profile</v-btn
            >
          </v-col>
        </v-row>
      </v-form>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12">
      <v-card-title>Danger Zone</v-card-title>
      <v-card border flat>
        <v-list>
          <v-list-item>
            <v-list-item-title>Change Password</v-list-item-title>
            <v-list-item-subtitle
              >Changing Password uses sudo powers. Are you sure you want to
              unlock sudo?</v-list-item-subtitle
            >
            <template v-slot:append>
              <v-dialog persistent scrollable scrim="black" width="400">
                <template v-slot:activator="{ props: activatorProps }">
                  <v-btn
                    v-bind="activatorProps"
                    border
                    flat
                    rounded="lg"
                    class="text-error"
                    >Change Password</v-btn
                  >
                </template>
                <template v-slot:default="{ isActive }">
                  <v-form
                    ref="passwordRef"
                    @submit.prevent="changePasswordRequest(isActive)"
                  >
                    <v-card title="Change Password">
                      <v-card-text class="pb-0">
                        <lazy-common-shared-field-label>
                          Current Password
                        </lazy-common-shared-field-label>
                        <v-text-field
                          v-model="passwordForm.current"
                          :rules="changePassword.current"
                        ></v-text-field>
                        <lazy-common-shared-field-label>
                          New Password
                        </lazy-common-shared-field-label>
                        <v-text-field
                          v-model="passwordForm.newer"
                          :rules="changePassword.current"
                        ></v-text-field>
                        <lazy-common-shared-field-label
                          >Confirm New Password</lazy-common-shared-field-label
                        >
                        <v-text-field
                          v-model="confirm"
                          :rules="changePassword.confirm"
                        ></v-text-field>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          variant="text"
                          class="px-6"
                          text="Cancel"
                          @click="isActive.value = false"
                        ></v-btn>
                        <v-btn
                          type="submit"
                          variant="flat"
                          color="primary"
                          class="px-6"
                          text="Save"
                        ></v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-form>
                </template>
              </v-dialog>
            </template>
          </v-list-item>
        </v-list>
        <!-- <v-divider></v-divider>
        <v-list>
          <v-list-item>
            <v-list-item-title>Delete Account</v-list-item-title>
            <v-list-item-subtitle
              >Once you delete your account, there is no going back. Please be
              certain.</v-list-item-subtitle
            >
            <template v-slot:append>
              <v-dialog scrim="black" width="500">
                <template v-slot:activator="{ props: activatorProps }">
                  <v-btn
                    v-bind="activatorProps"
                    border
                    flat
                    rounded="lg"
                    class="text-error"
                  >
                    Delete Account
                  </v-btn>
                </template>

                <template v-slot:default="{ isActive }">
                  <v-card border title="Delete Account">
                    <v-card-text>
                      <span class="text-error">
                        Are you sure you want to delete your account?
                      </span>
                      <br />
                      This is not revertable. You will have to contact the
                      service provider for account recovery.
                    </v-card-text>
                    <v-card-actions>
                      <v-row>
                        <v-col cols="6" class="pt-0">
                          <v-btn
                            block
                            variant="tonal"
                            color="success"
                            @click="isActive.value = false"
                          >
                            No, keep account
                          </v-btn>
                        </v-col>
                        <v-col cols="6" class="pt-0">
                          <v-btn
                            block
                            variant="tonal"
                            color="error"
                            @click="isActive.value = false"
                          >
                            Yes, delete account
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
            </template>
          </v-list-item>
        </v-list> -->
      </v-card>
    </v-col>
  </v-row>
</template>
