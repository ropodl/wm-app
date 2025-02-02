<script setup>
import { formatTimeAgo } from "@vueuse/core";
import { errorMessages } from "vue/compiler-sfc";

const user = useUserStore();
const route = useRoute();
const { setSnackbar } = useSnackbarStore();

definePageMeta({
  layout: "user",
  middleware: ["user-auth"],
});

onMounted(() => {
  getThread();
});

const thread = ref({});
const getThread = async () => {
  await useAxios(`/forums/threads/${route.params.id}`).then((res) => {
    thread.value = res;
    getThreadComments();
  });
};
const comments = ref([]);
const commentLoading = ref(true);
const pagination = ref({});
const getThreadComments = async () => {
  await useAxios(`/forums/threads/${route.params.id}/comments`)
    .then((res) => {
      comments.value = res.comments;
      pagination.value = res.pagination;
    })
    .finally(() => {
      commentLoading.value = false;
    });
};

const form = ref({
  content: "",
});
const commentRef = ref(null);
const submit = () => {
  useAxios(`/forums/threads/${route.params.id}/comments`, {
    method: "POST",
    body: form.value,
    query: {
      author_id: user.user.id,
    },
  }).then(async (res) => {
    commentRef.value.reset();
    await getThreadComments();
    setSnackbar(res.message, "success");
  });
};

const upVoteLoading = ref(false);
const downVoteLoading = ref(false);

const upvote = async () => {
  upVoteLoading.value = true;
  await useAxios(`/user/thread/${route.params.id}/up`, {
    method: "PATCH",
  })
    .then((res) => {
      thread.value.upvote = res.upvote;
      thread.value.downvote = res.downvote;
      setSnackbar(res.message, "success");
    })
    .catch((err) => {
      setSnackbar(err.response._data.error, "error");
    })
    .finally(() => {
      upVoteLoading.value = false;
    });
};

const downvote = async () => {
  if (downVoteLoading.value) return;
  downVoteLoading.value = true;

  await useAxios(`/user/thread/${route.params.id}/down`, {
    method: "PATCH",
  })
    .then((res) => {
      thread.value.upvote = res.upvote;
      thread.value.downvote = res.downvote;
      setSnackbar(res.message, "success");
    })
    .catch((err) => {
      setSnackbar(err.response._data.error, "error");
    })
    .finally(() => {
      downVoteLoading.value = false;
    });
};
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="pb-0">
        <v-card border="0">
          <v-card-text class="pb-0 pa-0 d-flex align-center">
            <template v-if="thread.author?.image">
              <v-avatar class="mr-3">
                <v-img :src="thread.author?.image?.url"></v-img>
              </v-avatar>
            </template>
            <span class="mr-3">
              {{ thread.author?.name }}
            </span>
            <span>.</span>
            <span class="ml-3">
              {{ formatTimeAgo(new Date(thread.createdAt)) }}
            </span>
          </v-card-text>
          <v-card-title class="px-0 pt-0" style="white-space: unset">
            <h1>{{ thread.title }}</h1>
          </v-card-title>
          <v-card-text class="px-0" v-html="thread.content"></v-card-text>
          <v-card-actions class="px-0">
            <v-btn class="px-6" @click="upvote">
              <v-icon
                start
                :color="
                  thread.upvote?.by.includes(user.user.id) ? 'secondary' : ''
                "
                icon="mdi-thumb-up-outline"
              ></v-icon>
              {{ thread.upvote?.count }}
            </v-btn>
            <v-btn class="px-6" @click="downvote">
              <v-icon
                start
                :color="
                  thread.downvote?.by.includes(user.user.id) ? 'secondary' : ''
                "
                icon="mdi-thumb-down-outline"
              ></v-icon>
              {{ thread.downvote?.count }}
            </v-btn>
            <v-btn readonly>
              <v-icon start icon="mdi-comment-multiple-outline"></v-icon>
              {{ comments.length }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card border="0">
          <v-card-title class="px-0">Comments</v-card-title>
        </v-card>
        <v-row>
          <template v-if="commentLoading">
            <v-col cols="12">
              <v-progress-circular indeterminate></v-progress-circular>
            </v-col>
          </template>
          <template v-else-if="comments.length">
            <template
              v-for="{
                id,
                author,
                content,
                updatedAt,
                isSpam,
                sentiment,
              } in comments"
              :key="id"
            >
              <v-col cols="12" class="pb-0">
                <v-card>
                  <v-card-text class="pb-0 d-flex align-center">
                    <template v-if="author?.image">
                      <v-avatar class="mr-3">
                        <v-img :src="author.image?.url"></v-img>
                      </v-avatar>
                    </template>
                    <span class="mr-3">
                      {{ author?.name }}
                    </span>
                    <span>.</span>
                    <span class="ml-3">
                      {{ formatTimeAgo(new Date(updatedAt)) }}
                    </span>
                    <v-spacer></v-spacer>
                    <template v-if="isSpam">
                      <v-chip
                        color="error"
                        rounded="lg"
                        class="position-absolute top-0 right-0 rounded-t-0 rounded-e-0"
                      >
                        {{ isSpam ? "spam" : "" }}
                      </v-chip>
                    </template>
                    <template v-if="sentiment && sentiment !== 'spam'">
                      <v-chip
                        rounded="lg"
                        class="position-absolute bottom-0 right-0 rounded-b-0 rounded-e-0"
                      >
                        {{ sentiment }}
                      </v-chip>
                    </template>
                  </v-card-text>
                  <v-card-text class="pt-3">{{ content }}</v-card-text>
                </v-card>
              </v-col>
            </template>
          </template>
          <template v-else>
            <v-col cols="12">
              <v-card>
                <v-card-text>
                  Sorry, comments are currently not available
                </v-card-text>
              </v-card>
            </v-col>
          </template>
          <v-col cols="12">
            <v-form ref="commentRef" @submit.prevent="submit">
              <v-textarea v-model="form.content"></v-textarea>
              <v-btn class="px-6" color="primary" type="submit">Submit</v-btn>
            </v-form>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
