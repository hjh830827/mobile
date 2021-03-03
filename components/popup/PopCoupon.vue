<template>
  <div class="popup pop-seller pop-coupon" :style="{ display: openFlag ? 'block' : 'none' }">
    <div class="popup-body">
      <div class="popup-header">
        <h1 class="popup-title">쿠폰 등록 및 적용</h1>
      </div>
      <!-- //popup-header -->
      <div role="main" class="popup-content">
        <div class="spot-area">
          <div class="spot">
            <h2 class="h-type">쿠폰 조회</h2>
          </div>
          <div class="form-group">
            <span class="c-select">
              <select id="_receiveBills" v-model="selectCpnInfo" title="쿠폰 조회" class="select">
                <option v-if="couponList.length === 0" value="" disabled>적용 가능한 쿠폰이 없습니다.</option>
                <option v-if="couponList.length > 0" value="" selected="selected">쿠폰을 선택해주세요.</option>
                <option v-for="(item, index) in couponList" :key="index" :value="item">
                  {{ item.cpnNm }}
                </option>
              </select>
            </span>
          </div>
        </div>
        <div class="spot-area coupon-border">
          <div class="spot">
            <h2 class="h-type">쿠폰 등록</h2>
          </div>
          <div class="form-group">
            <span class="c-input">
              <!-- [D] 검색어 입력시 btn-delete 호출 -->
              <input
                v-model="cpnIsueId"
                type="text"
                placeholder="쿠폰 번호를 입력해주세요."
                title="쿠폰 번호를 입력해주세요."
                class="input"
              />
              <button class="btn-delete" :style="{ display: cpnIsueId != '' ? 'block' : 'none' }">
                <span class="ico-delete" @click="delCpnIsueId">입력 내용 삭제</span>
              </button>
            </span>
            <button type="button" class="btn-extra" @click="couponReg">등록하기</button>
          </div>
          <ul class="dsc-list">
            <li class="dsc-item">
              쿠폰 사용 주문 후에 할부 개월 변경과 같은 조건 변경 시 쿠폰 적용이 취소되며, 사용된 쿠폰은 재사용 불가 할
              수 있습니다.
            </li>
            <li class="dsc-item">쿠폰 적용 후 최소 할부원금은 1,000원 입니다.</li>
            <li class="dsc-item">쿠폰 등록 완료 후 등록 취소는 불가능합니다.</li>
            <li class="dsc-item">쿠폰 등록/사용 유효기간을 확인해 주세요.</li>
          </ul>
        </div>
      </div>
      <div class="popup-footer">
        <div class="btn-area">
          <button type="button" class="btn-primary btn-lg" @click="applyCoupon">쿠폰 적용하기</button>
        </div>
      </div>
      <!-- //popup-content -->
      <button type="button" class="btn-close" @click.prevent="closePopup">
        <span class="ico-close">팝업 닫기</span>
      </button>
    </div>
    <!-- // popup-body -->
  </div>
</template>

<script>
export default {
  props: {
    openFlag: {
      type: Boolean,
      required: true,
      default: false
    },
    couponList: {
      type: Array,
      required: true,
      default: null
    }
  },
  data() {
    return {
      cpnIsueId: '',
      selectCpnInfo: ''
    };
  },
  computed: {},
  methods: {
    /**
     * 팝업을 감춘다.
     * @function
     */
    closePopup() {
      try {
        this.$emit('closePopupCoupon', false);
      } catch (e) {
        console.log(e);
      }
    },
    /**
     * 쿠폰 등록
     * @function
     * @param {String} custId - 고객ID
     * @param {String} cpnIsueId - 쿠폰발급ID
     */
    couponReg() {
      if (this.cpnIsueId === '') {
        alert('쿠폰 번호를 입력해주세요.');
        return;
      }
      this.$parent
        .apiPostCouponReg('', this.cpnIsueId)
        .then(res => {
          this.$emit('setCouponList');
          this.selectCpnInfo = '';
          this.cpnIsueId = '';
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * 쿠폰발급ID 삭제
     * @function
     */
    delCpnIsueId() {
      this.cpnIsueId = '';
    },
    /**
     * 쿠폰 적용
     * @function
     */
    applyCoupon() {
      if (this.selectCpnInfo === '') {
        alert('적용 가능한 쿠폰이 없습니다.');
      } else {
        this.$emit('closePopupCoupon', false, this.selectCpnInfo);
      }
    }
  }
};
</script>
