// This is an example build script
const { execSync } = require('child_process');

function build() {
    console.log('Building the project...');
    execSync('yarn workspace backend build', { stdio: 'inherit' });
    execSync('yarn workspace frontend build', { stdio: 'inherit' });
    console.log('Project build complete!');
}

build();