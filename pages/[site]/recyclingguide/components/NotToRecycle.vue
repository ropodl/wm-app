<template>
  <div class="not-to-recycle">
    <h2>What Not To Recycle</h2>
    <ul>
      <li>
        <strong>Food-Soiled Items</strong>
        <p>Examples: Pizza boxes with grease, used napkins, or paper towels.</p>
        <p>
          <em>Reason</em>: Contaminates other recyclable materials, making them
          unsuitable for processing.
        </p>
      </li>
      <li>
        <strong>Plastic Bags</strong>
        <p>
          <em>Recommendation</em>: Avoid placing plastic bags in curbside
          recycling bins. Instead, drop them off at designated collection
          points, often found in grocery stores.
        </p>
      </li>
      <li>
        <strong>Broken Glass, Ceramics, and Non-Recyclable Plastics</strong>
        <p>
          Examples: Broken mirrors, ceramic dishes, plastic items without
          recycling symbols.
        </p>
        <p>
          <em>Reason</em>: These materials can damage recycling equipment or are
          not processed in standard recycling facilities.
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "NotToRecycle",
};
</script>

<style scoped>
.not-to-recycle {
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  margin: 20px auto;
  text-align: justify;
}

h2 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.6rem;
}

ul {
  list-style-type: square;
  padding: 0;
  font-size: 1rem;
  line-height: 1.6;
  color: #333;
}

li {
  margin-bottom: 20px;
}

strong {
  color: #2c3e50;
  font-weight: bold;
}

em {
  font-style: italic;
  color: #7f8c8d;
}

@media (max-width: 767px) {
  .not-to-recycle {
    padding: 15px;
  }

  h2 {
    font-size: 1.4rem;
  }

  ul {
    font-size: 0.9rem;
  }

  li {
    margin-bottom: 15px;
  }
}
</style>
