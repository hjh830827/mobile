<template>
  <div class="popup pop-seller popup-tgift" :style="{ display: openFlag ? 'block' : 'none' }">
    <div class="popup-body">
      <div class="popup-header">
        <h1 class="popup-title">T기프트</h1>
      </div>

      <!-- popup-content -->
      <div role="main" class="popup-content">
        <p class="tgift-dsc">
          T다이렉트샵에서 구매하시는 고객님들께 드리는 추가 혜택, T기프트 상품을 선택해주세요.
          <br />(선택하신 T기프트의 경우 주문완료 후에는 변경이 불가합니다)
        </p>

        <ul class="tgift-list">
          <li v-for="(item, index) in tgiftList" :key="index" class="tgift-list-item">
            <a href="#none" class="link-block" @click.prevent="selectTgfit(item)">
              <div class="thumb">
                <img :src="item.imageUrl" alt="" />
              </div>
              <span class="title">{{ item.giftNm }}</span>
            </a>
          </li>
        </ul>

        <ul class="dsc-list" style="display: none">
          <li class="dsc-item">더 좋은 T기프트 제공을 위해 T기프트 목록은 변경될 수 있습니다.</li>
          <li class="dsc-item">일부 단말기에서는 T기프트를 제공하지 않습니다.</li>
          <li class="dsc-item">
            각각의 단말기에 알맞은 T기프트를 제공하고 있어, 단말기에 따라 선택 가능한 T기프트 상품 목록은 다릅니다.
          </li>
          <li class="dsc-item">일부 쿠폰 발급형 상품의 경우, 로그인하셔야 T기프트 선택이 가능합니다.</li>
          <li class="dsc-item">선택하신 T기프트의 경우 주문완료 후에는 변경이 불가합니다.</li>
          <li class="dsc-item">상기 이미지는 실제 제공되는 T기프트와 다를 수 있습니다.</li>
        </ul>
      </div>
      <!-- //popup-content -->

      <button type="button" class="btn-close" @click.prevent="closePopup">
        <span class="ico-close">팝업 닫기</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    openFlag: {
      type: Boolean,
      required: true,
      default: false
    },
    tgiftList: {
      type: Array,
      required: true,
      default: null
    }
  },
  data() {
    return {};
  },
  methods: {
    /**
     * 팝업을 감춘다.
     * @function
     */
    closePopup() {
      try {
        this.$emit('closePopup');
      } catch (e) {
        console.log(e);
      }
    },
    /**
     * T 기프트 선택
     */
    selectTgfit(tgiftInfo) {
      this.$emit('selectTgfit', tgiftInfo);
    }
  }
};
</script>
