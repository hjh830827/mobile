<template>
  <div v-if="fmlyWlfInfo.wlfDcAmt !== ''" class="opt-group">
    <h2 class="opt-group-tit">복지 할인</h2>
    <div class="opt-group-con type-welfare">
      <div class="product-option-col">
        <span class="c-ick-var">
          <input id="w1" v-model="selectWlfYn" value="Y" type="radio" name="w" />
          <label for="w1">적용 {{ fmlyWlfInfo.wlfDcAmt | comma }}<span class="unit">원/월</span></label>
        </span>
        <!-- [D] 비활성 상태 애트리뷰트 disabled 추가/삭제 -->
        <span class="c-ick-var">
          <input id="w2" v-model="selectWlfYn" value="N" type="radio" name="w" />
          <label for="w2">미적용</label>
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
    propWlfYn: {
      type: String,
      required: true
    }
  },
  computed: {
    selectWlfYn: {
      get() {
        return this.propWlfYn;
      },
      set(value) {
        this.$emit('selectWlfYn', value, this.fmlyWlfInfo.wlfDcAmt);
      }
    }
  },
  methods: {}
};
</script>
