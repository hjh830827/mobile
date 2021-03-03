<template>
  <div class="opt-group">
    <h2 class="opt-group-tit">배송 가능 방법</h2>
    <div class="opt-group-con opt-delivery">
      <select-methods ref="selectMethods" :delivery="delivery" @selectMethod="selectMethod" />
      <p v-if="delivery.qckPsblAreaYn === 'Y' || delivery.primYn === 'Y'" class="opt-group-notice">
        <a href="#none" @click.prevent="openPopup">바로도착/행복배송에 대해 알아보세요.</a>
      </p>

      <!-- 사용자 주소 정보 -->
      <user-address
        ref="userAddress"
        :selected-method="selectedMethod"
        :product-select-info="productSelectInfo"
        :delivery-method-selected-flag="deliveryMethodSelectedFlag"
        @selectUserAddrInfo="selectUserAddrInfo"
        @setMethod="setMethod"
      />
      <!-- // 사용자 주소 정보 -->

      <!-- 매장 주소 정보 -->
      <store-address :selected-method="selectedMethod" :delivery-method-selected-flag="deliveryMethodSelectedFlag" />
      <!-- //매장 주소 정보 -->
    </div>
  </div>
</template>

<script>
import SelectMethods from '~/components/product/productDelivery/SelectMethods';
import UserAddress from '~/components/product/productDelivery/UserAddress';
import StoreAddress from '~/components/product/productDelivery/StoreAddress';

export default {
  components: {
    SelectMethods,
    UserAddress,
    StoreAddress
  },
  props: {
    delivery: {
      type: Object,
      required: true,
      default: null
    },
    productSelectInfo: {
      type: Object,
      required: true,
      default: null
    }
  },
  data() {
    return {
      // 선택된 배송방법
      selectedMethod: '',
      // 배송방법 선택 flag
      deliveryMethodSelectedFlag: true,
      // 선택한 주소 정보
      selectedUserAddressInfo: {}
    };
  },
  watch: {
    /**
     * 선택된 배송방법이
     * 바로픽업 -> 매장 주소 입력정보
     * 그 외 -> 사용자 주소 입력정보
     * @function
     */
    selectedMethod() {
      if (this.selectedMethod !== '') {
        if (this.selectedMethod === '06') {
          // 바로픽업
          this.deliveryMethodSelectedFlag = false;
        } else {
          this.deliveryMethodSelectedFlag = true;
        }
      }
    }
  },
  async mounted() {},
  methods: {
    /**
     * 바로도착/행복배송 팝업을 보여준다.
     * @function
     */
    openPopup() {
      try {
        this.$emit('openPopupDelivery');
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * 배송 방법 선택
     * @function
     * @param {string} name - 선택된 배송방법
     */
    selectMethod(name) {
      this.selectedMethod = name;
      // 주소 정보 존재시 바로도착/행복배송 지역, 재고 가능 여부 조회
      if (
        (name === '10' || name === '09') &&
        this.selectedUserAddressInfo.zip !== null &&
        this.selectedUserAddressInfo.zip !== ''
      ) {
        this.$refs.userAddress.checkQuickPsblStock();
      }
      this.$emit('selectDeliveryMethod', name);
    },

    /**
     * 전달받은 배송 방법을 selectMethods로 전달한다.
     * name = null은 색상 선택시 배송 방법 초기화로 사용한다.
     * @function
     * @param {String} name - 배송 방법
     */
    setMethod(name) {
      this.$refs.selectMethods.selectMethod(name);
    },

    /**
     * 주소 정보
     * @function
     * @param {obejct} selectedUserAddressInfo
     */
    selectUserAddrInfo(selectedUserAddressInfo) {
      this.selectedUserAddressInfo = selectedUserAddressInfo;
      this.$emit('selectUserAddrInfo', selectedUserAddressInfo);
    }
  }
};
</script>

<style lang="scss" scoped></style>
