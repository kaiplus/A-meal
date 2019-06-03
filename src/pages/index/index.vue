<template>
  <!-- <div @click="clickHandle">

    <div class="userinfo" @click="bindViewTap">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <img class="userinfo-avatar" src="/static/images/user.png" background-size="cover" />

      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
    </div>

    <div class="usermotto">
      <div class="user-motto">
        <card :text="motto"></card>
      </div>
    </div>

    <form class="form-container">
      <input type="text" class="form-control" :value="motto" placeholder="v-model" />
      <input type="text" class="form-control" v-model="motto" placeholder="v-model" />
      <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy" />
    </form>

    <a href="/pages/counter/main" class="counter">去往Vuex示例页面</a>

    <div class="all">
        <div class="left">
        </div>
        <div class="right">
        </div>
    </div>
  </div>-->
  <div class="all">
    <div
      :data-type="item.type"
      @touchstart="touchStart($event)"
      @touchend="touchEnd($event,index)"
      class="main"
      v-for="(item,index) in list"
      :key="item.date"
    >
      <div class="col-6 left">
        <Load :item="item"></Load>
        <!-- <img
          @click="previewImage(item.image)"
          :lazy-load="true"
          :src="item.image"
          mode="aspectFill"
          alt
          @load="bindload()"
          @error="binderror()"
        >
        <img src="/static/images/loading.png" alt="">-->

        <!-- <wux-image
            wux-class="image"
            shape="rounded"
            src="/static/images/1.jpg"
            loading="加载中···"
            mode="aspectFill"
        />-->
      </div>
      <div class="col-6 right">
        <div class="content">{{item.evaluate}}</div>
        <div class="com iconfont icon-zan"></div>
      </div>
      <div class="delect" @click="beforeDelect(item._id,item.image)">
        <p>删除</p>
      </div>
    </div>
    <!-- <div class="main">
      <div class="col-6 left">
        <img src="https://i.loli.net/2019/06/01/5cf238aae8d2745286.jpg" mode="aspectFill" alt>
      </div>
      <div class="col-6 right">
        <div class="content">
          今天早餐吃了~包子，包
          子很不错！
        </div>
      </div>
    </div>-->
    <!-- <div class="main">
      <div class="col-6 left">
        <img src="https://i.loli.net/2019/06/01/5cf238ae9d5d379202.jpg" mode="aspectFill" alt>
      </div>
      <div class="col-6 right">
        <div class="content">
          今天早餐吃了~包子，包
          子很不错！
        </div>
      </div>
    </div>-->
    <!-- <div class="main">
      <div class="col-6">
        <img src="https://i.loli.net/2019/06/01/5cf238b165c9736324.jpg" mode="aspectFill" alt>
      </div>
      <div class="col-6 right">
        <div class="content">
          今天早餐吃了~包子，包
          子很不错！
        </div>
      </div>
    </div>-->
    <div class="add" :class="{rotate:isadd }" @click="add">
      <!-- <span>+</span> -->
      <img src="/static/images/add.png" alt srcset>
    </div>

    <div v-if="isadd" class="panel" :class="{show: isadd}">
      <div v-if="added" class="addimg" @click="addimg">
        <img src="/static/images/add.png" alt srcset>
      </div>
      <p v-if="added">添加图片</p>
      <div v-if="!added" class="addedimg">
        <img mode="aspectFill" :src="FilePaths" alt>
      </div>
      <!-- <input placeholder="饭菜还可口吗？评价一下！" type="textarea" name id> -->
      <textarea
        :fixed="true"
        :enable="flase"
        v-if="isadd"
        placeholder="饭菜还可口吗？评价一下！"
        placeholder-style="color:#eee;"
        v-model="evaluate"
      />
      <div v-if="isadd" class="btn">
        <button
          type="primary"
          size="default"
          :loading="false"
          :plain="false"
          :disabled="false"
          bindtap="primary"
          @click="push"
        >提交</button>
        <button
          type="primary"
          size="default"
          :loading="false"
          :plain="false"
          :disabled="false"
          bindtap="primary"
          @click="cancel"
        >取消</button>
      </div>
    </div>
    <!-- <wux-row>
      <wux-col span="6">
        <div class="placeholder">
          <wux-image
            wux-class="image"
            shape="rounded"
            src="/static/images/1.jpg"
            loading="加载中···"
            mode="aspectFill"
          />
        </div>
      </wux-col>
      <wux-col span="6">
        <div class="placeholder">

        </div>
      </wux-col>
    </wux-row>-->
    <!-- <wux-button type='positive'>点击</wux-button> -->
  </div>
