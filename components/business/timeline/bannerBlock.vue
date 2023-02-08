<template>
  <div class="sidebar-block banner-block" ref="banner">
    <div class="banner-body">
      <a href="https://juejin.cn/post/7185104994801025061?utm_source=web1&amp;utm_medium=banner&amp;utm_campaign=tlgt2023" target="_blank">
        <img :alt="banner.attributes.alt" :src="imgUrl" class="banner-image">
      </a>
      <div class="ctrl-box">
        <img class="close-btn" src="~/assets/images/close.svg" @click="close">
        <a class="label" href="https://bd.juejin.cn?utm_campaign=bd&amp;utm_source=web&amp;utm_medium=banner" target="_blank">
          <span class="inco">投放</span>
          <span>广告</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    banner: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    imgUrl(){
      return "http://lzzzs.top:1337" + this.banner.attributes.pic.data.attributes.url
    }
  },
  methods: {
    close(e) {
      this.$refs.banner.style.display = 'none'
    }
  }
}
</script>

<style scoped lang="scss">
  .sidebar-block{
    background-color: #fff;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
    border-radius: 2px;
    margin-bottom: 1.3rem;
    font-size: 1.16rem;
    line-height: 1.29;
    color: #333;
  }

  .sidebar-block.banner-block{
    margin-bottom: 1.0rem;
    overflow: hidden;
    .banner-body{
      height: 200px;
      position: relative;
      font-size: 0;
      cursor: pointer;
      .banner-image{
        width: 100%;
        height: 100%;
      }
      .ctrl-box {
        .close-btn{
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          font-size: 0.1rem;
          color: #909090;
          opacity: 0.5;
          display: none;
        }
        .label{
            position: absolute;
            right: 10px;
            bottom: 10px;
            line-height: 36px;
            height: 36px;
            font-size: 20px;
            z-index: 1;
            transform: scale(.5);
            -webkit-transform: scale(.5);
            transform-origin: right bottom;
            -webkit-transform-origin: right bottom;
            color: #fff;
            background-color: rgba(0,0,0,.2);
            border: 1px solid #fff;
            border-radius: 6px;
            padding-left: 15px;
            padding-right: 15px;
            font-weight: 300;
            .inco{
              display: none;
            }
            &:hover{
              display: flex;
              .inco{
                display: block;
                margin-right: 6px;
              }
            }
        }
      }
      &:hover{
        .close-btn{
          opacity: 1;
          display: block;
        }
      }
    }
  }
</style>
