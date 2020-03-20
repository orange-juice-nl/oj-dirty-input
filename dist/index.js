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
var oj_eventaggregator_1 = require("oj-eventaggregator");
exports.getRootElements = function (selector, loaded) {
    if (loaded === void 0) { loaded = false; }
    var elements = Array.from(document.querySelectorAll(selector));
    if (loaded) {
        elements = elements.filter(function (x) { return x.getAttribute("data-loaded") !== null; });
        elements.forEach(function (x) { return x.setAttribute("data-loaded", "loaded"); });
    }
    return elements;
};
var DirtyInput = /** @class */ (function (_super) {
    __extends(DirtyInput, _super);
    function DirtyInput(root) {
        var _this = _super.call(this) || this;
        _this.id = DirtyInput.id++;
        _this.root = root;
        _this.root.on([
            "input.dirty-input." + _this.id,
            "change.dirty-input." + _this.id
        ], function (e) { return _this.update(); });
        _this.update();
        DirtyInput.dirtyInputs.push(_this);
        return _this;
    }
    DirtyInput.update = function () {
        DirtyInput.dirtyInputs.forEach(function (x) { return x.update(); });
    };
    DirtyInput.unmount = function () {
        DirtyInput.dirtyInputs.forEach(function (x) { return x.unmount(); });
    };
    DirtyInput.prototype.update = function () {
        var value = this.root.value;
        var dirty = value.trim().length > 0;
        this.root.classList.toggle("dirty", dirty);
        this.emit("change", { dirty: dirty, value: value });
    };
    DirtyInput.prototype.unmount = function () {
        this.root.classList.remove("dirty");
        this.root.off([
            "input.dirty-input." + this.id,
            "change.dirty-input." + this.id
        ]);
        var i = DirtyInput.dirtyInputs.indexOf(this);
        if (i !== -1)
            DirtyInput.dirtyInputs.splice(i, 1);
    };
    DirtyInput.dirtyInputs = [];
    DirtyInput.id = 0;
    return DirtyInput;
}(oj_eventaggregator_1.EventAggregator));
exports.default = DirtyInput;
exports.mount = function () {
    return exports.getRootElements("input, textarea", true)
        .map(function (x) { return new DirtyInput(x); });
};
