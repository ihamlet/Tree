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

        <ul class="item" v-if='model.children' v-for='(cel,i) in model.children'>
            <tree-menu class="children" :model='cel'></tree-menu>
            <div class="addKind">
                <span class="add-kind-left" @click="addKindLeft(i)">+</span>
                <span class="add-kind-right" @click="addKindRight(i)">+</span>
            </div>
        </ul>
    </li>    
</template>
<script>
export default {
    name: 'treeMenu',
    props:['model'],
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
            this.$set(this.model,'children',this.child)
            console.log(this.isFolder)
        },
        addKindLeft(i){
            this.model.children.splice(i,0,{name:"儿子"})
        },
        addKindRight(i){
            this.model.children.splice(i+1,0,{name:"女儿"})
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
    position: relative;
}

.list{
    text-align: center;
}

.tree-info{
    position: relative;
    width: 100px;
    margin: 0 auto;
}

.add,.addKind{
    width: 100px;
}

.list.children .add{
    display: none;
}

.add-left,.add-right,.add-kind-left,.add-kind-right{
    position: absolute;
    top: 0;
}

.addParent{
    position: absolute;
    top:-15px;
    left: 50%;
}

.add-left,.add-kind-left{
    left: 0;
}

.add-right,.add-kind-right{
    right: 0;
}

</style>

