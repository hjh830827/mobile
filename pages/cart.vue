<template>
  <!-- popup -->
  <div class="popup pop-seller pop-ordering-list">
    <div class="popup-body">
      <popup-header :title="'장바구니'" />

      <!-- popup-content -->
      <div role="main" class="popup-content">
        <div class="l-grid">
          <p class="txt-summary">현재 주문 진행 중 (<em>{{cartList.length}}</em>건)</p>
          <!-- [D] 진행중 주문 있을 시 노출-->
          <div class="list-ordering" v-if="cartList.length > 0">
            <span class="c-ick-var" v-for="(list, index) in cartList">
                <input type="radio" name="inOrdering"
                       :id="'ordering' + index"
                       :disabled="list.productStockYn === 'N'"
                        @change="handleChangeRadio(list)"> <!-- TODO 해당 상품 품절 여부 -->
                <label :for="'ordering' + index" class="item-ordering">
                    <div class="spec-info">
                        <em class="title-device">{{list.productId}}</em>
                        <span class="option">
                            <span class="capacity">{{list.phoneCapacity}}</span>
                            <span class="color">{{list.colorName}}</span>
                            <!-- [D] 배경색 인라인 스타일로 지정 -->
                            <i class="color-chip" v-if="" style="background-color: #3d5b67"></i><!--블루-->
                            <i class="color-chip" v-if="" style="background-color: #ff0000"></i><!--레드-->
                        </span>
                    </div>
                    <div class="order-info">
                        <span class="thumb-product">
                            <img src="https://cdnm.shop.tworld.co.kr/pimg/phone/A1/A1DR/default/A1DR_001_13.jpg" alt="휴대폰 썸네일 이미지">
                        </span>
                        <div class="tbl-order-info">
                            <table class="table-row-list">
                                <caption>주문 조건</caption>
                                <colgroup>
                                    <col style="width: 46px;">
                                    <col>
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <th scope="row">가입유형</th>
                                        <td>{{list.entryCd}}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">할인방법</th>
                                        <td>{{list.commitmentCd}}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">납부방법</th>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="order-price">
                        <table class="table-row-list">
                            <caption>납부 정보</caption>
                            <colgroup>
                                <col style="width:30%;">
                                <col>
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th scope="row">요금제</th>
                                    <td>T플랜 에센스 + 다이렉트 플랜</td>
                                </tr>
                                <tr>
                                    <th scope="row">납부요금</th>
                                    <td>
                                        휴대폰 월 <em>47,729</em>원<br>
                                        + 월 통신요금 <em>69,000</em>원
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">예상 월 납부금액</th>
                                    <td><em>79,330</em>원 <span class="txt-ref">(할부수수료 5.9% 포함)</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p v-if="list.productStockYn === 'N'" class="txt-warn">해당 주문은 품절 등의 이유로 주문이 불가능합니다.</p>
                </label>
            </span>
          </div>
          <!-- [D] 진행중 주문 없을 시 노출-->
          <p class="txt-no-data" v-else>현재 진행중인 주문이<br>없습니다.</p>
        </div>
      </div>
      <!-- //popup-content -->

      <div class="popup-footer">
        <div class="l-grid">
          <div class="btn-area">
            <!-- [D] 버튼 비활성화 disabled 속성 추가 -->
            <button type="button" class="btn-primary"
                    :disabled="selectedCartList === ''"
                    @click="handleOrder">주문하기</button>
            <button type="button" class="btn-default" data-modal=".modal-seller-detail-a4" data-modal-mode="overlap"
                    :disabled="selectedCartList === ''"
                    @click="handleDelete">삭제하기</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 알림 모달 레이어 -->
    <!-- [D] 오픈시 div.modal에 display:block, body에 j-noscroll클래스 추가 -->
<!--    <div class="modal modal-seller-detail-a4" role="dialog" aria-modal="true" style="display:block;">
      <div class="modal-dialog" role="document">
        <div class="modal-body">
          <div class="modal-header">
            <h1 class="modal-title">알림</h1>
          </div>

          <div class="modal-content">
            <p class="paragraph">해당 주문을<br>삭제 하시겠습니까?
            </p>
          </div>

          <div class="modal-footer">
            <span class="group-r">
              <button type="button" class="btn-default-text">취소</button>
              <button type="button" class="btn-secondary-text">삭제</button>
            </span>
          </div>
        </div>
      </div>
      <div class="dimmed"></div>
    </div>-->
    <!-- //알림 모달 레이어 -->

  </div>
  <!-- //popup -->
</template>

<script>
import PopupHeader from '~/components/layout/PopupHeader';
import baseMixin from "~/components/mixin/base";
import apiMixin from "~/components/mixin/api";
import Modal from "~/components/common/modal";

