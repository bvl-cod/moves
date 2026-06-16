<template>
  <div class="d-inline-flex align-items-center">
    <!-- Loop through 5 possible stars -->
    <span
      v-for="starIndex in 10"
      :key="starIndex"
      class="me-1"
      style="cursor: pointer"
    >
      <!-- If starIndex <= rating, show filled star; else show empty star -->
      <i
        class="bi"
        :class="
          starIndex <= rating
            ? 'bi-star-fill text-warning'
            : 'bi-star text-muted'
        "
      ></i>
    </span>
    <!-- Optionally display the numeric rating next to the stars -->
    <span class="m-2"> {{ rating }} / 10 </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // rating: null,
    };
  },
  props: {
    rating: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    handleRating(rating) {
      this.$emit("update:rating", rating); //.rating = rating;
      // Here you would typically send the rating to your backend
    },
  },
};

// import { ref } from "vue";

// const rating = ref(0);

// function handleRating(value) {
//   rating.value = value;
// }
</script>

<style scoped>
/* You can put additional styling here if needed */
</style>
