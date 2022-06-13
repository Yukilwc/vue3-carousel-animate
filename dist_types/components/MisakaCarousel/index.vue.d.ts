declare const _default: import("vue").DefineComponent<{
    additionalSlides: {
        type: NumberConstructor;
        default: number;
    };
    itemRight: {
        type: StringConstructor;
        default: string;
    };
    speed: {
        type: NumberConstructor;
        default: number;
    };
    offset: {
        type: StringConstructor;
        default: string;
    };
    reverse: {
        type: BooleanConstructor;
        default: boolean;
    };
    mode: {
        type: StringConstructor;
        default: string;
    };
}, {
    start: () => Promise<void>;
    pause: (isPause: boolean) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    additionalSlides: {
        type: NumberConstructor;
        default: number;
    };
    itemRight: {
        type: StringConstructor;
        default: string;
    };
    speed: {
        type: NumberConstructor;
        default: number;
    };
    offset: {
        type: StringConstructor;
        default: string;
    };
    reverse: {
        type: BooleanConstructor;
        default: boolean;
    };
    mode: {
        type: StringConstructor;
        default: string;
    };
}>>, {
    reverse: boolean;
    additionalSlides: number;
    itemRight: string;
    speed: number;
    offset: string;
    mode: string;
}>;
export default _default;
