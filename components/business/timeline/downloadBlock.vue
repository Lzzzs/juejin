<template>
  <div class="sidebar-block download-block">
    <div class="download-body">
      <a href="https://juejin.cn/app" target="_blank">
        <div class="app-link">
          <img src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/home.59780ae.png" class="qr-img">
          <div class="content-box">
            <div class="headline">下载稀土掘金APP</div>
            <div class="desc">一个帮助开发者成长的社区</div>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
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
  .sidebar-block.download-block{
      position: relative;
      margin-bottom: 1.0rem;
      border-radius: 2px;
      a{
        text-decoration: none;
        cursor: pointer;
        color: #909090;
        .app-link{
          display: flex;
          align-items: center;
          padding: 0.8rem;
          display: flex;
          align-items: center;
          padding: 0.8rem;
          .qr-img{
              margin-right: 16px;
              width: 3.125rem;
              height: 3.125rem;
          }
          .content-box{
            .headline{
                font-weight: 500;
                font-size: 14px;
                line-height: 22px;
                color: #1d2129;
            }
            .desc{
                margin-top: 0.5rem;
                font-size: 12px;
                line-height: 20px;
                color: #86909c;
            }
          }
        }
      }
  }
</style>
