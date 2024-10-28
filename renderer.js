document.addEventListener('DOMContentLoaded', () => {
  window.env.getEnv().then(env => {
    console.log('Current Environment:', env);
    // Display or use the environment variable as needed
  });
});
