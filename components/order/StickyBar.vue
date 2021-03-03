<template>
  <div ref="stickyBar" class="sticky-bar">
    <div class="layer-pay">
      <div class="l-grid">
        <div class="btn-area">
          <button type="button" class="btn-primary" @click="applicationForm">신청서 작성하기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  mounted() {
    // this.$emit('mounted', this.$refs.stickyBar); - 210118 삭제
  },
  methods: {
    /**
     * 신청서 작성 이동
     * @function
     */
    applicationForm() {
      this.$emit('applicationForm');
    }
  }
};
</script>
