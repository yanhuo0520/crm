<template>
  <div class="chaiAdd">
    <van-nav-bar :left-text="leftText" left-arrow fixed @click-left="leftBack" @click-right="clickRight()" />
    <div class="marBottom">
      <van-field placeholder="请输入行程" label="行程" :left-icon="require('../../images/xingcheng.png')" input-align="right"
        v-model="xingcheng" @input="blurInput(xingcheng, '行程')" />
      <van-field placeholder="请输入车费" type="number" label="车费" :left-icon="require('../../images/chefei.png')"
        input-align="right" v-model="chefei" @input="blurInput(chefei, '车费')" />
      <van-field placeholder="请输入住宿" type="number" label="住宿" :left-icon="require('../../images/zhusu.png')"
        input-align="right" v-model="zhusu" @input="blurInput(zhusu, '住宿')" />
      <van-field placeholder="请输入油费" type="number" label="油费" :left-icon="require('../../images/youfei.png')"
        input-align="right" v-model="youfei" @input="blurInput(youfei, '油费')" />

    </div>

    <div class="marBottom">
      <van-cell center title="是否有招待">
        <template #right-icon>
          <van-switch v-model="ifZhaoDai" size="24" @change="changeZhaodai()" />
        </template>
      </van-cell>
      <template v-if="ifZhaoDai">
        <van-field placeholder="请输入招待费用" type="number" label="招待费用" :left-icon="require('../../images/zhaodai.png')"
          input-align="right" v-model="zhaodaiNum" @input="blurInput(zhaodaiNum, '招待')" />
        <van-cell title="招待说明">
          <template #icon>
            <img src="../../images/rizhi.png" alt="" />
          </template>
        </van-cell>
        <van-field rows="3" type="textarea" maxlength="1000" placeholder="请输入招待说明（原因、招待人数、公司参与人员名单）  其他费用说明（费用发生原因及明细）"
          show-word-limit v-model="zhaodaiCont" />
      </template>

    </div>

    <div class="marBottom">
      <van-cell center title="是否有其他费用">
        <template #right-icon>
          <van-switch v-model="ifOther" size="24"  @change="changeOther()" />
        </template>
      </van-cell>
      <template v-if="ifOther">
        <van-field placeholder="请输入其他费用" type="number" label="其他" :left-icon="require('../../images/qita.png')"
          input-align="right" v-model="qitaNum" @input="blurInput(qitaNum, '其他')" />
        <van-cell title="其他费用说明">
          <template #icon>
            <img src="../../images/rizhi.png" alt="" />
          </template>
        </van-cell>
        <van-field rows="2" type="textarea" maxlength="1000" placeholder="请输入其他费用说明" show-word-limit
          v-model="qitaCont" />
        <van-cell title="请上传其他费用图片">
          <template #icon>
            <img src="../../images/pic.png" alt="" />
          </template>
        </van-cell>
        <van-uploader v-model="fileListOn" :max-count="3" :after-read="afterRead" :before-delete="beforeDelete" />
      </template>

    </div>


    <div class="footer" v-if="hidshowFooter">
      <div @click="clickRight">
        <img src="../../images/lylist.png" alt /> 列表
      </div>
      <button class="save" @click="save">提交</button>
    </div>


  </div>
