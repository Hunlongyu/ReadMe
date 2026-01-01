import { getCurrentWindow } from '@tauri-apps/api/window';
import { LogicalSize } from '@tauri-apps/api/dpi';
import { WebviewWindow } from '@tauri-apps/api/webviewWindow';

export function useWindow() {
  const minimize = () => getCurrentWindow().minimize();
  const maximize = () => getCurrentWindow().toggleMaximize();
  const close = () => getCurrentWindow().close();

  const setWindowSize = async (width: number, height: number) => {
    const win = getCurrentWindow();
    await win.setSize(new LogicalSize(width, height));
  };

  const centerWindow = async () => {
    await getCurrentWindow().center();
  };

  const createMainWindow = async () => {
    const mainWindow = new WebviewWindow('main', {
      url: '/',
      width: 1200,
      height: 800,
      minWidth: 1024,
      minHeight: 700,
      resizable: true,
      decorations: false,
      transparent: true,
      center: true,
      title: 'ReadMe'
    });

    return mainWindow;
  };

  const createLauncherWindow = async () => {
    const launcherWindow = new WebviewWindow('launcher', {
      url: '/',
      width: 400,
      height: 500,
      resizable: true,
      decorations: false,
      transparent: true,
      center: true,
      title: 'readme'
    });
    return launcherWindow;
  };

  // Custom resize logic for custom titlebar/border
  const startResize = async (e: PointerEvent) => {
    const win = getCurrentWindow();
    const start = await win.innerSize();
    const startX = e.clientX;
    const startY = e.clientY;

    const onMove = async (ev: PointerEvent) => {
      const dx = Math.max(ev.clientX - startX, -start.width + 400);
      const dy = Math.max(ev.clientY - startY, -start.height + 300);
      const w = Math.max(start.width + dx, 800);
      const h = Math.max(start.height + dy, 600);
      await win.setSize(new LogicalSize(w, h));
    };

    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp, { once: true });
  };

  return {
    minimize,
    maximize,
    close,
    setWindowSize,
    centerWindow,
    createMainWindow,
    createLauncherWindow,
    startResize
  };
}
