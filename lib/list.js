const chlak = require("chalk");
const tplGitRepo = require("./utils/gitRepoJson");

// 模板列表
module.exports = () => {
  tplGitRepo.readTplJson().then((tplJson) => {
    for (let key in tplJson)
      console.log(`➡️  Template name ${chlak.yellow(`- ${key}`)}`);
  });
};
