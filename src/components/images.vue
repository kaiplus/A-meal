<template>
  <div class="imgout">
    <img
      @click="previewImage(item.image)"
      :lazy-load="true"
      :src="item.image"
      mode="aspectFill"
      alt
      @load="bindload()"
      @error="binderror()"
      v-show="show"
    >
    <img class="loading" v-show="!show" src="/static/images/loading.png" alt>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // src: item.image
      show: false
    };
  },
  // props:{
  //     item:{
  //         type: Object,
  //     }
  // },
  props: {
    item: {
      type: Object,
    }
  },
  methods: {
    /**
     * 预览图片
     */
    previewImage(img) {
      wx.showLoading({
        title: "加载中~"
      });
      // console.log(img);
      wx.previewImage({
        // current: img, // 当前显示图片的http链接
        urls: [img], // 需要预览的图片http链接列表
        complete: () => {
          wx.hideLoading();
        }
      });
    },
    /**
     * 图片加载失败
     */
    binderror() {
      console.log("图片加载失败");
    },
    /**
     * 图片加载成功
     */
    bindload() {
      console.log("加载完成~");
      this.show = true
    }
  },
  mounted() {
    // console.log("111111");
    // console.log(this.item);
  }
};
</script>
<style scoped>
.imgout {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.imgout .loading {
    animation: trans 2s linear infinite;
}
@keyframes trans {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(1turn);
    transform: rotate(1turn);
  }
}
</style>
