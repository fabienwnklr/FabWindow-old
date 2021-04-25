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
  title: string;
  loader: string;
  content: string;
  onFullscreen: Function | null;
  onRestore: Function | null;
  onResize: Function | null;
  onShow: Function | null;
  onHide: Function | null;
  beforeClose: Function | null;
  onClosing: Function | null;
  onClosed: Function | null;
}
