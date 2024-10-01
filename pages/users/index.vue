<script setup>
definePageMeta({
  layout: "admin"
})

const headers = [{
  title: "Image",
  value: "image"
}, {
  title: "Username",
  value: "name"
}]

const items = [{
  image: "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShaggyMullet&accessoriesType=Wayfarers&hairColor=SilverGray&facialHairType=MoustacheFancy&facialHairColor=BrownDark&clotheType=BlazerShirt&eyeType=Surprised&eyebrowType=FlatNatural&mouthType=Eating&skinColor=DarkBrown",
  name: "Admin"
}]
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card border rounded="lg">
          <v-data-table :headers :items></v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style></style>
