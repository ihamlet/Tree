<template>
    <div class="wrap">
        <div class="addRoot" @click="addRoot">+</div>
        <div class="tree">
            <ul class="item" v-for='(item,i) in TreeData'>
                <TreeList :model='item' @AddLeftChange='addLeft(i)' @AddRightChange='addRight(i)'/>
            </ul>
        </div>
    </div>
</template>

<script>
import TreeList from './tree-list'

export default {
    name:'Tree',
    data(){
        return {
            TreeData:''
        }
    },
    components:{
        TreeList
    },
    beforeRouteEnter  (to, from, next){
        next(vm => {
            if(vm.$store.state.TreeArray.length == 0){
                next({name: 'reg', replace: true})
                vm.$store.commit('showUserForm',true)
            }else{
                vm.TreeData = vm.$store.state.TreeArray
                if(vm.TreeData[0].phone.length == 0){
                    vm.TreeData[0].phone = vm.$store.state.UserReg.username
                }
                next()
            }
        })
    },
    methods:{
        addLeft(i){
            this.TreeData.splice(i,0,{name:"添加兄弟"})
        },
        addRight(i){
            this.TreeData.splice(i+1,0,{name:"添加姐妹"})
        },
        addRoot(){
            this.TreeData = [{name:'父母',children:this.TreeData}]
        }
    }
}
</script>
<style scoped>
.wrap{
    overflow: scroll;
    height: 100%;
    float: left;
}

.tree{
    display: flex;
    white-space: nowrap;
    justify-content:center;
    vertical-align: top;
    padding: 10px;
}
</style>

