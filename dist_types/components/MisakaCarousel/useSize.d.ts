import { Ref } from "vue";
export interface IComputedSize {
    containerHeight: number;
    wrapperWidth: number;
    containerWidth: number;
    itemWidth: number;
    offsetPx: number;
}
export interface IWrapperStyle {
    transition: string;
    transform: string;
    left: string;
    right: string;
    width: string;
}
export declare const useSize: (offset: Ref<string>, additionalSlides: Ref<number>, reverse: Ref<boolean>) => {
    wrapperStyle: Ref<{
        transition: string;
        transform: string;
        left: string;
        right: string;
        width: string;
    }>;
    calcAllSize: (container: Ref<HTMLElement | undefined>, wrapper: Ref<HTMLElement | undefined>) => Promise<void>;
    resetWrapperStyle: () => void;
    computedSize: Ref<{
        containerHeight: number;
        wrapperWidth: number;
        containerWidth: number;
        itemWidth: number;
        offsetPx: number;
    }>;
};
