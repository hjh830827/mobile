<template>
  <div
    class="modal modal-seller-detail-"
    :class="quickPsblStockCase"
    role="dialog"
    aria-modal="true"
    :style="{ display: openFlag ? 'block' : 'none' }"
  >
    <div v-if="quickPsblStockCase == 'a1'" class="modal-dialog" role="document">
      <div class="modal-body">
        <div class="modal-header">
          <h1 class="modal-title">바로도착(행복배송) 가능 안내</h1>
        </div>

        <div class="modal-content">
          <p class="paragraph">해당 지역은 서비스 대상 지역이며, 바로도착, 행복배송 모두 가능합니다.</p>
        </div>

        <div class="modal-footer">
          <span class="group-r">
            <button type="button" class="btn-secondary-text" @click.prevent="closePopup('a1')">확인</button>
          </span>
        </div>
      </div>
    </div>
    <div v-if="quickPsblStockCase == 'a2'" class="modal-dialog" role="document">
      <div class="modal-body">
        <div class="modal-header">
          <h1 class="modal-title">바로도착(행복배송) 불가 안내</h1>
        </div>

        <div class="modal-content">
          <!-- case 1 -->
          <p class="paragraph">해당 지역은 서비스 대상 지역이나, 금일 휴대폰 재고가 모두 소진되었습니다.</p>
          <!-- case 2 -->
          <p class="paragraph">입력된 주소는 바로도착(행복배송) 서비스 지역이 아닙니다.</p>
        </div>

        <div class="modal-footer">
          <span class="group-l">
            <button type="button" class="btn-default-text js-modal-close" @click.prevent="closePopup('a2')">
              주소지 변경
            </button>
          </span>
          <span class="group-r">
            <button type="button" class="btn-secondary-text" @click.prevent="closePopup('a3')">택배로 변경</button>
          </span>
        </div>
      </div>
    </div>
    <div v-if="quickPsblStockCase == 'a3'" class="modal-dialog" role="document">
      <div class="modal-body">
        <div class="modal-header">
          <h1 class="modal-title">행복배송 불가 안내</h1>
        </div>

        <div class="modal-content">
          <p class="paragraph">
            해당 지역은 서비스 대상 지역이나, 지금은 행복배송이 불가능합니다. 배송방법을 바로도착으로 변경해주세요.
          </p>
        </div>

        <div class="modal-footer">
          <span class="group-r">
            <button type="button" class="btn-secondary-text" @click.prevent="closePopup('a4')">
              바로도착으로 변경
            </button>
          </span>
        </div>
      </div>
    </div>

    <div class="dimmed"></div>
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
    quickPsblStockCase: {
      type: String,
      required: true,
      default: ''
    }
  },
  methods: {
    /**
     * 팝업을 감춘다.
     * @function
     */
    closePopup(caseData) {
      try {
        this.$emit('closePopup', caseData);
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
