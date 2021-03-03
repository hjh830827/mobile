<template>
  <div class="popup pop-seller pop-plan-list" :style="{ display: openFlag ? 'block' : 'none' }">
    <div class="popup-body">
      <div class="popup-header">
        <h1 class="popup-title">요금제 선택하기</h1>
      </div>
      <div role="main" class="popup-content">
        <span class="txt-question" style="display: none">※ 비노출 요금제는 상담 문의해주세요.</span>
        <div class="seller-scroll-wrap">
          <div class="seller-scroll-list">
            <button type="button"
                    class="tab-item"
                    :class="{on: selectedCategory.categoryId === list.categoryId}"
                    data-tab="planList"
                    v-for="(list, index) in categoryList"
                    @click="handleSelectCategory(list)"><span>{{list.categoryNm}}</span></button>
          </div>
        </div>
        <h2 class="g-invisible">요금제 목록</h2>
        <div class="seller-cont-area" data-tab-content="planList" v-if="subscriptionList.length > 0">
          <div class="seller-plan-list">
            <div class="seller-plan-item"
                 :class="{open: selectedSubscription.subscriptionId === list.subscriptionId}"
                 v-for="(list, index) in subscriptionList"
                 @click="handleSelectSubscription(list)">
              <div class="inner">
                <div class="info">
                  <div class="tit">
                    <span class="sub-tit">뉴 T끼리 맞춤형(150분+700MB)</span>
                    <!-- [D] badge type 텍스트/bg 매칭
                                            .type1 : 사용중
                                            .type2 : 추천
                                            .type3 : AI Pick
                                            .type4 : 고객선택
                                        -->
                    <em class="badge-round type4">고객선택</em>
                    <h2 class="main-tit">데이터 무제한</h2>
                  </div>
                  <div class="data">
                    <h2 class="main-tit">999,999 <span>원/월</span></h2>
                    <span class="sub-tit">120,000원/월</span>
                  </div>
                </div>
                <p class="desc">12GB+매일2GB 이후 속도제어</p>
                <hr class="hr" />
                <!--
                <div class="icon-list">
                  &lt;!&ndash; [D] 선택된 혜택 on클래스 추가 &ndash;&gt;
                  <div class="icon-item on">
                    <img src="/images/seller/ico_benefit_01.png" alt="" />
                  </div>
                  <div class="icon-item">
                    <img src="/images/seller/ico_benefit_02.png" alt="" />
                  </div>
                  <div class="icon-item">
                    <img src="/images/seller/ico_benefit_03.png" alt="" />
                  </div>
                  <div class="icon-item on">
                    <img src="/images/seller/ico_benefit_04.png" alt="" />
                  </div>
                </div>
                -->
              </div>
              <div class="area-toggle-cont">
                <h3 class="g-invisible">혜택 자세히보기</h3>
                <strong class="txt-info">추가 혜택 <em>N개</em>를 선택해주세요.</strong>
                <span class="c-select" v-for="(bList, index) in benefitList(list)">
                  <select :title="'추가 혜택 선택' + index" class="select"
                          v-model="selectedBenefit[index]"
                          @click.stop>
                    <option value="undefined" selected="selected">선택 안함</option>
                    <option v-for="(oList, index) in list.benefit"
                            :disabled="isSelectedBenefit(oList.benfCd)"
                            :value="oList.benfCd">{{oList.benfNm}}</option>
                  </select>
                </span>
                <div class="area-info">
                  <span class="title-info">안내사항</span>
                  <ul class="dsc-list">
                    <li class="dsc-item">FLO팩 : 모바일 무제한 듣기 + FLO 이용 데이터 무료(월 7,920원 상당)</li>
                    <li class="dsc-item">POOQ팩 : 모바일과 PC 실시간 지상파&VOD 이용 + VOD 10회 다운로드(월 7,900원 상당)</li>
                    <li class="dsc-item">5GX 95 요금제를 사용하시는 고객님께 FLO팩과 POOQ팩 중 선택하신 1개 옵션이 무료로 제공됩니다.</li>
                    <li class="dsc-item">5GX 95 요금제를 사용하시는 고객님께 FLO팩과 POOQ팩 중 선택하신 1개 옵션이 무료로 제공됩니다.</li>
                    <li class="dsc-item">5GX 95 요금제를 사용하시는 고객님께 FLO팩과 POOQ팩 중 선택하신 1개 옵션이 무료로 제공됩니다.</li>
                    <li class="dsc-item">5GX 95 요금제를 사용하시는 고객님께 FLO팩과 POOQ팩 중 선택하신 1개 옵션이 무료로 제공됩니다.</li>
                    <li class="dsc-item">5GX 95 요금제를 사용하시는 고객님께 FLO팩과 POOQ팩 중 선택하신 1개 옵션이 무료로 제공됩니다.</li>
                    <li class="dsc-item">5GX 95 요금제를 사용하시는 고객님께 FLO팩과 POOQ팩 중 선택하신 1개 옵션이 무료로 제공됩니다.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="seller-cont-area" data-tab-content="planList" v-else>
          <div class="init-area">
            <p class="init-type">조회된 상품이 없습니다.</p>
          </div>
        </div>
      </div>
      <div class="popup-footer">
        <div class="btn-area">
          <!-- [D] 활성/비활성 여부는 disabled 클래스 및 속성으로 추가/삭제로 컨트롤 -->
          <button
            type="button"
            class="btn-primary btn-lg"
            :disabled="!selectedSubscription"
            @click.prevent="confirmSubscription"
          >
            요금제 선택
          </button>
        </div>
      </div>
      <button type="button" class="btn-close" @click.prevent="closePopup">
        <span class="ico-close">팝업 닫기</span>
      </button>
    </div>
  </div>
