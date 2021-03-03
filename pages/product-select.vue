<template>
  <!-- [D] div.wrap에 클래스 product-detail-page 추가
 		header가 상단 고정을 경우 div.wrap에 클래스 header-sticky 추가 -->
  <div class="wrap header-sticky seller-product-detail">
    <page-header />
    <main role="main" class="content" style="padding-bottom: 114px">
      <div class="l-grid">
        <div class="seller-detail-header">
          <product-header />
          <!-- key visual -->
          <product-key-visual :image-list="imageList" />
          <a href="#none" class="link-kakako-chat" target="_blank" @click.prevent="openKakaoChat">
            카카오톡 채팅 연결하기
          </a>
        </div>

        <!-- 색상선택 -->
        <product-color-select :color-list="colorList" @selectColor="selectColor" />

        <!-- 용량선택 -->
        <product-capacity-select
          :phone-capacity-list="phoneCapacityList"
          :product-select-info="productSelectInfo"
          @selectCapacity="selectCapacity"
        />

        <!-- 배송 가능 방법 -->
        <product-delivery-select
          ref="productDeliverySelect"
          :delivery="delivery"
          :product-select-info="productSelectInfo"
          @selectUserAddrInfo="selectUserAddrInfo"
          @selectDeliveryMethod="selectDeliveryMethod"
          @openPopupDelivery="controlPopupDelivery(true)"
        />

        <!-- 함께 많이 본 휴대폰 -->
        <!-- <favorite-seller /> -->

        <!-- s: 특장점 및 구매후기 -->
        <product-detail-tab />
      </div>
    </main>
    <!-- s: 하단 스티키 바 -->
    <sticky-bar
      :product-price="productSelectInfo.productPrice"
      :complete-disable-flag="completeDisableFlag"
      @onSelectCompleted="onSelectCompleted"
    />

    <!-- 바로도착/행복배송 안내 레이어 팝업 -->
    <pop-delivery :open-flag="popupDeliveryFlag" :delivery="delivery" @closePopup="controlPopupDelivery(false)" />
  </div>
</template>

<script>
// js
import axios from 'axios';

import baseMixin from '~/components/mixin/base';
import apiMixin from '~/components/mixin/api';
// import stickyMixin from '~/components/mixin/stickyBar';

// 컴포넌트
import PageHeader from '~/components/layout/PageHeader';
import FavoriteSeller from '~/components/product/FavoriteSeller.vue';
import ProductCapacitySelect from '~/components/product/ProductCapacitySelect.vue';
import ProductColorSelect from '~/components/product/ProductColorSelect.vue';
import ProductDeliverySelect from '~/components/product/productDelivery/ProductDeliverySelect.vue';
import ProductDetailTab from '~/components/product/ProductDetailTab.vue';
import ProductHeader from '~/components/product/ProductHeader.vue';
import ProductKeyVisual from '~/components/product/ProductKeyVisual.vue';
import StickyBar from '~/components/product/StickyBar.vue';
import PopDelivery from '~/components/popup/PopDelivery.vue';

