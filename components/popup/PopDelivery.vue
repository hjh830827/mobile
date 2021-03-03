<template>
  <div class="popup pop-seller pop-info-deilivery" :style="{ display: openFlag ? 'block' : 'none' }">
    <div class="popup-body">
      <div class="popup-header">
        <h1 class="popup-title">바로도착/행복배송 이란?</h1>
      </div>
      <div role="main" class="popup-content">
        <h2 class="title-content">행복배송 안내</h2>
        <p class="txt-info">
          월~토요일 {{ delivery.qckDlvStrdPsblTo }}시까지 주문하면 전문 컨설턴트가 방문하여 개통과 데이터 이전까지
          도와드리는 서비스입니다.
        </p>
        <h3 class="g-invisible">행복배송 개통 절차</h3>
        <ol class="list-info-step">
          <li>
            <div class="title-step">
              <span>주문</span>
            </div>
            <p class="txt-step">
              <strong>{{ delivery.qckDlvStrdPsblTo }}시</strong>마감
            </p>
          </li>
          <li>
            <div class="title-step">
              <span>배송</span>
            </div>
            <p class="txt-step"><strong>T 매니저</strong>방문</p>
          </li>
          <li>
            <div class="title-step">
              <span>개통</span>
            </div>
            <p class="txt-step">
              <strong>데이터 이전, 중고폰 매각, 개통 세팅 도움</strong>
            </p>
          </li>
        </ol>
        <h2 class="title-content">바로도착 안내</h2>
        <p class="txt-info">
          월~토요일 {{ delivery.qckDlvPrimPsblTo }}시까지 주문하면 배송 파트너가 방문하여 주문하신 휴대폰을 배송해
          드립니다.
        </p>
        <h3 class="g-invisible">바로도착 개통 절차</h3>
        <ol class="list-info-step">
          <li>
            <div class="title-step">
              <span>주문</span>
            </div>
            <p class="txt-step">
              <strong>{{ delivery.qckDlvPrimPsblTo }}시</strong>마감
            </p>
          </li>
          <li>
            <div class="title-step">
              <span>배송</span>
            </div>
            <p class="txt-step"><strong>배송기사님</strong>방문</p>
          </li>
          <li>
            <div class="title-step">
              <span>개통</span>
            </div>
            <p class="txt-step"><strong>Self</strong>개통</p>
          </li>
        </ol>
      </div>
      <button type="button" class="btn-close" @click.prevent="closePopup">
        <span class="ico-close">팝업 닫기</span>
      </button>
    </div>
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
    delivery: {
      type: Object,
      required: true,
      default: null
    }
  },
  methods: {
    /**
     * 팝업을 감춘다.
     * @function
     */
    closePopup() {
      try {
        this.$emit('closePopup');
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
