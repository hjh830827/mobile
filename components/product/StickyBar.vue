<template>
  <div ref="stickyBar" class="sticky-bar">
    <div class="layer-pay">
      <h2 class="g-invisible">출고가 가격정보</h2>
      <div class="l-grid">
        <div class="layer-foot">
          <p class="price-area">
            <span class="stit">
              <span class="text">
                <span class="sunit">출고가</span>
              </span>
            </span>
            <strong class="price">
              <span class="num"
                ><strong>{{ productPrice | comma }}</strong></span
              >
              <span class="unit">원</span>
            </strong>
          </p>
        </div>
        <div class="btn-area">
          <!-- [D] 활성/비활성 여부는 클래스 disabled 추가/삭제로 컨트롤 -->
          <button type="button" class="btn-primary" :disabled="completeDisableFlag" @click.prevent="onSelectCompleted">
            선택완료
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  filters: {
    comma(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  },
  props: {
    productPrice: {
      type: String,
      required: false,
      default: '0'
    },
    completeDisableFlag: {
      type: Boolean,
      required: true,
      default: true
    }
  },
  create() {},
  mounted() {
    // this.$emit('mounted', this.$refs.stickyBar); - 210118 삭제
  },
  methods: {
    onSelectCompleted() {
      this.$emit('onSelectCompleted');
    }
  }
};
</script>
