<template>
  <div>
    <MainTitle />
    <IntroductionRecycling />
    <RecyclingRules />
    <RecyclableMaterials />
    <NotToRecycle />
    <RecyclingSteps />
  </div>
</template>

<script>
import MainTitle from "./components/MainTitle.vue";
import IntroductionRecycling from "./components/IntroductionRecycling.vue";
import RecyclingRules from "./components/RecyclingRules.vue";
import RecyclableMaterials from "./components/RecyclableMaterials.vue";
import NotToRecycle from "./components/NotToRecycle.vue";
import RecyclingSteps from "./components/RecyclingSteps.vue";
export default {
  components: {
    MainTitle,
    IntroductionRecycling,
    RecyclingRules,
    RecyclableMaterials,
    NotToRecycle,
    RecyclingSteps,
  },
};
</script>
