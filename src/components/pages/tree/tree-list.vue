<template>
    <li>
        <div>
            {{model.name}}
            <div class="add" @click="addChild">+</div>
            <ul v-if='model.childList'>
                <tree-menu v-for='cel in model.childList' :model='cel'></tree-menu>
            </ul>
        </div>
    </li>    
</template>
<script>
export default {
    name: 'treeMenu',
    props:['model'],
    data(){
        return{

        }
    },
    methods:{
        addChild(){
            this.$set(this.model,'childList',[{name:"bbbbb"}])
        }
    }
}
</script>
<style scoped>

</style>
