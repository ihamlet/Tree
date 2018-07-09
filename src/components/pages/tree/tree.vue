<template>
    <div class="tree">
        <ul class="item" v-for='item in TreeData'>
            <TreeList :model='item'/>
        </ul>
        <div class="add" @click="add">+</div>
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
        add(){
            this.TreeData.push({name:"aaaa"})
        }
    }
}
</script>
<style scoped>

</style>
