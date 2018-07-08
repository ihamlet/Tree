<template>
  <div id="app">
        <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.layer {
    margin: 40px 0;
}

.title {
    text-align: center;
}

input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px white inset;
}

.slogan {
    font-size: 14px;
    text-align: center;
    color: #666;
}

.btn-column {
    padding: 40px 20px;
}

.router-link{
    margin-top: 10px;
}

.router-link a{
    font-size: 15px;
    color: #0c64ff;
}

.left{
    float: left;
}

.right{
    float: right;
}
</style>
