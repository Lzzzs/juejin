<template>
  <div>
    <timeline-category :channels="timelineCategoryList"></timeline-category>
    <div class="index-container">
      <div :class="[(isWhite? 'topBarDay':'night'), 'index-main', 'shadow']">
        <div class="list__header">
          <ul class="list__nav">
            <li class="list__nav-item" :class="{ 'list__nav-item--active': item.id == navId }" v-for="item in navs" :key="item.title" @click="changeNavType(item)">
              {{ item.title }}
            </li>
            <el-select v-if="navTypes.length" size="mini" style="width:100px" v-model="sort_type" placeholder="请选择" @change="changeNavType">
              <el-option v-for="item in navTypes" :key="item.title" :label="item.title" :value="item.type">
              </el-option>
            </el-select>
          </ul>
        </div>
        <artic-list :list="list"></artic-list>
      </div>
      <div class="index-side">
        <banner-block v-for="item in bannerList" :key="item.id" :banner="item"></banner-block>
        <download-block></download-block>
        <author-block :list="authorList"></author-block>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import reachBottom from '~/mixins/reachBottom'
import bannerBlock from '~/components/business/timeline/bannerBlock'
import authorBlock from '~/components/business/timeline/authorBlock'
import downloadBlock from '~/components/business/timeline/downloadBlock'
import timelineCategory from '~/components/business/timeline/timelineCategory'

