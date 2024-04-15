### Git 详细操作说明

-----

#### 设置用户签名

> 设置用户签名是为了确保每次提交都有明确的作者信息
> 标识用户, 区分不同的开发人员
> 每次提交时, Git都会使用这些信息来记录提交者的身份
> 邮箱不一定是真实邮箱 可以是`虚拟邮箱`

```shell
git config --global user.name "xxx"
git config --global user.email "xxx"

# 全局设置, 作为所有Git仓库的默认签名
# 去掉 --global 在`该仓库目录`下运行则应用于当前仓库
```

```shell
git config user.name
git config user.email

# 查看用户签名
```

- 也可以进入 user/.gitconfig 配置文件中查看 如下图
- 如果是当前仓库的特定提交者 则进入 当前项目仓库的 .git 文件夹 下 config

![1.png]

----

#### .git/config 配置文件说明 

> 配置文件一般分成3种配置文件
- 文件名为`config`, 位于项目目录下的`.git`文件夹内, 仓库层面的, 只对本仓库有效
- 文件名为`.gitconfig`, 位于用户根目录, C:\User\<user_name>\.gitconfig, 用户层面的, 对本用户有效
- 文件名为`gitconfig`, 位于安装Git目录下的`etc`文件夹内, 系统层面的, 对本系统有效

> **配置部分说明**

```shell
[user]    # 设置提交代码时的用户信息
    name = Your Name
    email = your@email.com
[core]    # 核心配置, 如: 默认的文本编辑器
    editor = vim
[alias]   # 设置 Git 命令别名（很少用到感觉，可以玩玩）
    co = checkout
    ci = commit
    br = branch
    st = status
[color]   # 是否使用彩色显示, 还有其它颜色输出配置
    ui = auto
[push]    # 设置推送行为
    default = matching
[pull]    # 设置拉取行为
    ff-only
```

> git config 常用配置

```shell
git config --list / -l  # 查看所有配置（包括仓库,用户,系统配置）
git config --local --list   # 查看仓库配置
git config --global --list  # 查看用户配置
git config --system --list  # 查看系统配置
```

----

#### 本地库状态说明

1. 内容状态: 表示内容的改变

    - 工作区
    - 暂存区
    - 提交区

2. 文件状态

    - 已跟踪
    - 未跟踪

> 添加文件: 工作区
> 文件添加到`暂存区`使用下面命令（同时文件被跟踪）
    ```shell
    git add 文件名 + 后缀  # 添加文件内容到暂存区
    git add .  # 添加所有文件
    ```
> 想要删除暂存区的内容则使用如下命令
    ```shell
    git rm --cached <file>
    ```
> 然后是提交代码到本地库, 形成自己的历史版本
    ```shell
    git commit -m "xxxx"  # 从暂存区中提交所有文件
    git commit -m "xxxx" 文件名 + 后缀  # 从暂存区中的提交指定文件
    # 扩展
    git commit -a -m "xxxx" # 从工作区中提交所有文件
    git commit -a -m "xxxx" 文件名 + 后缀  # 从工作区中的提交指定文件
    ```

----

#### 命令详细

> 常用命令

1. `git config`: 参考配置文件说明
2. `git version / git -v`: 查看当前Git版本
3. `git init`:  创建一个空的代码储存库
4. `git clone <Project Url>`: 将现用的储存库进行复制
5. `git add <file>`: 将单个文件添加到暂存区
6. `git add .`: 将所有修改过的文件添加到暂存区
7. `git commit -m "xxx"`: 将暂存区的代码提交到本地存储库
8. `git status`: 查看有多少文件需要得到关注

> 分支类命令

1. `git branch`:  列出所有分支
2. `git branch <branch_name>`: 创建新分支
3. `git branch -d <branch_name>`: 删除分支

4. `git checkout <branch_name`: 切换分支
5. `git checkout -b <branch_name>`: 创建并切换分支

6. `git remote add origin <url>`: 本地`仓库`链接到远程
7. `git push --set-upstream origin <remote_branch_name>`: 将本地`分支`与远程分支关联
8. `git push -u origin <branch_name>`: 推送到远程仓库指定分支
> 先建立`仓库关联`, 再`分支关联`, 最后代码提交

> git remote

- `git remote add origin <远程仓库地址>`: 本地项目与远程仓库建立关联
- `git remote`:    显示所有远程仓库名称
- `git remote -v`: 查看所有远程仓库地址详细
    - 显示 origin url  # 前一个表示远程仓库名称 后一个是远程仓库地址
    - fecth: 表示该仓库用于从远程仓库获取更新
    - fush:  表示该仓库用于将本地提交推送到远程仓库操作
- `git remote rm origin`: 删除已经添加的远程仓库

- `git remote add <自定义名称> <另一个远程仓库地址>`: 表示添加多个远程仓库
    - origin / <自定义名称> 都是远程仓库名称
- `git remote set-url origin <新的远程仓库地址>`: 当多个仓库时, 更新远程仓库 url


