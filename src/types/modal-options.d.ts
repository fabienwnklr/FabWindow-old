export interface ModalOptions {
  id: string;
  effects: {
    in: string;
    out: string;
  };
  zIndex: number;
  width: string | number;
  height: string | number;
  maximizable: boolean;
  minimizable: boolean;
  destroyOnClose: boolean;
  title: string;
  content: string;
  onFullScreen: Function | null;
  onRestore: Function | null;
  onResize: Function | null;
  onShow: Function | null;
  onHide: Function | null;
  beforeClose: Function | null;
  onClosing: Function | null;
  onClosed: Function | null;
}
