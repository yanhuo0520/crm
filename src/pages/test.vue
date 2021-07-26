<template>
    <div class="test" :style="{ height: docmHeight + 'px' }">
        <div class="main">
            <div class="container">
                <div class="inputs"><input type="text" placeholder="请输入益农联名卡卡号"> <input type="text" placeholder="请输入手机号" maxlength="11"> <input type="text" placeholder=""> <button>提交</button></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'test',
    data(){
        return {
            password: '',
            password2: '',

            docmHeight: document.documentElement.clientHeight,  //默认屏幕高度       
            // showHeight:  '0',   //实时屏幕高度    
            // hidshowFooter: true,    
            // bodyHeight: ''

        }
    },
    // mounted(){
    //     window.onresize = ()=>{   // 实时屏幕高度
    //         this.showHeight = document.body.clientHeight     
    //     }
    // },
//     watch:{
//         showHeight: function(){
//         if(this.docmHeight > this.showHeight){
//             this.hidshowFooter = false

//             this.bodyHeight = this.docmHeight
//             console.log(this.bodyHeight)
//         }else{
//             this.hidshowFooter = true
//         }
//         }
//   },
}
</script>
<style lang="less">
.test{
        position: relative;
        height: 100vh;
    background: linear-gradient(to right,#E8D09C, #E2BE76);
    .main{
        // background: url(../images/vip.png) no-repeat;
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    }
    .container {
    position: relative;
    overflow-y: auto;
    width: 100%;
    height: 100%;
}
    .inputs{
            width: 75%;
    position: absolute;
    left: 12%;
    top: 55%;
    }
}
</style>