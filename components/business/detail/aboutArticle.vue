<template>
  <div :class="[isWhite? 'day':'night', 'about-article', 'shadow']">
    <div class="about-article__title">相关文章</div>
    <nuxt-link v-for="item in list" :key="item.id" :to="'/detail/'+item.id" target="_blank">
      <div :class="[isWhite? 'day':'night', 'article-item']">
        <div class="article__title">{{ item.attributes.title }}</div>
        <div class="article__meta">
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  // 参数是别的地方传过来的
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapState(['isWhite'])
  },
}
</script>

<style lang='scss' scoped>
.about-article{
  margin-top: 20px;
  background: #fff;
  border-radius: 2px;

  .about-article__title{
    padding: 15px;
    font-size: 14px;
    border-bottom: 1px solid #eee;
  }

  .article-item{
    padding: 15px;
    font-size: 14px;
    line-height: 1.3;
    color: #333;
    cursor: pointer;

    &:hover{
      background: hsla(0,0%,84.7%,.1);
    }

    .article__meta{
      display: flex;
      align-items: center;
      margin-top: 10px;
      color: #b2bac2;
      font-size: 14px;

      .meta-item{
        display: flex;
        align-items: center;

        &:not(:last-child){
          margin-right: 20px;
        }

        .meta-item__icon{
          width: 16px;
          height: 16px;
          margin-right: 5px;
        }
      }
    }
  }
}
</style>
