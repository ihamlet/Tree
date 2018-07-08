<template>
    <div class="tree">
        <div class="item" v-for='(item,i) in TreeData' :key='item.id'>
            <div class="item-info" :class="item.sex">
                {{item.name}}
                <span class="add-children" @click="addChildren(i)">+</span>
            </div>
            <div class="item-children" v-if='item.children'>
                <Tree :TreeData='item.children'></Tree>
            </div>
        </div>
        <div class="add-item" @click="addItem">+</div>
    </div>
</template>

<script>
export default {
    name:'Tree',
    props:['TreeData'],
    data(){
        return {

        }
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
        addChildren(i){
            console.log(i)
            this.$set(this.TreeData[i], 'children', [{name:'bbb'}])
        },
        addItem(){
            console.log(this.TreeData)
            this.TreeData.push({name:"aaa"})
        }
    }
}
</script>
<style scoped>

</style>
