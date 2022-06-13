import { Ref } from "vue";
import { IComputedSize, IWrapperStyle } from "./useSize";
export declare const useFPSCarousel: (wrapperStyle: Ref<IWrapperStyle>, computedSize: Ref<IComputedSize>, speed: Ref<number>, reverse: Ref<boolean>) => {
    start: () => Promise<void>;
    pause: (isPause: boolean) => Promise<void>;
};
