var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { ref, nextTick, defineComponent, toRefs, onMounted, openBlock, createElementBlock, normalizeStyle, unref, createElementVNode, Fragment, renderList, renderSlot } from "vue";
const useCssCarousel = (wrapperStyle, computedSize, speed, reverse) => {
  const start = () => {
    if (computedSize.value.offsetPx > 0) {
      console.log("==========offsetAnimate");
      offsetAnimate();
    } else if (computedSize.value.offsetPx == 0) {
      console.log("==========restartAnimate");
      restartAnimate();
    } else {
      throw new Error("offset cannot be less than zero");
    }
  };
  const offsetAnimate = () => {
    setTimeout(() => {
      if (reverse.value) {
        wrapperStyle.value.transition = `transform ${speed.value * (computedSize.value.offsetPx / computedSize.value.itemWidth)}ms linear`;
        wrapperStyle.value.transform = `translateX(${computedSize.value.offsetPx}px)`;
      } else {
        wrapperStyle.value.transition = `transform ${speed.value * (computedSize.value.offsetPx / computedSize.value.itemWidth)}ms linear`;
        wrapperStyle.value.transform = `translateX(-${computedSize.value.offsetPx}px)`;
      }
    }, 0);
  };
  const restartAnimate = async () => {
    setTimeout(() => {
      if (reverse.value) {
        wrapperStyle.value.transition = `transform ${speed.value}ms linear`;
        wrapperStyle.value.transform = `translateX(${computedSize.value.offsetPx + computedSize.value.itemWidth}px)`;
      } else {
        wrapperStyle.value.transition = `transform ${speed.value}ms linear`;
        wrapperStyle.value.transform = `translateX(-${computedSize.value.offsetPx + computedSize.value.itemWidth}px)`;
      }
    }, 0);
  };
  const toOrigin = () => {
    if (reverse.value) {
      wrapperStyle.value.transition = `transform 0ms linear`;
      wrapperStyle.value.transform = `translateX(${computedSize.value.offsetPx}px)`;
    } else {
      wrapperStyle.value.transition = `transform 0ms linear`;
      wrapperStyle.value.transform = `translateX(-${computedSize.value.offsetPx}px)`;
    }
  };
  return {
    start,
    offsetAnimate,
    restartAnimate,
    toOrigin
  };
};
class FPSAnimate {
  constructor() {
    __publicField(this, "x0", 0);
    __publicField(this, "x1", 300);
    __publicField(this, "totalTime", 3e3);
    __publicField(this, "x", 0);
    __publicField(this, "currentTime", 0);
    __publicField(this, "startTime");
    __publicField(this, "isActive", false);
    __publicField(this, "callback", (x) => {
    });
    __publicField(this, "animate", async () => {
      this.isActive = true;
      return new Promise(async (resolve, reject) => {
        const step = async (timestamp) => {
          if (this.isActive === false) {
            console.log("==========FPSAnimate is set isAnimating finished");
            reject(this.x);
            return;
          }
          if (this.startTime === void 0) {
            this.startTime = timestamp;
          }
          const elapsedTime = timestamp - this.startTime;
          const ratio = elapsedTime / this.totalTime;
          this.x = Math.round(this.x0 + (this.x1 - this.x0) * ratio);
          if (Math.abs(this.x - this.x0) >= Math.abs(this.x1 - this.x0)) {
            this.x = this.x1;
            this.callback(this.x);
            resolve(this.x);
          } else {
            this.callback(this.x);
            window.requestAnimationFrame(step);
          }
        };
        window.requestAnimationFrame(step);
      });
    });
    __publicField(this, "init", ({ x0 = 0, x1 = 300, totalTime = 3e3, x = 0, currentTime = 0, startTime = void 0 }) => {
      this.x0 = x0;
      this.x1 = x1;
      this.totalTime = totalTime;
      this.x = x;
      this.currentTime = currentTime;
      this.startTime = startTime;
    });
  }
}
__publicField(FPSAnimate, "getFrameTime", async () => {
  console.log("==========getFrameTime start");
  return new Promise((resolve, reject) => {
    window.requestAnimationFrame((e) => {
      window.requestAnimationFrame((e2) => {
        resolve(e2 - e);
      });
    });
  });
});
let ani = new FPSAnimate();
const useFPSCarousel = (wrapperStyle, computedSize, speed, reverse) => {
  const start = async () => {
    if (ani.isActive) {
      ani.isActive = false;
    }
    ani = new FPSAnimate();
    ani.init({
      x0: 0,
      x1: -computedSize.value.offsetPx,
      totalTime: speed.value * (computedSize.value.offsetPx / computedSize.value.itemWidth)
    });
    ani.callback = (x) => {
      wrapperStyle.value.transform = `translateX(${x}px)`;
    };
    console.log("==========start ani", ani);
    try {
      await ani.animate();
    } catch (e) {
      console.log("==========\u52A8\u753B\u5F3A\u5236\u505C\u6B62", e);
      return;
    }
    console.log("==========end ani");
    doLoop();
  };
  const doLoop = async () => {
    ani.init({
      x0: -computedSize.value.offsetPx,
      x1: -computedSize.value.offsetPx - computedSize.value.itemWidth,
      totalTime: speed.value
    });
    ani.callback = (x) => {
      wrapperStyle.value.transform = `translateX(${x}px)`;
    };
    try {
      await ani.animate();
    } catch (e) {
      console.log("==========\u52A8\u753B\u5F3A\u5236\u505C\u6B62", e);
      return;
    }
    doLoop();
  };
  const pause = async (isPause) => {
    console.log("==========pause fps animate", isPause);
    ani.isActive = false;
    if (isPause) {
      console.log("==========", ani.x);
      return;
    }
    console.log("==========pause\u7ED3\u675F\u6682\u505C");
    let currentX = ani.x;
    ani = new FPSAnimate();
    let ratio = 1 - Math.abs(currentX) / (computedSize.value.offsetPx + computedSize.value.itemWidth);
    console.log("==========ratio", ratio);
    ani.init({
      x0: currentX,
      x1: -computedSize.value.offsetPx - computedSize.value.itemWidth,
      totalTime: speed.value * ratio
    });
    ani.callback = (x) => {
      wrapperStyle.value.transform = `translateX(${x}px)`;
    };
    console.log("==========start ani", ani);
    try {
      await ani.animate();
    } catch (e) {
      console.log("==========\u52A8\u753B\u5F3A\u5236\u505C\u6B62", e);
      return;
    }
    console.log("==========end ani");
    doLoop();
  };
  return {
    start,
    pause
  };
};
const useSize = (offset, additionalSlides, reverse) => {
  const wrapperStyle = ref({
    transition: ``,
    transform: ``,
    left: offset.value,
    right: "",
    width: ``
  });
  const computedSize = ref({
    containerHeight: 0,
    wrapperWidth: 0,
    containerWidth: 0,
    itemWidth: 0,
    offsetPx: 0
  });
  const calcAllSize = async (container, wrapper) => {
    if (!container.value || !wrapper.value)
      return;
    resetWrapperStyle();
    await nextTick();
    computedSize.value.containerWidth = container.value.getBoundingClientRect().width;
    computedSize.value.containerHeight = wrapper.value.getBoundingClientRect().height;
    let itemNode = wrapper.value.querySelector(".misaka-carousel-item");
    computedSize.value.itemWidth = itemNode.getBoundingClientRect().width;
    computedSize.value.wrapperWidth = computedSize.value.itemWidth * (additionalSlides.value + 1);
    wrapperStyle.value.width = `${computedSize.value.wrapperWidth}px`;
    computedSize.value.offsetPx = wrapper.value.offsetLeft;
    console.log("==========wrapper.value.offsetLeft", wrapper.value.offsetLeft);
    wrapperStyle.value.left = reverse.value ? "" : `${computedSize.value.offsetPx}px`;
    wrapperStyle.value.right = reverse.value ? `${computedSize.value.offsetPx}px` : "";
  };
  const resetWrapperStyle = () => {
    wrapperStyle.value = {
      transition: ``,
      transform: ``,
      left: offset.value,
      right: "",
      width: ``
    };
  };
  return { wrapperStyle, calcAllSize, resetWrapperStyle, computedSize };
};
var index_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => ".misaka-carousel-container[data-v-0707d3bf]{width:100%;overflow:hidden;white-space:nowrap;position:relative;box-sizing:border-box}.misaka-carousel-container *[data-v-0707d3bf]{box-sizing:border-box}.misaka-carousel-container .misaka-carousel-wrapper[data-v-0707d3bf]{white-space:nowrap;width:auto;display:flex;flex-wrap:nowrap;position:relative;position:absolute;top:0px}.misaka-carousel-container .misaka-carousel-wrapper .misaka-carousel-item[data-v-0707d3bf]{flex:0 0 auto}\n")();
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    additionalSlides: {
      type: Number,
      default: 3
    },
    itemRight: {
      type: String,
      default: "0px"
    },
    speed: {
      type: Number,
      default: 3e3
    },
    offset: {
      type: String,
      default: "0px"
    },
    reverse: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: "css"
    }
  },
  setup(__props, { expose }) {
    const props = __props;
    const container = ref();
    const wrapper = ref();
    const { additionalSlides, itemRight, speed, offset, reverse, mode } = toRefs(props);
    const { wrapperStyle, calcAllSize, computedSize } = useSize(offset, additionalSlides, reverse);
    const cssMode = useCssCarousel(wrapperStyle, computedSize, speed, reverse);
    const fpsMode = useFPSCarousel(wrapperStyle, computedSize, speed);
    const dataReady = ref(false);
    onMounted(async () => {
      start();
    });
    const start = async () => {
      dataReady.value = false;
      await calcAllSize(container, wrapper);
      console.log("==========size", computedSize.value);
      dataReady.value = true;
      if (mode.value === "css") {
        console.log("==========css mode");
        cssMode.start();
      } else {
        console.log("==========fps mode");
        fpsMode.start();
      }
    };
    const endHandle = (e) => {
      console.log("==========end handle ", e);
      if (mode.value === "css") {
        if (e.propertyName === "transform") {
          console.log("\u91CD\u542F");
          cssMode.toOrigin();
          cssMode.restartAnimate();
        }
      }
    };
    const pause = (isPause) => {
      fpsMode.pause(isPause);
    };
    expose({
      start,
      pause
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "misaka-carousel-container",
        ref_key: "container",
        ref: container,
        style: normalizeStyle([{ opacity: dataReady.value ? "1" : "0" }, { height: `${unref(computedSize).containerHeight}px` }])
      }, [
        createElementVNode("div", {
          style: normalizeStyle(unref(wrapperStyle)),
          class: "misaka-carousel-wrapper",
          ref_key: "wrapper",
          ref: wrapper,
          onTransitionend: endHandle
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(additionalSlides) + 1, (item, index2) => {
            return openBlock(), createElementBlock("div", {
              class: "misaka-carousel-item",
              key: index2,
              style: normalizeStyle([{ paddingRight: `${unref(itemRight)}` }])
            }, [
              renderSlot(_ctx.$slots, "default", {}, void 0, true)
            ], 4);
          }), 128))
        ], 36)
      ], 4);
    };
  }
});
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0707d3bf"]]);
export { index as MisakaCarousel };
