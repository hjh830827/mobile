<template>
  <div>
    <div class="wrap seller-wrap seller-join-conditions">
      <div class="sticky-top">
        <div class="spot-step">
          <ol class="step-list">
            <!-- [D] 작성 완료시 end 클래스 추가, 현재페이지는 링크에 aria-current="step" 추가 -->
            <li class="step-item end">
              <a href="javascript:void(0)" class="link-block" @click.prevent="productSelect"><span>옵션/혜택</span></a>
            </li>
            <li class="step-item">
              <a href="javascript:void(0)" class="link-block" aria-current="step"><span>가입 조건</span></a>
            </li>
            <li class="step-item">
              <a href="javascript:void(0)" class="link-block"><span>주문확인</span></a>
            </li>
          </ol>
        </div>
      </div>
      <main role="main" class="content" style="padding-bottom: 200px">
        <h1 class="g-invisible">가입조건</h1>
        <div class="l-grid l-seller">
          <!-- s: 가입유형 -->
          <join-type
            :default-subscription-list="defaultSubscriptionList"
            :props-entry-cd="subProductSelectInfo.entryCd"
            @selectEntryCd="selectEntryCd"
          />
          <!-- //e: 가입유형 -->

          <!-- s: 요금제 선택 -->
          <subscription-select
            ref="subscriptionSelect"
            :subscription-list="subscriptionList"
            :prop-subscription-id="subProductSelectInfo.subscriptionId"
            :prop-select-benefit="subProductSelectInfo.benefit"
            @selectSubscriptionInfo="selectSubscriptionInfo"
            @selectBenefitInfo="selectBenefitInfo"
            @openPopupSubscriptionSelect="controlPopupSubscriptionSelect(true)"
            @openPopupBenefitDetail="controlPopupBenefitDetail(true)"
          />
          <!-- //e: 요금제 선택 -->

          <!-- s: 할인 방법 -->
          <discount-method-select
            :prop-child-list="childList"
            :prop-subscription-id="subProductSelectInfo.subscriptionId"
            :prop-subcomm-id="subProductSelectInfo.subcommId"
            @selectDiscountMethod="selectDiscountMethod"
          />
          <!-- //e: 할인 방법 -->

          <!-- s: 온가족 할인-->
          <familydc-select
            :fmly-wlf-info="fmlyWlfInfo"
            :prop-fmly-dc-cd="subProductSelectInfo.fmlyDcCd"
            @selectFmlyDcCd="selectFmlyDcCd"
          />
          <!-- //e: 온가족 할인-->
          <!-- s:복지 할인-->
          <welfaredc-select
            :fmly-wlf-info="fmlyWlfInfo"
            :prop-wlf-yn="subProductSelectInfo.wlfYn"
            @selectWlfYn="selectWlfYn"
          />
          <!-- //e: 복지 할인-->

          <!-- s: 납부 방법 -->
          <pay-type-select
            :prop-entry-cd="subProductSelectInfo.entryCd"
            :prop-pay-type-cd="subProductSelectInfo.payTypeCd"
            @selectPayType="selectPayType"
          />
          <!-- //e: 납부 방법 -->
        </div>
      </main>
      <!-- s: 하단 스티키 바 -->
      <sticky-bar
        ref="selectPayType"
        :prop-order-disable-flag="orderDisableFlag"
        :product-price="productSelectInfo.productPrice"
        :prop-sub-product-select-info="subProductSelectInfo"
        @cartSave="cartSave"
        @mounted="stickyBarMounted"
        @doOrder="doOrder"
      />
      <!-- //e: 하단 스티키 바 -->
    </div>
    <!-- 요금제 선택 레이어팝업 -->
    <pop-subscription-select
      ref="search"
      :open-flag="popupSubscriptionSelectFlag"
      @closePopup="controlPopupSubscriptionSelect"
    />
    <!-- 혜택 자세히보기 레이어팝업 -->
    <pop-benefit-detail
      :open-flag="popupBenefitDetailFlag"
      :subscription-list="subscriptionList"
      :prop-subscription-id="subProductSelectInfo.subscriptionId"
      @closePopup="controlPopupBenefitDetail"
    />
  </div>
</template>

<script>
// js
import baseMixin from '~/components/mixin/base';
import apiMixin from '~/components/mixin/api';
import stickyMixin from '~/components/mixin/stickyBar';

