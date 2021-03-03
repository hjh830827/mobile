<template>
  <div class="opt-group">
    <h2 class="opt-group-tit">납부 방법</h2>
    <div class="opt-group-con type-pay-way">
      <div class="product-option-col">
        <span v-for="(item, index) in payTypeList" :key="index" class="c-ick-var">
          <input
            :id="'_payType' + item.mCd"
            v-model="propPayTypeCd"
            :value="item.mCd"
            type="radio"
            name="_payType"
            :disabled="propEntryCd === '11' && item.mCd !== '0'"
            @click="selectPayType(item.mCd)"
          />
          <label :for="'_payType' + item.mCd">{{ item.codeNm }}</label>
        </span>
      </div>
      <p class="txt">일시불 선택 시 결제 단계에서 카드 할부를 이용할 수 있습니다.</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    propEntryCd: {
      type: String,
      required: true
    },
    propPayTypeCd: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      // 12:12개월, 24:24개월, 30:30개월, 0: 일시불 - TODO : 공통 코드 정보
      payTypeList: [
        { mCd: '12', codeNm: '12개월' },
        { mCd: '24', codeNm: '24개월' },
        { mCd: '30', codeNm: '30개월' },
        { mCd: '0', codeNm: '일시불' }
      ]
    };
  },
  methods: {
    /**
     * 할인 방법 선택
     * @function
     * @param {object} payTypeCd - 선택한 할인방법 CD
     */
    selectPayType(payTypeCd) {
      this.$emit('selectPayType', payTypeCd);
    }
  }
};
</script>
