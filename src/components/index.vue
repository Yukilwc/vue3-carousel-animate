<template>
  <div class=''>
    <el-button @click="start">Restart</el-button>
    <el-button @click="pause">Pause</el-button>
  </div>
  <div class="carousel-container">
    <div class='carousel-wrapper'>
      <div class='comp-container'>
        <Vue3CarouselAnimate ref="carouselRef1" :additionalSlides="2" :itemRight="'20px'" :speed="10000" offset="300px"
          :reverse="false" mode="fps">
          <div class='' @click="textClick">一段文字一段文字一段文字一段文字一段文字一段文字一段文字一段文字一段文字2233</div>
        </Vue3CarouselAnimate>

      </div>
      <div class=''>常规方向</div>
      <div class='mt10'>反转方向</div>
      <div class='comp-container'>
        <Vue3CarouselAnimate ref="carouselRef2" :additionalSlides="2" :itemRight="'20px'" :speed="10000" mode="fps"
        :reverse="false"
         >
          <div class='' @click="textClick">一段文字一段文字一段文字一段文字一段文字一段文字一段文字一段文字一段文字2233</div>
        </Vue3CarouselAnimate>
      </div>

    </div>
  </div>
</template>

<script lang='ts' setup>
import { onMounted, ref, toRaw } from "vue";
import Vue3CarouselAnimate from './Vue3CarouselAnimate/index.vue'

// const getImage = (index) => {
//   return new URL(`../images/${index}.png`, import.meta.url).href
// }
const carouselRef1 = ref<InstanceType<typeof Vue3CarouselAnimate>>()
// const carouselRef2 = ref<InstanceType<typeof Vue3CarouselAnimate>>(null)
const start = () => {
  console.log('==========carouselRef1', toRaw(carouselRef1))
  carouselRef1.value?.start()
  // carouselRef2.value.start()
}
const isPause = ref(false)
const pause = () => {
  isPause.value = !isPause.value
  carouselRef1.value?.pause(isPause.value)
  // carouselRef2.value.start()
}
const textClick = () => {
  console.log('==========textClick',)
}
</script>

<style scoped lang="scss">
.carousel-container {
  .carousel-wrapper {
    .comp-container {
      width: 600px;
      height: auto;
      border: 1px solid red;
      overflow: hidden;
      margin-top: 20px;

      .image-list {
        width: 100%;
        display: flex;
        align-items: center;

        .item {
          margin-right: 20px;

          &:last-child {
            margin-right: 0;
          }

          .image {
            width: 160px;
            height: 200px;
            object-fit: cover;
            display: block;
          }
        }
      }

    }
  }
}
</style>