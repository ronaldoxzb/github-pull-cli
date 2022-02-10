const fse = require("fs-extra");
const ora = require("ora");
const path = require("path");
const execa = require("execa");
const chalk = require("chalk");
const inquirer = require("inquirer");
const tplGitRepo = require("./config/tplGitRepo.json");
const loadRemotePreset = require("./utils/loadRemotePreset");
const { exec } = require("child_process");

//  从模板创建项目
module.exports = async (projectName, cmd) => {
  // 获取node当前工作目录
  const cwd = process.cwd();
  // 获取目标目录
  const targetDir = path.resolve(cwd, projectName);
  // 判断目录是否存在
  if (fse.existsSync(targetDir)) {
    const { ok } = await inquirer.prompt({
      name: "ok",
      type: "confirm",
      message: `目录已存在是否覆盖？`,
    });
    // 确认则清空
    if (ok) await exec(`rm -rf ${targetDir}`);
    else return;
  }
  // 拉取模板列表
  const tpls = Object.keys(tplGitRepo).map((value) => ({
    name: `${value} - ${tplGitRepo[value].description}`,
    value,
  }));
  // 用户选取模板
  const { tplKey } = await inquirer.prompt([
    {
      name: "tplKey",
      type: "list",
      choices: tpls,
    },
  ]);
  // 获取模板
  const repo = tplGitRepo[tplKey];
  let tmpdir; // 代码下载临时文件夹
  console.log(`✨ Creating project in ${chalk.yellow(projectName)}.`);
  console.log();
  const spinner = ora();
  // 仓库拉去模板
  if (repo) {
    const { download: url } = repo;
    spinner.text = "下载模板中...";
    spinner.start();
    try {
      tmpdir = await loadRemotePreset(url, true);
    } catch (err) {
      console.error(
        chalk.red(`Failed fetching remote git repo ${chalk.cyan(url)}:`)
      );
    }
  } else console.error(chalk.red(`模板[${chalk.yellow(tplKey)}]不存在`));

  // 拷贝文件
  if (tmpdir) {
    try {
      fse.copySync(tmpdir, targetDir);
      spinner.text("初始化git仓库");
      await execa("git", ["init"], { cwd: targetDir });
      spinner.text("yarn add");
      await execa("yarn", { cwd: targetDir });
    } catch (err) {
      // spinner.stop();
      // process.exit(1);
    }
  }
  spinner.stop();
  spinner.succeed("已完成");
  process.exit(0);
};
