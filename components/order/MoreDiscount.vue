<template>
  <div class="opt-group group-more-discount">
    <h2 class="opt-group-tit">한번 더 할인</h2>
    <div class="opt-group-con type-discount-more">
      <!-- 쿠폰 할인 -->
      <div class="item">
        <a href="#" class="link">
          <span class="text">쿠폰할인 </span>
          <span class="bundle">
            <!-- [D] case : 1 -->
            <span v-if="couponList.length > 0 && couponDcAmt === 0" class="btn" @click.prevent="openPopup">
              <em class="point">{{ couponList.length }}</em> 장
            </span>
            <!-- [D] case : 2 -->
            <span v-if="couponList.length === 0" class="btn seller-txt-style" @click.prevent="openPopup">등록하기</span>
            <!-- [D] case : 3 -->
            <em v-if="couponList.length > 0 && couponDcAmt > 0" class="price">- {{ couponDcAmt || comma }} 원</em>
            <span
              v-if="couponList.length > 0 && couponDcAmt > 0"
              class="btn seller-txt-style"
              @click.prevent="openPopup"
              >변경</span
            >
          </span>
        </a>
      </div>
      <!-- 포인트 할인 -->
      <div class="item">
        <a href="/wireless/options/point/TsmartPointCommon" class="link">
          <span class="text">포인트 및 이용권 할인</span>
          <span class="bundle">
            <span class="btn">포인트 조회 및 사용</span>
          </span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  filters: {
    /**
     * 3자리수 콤마 적용
     */
    comma(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  },
  props: {
    couponList: {
      type: Array,
      required: true
    },
    propCouponDcAmt: {
      type: String,
      required: false,
      default: '0'
    }
  },
  computed: {
    couponDcAmt() {
      return parseInt(this.propCouponDcAmt);
    }
  },
  mounted() {},
  methods: {
    /**
     * 쿠폰 팝업 호출을 보여준다.
     * @function
     */
    openPopup() {
      try {
        this.$emit('openPopupCoupon', true);
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
