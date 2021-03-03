<template>
  <div v-show="deliveryMethodSelectedFlag && selectedMethod !== ''" class="buyer-info">
    <div class="buyer-tit">
      <h3 class="tit">배송정보</h3>
      <a v-show="firstUserAddressFlag" href="#none" class="notice" @click.prevent="modifyAddress(true)">
        이 주소가 아닌가요?
      </a>
      <a
        v-show="!firstUserAddressFlag && formConfirmedFlag"
        href="#none"
        class="notice"
        @click.prevent="modifyAddress()"
        >수정</a
      >
    </div>
    <!-- 초기 청구 주소 존재시 -->
    <ul v-show="firstUserAddressFlag" class="buyer-list">
      <li class="buyer-item">
        <span for="_deliveryParcelPhone2" class="title">휴대폰 번호</span>
        <div class="form-group">
          <span class="c-input"> {{ userAddressInfo.mobileNo }} </span>
        </div>
      </li>
      <li class="buyer-item">
        <strong class="title">주소</strong>
        <div class="detail-address">
          <div class="form-group">
            <span class="c-input">
              <span>{{ userAddressInfo.zip }}</span>
              <span>{{ userAddressInfo.basAddr }}</span>
              <span>{{ userAddressInfo.dtlAddr }}</span>
            </span>
          </div>
        </div>
      </li>
    </ul>
    <!-- //초기 청구 주소 존재시 -->

    <!-- 입력한 청구 주소 -->
    <ul v-show="!firstUserAddressFlag && formConfirmedFlag" class="buyer-list">
      <li class="buyer-item">
        <span for="_deliveryParcelPhone2" class="title">휴대폰 번호</span>
        <div class="form-group">
          <span class="c-input"> {{ selectedUserAddressInfo.mobileNo }}</span>
        </div>
      </li>
      <li class="buyer-item">
        <strong class="title">주소</strong>
        <div class="detail-address">
          <div class="form-group">
            <span class="c-input">
              <span>{{ selectedUserAddressInfo.zip }}</span>
              <span>{{ selectedUserAddressInfo.basAddr }}</span>
              <span>{{ selectedUserAddressInfo.dtlAddr }}</span>
            </span>
          </div>
        </div>
      </li>
    </ul>
    <!-- //입력한 청구 주소 -->

    <!-- 입력 폼 -->
    <div v-show="!firstUserAddressFlag && !formConfirmedFlag">
      <ul class="buyer-list">
        <li class="buyer-item">
          <label for="_deliveryParcelPhone2" class="title">휴대폰 번호</label>
          <div class="form-group">
            <span class="c-input">
              <input
                id="_deliveryParcelPhone"
                v-model="mobileNo"
                type="text"
                placeholder="- 없이 숫자만 입력해주세요"
                required="required"
                maxlength="13"
                class="input"
                oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
              />
            </span>
          </div>
        </li>
        <li class="buyer-item">
          <strong class="title">주소</strong>
          <div class="detail-address">
            <div class="form-group">
              <span class="c-input">
                <input
                  type="number"
                  title="우편번호"
                  class="input"
                  :value="selectedUserAddressInfo.zip"
                  readonly="readonly"
                  required=""
                  pattern="[0-9]*"
                  inputmode="numeric"
                />
              </span>
              <button type="button" class="btn-extra" @click="openPopupZipcode(true)">우편번호 찾기</button>
            </div>
            <div class="form-group">
              <span class="c-input">
                <input
                  type="text"
                  title="기본 주소"
                  :value="selectedUserAddressInfo.basAddr"
                  class="input"
                  readonly="readonly"
                  required=""
                />
              </span>
            </div>
            <div class="form-group">
              <span class="c-input">
                <input
                  v-model="selectedUserAddressInfo.dtlAddr"
                  type="text"
                  title="나머지 주소"
                  placeholder="나머지 주소를 입력해주세요."
                  maxlength="50"
                  class="input"
                />
              </span>
            </div>
          </div>
        </li>
      </ul>
      <button type="button" class="btn-submit" @click.prevent="ConfirmInputForm">확인</button>
    </div>
    <!-- //입력 폼 -->
    <!-- 우편번호 검색 레이어 팝업 -->
    <pop-zipcode
      :open-flag="popupZipcodeFlag"
      @selectedzipCode="selectedzipCode"
      @closePopup="openPopupZipcode(false)"
    />

    <!-- 바로도착/행복배송 가능여부 case 별 레이어 팝업 -->
    <pop-quick-psbl-stock
      :open-flag="popupQuickPsblStockFlag"
      :quick-psbl-stock-case="quickPsblStockCase"
      @closePopup="controlPopupQuickPsblStock"
    />
  </div>
