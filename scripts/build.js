// This is an example build script
const { execSync } = require('child_process');

function build() {
    console.log('Building the project...');
    execSync('yarn workspace nfmt-stack-api build', { stdio: 'inherit' });
    execSync('yarn workspace nfmt-stack-app build', { stdio: 'inherit' });
    console.log('Project build complete!');
}

build();