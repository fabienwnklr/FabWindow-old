import type { ModalOptions } from "./types"
import type { ModalManagerOptions } from "./types"

export const modalDefaultOptions: ModalOptions = {
  id: "fab-modal",
  title: "",
  content: "",
  modal_manager: undefined,
  classes: undefined,
  overlay: true,
  zIndex: 999,
  width: "auto",
  height: "auto",
  minWidth: "200px",
  minHeight: "150px",
  maxWidth: "100%",
  maxHeight: "100%",
  draggable: false,
  expandable: false,
  reducible: false,
  resizable: false,

  onFullScreen: undefined,
  onRestore: undefined,
  onResize: undefined,
  onShow: undefined,
  onHide: undefined,
  beforeClose: undefined,
  onClose: undefined,
}

export const modalManagerDefaultOptions: ModalManagerOptions = {
  limitModal: 5,
  container: true,
}
