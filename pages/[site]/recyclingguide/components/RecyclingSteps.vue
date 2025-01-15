<template>
  <div class="recycling-steps">
    <h2>Steps to Start Recycling at Home</h2>
    <ol>
      <li>
        <strong>Set Up Separate Bins for Different Materials</strong>
        <p>
          Dedicate bins for commonly recycled items like paper, plastics, glass,
          and metals.
        </p>
      </li>
      <li>
        <strong>Label Bins Clearly for Ease of Use</strong>
        <p>
          Use clear labels or color codes to help household members quickly
          identify which materials go into which bin.
        </p>
      </li>
      <li>
        <strong>Schedule Regular Drop-Offs or Pickups</strong>
        <p>
          Plan consistent drop-offs at local recycling centers or arrange for
          curbside recycling pickups to ensure your efforts stay on track.
        </p>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: "RecyclingSteps",
};
</script>

<style scoped>
.recycling-steps {
  font-family: Arial, sans-serif;
  padding: 20px;
  background-color: #eef6f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  margin: 20px auto;
  text-align: justify;
}

h2 {
  color: #2c3e50;
  font-size: 1.6rem;
  margin-bottom: 20px;
}

ol {
  padding-left: 20px;
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

p {
  margin: 5px 0;
  color: #555;
}

@media (max-width: 767px) {
  .recycling-steps {
    padding: 15px;
  }

  h2 {
    font-size: 1.4rem;
  }

  ol {
    font-size: 0.9rem;
  }

  li {
    margin-bottom: 15px;
  }
}
</style>
