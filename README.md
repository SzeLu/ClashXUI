# 项目
> 这是一个clash应用的UI项目, 为了解决Linux上不能通过GUI管理clash的配置. 但是项目基于 Electron 开发, 所以实际上这是个跨平台项目, 可以运行在 windows 和 macOS 平台.

# 脚本
> 项目不提供直接可用的二进制包, 因为 Electron 生成的包较大, 所以您需要用到如下命令来自己构建相应平台的安装包.

``` bash
# 安装依赖
npm install

# 调试
npm run server  #启动服务
npm run app     #启动UI

# 构建
npm run build #打包的前置条件, 执行下面命令前, 先进行build

# 打包
npm run l64 #打包 Linux 平台 deb 包
npm run m64 #打包 macOS 平台安装包
npm run w64 #打包 Windows 平台安装包
```

> 项目基于之前项目改的, 没花太多时间, 所以功能上并不完善. 主要能支持流量查看和 proxy 的渠道切换. 项目不包含 clash 项目的代码, 所以单独启动并不能使用.

> 由于基本满足了作者在 Ubuntu 上管理 clash 的需求, 所以暂时不计划继续增加新功能. 依然记录下想做的事情, 如下:
```
1. clash 配置管理
2. clash 配置更新
3. clash 配置设置. 包括端口, 日志级别等
4. clash 日志监控
5. 支持全局代理
6. 集成 clash
```

# 捐赠
    项目接受捐赠. 您可以直接捐赠, 或者捐赠时备注您希望添加的功能. 

![微信收款码](donate/微信收款码.png)
![支付宝收款码](donate/支付宝收款码.png)

# 反馈
> 可以在 issue 中告诉我遇到的问题, 或者写邮件给我