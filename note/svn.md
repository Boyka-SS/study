[toc]

## 一、服务端命令与客户端命令

### 服务端命令
- svnserver
    控制svn系统服务的启动等
- svnadmin
    版本库的创建/导出/导入/删除等
- svnlook
    查看版本库的信息等

### 客户端命令
- svn 
    版本库的检出/更新/提交/重定向等

## 二、版本库的创建与删除

### 创建版本库

`svnadmin create /path/reposname`

> 可以是相对或绝对路径

[参数]
- `--fs-type`
    数据保存类型
    [参数值]
    - fsfs(recommend)
    - dbd
    
    [例子]
    `svnadmin create --fs-type fsfs /path/repos`

### 删除版本库(谨慎使用)

`rm -rvf /path/repos`

## 三、版本库配置及权限分配

### 配置文件

> 配置文件位于 `/path/repos/conf/` 版本库所在目录下的conf文件夹下

conf文件夹下面有三个配置文件:
1. authz
    
    配置当前版本库的用户组以及每个用户组的权限（更新或提交代码的权限）
    
    [例子]
    ```   
    #别名配置
    [aliases]

    #用户组配置：分组（不同权限组），分用户到特定组（不同用户不同权限）
    #格式: 组名 = 用户名1,用户名2,用户名3...
    [groups]
    pm = imooc
    dev = imooc2,imooc3
    rookie = imooc4

    #版本库的根目录
    #svnserve.conf文件配置authz文件时，路径名可以随意配置，多个版本库可以同时配置同一个authz文件 
    #此时的authz文件适用于所有的引用该文件的版本库    
    [/]
    @pm = rw    
    @dev = r
    @rookie = r

    #版本库名称：路径
    #表示后面的权限仅适用于对应名称的版本库
    [imooc:/]
    @pm = rw #指定用户组权限
    imooc2 = r #指定用户权限
    imooc3 = rw
    imooc4 = #等号右边无内容即无权限

    #也可以为特定版本库的特定文件夹指定具体的权限
    [repos:/xxx]
     * = r #*号表示所有的用户
    ```
 
    > 可以为任何版本库任何文件夹配置权限 
2. password
    
    配置 允许访问当前版本库 的用户及其密码

    格式：
    `username = password`

    [例子]    
    ```
    imooc = 123456
    ```
3. svnserve.conf

    配置当前版本库客服端的默认权限，以及指定权限分组文件和用户密码文件
    [配置项]
    - anon-access
    指定 未经验证 的用户，即没有用户名和密码的用户 访问当前版本库的权限
    [权限]
        - none 什么都做不了
        - read 允许更新代码
        - write 允许提交代码
        > 这里只是笼统的配置，精细的配置可以在authz中配置
    - auth-access 
    指定 通过验证 的用户，有用户名和密码的用户，访问当前版本库的权限
    - password-db
    指定 用户的用户名以及密码配置文件的路径
    支持相对或绝对，默认是与svnserve.conf同级目录下的password，配置文件必须具备可读写的权限
    - authz-db
    指定 权限分组配置文件的路径
    支持相对或绝对，默认是与svnserve.conf同级目录下的authz，配置文件必须具备可读写的权限
    [例子]
        ```
        anon-access:none
        auth-access:read
        password-db:
        auth-db:
        ```

