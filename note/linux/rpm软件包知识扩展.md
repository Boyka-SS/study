### linux软件分类
- 二进制：有通用二进制，
- 源码包：可以定制、可跨平台 但安装比较麻烦，通常需要编译安装

            
### 主流程序包管理器       
- **dpkg** 是由 Debian Linux 社群所开发出来的， 只要是衍生版 Debian 的其他 Linux distributions 大多使用 dpkg 这个机制来管理软件的， 包括B2D, Ubuntu 等等，其前端工具有`apt-get`。
- **RPM** 由 RedHat 公司所研发开始名为(RedHat Package Manager)，后因被纳为标准包管理器，后改名为（RPM is Package Manager）包括 Fedora, CentOS, SUSE 等等，其前端工具有`yum`。

### 包管理器的基本功能：
- 打包
- 安装
- 升级
- 卸载
- 校验
- 数据库管理

### rpm包命名格式

`包名-版本号-发布次数-发行商-Linux平台-适合的硬件平台-包扩展名`
[参考链接](http://c.biancheng.net/view/2868.html)

### 获取rpm包的途径

1、发行商的光盘或站点服务器
以CentOS为例:
- http://mirrors.163.com
- http://mirrors.sohu.com

2、http://rpmfind.net
3、http://rpm.pbone.net

### 注意RPM包获取路径（相对安全的方式实在没有在到以上查找）
1、发行商，发行光盘中的包，需要升级时，官方释放出升级包；
2、Fedora EPEL（googole搜索EPEL）

### 来源合法性验正

源程序：通过md5或sha1校验码验正；
rpm包：发行商提供的合法性是可信的
验正包完整性：校验码
验正来源合法：公钥

> 在有些时候安装包里不是所有的功能都能用到的,如：一个源码：有10个功能，大多数用户只用其6个功能，余下的4个呢？这个时候这个包可能会分包
>
> 分包制作：把一个大的程序打包制作成多个包
> 主包：bash-4.3.2-2.el6.x86_64.rpm
> 支包：bash-hello-4.3.2-2.el6.x86_64.rpm
> bash-world-4.3.2-2.el6.x86_64.rpm

### rpm命令使用

[参考链接](https://blog.csdn.net/weixin_44844122/article/details/121191867)
[参考链接](https://blog.csdn.net/zkxfoo/article/details/46520553)
[参考链接](https://huaweicloud.csdn.net/633560d4d3efff3090b54b71.html?spm=1001.2101.3001.6650.16&utm_medium=distribute.pc_relevant.none-task-blog-2~default~BlogCommendFromBaidu~activity-16-122363510-blog-46520553.235^v29^pc_relevant_default_base3&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2~default~BlogCommendFromBaidu~activity-16-122363510-blog-46520553.235^v29^pc_relevant_default_base3&utm_relevant_index=17#devmenu1)