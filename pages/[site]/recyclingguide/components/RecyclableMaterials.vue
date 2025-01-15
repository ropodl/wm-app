<template>
  <div class="recyclable-materials">
    <h2>Commonly Recyclable Materials</h2>
    <ul>
      <li>
        <strong>Plastics (with Symbols 1 & 2):</strong> Plastics marked with
        recycling symbols #1 (PET) and #2 (HDPE) are widely recyclable. These
        include containers like water bottles, milk jugs, and detergent bottles.
        Ensure that plastics are clean and dry before recycling.
      </li>
      <li>
        <strong>Glass (Bottles, Jars):</strong> Glass containers such as bottles
        and jars are highly recyclable and can be recycled indefinitely without
        losing quality. Rinse and remove any lids before recycling.
      </li>
      <li>
        <strong>Paper and Cardboard (Newspapers, Boxes):</strong> Paper and
        cardboard, including newspapers, magazines, cardboard boxes, and paper
        packaging, are widely recyclable. Keep these items free from food
        contamination and moisture for best results.
      </li>
      <li>
        <strong>Metals (Aluminum Cans, Tin Cans):</strong> Aluminum and tin cans
        are highly recyclable and can be reused for making new products. Rinse
        cans before placing them in the recycling bin to avoid contamination.
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "RecyclableMaterials",
};
</script>

<style scoped>
.recyclable-materials {
  font-family: Arial, sans-serif;
  background-color: #eaf2f8;
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
  .recyclable-materials {
    padding: 15px;
  }

  h2 {
    font-size: 1.4rem;
  }

  ul {
    font-size: 1rem;
  }

  li {
    margin-bottom: 12px;
  }
}
</style>
