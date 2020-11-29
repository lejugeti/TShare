<template>
  <div :class="typeof title === 'undefined' ? 'green-line':'green-title'">
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    title: String
  }
}
</script>

<style scoped>
  .green-line{
    width: 100%;
    height: 30px;
    background: #B8D6AA;
  }
  .green-title{
    width: 100%;
    height: auto;
    background: #B8D6AA;
    text-align: center;
  }
  .green-line,h1{
    padding: 8px;
    font-size: 2rem;
  }
</style>
