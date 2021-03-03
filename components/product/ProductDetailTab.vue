<template>
  <div class="seller-tab-area">
    <ul class="tab-list">
      <!-- [D] 탭 선택 시 해당 li태그에 'on' class 추가 -->
      <li class="tab-item" :class="getActiveClass(TAB1)" data-tab="seller-detail-tab">
        <a href="#none" class="" @click.prevent="setTab(TAB1)"><em>특장점</em></a>
      </li>
      <li class="tab-item" :class="getActiveClass(TAB2)" data-tab="seller-detail-tab">
        <a href="#none" class="" @click.prevent="setTab(TAB2)"><em>구매후기</em></a>
      </li>
    </ul>
    <div v-show="currentTab === TAB1" data-tab-content="seller-detail-tab" class="tab-content">
      <product-feature-point />
    </div>
    <div v-show="currentTab === TAB2" data-tab-content="seller-detail-tab" class="tab-content">
      <product-purchase-review />
    </div>
  </div>
</template>

<script>
import ProductFeaturePoint from './ProductFeaturePoint.vue';
import ProductPurchaseReview from './ProductPurchaseReview.vue';
export default {
  components: { ProductFeaturePoint, ProductPurchaseReview },
  data() {
    return {
      TAB1: 'FEATURE_POINT',
      TAB2: 'PURCHASE_REVIEW',
      currentTab: 'FEATURE_POINT'
    };
  },
  methods: {
    /**
     * active class 'on'
     * @param {string} tab - 현재 탭과 비교할 탭 이름
     */
    getActiveClass(tab) {
      try {
        if (this.currentTab === tab) return 'on';
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
        this.currentTab = tab;
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
