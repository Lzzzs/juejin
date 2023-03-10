## 拉取项目

```shell
git clone https://github.com/Lzzzs/juejin.git
```

## 项目分支管理

目前 `dev` 是主分支，大家开发可以直接在主分支上开发（当然最好还是自己建一个分支，做完对应功能再 merge 到 dev 分支上），到时候我再做 `code review` 提 PR 合到 `main` 分支。

## 项目安装

```shell
npm i
```

## 提交代码

```shell
npm run commit
```

- 执行完命令之后，默认会将**所有更改文件提交至暂存区**
- 然后会有交互式的提示，辅助**填充 commit 信息**

> 以上命令只是将更改提交至本地仓库, 提交至远程仓库还需要额外执行`git push `

### commit type

| type     | description                                                                                          |
| -------- | ---------------------------------------------------------------------------------------------------- |
| feat     | 新功能（feature）                                                                                    |
| fix      | 修复 bug                                                                                             |
| docs     | 只改动了文档相关的内容                                                                               |
| style    | 格式(不影响代码含义的改动，例如去掉空格、改变缩进、增删分号)                                         |
| refactor | 重构(代码重构时使用、不是新增功能，也不是修改 bug 的代码变动,代码重构，未新增任何功能和修复任何 bug) |
| perf     | 提高性能的改动                                                                                       |
| test     | 添加测试或者修改现有测试                                                                             |
| build    | 改变构建流程，新增依赖库、工具、构造工具的或者外部依赖的改动，例如 webpack，npm                      |
| ci       | 自动化流程配置修改、与 CI（持续集成服务）有关的改动                                                  |
| chore    | 构建过程或辅助工具的变动、不修改 src 或者 test 的其余修改                                            |
| revert   | 回滚到上一个版本                                                                                     |
