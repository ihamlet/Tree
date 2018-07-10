<template>
    <li class="list">
        <div class="tree-info">
            <span class="name">{{model.name}}</span>
            <div class="add">
                <span class="add-left" @click="addLeft">+</span>
                <span class="add-right" @click="addRihgt">+</span>
            </div>
            <div class="addChild" @click="addChild">+</div>
        </div>

        <ul class="item" v-if='model.children' v-for='cel in model.children'>
            <tree-menu :model='cel'></tree-menu>
        </ul>
    </li>    
</template>
<script>
export default {
    name: 'treeMenu',
    props:['model','indexValue'],
    data(){
        return{
            child:[{
                name:'添加子女'
            }]
        }
    },  
    computed: {
        isFolder(){
            return this.model.children && this.model.children.length
        }
    },
    methods:{
        addLeft(){
            this.$emit('AddLeftChange')
        },
        addRihgt(){
            this.$emit('AddRightChange')
        },
        addChild(){
            this.model.children.push({name:"ccccc"})
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

