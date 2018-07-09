<template>
    <div class="footer-tab">
        <router-link to='/tree'>tree</router-link>
        <router-link to='/list'>list</router-link>
        <router-link to='/my'>my</router-link>
    </div>    
</template>
<script>
export default {
    name:'FooterTab'
}
</script>
<style scoped>
.footer-tab{
    position: fixed;
    bottom: 0;
    left: 0;
    height: 46px;
    width: 100%;
    background: #fff;
    border-top: 1px solid #ededed;
}
</style>
