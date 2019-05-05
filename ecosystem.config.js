module.exports = {
  apps : [{
    name: 'prod',
    script: 'npm',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'start',
    instances: 1,
    autorestart: true,
    watch: false,
  }, {
    name: 'beta',
    script: 'npm',
    args: 'run start-beta',
    instances: 1,
    autorestart: true,
    watch: false,
  }],

};
