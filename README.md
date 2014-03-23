## bee-demo

bee-demo是generator-bee的demo工程，generator-bee是kissy简单工程构建器，强调简单和快速，没有复杂的工程分级和复杂的命令功能。

* 作者：明河（剑平）

### 目录结构：

    bee-demo           // 工程名，也是库名
    |      |-----src    // 源码目录
    |      |     |---------index.js     // index页面入口脚本
    |      |     |---------mods     // 依赖的业务模块
    |      |     |---------index.less     // index页面样式
    |      |-----build    // 发布目录
    |      |     |---------deps.js     // 模块依赖表
    |      |-----demo    // demo目录
    |      |-----test    // 测试用例目录
    |      |-----build    // 发布目录
    |      |-----README.md      // 库介绍
    |      |-----gruntfile.js   // grunt打包时使用的配置信息
    |      |-----totoro-config.js       // totoro回归工具配置文件
    |      |-----package.js     // 依赖包配置


打包运行：

    grunt

开发阶段开启文件实时编译：

    grunt dev