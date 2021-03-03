<template>
  <div class="popup pop-seller popup-tgift-detail" :style="{ display: openFlag ? 'block' : 'none' }">
    <div class="popup-body">
      <div class="popup-header">
        <a href="#none" class="btn-back" @click.prevent="closePopup">
          <span class="ico-back">이전 페이지로 돌아가기</span>
        </a>
        <h1 class="popup-title">T기프트 자세히 보기</h1>
      </div>

      <!-- popup-content -->
      <div role="main" class="popup-content">
        <h2 class="tgift-title">{{ tgiftDetailInfo.giftNm }}</h2>

        <h3 class="tgift-sub-title">상품 정보</h3>

        <div class="tgift-detail-wrap">
          {{ tgiftDetailInfo.giftLongDesc }}
        </div>

        <div class="c-link-bar">
          <a href="#none" class="link-block"><span class="text">유의사항</span></a>
        </div>
      </div>
      <!-- //popup-content -->

      <div class="popup-footer" :class="{ active: popupFooterFlag }">
        <button type="button" class="btn-toggle" @click="popupFooterBnt">옵션 선택 접기/펴기</button>
        <div class="form-group">
          <span class="c-select">
            <select v-model="selectTgiftInfo" title="옵션 선택" class="select">
              <option value="" selected="selected">옵션을 선택하세요</option>
              <option value="option1">화이트</option>
              <option value="option2">블랙</option>
              <option value="option2">핑크</option>
            </select>
          </span>
        </div>
        <div class="btn-area">
          <button type="button" class="btn-primary" @click="applyTgift">T기프트 선택하기</button>
        </div>
      </div>
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
    tgiftDetailInfo: {
      type: Object,
      required: true,
      default: null
    }
  },
  data() {
    return {
      popupFooterFlag: false,
      selectTgiftInfo: ''
    };
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
     * 옵션 접기 / 펴기
     */
    popupFooterBnt() {
      this.popupFooterFlag = !this.popupFooterFlag;
    },
    /**
     * T 기프트 적용
     * @function
     */
    applyTgift() {
      // 선택한 옵션 추가해야함.
      this.$emit('closePopup', false, this.tgiftDetailInfo);
      // if (this.selectCpnInfo === '') {
      //   alert('옵션을 선택하세요.');
      // } else {
      //   this.$emit('closePopupTgift', false, this.selectCpnInfo);
      // }
    }
  }
};
</script>
