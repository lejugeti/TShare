<template>
  <div>
    <button :class="variant==='outline'? 'outline':'fill'" type="button">{{ content }}</button>
  </div>
</template>

<script>
export default {
  props: {
    content: String,
    variant: String
  }
}
</script>

<style scoped>
button{
  padding: 4px 8px 3px 8px;
  white-space: normal;
  border-radius: 4px;
  font-size: 0.9rem;
  outline: none;
  font-weight: bolder;
}
.outline{
  border: solid 1px #98B68A;
  background-color: transparent;
  color: #98B68A;
}
.outline:hover{
  background: #B8D6AA;
  border: solid 1px #B8D6AA;
  color: white;
}
.outline:active{
  background: #C9E7BB;
  border: solid 1px #C9E7BB;
}
.fill{
  background: #B8D6AA;
  border: solid 1px #B8D6AA;
  color: white;
}
.fill:hover{
  background: white;
  border: solid 1px white;
  color: #98B68A;
}
.fill:active{
  color: #C9E7BB;
}
</style>