// 컴포넌트
import SubscriptionSelect from '~/components/subproduct/SubscriptionSelect.vue';
import DiscountMethodSelect from '~/components/subproduct/DiscountMethodSelect.vue';
import FamilydcSelect from '~/components/subproduct/FamilydcSelect.vue';
import WelfaredcSelect from '~/components/subproduct/WelfaredcSelect.vue';
import PayTypeSelect from '~/components/subproduct/PayTypeSelect.vue';
import StickyBar from '~/components/subproduct/StickyBar.vue';
import JoinType from '~/components/subproduct/JoinType.vue';
import PopSubscriptionSelect from '~/components/popup/PopSubscriptionSelect.vue';
import PopBenefitDetail from '~/components/popup/PopBenefitDetail.vue';
import {CART_SAVE} from '~/constants';
import Modal from "~/components/common/modal";

export default {
  components: {
    SubscriptionSelect,
    DiscountMethodSelect,
    FamilydcSelect,
    WelfaredcSelect,
    PayTypeSelect,
    StickyBar,
    PopSubscriptionSelect,
    PopBenefitDetail,
    JoinType
  },
  mixins: [baseMixin, apiMixin, stickyMixin],
  props: {},
  // SSR 렌더링 전
  async asyncData({ params }) {},
  data() {
    return {
      // 페이지 타이틀
      title: '[상품 Mobile] detail | SK텔레콤 공식 온라인 쇼핑몰 T월드 다이렉트',
      // url parameter data
      svcMgmtNum: this.$store.state.SVC_MGMT_NUM,
      productGrpId: this.$store.state.PRODUCT_GRP_ID,
      categoryId: this.$store.state.CATEGORY_ID,
      // 1 페이지에서 전달받는 데이터
      productSelectInfo: {
        productPrice: '0'
      },
      defaultSubscriptionList: [], // 디폴트 요금제 목록
      subscriptionList: [], // 요금제 목록
      // 온가족 / 복지 할인 여부
      fmlyWlfInfo: { fmlyDcCd: 'N', wlfDcCd: 'N', fmlyDcAmt: '', wlfDcAmt: '' },
      // 자상품 정보
      childList: [],
      popupSubscriptionSelectFlag: false, // 요금제 선택 팝업 flag
      popupBenefitDetailFlag: false, // 헤택 자세히 보기 팝업 flag

      // 선택한 상품 정보
      subProductSelectInfo: {
        subscriptionId: '',
        entryCd: '',
        payTypeCd: '',
        fmlyDcCd: '',
        fmlyDcAmt: '',
        wlfYn: '',
        wlfDcAmt: '',
        subcommId: '',
        benefit: []
      },
      cartList: []//장바구니에 담긴 상품 리스트
    };
  },
  computed: {
    // 주문하기 버튼 flag
    orderDisableFlag: {
      get() {
        if (
          this.isEmpty(this.subProductSelectInfo.entryCd) ||
          this.isEmpty(this.subProductSelectInfo.subscriptionId) ||
          this.isEmpty(this.subProductSelectInfo.commitmentCd) ||
          this.isEmpty(this.subProductSelectInfo.subcommId) ||
          this.isEmpty(this.subProductSelectInfo.payTypeCd) ||
          (!this.isEmpty(this.fmlyWlfInfo.fmlyDcAmt) && this.isEmpty(this.subProductSelectInfo.fmlyDcCd)) ||
          (!this.isEmpty(this.fmlyWlfInfo.wlfDcAmt) && this.isEmpty(this.subProductSelectInfo.wlfYn))
        ) {
          return true;
        } else {
          return false;
        }
      },
      set(value) {}
    }
  },
  watch: {},
  created() {
    try {
      if (this.$store.state.PHONE_PROD_SELECT_INFO === undefined) {
        // 바로 진입 제어
        // this.$router.go(-1);
      } else {
        console.log('======넘어온 데이터 =========');
        console.log(this.$store.state.PHONE_PROD_SELECT_INFO);
        console.log('======현재 화면 저장 데이터 =========');
        console.log(this.$store.state.SKT_PROD_SELECT_INFO);

        // 넘어온 데이터
        this.productSelectInfo = this.$store.state.PHONE_PROD_SELECT_INFO;
        // 현재 화면 데이터 set
        if (this.$store.state.SKT_PROD_SELECT_INFO !== undefined) {
          this.subProductSelectInfo = this.$store.state.SKT_PROD_SELECT_INFO;
        }
      }
      // 디폴트 요금제 조회
      this.setDefaultSubscription(this.categoryId, this.productSelectInfo.productId, this.svcMgmtNum, '');

      // 온가족 / 복지 할인 여부 조회
      if (!this.isEmpty(this.subProductSelectInfo.subscriptionId)) {
        this.setFmlyWlfYn(this.subProductSelectInfo.subscriptionId);
      }
    } catch (e) {
      console.log(e);
    }
  },
  async mounted() {
    this.setStickyBar();
  },
  methods: {
    /**
     * 디폴트 요금제 조회
     * @function
     * @param {String} 서비스관리번호
     * @param {String} 카테고리ID
     * @param {String} 모상품ID
     * @param {String} 가입유형 - 초기진입시 default 없음.
     */
    setDefaultSubscription(categoryId, productId, svcMgmtNum, entryCd) {
      this.apiGetDefaultSubscription(categoryId, productId, svcMgmtNum, entryCd)
        .then(res => {
          // ui 필요 데이터  set
          for (const i in res.data) {
            if (res.data[i].subscription.length > 0) {
              res.data[i].entryDisableFlag = false;
              for (const j in res.data[i].subscription) {
                if (res.data[i].subscription[j].badgeTyp === 'U') {
                  res.data[i].subscription[j].badgeNum = 1;
                  res.data[i].subscription[j].badgeName = '사용중';
                } else if (res.data[i].subscription[j].badgeTyp === 'P') {
                  res.data[i].subscription[j].badgeNum = 3;
                  res.data[i].subscription[j].badgeName = 'AI Pick';
                } else if (res.data[i].subscription[j].badgeTyp === 'E') {
                  res.data[i].subscription[j].badgeNum = 2;
                  res.data[i].subscription[j].badgeName = '추천';
                }
              }
            } else {
              res.data[i].entryDisableFlag = true;
            }
          }
          this.defaultSubscriptionList = res.data;

          // 요금제 목록 노출
          this.setSubscriptionList();
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     *  할인방법(자상품) 정보 조회
     * @function
     * @param {String} productId - 모상품 ID
     * @param {String} entryCd - 가입유형 코드
     * @param {String} subscriptionId - 요금제ID
     */
    setChildList(productId, entryCd, subscriptionId) {
      this.apiGetChildList(productId, entryCd, subscriptionId)
        .then(res => {
          this.childList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * 온가족 / 복지 할인 여부 조회
     * @function
     * @param {String} subscriptionId - 요금제 ID
     */
    setFmlyWlfYn(subscriptionId) {
      this.apiGetFmlyWlfYn(subscriptionId, this.svcMgmtNum)
        .then(res => {
          this.fmlyWlfInfo = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * 가입 유형 선택 - joinType에서 선택한 가입 유형 정보를 set
     * @function
     * @param {String} entryCd - 가입 유형
     */
    selectEntryCd(entryCd) {
      this.subProductSelectInfo = {
        subscriptionId: '',
        entryCd: '',
        payTypeCd: '',
        fmlyDcCd: '',
        wlfYn: '',
        fmlyDcAmt: '',
        wlfDcAmt: '',
        subcommId: '',
        benefit: []
      }; // 선택 정보 초기화
      this.fmlyWlfInfo = { fmlyDcCd: 'N', wlfDcCd: 'N', fmlyDcAmt: '', wlfDcAmt: '' };

      this.subProductSelectInfo.entryCd = entryCd;
      this.setSubscriptionList(entryCd);
    },
    /**
     * 요금제 목록 노출
     * @function
     * @param {String} entryCd  가입유형 - entryCd 가 비어있으면 초기 조회
     */
    setSubscriptionList(entryCd) {
      for (const i in this.defaultSubscriptionList) {
        if (this.isEmpty(entryCd)) {
          this.subProductSelectInfo.entryCd = this.defaultSubscriptionList[0].entryCd;
          this.subscriptionList = this.defaultSubscriptionList[0].subscription;
          // 할인방법 설정
          this.setChildList(
            this.productSelectInfo.productId,
            this.defaultSubscriptionList[0].entryCd,
            this.subscriptionList[0].subscriptionId
          );
          break;
        } else if (this.defaultSubscriptionList[i].entryCd === entryCd) {
          this.subscriptionList = this.defaultSubscriptionList[i].subscription;
          break;
        }
      }
    },
    /**
     * 요금제 선택 - subscriptionSelect에서 선택한 요금제 정보 set
     * @function
     * @param {Object} subscriptionInfo - 요금제 정보
     * @param {Array} benefitList - 혜택 목록
     */
    selectSubscriptionInfo(subscriptionInfo, benefitList) {
      const entryCd = this.subProductSelectInfo.entryCd;
      let benefit = [];
      // 요금제 하위 데이터 초기화
      this.subProductSelectInfo.payTypeCd = '';
      this.subProductSelectInfo.fmlyDcCd = '';
      this.subProductSelectInfo.wlfYn = '';
      this.subProductSelectInfo.fmlyDcAmt = '';
      this.subProductSelectInfo.wlfDcAmt = '';
      this.subProductSelectInfo.subcommId = '';
      if (this.isEmpty(benefitList)) {
        this.$set(this.subProductSelectInfo, 'benefit', benefit);
      } else {
        benefit = benefitList;
        this.selectBenefitInfo(benefitList);
      }
      this.$refs.subscriptionSelect.selectbenefit(benefit);

      // 선택한 요금제 정보 set
      this.subProductSelectInfo.subscriptionId = subscriptionInfo.subscriptionId;
      this.subProductSelectInfo.subscriptionNm = subscriptionInfo.subscriptionNm;
      this.subProductSelectInfo.subscriptionInfo = subscriptionInfo;

      // 할인 방법 영역 할인금액 조회
      this.setChildList(
        this.productSelectInfo.productId,
        this.subProductSelectInfo.entryCd,
        subscriptionInfo.subscriptionId
      );

      // 온가족 / 복지 할인 여부 조회
      this.setFmlyWlfYn(subscriptionInfo.subscriptionId);

      // 혜택이 없을시 자동 할인 방법 자동 선택
      if (subscriptionInfo.benefit.length === 0) {
        this.selectDiscountMethodByOuto();
      }
    },
    /**
     * 추가혜택 선택
     * @function
     */
    selectBenefitInfo(benefitList) {
      const benefit = [];
      for (const i in this.subProductSelectInfo.subscriptionInfo.benefit) {
        for (const j in benefitList) {
          if (this.subProductSelectInfo.subscriptionInfo.benefit[i].benfCd === benefitList[j]) {
            benefit.push(this.subProductSelectInfo.subscriptionInfo.benefit[i]);
          }
        }
      }
      this.$set(this.subProductSelectInfo, 'benefit', benefit);
      // 혜택을 전부 선택 & 할인방법 미선택시 최대 할인 방법 자동 선택
      if (
        benefitList.length === this.subProductSelectInfo.subscriptionInfo.optSelMndtCnt &&
        this.isEmpty(this.subProductSelectInfo.subcommId)
      ) {
        this.selectDiscountMethodByOuto();
      }
    },
    /**
     * 할인방법 자동 선택
     * @function
     */
    selectDiscountMethodByOuto() {
      let checkAmt = 0;
      let maxIndex = 0;
      for (const i in this.childList) {
        if (this.childList[i].totalDisamt > checkAmt) {
          checkAmt = this.childList[i].totalDisamt;
          maxIndex = i;
        }
      }
      // 할인방법 선택
      this.selectDiscountMethod(this.childList[maxIndex]);
    },
    /**
     * 온가족 할인 여부 선택
     * @function
     * @param {String} fmlyDcCd - Y
     * @param {String} fmlyDcAmt -
     */
    selectFmlyDcCd(fmlyDcCd, fmlyDcAmt) {
      this.subProductSelectInfo.fmlyDcCd = fmlyDcCd;
      if (fmlyDcCd === 'Y') {
        this.subProductSelectInfo.fmlyDcAmt = fmlyDcAmt;
      } else {
        this.subProductSelectInfo.fmlyDcAmt = '';
      }
      this.setMonthlyAmt();
    },
    /**
     * 복지 할인 여부 선택
     * @function
     * @param {String} wlfYn - Y
     * @param {String} wlfDcAmt -
     */
    selectWlfYn(wlfYn, wlfDcAmt) {
      this.subProductSelectInfo.wlfYn = wlfYn;
      if (wlfYn === 'Y') {
        this.subProductSelectInfo.wlfDcAmt = wlfDcAmt;
      } else {
        this.subProductSelectInfo.wlfDcAmt = '';
      }
      this.setMonthlyAmt();
    },
    /**
     * 할인방법 선택
     * @function
     * @param {Object} discountMethodInfo - 할인방법 정보
     */
    selectDiscountMethod(discountMethodInfo) {
      this.$set(this.subProductSelectInfo, 'commitmentCd', discountMethodInfo.commitmentCd);
      this.$set(this.subProductSelectInfo, 'subcommId', discountMethodInfo.subcommId);
      this.$set(this.subProductSelectInfo, 'installmentTerm', discountMethodInfo.installmentTerm);
      this.$set(this.subProductSelectInfo, 'subcommDisamt', discountMethodInfo.subcommDisamt);
      this.$set(this.subProductSelectInfo, 'totalDisamt', discountMethodInfo.totalDisamt);
      // 월 납부금액 계산
      this.setMonthlyAmt();
    },
    /**
     * 월 납부금액 계산
     */
    setMonthlyAmt() {
      // 필수값 체크
      if (
        this.isEmpty(this.subProductSelectInfo.entryCd) ||
        this.isEmpty(this.subProductSelectInfo.subscriptionId) ||
        this.isEmpty(this.subProductSelectInfo.installmentTerm) ||
        this.isEmpty(this.subProductSelectInfo.subcommId)
      ) {
        return false;
      }

      // 월 납부금 계산
      this.apiGetMonthlyAmt(
        this.productSelectInfo.productId,
        this.subProductSelectInfo.entryCd,
        this.subProductSelectInfo.installmentTerm,
        this.subProductSelectInfo.subscriptionId,
        this.subProductSelectInfo.subcommId,
        this.subProductSelectInfo.fmlyDcAmt,
        this.subProductSelectInfo.wlfDcAmt
      )
        .then(res => {
          this.$set(this.subProductSelectInfo, 'finalAmt', '0');
          this.$set(this.subProductSelectInfo, 'finalAmt', res.data.finalAmt);
          this.$set(this.subProductSelectInfo, 'installmentMonthAmt', res.data.installmentMonthAmt);
          this.$set(this.subProductSelectInfo, 'basicCharge', res.data.basicCharge);
          this.$set(this.subProductSelectInfo, 'subcomDisamt', res.data.subcomDisamt);
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * 납부방법 선택
     * @function
     * @param {Object} payTypeCd - 납부방법 CD
     */
    selectPayType(payTypeCd) {
      this.$set(this.subProductSelectInfo, 'payTypeCd', payTypeCd);
      if (payTypeCd === '0') {
        this.$refs.selectPayType.selectPayTypeByLumpSum();
      }
      this.setMonthlyAmt();
    },

    /**
     * 혜택 자세히 보기 팝업 flag 제어
     */
    controlPopupBenefitDetail(flag, subscriptionInfo, benefitList) {
      try {
        this.preventBodyScroll(flag); // 팝업 오픈 상태에서는 아래 컨텐츠 Scroll 방지.
        this.popupBenefitDetailFlag = flag;
        if (!this.isEmpty(subscriptionInfo)) {
          this.selectSubscriptionInfo(subscriptionInfo, benefitList);
        }
      } catch (e) {
        console.log(e);
      }
    },
    /**
     * 요금제 목록 팝업 flag 제어 - TODo : 추후 요금제 팝업 개발후 적용 예정
     */
    controlPopupSubscriptionSelect(flag, subscriptionInfo) {
      try {
        this.preventBodyScroll(flag); // 팝업 오픈 상태에서는 아래 컨텐츠 Scroll 방지.
        this.popupSubscriptionSelectFlag = flag;
        if (!this.isEmpty(subscriptionInfo)) {
          // 선택한 요금제 set - 테스트를 위해 현재 정보 set
          for (const i in this.defaultSubscriptionList) {
            if (this.defaultSubscriptionList[i].entryCd === '31') {
              this.subscriptionList.unshift(this.defaultSubscriptionList[i].subscription[0]);
              break;
            }
          }
        }
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * 페이지 이동 메소드들
     */
    /**
     * 주문하기
     * @function
     */
    doOrder() {
      // store 데이터 set
      this.$store.state.SKT_PROD_SELECT_INFO = this.subProductSelectInfo;
      this.$router.push({ name: 'order-confirm', params: { internal: 'Y' } });
    },
    /**
     * 모상품 페이지 이동
     * @function
     */
    productSelect() {
      this.$store.state.SKT_PROD_SELECT_INFO = this.subProductSelectInfo;
      this.$router.push({ name: 'product-select', params: { internal: 'Y' } });
    },

    async cartSave() {
      // - 장바구니 담기 선택 시, 해당 주문 내역 저장한 상태로 장바구니 이동.
      // - 장바구니 내 진행중인 주문이 3건 이상인 경우 장바구니 담기 불가 alert 호출.
      this.cartList = await this.getCartList();
      if(this.cartList.length >= 3) {
        let options = {
          title: '장바구니 담기 불가 안내'
        }
        Modal.alert('현재 장바구니에 담을 수 있는\n' +
          '주문 진행 건수를 초과하여\n' +
          '장바구니 담기가 불가합니다.\n', options);
      } else {
        //Store에 저장.
        this.$store.commit(CART_SAVE, this.cartList);
        this.$router.push('/cart');
      }
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
      this.cartList = [
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
        /*{
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
        }*/
      ]

      return this.cartList;
    },
  },
  head() {
    return {
      title: this.title
    };
  }
};
</script>

<style></style>
