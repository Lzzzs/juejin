<template>
  <nav class="nav-view">
    <div class="nav-mian shadow" :class="{'nav-main--sticky': !isTopbarBlock}">
      <ul class="nav-list">
        <li class="nav-item"
            :class="{'nav-item--active': item.category_url === paramsTitle}"
            v-for="item in channels"
            :key="item.category_id"
            @click="navItemClick(item)"
            ref="navItem"
        >
          <span>{{ item.category_name }}</span>
        </li>
        <nuxt-link v-if="token" tag="li" to="/subscribe" class="nav-item" style="margin-left: auto;">标签管理</nuxt-link>
      </ul>
      <div class="show" ref="show">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="item" ref="navItem" v-for="item in arr" :key="item.category_id">{{ item.category_name }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      arr: []
    }
  },
  props: {
    channels: {
      type: Array,
      default: () => []
    }
  },
  created() {
      this.channels.forEach((item, index) => {
        if (index > 4) {
          this.arr.push(item)
        }
      })
  },
  mounted() {
    if (this.channels.length < 5) {
      this.$refs.show.style.display = 'none'
    }
  },
  computed: {
    ...mapState([
      'isTopbarBlock'
    ]),
    ...mapState('auth', [
      'token'
    ]),
    paramsTitle() {
      return this.$route.params.title || 'recommended'
    }
  },
  methods: {
    handleCommand(command) {
      this.navItemClick(command)
    },
    ...mapMutations([
      'UPDATE_TOPBAR_BLOCK'
    ]),
    async getTagByCategories(categoryId) {
      await this.$api.getTagByCategories({
        categoryId,
        limit: 15
      })
    },
    navItemClick(item) {
      if (this.paramsTitle != item.category_url) {
        this.isTopbarBlock === false && this.UPDATE_TOPBAR_BLOCK(true)
        window.scrollTo({ top: 0 })
        this.$router.push({
          name: 'timeline-title',
          params: {
            title: item.category_url
          }
        })
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.nav-view{
  height: 45px;
}

.nav-mian{
  z-index: 999;
  position: fixed;
  left: 0;
  top: 60px;
  width: 100%;
  background: #fff;
  border-top: 1px solid #eee;
  transition: all .2s;
  display: flex;
  align-items: center;
  &.nav-main--sticky{
    top: 0px;
  }
  .show {
    margin-left: 100px;
  }
}

.nav-list{
  display: flex;
  margin-left: 250px;
  width: 400px;
  height: 40px;
  overflow: hidden;
  position: relative;
  .nav-item{
    padding: 15px 0;
    font-size: 14px;
    color: #71777c;
    cursor: pointer;
    display: flex;
    width: 70px;
    span {
      width: 70px;
    }

    &.nav-item--active,
    &:hover{
      color: $theme;
    }

    &:not(:last-child){
      margin-right: 24px;
    }
  }
  .show-item {
    display: none;
  }
}
// element
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }

@media screen and (max-width: 840px) {
  .nav-list {
    padding: 0px 30px;
    margin: 0px;
  }
  .nav-item {
    margin-right: 2rem !important;
  }
  .nav-mian {
    padding-right: 20px;
  }
}
@media screen and (max-width: 520px) {
  .nav-item {
    margin-right: 1rem !important;
    width: 50px !important;
  }
  .show {
    width: 60px
  }
}
</style>
