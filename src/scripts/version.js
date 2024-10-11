const { execSync } = require("child_process");
const fs = require("fs");

const versionFilePath = "src/assets/data/version.ts";
let version = { major: 1, minor: 0, patch: 0 };

if (fs.existsSync(versionFilePath)) {
    const fileContent = fs.readFileSync(versionFilePath, "utf8");

    const versionMatch = fileContent.match(/export const version = (\{.*\});/);

    if (versionMatch && versionMatch[1]) {
        version = JSON.parse(versionMatch[1]);
    }
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

const newVersionContent = `export const version = ${JSON.stringify(
    version,
    null,
    2
)};`;
fs.writeFileSync(versionFilePath, newVersionContent);

console.log(`New version: ${version.major}.${version.minor}.${version.patch}`);
