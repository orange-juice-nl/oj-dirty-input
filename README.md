# DirtyInput
Monitors input and textarea elements.
It will add a "dirty" class on the element when its value is not empty.

## mount
`mount(): DirtyInput[]`
Mounts all html input and textarea elements.

## constructor
`constructor(root: HTMLInputElement | HTMLTextAreaElement): DirtyInput`
Adds an input and change event on the element.
When an event gets emitted it will set the "dirty" class based on the truthiness of the current value.
It then emits a "change" event with the current dirty state and value.

## unmount
`unmount(): void`
Removes the "dirty" class if any and removes the event listeners.

## DirtyInput.update
`DirtyInput.update(): void`
Force an update on all instances.

## DirtyInput.unmount
`DirtyInput.unmount(): void`
Unmount all instances.

## Events
### change
`.on("change", { dirty: boolean, value: string })`
Listen to changes.
