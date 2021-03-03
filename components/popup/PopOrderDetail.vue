<template>
  <div class="popup pop-seller pop-my-detail" :style="{ display: openFlag ? 'block' : 'none' }">
    <div class="popup-body">
      <div class="popup-header">
        <h1 class="popup-title">주문내역 자세히 보기</h1>
      </div>
      <div role="main" class="popup-content">
        <div class="order-detail-area">
          <h2 class="title">{{ productSelectInfo.productGrpNm }}</h2>
          <div class="con main-detail">
            <table class="table-row-list">
              <caption>
                주문내역 상세
              </caption>
              <colgroup>
                <col style="width: 30%" />
                <col />
              </colgroup>
              <tbody>
                <tr>
                  <th scope="row">색상</th>
                  <td>{{ productSelectInfo.colorName }}</td>
                </tr>
                <tr>
                  <th scope="row">용량</th>
                  <td>{{ productSelectInfo.phoneCapacity }}</td>
                </tr>
                <tr>
                  <th scope="row">요금제</th>
                  <td>{{ subProductSelectInfo.subscriptionNm }}</td>
                </tr>
                <tr>
                  <th scope="row">가입 유형</th>
                  <td>{{ subProductSelectInfo.entryNm }}</td>
                </tr>
                <tr>
                  <th scope="row">납부방법</th>
                  <td v-if="subProductSelectInfo.payTypeCd === '0'">일시불</td>
                  <td v-if="subProductSelectInfo.payTypeCd !== '0'">{{ subProductSelectInfo.payTypeCd }}개월 할부</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="con">
            <table class="table-row-list">
              <caption>
                주문내역 상세
              </caption>
              <colgroup>
                <col style="width: 30%" />
                <col />
              </colgroup>
              <tbody>
                <tr>
                  <th scope="row"><strong>휴대폰 출고가</strong></th>
                  <td>
                    <strong>{{ productSelectInfo.productPrice | comma }}원</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="con">
            <table class="table-row-list">
              <caption>
                주문내역 상세
              </caption>
              <colgroup>
                <col style="width: 30%" />
                <col />
              </colgroup>
              <tbody>
                <tr>
                  <th scope="row">휴대폰 할부 원금</th>
                  <td>{{ productSelectInfo.productPrice | comma }}원</td>
                </tr>
                <tr>
                  <th scope="row"><strong>휴대폰 월 할부금</strong> <span class="small">VAT 5.9% 포함</span></th>
                  <td>
                    <strong>{{ subProductSelectInfo.installmentMonthAmt | comma }}원</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="con">
            <table class="table-row-list">
              <caption>
                주문내역 상세
              </caption>
              <colgroup>
                <col style="width: 30%" />
                <col />
              </colgroup>
              <tbody>
                <tr>
                  <th scope="row"><strong>요금제 월 정액</strong></th>
                  <td>
                    <strong>{{ subProductSelectInfo.basicCharge | comma }}원/월</strong>
                  </td>
                </tr>
                <tr>
                  <th scope="row">{{ subProductSelectInfo.payTypeCd }} 개월 요금 할인 적용</th>
                  <td>
                    <span class="word-break">- {{ subProductSelectInfo.totalDisamt }}원</span>
                    <span class="word-break"
                      >(- {{ subProductSelectInfo.subcommDisamt | comma }} 원)x{{
                        subProductSelectInfo.payTypeCd
                      }}
                      개월</span
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="con">
            <table class="table-row-list">
              <caption>
                주문내역 상세
              </caption>
              <colgroup>
                <col style="width: 30%" />
                <col />
              </colgroup>
              <tbody>
                <tr>
                  <th scope="row"><strong>월 통신요금</strong></th>
                  <td>
                    <strong>{{ subProductSelectInfo.subcomDisamt | comma }}원</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="con">
            <table class="table-row-list">
              <caption>
                주문내역 상세
              </caption>
              <colgroup>
                <col style="width: 30%" />
                <col />
              </colgroup>
              <tbody>
                <tr>
                  <th scope="row"><strong>월 납부요금</strong></th>
                  <td>
                    <strong
                      ><span class="price">{{ subProductSelectInfo.finalAmt | comma }}</span
                      >원</strong
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-if="propgiftNm != ''" class="con">
            <table class="table-row-list">
              <caption>
                주문내역 상세
              </caption>
              <colgroup>
                <col style="width: 30%" />
                <col />
              </colgroup>
              <tbody>
                <tr>
                  <th scope="row">T기프트</th>
                  <td>{{ propgiftNm }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <button type="button" class="btn-close" @click.prevent="closePopup">
        <span class="ico-close">팝업 닫기</span>
      </button>
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
    openFlag: {
      type: Boolean,
      required: true,
      default: false
    },
    // 모상품 데이터
    propProductSelectInfo: {
      type: Object,
      required: true
    },
    // 요금제 데이터
    propSubProductSelectInfo: {
      type: Object,
      required: true
    },
    // T 기프트 이름
    propgiftNm: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {};
  },
  computed: {
    productSelectInfo() {
      return this.propProductSelectInfo;
    },
    subProductSelectInfo() {
      const obj = this.propSubProductSelectInfo;
      // 공통 코드 정리 예정
      if (obj.entryCd === '31') {
        obj.entryNm = '기기변경';
      } else if (obj.entryCd === '20') {
        obj.entryNm = '번호이동';
      } else if (obj.entryCd === '11') {
        obj.entryNm = '신규가입';
      }
      return obj;
    }
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
    }
  }
};
</script>
