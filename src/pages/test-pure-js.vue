<template>
  <div class="content">测试js纯函数</div>
</template>

<script lang='ts'>
import { DateTime } from "../utils/tool";
export default {
  setup(props, context) {
    DateTime.format();
  },
};
</script>

<style>
</style>