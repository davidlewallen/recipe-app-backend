const { spawn } = require('child_process');

const deployMSRFEBeta = () => {
  const child = spawn('msr-deploy-beta');

  child.stdout.on('data', data => {
    console.log(`${data}`);
  });

  child.on('close', code => {
    console.log(`MSR-Deploy-Beta child process exited with code ${code}`);
  });
};

const deployMSRBEBeta = () => {
  const child = spawn('msrb-deploy-beta');

  child.stdout.on('data', data => {
    console.log(`${data}`);
  });

  child.on('close', code => {
    console.log(`MSR-Deploy-Beta child process exited with code ${code}`);
  });
};

module.exports = {
  deployMSRFEBeta,
  deployMSRBEBeta,
};
