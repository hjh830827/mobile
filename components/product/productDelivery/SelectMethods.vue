<template>
  <div role="tablist" class="sort-lists">
    <button
      ref="button10"
      type="button"
      class="sort-items"
      name="deliveryMethod"
      aria-selected="false"
      :disabled="delivery.qckPsblAreaYn === 'N'"
      @click="selectMethod('10')"
    >
      <span class="tit">바로도착</span>
      <span v-if="delivery.strdOrdPsblTmYn === 'Y'" class="desc"
        ><strong>{{ delivery.qckDlvStrdRemainTime }}</strong> 이내<br />
        주문하면 오늘 도착</span
      >
      <span v-if="delivery.strdOrdPsblTmYn === 'N'" class="desc"
        >{{ delivery.qckDlvStrdPsblTo }}시 이후 주문 시<br />내일(주말:월요일) 도착</span
      >
    </button>
    <button
      ref="button09"
      type="button"
      class="sort-items"
      name="deliveryMethod"
      aria-selected="false"
      :disabled="delivery.primYn === 'N'"
      @click="selectMethod('09')"
    >
      <span class="tit">행복배송</span>
      <span v-if="delivery.primOrdPsblTmYn === 'Y'" class="desc"
        ><strong>{{ delivery.qckDlvPrimRemainTime }}</strong> 이내<br />주문하면 오늘 도착</span
      >
      <span v-if="delivery.primOrdPsblTmYn === 'N'" class="desc"
        >{{ delivery.qckDlvPrimPsblTo }}시 이후 주문 시<br />내일(주말:월요일) 도착</span
      >
    </button>
    <button
      ref="button01"
      type="button"
      name="deliveryMethod"
      class="sort-items"
      aria-selected="false"
      @click="selectMethod('01')"
    >
      <span class="tit">택배</span>
      <span class="desc">꼼꼼하게 포장하여<br />우체국 익일 특급 배송</span>
    </button>
    <button
      ref="button06"
      type="button"
      name="deliveryMethod"
      class="sort-items"
      aria-selected="false"
      disabled
      @click="selectMethod('06')"
    >
      <span class="tit">바로픽업</span>
      <span class="desc">주문하고 가까운<br />대리점에서 바로 찾기</span>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    delivery: {
      type: Object,
      required: true,
      default: null
    }
  },
  data() {
    return {
      buttonLength: 4,

      // 10:바로배송, 09:행복배송, 01:택배, 06:바로픽업 - TODO : 공통 코드 정보
      buttons: ['06', '09', '10', '01'],

      // 버튼 엘리먼트
      buttonElements: []
    };
  },
  watch: {},
  created() {},
  async mounted() {
    await this.setButtonElements();
    try {
      this.selectMethod(this.$store.state.PHONE_PROD_SELECT_INFO.dlvTyp);
    } catch (e) {
      // console.log(e);
    }
  },
  methods: {
    /**
     * 버튼 엘리먼트를 배열에 넣는다.
     * @function
     */
    setButtonElements() {
      for (let i = 0; i < this.buttonLength; i++) {
        if (this.$refs[`button${this.buttons[i]}`]) {
          this.buttonElements.push(this.$refs[`button${this.buttons[i]}`]);
        }
      }
    },

    /**
     * 버튼을 선택하면 aria-selected를 true로 바꾼다.
     * 현재 선택된 버튼의 name을 저장한다.
     * @function
     */
    selectMethod(name) {
      try {
        for (let i = 0; i < this.buttonElements.length; i++) {
          this.buttonElements[i].ariaSelected = false;
        }
        if (name !== null && name !== '') {
          console.log(`button${name}`);
          this.$refs[`button${name}`].ariaSelected = true;
        }
        this.$emit('selectMethod', name);
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
