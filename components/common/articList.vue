<template>
  <div :class="[isWhite? 'topBarDay':'night', 'artic-list']">
    <ul v-for="item in list" :key="item.article_id">
      <li class="artic-item--border">
        <artic-item :item.sync="item"></artic-item>
      </li>
      <!-- <div v-if="item.item_type == 2" class="artic-item--border" :key="index">
        <artic-item :item.sync="list[index].item_info"></artic-item>
      </div>
      <div v-else-if="item.item_type == undefined" class="artic-item--border" :key="index">
        <artic-item :item.sync="list[index]"></artic-item>
      </div> -->
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    hasDesc: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
    }
  },
  methods: {
  },
  computed: {
  ...mapState(['isWhite'])
  },
}
</script>

<style lang='scss' scoped>
.artic-list {
  background-color: #fff;

  .artic-item--border:not(:last-child) {
    border-bottom: 1px solid #eee;
  }
}
</style>
