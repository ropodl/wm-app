<script setup>
definePageMeta({
  layout: "admin",
  middleware: ["admin-auth"],
});

const headers = [
  {
    value: "user",
    title: "User",
  },
  {
    title: "Username",
    value: "name",
  },
];

const items = [
  {
    image:
      "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShaggyMullet&accessoriesType=Wayfarers&hairColor=SilverGray&facialHairType=MoustacheFancy&facialHairColor=BrownDark&clotheType=BlazerShirt&eyeType=Surprised&eyebrowType=FlatNatural&mouthType=Eating&skinColor=DarkBrown",
    name: "Admin admin",
    role: "admin",
  },
];
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card border flat rounded="lg">
          <v-data-table :headers :items>
            <template v-slot:item.user="{ item }">
              <v-list-item
                :prepend-avatar="item.image"
                :title="item.name"
                :subtitle="item.role"
              ></v-list-item>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
