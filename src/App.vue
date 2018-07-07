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

.slogan {
    font-size: 14px;
    text-align: center;
    color: #666;
}

.btn-column {
    padding: 40px 20px;
}
</style>
