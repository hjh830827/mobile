<template>
  <div class="wrap seller-wrap seller-order-confirm">
    <div class="sticky-top">
      <div class="spot-step">
        <ol class="step-list">
          <!-- [D] 작성 완료시 end 클래스 추가, 현재페이지는 링크에 aria-current="step" 추가 -->
          <li class="step-item end">
            <a href="javascript:void(0)" class="link-block" @click.prevent="goPrevPage('product-select')"
              ><span>옵션/혜택</span></a
            >
          </li>
          <li class="step-item end">
            <a href="javascript:void(0)" class="link-block" @click.prevent="goPrevPage('skt-product-select')"
              ><span>가입 조건</span></a
            >
          </li>
          <li class="step-item">
            <a href="javascript:void(0)" class="link-block" aria-current="step" disabled><span>주문확인</span></a>
          </li>
        </ol>
      </div>
    </div>
    <main role="main" class="content" style="padding-bottom: 80px">
      <h1 class="g-invisible">주문확인</h1>
      <div class="l-grid l-seller">
        <!-- 한번 더 할인 -->
        <more-discount
          :coupon-list="couponList"
          :prop-coupon-dc-amt="orderSelectInfo.dcAmt"
          @openPopupCoupon="controlPopupCoupon"
        />
        <!-- //한번 더 할인 -->

        <!-- T 기프트 -->
        <gift-select
          :prop-select-tgift-info="orderSelectInfo.selectTgiftInfo"
          @openPopupGiftListSelect="controlPopupGiftList(true)"
        />
        <!-- //T 기프트 -->

        <!-- s: 주문 확인 -->
        <order-confirm
          :prop-product-select-info="productSelectInfo"
          :prop-sub-product-select-info="subProductSelectInfo"
          @openPopupOrderDetail="controlPopupOrderDetail(true)"
        />
        <!-- //e: 주문 확인 -->
        <!-- s: 유의사항 -->
        <a href="#none" class="seller-notice-link" @click.prevent="controlPopupCheckpoint(true)">유의사항 확인하기</a>
        <!-- //e: 유의사항 -->
      </div>
    </main>
    <!-- s: 하단 스티키 바 -->
    <sticky-bar @applicationForm="applicationForm" />
    <!-- //e: 하단 스티키 바 -->

    <!-- 쿠폰 레이어팝업 -->
    <pop-coupon
      :open-flag="popupCouponFlag"
      :coupon-list="couponList"
      @setCouponList="setCouponList"
      @closePopupCoupon="controlPopupCoupon"
    />
    <!-- //쿠폰 레이어팝업 -->

    <!-- T 기프트 목록 레이어팝업 -->
    <pop-gift-list-select
      :open-flag="popupGiftListFlag"
      :tgift-list="tgiftList"
      @selectTgfit="selectTgfit"
      @closePopup="controlPopupGiftList(false)"
    />
    <!-- //T 기프트 목록 레이어팝업 -->

    <!-- T 기프트 상세 레이어팝업 -->
    <pop-gift-detail
      :open-flag="popupGiftDetailFlag"
      :tgift-detail-info="tgiftDetailInfo"
      @closePopup="controlPopupGiftDetail"
    />
    <!-- //T 기프트 목록 레이어팝업 -->

    <!-- 주문내역 자세히보기 레이어팝업 -->
    <pop-order-detail
      :open-flag="popupOrderDetailFlag"
      :prop-product-select-info="productSelectInfo"
      :prop-sub-product-select-info="subProductSelectInfo"
      @closePopup="controlPopupOrderDetail(false)"
    />
    <!-- //주문내역 자세히보기 레이어팝업 -->

    <!-- 유의사항 레이어팝업 -->
    <pop-checkpoint :open-flag="popupCheckpointFlag" @closePopup="controlPopupCheckpoint(false)" />
    <!-- //유의사항 레이어팝업 -->
  </div>
</template>

<script>
// js
import baseMixin from '~/components/mixin/base';
import apiMixin from '~/components/mixin/api';
// import stickyMixin from '~/components/mixin/stickyBar';

// 컴포넌트
import MoreDiscount from '~/components/order/MoreDiscount.vue';
import GiftSelect from '~/components/order/GiftSelect.vue';
import OrderConfirm from '~/components/order/OrderConfirm.vue';
import StickyBar from '~/components/order/StickyBar.vue';
import PopCoupon from '~/components/popup/PopCoupon.vue';
import PopGiftListSelect from '~/components/popup/PopGiftListSelect.vue';
import PopGiftDetail from '~/components/popup/PopGiftDetail.vue';
import PopCheckpoint from '~/components/popup/PopCheckpoint.vue';
import PopOrderDetail from '~/components/popup/PopOrderDetail.vue';

