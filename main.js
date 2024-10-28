const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const fs = require('fs');
const { format, transports, createLogger } = require('winston');

// Setup logging directory
const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Create a new Winston logger with timestamped output
const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Format timestamps
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new transports.File({ filename: path.join(logDir, 'app.log') }), // Log to a file
  ],
});

// Initialize the main window
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
    title: 'Star Wars Calculator',
    icon: path.join(__dirname, 'images/appicon.ico'),
  });

  // Load the index.html file
  mainWindow.loadFile('index.html');

  // Log the event of window creation
  logger.info('Main window created');

  // Define the menu template
  const menuTemplate = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Exit',
          accelerator: 'Ctrl+Q',
          click() {
            app.quit();
          },
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [], // No functions for Edit
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'Ctrl+R',
          click() {
            mainWindow.reload();
          },
        },
        {
          label: 'Zoom In',
          accelerator: 'Ctrl+=',
          click() {
            mainWindow.webContents.setZoomLevel(mainWindow.webContents.getZoomLevel() + 1);
          },
        },
        {
          label: 'Zoom Out',
          accelerator: 'Ctrl+-',
          click() {
            mainWindow.webContents.setZoomLevel(mainWindow.webContents.getZoomLevel() - 1);
          },
        },
        {
          label: 'Toggle Full Screen',
          accelerator: 'F11',
          click() {
            mainWindow.setFullScreen(!mainWindow.isFullScreen());
          },
        },
      ],
    },
    {
      label: 'Window',
      submenu: [], // No functions for Window
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'Report Issue',
          click() {
            require('electron').shell.openExternal('https://github.com/VexlsGG/StarWarsCalculator/issues');
          },
        },
        {
          label: 'Documentation - COMING SOON!!!',
          click() {
            // Placeholder for future documentation
            console.log('COMING SOON');
          },
        },
      ],
    },
  ];

  // Build and set the application menu
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  mainWindow.on('closed', () => {
    mainWindow = null;
    logger.info('Main window closed');
  });
}

app.on('ready', () => {
  createWindow();
  logger.info('Application started');
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
    logger.info('Application quit');
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
    logger.info('Application reactivated');
  }
});

// Log uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error(`Uncaught exception: ${error.message}`);
});
