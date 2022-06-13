import { Ref } from "vue";
import { IComputedSize, IWrapperStyle } from "./useSize";
export declare const useCssCarousel: (wrapperStyle: Ref<IWrapperStyle>, computedSize: Ref<IComputedSize>, speed: Ref<number>, reverse: Ref<boolean>) => {
    start: () => void;
    offsetAnimate: () => void;
    restartAnimate: () => Promise<void>;
    toOrigin: () => void;
};
