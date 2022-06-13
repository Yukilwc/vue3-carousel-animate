# vue3-carousel-animate

简单的vue3走马灯组件

[Demo](https://yukilwc.github.io/InclusiveLibrary/Frontend/Awesome-Design/Carousel/Demo.html)

## 安装

```sh
npm install vue3-carousel-animate
```

## 基础使用

```vue
<template>
 <Vue3CarouselAnimate ref="carouselRef1" :additionalSlides="2" :itemRight="'20px'" :speed="10000" offset="300px"
          :reverse="false" mode="fps">
          <div>走马灯内容</div>
</Vue3CarouselAnimate>
</template>
<script lang='ts' setup>
import {Vue3CarouselAnimate } from 'vue3-carousel-animate'
import "vue3-carousel-animate/dist/style.css"
</script>

```

## 属性


### speed

一轮循环运动的毫秒数，number类型

### itemRight

循环元素之间的间距,string类型，支持px，vw，百分比等

### offset

开始循环时的偏移值,即最开始距离容器左边缘的距离,string类型，支持px，vw，百分比等

### reverse

是否开启反向运动。注意，当开启时，offset会变成距离容器右边缘的距离。
### mode

可选值为 `css`和`fps`.  
仅当选择`fps`时，才支持组件实例方法中的`pause`暂停方法
### additionalSlides

额外循环的数量，当元素宽度小于容器宽度时，需要设置拷贝出额外的元素，以作为无限循环的占位。  
数字类型，一般设置成能( additionalSlides+1)个元素的宽度，大于容器宽度即可。

## 组件实例方法

组件提供了两个暴露的方法

组件内部:
```ts
defineExpose({
  start,
  pause
})
```

外部调用:
```ts
import {Vue3CarouselAnimate } from 'vue3-carousel-animate' 
import "vue3-carousel-animate/dist/style.css"
const carouselRef1 = ref<InstanceType<typeof Vue3CarouselAnimate>>()
carouselRef1.value?.start()
carouselRef1.value?.pause()
```

### start

```ts
const start: () => void
```
重启，重新回到起点，计算全部尺寸，再次开始动画

### pause

```ts
const pause: (isPause: boolean) => void
```

暂停/取消暂停，仅当mode为`fps`时生效，一般用来结合mouseenter事件做悬停时暂停.