</template>
<script>
  import Exif from "exif-js";
  export default {
    name: "chaiAdd",
    data() {
      return {
        role: localStorage.getItem("role"), // 1为员工，2管理员
        userId: localStorage.getItem("userId"),
        leftText: '添加今日差旅费用',
        date: '',
        chai_id: '',
        xingcheng: '',
        chefei: '',
        zhusu: '',
        youfei: '',

        ifZhaoDai: false,
        zhaodaiNum: '',
        zhaodaiCont: '',

        ifOther: false,
        qitaNum: '',
        qitaCont: '',

        fileListOn: [],
        picsOn: "",
        picsOnArray: [],
        filesObj: {
          name: "",
          type: "",
          index: ''
        },
        headerImage: "",
        picValue: "",
        upImgUrl: "",

        docmHeight: document.documentElement.clientHeight, //默认屏幕高度
        showHeight: "0", //实时屏幕高度
        hidshowFooter: true, //显示或者隐藏footer,
      };
    },
    mounted() {
      window.leftBack = this.leftBack; // Android原生返回按钮执行leftBack()方法
      window.onresize = () => {
        // 实时屏幕高度
        this.showHeight = document.body.clientHeight;
      };
      document.documentElement.scrollTop = 0;
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0,
      });
      // 编辑--列表过来
      let travel_id = this.$route.query.travel_id
      if (travel_id) {
        this.$api.travelExpenseDetail({
          'travel_id': travel_id
        }).then(res => {
          this.$toast.clear()
          if (res.errno === 0) {
            this.chai_id = res.data.travel_id
            this.leftText = "编辑" + res.data.date + "差旅费用"
            this.date = res.data.date
            this.xingcheng = res.data.travel
            this.chefei = res.data.car
            this.zhusu = res.data.hotel
            this.youfei = res.data.oil

            if (res.data.entertain_expenses > 0) {
              this.ifZhaoDai = true
              this.zhaodaiNum = res.data.entertain_expenses
              this.zhaodaiCont = res.data.entertain_note
            }

            if (res.data.other_expenses > 0) {
              this.ifOther = true
              this.qitaNum = res.data.other_expenses
              this.qitaCont = res.data.other_note
            }


            this.picsOn = res.data.other_pic;
            if (this.picsOn) {
              var pics = this.picsOn;
              pics = pics.split("#");
              var r = pics.filter(function(s) {
                return s && s.trim(); // 注：IE9(不包含IE9)以下的版本没有trim()方法
              });
              this.picsOnArray = r;
              r = r.map(item => ({
                url: item
              }));
              this.fileListOn = JSON.parse(JSON.stringify(r));
            } else {
              this.picsOn = "";
              this.picsOnArray = [];
              this.fileListOn = [];
            }
          } else {
            // this.$toast(res.errmsg);
          }
        }).catch(err => {
          this.$toast.clear()
        });
      } else {
        // 判断是否已经上传过
        this.$api.travelExpenseSearch().then(res => {
          this.$toast.clear()
          if (res.errno === 0) {
            this.chai_id = res.data.travel_id
            this.date = res.data.date
            this.leftText = "编辑今日差旅费用"
            this.xingcheng = res.data.travel
            this.chefei = res.data.car
            this.zhusu = res.data.hotel
            this.youfei = res.data.oil

            if (res.data.entertain_expenses > 0) {
              this.ifZhaoDai = true
              this.zhaodaiNum = res.data.entertain_expenses
              this.zhaodaiCont = res.data.entertain_note
            }

            if (res.data.other_expenses > 0) {
              this.ifOther = true
              this.qitaNum = res.data.other_expenses
              this.qitaCont = res.data.other_note
            }


            this.picsOn = res.data.other_pic;
            if (this.picsOn) {
              var pics = this.picsOn;
              pics = pics.split("#");
              var r = pics.filter(function(s) {
                return s && s.trim(); // 注：IE9(不包含IE9)以下的版本没有trim()方法
              });
              this.picsOnArray = r;
              r = r.map(item => ({
                url: item
              }));
              this.fileListOn = JSON.parse(JSON.stringify(r));
            } else {
              this.picsOn = "";
              this.picsOnArray = [];
              this.fileListOn = [];
            }
          } else {
            // this.$toast(res.errmsg);
          }
        }).catch(err => {
          this.$toast.clear()
        });
      }

      let d = new Date();
      let datetime = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      this.date = datetime
      // Date.parse(new Date())



    },
    methods: {
      leftBack() {
        this.$router.go(-1)
      },
      clickRight() {
        if (this.role == 1) {
          this.$router.push('/chaiList')
        } else { // 管理员2   区域管理员3
          this.$router.push('/chaiListAdmin')
        }
      },
      // 验证输入数字不能为负数
      blurInput(num, tip) {
        if (num < 0) {
          this.$toast(tip + "不能小于0")
        }
      },
      changeZhaodai(){
        if(this.ifZhaoDai == false){
          this.zhaodaiNum = ''
          this.zhaodaiCont = ''
        }
      },
      changeOther(){
        if(this.ifOther == false){
          this.qitaNum = ''
          this.qitaCont = ''
          this.picsOn = "";
          this.picsOnArray = [];
          this.fileListOn = [];
        }
      },
      // 处理图片在手机端拍照会自动旋转问题
      afterRead(file, detail) {
        let that = this;
        that.filesObj.name = file.file.name; // 获取文件名
        that.filesObj.type = file.file.type; // 获取类型
        that.filesObj.content = file.content;
        that.filesObj.index = detail.index
        that.fileListOn[that.filesObj.index].content = ''
        that.fileListOn[that.filesObj.index].status = 'uploading'
        that.fileListOn[that.filesObj.index].message = '上传中...'
        that.picValue = file.file; // 文件流
        that.imgPreview(this.picValue, 1);

      },
      // 处理图片
      imgPreview(file, num) {
        let that = this;
        let Orientation;
        //去获取拍照时的信息，解决拍出来的照片旋转问题
        Exif.getData(file, function() {
          Orientation = Exif.getTag(this, "Orientation");
        });
        // 看支持不支持FileReader
        if (!file || !window.FileReader) return;
        if (/^image/.test(file.type)) {
          let reader = new FileReader(); // 创建一个reader
          reader.readAsDataURL(file); // 将图片2将转成 base64 格式
          reader.onloadend = function() {
            // 读取成功后的回调
            // console.log(this.result)
            let result = this.result;
            let img = new Image();
            img.src = result;
            //判断图片是否大于500K,是就直接上传，反之压缩图片
            if (this.result.length <= 500 * 1024) {
              that.headerImage = this.result;
              that.postImg(num);
            } else {
              img.onload = function() {
                let data = that.compress(img, Orientation);
                that.headerImage = data;
                that.postImg(num);
              };
            }
          };
        }
      },
      // 压缩图片
      compress(img, Orientation) {
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");

        let tCanvas = document.createElement("canvas");
        let tctx = tCanvas.getContext("2d");

        let width = img.width;
        let height = img.height;
        //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
        let ratio;
        if ((ratio = (width * height) / 4000000) > 1) {
          // console.log("大于400万像素");
          ratio = Math.sqrt(ratio);
          width /= ratio;
          height /= ratio;
        } else {
          ratio = 1;
        }
        canvas.width = width;
        canvas.height = height; //        铺底色
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height); //如果图片像素大于100万则使用瓦片绘制
        let count;
        if ((count = (width * height) / 1000000) > 1) {
          // console.log("超过100W像素");
          count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片 //            计算每块瓦片的宽和高
          let nw = ~~(width / count);
          let nh = ~~(height / count);
          tCanvas.width = nw;
          tCanvas.height = nh;
          for (let i = 0; i < count; i++) {
            for (let j = 0; j < count; j++) {
              tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
              ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
            }
          }
        } else {
          ctx.drawImage(img, 0, 0, width, height);
        }
        //修复ios上传图片的时候 被旋转的问题
        if (Orientation != "" && Orientation != 1) {
          switch (Orientation) {
            case 6: //需要顺时针（向左）90度旋转
              this.rotateImg(img, "left", canvas);
              break;
            case 8: //需要逆时针（向右）90度旋转
              this.rotateImg(img, "right", canvas);
              break;
            case 3: //需要180度旋转
              this.rotateImg(img, "right", canvas); //转两次
              this.rotateImg(img, "right", canvas);
              break;
          }
        }
        //进行最小压缩
        let ndata = canvas.toDataURL("image/jpeg", 0.1);
        tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
        return ndata;
      },
      // 旋转图片
      rotateImg(img, direction, canvas) {
        //最小与最大旋转方向，图片旋转4次后回到原方向
        const min_step = 0;
        const max_step = 3;
        if (img == null) return;
        //img的高度和宽度不能在img元素隐藏后获取，否则会出错
        let height = img.height;
        let width = img.width;
        let step = 2;
        if (step == null) {
          step = min_step;
        }
        if (direction == "right") {
          step++;
          //旋转到原位置，即超过最大值
          step > max_step && (step = min_step);
        } else {
          step--;
          step < min_step && (step = max_step);
        }
        //旋转角度以弧度值为参数
        let degree = (step * 90 * Math.PI) / 180;
        let ctx = canvas.getContext("2d");
        switch (step) {
          case 0:
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0);
            break;
          case 1:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, 0, -height);
            break;
          case 2:
            canvas.width = width;
            canvas.height = height;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, -height);
            break;
          case 3:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, 0);
            break;
        }
      },
      //将base64转换为文件
      dataURLtoFile(dataurl) {
        var arr = dataurl.split(","),
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], this.filesObj.name, {
          type: this.filesObj.type
        });
      },
      //接口上传图片
      postImg(num) {
        let file = this.dataURLtoFile(this.headerImage);
        let token = localStorage.getItem("token");
        var formdata = new FormData();
        formdata.append("token", token);
        formdata.append("file", file)
        const instance = this.$axios.create({
          //withCredentials:true
        });
        instance.post("http://crm.xfd365.com/user/base/uploadImg", formdata).then(res => {
          if (res.data.errno === 0) {
            this.$toast("上传成功");
            this.fileListOn[this.filesObj.index].content = res.data.data.url
            this.fileListOn[this.filesObj.index].status = 'done'
            this.fileListOn[this.filesObj.index].message = ''
            this.picsOnArray.push(res.data.data.url);

          } else {
            this.$toast(res.errmsg);
            this.fileListOn[this.filesObj.index].status = 'failed'
            this.fileListOn[this.filesObj.index].message = '上传失败'
          }
        }, err => {
          // console.log(err)
          this.fileListOn[this.filesObj.index].status = 'failed'
          this.fileListOn[this.filesObj.index].message = '上传失败'

        });

      },
      beforeDelete(file, detail) {
        let index = detail.index
        this.fileListOn.splice(index, 1);
        this.picsOnArray.splice(index, 1);
      },
      save() {
        this.picsOn = "";
        if (this.picsOnArray != "") {
          this.picsOnArray.forEach(ele => {
            this.picsOn += ele + "#";
          });
        }
        var data = {};
        data.travel = this.xingcheng;
        data.car = this.chefei;
        data.hotel = this.zhusu;
        data.oil = this.youfei;

        data.entertain_expenses = this.zhaodaiNum;
        data.entertain_note = this.zhaodaiCont;

        data.other_expenses = this.qitaNum;
        data.other_note = this.qitaCont;
        data.other_pic = this.picsOn;
        data.user_id = this.userId;
        data.date = this.date;
        data.travel_id = this.chai_id;

        this.$toast.loading({
          message: '提交中...',
          forbidClick: true,
          duration: 0,
        });
        this.$api.travelExpenseAdd(data).then(res => {
          this.$toast.clear()
          if (res.errno === 0) {
            this.chai_id = res.travel_id // 第一次新增时要赋值
            this.$toast("提交成功");
            this.leftBack();
          } else {
            this.$toast(res.errmsg);
          }
        });
      },
    },
    watch: {
      showHeight: function() {
        if (this.docmHeight > this.showHeight) {
          this.hidshowFooter = false;
        } else {
          this.hidshowFooter = true;
        }
      }
    }
  };
