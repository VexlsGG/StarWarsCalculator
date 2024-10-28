const { contextBridge, ipcRenderer } = require('electron');

// Expose a safe API to the renderer process
contextBridge.exposeInMainWorld('env', {
  getEnv: () => new Promise((resolve) => {
    ipcRenderer.once('env', (event, env) => {
      resolve(env);
    });
  })
});
