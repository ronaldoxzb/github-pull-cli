const { execSync } = require("child_process");

// 是否已安装git
exports.hasGit = () => {
  try {
    execSync("git --version", { stdio: "ignore" });
    return true;
  } catch (err) {
    return false;
  }
};
