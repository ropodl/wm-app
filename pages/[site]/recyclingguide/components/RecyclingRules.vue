<template>
  <div class="recycling-rules">
    <h2>Basic Recycling Rules</h2>
    <ul>
      <li>
        <strong>Clean and Dry:</strong> Ensure all recyclable items are clean
        and dry before placing them in the recycling bin. Rinsing containers
        helps prevent contamination and makes the recycling process more
        efficient.
      </li>
      <li>
        <strong>No Mixed Materials:</strong> Avoid placing items with mixed
        materials (e.g., paper with plastic coatings or foil) in the recycling
        bin. These materials are difficult to separate during processing and may
        end up in landfills instead of being recycled.
      </li>
      <li>
        <strong>No Hazardous Waste:</strong> Hazardous waste such as batteries,
        electronics, or chemicals requires special handling and should not be
        placed in standard recycling bins. These items can pose a risk to human
        health and the environment, and many local recycling centers offer
        designated collection points for these materials.
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "RecyclingRules",
};
</script>

<style scoped>
.recycling-rules {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  margin: 20px auto;
  text-align: justify;
  font-size: 1rem;
  line-height: 1.6;
  color: #333;
}

h2 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.6rem;
}

ul {
  list-style-type: disc;
  padding-left: 20px;
  font-size: 1rem;
  line-height: 1.6;
  color: #333;
}

li {
  margin-bottom: 15px;
}

strong {
  color: #2c3e50;
  font-weight: bold;
}

@media (max-width: 767px) {
  .recycling-rules {
    padding: 15px;
  }

  h2 {
    font-size: 1.4rem;
  }

  ul {
    font-size: 1rem;
  }
}
</style>
