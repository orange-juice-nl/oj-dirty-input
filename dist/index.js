"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
require("oj-event");
var oj_component_1 = require("oj-component");
var DirtyInput = /** @class */ (function (_super) {
    __extends(DirtyInput, _super);
    function DirtyInput(root) {
        return _super.call(this, "dirty-input", root) || this;
    }
    DirtyInput.mount = function () {
        return oj_component_1.default.getRoots("input:not([data-dirty-input=\"loaded\"]), textarea:not([data-dirty-input=\"loaded\"])").map(function (x) { return new DirtyInput(x); });
    };
    DirtyInput.switch = function () {
        DirtyInput.dirtyInputs.forEach(function (di) { return di.switch(); });
    };
    DirtyInput.prototype.initialize = function () {
        var _this = this;
        this.root.on("blur.dirty-input." + this.id, function (e) { return _this.switch(); });
        this.switch();
        DirtyInput.dirtyInputs.push(this);
    };
    DirtyInput.prototype.unmount = function () {
        this.root.classList.remove("dirty");
        this.root.off("blur.dirty-input." + this.id);
        var index = DirtyInput.dirtyInputs.indexOf(this);
        if (index !== -1)
            DirtyInput.dirtyInputs.splice(index, 1);
    };
    DirtyInput.prototype.switch = function () {
        var value = this.root.value;
        if (value.trim().length > 0) {
            this.root.classList.add("dirty");
            this.emit("change", { dirty: true, value: value });
        }
        else {
            this.root.classList.remove("dirty");
            this.emit("change", { dirty: false });
        }
    };
    DirtyInput.dirtyInputs = [];
    return DirtyInput;
}(oj_component_1.default));
exports.default = DirtyInput;
