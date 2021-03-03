/* eslint-disable prettier/prettier */
const mixin = {
  mounted() {},
  data() {
    return {
      // 스크롤이 위로 가는지 아래로 가는지 확인 flag
      scrollFlag: true,

      // 현재 스크롤 top 값
      currentScrollTop: 0,

      // stickBar 엘리먼트
      stickyBarElement: null
    };
  },
  watch: {
    /**
     * 현재 스크롤값 watch
     */
    currentScrollTop() {},

    /**
     * 현재 스크롤이 위로 가면 class active를 제거하고 아래로 가면 active를 추가한다.
     * 210118 - class="sticky-bar" 영역에서 class="layer-body" 로 변경되고 show 추가로 변경됨.
     */
    scrollFlag() {
      try {
        if (this.stickyBarElement !== null && this.stickyBarElement !== undefined) {
          if (this.scrollFlag) {
            this.stickyBarElement.classList.add('show');
          } else {
            this.stickyBarElement.classList.remove('show');
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  },
  methods: {
    /**
     * 하단 stickyBar를 스크롤에 따라 보이고 감춘다.
     * @function
     */
    setStickyBar() {
      try {
        this.currentScrollTop = window.scrollY || document.documentElement.scrollTop;
        this.scrollFlag = this.detectScrollFlag(this.currentScrollTop);
        window.addEventListener(
          'scroll',
          e => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            this.scrollFlag = this.detectScrollFlag(scrollTop);
            this.currentScrollTop = scrollTop;
          },
          false
        );
      } catch (e) {
        console.log(e);
      }
    },
    /**
     * 현재 스크롤이 위로 가는지 아래로 가는지 확인
     * @function
     * @param {number} scrollTop - 판단할 scrollTop 값
     * @return {boolean} 아래로 스크롤링 - true, 위로 스크롤링 - false
     */
    detectScrollFlag(scrollTop) {
      try {
        if (scrollTop > this.currentScrollTop) {
          return true;
        } else {
          return false;
        }
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * stickyBar가 mounted되었음
     * @function
     * @param {object} elem - stickybar로 설정할 elemet object
     */
    stickyBarMounted(elem) {
      try {
        this.stickyBarElement = elem;
      } catch (e) {
        console.log(e);
      }
    }
  }
};

export default mixin;
