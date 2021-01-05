<template>
  <div class="mcontainer" >
      <svg height="40px" width="160px" class="border-effect" viewBox="0 0 180 60"  preserveAspectRatio="none">
        <polyline points="90,59 1,59 1,1 90,1" stroke="#666" stroke-width="2" fill="none" stroke-dasharray="35 480"/>
        <polyline points="90,59 179,59 179,1 90,1" stroke="#666" stroke-width="2" fill="none" stroke-dasharray="35 480"/>
      </svg>
      <span class="content-text">{{ content }}</span>
  </div>
</template>

<script>
export default {
  props: {
    content: String,
    height: String,
    width: String
  }
}
</script>

<style scoped>
.mcontainer{
  cursor: pointer;
  position: relative;
  height: 40px;
  width: 160px;
  margin: 0 20px 0 20px;
  padding: 0;
  display:flex;
  justify-content: center;
  justify-items: center;
  text-align: center;
  align-items: center;
}
.mbtn{
  cursor: pointer;
  cursor: pointer;
  background: transparent;
  border: none;
  display: flex;
  justify-content: center;
}
.border-effect{
  position: absolute;
  top: 0;
  left: 0;
}
.border-effect polyline{
  transition: 0.6s ease-in-out;
}
.border-effect:hover polyline{
  transition: 0.8s ease-in-out;
  stroke-dasharray: 480 0;
  border: none;
}
.background-effect{
  animation-duration: 0.4s;
  animation-name: fade-in-out;
}

@keyframes fade-in-out {
  from {
    background: white;
  }
  50% {
    background: #B8D6AA55;
  }
  to {
    background: white;
  }
}

</style>