</template>

<script>
import PopZipcode from '~/components/popup/PopZipcode.vue';
import PopQuickPsblStock from '~/components/popup/PopQuickPsblStock.vue';

export default {
  components: {
    PopZipcode,
    PopQuickPsblStock
  },
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
    },
    productSelectInfo: {
      type: Object,
      required: true,
      default: null
    }
  },
  data() {
    return {
      // 처음 받아온 사용자 주소 flag
      firstUserAddressFlag: false,

      // 사용자 주소 입력폼 완료 flag
      formConfirmedFlag: false,
      // 초기 청구주소
      userAddressInfo: {},
      // 우편번호 팝업 on/off flag
      popupZipcodeFlag: false,
      selectedUserAddressInfo: {
        mobileNo: '',
        zip: '',
        basAddr: '',
        dtlAddr: ''
      },
      mobileNo: '',
      // 바로도착 가능 여부 팝업 on/off flag
      popupQuickPsblStockFlag: false,
      // 바로도착 가능 여부 팝업 case
      quickPsblStockCase: '',
      popQuickPsblStockCase: ''
    };
  },
  watch: {
    number() {
      return (this.number = this.number.replace(/[^0-9]/g, '')); // 정규식 사용
    },
    /**
     * 전화번호 하이픈 처리
     * @function
     */
    mobileNo() {
      let formatNum = '';
      const num = this.mobileNo.replace(/[^0-9]/g, '');
      if (num.length === 11) {
        formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
      } else if (num.length === 7) {
        formatNum = num.replace(/(\d{3})(\d{4})/, '$1-$2');
      } else {
        formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
      }

      return (this.mobileNo = formatNum);
    }
  },
  created() {},
  mounted() {
    try {
      this.userAddressInfo = this.$store.state.PHONE_PROD_SELECT_INFO.userAddrInfo;
      this.initUserAddrData(this.userAddressInfo);
    } catch (e) {
      const svcMgmtNum = this.$store.state.SVC_MGMT_NUM;
      this.setUserAddr(svcMgmtNum); // 청구 정보
    }
  },
  methods: {
    /**
     * 청구 정보 조회
     * @function
     * @param {String} svcMgmtNum
     */
    setUserAddr(svcMgmtNum) {
      this.$parent.$parent
        .apiGetUserAddr(svcMgmtNum)
        .then(res => {
          this.userAddressInfo = res.data;
          this.initUserAddrData(this.userAddressInfo);
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * 초기 화면 데이터 set
     * @function
     * @param {object} obj - 청구 정보
     */
    initUserAddrData(obj) {
      if (obj.zip != null && obj.zip !== '') {
        this.firstUserAddressFlag = true;
      } else {
        this.firstUserAddressFlag = false;
      }
      this.selectedUserAddressInfo = obj;
      // 초기 진입시 메인 화면에 데이터 전달
      this.$emit('selectUserAddrInfo', obj);
    },
    /**
     * 바로도착/행복배송 지역, 재고 가능 여부 조회
     */
    checkQuickPsblStock() {
      this.$parent.$parent
        .apiGetQuickPsblStock(
          this.selectedUserAddressInfo.basAddr,
          this.selectedUserAddressInfo.zip,
          this.productSelectInfo.productId,
          this.productSelectInfo.colorSeq
        )
        .then(res => {
          // case 별 팝업 처리
          if (res.data.qckPsblAreaYn === 'Y' && res.data.strdCapaPsblYn === 'Y') {
            if (res.data.primCapaPsblYn === 'Y') {
              this.quickPsblStockCase = 'a1';
            } else {
              this.quickPsblStockCase = 'a3';
            }
          } else if (res.data.qckPsblAreaYn === 'Y' && res.data.strdCapaPsblYn === 'N') {
            this.quickPsblStockCase = 'a4';
          } else {
            this.quickPsblStockCase = 'a2';
          }
          this.popupQuickPsblStockFlag = true;
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * 사용자 주소를 수정한다.
     * @function
     * @param {boolean} firstFlag - 처음 받아온 사용자 주소를 수정할 때 true 입력. 그 외에는 값을 입력하지 않는다.
     */
    modifyAddress(firstFlag) {
      this.formConfirmedFlag = false;
      // 처음 받아온 사용자 주소가 있을 때 수정을 진행하려고 한 뒤에는, 일반 수정/입력 상태로 바뀐다.
      if (firstFlag) this.firstUserAddressFlag = false;
      this.selectedUserAddressInfo.zip = '';
      this.selectedUserAddressInfo.basAddr = '';
      this.selectedUserAddressInfo.dtlAddr = '';
      this.$emit('selectUserAddrInfo', this.selectedUserAddressInfo);
    },
    /**
     * 입력하거나 수정한 내용을 확정한다.
     * @function
     */
    ConfirmInputForm() {
      // validation 체크 후 데이터 전송
      if (
        this.mobileNo === '' ||
        this.selectedUserAddressInfo.zip === '' ||
        this.selectedUserAddressInfo.basAddr === '' ||
        this.selectedUserAddressInfo.dtlAddr === ''
      ) {
        alert('배송 정보를 입력해주세요.');
        return;
      }
      this.selectedUserAddressInfo.mobileNo = this.mobileNo;
      this.$emit('selectUserAddrInfo', this.selectedUserAddressInfo);
      this.formConfirmedFlag = true;

      // 바로도착 / 행복배송일때 가능여부 체크
      if (this.productSelectInfo.dlvTyp === '10' || this.productSelectInfo.dlvTyp === '09') {
        this.checkQuickPsblStock();
      }
    },

    /**
     * 주소 검색 팝업 show / hide
     * @function
     */
    openPopupZipcode(flag) {
      try {
        this.preventBodyScroll(flag)//팝업 오픈 상태에서는 아래 컨텐츠 Scroll 방지.
        this.popupZipcodeFlag = flag;
      } catch (e) {
        console.log(e);
      }
    },
    /**
     * 우편검색 팝업에서 선택한 zipcode 전달
     */
    selectedzipCode(zipcode) {
      this.selectedUserAddressInfo.zip = zipcode.zip;
      this.selectedUserAddressInfo.basAddr = zipcode.newAddr;
      this.popupZipcodeFlag = false;
    },
    /**
     * 바로도착/행복배송 케이스 별 팝업 처리
     * @function
     * @param {String} popQuickPsblStockCase - a1(닫기),a2(주소지변경), a3(택배로변경), a4(바로도착변경)
     */
    controlPopupQuickPsblStock(popQuickPsblStockCase) {
      try {
        this.popupQuickPsblStockFlag = false;
        if (popQuickPsblStockCase === 'a2') {
          this.modifyAddress(true);
        } else if (popQuickPsblStockCase === 'a3') {
          this.$emit('setMethod', '01');
        } else if (popQuickPsblStockCase === 'a4') {
          this.$emit('setMethod', '10');
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
