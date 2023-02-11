<template>
  <div class="artic-item" @click="toDetail()">
    <div class="artic-item__info">
      <ul class="artic-item__meta">
        <li class="meta-item">
          <span class="meta-item__username">
            <nuxt-link :to="'/user/'+uid" target="_blank" @click.native="(e) => e.stopPropagation()">{{ item.attributes.author.data.attributes.user_name }}</nuxt-link>
          </span>
        </li>
        <li class="meta-item">{{ item.attributes.ctime | formatTime }}</li>
        <!-- <li class="meta-item">
          <template v-if="item.tags.length">
            <nuxt-link class="meta-item__tag" :to="'/tag?name='+tag.tag_name" v-for="tag in item.tags" :key="tag.id" target="_blank" @click.native="(e) => e.stopPropagation()">{{ tag.tag_name }}</nuxt-link>
          </template>
        </li> -->
      </ul>
      <p class="artic-item__title ellipsis" v-html="highlight.title || item.attributes.title"></p>
      <p class="artic-item__desc" v-html="highlight.description || highlight.text || item.attributes.brief_content"></p>
      <!-- <ul class="artic-item__action">
        <li class="action-item" :class="{active: item.attributes[likeField]}" @click.stop="articleLike">
          <img v-if="item.attributes[likeField]" class="action-item__icon" src="~assets/images/png/like.png">
          <img v-else class="action-item__icon" src="~assets/images/png/like.png">
          {{ item.attributes[likeCountField] }}
        </li>
        <li class="action-item" @click.stop="toDetail('#comment')">
          <img class="action-item__icon" src="~assets/images/png/comment.png">
          {{ item.attributes.comment_count }}
        </li>
      </ul> -->
    </div>
    <img v-if="item.attributes.cover_image" :src="getUrl(item.attributes.cover_image.data.attributes.url)" class="artic-item__cover"/>
  </div>
</template>

<script>
export default {  
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    hasDesc: {
      type: Boolean,
      default: false
    },
    highlight: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    // 点赞状态字段不一致  此处筛选出对应字段
    likeField() {
      let fields = ['is_digg']
      return fields.filter(key => this.item[key] == undefined ? false : key)[0]
    },
    // 点赞数字段不一致  此处筛选出对应字段
    likeCountField() {
      let fields = ['digg_count']
      return fields.filter(key => this.item.attributes[key] == undefined ? false : key)[0]
    },
    // 统一 uid值
    uid() {
      return this.item.attributes.author.data.id
    },
    detailId() {
      console.log("走到了detailId()方法里面")
      console.log("detailId()返回的值this.item.article_id为" + this.item.article_id)
      console.log(this.item)
      return this.item.id
    }
  },
  methods: {
    getUrl(url){
      return `http://lzzzs.top:1337${url}`
    },
    toDetail(hash = '') {
      console.log("走进了articleItem.vue的toDetail方法里面")
      let routeUrl = this.$router.resolve({
        name: 'detail-id',
        params: {
          id: this.detailId
        }
      })
      console.log("articleItem.vue的toDetail方法里面的detailId为" + this.detailId)
      console.log("articleItem.vue的toDetail方法里面的routeUrl.href为" + routeUrl.href)
      window.open(routeUrl.href + hash, '_blank')
      // window.open("/detail/2" + hash, '_blank')
    },
    async articleLike() {
      if (!this.$store.state.auth.token) {
        this.$loginModal(this)
        return
      }
      let id = this.item.id
      if (id && this.likeField && this.likeCountField) {
        let res = await this.$api.articleLike({
          entryId: id,
          isCollected: !this.item[this.likeField]
        })
        // 更新视图点赞状态
        if (res.s === 1) {
          this.$emit('update:item', {
            ...this.item,
            [this.likeField]: !this.item[this.likeField],
            [this.likeCountField]: this.item[this.likeField] ? Number(this.item[this.likeCountField]) - 1 : Number(this.item[this.likeCountField]) + 1
          })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.artic-item {
  display: flex;
  align-items: center;
  padding: 20px 25px;
  cursor: pointer;

  &:hover{
    background: rgba(0,0,0,.01);
  }
}

.artic-item__info {
  flex: 1 1 auto;
  overflow: hidden;
}

.artic-item__cover {
  flex: 0 0 auto;
  width: 120px;
  height: 80px;
  margin-left: 24px;
  background-color: #f4f4f4;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 2px;
}

.artic-item__meta {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #b2bac2;

  .meta-item {
    &::after {
      content: "|";
      margin: 0 5px;
      color: #b2bac2;
    }

    &:last-child::after {
      content: "";
    }
  }

  .mate-item--hot{
    color: #f70;
  }

  .mate-item--post {
    color: #b71ed7;
  }

  .meta-item__username {
    cursor: pointer;

    &:hover{
      color: $theme;
    }
  }

  .meta-item__tag {
    cursor: pointer;

    &:hover{
      color: $theme;
    }

    &::after {
      content: " / ";
      color: #b2bac2;
    }

    &:last-child::after {
      content: "";
    }
  }
}

.artic-item__title {
  display: block;
  margin: 10px 0 16px;
  line-height: 1.3;
  font-size: 17px;
  font-weight: 700;
  color: inherit;
  text-decoration: none;

  &:hover{
    text-decoration: underline;
  }

   ::v-deep  em{
    color: #e8001c;
  }
}

.artic-item__desc {
  width: 800px;
  margin-bottom: 14px;
  font-size: 13px;
  color: #5b6169;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

   ::v-deep  em{
    color: #e8001c;
  }
}

.artic-item__action {
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 13px;
  color: #b2bac2;

  .action-item {
    display: flex;
    align-items: center;
    height: 26px;
    padding: 0 10px;
    border: 1px solid #edeeef;

    .action-item__icon{
      margin-right: 3px;
      display: block;
      width: 16px;
      height: 16px;
    }

    &.active{
      color: $success;
    }

    &:last-child {
      border-left: 0;
    }
  }
}
</style>