#!/usr/bin/env node

const program = require("commander"); // 命令行工具
const chalk = require("chalk");

// 版本信息
program
  .version(require("../package.json").version, "-v, --version")
  .usage("<command> [options]");

// 创建项目
program
  .command("create <project-name>")
  // .requiredOption("-t --template <template>", "选择模板") // 模板必选
  .description("从指定模板创建项目")
  .action(require("../lib/create"));

// 查看模板列表
program
  .command("list").alias("l")
  .description("仓库模板列表")
  .action(require("../lib/list"));

// 处理非法命令
program.command("<command>").action((cmd) => {
  program.outputHelp();
  console.log(` ` + chalk.red(`未知命令 ${chalk.yellow(cmd)}\n`));
});

// 解析命令行参数
program.parse(process.argv);
