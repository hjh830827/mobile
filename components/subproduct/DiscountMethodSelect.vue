<template>
  <div class="opt-group">
    <h2 class="opt-group-tit">할인 방법</h2>
    <div class="opt-group-con type-discount">
      <div class="product-option-row discount-types">
        <span v-for="(item, index) in propChildList" :key="index" class="c-ick-var">
          <input
            :id="'_discountType' + index"
            v-model="discountType"
            :value="item.subcommId"
            type="radio"
            name="_discountType"
            :disabled="propSubscriptionId == ''"
            @click="selectDiscountMethod(item)"
          />
          <label :for="'_discountType' + index">
            <div class="row">
              <span class="txt">{{ item.subcommTerm }} 개월 휴대폰 할인</span>
              <span class="desc">총 - {{ item.totalDisamt | comma }}원</span>
            </div>
            <div v-if="item.commitmentCd === '1'" class="row">
              <span class="txt">공시지원금+지원금</span>
            </div>
            <div v-if="item.commitmentCd != '1'" class="row">
              <span class="txt">통신요금의 25%(선택약정)</span>
              <span class="desc">월 - {{ item.subcommDisamt | comma }} 원</span>
            </div>
          </label>
        </span>
      </div>
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
    propChildList: {
      type: Array,
      required: true
    },
    propSubscriptionId: {
      type: String,
      required: true
    },
    propSubcommId: {
      type: String,
      required: false,
      default: ''
    }
  },
  computed: {
    // 휴대폰 할인 1, 12개월 요금할인 2, 24개월 요금할인 3
    discountType: {
      get() {
        return this.propSubcommId;
      },
      set(value) {}
    }
  },
  methods: {
    /**
     * 할인 방법 선택
     * @function
     * @param {object} obj - 선택한 할인방법 object
     */
    selectDiscountMethod(obj) {
      this.$emit('selectDiscountMethod', obj);
    }
  }
};
</script>
