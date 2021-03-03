<template>
  <div class="popup-header">
    <a href="#none" class="btn-back">
      <span class="ico-back" @click="$router.go(-1)">이전 페이지로 돌아가기</span>
    </a>
    <h1 class="popup-title">{{title}}</h1>
  </div>
</template>

<script>
export default {
  props: ['title'],
};
</script>
