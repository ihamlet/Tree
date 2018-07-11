<template>
    <div class="user-form">
        <div class="layer">
            <h2 class="title">注册</h2>
            <p class="slogan">请填写表单完善以下信息</p>
        </div>
        <van-cell-group class="list-form">
            <van-field label="手机号" required v-model="treeData[0].phone" :error-message="errorMsg.errorPhone" placeholder="请输入手机号" @click-icon="$toast('手机号会作为登陆账号')" icon="question" />
             <van-field v-model="PassWord" type="password" label="密码" :error-message="errorMsg.errorPassWord" placeholder="请输入密码" required/>
        </van-cell-group>
        </van-cell-group>

        <div class="btn-column">
            <van-button size="large" :loading='state.loading' @click="NextStep">注册,下一步</van-button>
        </div>

        <van-popup v-model="$store.state.showUserForm" position="right" :close-on-click-overlay='false' :overlay-style='PageStyle' class="page">
            <div class="layer">
                <h2 class="title">开始</h2>
                <p class="slogan">请填写表单完善以下信息</p>
            </div>
            
            <van-cell-group class="list-form">
                <van-field label="您的姓名" required v-model="treeData[0].name" placeholder="请输入姓名" :error-message="errorMsg.errorUserName" />
                <van-field label="出生年月" v-model="treeData[0].birthday" @focus="openDate" :readonly='true' placeholder="请选择日期" />
                <van-field label="所在地区" v-model="treeData[0].area" @focus="openArea" :readonly='true' placeholder="请选择地区" />
            </van-cell-group>

            <van-radio-group v-model="radio">
                <p class="illustrate">请选择性别</p>
                <van-cell-group>
                    <van-cell title="男" clickable @click="radio = '1'">
                        <van-radio name="1" />
                    </van-cell>
                    <van-cell title="女" clickable @click="radio = '2'">
                        <van-radio name="2" />
                    </van-cell>
            </van-cell-group>
        </van-radio-group>


        <van-popup v-model="state.showDate" position="bottom">
            <van-datetime-picker v-model="currentDate" type="date" @cancel='cancelDate' @confirm='confirmDate' :visible-item-count='8' :min-date="DateValue.minDate" />
        </van-popup>

        <van-popup v-model="state.showArea" position="bottom">
            <van-area :area-list="areaList" @cancel='cancelArea' @confirm='confirmArea' :visible-item-count='7' @change="onChange" />
        </van-popup>


        <div class="btn-column">
                <van-button size="large" :loading='state.loading' @click="SubmitForm">完成</van-button>
            </div>
        </van-popup>

        <van-popup class="cue" v-model="state.showPopup" position="top" :overlay="false">
            {{msg.submitMsg}}
        </van-popup>
    </div>
</template>
<script>
import { OperationNumber, timetrans } from './lib/mixins.js'
import areaDate from './Data/area.js'
import { Popup, DatetimePicker, Area, CellGroup, Field, Toast, Cell, RadioGroup, Radio, Button } from 'vant';

var data = [{
    id: '',
    name: '',
    phone:'',
    sex:'',
    area:'',
    birthday:'',
    spouse: [],
    children:[],
}]

