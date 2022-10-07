import type { ModalOptions } from "../types/modal-options"

export const defaultOptions: ModalOptions = {
    id: 'fab-modal',
    title: "",
    content: "",
    modal_manager: undefined,
    effects: {
        in: "fade-in",
        out: "fade-out",
    },
    overlay: true,
    zIndex: 999,
    width: "auto",
    height: "auto",
    minWidth: "200px",
    minHeight: "150px",
    maxWidth: "100%",
    maxHeight: "100%",
    draggable: true,
    expandable: true,
    reducible: true,

    onFullScreen: null,
    onRestore: null,
    onResize: null,
    onShow: null,
    onHide: null,
    beforeClose: null,
    onClosing: null,
    onClosed: null,
}