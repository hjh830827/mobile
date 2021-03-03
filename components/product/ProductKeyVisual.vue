<template>
  <div class="product-key-visual">
    <div v-swiper:mySwiper="options">
      <div class="swiper-wrapper">
        <div v-for="(item, index) in imageList" :key="index" class="swiper-slide">
          <div class="img-area">
            <img :src="item.imageUrl" alt="" @error="replaceByDefault" />
          </div>
        </div>
      </div>
      <div class="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imageList: {
      type: Array,
      required: true,
      default: null
    }
  },
  data() {
    return {
      options: {
        slidesPerView: 1,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        // autoplay: {
        //   delay: 5000,
        //   disableOnInteraction: false
        // },
        loop: false
      },
      errorImgUrl: process.env.CND_WEB_RESOURCE_ROOT_PATH
    };
  },
  computed: {},
  mounted() {},
  methods: {
    replaceByDefault(e) {
      e.target.src = '/images/noimg_detail.png';
    }
  }
};
</script>

<style lang="scss" scoped></style>
