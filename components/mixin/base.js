/* eslint-disable prettier/prettier */
const mixin = {
  mounted() {},
  methods: {
    /**
     * 문자열이 빈 문자열인지 체크하여 결과값을 리턴한다.
     * @param str       : 체크할 문자열
     */
    isEmpty(str){
        if(typeof str === 'undefined' || str === null || str === '')
            return true;
        else
            return false;
    },
    /**
     * 우편번호 찾기 등 팝업이 표출됐을 때, 아래 컨텐츠(body) 스크롤 방지.
     * @param flag       : boolean
     */
    preventBodyScroll(flag){
      document.body.style.overflow = flag? 'hidden': 'auto';//팝업 오픈 상태에서는 아래 컨텐츠 Scroll 방지.
    }
  }
};

export default mixin;
