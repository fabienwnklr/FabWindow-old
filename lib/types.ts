import { FabModalManager } from "./FabModalManager"
import { FabModal } from "./FabModal"
export type ModalManagerOptions = {
  limitModal: number
  container: boolean
}

export type classObj = {
  replace?: boolean
  className?: string
}

export type ModalOptions = {
  /**
   * @prop {String} id id of modal
   */
  id?: string
  title?: string
  content?: string | Node
  footer?: string | Node
  modal_manager?: FabModalManager
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

  plugins: Array<object> | object

  onReduce?(modal: FabModal): void
  onFullScreen?(modal: FabModal): void
  onRestore?(modal: FabModal): void
  onResize?(modal: FabModal): void
  onShow?(modal: FabModal): void
  onHide?(modal: FabModal): void
  beforeClose?(modal: FabModal): void
  onClose?(modal: FabModal): void
}
