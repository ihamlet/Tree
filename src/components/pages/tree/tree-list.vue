<template>
    <li class="list">
        <div class="tree-info" :class="model.sex">
            <div class="avatar">
                <img src="./../../../assets/logo.png" alt="头像">
            </div>
            <div class="name">
                <div class="txt">{{model.name}}</div>
            </div>
            <div class="add">
                <div class="add-left" @click="addLeft">+</div>
                <div class="add-right" @click="addRihgt">+</div>
            </div>
            <div class="addChild" v-if='!isFolder' @click="addChild">+</div>
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
            this.model.children.splice(i,0,{name:"添加兄弟",sex:'man'})
        },
        addKindRight(i){
            this.model.children.splice(i+1,0,{name:"添加姐妹",sex:'woman'})
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
    margin: 0 10px;
}

.tree-info{
    position: relative;
    margin: 10px auto;
    width: 45px;
}

.name{
    white-space: initial;
}

.txt{
    width: 17px;
    margin: 0 auto;
    text-align: justify;
    padding: 10px 0;
}

.list.children .add{
    display: none;
}

.add-left,.add-right,.add-kind-left,.add-kind-right{
    position: absolute;
    top: 0;
}

.tree-info.man{
    background: #0c64ff;
    color: #fff;
}

.tree-info.woman{
    background: #42b983;
    color: #fff;
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

.tree-info.man .avatar{
    background: #0c64ff;
}

.avatar{
   width: 45px;
   height: 45px;
}

.avatar img{
    width: 100%;
}



</style>

