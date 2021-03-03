<template>
  <div v-if="fmlyWlfInfo.fmlyDcAmt !== ''" class="opt-group">
    <h2 class="opt-group-tit">온가족 할인</h2>
    <div class="opt-group-con type-family">
      <div class="product-option-col">
        <span class="c-ick-var">
          <input id="f1" v-model="selectFmlyDcCd" value="Y" type="radio" name="f" />
          <label for="f1">적용 {{ fmlyWlfInfo.fmlyDcAmt | comma }}<span class="unit">원/월</span></label>
        </span>
        <!-- [D] 비활성 상태 애트리뷰트 disabled 추가/삭제 -->
        <span class="c-ick-var">
          <input id="f2" v-model="selectFmlyDcCd" value="N" type="radio" name="f" />
          <label for="f2">미적용</label>
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
    fmlyWlfInfo: {
      type: Object,
      required: true
    },
    propFmlyDcCd: {
      type: String,
      required: true
    }
  },
  computed: {
    selectFmlyDcCd: {
      get() {
        return this.propFmlyDcCd;
      },
      set(value) {
        this.$emit('selectFmlyDcCd', value, this.fmlyWlfInfo.fmlyDcAmt);
      }
    }
  },
  methods: {}
};
</script>
