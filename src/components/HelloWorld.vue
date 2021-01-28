<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <mt-swipe :show-indicators="false" class="mtswipe">
      <mt-swipe-item>1</mt-swipe-item>
      <mt-swipe-item>2</mt-swipe-item>
      <mt-swipe-item>3</mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  watch: {
    "$route"(){
        if (/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)) {
          location.href = 'localhost:8081/mob/#' + this.$route.path
        }
    },
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.mtswipe{
  width: 100%;
  height: 200px;
  background: red;
}
</style>
