<template>
  <div class="sticky-bar">
    <div class="layer-pay">
      <h2 class="g-invisible">출고가 가격정보</h2>
      <div class="l-grid">
        <!-- [D] : layer-body 노출시 class on 추가 -->
        <div id="layerBody" ref="stickyBar" class="layer-body" style="display: block">
          <button type="button" class="btn-toggle" @click="layerBodyBnt">
            <span class="g-invisible">상세보기</span>
          </button>
          <div v-for="(item, index) in stickyPriceInfo.layerArray" :key="index" class="price-area">
            <div class="stit">
              <span class="text">
                <span class="sunit">{{ item.layerText }}</span>
              </span>
            </div>
            <div class="price">
              <span class="num">{{ item.layerPrice | comma }}</span> <span class="unit">원</span>
            </div>
          </div>
        </div>

        <div class="layer-foot">
          <div v-for="(item, index) in stickyPriceInfo.footArray" :key="index" class="price-area">
            <span class="stit">
              <span class="text">
                <span class="sunit">{{ item.footText }}</span>
              </span>
            </span>
            <strong class="price">
              <span class="num"
                ><strong>{{ item.footPrice | comma }}</strong></span
              >
              <span class="unit">원</span>
              <em v-if="index === 0 && stickyPriceInfo.descYn === 'Y'" class="desc">할수 수수료 5.9% 포함</em>
            </strong>
          </div>
        </div>
        <!-- [D] 활성/비활성 여부는 클래스 disabled 추가/삭제로 컨트롤 -->
        <div class="btn-area">
          <button type="button" class="btn-primary" :disabled="propOrderDisableFlag" @click="doOrder">주문하기</button>
          <button type="button" class="btn-light" @click="cartSave">장바구니 담기</button>
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
    propOrderDisableFlag: {
      type: Boolean,
      required: true,
      default: true
    },
    productPrice: {
      type: String,
      required: true
    },
    propSubProductSelectInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      layerBodyFlag: false
    };
  },
  computed: {
    stickyPriceInfo: {
      get() {
        const obj = {};
        let footObj = [];
        let layerObj = [];
        let payTypeCd = '24';
        obj.layerArray = [];
        obj.footArray = [];
        obj.footPrice = this.productPrice;
        obj.descYn = 'N';
        /**
         * case 1. 최초 진입 - foot : 출고가
         * case 2. 요금제 선택 - foot : 월 통신요금 layer : 출고가
         * case 3. 할인방법 선택 - foot : 예상 월 납부금액 layer : 휴대폰 월 할부금, 월 통신요금
         * case 4. 납부방법 선택
         * case 4-1 일시불 - foot : 휴대폰 일시불, 월 통신요금
         * case 4-2 그외 - foot : 예상 월 납부금액 layer : 휴대폰 월 할부금, 월 통신요금
         */
        if (this.propSubProductSelectInfo.subscriptionId !== '') {
          if (this.propSubProductSelectInfo.subcommId !== '') {
            // case 4-1
            if (this.propSubProductSelectInfo.payTypeCd === '0') {
              // document.getElementById('layerBody').style.display = 'none';
              footObj = {
                footText: '휴대폰 일시불',
                footPrice: this.productPrice
              };
              obj.footArray.push(footObj);
              footObj = {
                footText: '월 통신요금',
                footPrice: this.propSubProductSelectInfo.subscriptionInfo.basicCharge
              };
              obj.footArray.push(footObj);
            } else {
              // document.getElementById('layerBody').style.display = 'block';
              // case 3, case 4-2
              if (this.propSubProductSelectInfo.payTypeCd !== '') {
                payTypeCd = this.propSubProductSelectInfo.payTypeCd;
              }
              footObj = {
                footText: '예상 월 납부금액',
                footPrice: this.propSubProductSelectInfo.finalAmt
              };
              obj.footArray.push(footObj);
              obj.descYn = 'Y';
              layerObj = {
                layerText: '휴대폰 월 할부금(' + payTypeCd + '개월)',
                layerPrice: this.propSubProductSelectInfo.installmentMonthAmt
              };
              obj.layerArray.push(layerObj);
              layerObj = { layerText: '출고가', layerPrice: this.productPrice };
              obj.layerArray.push(layerObj);
            }
          } else {
            // document.getElementById('layerBody').style.display = 'block';
            // case 2
            footObj = {
              footText: '월 통신요금',
              footPrice: this.propSubProductSelectInfo.subscriptionInfo.basicCharge
            };
            obj.footArray.push(footObj);
            layerObj = { layerText: '출고가', layerPrice: this.productPrice };
            obj.layerArray.push(layerObj);
          }
        } else {
          // case 1
          footObj = {
            footText: '출고가',
            footPrice: this.productPrice
          };
          obj.footArray.push(footObj);
        }
        return obj;
      },
      set(value) {}
    }
  },
  mounted() {
    this.$emit('mounted', this.$refs.stickyBar);
  },
  methods: {
    doOrder() {
      this.$emit('doOrder');
    },
    cartSave() {
      this.$emit('cartSave');
    },
    layerBodyBnt() {
      if (this.layerBodyFlag) {
        this.$refs.stickyBar.classList.remove('on');
      } else {
        this.$refs.stickyBar.classList.add('on');
      }
      this.layerBodyFlag = !this.layerBodyFlag;
    },
    /**
     * 일시불 선택
     */
    selectPayTypeByLumpSum() {
      if (this.stickyPriceInfo.subscriptionId !== '') {
      }
    }
  }
};
</script>
