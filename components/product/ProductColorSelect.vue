<template>
  <div class="opt-group">
    <h2 class="opt-group-tit">색상 선택</h2>
    <div class="opt-group-con opt-color">
      <div class="product-color">
        <div class="color-chips">
          <span v-for="(item, index) in colorList" :key="index" class="c-ick-var">
            <input
              :id="'_colorChip' + index"
              v-model="colorSeq"
              type="radio"
              name="_colorChip"
              :value="item.colorSeq"
              @click="selectColor(item)"
            />
            <label :for="'_colorChip' + index" class="text" :style="{ 'background-color': '#' + item.colorHex }">{{
              item.colorName
            }}</label>
          </span>
        </div>
        <span class="color-name">{{ selectColorName }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    colorList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      colorSeq: null,
      selectColorName: ''
    };
  },
  mounted() {
    /**
     * 페이지 이동시 set
     */
    try {
      this.colorSeq = this.$store.state.PHONE_PROD_SELECT_INFO.colorSeq;
      this.selectColorName = this.$store.state.PHONE_PROD_SELECT_INFO.colorName;
    } catch (e) {
      // console.log(e);
    }
  },
  methods: {
    /**
     * 색상 선택
     * @function
     * @param {object} obj - 선택한 색상 object
     */
    selectColor(obj) {
      this.selectColorName = obj.colorName;
      this.$emit('selectColor', obj);
    }
  }
};
</script>
