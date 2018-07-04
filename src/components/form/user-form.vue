<template>
    <div class="user-form">
        <h2 class="title">开始</h2>
        <van-cell-group>
            <van-field label="姓名" v-model="treeData.name" placeholder="请输入姓名" />
        </van-cell-group>
    </div>
</template>
<script>
import { CellGroup, Field } from 'vant';

var data = {
  id: '',
  name: '',
  spouse: [],
  children: []
}

export default {
    name:'UserForm',
    components:{
        [CellGroup.name]:CellGroup,
        [Field.name]:Field
    },
    data(){
        return {
            show: false,
            treeData: data
        }
    },
    created(){
        
    }    
}
</script>
<style scoped>
.title{
    text-align: center;
}
</style>