</template>

<script>
import card from "@/components/card";
import images from "@/components/images";
export default {
  data() {
    return {
      motto: "Hello miniprograme",
      userInfo: {
        nickName: "mpvue",
        avatarUrl: "http://mpvue.com/assets/logo.png"
      },
      isadd: false,
      added: true,
      FilePaths: "",
      evaluate: "",
      time: "",
      all: {},
      list: [],
      startX: "",
      endX: ""
    };
  },

  components: {
    card,
    Load: images
  },

  methods: {
    beforeDelect(id, fileID) {
      wx.showModal({
        title: "删除",
        content: "确定要删除吗？",
        success: res => {
          if (res.confirm) {
            console.log("用户点击确定");
            this.delect(id, fileID);
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    },
    delect(id, fileID) {
      wx.showLoading({
        title: "删除中~"
      });
      //删除图片文件
      wx.cloud.deleteFile({
        fileList: [fileID],
        success: res => {
          // handle success
          console.log(res.fileList);
          //删除 数据库 文件
           console.log(id,fileID);
          wx.cloud.callFunction({
            // 需调用的云函数名
            name: "delFoodList",
            // 传给云函数的参数
            data: {
              _id: id
            },
            // 成功回调
            complete: () => {
              wx.hideLoading();
            },
            success: res => {
              console.log(res);
              console.log(res.result);
              this.list = this.list.filter(item => {
                return item._id !== id;
              });
            },
            fail: err => {}
          });
        },
        fail: err => {
          // handle error
        }
      });
    },
    // 滑动开始
    touchStart(e) {
      // 获取移动距离，可以通过打印出e，然后分析e的值得出
      // console.log(e.mp)
      this.startX = e.mp.changedTouches[0] && e.mp.changedTouches[0].clientX;
    },
    // 滑动结束
    touchEnd(e, index) {
      // 获取移动距离
      // console.log(e.mp,index)
      this.endX = e.mp.changedTouches[0] && e.mp.changedTouches[0].clientX;
      if (this.startX - this.endX > 100) {
        for (let i = 0; i < this.list.length; i++) {
          this.list[i].type = 0;
        }
        this.list[index].type = 1;
      } else if (this.startX - this.endX < -100) {
        for (let i = 0; i < this.list.length; i++) {
          this.list[i].type = 0;
        }
      }
    },

    // delect(index){
    //   this.list.splice(index,1);
    // },
    // // 滑动开始
    // touchStart(e){
    //   // 获取移动距离，可以通过打印出e，然后分析e的值得出
    //     this.startX = e.mp.changedTouches[0].clientX;
    // },
    // // 滑动结束
    // touchEnd(e,index){
    //     // 获取移动距离
    //     this.endX = e.mp.changedTouches[0].clientX;
    //     if(this.startX-this.endX > 10){
    //         for(let i=0;i<this.list.length;i++){
    //               this.list[i].type = 0
    //         }
    //         this.list[index].type = 1
    //     }
    //     else if(this.startX-this.endX < -10){
    //         for(let i=0;i<this.list.length;i++){
    //               this.list[i].type = 0
    //         }
    //     }

    // },
    // // 点击回复原状
    // recover(index){
    //       this.list[index].type = 0
    // },

    /**
     * 获取foodList
     */
    getList() {
      wx.cloud.callFunction({
        // 要调用的云函数名称
        name: "getFoodList",
        success: res => {
          // console.log(this)
          wx.stopPullDownRefresh(); //停止刷新
          // console.log(res)
          if (res.result) {
            let list = res.result.data;
            console.log("list", list);
            if (list === undefined || list.length === 0) {
              wx.showToast({
                title: "没有数据"
              });
            } else {
              this.list = list;
            }
          } else {
            console.log(this);
            wx.showToast({
              title: "呀！没有数据"
            });
          }
        },
        fail: err => {
          wx.stopPullDownRefresh(); //停止刷新
          wx.showToast({
            title: "呀！没有数据"
          });
        }
      });
    },
    /**
     * 上传图片
     */
    upload() {
      this.time = new Date().toJSON().replace(/\/| |:|\./g, "-");
      // toLocaleString('cn', { timeZone: 'UTC' }).replace(/\/| |:/g,'-');
      wx.cloud
        .uploadFile({
          cloudPath: `FoodImages/${this.time}.jpg`,
          filePath: this.FilePaths // 文件路径
        })
        .then(res => {
          // get resource ID
          console.log(res.fileID);
          this.all.image = res.fileID;
          this.$nextTick(function() {
            this.updata();
            wx.hideLoading();
            this.cancel();
            wx.showToast({
              title: "添加成功！",
              icon: "success",
              mask: true,
              duration: 2000
            });
            wx.startPullDownRefresh();
          });
        })
        .catch(error => {
          // handle error
          console.log(error);
          wx.hideLoading();
        });
    },
    /**
     * 上传数据库
     */
    updata() {
      const db = wx.cloud.database({});
      db
        .collection("FoodList")
        .add({
          // data 字段表示需新增的 JSON 数据
          data: {
            image: this.all.image,
            evaluate: this.evaluate,
            date: new Date().toLocaleString(),
            type: 0,
            timestamp: new Date().valueOf()
          }
        })
        .then(res => {
          console.log(res);
        })
        .catch(console.error);
    },
    /**
     * 点击提交 将图片和评价提交上去
     */
    async push() {
      console.log(this.FilePaths, this.evaluate);
      if (this.FilePaths !== "" && this.evaluate !== "") {
        console.log("图片和评论ok");
        wx.showLoading({
          title: "添加中~"
        });
        await this.upload();
        /**
         * 测试暂时这样写
         */
        // setTimeout(() => {
        //   wx.hideLoading();
        // }, 2000);
      } else {
        wx.showToast({
          title: "请添加完整呦~",
          icon: "none",
          mask: true,
          duration: 2000
        });
      }
    },
    /**
     * 取消控制面板
     */
    cancel() {
      this.isadd = false;
      this.added = true;
      this.FilePaths = "";
      this.evaluate = "";
    },
    /**
     * 添加图片
     */
    addimg() {
      wx.showLoading({
        title: "打开相册中~"
      });
      console.log("添加图片");
      wx.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success: res => {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths;
          console.log(tempFilePaths[0]);
          //临时路径
          this.FilePaths = tempFilePaths[0];
          this.added = false;
          wx.hideLoading();
        },
        complete: () => {
          wx.hideLoading();
        }
      });
    },
    /**
     * 添加 调出添加面板
     */
    add() {
      this.isadd = !this.isadd;
      this.added = true;
      if (this.isadd === true) {
        this.FilePaths = "";
        this.evaluate = "";
      }
    },
    bindViewTap() {
      const url = "../logs/main";
      if (mpvuePlatform === "wx") {
        mpvue.switchTab({ url });
      } else {
        mpvue.navigateTo({ url });
      }
    },
    clickHandle(ev) {
      console.log("clickHandle:", ev);
      // throw {message: 'custom test'}
    }
  },

  created() {
    // let app = getApp()
  },
  mounted() {
    wx.startPullDownRefresh();
    console.log("mounted");
    // const getmlist = db.collection('FoodList')
    // console.log(db)
  },
  onPullDownRefresh: function() {
    wx.setBackgroundTextStyle({
      textStyle: "dark" // 下拉背景字体、loading 图的样式为dark
    });
    this.getList();
  }
};
</script>

<style>
.delect {
  width: 15%;
  /* height: 150rpx; */
  height: 100%;
  background-color: #ff3b32;
  color: #fff;
  font-size: 34rpx;
  text-align: center;
  position: absolute;
  transform: translateX(690%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 5%;
  /* writing-mode: vertical-rl; */
}
.delect p {
  writing-mode: vertical-rl;
}
.panel .addedimg {
  width: 400rpx;
  height: 403rpx;
  margin: 0 auto;
  margin-top: 20rpx;
}
.panel .addedimg img {
  height: 100%;
  width: 100%;
  border-radius: 5%;
}
.panel button {
  width: 200rpx;
}
.panel .btn {
  margin-top: 85rpx;
  display: flex;
}
.panel input[type="textarea"] {
  outline: 1px solid rgb(87, 87, 87);
  height: 200rpx;
  width: 451rpx;
  margin: 0 auto;
  margin-top: 10px;
}
.panel textarea {
  border: 1rpx solid rgb(184, 183, 183);
  height: 200rpx;
  width: 451rpx;
  margin: 0 auto;
  margin-top: 10px;
  border-radius: 3%;
  padding: 10rpx 10rpx;
  z-index: 0;
}
.addimg {
  margin-top: 35px;
  margin-left: auto;
  margin-right: auto;
  width: 80rpx;
  border: 1rpx solid rgb(107, 107, 107);
  display: flex;
  padding: 20rpx;
  border-radius: 12%;
  background: rgba(0, 0, 0, 0.05);
}
.addimg img {
  width: 40px;
  height: 40px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.panel {
  position: fixed;
  top: 5%;
  /* bottom: 10%; */
  left: 10%;
  right: 10%;
  /* border: 1px solid red; */
  background: #fff;
  width: 80vw;
  height: 80vh;
  z-index: 998;
  transition: all 500ms ease-out;
  animation: opaen 500ms ease-in;
  border-radius: 2%;
  box-shadow: 1px 2px 2px rgb(145, 145, 145);
  /* animation: opaen opale 500ms linear alternate; */
  /* opacity: 0; */
}
.panel button {
  transition: all 1000ms ease-out;
  animation: opale 1000ms ease-in;
}
.panel textarea {
  transition: all 1000ms ease-out;
  animation: area 1000ms ease-in;
}
.panel p {
  font-size: 35rpx;
  margin-top: 10px;
  text-align: center;
  color: rgb(78, 78, 78);
}
.show {
  /* opacity: 1; */
}

@keyframes area {
  0% {
    height: 0;
  }
  100% {
    height: 200rpx;
  }
}
@keyframes opaen {
  0% {
    opacity: 0;
    /* height: 0; */
  }
  100% {
    /* height: 100%; */
    opacity: 1;
  }
}
@keyframes opale {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.add {
  position: fixed;
  /* border: 1px red solid; */
  border-radius: 50%;
  background: #fff;
  width: 50px;
  height: 50px;
  top: 86%;
  left: 80vw;
  text-align: center;
  line-height: 50px;
  font-size: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 100;
  color: rgb(87, 87, 87);
  transition: all 500ms ease-out;
  /* transform: rotate(45deg); */
  box-shadow: 1px 2px 2px rgb(145, 145, 145);
  z-index: 999;
}
.rotate {
  transform: rotate(45deg);
}
.add span {
  transform: translateY(-3px);
}
.add img {
  width: 20px;
  height: 20px;
}
.main .left {
  display: inline-block;
  background: #fff;
  /* padding:10rpx 10rpx 0rpx 10rpx; */
  border-top-left-radius: 5%;
  border-top-right-radius: 5%;
}
.main .left img {
  border-top-left-radius: 5%;
  border-top-right-radius: 5%;
}
.all {
  /* background: rgb(231, 231, 231); */
  background: #fff;
  padding-top: 10rpx;
  overflow-x: hidden;
  /* height: 100vh; */
  /* overflow: hidden; */
}
.content {
  padding: 8px 5px;
}
.main {
  display: flex;
  flex-direction: column;
  margin: 20rpx 20rpx;
  border-radius: 5%;
  box-shadow: 1px 2px 2px rgba(145, 145, 145, 0.5);
  /* border:1px solid red; */
  /* transform:translateX(0rpx); */
  transition: all 500ms ease-out 0s;
}

.main[data-type="0"] {
  transform: translate3d(0, 0, 0);
}

.main[data-type="1"] {
  transform: translate3d(-200rpx, 0, 0);
}

.main .col-6 {
  /* width: 50%; */
  height: 221px;
  margin-top: 1px;
  /* margin-bottom: 1px; */
}
.main .right {
  /* background: #f2937e; */
  height: unset;
  /* color: #fff; */
  color: rgb(151, 151, 151);
  font-size: 14px;
  line-height: 19px;
  border-bottom-left-radius: 26rpx;
  border-bottom-right-radius: 26rpx;
  /* padding: 0rpx 10rpx 10rpx 10rpx; */
}
.main .right .content {
  /* border-bottom-left-radius: 5%;
  border-bottom-right-radius: 5% */
}
.col-6 img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
}
.col-6 img:nth-of-type(2) {
  width: 300rpx;
  height: 300rpx;
  object-fit: cover;
  object-position: center center;
}

button[type="primary"] {
  color: #ffffff;
  background-color: #1890ff;
}
/* .userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
} */
/* .all {
  width: 7.5rem;
  height: 1rem;
  background-color: blue;
}
.all:after {
  display: block;
  content: "";
  clear: both;
}
.left {
  float: left;
  width: 3rem;
  height: 1rem;
  background-color: red;
} */

/* .right {
  float: left;
  width: 4.5rem;
  height: 1rem;
  background-color: green;
} */
</style>
