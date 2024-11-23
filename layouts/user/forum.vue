<script setup></script>
<template>
  <v-main>
    <NuxtLayout name="user">
      <v-container fluid class="pa-0">
        <v-row no-gutters>
          <v-col cols="12" md="9">
            <v-layout>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <h1>Forums</h1>
                  </v-col>
                </v-row>
                <slot />
              </v-container>
            </v-layout>
          </v-col>
          <v-col cols="12" md="3">
            <v-card
              border="s"
              flat
              class="position-sticky"
              color="transparent"
              rounded="0"
              style="height: calc(100vh - 61px); top: 61px; overflow-y: scroll"
            >
              <v-card-title>Latest Forum Post</v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </NuxtLayout>
  </v-main>
</template>
<style></style>
