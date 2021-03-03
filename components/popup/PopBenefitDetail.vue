<template>
  <div class="popup pop-seller pop-benefit-detail" :style="{ display: openFlag ? 'block' : 'none' }">
    <div class="popup-body">
      <div class="popup-header">
        <h1 class="popup-title">혜택 자세히 보기</h1>
      </div>
      <div role="main" class="popup-content">
        <div class="seller-tab-wrap">
          <button
            v-for="(item, index) in computeSubscriptionList"
            :key="index"
            type="button"
            class="tab-item"
            :class="{ on: getActiveClass(item, index) }"
            data-tab="planList"
            @click="setTab(item.subscriptionId)"
          >
            <span>{{ item.badgeName }}</span>
          </button>
        </div>
        <h2 class="g-invisible">요금제 목록</h2>
        <div
          v-for="(item, index) in computeSubscriptionList"
          v-show="currentTab === item.subscriptionId"
          :key="index"
          class="seller-cont-area"
          data-tab-content="planList"
        >
          <div class="seller-plan-list">
            <div class="seller-plan-item">
              <div class="inner">
                <div class="info">
                  <div class="tit">
                    <span class="sub-tit">{{ item.subscriptionNm }}</span>
                    <!-- [D] badge type 텍스트/bg 매칭
										.type1 : 사용중
										.type2 : 추천
										.type3 : AI Pick
										.type4 : 고객선택
									-->
                    <em class="badge-round" :class="'type' + item.badgeNum">{{ item.badgeName }}</em>
                    <h2 class="main-tit">{{ item.dataDefaultQty }}</h2>
                  </div>
                  <div class="data">
                    <h2 class="main-tit">{{ item.basicCharge | comma }} <span>원/월</span></h2>
                    <!-- <span class="sub-tit">해당 데이터 확인 중 원/월</span> -->
                  </div>
                </div>
                <p class="desc">{{ item.dataDtlPhrs }}</p>
                <dl class="list-basic-option">
                  <dt>집전화/이동전화</dt>
                  <dd>무제한</dd>
                  <dt>문자</dt>
                  <dd>기본제공</dd>
                </dl>
              </div>
              <div
                v-if="convertParseInt(item.optSelMndtCnt) > 0 || item.subscriptionGuidDtl != ''"
                class="area-toggle-cont"
              >
                <h3 class="g-invisible">혜택 자세히보기</h3>
                <!-- <div class="area-benefit">
                  <ul class="list-benefit">
                    <li class="item-benefit">
                      <img class="thumb-benefit" src="/images/seller/ico_benefit_04.png" alt="혜택이미지" />
                      <div class="desc-benefit">
                        <strong>T 멤버십 VIP</strong>
                        <p class="txt-desc">연 6회 영화 무료 관람, 패밀리 레스토랑/편의점 등 다양한 제휴 혜택 제공</p>
                      </div>
                    </li>
                    <li class="item-benefit">
                      <img class="thumb-benefit" src="/images/seller/ico_benefit_01.png" alt="혜택이미지" />
                      <div class="desc-benefit">
                        <strong>분실/파손 보험</strong>
                        <p class="txt-desc">
                          분실파손 100% 할인 (최대 2,900원, 24개월)<br />(보험상품 별도 가입신청 필요)
                        </p>
                      </div>
                    </li>
                  </ul>
                </div> -->
                <strong v-if="convertParseInt(item.optSelMndtCnt) > 0" class="txt-info">
                  추가 혜택 <em>{{ item.optSelMndtCnt }}개</em>를 선택해주세요.
                </strong>
                <span v-for="n in convertParseInt(item.optSelMndtCnt)" :key="n" class="c-select">
                  <select
                    v-model="selectExcludes[n - 1]"
                    class="select"
                    @change="changeBenefit($event.target.value, n)"
                  >
                    <option value="undefined" selected="selected">선택 안함</option>
                    <option
                      v-for="(item3, index3) in item.benefit"
                      :key="index3"
                      :disabled="isVisible(item3.benfCd)"
                      :value="item3.benfCd"
                    >
                      {{ item3.benfNm }}
                    </option>
                  </select>
                </span>
                <div v-if="item.subscriptionGuidDtl != ''" class="area-info">
                  <span class="title-info">안내사항</span>
                  <ul class="dsc-list">
                    <li class="dsc-item">{{ item.subscriptionGuidDtl }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="popup-footer">
        <div class="btn-area">
          <!-- [D] 활성/비활성 여부는 disabled 클래스 및 속성으로 추가/삭제로 컨트롤 -->
          <button type="button" class="btn-primary btn-lg" @click="selectSubscription">요금제 선택</button>
        </div>
      </div>
      <button type="button" class="btn-close" @click.prevent="closePopup">
        <span class="ico-close">팝업 닫기</span>
      </button>
    </div>
  </div>

  <!-- //popup -->
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
    subscriptionList: {
      type: Array,
      required: true,
      default: null
    },
    propSubscriptionId: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      subscriptionSelectFlag: false, // 요금제 선택 flag
      currentTab: '',
      currentSubscriptionInfo: {},
      checkBenefitSize: 0,
      currentBenefitList: [],
      selectExcludes: []
    };
  },
  computed: {
    computeSubscriptionList: {
      get() {
        return this.subscriptionList;
      },
      set(value) {}
    }
  },
  methods: {
    /**
     * 문자열 숫자 변경
     * @function
     */
    convertParseInt(data) {
      return parseInt(data);
    },
    /**
     * active class 'on'
     * @param {string} tab - 현재 탭과 비교할 탭 이름
     */
    getActiveClass(obj, index) {
      try {
        // 팝업 오픈시 호출
        if (this.openFlag) {
          // 부모에서 선택한 요금제가 있을시
          if (
            this.propSubscriptionId !== '' &&
            this.propSubscriptionId !== null &&
            this.propSubscriptionId !== undefined &&
            this.currentTab === ''
          ) {
            this.currentTab = this.propSubscriptionId;
          }
          if (this.currentTab === '' && index === 0) {
            this.currentSubscriptionInfo = obj;
            this.currentTab = obj.subscriptionId;
            this.checkBenefitSize = obj.benefit.length;
            this.currentBenefitList = obj.benefit;
            return 'on';
          } else if (this.currentTab === obj.subscriptionId) return 'on';
        }
      } catch (e) {
        console.log(e);
      }
    },
    /**
     * 현재 탭으로 설정
     * @param {string} tab - 현재 탭으로 설정할 탭 이름
     */
    setTab(tab) {
      try {
        this.selectExcludes = [];
        this.currentTab = tab;
      } catch (e) {
        console.log(e);
      }
    },
    /**
     * 팝업을 감춘다.
     * @function
     */
    closePopup() {
      try {
        this.currentTab = '';
        this.selectExcludes = [];
        this.$emit('closePopup');
      } catch (e) {
        console.log(e);
      }
    },
    /**
     * 추가 혜택 select box 변경시 - 사용 x
     * @function
     * @param {Sting} value
     * @param {Sting} n
     */
    changeBenefit(value, n) {
      // this.$emit('selectBenefitInfo', this.selectExcludes);
    },
    /**
     * 추가 혜택 selectbox disable
     */
    isVisible(data) {
      let flag = false;
      for (const i in this.selectExcludes) {
        if (this.selectExcludes[i] === data) {
          flag = true;
        }
      }
      return flag;
    },
    selectSubscription() {
      let selectSubscriptionFlag = true;
      let subscriptionInfo = {};
      for (const i in this.computeSubscriptionList) {
        if (this.currentTab === this.computeSubscriptionList[i].subscriptionId) {
          subscriptionInfo = this.computeSubscriptionList[i];
          if (this.selectExcludes.length < this.computeSubscriptionList[i].optSelMndtCnt) {
            selectSubscriptionFlag = false;
            break;
          }
        }
      }

      if (selectSubscriptionFlag) {
        this.$emit('closePopup', false, subscriptionInfo, this.selectExcludes);
        this.currentTab = '';
        this.selectExcludes = [];
      } else {
        alert('추가 혜택을 선택해주세요.');
      }
    }
  }
};
</script>
