const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

module.exports = {
  packagerConfig: {
    asar: true,
    icon: 'Images/appicon.ico',  // Ensure this path is correct for your icon
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'star_wars_calculator',
        authors: 'VexlsGG',  // Replace with your name or organization
        description: 'Star Wars Calculator App',
        exe: 'star-wars-calculator.exe',
        noMsi: true,
        certificateFile: 'path/to/cert.p12',  // Provide path to your certificate if applicable
        certificatePassword: 'password',     // Provide password for your certificate if applicable
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        maintainer: 'VexlsGG',  // Replace with your name or organization
        homepage: 'https://starwarscalc.netlify.app',  // Your domain
        icon: 'Images/appicon.png',  // Ensure this path is correct for your icon
      },
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {
        maintainer: 'VexlsGG',  // Replace with your name or organization
        homepage: 'https://starwarscalc.netlify.app',  // Your domain
        icon: 'images/appicon.png',  // Ensure this path is correct for your icon
      },
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};