export default {
  async asyncData({ app, params, store }) {
    // 分类列表
    let initCategoryList = [{ category_id: 0, category_name: '推荐', category_url: 'recommended' }]
    let currentCategoryItem = store.state.category.timelineCategoryList.filter(item => item.category_url === params.title)[0] || initCategoryList[0]
    let [indexData, authorList, bannerList] = await Promise.all([
      // 文章列表
      // app.$api.getIndexList({
      //   cate_id: currentCategoryItem.category_id || '',
      //   limit: 20,
      //   sort_type: 200,
      //   feed_type: currentCategoryItem.category_id ? 'cate' : 'all',
      // }).then(res => {
      //   console.log(res);
      //   return res.err_no == 0 ? res : {}
      // }),
      app.$api.getIndexList().then(res => res),
      // 右侧作者列表
      app.$api.getAuthorBlock().then(res => res.meta.total !== 0 ? res.data.slice(0, 3) : []),
      // 右侧广告
      app.$api.getBanerBlock().then(res => res.meta.total !== 0 ? res.data.slice(0, 2) : []),
    ])
    // 列表下一页信息
    let pageInfo = {
      cursor: indexData.cursor,
      has_more: indexData.has_more
    }
    return {
      currentCategoryItem,
      list: indexData.data || [],
      pageInfo,
      authorList,
      bannerList
    };
  },
  head() {
    return {
      title: `${this.currentCategoryItem.category_name ? this.currentCategoryItem.category_name + ' - ' : ''}掘金`
    }
  },
  async validate({ app, params, store }) {
    // 分类列表 tabs修改地方
    let initCategoryList = [{ category_id: 0, category_name: '推荐', category_url: 'recommended' }]
    let categoryList = []
    // 获取分类列表缓存
    // if (store.state.category.timelineCategoryList.length) {
    //   categoryList = store.state.category.timelineCategoryList
    //   console.log('if', categoryList);
    // } else {
    categoryList = await app.$api.getCategories({ show_type: 0 }).then(function (res) {
      res = Array.from(res.data)
      let arr = []
      res.forEach((item) => {
        item.attributes.icon = 'https://img1.baidu.com/it/u=1016138010,1907110459&fm=253&fmt=auto&app=138&f=JPEG'
        item.attributes.back_ground = 'https://img.duoziwang.com/2017/05/10/B4433.jpg'
        arr.push(item.attributes)
      })
      return initCategoryList.concat(arr);
      // res.err_no === 0 ? initCategoryList.concat(res.data) : initCategoryList
    })
    store.commit('category/UPDATE_TIMELINE_CATEGORY_LIST', categoryList)
    // }
    // categoryList = await app.$api.getCategories({ show_type: 0 }).then(res => res.err_no === 0 ? initCategoryList.concat(res.data) : initCategoryList)
    // categoryList = await app.$api.getCategories()
    //   store.commit('category/UPDATE_TIMELINE_CATEGORY_LIST', categoryList)
    // console.log('else', categoryList);
    // const fn = async() => {
    //   let res = await axios.get('http://lzzzs.top:1337/api/header-tags')
    //   res = Array.from(res.data)
    //   let arr = []
    //   res.forEach((item) => {
    //     item.attributes.icon = 'https://img1.baidu.com/it/u=1016138010,1907110459&fm=253&fmt=auto&app=138&f=JPEG'
    //     item.attributes.back_ground = 'https://img.duoziwang.com/2017/05/10/B4433.jpg'
    //     arr.push(item.attributes)
    //   })
    //   return arr
    // }
    return params.title === undefined || categoryList.filter(item => item.category_url === params.title).length
  },
  mixins: [reachBottom],
  components: {
    'timeline-category': timelineCategory,
    'banner-block': bannerBlock,
    'download-block': downloadBlock,
    'author-block': authorBlock,
  },
  data() {
    return {
      navs: [
        {
          id: 1,
          title: '热门',
          type: 200
        },
        {
          id: 2,
          title: '最新',
          type: 300
        },
        {
          id: 3,
          title: '热榜',
          type: 3,
          types: [
            {
              title: '3天内',
              type: 3
            },
            {
              title: '7天内',
              type: 7
            },
            {
              title: '30天内',
              type: 30
            },
            {
              title: '全部',
              type: 0
            }
          ]
        }
      ],
      navId: 1,
      sort_type: 200,
      navTypes: [],
      currentCategoryItem: {},
      tags: [],
      list: [],
      pageInfo: {},
      authorList: [],
      bannerList: [],
      isReachBottomFetching: false,  // 防止触底多次请求
    };
  },
  created() {
    console.log(this.isWhite, 'jfdakljflda');
  },
  computed: {
    ...mapState('category', ['timelineCategoryList']),
    ...mapState(['isWhite'])
  },
  methods: {
    reachBottom() {
      if (this.pageInfo.has_more) {
        this.getArticList({
          isLoadMore: true
        })
      } else {
        this.$message.info('没有更多文章了')
      }
    },
    // 热门 最新 热榜
    changeNavType(item) {
      if (item.id && this.navId !== item.id) {
        this.navId = item.id
        this.sort_type = item.type
        this.navTypes = item.types || []
      }
      this.getArticList()
    },
    async getArticList({ isLoadMore = false } = {}) {
      if (this.isReachBottomFetching) {
        return
      }
      this.isReachBottomFetching = true
      let params = {
        feed_type: this.currentCategoryItem.cate_id ? 'cate' : 'all',
        limit: 20,
        cursor: '',
        sort_type: this.sort_type,
        cate_id: this.currentCategoryItem.cate_id || ''
      }
      if (isLoadMore) {
        params.cursor = this.pageInfo.cursor || ''
      }
      let res = await this.$api.getIndexList(params);
      if (res.err_no == 0) {
        this.list = isLoadMore ? this.list.concat(res.data) : res.data
        this.pageInfo = {
          cursor: res.cursor,
          has_more: res.has_more
        }
        this.isReachBottomFetching = false
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.index-container {
  display: flex;

  .index-main {
    width: 700px;
    margin-right: 20px;
    background: #fff;
    border-radius: 2px;
  }

  .index-side {
    width: 240px;
  }
}

.list__header {
  padding: 15px 25px;
  border-bottom: 1px solid #eee;
}

.list__nav {
  height: 28px;
  display: flex;
  align-items: center;

  .list__nav-item {
    display: inline-block;
    font-size: 14px;
    color: #909090;
    cursor: pointer;

    &:hover,
    &.list__nav-item--active {
      color: $theme;
    }

    &:not(:last-child) {
      &::after {
        content: '|';
        margin: 10px;
        color: #eee;
      }
    }
  }
}

@media screen and (max-width: 980px) {
  .index-container {
    padding: 0px 20px;
    .index-main {
      color: red;
      width: 100%;
    }
    .index-side {
      display: none;
    }
  }
}
</style>
