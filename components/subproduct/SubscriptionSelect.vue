<template>
  <div class="opt-group">
    <h2 class="opt-group-tit">요금제 선택</h2>
    <div class="opt-group-con type-plan">
      <div
        v-for="(item, index) in subscriptionList"
        :key="index"
        class="seller-plan-item"
        :class="{ open: item.subscriptionId === selectSubscription }"
      >
        <div class="inner" @click.prevent="clickSubscription(item)">
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
              <!-- 해당 정보 확인 중 <span class="sub-tit">120,000원/월</span> -->
            </div>
          </div>
          <p class="desc">{{ item.dataDtlPhrs }}</p>
          <hr class="hr" />
        </div>
        <div v-if="convertParseInt(item.optSelMndtCnt) > 0 || item.subscriptionGuidDtl != ''" class="area-toggle-cont">
          <h3 class="g-invisible">혜택 자세히보기</h3>
          <strong v-if="convertParseInt(item.optSelMndtCnt) > 0" class="txt-info">
            추가 혜택 <em>{{ item.optSelMndtCnt }}개</em>를 선택해주세요.
          </strong>
          <span v-for="n in convertParseInt(item.optSelMndtCnt)" :key="n" class="c-select">
            <select v-model="selectExcludes[n - 1]" class="select" @change="changeBenefit()">
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
      <button type="button" class="btn-plan-list" @click.prevent="openPopupSubscriptionSelect">
        <span>요금제를 선택하세요.</span>
      </button>
      <button type="button" class="btn-default btn-fix" @click.prevent="openPopupBenefitDetail">
        혜택 자세히 보기
      </button>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  filters: {
    comma(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  },
  props: {
    subscriptionList: {
      type: Array,
      required: true
    },
    propSubscriptionId: {
      type: String,
      required: false,
      default: ''
    },
    propSelectBenefit: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectExcludes: []
    };
  },
  computed: {
    selectBenefit: {
      get() {
        return this.propSelectBenefit;
      },
      set(value) {}
    },
    selectSubscription: {
      get() {
        return this.propSubscriptionId;
      },
      set(value) {
        this.$emit('selectSubscriptionInfo', value);
      }
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
     * 추가혜택 선택 데이터 set
     */
    selectbenefit(benefit) {
      this.selectExcludes = benefit;
      // if (this.selectExcludes.length > 0) {
      //   this.changeBenefit();
      // }
    },
    /**
     * 추가 혜택 select box 변경시
     * @function
     */
    changeBenefit() {
      this.$emit('selectBenefitInfo', this.selectExcludes);
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
    /**
     * 요금제 선택
     * @function
     * @param {String} data
     */
    clickSubscription(data) {
      this.selectSubscription = data;
    },
    /**
     * 혜택 자세히 보기 팝업을 보인다.
     * @function
     */
    openPopupBenefitDetail() {
      try {
        this.$emit('openPopupBenefitDetail');
      } catch (e) {
        console.log(e);
      }
    },
    /**
     * 요금제 선택 팝업을 보인다.
     * @function
     */
    openPopupSubscriptionSelect() {
      try {
        //
        this.$emit('openPopupSubscriptionSelect');
      } catch (e) {
        console.log(e);
      }
    },
    /**
     * 요금제 선택 팝업에서 선택한 요금제
     * @function
     */
    selectedzipCode(obj) {
      this.popupSubscriptionSelectFlag = false;
    },
    controlPopupSubscriptionSelect(flag) {
      try {
        this.popupSubscriptionSelectFlag = flag;
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
