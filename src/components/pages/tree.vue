<template>
    <div class="tree">
        内容内容
    </div>
</template>
<script>
export default {
    name:'Tree',
    data(){
        return{
            TreeData:''
        }
    },
    created(){
        console.log(this.$store.state.TreeArray)
        this.TreeData = this.$store.state.TreeArray
    }
}
</script>
<style scoped>

</style>
