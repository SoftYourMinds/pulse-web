const { execSync } = require("child_process");
const fs = require("fs");

const versionFilePath = "src/assets/data/version.ts";
let version = { major: 1, minor: 0, patch: 0 };

if (fs.existsSync(versionFilePath)) {
    version = JSON.parse(fs.readFileSync(versionFilePath, "utf8"));
}

let commitCount;
try {
    commitCount = execSync("git rev-list --count HEAD").toString().trim();
} catch (error) {
    console.error(error.message);
    process.exit(1);
}

version.patch = parseInt(commitCount, 10) % 100;

if (commitCount >= 100 && version.patch === 0) {
    version.minor += 1;
    version.patch = 0;
}

fs.writeFileSync(versionFilePath, 'export const version = ' + JSON.stringify(version, null, 2));

console.log(`New version: ${version.major}.${version.minor}.${version.patch}`);
