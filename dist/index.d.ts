import "oj-event";
import { EventAggregator } from "oj-eventaggregator";
export declare const getRootElements: <T extends HTMLElement>(selector: string, loaded?: boolean) => T[];
export default class DirtyInput extends EventAggregator<"change"> {
    private static dirtyInputs;
    private static id;
    root: HTMLInputElement | HTMLTextAreaElement;
    id: number;
    static update(): void;
    static unmount(): void;
    constructor(root: HTMLInputElement | HTMLTextAreaElement);
    private update;
    unmount(): void;
}
export declare const mount: () => DirtyInput[];
