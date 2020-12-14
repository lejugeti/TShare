<template>
  <div :class="[ { 'button-section-selected': selected }, 'button-section' ]"><span>{{ content }}</span></div>
</template>

<script>
export default {
  props: {
    content: String,
    selected: Boolean
  }
}
</script>

<style scoped>
.button-section-selected{
  background-color: #B8D6AA;
}
.button-section{
  width: 140px;
  height: 55px;
  border-radius: 5px;
  display: flex;
  cursor: pointer;
}
.button-section span{
  margin: auto;
  font-size: 1.1rem;
}
</style>
