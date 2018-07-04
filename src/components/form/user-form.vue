<template>
    <div class="user-form">
        <van-popup v-model="show">内容</van-popup>
    </div>
</template>
<script>
import { Popup } from 'vant'

export default {
    name:'UserForm',
    data(){
        return {
            show: false,
            treeData:''
        }
    },
    created(){
        this.treeData = this.$store.state.TreeArray
    }    
}
</script>
<style scoped>

</style>
