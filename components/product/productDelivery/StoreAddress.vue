<template>
  <div v-show="!deliveryMethodSelectedFlag && selectedMethod !== ''" class="buyer-info">
    <div class="buyer-tit">
      <h3 class="tit">바로 픽업 매장</h3>
      <a v-show="formConfirmedFlag" href="#none" class="notice" @click.prevent="modifyAddress()">수정</a>
    </div>
    <!-- 입력된 텍스트 -->
    <ul v-show="formConfirmedFlag" class="buyer-list">
      <li class="buyer-item">
        <label for="_deliveryPickupPhone" class="title">휴대폰 번호</label>
        <div class="form-group">
          <span class="c-input"> 010-1234-5678 </span>
        </div>
      </li>
      <li class="buyer-item">
        <label for="_deliveryPickupShop" class="title">매장 정보</label>
        <div class="form-group">
          <span class="c-input">
            <span>인천중구대리점 부천시청역 직영점</span>
            <span>경기도 부천시 원미구 길주로 189(중동, 우신빌딩)</span>
            <span>032-326-0329</span>
          </span>
        </div>
      </li>
      <li class="buyer-item">
        <label for="_deliveryPickupShop" class="title">방문 일시</label>
        <div class="form-group">
          <span class="c-input">
            <span>2020년 12월 02일</span>
            <span>18:00 ~ 18:30</span>
          </span>
        </div>
      </li>
    </ul>
    <!-- //입력된 텍스트 -->

    <!-- 입력 폼 -->
    <div v-show="!formConfirmedFlag">
      <ul class="buyer-list">
        <li class="buyer-item">
          <label for="_deliveryPickupPhone" class="title">휴대폰 번호</label>
          <div class="form-group">
            <span class="c-input">
              <input
                id="_deliveryPickupPhone"
                type="tel"
                placeholder="- 없이 숫자만 입력하세요"
                class="input"
                required=""
                maxlength="11"
              />
            </span>
          </div>
        </li>
        <li class="buyer-item">
          <label for="_deliveryPickupShop" class="title">바로픽업 매장</label>
          <div class="form-group">
            <span class="c-input">
              <input id="_deliveryPickupShop" type="text" value="" class="input" readonly="readonly" required="" />
            </span>
            <button type="button" class="btn-extra">매장 찾기</button>
          </div>
        </li>
        <li class="buyer-item">
          <strong class="title">방문 일시</strong>
          <div class="form-group">
            <span class="c-select" style="width: 50%">
              <select title="일자 선택" class="select">
                <option value="" selected="selected">일자 선택</option>
                <option value="">9월 21일</option>
                <option value="">9월 22일</option>
                <option value="">9월 23일</option>
                <option value="">9월 24일</option>
                <option value="">9월 25일</option>
                <optgroup label=""></optgroup>
              </select>
            </span>
            <span class="c-select" style="width: 50%">
              <select title="시간 선택" class="select">
                <option value="" selected="selected">시간 선택</option>
                <option value="">오후 12시 ~ 오후 1시</option>
                <option value="">오후 1시 ~ 오후 2시</option>
                <option value="">오후 2시 ~ 오후 3시</option>
                <option value="">오후 3시 ~ 오후 4시</option>
                <option value="">오후 4시 ~ 오후 5시</option>
                <option value="">오후 5시 ~ 오후 6시</option>
                <optgroup label=""></optgroup>
              </select>
            </span>
          </div>
        </li>
      </ul>
      <button type="button" class="btn-submit" @click.prevent="ConfirmInputForm">확인</button>
    </div>
    <!-- //입력 폼 -->
  </div>
</template>

<script>
export default {
  props: {
    selectedMethod: {
      type: String,
      required: true,
      default: ''
    },
    deliveryMethodSelectedFlag: {
      type: Boolean,
      required: true,
      default: true
    }
  },
  data() {
    return {
      // 매장 주소 입력폼 완료 flag
      formConfirmedFlag: false
    };
  },
  watch: {},
  mounted() {},
  methods: {
    /**
     * 매장 주소를 수정한다.
     * @function
     */
    modifyAddress(firstFlag) {
      this.formConfirmedFlag = false;
    },

    /**
     * 입력하거나 수정한 내용을 확정한다.
     * @function
     */
    ConfirmInputForm() {
      this.formConfirmedFlag = true;
    }
  }
};
</script>

<style lang="scss" scoped></style>
