<template>
    <div class="login">
        <div class="layer">
            <h2 class="title">族谱</h2>
            <p class="slogan">族谱记录工具</p>
        </div>
        <van-cell-group>
            <van-field v-model="userDate.phone" label="手机号" placeholder="请输入手机号" :error-message="errorMsg.errorPhone" />
            <van-field v-model="userDate.password" type="password" label="密码" placeholder="请输入密码" :error-message="errorMsg.ErrorPassWord"/>
        </van-cell-group>

        <div class="btn-column">
            <van-button size="large" :loading='state.loading' type="primary" @click="Login">登陆</van-button>

            <div class="router-link">
                <router-link to='/' tag="a" class="left">忘记密码</router-link>
                <router-link to='/reg' tag="a" class="right">新用户注册</router-link>
            </div>
        </div>
       
        <van-popup class="cue" v-model="state.showPopup" position="top" :overlay="false">
            {{msg.submitMsg}}
        </van-popup>
    </div>
</template>
<script>
import { Popup, Cell, CellGroup, Field, Button } from 'vant'

export default {
    name:'Login',
    components:{
        [Popup.name]:Popup,
        [Cell.name]:Cell,
        [Button.name]:Button,
        [CellGroup.name]:CellGroup,
        [Field.name]:Field
    },
    data(){
        return{
            state:{
               loading:false,
               showPopup:false
            },
            validate:{
                validatePhone:false,
                validatePassWord:false
            },
            errorMsg:{
                errorPhone:'',
                ErrorPassWord:''
            },
            msg:{
                submitMsg:''
            },
            userDate:{
                phone:'',
                password:''
            }
        }
    },
    methods:{
        Login(){
            var regPhone = /^1[34578]\d{9}$/

            if(this.userDate.phone.length == 0){
                this.errorMsg.errorPhone = '请输入手机号'
                this.validate.validatePhone = false
            }else{
                if(!regPhone.test(this.userDate.phone)) {
                    this.errorMsg.errorPhone = '请输入正确手机号'
                    this.validate.validatePhone = false
                    setTimeout(()=>{
                        this.errorMsg.errorPhone = ''
                        this.userDate.phone = ''
                    },2000)
                }else{
                    this.validate.validatePhone = true
                }
            }

            if(this.userDate.password.length < 6){
                this.errorMsg.ErrorPassWord = '请输入至少6位数密码'
                this.validate.validatePassWord = false
            }else{
                this.validate.validatePassWord = true
            }

            if(this.validate.validatePhone && this.validate.validatePassWord){

                var UserReg = {
                    username: this.userDate.phone,
                    password: this.userDate.password
                }

                this.$store.commit('getUserReg',UserReg)
                this.$store.dispatch('login')


                this.state.loading = true

    
                console.log(this.$store.state.Code)
                setTimeout(()=>{
                    if(this.$store.state.Code.err_code == 1004){
                        this.errorMsg.ErrorPassWord = '密码错误请重新输入'
                        this.userDate.password = ''
                    }
                    
                    if(this.$store.state.Code.err_code  == 1010){
                        this.state.showPopup = true
                        this.msg.submitMsg = '该用户还未注册'
                    }
                },1000)
                
                setTimeout(()=>{
                    if(this.$store.state.Code.err_code  == 1010){
                        this.$router.replace({ name: 'reg'})
                    }
                    if(this.$store.state.Code.err_code == 0){
                        this.$store.commit('isLogin')
                        this.$router.replace({ name: 'tree'})
                    }
                    this.state.showPopup = false
                    this.state.loading = false
                },3400)

            }
        }
    }
}
</script>

<style scoped>

.cue {
    width: 100%;
    height: 46px;
    text-align: center;
    line-height: 46px;
    background-color: #f44;
    color: #fff;
}
</style>
