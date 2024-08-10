module.exports = {
    apps: [
      {
        name: 'server',
        script: 'Server/index.js', // Path relative to the ecosystem.config.js file
        cwd: './', // Current working directory for the script
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
      },
      {
        name: 'skailama',
        script: 'Skailama/index.js', // Path relative to the ecosystem.config.js file
        cwd: './', // Current working directory for the script
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
      },
    ],
  };
  