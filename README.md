## 拉取项目

```shell
git clone https://github.com/Lzzzs/juejin.git
```

## 项目分支管理

目前 `dev` 是主分支，大家开发可以直接在主分支上开发（当然最好还是自己建一个分支，做完对应功能再 merge 到 dev 分支上），到时候我再做 `code review` 提 PR 合到 `main` 分支。

## 项目安装

**根据使用不同的包管理器执行对应命令**

```shell
npm i
yarn
pnpm
```

## 提交代码

**根据使用不同的包管理器执行对应命令**

```shell
npm run commit
yarn commit
pnpm commit
```

- 执行完命令之后，默认会将**所有更改文件提交至暂存区**
- 然后会有交互式的提示，辅助**填充 commit 信息**

> 以上命令只是将更改提交至本地仓库, 提交至远程仓库还需要额外执行`git push `
