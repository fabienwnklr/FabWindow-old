import type { FabWindow } from "./FabWindow"

export type classObj = {
  replace?: boolean
  className?: string
}

export type ModalOptions = {
  id?: string
  title?: string
  content?: string | Node
  footer?: string | Node
  classes?: {
    header?: classObj
    icons?: classObj
    body?: classObj
    footer?: classObj
  }
  overlay?: boolean
  zIndex?: number
  width?: string
  height?: string
  minWidth?: string
  minHeight?: string
  maxWidth?: string
  maxHeight?: string
  expandable?: boolean
  reducible?: boolean
  resizable?: boolean
  draggable?: boolean

  plugins?: Array<object> | object

  // if need to add callback function please add it on _setupCallbacks function

  onReduce?(modal: FabWindow): void
  onFullScreen?(modal: FabWindow): void
  onRestore?(modal: FabWindow): void
  onResize?(modal: FabWindow): void
  onShow?(modal: FabWindow): void
  onHide?(modal: FabWindow): void
  beforeClose?(modal: FabWindow): void
  onClose?(modal: FabWindow): void
}
