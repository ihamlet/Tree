<template>
    <li class="list">
            <div class="tree-info">
                <div class="name">{{model.name}}</div>
            </div>
            <ul class="item" v-if='model.childList' v-for='cel in model.childList'>
                <div class="addKind" @click="addKind">+</div>
                <tree-menu :model='cel'></tree-menu>
            </ul>
            <div class="addChild" @click="addChild">+</div>
    </li>    
</template>
<script>
export default {
    name: 'treeMenu',
    props:['model'],
    data(){
        return{
            child:[{
                name:'bbbb'
            }]
        }
    },
    methods:{
        addChild(){
            this.$set(this.model,'childList',this.child)
        },
        addKind(){
            this.child.push({name:'cccc'})
        }
    }
}
</script>
<style scoped>
.item{
    white-space: nowrap;
    display: inline-block;
    text-align: center;
    vertical-align: top;
}

.list{
    text-align: center;
}
</style>

