<template>
  <div class="popup pop-seller pop-search-zip" :style="{ display: openFlag ? 'block' : 'none' }">
    <div class="popup-body">
      <div class="popup-header">
        <h1 class="popup-title">우편번호 검색</h1>
      </div>
      <div role="main" class="popup-content">
        <p class="txt-form-info">찾으시는 도로명 주소나 지번 주소를 입력 후 검색 버튼을 눌러주세요.</p>
        <div class="form-group">
          <span class="c-input">
            <!-- [D] 검색어 입력시 btn-delete 호출 -->
            <input
              v-model="keyword"
              type="text"
              placeholder="도로명 또는 지번 주소를 입력해주세요."
              title="주소 입력"
              class="input"
            />
            <button class="btn-delete"><span class="ico-delete">입력 내용 삭제</span></button>
          </span>
          <button type="button" class="btn-extra" @click.prevent="searchZipcode">검색</button>
        </div>
        <!-- [D] 우편번호 검색 결과 있음 -->
        <div v-if="zipcodeList.length > 0" class="area-result">
          <span class="g-invisible">검색된 우편번호 목록</span>
          <ul class="list-address">
            <li v-for="(item, index) in zipcodeList" :key="index">
              <a
                href="#none"
                class="item-address"
                :class="selected ? 'active' : ''"
                @click.prevent="selectAddress(item)"
              >
                <span class="zipcode"
                  >우편번호 <em>{{ item.zip }}</em></span
                >
                <span class="street-address">{{ item.newAddr }}</span>
                <span class="lot-num-address">{{ item.oldAddr }}</span>
              </a>
            </li>
          </ul>
          <!-- [D] 검색 결과 10개 이상 시 '더보기' 버튼 노출 -->
          <div v-if="zipcodeList.length > 10" class="btn-area">
            <button type="button" class="btn-default btn-fix">10개 더보기</button>
          </div>
        </div>
        <!-- [D] 우편번호 검색 결과 없음 -->
        <div v-if="searchFlag && zipcodeList.length === 0" class="area-result">
          <p class="txt-info"><em>일치하는 주소가 없습니다.</em>주소를 정확히 확인 후 다시 입력해주세요.</p>
        </div>
      </div>
      <div class="popup-footer">
        <div class="btn-area">
          <button type="button" class="btn-primary" :disabled="!addressSelectedFlag" @click.prevent="confirmAddress">
            확인
          </button>
        </div>
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
    }
  },
  data() {
    return {
      selected: false,
      addressSelectedFlag: false,
      keyword: '',
      zipcodeList: [],
      searchFlag: false,
      pageNo: 1,
      selectZipcode: null
    };
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
    },

    /**
     * 현재 선택된 주소를 입력한다.
     * @function
     */
    confirmAddress() {
      if (this.selectZipcode == null) {
        this.selected = false;
        this.addressSelectedFlag = false;
        alert('주소를 선택해주세요.');
        return;
      }
      try {
        // 데이터 전달
        this.$emit('selectedzipCode', this.selectZipcode);
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * 주소 선택시
     */
    selectAddress(obj) {
      this.selected = !this.selected;
      this.addressSelectedFlag = this.selected;
      if (this.selected) {
        this.selectZipcode = obj;
      } else {
        this.selectZipcode = null;
      }
    },

    /**
     * 우편번호 검색
     */
    searchZipcode(keyword) {
      this.searchFlag = true;
      // 하단 api 이외에 외부 api 가능성 있음.
      this.$parent.$parent.$parent
        .apiGetSearchAddr(this.keyword)
        .then(res => {
          this.zipcodeList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.pop-search-zip .item-address.active {
  background: #fff;
}
.popup.pop-seller .popup-footer .btn-area .btn-primary:disabled {
  background: #aaa;
}
</style>