> 术语解释
> 1.更新
> 将本地代码和团队代码进行同步
> 2.提交
> 将本地代码上传
> ![输入图片说明](https://foruda.gitee.com/images/1680244421135371814/dcda68b4_8027319.png "Snipaste_2023-03-31_12-22-52.png")

## 四、SVN 版本库访问

![输入图片说明](https://foruda.gitee.com/images/1680244525312159782/c57ec644_8027319.png "Snipaste_2023-03-31_14-35-12.png")
> 可以在不同OS下，使用客服端，访问不同OS下的服务端

### 运行SVN服务（服务器端）

> 是对特定的某个版本库开启服务，让其可以接收别的客服端上传的代码

`svnserve -d -r /path/repo`

### 服务端访问

![输入图片说明](https://foruda.gitee.com/images/1680244997540808779/f4ed7be7_8027319.png "Snipaste_2023-03-31_14-42-42.png")

#### 命令行
1. **检出版本库**
    本地创建一个工作副本
    ```
    svn checkout/co svn://ip_address [--username xx] [--password xx]
    ```
#### 图形化界面
小乌龟

> 服务自启动，在ubuntu下的/etc/rc.local文件中在 `exit 0 ` 前加入`svnserve -d -r /path/repo`

## 五、常见的SVN术语与文件状态

### 常见术语

- 版本库
- 检出
- 工作副本
- 更新
客服端为了
- 提交

- 版本
- 版本号

### 文件状态

> 文件状态是针对个人工作区的文件而言，而非服务端的
- 无版本控制
在工作副本的基础上，新建的数据文件，没有加入版本控制中
- 增加
对新建的文件进行增加操作，使其进入版本控制
- 修改
- 常规
- 冲突
- 删除
- 锁定

[建议]
   - 工作副本和版本库尽可能保持一致
   - 开发中最大程度避免数据冲突


## 六、checkout与export的区别与使用

checkout 检出
export 导出

知识点回顾：
 - checkout检出的工作副本目录中含.svn文件夹
 - 版本控制中有一种文件状态：无版本控制

两个命令的格式和参数基本一致，下面介绍一个常用的参数

  `-r`：检出或导入指定版本的项目文件
 - svn checkout -r 3(checkout默认检查最新的一次项目文件)
 - svn export -r   2

[二者的区别]：
  export导出的项目文件夹下面无.svn文件夹，即导出的项目文件不再受svn版本控制；而checkout检出的项目文件依旧处于svn版本控制之下，含有.svn文件夹

> `checkout => .svn+项目文件`
> `export => 项目文件`

[总结]
.svn记录着工作副本最后一次更新后的文件状态
.svn标记工作副本的一切变化

## 七、常见的SVN客服端命令

1.`svn add` 添加到版本控制
- 添加单个文件
  `svn add fileName`
- 添加单个文件夹
  `svn add folderName`
  > 添加文件夹时候，**svn会将文件夹下面的文件默认递归添加到版本库中**
- 仅添加文件夹，不含文件夹内的文件
  `svn add folderName --non-recursive`
- 批量添加（一次添加所有的未被跟踪的文件）
  `svn add *`
  > **注意：** svn对于已经存在版本库的文件夹不行进行再一次扫描（即有可能仅有文件夹在版本库，而文件夹其 内的文件不在版本库）
  > 解决上述问题:`svn add * --force`

2.`svn commit/ci` 提交修改到服务端（创建一个新版本号）
- 提交单个文件
  `svn ci -m "提交备注" filename`
- 提交单个文件夹
  `svn ci -m "提交备注" foldername`
- 批量提交
  `svn ci -m "提交备注" *`
> -m 参数是必须的

3.`svn update/up` 更新工作副本到最新版本
- 将工作副本更新到服务端最新版本
  `svn up/update`
- 将工作副本中的单个文件更新到指定版本状态
  `svn up -r version_number filename`
- 批量更新，多个历史版本的文件到最新版本
  `svn up *`
> 可以在工作副本中，将任一个文件更新到任意版本，即查看不同版本下文件的变化情况
> **重要：** *svn update 默认情况下，每个文件只会从服务端更新一次最新版本*
> *并且对于工作副本中缺失的文件，执行up后，会重新补发一份*

4.`svn delete/del/remove/rm` 删除版本库中指定的文件或目录
- 删除单个文件
  `svn rm filename [-m "删除信息"]`
  `svn ci -m ""`//删除服务端的文件

5.`svn diff/di` 版本差异比较
- 查看单个文件的差异
  `svn diff filename`
- 比较工作副本与任意历史版本的差异
  `svn diff -r 2 filename`
- 比较任意两个版本的差异
  `svn diff 1:3 filename`
- 批量比较差异
  `svn diff`
  > 比较当前工作副本中存在的差异

6.`svn mkdir` 创建目录并增加到版本控制

  `svn mkdir foldername`

  > mkdir foldername + svn add foldername

7.`svn cat` 不检出工作副本直接查看服务端指定文件
  `svn cat svn://ip_address/filename`
  > 无须在工作副本的目录下查看

## 八、工作副本还原
`svn revert [--recursive] [filename|*]`
## 九、二进制冲突与树冲突
- 什么是冲突以及冲突的产生条件
  冲突常出现于工作副本长时间未更新时
  更新到的数据与工作副本的修改正好在同一处
  树冲突：发生树冲突的文件（图片）都不是二进制文本文件
         树冲突无法精确到行并且处理树冲突必须处理整个文件
- 如何尽可能的避免冲突
- 如何解决冲突
  发现冲突推荐选择(p)推迟处理

对于发生冲突的文件filename，有如下处理方式：
1. 直接编辑，处理冲突
2. 命令行模式
`svn resolve filename`
3. 处理冲突后，需要输入下面指令通知服务端
`svn resolved filename`//(必须的)

## 十、锁定与解锁（不推荐，可以偷取别人的锁定）
> 处理冲突的另行方案，不完美，解决树冲突比较不错
> 对于已锁定的文件，提交会自动解锁
> `svn ci -m "" filename --no-unlock` 提交不会自动解锁
> 锁定只是不允许别人提交同一份文件，允许别人在本地的工作副本上修改但无法提交

1. `svn lock filename `
  锁定文件，防止其他成员对文件进行提交
2. `svn unlock filename`
  解锁文件

## 十一、SVN进阶应用
1. `svn list/ls`
列出当前目录下处于**版本控制**的所有文件
`svn list/ls --recursive`
递归展示文件夹下的文件
`svn ls -v --recursive`
类似Linux系统命令的`ls -l`效果
> 列表展示内容：
> 该文件提交后版本库编号，提交者，文件大小，时间，文件名
2. `svn status/st`
列出工作副本中的文件（夹）的状态
?:无版本控制
D:已被标记从从版本库中删除
M:已被编辑过
A:已被标记增加到版本控制中
R:文件被替换
C:文件存在冲突
!:文件缺失

3. `svn log`
查看提交日志（来自`svn ci的-m参数`）
4. `svn info`
工作副本及文件（夹）的详细信息
`svn info filename`
`svn info --xml`

## 十二、多版本库解决方案

##### 预备知识
TCP/IP协议规定端口号范围为0-65535号
- `0-1023`号为公认端口
- `1024-49151`号为注册端口
- `49152-65535`号为私有端口
##### 方法一
> 使用不同端口号，可以使得仓库处于不同目录

一台服务器上面可以运行多个版本库，**指定不同版本库的不同端口号（任意未被使用的）即可**
[Server]
`svnadmin create repo_name`
`svnserve -d -r repo_name --listen-port port_number`
[Client]
`svn checkout svn://ip-address:port work_copy_new_name`
##### 方法二
> 使用相同端口号，就必须使仓库处于同一目录下

[Server]
`svnserve -d -r repo_parent_dir`
[Client]
`svn co svn://ip_address/repo_name`

##### 总结
多版本库解决方案
|       | 优点            | 缺点      |
|-------|---------------|---------|
| 多个端口号 | 版本库可以创建在任意位置  | 端口号容易混淆 |
| 一个端口号 | 版本库必须创建在同一目录下 | 无需分配端口号 |

## 十三、SVN COPY


