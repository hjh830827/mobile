<template>
  <div class="opt-group group-order-confirm">
    <h2 class="opt-group-tit">주문 확인</h2>
    <div class="opt-group-con order-confirm-type">
      <h3 class="tit">{{ productSelectInfo.productGrpNm }}</h3>
      <span class="desc">{{ productSelectInfo.productNm }}</span>
      <div class="thumb-box">
        <img :src="productSelectInfo.defaultImg" alt="" />
      </div>
      <div class="order-detail-area">
        <table class="table-row-list">
          <caption>
            주문확인 요금상세
          </caption>
          <colgroup>
            <col style="width: 35%" />
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">휴대폰 월 할부금</th>
              <td>
                <strong class="price">{{ subProductSelectInfo.installmentMonthAmt | comma }}</strong>
                <span class="unit">원</span>
              </td>
            </tr>
            <tr>
              <th scope="row">월 통신 요금</th>
              <td>
                <strong class="price">{{ subProductSelectInfo.basicCharge | comma }}</strong>
                <span class="unit">원</span>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th scope="row"><strong>월 납부금액</strong></th>
              <td>
                <span class="block">
                  <strong class="price">{{ subProductSelectInfo.finalAmt | comma }}</strong
                  ><span class="unit"> 원/월</span>
                </span>
                <span class="block">
                  <em v-if="subProductSelectInfo.payTypeCd === '0'" class="small">통신요금 + 휴대폰 할부금 (일시불)</em>
                  <em v-if="subProductSelectInfo.payTypeCd !== '0'" class="small"
                    >통신요금 + 휴대폰 할부금 ({{ subProductSelectInfo.payTypeCd }}개월)</em
                  >
                </span>
                <a href="#none" class="block seller-txt-style btn-more" @click.prevent="openPopup"
                  >주문내역 자세히 보기</a
                >
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  filters: {
    comma(val) {
      if (val === undefined) {
        val = '0';
      }
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  },
  props: {
    // 모상품 데이터
    propProductSelectInfo: {
      type: Object,
      required: true
    },
    // 요금제 데이터
    propSubProductSelectInfo: {
      type: Object,
      required: true
    }
  },
  computed: {
    productSelectInfo() {
      console.log(this.propProductSelectInfo);
      return this.propProductSelectInfo;
    },
    subProductSelectInfo() {
      console.log(this.propSubProductSelectInfo);
      return this.propSubProductSelectInfo;
    }
  },
  mounted() {},
  methods: {
    /**
     * 주문내역 자세히보기 팝업 호출을 보여준다.
     * @function
     */
    openPopup() {
      try {
        this.$emit('openPopupOrderDetail');
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
