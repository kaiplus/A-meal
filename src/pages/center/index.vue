<template>
  <div class="center">
    <div class="avator">
      <!-- <a href="/pages/index">首页</a>但是不能跳到 tabbar 页面 -->
      <!-- <a href="/pages/counter/main" class="counter">去往Vuex示例页面</a> -->
      <img mode='aspectFill' :src="userInfo.avatarUrl" alt>
    </div>
    <p class="nickName">{{userInfo.nickName}}</p>
    <button open-type="getUserInfo" class="button"
    @getuserinfo="bindGetUserInfo"
     @click="login" v-if="flag">登录</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
        userInfo: {
            avatarUrl:
          "https://ws1.sinaimg.cn/large/8660d1bbly1fyshs6y9goj205k05kweh.jpg",
        nickName: "欢迎使用！"
        },
        flag: true,
        openid: ""
    };
  },
  methods: {
    login() {
      console.log("click事件首先触发");
      // 判断小程序的API，回调，参数，组件等是否在当前版本可用。  为false 提醒用户升级微信版本
      // console.log(wx.canIUse('button.open-type.getUserInfo'))
      if (wx.canIUse("button.open-type.getUserInfo")) {
        try {
          const value = wx.getStorageSync("user");
          if (value) {
            this.userInfo = value;
            this.touxiang = value.avatarUrl;
            this.flag = false
            console.log(value);
            console.log(this.userInfo);
            // Do something with return value
          }
        } catch (e) {
          // Do something when catch error
        }
        // 用户版本可用
      } else {
        console.log("请升级微信版本");
      }
    },
    bindGetUserInfo(e) {
      wx.showLoading({
        title: "登录中"
      });
      // console.log(e.mp.detail.rawData)
      if (e.mp.detail.rawData) {
        wx.setStorageSync("user", e.mp.detail.userInfo);
        this.userInfo = e.mp.detail.userInfo;
        // this.$store.state.personweixin = e.mp.detail.userInfo;
        // this.$store.state.loginbook = true
        // this.$store.state.logincommon = true
        console.log(e.mp.detail);
        //用户按了允许授权按钮
        wx.hideLoading();
        console.log("用户按了允许授权按钮");
        this.flag = false;
      } else {
        wx.hideLoading();
        //用户按了拒绝按钮
        console.log("用户按了拒绝按钮");
      }
    },
    getSetting() {
      wx.getSetting({
        success: (res) => {
          if (res.authSetting["scope.userInfo"]) {
            wx.getUserInfo({
              success: function(res) {
                console.log(res.userInfo);
                //用户已经授权过
                console.log("用户已经授权过");
              }
            });
          } else {
            console.log("用户还未授权过");
            // this.getUserInfo1();
          }
        }
      });
    }
  },
  mounted() {
      try {
          const value = wx.getStorageSync("user");
          if (value) {
            this.userInfo = value;
            this.touxiang = value.avatarUrl;
            this.flag = false;
            console.log(value);
            console.log(this.userInfo);
            // Do something with return value
          }
        } catch (e) {
          // Do something when catch error
        }
        this.getSetting()

    /**
     * 调用云函数
    */
   
        wx.cloud.init()
          wx.cloud.callFunction({
            name: 'login',
            complete: res => {
                console.log('callFunction test result: ', res.result.openid)
                this.openid = res.result.openid
            }
            })

  },
};
</script>
<style scope>
.button {
  width: 40%;
  background: rgb(241, 143, 78);
  color: #fff;
}
.avator img{
    width: 150px;
    height: 150px;
    object-fit: cover;
    object-position: center center;
    margin: 0 auto;
    border-radius: 50%;
    /* border: 1px red solid; */
    margin-bottom: 10px;
    margin-top: 20px;
}
.avator{
    display: flex;
    justify-content: center;
    align-items: center;
}
.nickName{
    font-size: 20px;
    text-align: center;
    margin-bottom: 10px;
}
.center{
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
</style>