</script>
<style lang="less">
  .chaiAdd {
    min-height: calc(100% - 100px);
    padding-top: 50px;
    padding-bottom: 50px;
    background: #f5f5f5;

    .van-nav-bar {
      background: url(../../images/msgBg.jpg) no-repeat;
      width: 100%;
      height: 50px;
      line-height: 50px;
      background-size: 100% 50px;

      .van-nav-bar__text {
        color: #fff;
      }

      .van-icon {
        color: #fff;
      }
    }

    .van-cell {
      img {
        margin: 3px 2px 0 0;
        width: 16px;
        height: 16px;
      }
    }

    .marBottom {
      margin-bottom: 10px;
      background: #fff;
    }

    .van-uploader {
      padding: 10px 15px 0 15px;
    }

    .van-uploader__preview {
      margin-right: 15px;
      margin-bottom: 15px;
    }

    .footer {
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 50px;
      background: #ffffff;
      display: inline-flex;

      div {
        width: 80px;
        display: grid;
        text-align: center;

        img {
          width: 20px;
          margin: 5px 30px 0 30px;
        }
      }

      .save {
        width: calc(100% - 80px);
        display: block;
        border: none;
        background: #1c92ff;
        color: #fff;
        height: 36px;
        margin: 7px 10px;
        border-radius: 10px;
      }
    }
  }
</style>