export default {
    name:'UserForm',
    components:{
        [Popup.name]:Popup,
        [DatetimePicker.name]:DatetimePicker,
        [Area.name]:Area,
        [CellGroup.name]:CellGroup,
        [Toast.name]:Toast,
        [Field.name]:Field,
        [Cell.name]:Cell,
        [RadioGroup.name]:RadioGroup,
        [Radio.name]:Radio,
        [Button.name]:Button
    },
    data(){
        return {
            state:{
                showDate: false,
                showArea: false,
                showPopup: false,
                showKeyboard:true,
                loading: false,
            },
            areaList: areaDate,
            radio: '1',
            currentDate:'',
            errorMsg:{
                errorUserName:'',
                errorPassWord:'',
                errorPhone:'',
                errorCode: ''
            },
            validate:{
                validatePassWord:false,
                validatePhone:false,
            }, 
            msg:{
                submitMsg:''
            },
            PageStyle:{
                background: '#fff'
            },
            DateValue:{
                minDate:new Date('1900','0','1')
            },
            PassWord:'',
            treeData: data
        }
    },
    watch:{
        currentDate(){
            this.treeData[0].birthday = timetrans(this.currentDate.valueOf())
        },
        radio(msg){
           if(msg == 1){
               this.treeData[0].sex = 'man'
           }
           if(msg == 2){
               this.treeData[0].sex = 'woman'
           }
        }
    },
    created(){
        this.treeData[0].sex = 'man'
        this.treeData[0].id = OperationNumber(8)
    },
    methods:{
        openDate(){
            this.state.showDate = true
        },
        cancelDate(){
            this.state.showDate = false,
            this.treeData.birthday = ''
        },
        confirmDate(){
            this.state.showDate = false
        },
        onChange( picker, value, index ){
            this.treeData[0].area = value[0].name + value[1].name + value[2].name
        },
        openArea(){
            this.state.showArea = true
        },
        cancelArea(){
            this.state.showArea = false,
            this.treeData.area = ''
        },
        confirmArea(){
            this.state.showArea = false
        },
        NextStep(){
            var regPhone = /^1[34578]\d{9}$/

            if(this.treeData[0].phone.length == 0){
                this.errorMsg.errorPhone = '请输入手机号'
                this.validate.validatePhone = false
                setTimeout(()=>{
                        this.errorMsg.errorPhone  = ''
                },2000)
            } else{
                if(!regPhone.test(this.treeData[0].phone)) {
                    this.errorMsg.errorPhone = '请输入正确的手机号'
                    this.validate.validatePhone = false
                    setTimeout(()=>{
                        this.errorMsg.errorPhone  = ''
                    },2000)
                }else{
                    this.validate.validatePhone = true
                }
            }

            if( this.PassWord.length < 6 ){
                this.validate.validatePassWord = false
                this.errorMsg.errorPassWord = '请输入至少6位数密码'
                setTimeout(()=>{
                        this.errorMsg.errorPassWord  = ''
                },2000)
            }else{
                this.validate.validatePassWord = true
            }

            if(this.validate.validatePhone && this.validate.validatePassWord){
                var UserReg = {
                    username: this.treeData[0].phone,
                    password: this.PassWord
                }

                this.$store.commit('getUserReg',UserReg)
                this.$store.dispatch('reg')
                this.state.loading = true

                setTimeout(()=>{
                    if(this.$store.state.Code.err_code == 1007){
                        this.state.showPopup = true
                        this.msg.submitMsg = '该账户已被注册'
                    }
                },1000)

                setTimeout(()=>{
                    if(this.$store.state.Code.err_code == 1007){
                        this.$router.replace({ name: 'login'})
                    }
                    if(this.$store.state.Code.err_code == 0){
                        this.$store.commit('showUserForm',true)
                    }
                    this.state.loading = false
                    this.state.showPopup = false
                },3400)
            }
        },
        onInput(key) {
            this.PassWord = (this.PassWord + key).slice(0, 6)
        },
        onDelete() {
            this.PassWord = this.PassWord.slice(0, this.PassWord.length - 1)
        },
        SubmitForm(){
            var regUserName = /^[\u4E00-\u9FA5]{2,4}$/

            if(this.treeData[0].name.length == 0){
                this.errorMsg.errorUserName = '请输入姓名'
                this.validate.validatePhone = false
                setTimeout(()=>{
                    this.errorMsg.errorUserName = ''
                },2000)
            } else{
                if(!regUserName.test(this.treeData[0].name)) {
                    this.errorMsg.errorUserName = '请输入正确的姓名'
                    this.validate.validateUserName = false
                    setTimeout(()=>{
                        this.errorMsg.errorUserName = ''
                    },2000)
                }else{
                    this.validate.validateUserName = true
                    this.$store.commit('getTreeArray',this.treeData)
                    this.$store.commit('isLogin')
                    this.$router.replace({ name: 'tree'})
                }
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

.illustrate {
    font-size: 13px;
    color: #999;
    padding-left: 10px;
}

.password-form {
    width: 100%;
    height: 100%;
}

.van-password-input {
    padding: 100px 20px;
}

.page {
    width: 100%;
    height: 100%;
}
</style>
