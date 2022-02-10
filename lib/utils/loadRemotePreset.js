const download = require("download-git-repo");
const path = require("path");
const os = require("os");
const fs = require("fs");

module.exports = async (tplurl, clone = false) => {
  // 生成临时目录存放
  const tmpdir = path.resolve(os.tmpdir(), "xzb-cli");
  // 清除缓存目录
  if (clone) fs.rmdirSync(tmpdir, { recursive: true });
  // 从gitlab下载模板
  return new Promise((resolve, reject) =>
    download(
      tplurl,
      tmpdir,
      { clone },
      (err) => (err ? reject(err) : resolve(tmpdir))
    )
  );
};
