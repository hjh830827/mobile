/* eslint-disable prettier/prettier */

const API_BASE_URL = process.env.API_BASE_URL;
const API_BENEFIT_URL = process.env.API_BENEFIT_URL;
const API_ORDER_URL = process.env.API_ORDER_URL;
const API_PRODUCT_URL = process.env.API_PRODUCT_URL;

const mixin = {
  mounted() {
    console.log('api mixin');
  },
  methods: {
    /**
     * 상품 정보 조회
     * @function
     * @param {string} categoryId
     * @param {string} productGrpId
     * @param {string} productId
     * @return {object}
     */
    apiGetProductInfo(categoryId,productGrpId,productId) {
      //let url = API_BASE_URL + '/product-info?categoryId=' + categoryId + '&productGrpId=' + productGrpId + '&productId=' + productId;
      let url = API_BASE_URL + '/option/product-info';
      return this.$axios.get(url, {
        params: {
          categoryId: categoryId,
          productGrpId: productGrpId,
          productId: productId
        }
      });
    },
    /**
     * 바로도착 모상품 가능여부 조회
     * @function
     * @return {object}
     */
    apiGetQuickPsbl(productId, colorSeq) {
      //return this.$axios.get(API_BASE_URL + '/quick-psbl?productId=' + productId + '&colorSeq=' + colorSeq);
      let url = API_BASE_URL + '/quick-psbl';
      return this.$axios.get(url, {
        params: {
          productId: productId,
          colorSeq: colorSeq
        }
      });
    },
    /**
     * 청구주소
     * @param {string} svcMgmtNum
     * @return {object}
     */
    apiGetUserAddr(svcMgmtNum) {
      //return this.$axios.get(API_BASE_URL + '/billing-adrress?svcMgmtNum=' + svcMgmtNum);
      let url = API_BASE_URL + '/detail/billing-adrress';
      return this.$axios.get(url, {
        params: {
          svcMgmtNum: svcMgmtNum
        }
      });
    },
    /**
     * 임시저장 정보
     * @function
     * @return {object}
     */
    apiGetInfo() {
      let url = API_BASE_URL + '/info';
      return this.$axios.get(url);
    },
    
    /**
     * 바로도착/행복배송 지역 재고 가능 여부 조회
     * @function
     * @return {object}
     */
    apiGetQuickPsblStock(addr, zip, productId, colorSeq) {
      //return this.$axios.get(API_BASE_URL + '/quick-psbl-stock?productId=' + productId + '&colorSeq=' + colorSeq + '&zip=' + zip + '&addr=' + addr);
      let url = API_BASE_URL + '/quick-psbl-stock';
      return this.$axios.get(url, {
        params: {
          productId: productId,
          colorSeq: colorSeq,
          zip: zip,
          addr: addr
        }
      });
    },
    /**
     * 우편번호 검색
     * @param {}} kerword 
     */
    apiGetSearchAddr(keyword) {
      //return this.$axios.get(API_BASE_URL + '/searchAddr?keyword=' + keyword );
      let url = API_BASE_URL + '/searchAddr';
      return this.$axios.get(url, {
        params: {
          keyword: keyword
        }
      });
    },
    /**
     * 디폴트 요금제 조회
     */
    apiGetDefaultSubscription() {
      //return this.$axios.get(API_BASE_URL + '/default-subscription');
      let url = API_BASE_URL + '/entryOption/default-subscription';
      return this.$axios.get(url);
    },
    /**
     *  자상품 정보 조회
     * @function
     * @param {String} productId - 모상품 ID
     * @param {String} entryCd - 가입유형 코드
     * @param {String} subscriptionId - 요금제ID
     */
    apiGetChildList(productId,entryCd,subscriptionId) {
      //return this.$axios.get(API_BASE_URL + '/child-list?productId=' + productId + '&entryCd=' + entryCd + '&subscriptionId=' + subscriptionId);
      let url = API_BASE_URL + '/entryOption/child-list';
      return this.$axios.get(url, {
        params: {
          productId: productId,
          entryCd: entryCd,
          subscriptionId: subscriptionId
        }
      });
    },
    /**
     * 온가족 할인, 복지할인 여부 조회
     * @function
     * @param {String} subscriptionId - 요금제 ID
     * @param {String} svcMgmtNum - 서비스 관리번호
     */
    apiGetFmlyWlfYn(subscriptionId, svcMgmtNum) {
      //return this.$axios.get(API_BASE_URL + '/fmly-wlf-yn?=subscriptionId' + subscriptionId + '&svcMgmtNum=' + svcMgmtNum);
      let url = API_BASE_URL + '/entryOption/fmly-wlf-yn';
      return this.$axios.get(url, {
        params: {
          subscriptionId: subscriptionId,
          svcMgmtNum: svcMgmtNum
        }
      });
    },
    /**
     * 쿠폰 목록 조회
     * @function
     * @param {String} 카테고리 코드 - 확인중
     * @param {String} 고객 ID - 화면에서 넘길지 확인
     * @param {String} 카테고리ID
     * @param {String} 모상품그룹ID
     */
    apiGetCouponList(categoryCd, custId, categoryId, productGrpId) {
      //return this.$axios.get(API_BENEFIT_URL + '/coupon-list?categoryCd=' + categoryCd + '&custId=' + custId+ '&categoryId=' + categoryId+ '&productGrpId=' + productGrpId);
      let url = API_BENEFIT_URL + '/coupon-list';
      return this.$axios.get(url, {
        params: {
          categoryCd: categoryCd,
          custId: custId,
          categoryId: categoryId,
          productGrpId: productGrpId,
        }
      });
    },
    /**
     * 쿠폰 등록
     * @function
     * @param {String} 고객 ID
     * @param {String} 쿠폰발급ID
     */
    apiPostCouponReg(custId2, cpnIsueId2) {
      //return this.$axios.post(API_BENEFIT_URL + '/coupon-reg', null, {params: {custId: custId2, cpnIsueId: cpnIsueId2} } );
      let url = API_BENEFIT_URL + '/coupon-reg';
      return this.$axios.post(url, null, {
        params: {
          custId: custId2,
          cpnIsueId: cpnIsueId2}
      });
    },
    /**
     * T 기프트 목록 조회
     * @function
     * @param {String} 모상품그룹ID
     * @param {String} 기프트 그룹 ID
     */
    apiGetTgiftList(productGrpId,giftGrpId) {
      //return this.$axios.get(API_BENEFIT_URL + '/tgift-list?productGrpId=' + productGrpId + '&giftGrpId=' + giftGrpId);
      let url = API_BENEFIT_URL + '/tgift-list';
      return this.$axios.get(url, {
        params: {
          productGrpId: productGrpId,
          giftGrpId: giftGrpId,
        }
      });
    },
    /**
     * T 기프트 상세 조회
     * @function
     * @param {String} 기프트ID
     */
    apiGetTgiftDetail(giftId) {
      //return this.$axios.get(API_BENEFIT_URL + '/tgift-detail?giftId=' + giftId);
      let url = API_BENEFIT_URL + '/tgift-detail';
      return this.$axios.get(url, {
        params: {
          giftId: giftId,
        }
      });
    },
    /**
     * 최종 월 납부금 계산
     * @function
     * @param {String} 모상품ID
     * @param {String} 가입유형
     * @param {String} 할부기간
     * @param {String} 요금제ID
     * @param {String} 요금약정할인코드
     * @param {String} 온가족할인금액
     * @param {String} 복지할인금액
     */
    apiGetMonthlyAmt(productId,entryCd,installmentTerm,subscriptionId,subcommId,fmlyDcAmt,wlfDcAmt) {
      //return this.$axios.get(process.env.API_ORDER_URL + '/monthly-amt?=productId' + productId + '&entryCd=' + entryCd + '&installmentTerm=' + installmentTerm + '&subscriptionId=' + subscriptionId + '&subcommId=' + subcommId + '&fmlyDcAmt=' + fmlyDcAmt + '&wlfDcAmt=' + wlfDcAmt);
      let url = API_ORDER_URL + '/monthly-amt';
      return this.$axios.get(url, {
        params: {
          productId: productId,
          entryCd: entryCd,
          installmentTerm: installmentTerm,
          subscriptionId: subscriptionId,
          subcommId: subcommId,
          fmlyDcAmt: fmlyDcAmt,
          wlfDcAmt: wlfDcAmt
        }
      });
    },
    /**
     * 장바구니 조회
     * @function
     * @param {String} svcMgmtNum 서비스관리번호
     */
    apiGetCartList(svcMgmtNum) {
      //return this.$axios.get(process.env.API_ORDER_URL + '/monthly-amt?=productId' + productId + '&entryCd=' + entryCd + '&installmentTerm=' + installmentTerm + '&subscriptionId=' + subscriptionId + '&subcommId=' + subcommId + '&fmlyDcAmt=' + fmlyDcAmt + '&wlfDcAmt=' + wlfDcAmt);
      let url = API_ORDER_URL + '/cart-list';
      return this.$axios.get(url, {
        params: {
          svcMgmtNum: svcMgmtNum
        }
      });
    },
    /**
     * 장바구니 삭제
     * @function
     * @param {String} svcMgmtNum 서비스관리번호
     * @param {String} cartMgmtNum 장바구니일련번호
     */
    apiDeleteCartList({svcMgmtNum, cartMgmtNum}) {
      //return this.$axios.get(process.env.API_ORDER_URL + '/monthly-amt?=productId' + productId + '&entryCd=' + entryCd + '&installmentTerm=' + installmentTerm + '&subscriptionId=' + subscriptionId + '&subcommId=' + subcommId + '&fmlyDcAmt=' + fmlyDcAmt + '&wlfDcAmt=' + wlfDcAmt);
      let url = API_ORDER_URL + '/cart-delete';
      return this.$axios.delete(url, {
        data: {
          svcMgmtNum: svcMgmtNum,
          cartMgmtNum: cartMgmtNum
        },
        withCredentials: true,
      });
    },
    /**
     * 요금제 선택하기 > 요금제 리스트 정보 조회
     * @function
     * @param {String} categoryId 카테고리Id
     * @param {String} productId 모상품ID
     * @param {String} svcMgmtNum 서비스관리번호
     * @param {String} entryCd 가입유형
     */
    apiGetSubscriptionList({categoryId, productId, svcMgmtNum, entryCd}) {
      let url = API_PRODUCT_URL + '/entryOption/subscription-list';
      return this.$axios.get(url, {
        params: {
          categoryId,
          productId,
          svcMgmtNum,
          entryCd,
        }
      });
    },

  }
};

export default mixin;
