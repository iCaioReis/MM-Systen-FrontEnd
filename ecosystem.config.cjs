module.exports = {
  apps: [
    {
      name: 'vite-app',
      script: 'start-serve.mjs',
      exec_mode: 'fork', //cluster
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};