export default {
  components: {
    PageHeader,
    ProductHeader,
    ProductKeyVisual,
    ProductDeliverySelect,
    ProductCapacitySelect,
    FavoriteSeller,
    ProductColorSelect,
    ProductDetailTab,
    StickyBar,
    PopDelivery
  },
  mixins: [baseMixin, apiMixin],

  // SSR 렌더링 전
  async asyncData({ params }) {
    console.log('asyncData');
    console.log(params);
    // 페이지 진입시 임시 저장 데이터 조회 - 페이지 진입시 데이터 setting 추후 고민
    // return axios.get(process.env.API_BASE_URL + '/info').then(res => {
    //   console.log('asyncData axios');
    //   return { productSelectInfo: res.data };
    // });
  },
  data() {
    return {
      // 페이지 타이틀
      title: '[상품 Mobile] detail | SK텔레콤 공식 온라인 쇼핑몰 T월드 다이렉트',
      /**
       * 페이지 진입 url parameters
       */
      initSvcMgmtNum: '', // 서비스 관리번호
      initProductGrpId: '', // 모상품 그룹 ID
      initCategoryId: '', // 카테고리 ID
      // 모상품 정보
      productInfo: {},
      // 이미지 목록
      imageList: [],
      // 색상 목록
      colorList: [],
      // 용량 목록
      phoneCapacityList: [],
      // 바로도착/행복배송 팝업 on/off flag
      popupDeliveryFlag: false,
      // 선택완료 버튼 disable flag
      completeDisableFlag: true,
      // 배송 정보
      userAddrInfo: {},
      // 화면에서 선택한 정보
      productSelectInfo: {
        productPrice: '0',
        productId: '',
        colorSeq: '',
        colorName: '',
        phoneCapacity: ''
      },
      delivery: {}
    };
  },
  watch: {},
  created() {
    let productId = '';

    // 페이지 초기 진입시 필수값 체크
    const categoryId = this.$route.query.categoryId || 'test3';
    const productGrpId = this.$route.query.productGrpId || 'test2';
    const svcMgmtNum = this.$route.query.svcMgmtNum || 'test';

    try {
      if (this.isEmpty(this.$route.params.internal)) {
        if (this.isEmpty(svcMgmtNum) || this.isEmpty(productGrpId) || this.isEmpty(categoryId)) {
          this.$router.go(-1);
          // TODO goto Error Page
        } else {
          // 필수 parameter state set
          this.$store.state.SVC_MGMT_NUM = svcMgmtNum;
          this.$store.state.PRODUCT_GRP_ID = productGrpId;
          this.$store.state.CATEGORY_ID = categoryId;

          this.initSvcMgmtNum = svcMgmtNum;
          this.initProductGrpId = productGrpId;
          this.initCategoryId = categoryId;
        }
      } else {
        productId = this.$store.state.PHONE_PROD_SELECT_INFO.productId;
        this.productSelectInfo = this.$store.state.PHONE_PROD_SELECT_INFO;
        this.initSvcMgmtNum = this.$store.state.SVC_MGMT_NUM;
        this.initProductGrpId = this.$store.state.PRODUCT_GRP_ID;
        this.initCategoryId = this.$store.state.CATEGORY_ID;
      }
    } catch (e) {
      console.log(e);
    }

    this.setProductInfo(productId, true); // 모상품 조회
  },
  async mounted() {
    // this.setStickyBar(); // stickybar 노출/ 숨김 처리 - 210118 삭제됨
  },
  methods: {
    /**
     * 모 상품 조회
     * @function
     * @param {String} productId - 상품ID
     * @param {String} initFlag - 초기여부
     */
    setProductInfo(productId, initFlag) {
      this.apiGetProductInfo(this.initCategoryId, this.initProductGrpId, productId)
        .then(res => {
          this.productInfo = res.data;

          // 초기 진입시 set
          if (initFlag) {
            // 상품 이미지 영역 - list 정보가 컬럼1 ~ 컬럼 4로 정의되어있어서 push로 처리
            this.imageList.push({
              imageUrl: process.env.CND_WEB_RESOURCE_ROOT_PATH + '/pimg/phone' + res.data.mImage1
            });
            this.imageList.push({
              imageUrl: process.env.CND_WEB_RESOURCE_ROOT_PATH + '/pimg/phone' + res.data.mImage2
            });
          }

          // 색상 목록
          this.colorList = res.data.colorList;

          // 용량 목록
          this.phoneCapacityList = res.data.phoneCapacityList;

          // 선택한 상품 정보 set
          this.productSelectInfo.productId = res.data.productId;
          this.productSelectInfo.productGrpId = res.data.productGrpId;
          this.productSelectInfo.productGrpNm = res.data.productGrpNm;
          this.productSelectInfo.modelNo = res.data.modelNo;
          this.productSelectInfo.mImage1 = res.data.mImage1;
          this.productSelectInfo.mImage2 = res.data.mImage2;
          this.productSelectInfo.mImage3 = res.data.mImage3;
          this.productSelectInfo.mImage4 = res.data.mImage4;
          this.productSelectInfo.contents = res.data.contents;

          // 바로도착 모상품 가능 여부 조회
          this.setQuickPsbl(res.data.productId, res.data.colorSeq);
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * 바로도착 / 행복배송 가능 여부
     * @function
     * @param {String} productId - 상품ID
     * @param {String} colorSeq - 색상순서
     */
    setQuickPsbl(productId, colorSeq) {
      this.apiGetQuickPsbl(productId, colorSeq)
        .then(res => {
          this.delivery = res.data;
          const moment = require('moment');
          const timeNow = moment();
          if (this.delivery.strdOrdPsblTmYn === 'Y') {
            this.delivery.qckDlvStrdRemainTime = this.setRemainTime(this.delivery.qckDlvStrdPsblTo);
          }
          if (this.delivery.primOrdPsblTmYn === 'Y') {
            this.delivery.qckDlvPrimRemainTime = this.setRemainTime(this.delivery.qckDlvPrimPsblTo);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * 바로도착/행복배송 남은 시간 조회
     * @function
     * @param {String} checkTime - 바로도착/행복배송 마감 시간
     */
    setRemainTime(checkTime) {
      const moment = require('moment');
      const timeNow = moment();
      const t1 = moment(checkTime + ':00:00', 'HH:mm:ss');
      return (
        moment.duration(t1.diff(timeNow)).hours() +
        '시' +
        moment.duration(t1.diff(timeNow)).minutes() +
        '분' +
        moment.duration(t1.diff(timeNow)).seconds() +
        '초'
      );
    },

    /**
     * 바로도착/행복배송 팝업 보이거나 감춤
     * @function
     * @param {boolean} flag - true(보임), false(감춤)
     */
    controlPopupDelivery(flag) {
      try {
        this.preventBodyScroll(flag); // 팝업 오픈 상태에서는 아래 컨텐츠 Scroll 방지.
        this.popupDeliveryFlag = flag;
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * 카카오톡 채팅 열기(새창)
     * @function
     */
    openKakaoChat() {
      // alert('T 다이렉트샵 플러스 친구 ID 전달후 적용');
      window.open(process.env.CHAT_DOMAIN + '/sharedfront/jsp/view/liveChatKakaoCheck.jsp?domainId=MOBILE');
    },

    /**
     * 색상 선택 - 선택시 모상품 조회 후 용량 / 배송 방법 초기화
     * @function
     * @param {obejct} colorInfo
     */
    selectColor(colorInfo) {
      // 선택한 색상 데이터 set
      this.productSelectInfo.colorSeq = colorInfo.colorSeq;
      this.productSelectInfo.colorName = colorInfo.colorName;
      this.setProductInfo(colorInfo.productId, false);

      // 선택한 용량 / 배송방법 데이터 초기화
      this.productSelectInfo.phoneCapacity = ''; // 용량 초기화
      this.productSelectInfo.productPrice = '0'; // sticky bar 출고가

      // 배송 방법 선택 초기화
      this.$refs.productDeliverySelect.setMethod('');

      // sticky bar 버튼 제어
      this.setCompleteDisableFlag();
    },
    /**
     * 용량 선택 - 선택시 모상품 조회 후 배송 방법 초기화
     * @function
     * @param {obejct} phoneCapacityInfo
     */
    selectCapacity(phoneCapacityInfo) {
      this.productSelectInfo.phoneCapacity = phoneCapacityInfo.phoneCapacity;
      this.productSelectInfo.productPrice = phoneCapacityInfo.productPrice;
      this.setCompleteDisableFlag();
    },
    /**
     * 배송 방법 선택
     * @function
     * @param {string} name - 선택된 배송방법
     */
    selectDeliveryMethod(name) {
      this.productSelectInfo.dlvTyp = name;
      if (!this.isEmpty(name)) {
        this.setCompleteDisableFlag();
      }
    },
    /**
     * 주소 정보
     * @function
     * @param {obejct} selectedUserAddressInfo
     */
    selectUserAddrInfo(selectedUserAddressInfo) {
      this.userAddrInfo = selectedUserAddressInfo;
      this.productSelectInfo.userAddrInfo = selectedUserAddressInfo;
      this.setCompleteDisableFlag();
    },
    /**
     * sticky bar 선택완료 버튼 disable 제어 - 색상 / 용량 / 배송방법 / 배송정보
     * @function
     */
    setCompleteDisableFlag() {
      if (this.reqValidationFlag()) {
        this.completeDisableFlag = false;
      } else {
        this.completeDisableFlag = true;
      }
    },

    /**
     * 주문서 필수값 체크 - 색상 / 용량 / 배송방법 / 청구 주소
     * @function
     */
    reqValidationFlag() {
      if (
        this.isEmpty(this.productSelectInfo.colorSeq) ||
        this.isEmpty(this.productSelectInfo.colorName) ||
        this.isEmpty(this.productSelectInfo.phoneCapacity) ||
        this.isEmpty(this.productSelectInfo.dlvTyp) ||
        this.isEmpty(this.productSelectInfo.userAddrInfo.mobileNo) ||
        this.isEmpty(this.productSelectInfo.userAddrInfo.zip) ||
        this.isEmpty(this.productSelectInfo.userAddrInfo.basAddr) ||
        this.isEmpty(this.productSelectInfo.userAddrInfo.dtlAddr)
      ) {
        return false;
      } else {
        return true;
      }
    },

    /**
     * 선택 완료
     * @function
     */
    onSelectCompleted() {
      if (this.reqValidationFlag()) {
        // store 데이터 set
        this.$store.state.PHONE_PROD_SELECT_INFO = this.productSelectInfo;
        this.$router.push({ name: 'skt-product-select', params: { internal: 'Y' } });
      } else {
        this.completeDisableFlag = true;
      }
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
