import "oj-event";
import { EventAggregator } from "oj-eventaggregator";

export const getRootElements = <T extends HTMLElement>(selector: string, loaded: boolean = false) => {
  let elements = (Array.from(document.querySelectorAll(selector)) as T[])
  if (loaded) {
    elements = elements.filter(x => x.getAttribute("data-loaded") !== null)
    elements.forEach(x => x.setAttribute("data-loaded", "loaded"))
  }
  return elements
}

export default class DirtyInput extends EventAggregator<"change"> {
  private static dirtyInputs: DirtyInput[] = []
  private static id: number = 0
  root: HTMLInputElement | HTMLTextAreaElement
  id = DirtyInput.id++

  static update() {
    DirtyInput.dirtyInputs.forEach(x => x.update())
  }

  static unmount() {
    DirtyInput.dirtyInputs.forEach(x => x.unmount())
  }

  constructor(root: HTMLInputElement | HTMLTextAreaElement) {
    super()
    this.root = root
    this.root.on([
      "input.dirty-input." + this.id,
      "change.dirty-input." + this.id
    ], e => this.update())
    this.update()
    DirtyInput.dirtyInputs.push(this)
  }

  private update() {
    const value = this.root.value
    const dirty = value.trim().length > 0
    this.root.classList.toggle("dirty", dirty)
    this.emit("change", { dirty, value })
  }

  public unmount() {
    this.root.classList.remove("dirty")
    this.root.off([
      "input.dirty-input." + this.id,
      "change.dirty-input." + this.id
    ])
    const i = DirtyInput.dirtyInputs.indexOf(this)
    if (i !== -1) DirtyInput.dirtyInputs.splice(i, 1)
  }
}

export const mount = () =>
  getRootElements("input, textarea", true)
    .map(x => new DirtyInput(x as HTMLInputElement | HTMLTextAreaElement))