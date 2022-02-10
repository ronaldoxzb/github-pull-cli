const fs = require("fs");
const path = require("path");

// 读取模板列表
exports.readTplJson = () => {
  return Promise.resolve(
    JSON.parse(
      fs.readFileSync(
        path.join(__dirname, "../config/tplGitRepo.json"),
        "utf-8"
      )
    )
  );
};

// 写入模板列表
exports.writeTplJson = (json) => {
  return Promise.resolve(
    fs.writeFileSync(
      path.join(__dirname, "../config/tplGitRepo.json"),
      JSON.stringify(json),
      "utf-8"
    )
  );
};
