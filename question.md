- Todo:
- NodeList & HTMLCollection

### 常见遇到的问题

------

1. ###### 运行某个脚本指令报错

> 运行 tsc xxx.ts 时报错，表示限制运行该脚本，应该不限制于只有 typescript 问题

```shell
tsc : 无法加载文件 C:\Program Files\nodejs\tsc.ps1，因为在此系统上禁止运行脚本。有关详细信息，请参阅 https:/go.microsoft.com/fw 
link/?LinkID=135170 中的 about_Execution_Policies
```

- 管理员运行 shell
- 终端执行 `get-ExecutionPolicy`   # 查看执行策略，显示 Restricted（表示有限的，限制的）
- 终端执行 `set-ExecutionPolicy RemoteSigned`  # 设置执行策略为 远程签名的
- 提示 
```shell
执行策略更改
执行策略可帮助你防止执行不信任的脚本。更改执行策略可能会产生安全风险，如 https:/go.microsoft.com/fwlink/?LinkID=135170
中的 about_Execution_Policies 帮助主题所述。是否要更改执行策略?
```
- 终端执行 `get-ExecutionPolicy`   # 再次查看，即显示为 RemoteSigned

------

2. ###### 在 TS 环境下，变量报错

```shell
Cannot redeclare block-scoped variable 'xxx' .ts
Enum declarations can only merge with namespace or other enum declarations.
```

- 默认情况下，`DOM` 是全局运行环境
- 当声明一个变量时，与 DOM 中的全局 window 对象下的 name 属性出现了重名
```json
// 方法一: 修改 TS 配置，将默认环境 DOM 改成 es6
{
    "compilerOptions": {
        "lib": [
            "es2015" // 默认是 dom 环境下
        ]
    }
}
// 方法二: 不修改 TS 配置
// - 将当前文件作为模块声明，与全局环境分开
// - 在 TS 文件中，只要文件存在 import 或 export 时，都视为 module
export {}
```

------

3. ###### 每次提交代码与上传都需要输入密码解决方案

> 配置 github-config 将密码保存住

```shell
git config --global credential.helper store

cd ~/.gitconfig   // 查看github的配置

// `通过查看可知已配置加入，但是还是没有用`
```

> ssh-add -K KEYPATH

```shell
ssh-add -K /Users/watcher/.ssh/id_rsa
// `执行后是实测有用的`

cd ~/.ssh
pwd   // 查看当前路径
```