</template>

<script>
import baseMixin from "~/components/mixin/base";
import apiMixin from "~/components/mixin/api";

export default {
  props: {
    openFlag: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  mixins: [baseMixin, apiMixin],
  data() {
    return {
      categoryList: [],//상단 카테고리 리스트
      subscriptionList: [],//카테고리에 대응하는 요금제 리스트
      selectedCategory: '',//선택된 카테고리
      selectedSubscription: '',//선택된 카테고리 > 요금제
      selectedBenefit: [],//선택된 추가 혜택
    };
  },
  computed: {
    benefitList() {
      return (list) => {
        let length = parseInt(list.optSelMndtCnt);
        let benefitList = new Array(length);
        return benefitList;
      };
    },
    isSelectedBenefit() {
      return (benfCd) => {
        return this.selectedBenefit.some((benefit)=> benefit === benfCd);
      };
    }
  },
  methods: {
    handleChangeBenefit() {
      console.log('handleChangeBenefit', this.selectedBenefit);
    },
    handleSelectCategory(list) {
      this.selectedCategory = list;
      //TODO 카테고리 선택하면 해당 카테고리 요금제를 다시 불러올지 확인 필요
    },
    handleSelectSubscription(list) {
      this.selectedSubscription = list;
      this.initData();
    },

    /**
     * 요금제 선택하면, 모든 data 초기화 시킨다.
     * @function
     */
    initData() {
      this.selectedBenefit = [];//추가 혜택 초기화
    },
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
    },
    /**
     * 현재 선택된 요금제를 입력한다.
     * @function
     */
    confirmSubscription() {
      console.log('요금제 선택 완료');
      this.$emit('closePopup', false, 'test111');
    },
    /**
     * 전체 요금제 목록 가져오기
     * @function
     * @param {String} categoryId 카테고리Id
     * @param {String} productId 모상품ID
     * @param {String} svcMgmtNum 서비스관리번호
     * @param {String} entryCd 가입유형
     */
    async getSubscriptionList() {
      let tempData = {
        respCode: "200",
        respMsg: "SUCCESS",
        respBody: {
          category: [
            {
              categoryId: "10000",
              categoryNm: "#LTE 언택트",
              orderSeq: 0,
            },
            {
              categoryId: "10001",
              categoryNm: "T플랜",
              orderSeq: 1,
            },
            {
              categoryId: "10002",
              categoryNm: "#0플랜",
              orderSeq: 2,
            },
            {
              categoryId: "10003",
              categoryNm: "#프리미엄",
              orderSeq: 3,
            },
            {
              categoryId: "10004",
              categoryNm: "#청소년 요금제",
              orderSeq: 4,
            },
          ],
          subscription: [
            {
              badgeType: "",
              chnlId: "",
              chnlNm: "",
              categoryId: "",
              categoryNm: "",
              orderSeq: "",
              upCategoryId: "",
              subcategoryId: "",
              subscriptionId: "20001",
              subscriptionNm: "",
              productId: "",
              entryCd: "",
              commitmentTerm: "",
              installmentTerm: "",
              dataInfo: "",
              voiceInfo: "",
              smsInfo: "",
              tcDefaultQty: "",
              dataDefaultQty: "",
              smsDefaultQty: "",
              selSubcommYn: "",
              subcommNoYn: "",
              selSubcommDisamt: "",
              basicCharge: "",
              basicChargeCtrt: "",
              basicChargeSurtaxCtrt: "",
              selCharge: "",
              selChargeSurtax: "",
              netTyp: "",
              scrbRstStrdAgeVal: "",
              strdAgeChkScopeClCd: "",
              strdAgeChkNeedYn: "",
              parentCircuitAuthYn: "",
              displayYn: "",
              subscriptionGuidPopup: "",
              dataDtlPhrs: "",
              subscriptionGuidDtl: "",
              optSelMndtCnt: "3",
              subcommId: "",
              subcommNm: "",
              subcommTerm: "",
              subcommDisamt: "",
              disrate: "",
              fmlyNoCtgryFl: "",
              productPrice: "",
              benefit: [
                {
                  subscriptionId: "",
                  benfCd: "10001",
                  benfSubscriptionId: "",
                  benfNm: "VIP 멤버십 (1-1)",
                  benfTagPhrs: "",
                  optDfltYn: "",
                  optYn: "",
                  benfDtlDesc: "",
                  benfImgPath: "",
                  benfImgDesc: "",
                  orderSeq: ""
                },
                {
                  subscriptionId: "",
                  benfCd: "10002",
                  benfSubscriptionId: "",
                  benfNm: "VIP 멤버십 (1-2)",
                  benfTagPhrs: "",
                  optDfltYn: "",
                  optYn: "",
                  benfDtlDesc: "",
                  benfImgPath: "",
                  benfImgDesc: "",
                  orderSeq: ""
                },
                {
                  subscriptionId: "",
                  benfCd: "10003",
                  benfSubscriptionId: "",
                  benfNm: "VIP 멤버십 (1-3)",
                  benfTagPhrs: "",
                  optDfltYn: "",
                  optYn: "",
                  benfDtlDesc: "",
                  benfImgPath: "",
                  benfImgDesc: "",
                  orderSeq: ""
                }
              ]
            },
            {
              badgeType: "",
              chnlId: "",
              chnlNm: "",
              categoryId: "",
              categoryNm: "",
              orderSeq: "",
              upCategoryId: "",
              subcategoryId: "",
              subscriptionId: "20002",
              subscriptionNm: "",
              productId: "",
              entryCd: "",
              commitmentTerm: "",
              installmentTerm: "",
              dataInfo: "",
              voiceInfo: "",
              smsInfo: "",
              tcDefaultQty: "",
              dataDefaultQty: "",
              smsDefaultQty: "",
              selSubcommYn: "",
              subcommNoYn: "",
              selSubcommDisamt: "",
              basicCharge: "",
              basicChargeCtrt: "",
              basicChargeSurtaxCtrt: "",
              selCharge: "",
              selChargeSurtax: "",
              netTyp: "",
              scrbRstStrdAgeVal: "",
              strdAgeChkScopeClCd: "",
              strdAgeChkNeedYn: "",
              parentCircuitAuthYn: "",
              displayYn: "",
              subscriptionGuidPopup: "",
              dataDtlPhrs: "",
              subscriptionGuidDtl: "",
              optSelMndtCnt: "2",
              subcommId: "",
              subcommNm: "",
              subcommTerm: "",
              subcommDisamt: "",
              disrate: "",
              fmlyNoCtgryFl: "",
              productPrice: "",
              benefit: [
                {
                  subscriptionId: "",
                  benfCd: "20001",
                  benfSubscriptionId: "",
                  benfNm: "VIP 멤버십 (2-1)",
                  benfTagPhrs: "",
                  optDfltYn: "",
                  optYn: "",
                  benfDtlDesc: "",
                  benfImgPath: "",
                  benfImgDesc: "",
                  orderSeq: ""
                },
                {
                  subscriptionId: "",
                  benfCd: "20002",
                  benfSubscriptionId: "",
                  benfNm: "VIP 멤버십 (2-2)",
                  benfTagPhrs: "",
                  optDfltYn: "",
                  optYn: "",
                  benfDtlDesc: "",
                  benfImgPath: "",
                  benfImgDesc: "",
                  orderSeq: ""
                }
              ]
            },
          ]
        }
      };
      let params = {
        categoryId: '',
        productId: '',
        svcMgmtNum: '',
        entryCd: '',
      }
      //let response = await this.apiGetSubscriptionList(params);
      let response = tempData;
      return response.respBody;
    },

    async init() {
      let data = await this.getSubscriptionList();

      this.categoryList = data.category;
      this.subscriptionList = data.subscription;
      this.selectedCategory = this.categoryList[0];//첫번째 카테고리 default 선택.
    }
  },
  created() {
    this.init();
  }
};
</script>
