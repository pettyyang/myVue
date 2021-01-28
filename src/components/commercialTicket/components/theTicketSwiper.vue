<template>
  <div class="swiper-wrapper">
    <el-carousel trigger="click" height="400px" :interval="500000">
      <el-carousel-item v-for="(i, idx) in dataSwiper" :key="'lunbo' + idx">
        <a class="item" :href="i.link_url">
          <img :src="i.img_url" alt srcset />
        </a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
import { getTicketSwiper } from '@/api/comTicketApi.js'
export default {
  data () {
    return {
      dataSwiper: {}
    }
  },
  created () {
    this.fetch_swiper()
  },
  methods: {
    fetch_swiper () {
      getTicketSwiper({}).then(res => {
        this.dataSwiper = res.data
      })
    }
  }
}
</script>
<style lang="less">
.swiper-wrapper {
  .el-carousel__indicators--horizontal {
    bottom: 58px;
    .el-carousel__indicator--horizontal {
      padding: 0;
      &:not(:last-child) {
        margin-right: 10px;
      }
      .el-carousel__button {
        width: 40px;
        height: 4px;
      }
    }
  }
}

.el-carousel__item {
  .item {
    width: 100%;
    height: 100%;
    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
