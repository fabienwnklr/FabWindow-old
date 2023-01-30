import type { ModalOptions } from "./types"

export const modalDefaultOptions: ModalOptions = {
  id: "fab-modal",
  title: "",
  content: "",
  classes: undefined,
  disableOverflow: true,
  closeOnEscapce: true,
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
  plugins: {},

  // if add callback function please add it on _setupCallbacks function
  onReduce: undefined,
  onFullScreen: undefined,
  restoreFullScreen: undefined,
  onRestore: undefined,
  onResize: undefined,
  onShow: undefined,
  onHide: undefined,
  beforeClose: undefined,
  onClose: undefined,
}
