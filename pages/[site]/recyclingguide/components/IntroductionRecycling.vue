<script setup>
definePageMeta({
  layout: "user",
});
</script>
<template>
  <div class="recycling-container">
    <section class="recycling-intro">
      <h2>Introduction to Recycling</h2>
      <p class="justified-text">
        Recycling is the process of converting waste materials into new
        products, reducing the need for raw resource extraction. It helps
        conserve natural resources, minimize pollution, and decrease the volume
        of waste sent to landfills. By recycling materials like paper, plastic,
        glass, and metal, we save energy and lower greenhouse gas emissions,
        contributing to environmental protection.
        <br />
        Additionally, recycling supports a circular economy by reusing materials
        and reducing the environmental impact of manufacturing. This approach
        promotes sustainability by ensuring more efficient use of resources and
        minimizing waste, ultimately benefiting both the economy and the
        environment.
      </p>
    </section>

    <section class="why-recycling">
      <h2>Why Recycling is Important</h2>
      <ul>
        <li>
          <strong>Reduces Waste:</strong> Minimizes the waste that ends up in
          landfills and incinerators, helping to protect the environment.
        </li>
        <li>
          <strong>Conserves Natural Resources:</strong> Saves raw materials like
          timber, water, and minerals, preserving them for future generations.
        </li>
        <li>
          <strong>Saves Energy:</strong> Producing goods from recycled materials
          requires less energy compared to using raw materials.
        </li>
        <li>
          <strong>Decreases Pollution:</strong> Reduces air and water pollution
          by lowering the need for traditional waste disposal methods.
        </li>
        <li>
          <strong>Lowers Carbon Footprint:</strong> Helps combat climate change
          by reducing greenhouse gas emissions from manufacturing and waste
          management processes.
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: "IntroductionRecycling",
};
</script>

<style scoped>
.recycling-container {
  display: flex;
  flex-direction: column;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}
.justified-text {
  text-align: justify;
  font-family: Arial, sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: #333;
  margin: 10px 0;
}
.recycling-intro,
.why-recycling {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  text-align: justify;
  font-family: Arial, sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: #333;
  margin: 10px 0;
}

h2 {
  color: #2c3e50;
  font-size: 1.6rem;
  margin-bottom: 15px;
}

p,
ul {
  font-size: 1rem;
  line-height: 1.6;
  color: #333;
}

ul {
  list-style-type: square;
  padding-left: 0;
}

li {
  margin-bottom: 15px;
}

strong {
  color: #2c3e50;
}

@media (min-width: 768px) {
  .recycling-container {
    flex-direction: row;
    justify-content: space-between;
    gap: 20px;
  }

  .recycling-intro,
  .why-recycling {
    width: 48%;
  }
}

@media (max-width: 767px) {
  h2 {
    font-size: 1.4rem;
  }

  p,
  ul {
    font-size: 0.9rem;
  }
}
</style>