export default {
  components: {
    MoreDiscount,
    GiftSelect,
    OrderConfirm,
    StickyBar,
    PopCoupon,
    PopGiftListSelect,
    PopGiftDetail,
    PopCheckpoint,
    PopOrderDetail
  },

  // SSR 렌더링 전
  async asyncDataData({ app }) {},
  mixins: [baseMixin, apiMixin],
  props: {},
  data() {
    return {
      // 페이지 타이틀
      title: '[상품 Mobile] detail | SK텔레콤 공식 온라인 쇼핑몰 T월드 다이렉트',
      // url parameter data
      svcMgmtNum: this.$store.state.SVC_MGMT_NUM,
      productGrpId: this.$store.state.PRODUCT_GRP_ID,
      categoryId: this.$store.state.CATEGORY_ID,
      popupCouponFlag: false,
      popupGiftListFlag: false,
      popupGiftDetailFlag: false,
      popupCheckpointFlag: false,
      popupOrderDetailFlag: false,
      couponList: [],
      tgiftList: [],
      tgiftDetailInfo: {},
      // 현재 페이지 데이터
      orderSelectInfo: {},
      // 이전 페이지 데이터
      productSelectInfo: {
        productGrpNm: '',
        productNm: ''
      },
      subProductSelectInfo: {}
    };
  },
  watch: {},
  created() {
    console.log('======넘어온 데이터 =========');
    console.log(this.$store.state.PHONE_PROD_SELECT_INFO);
    console.log(this.$store.state.SKT_PROD_SELECT_INFO);
    if (this.$store.state.PHONE_PROD_SELECT_INFO !== undefined) {
      this.productSelectInfo = this.$store.state.PHONE_PROD_SELECT_INFO;
      this.$set(
        this.productSelectInfo,
        'defaultImg',
        process.env.CND_WEB_RESOURCE_ROOT_PATH + '/pimg/phone' + this.productSelectInfo.mImage1
      );
    }

    if (this.$store.state.SKT_PROD_SELECT_INFO !== undefined) {
      this.subProductSelectInfo = this.$store.state.SKT_PROD_SELECT_INFO;
    }

    console.log('======현재 화면 저장 데이터 =========');
    console.log(this.$store.state.ORDER_CONFIRM);
    if (this.$store.state.ORDER_CONFIRM !== undefined) {
      this.orderConfirm = this.$store.state.ORDER_CONFIRM;
    }

    // 쿠폰 목록 조회
    this.setCouponList();
  },
  async mounted() {
    // this.setStickyBar(); -210118 삭제
  },
  methods: {
    /**
     * 쿠폰 목록 조회
     * @function
     * @param {String} categoryCd - 카테고리 CD
     * @param {String} custId - 화면에서 해당 정보 가지고 있을것인지 확인
     * @param {String} categoryId - 카테고리 ID
     * @param {String} productGrpId - 모상품그룹ID
     */
    setCouponList() {
      this.apiGetCouponList()
        .then(res => {
          this.couponList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * 쿠폰 팝업 flag 제어 및 선택한 쿠폰정보 set
     * @function
     * @param {Boolean} flag - 팝업 열기/닫기
     * @param {Object} selectCpnInfo - 선택한 쿠폰 정보
     */
    controlPopupCoupon(flag, selectCpnInfo) {
      try {
        this.popupCouponFlag = flag;
        if (!this.isEmpty(selectCpnInfo)) {
          this.$set(this.orderSelectInfo, 'couponId', selectCpnInfo.couponId);
          this.$set(this.orderSelectInfo, 'cpnNm', selectCpnInfo.cpnNm);
          this.$set(this.orderSelectInfo, 'couponIssueNo', selectCpnInfo.couponIssueNo);
          this.$set(this.orderSelectInfo, 'dcAmt', selectCpnInfo.dcAmt);
        }
      } catch (e) {
        console.log(e);
      }
    },
    /**
     * T기프트 목록 조회 - 팝업 호출시에 조회
     * @function
     * @param {String} productGrpId - 모상품그룹ID
     */
    setTgiftList(productGrpId) {
      this.apiGetTgiftList(productGrpId)
        .then(res => {
          this.tgiftList = res.data;
          for (const i in this.tgiftList) {
            this.tgiftList[i].imageUrl = process.env.CND_WEB_RESOURCE_ROOT_PATH + this.tgiftList[i].image1;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * T 기프트 목록 팝업 flag 제어
     */
    controlPopupGiftList(flag) {
      try {
        if (flag) {
          this.setTgiftList(this.productGrpId);
        }
        this.popupGiftListFlag = flag;
      } catch (e) {
        console.log(e);
      }
    },
    /**
     * T 기프트 목록에서 선택한 T 기프트 정보
     */
    selectTgfit(selectTgiftInfo) {
      this.selectTgfitDetail(selectTgiftInfo.giftId);
      this.controlPopupGiftDetail(true);
    },
    /**
     * T 기프트 상세 조회
     * @function
     * @param {String} giftId - 기프트ID
     */
    selectTgfitDetail(giftId) {
      this.apiGetTgiftDetail(giftId)
        .then(res => {
          this.tgiftDetailInfo = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * T 기프트 상세 팝업 flag 제어
     */
    controlPopupGiftDetail(flag, tgiftInfo) {
      try {
        if (!this.isEmpty(tgiftInfo)) {
          // 선택한 T 기프트 set
          console.log('=====================');
          console.log(tgiftInfo);
          this.$set(this.orderSelectInfo, 'selectTgiftInfo', tgiftInfo);

          // T기프트 목록 close
          this.popupGiftListFlag = false;
        }
        this.popupGiftDetailFlag = flag;
      } catch (e) {
        console.log(e);
      }
    },
    /**
     * 주문내역 자세히보기 팝업 flag 제어
     */
    controlPopupOrderDetail(flag) {
      try {
        this.preventBodyScroll(flag);
        this.popupOrderDetailFlag = flag;
      } catch (e) {
        console.log(e);
      }
    },
    /**
     * 유의사항 팝업 flag 제어
     */
    controlPopupCheckpoint(flag) {
      try {
        this.popupCheckpointFlag = flag;
      } catch (e) {
        console.log(e);
      }
    },
    /**
     * 이전 페이지 이동
     * @function
     * @param {String} str : 이동할 페이지
     */
    goPrevPage(str) {
      // 현 페이지 데이터 저장
      this.$store.state.ORDER_CONFIRM = this.orderSelectInfo;
      this.$router.push({ name: str, params: { internal: 'Y' } });
    },
    /**
     * 신청서 작성
     * @function
     */
    applicationForm() {
      // 신청서 작성 api 스펙 확인 후 적용
      console.log('======applicationForm===========');
      console.log(this.orderSelectInfo);
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