export default {
  components: {
    PopupHeader
  },
  mixins: [baseMixin, apiMixin],
  // SSR 렌더링 전
  async asyncData({ params }) {
  },
  data() {
    return {
      // 페이지 타이틀
      title: '[팝업] 장바구니 | SK텔레콤 공식 온라인 쇼핑몰 T월드 다이렉트',
      cartList: [],
      selectedCartList: ""
    };
  },
  created() {
    this.init()
  },
  mounted() {
  },
  methods: {
    handleOrder() {
      Modal.confirm('선택한 상품을<br>주문 하시겠습니까?').then((result)=>{
        if(result === 'confirm') {
          //this.orderCartList(this.selectedCartList);
          alert('API 연동작업 준비중');
        }
      });
    },
    handleDelete() {
      let options = {
        confirmButtonText: '삭제',
      }
      Modal.confirm('해당 주문을<br>삭제 하시겠습니까?', options).then((result)=>{
        if(result === 'confirm') {
          //this.deleteCartList(this.selectedCartList);
          alert('API 연동작업 준비중');
        }
      });
    },
    handleChangeRadio(list) {
      this.selectedCartList = list;
    },

    init() {
      //this.getCartList();
      this.cartList = this.$store.state.cart.cartList;
    },

    /**
     * 장바구니 삭제
     * @function
     * @param {String} svcMgmtNum 서비스관리번호
     * @param {String} cartMgmtNum 장바구니일련번호
     */
    async deleteCartList(selectedCartList) {
      let params = {
        svcMgmtNum : selectedCartList.svcMgmtNum,
        cartMgmtNum: selectedCartList.cartMgmtNum
      }
      let response = await this.apiDeleteCartList(params);
      //TODO reload cartlist
    },
    /**
     * 장바구니 조회
     * @function
     * @param {String} svcMgmtNum 서비스관리번호
     */
    async getCartList() {
      let svcMgmtNum = '';
      //let response = await this.apiGetCartList(svcMgmtNum);
      //let response.respBody;
      /*this.cartList = [
        {
          svcMgmtNum: 'String',
          cartMgmtNum: '',
          categoryId: '',
          productGrpId: '',
          productGrpNm: '',
          productId: '',
          productStockYn: 'Y',//모상품 재고 여부 (TODO 추가 여부 확인 필요)
          modelNo: '',
          colorName: '',
          colorSeq: '',
          phoneCapacity: '',
          mImage1: '',
          mImage2: '',
          mImage3: '',
          mImage4: '',
          contents: '',
          dlvTyp: '',
          invrNm: '',
          zip: '',
          basAddr: '',
          dtlAddr: '',
          mobileNo: '',
          entryCd: '',
          subscriptionId: '',
          subscriptionNm: '',
          dataDefaultQty: '',
          dataDtlPhrs: '',
          subscriptionGuidDtl: '',
          optSelMndtCnt: '',
          basicCharge: '',
          productPrice: '',
          benefit: [
            {
              subscriptionId: '',
              benfCd: '',
              benfNm: '',
              optDfltYn: '',
              optYn: '',
              benfImgPath: ''
            }
          ],
          commitmentCd: '',
          subcommId: '',
          fmlyDcYn: '',
          wlfDcYn: '',
          fmlyDcAmt: '',
          wlfDcAmt: ''
        },
        {
          svcMgmtNum: 'String',
          cartMgmtNum: '',
          categoryId: '',
          productGrpId: '',
          productGrpNm: '',
          productId: '',
          productStockYn: 'N',//모상품 재고 여부 (TODO 추가 여부 확인 필요)
          modelNo: '',
          colorName: '',
          colorSeq: '',
          phoneCapacity: '',
          mImage1: '',
          mImage2: '',
          mImage3: '',
          mImage4: '',
          contents: '',
          dlvTyp: '',
          invrNm: '',
          zip: '',
          basAddr: '',
          dtlAddr: '',
          mobileNo: '',
          entryCd: '',
          subscriptionId: '',
          subscriptionNm: '',
          dataDefaultQty: '',
          dataDtlPhrs: '',
          subscriptionGuidDtl: '',
          optSelMndtCnt: '',
          basicCharge: '',
          productPrice: '',
          benefit: [
            {
              subscriptionId: '',
              benfCd: '',
              benfNm: '',
              optDfltYn: '',
              optYn: '',
              benfImgPath: ''
            }
          ],
          commitmentCd: '',
          subcommId: '',
          fmlyDcYn: '',
          wlfDcYn: '',
          fmlyDcAmt: '',
          wlfDcAmt: ''
        },
        {
          svcMgmtNum: 'String',
          cartMgmtNum: '',
          categoryId: '',
          productGrpId: '',
          productGrpNm: '',
          productId: '',
          productStockYn: 'N',//모상품 재고 여부 (TODO 추가 여부 확인 필요)
          modelNo: '',
          colorName: '',
          colorSeq: '',
          phoneCapacity: '',
          mImage1: '',
          mImage2: '',
          mImage3: '',
          mImage4: '',
          contents: '',
          dlvTyp: '',
          invrNm: '',
          zip: '',
          basAddr: '',
          dtlAddr: '',
          mobileNo: '',
          entryCd: '',
          subscriptionId: '',
          subscriptionNm: '',
          dataDefaultQty: '',
          dataDtlPhrs: '',
          subscriptionGuidDtl: '',
          optSelMndtCnt: '',
          basicCharge: '',
          productPrice: '',
          benefit: [
            {
              subscriptionId: '',
              benfCd: '',
              benfNm: '',
              optDfltYn: '',
              optYn: '',
              benfImgPath: ''
            }
          ],
          commitmentCd: '',
          subcommId: '',
          fmlyDcYn: '',
          wlfDcYn: '',
          fmlyDcAmt: '',
          wlfDcAmt: ''
        }
      ]*/
    },
    /**
     * 주문하기
     * @function
     */
    async orderCartList() {

    }
  },
  head() {
    return {
      title: this.title
    };
  }
};
</script>

<style></style>
