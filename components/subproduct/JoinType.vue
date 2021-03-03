<template>
  <div class="opt-group">
    <h2 class="opt-group-tit">가입유형</h2>
    <div class="opt-group-con">
      <div class="product-option-col join-types">
        <span v-for="(item, index) in defaultSubscriptionList" :key="index" class="c-ick-var">
          <!-- [D] 비활성 상태 애트리뷰트 disabled 추가/삭제 -->
          <input
            :id="'_joinType' + index"
            v-model="entryCd"
            :value="item.entryCd"
            type="radio"
            :disabled="item.entryDisableFlag"
            name="_joinType"
          />
          <label :for="'_joinType' + index">{{ item.codeNm }}</label>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    defaultSubscriptionList: {
      type: Array,
      required: true
    },
    propsEntryCd: {
      type: String,
      required: true
    }
  },
  computed: {
    entryCd: {
      get() {
        return this.propsEntryCd;
      },
      set(value) {
        this.$emit('selectEntryCd', value);
      }
    }
  },
  mounted() {},
  methods: {}
};
</script>
