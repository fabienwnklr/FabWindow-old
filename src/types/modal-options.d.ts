import { FabModalManager } from "../core/FabModalManager";

export interface ModalOptions {
  id?: string;
  title?: string;
  content?: string;
  modal_manager?: FabModalManager;
  effects?: {
    in?: string;
    out?: string;
  };
  zIndex?: number;
  width?: string | number;
  height?: string | number;
  expandable?: boolean;
  reducible?: boolean;
  resizable?: boolean;
  draggable?: boolean;
  destroyOnClose?: boolean;
  onFullScreen?: Function | null;
  onRestore?: Function | null;
  onResize?: Function | null;
  onShow?: Function | null;
  onHide?: Function | null;
  beforeClose?: Function | null;
  onClosing?: Function | null;
  onClosed?: Function | null;
}
