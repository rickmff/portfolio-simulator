<template>
  <div class="home">
    <h1>Home</h1>
  </div>
</template>

<script>
export default {
  name: "Home",
  mounted() {
    this.$http.get("http://localhost:3000/").then((res) => {
      console.log(res.data);
    });
  },
};
</script>
