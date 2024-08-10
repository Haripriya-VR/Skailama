module.exports = {
    apps: [
      {
        name: 'server',
        script: './Skailama/Server/index.js',
        cwd: './Skailama/Skailama/Server', // Current working directory
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
      },
      {
        name: 'skailama',
        script: './Skailama/Skailama/index.js', // Or replace with your main script
        cwd: './Skailama/Skailama', // Current working directory
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
      },
    ],
  };
  