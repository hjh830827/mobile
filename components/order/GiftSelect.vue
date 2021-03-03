<template>
  <div class="opt-group">
    <h2 class="opt-group-tit">T 기프트</h2>
    <!-- 선택 전 -->
    <div v-if="selectTgiftInfo === null" class="opt-group-con">
      <div class="tgift-type before-selected">
        <div class="cont">
          <a href="#none" @click.prevent="openPopup">
            <img src="/images/seller/banner_tgift_select@2x.png" class="img" alt="" />
          </a>
        </div>
      </div>
    </div>
    <!-- 선택 후 -->
    <div v-if="selectTgiftInfo !== null" class="opt-group-con">
      <div class="tgift-type">
        <div class="thumb"><img src="/images/@/@tmp_iphone-12-pro-max-silver@2x.png" alt="" /></div>
        <div class="cont">
          <p class="title">{{ selectTgiftInfo.giftNm }}</p>
          <button type="button" class="btn-change seller-txt-style" @click.prevent="openPopup">변경</button>
          <div class="option">랜덤발송</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    propSelectTgiftInfo: {
      type: Object,
      required: false,
      default: null
    }
  },
  computed: {
    selectTgiftInfo() {
      return this.propSelectTgiftInfo;
    }
  },
  mounted() {},
  methods: {
    /**
     * T 기프트 목록 팝업 호출을 보여준다.
     * @function
     */
    openPopup() {
      try {
        this.$emit('openPopupGiftListSelect');
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
