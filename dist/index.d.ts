import "oj-event";
import Component from "oj-component";
export default class DirtyInput extends Component<"change"> {
    private static dirtyInputs;
    static mount(): DirtyInput[];
    static switch(): void;
    constructor(root: HTMLInputElement | HTMLTextAreaElement);
    protected initialize(): void;
    unmount(): void;
    private switch;
}
