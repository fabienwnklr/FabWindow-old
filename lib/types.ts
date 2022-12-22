import { FabModalManager } from "./FabModalManager"
export interface ModalManagerOptions {
  limitModal: number
  container: boolean
}

export interface ModalOptions {
  /**
   * @prop {String} id id of modal
   */
  id?: string
  title?: string
  content?: string | Node
  footer?: string | Node
  modal_manager?: FabModalManager
  modalClass: string
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
  onFullScreen?: Function
  onRestore?: Function
  onResize?: Function
  onShow?: Function
  onHide?: Function
  beforeClose?: Function
  onClose?: Function
}
