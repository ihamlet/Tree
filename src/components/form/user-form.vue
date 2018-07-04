<template>
    <div class="user-form">
        <div class="layer">
            <h2 class="title">开始</h2>
            <p class="slogan">族谱记录工具</p>
        </div>
        <van-cell-group class="list-form">
            <van-field label="姓名" required v-model="treeData.name" placeholder="请输入姓名" :error-message="errorMsg.errorUserName"/>
            <van-field label="出生年月" v-model="treeData.birthday" @focus="openDate" placeholder="请选择日期"/>
            <van-field label="手机号" required v-model="treeData.phone" :error-message="errorMsg.errorPhone" placeholder="请输入手机号" @click-icon="$toast('会作为登陆账号')" icon="question"/>
            <van-field label="地区" v-model="treeData.area" @focus="openArea" placeholder="请选择地区"/>
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
           <van-datetime-picker v-model="currentDate" type="date" @cancel='cancelDate' @confirm='confirmDate' :min-date="DateValue.minDate"/>
        </van-popup>

        <van-popup v-model="state.showArea" position="bottom">
           <van-area :area-list="areaList" @cancel='cancelArea' @confirm='confirmArea' @change="onChange"/>
        </van-popup>

        <van-popup class="cue" v-model="state.showPopup" position="top" :overlay="false">
            {{msg.submitMsg}}
        </van-popup>

        <div class="btn-column">
            <van-button size="large" :loading='state.loading' @click="SubmitForm">下一步</van-button>
        </div>
    </div>
</template>
<script>
import { OperationNumber, timetrans } from '../mixins.js'
import areaDate from '../Data/area.js'
import { Popup, DatetimePicker, Area, CellGroup, Field, Toast, Cell, RadioGroup, Radio, Button } from 'vant';

var data = {
  id: '',
  name: '',
  phone:'',
  sex:'',
  area:'',
  birthday:'',
  spouse: []
}

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
                loading: false,
            },
            areaList: areaDate,
            radio: '1',
            currentDate:'',
            errorMsg:{
                errorUserName:'',
                errorPhone:''
            },
            msg:{
                submitMsg:''
            },
            DateValue:{
                minDate:new Date('1900','0','1')
            },
            treeData: data
        }
    },
    watch:{
        currentDate(){
            this.treeData.birthday = timetrans(this.currentDate.valueOf())
        },
        radio(msg){
           if(msg == 1){
               this.treeData.sex = 'man'
           }
           if(msg == 2){
               this.treeData.sex = 'woman'
           }
        }
    },
    created(){
        this.treeData.sex = 'man'
        this.treeData.id = OperationNumber(11)
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
            this.treeData.area = value[0].name + value[1].name + value[2].name
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
        SubmitForm(){
            var regUserName = /^[\u4E00-\u9FA5]{2,4}$/
            var regPhone = /^1[34578]\d{9}$/

            if(this.treeData.name.length == 0){
                this.errorMsg.errorUserName = '请输入姓名'
                setTimeout(()=>{
                    this.errorMsg.errorUserName = ''
                },2000)
            } else{
                if(!regUserName.test(this.treeData.name)) {
                    this.errorMsg.errorUserName = '请输入正确的姓名'
                    setTimeout(()=>{
                        this.errorMsg.errorUserName = ''
                    },2000)
                }
            }

            if(this.treeData.phone.length == 0){
                this.errorMsg.errorPhone = '请输入手机号'
                setTimeout(()=>{
                        this.errorMsg.errorPhone  = ''
                },2000)
            } else{
                if(!regPhone.test(this.treeData.phone)) {
                    this.errorMsg.errorPhone = '请输入正确的手机号'
                    setTimeout(()=>{
                        this.errorMsg.errorPhone  = ''
                    },2000)
                }
            }

            if(this.treeData.phone.length > 0 && this.treeData.name.length> 0){
                console.log('在此处push数据到服务器')
                this.state.loading = true
                this.state.showPopup = true
                this.msg.submitMsg = '提交成功'
                setTimeout(()=>{
                    this.state.loading = false
                    this.state.showPopup = false
                },2000)
            }else{
                this.state.showPopup = true
                this.msg.submitMsg = '请输入姓名和手机号后轻触下一步按钮'
                setTimeout(()=>{
                    this.state.showPopup = false
                },2000)
            }
        }
    }
}
</script>
<style scoped>
.layer{
    margin-top: 60px;
    margin-bottom: 60px;
}

.title{
    text-align: center;
}

.slogan{
    font-size: 14px;
    text-align: center;
    color: #666;
}

.illustrate{
    font-size: 13px;
    color: #999;
    padding-left: 10px;
}

.btn-column{
    padding: 20px;
}

.cue{
  width: 100%;
  height: 46px;
  text-align: center;
  line-height: 46px;
  background: #f44;
  color: #fff;
}
</style>
