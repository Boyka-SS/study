[ toc ]

## 一、shell变量


 **每一个变量的值都是字符串** ，也可以使用 Shell declare 关键字显式定义变量的类型

### 1 定义变量

定义变量方式

```shell
var=value
var='value'
var="value"
```
> 如果 value 不包含任何空白符（例如空格、Tab 缩进等），那么可以不使用引号；如果 value 包含了空白符，那么就必须使用引号包围起来。

> **赋值号=的周围不能有空格**

命名规范：
- 变量名由数字、字母、下划线组成
- 必须以字母或者下划线开头
- 不能使用 Shell 里的关键字（通过 help 命令可以查看保留关键字）

### 2 使用变量

使用变量方式：
```shell
var='fan lihao'
var2=${var}
```
### 3 修改变量

```shell
url="http://c.biancheng.net"
echo ${url}
url="http://c.biancheng.net/shell/"
echo ${url}
```
对变量赋值时不能在变量名前加 \$，只有在使用变量时才能加 \\$。

### 4 单引号和双引号的区别

以单引号`' '`包围变量的值时， **单引号里面是什么就输出什么** ，即使 **内容中有变量和命令（命令需要反引起来）也会把它们原样输出** 。这种方式比较适合定义 **显示纯字符串** 的情况，即不希望解析变量、命令等的场景。

以双引号`" "`包围变量的值时，输出时会 **先解析里面的变量和命令** ，而不是把双引号中的变量名和命令原样输出。这种方式比较 **适合字符串中附带有变量和命令并且想将其解析后再输出** 的变量定义。

### 5 命令结果赋值变量

shell支持将命令结果赋值给变量，方式如下：

```shell
var=`command_line`
var=$(command_line)【推荐】
```

### 6 只读变量

使用 readonly 命令可以将变量定义为只读变量，只读变量的值不能被改变
```shell
myUrl="http://c.biancheng.net/shell/"
readonly myUrl
myUrl="http://c.biancheng.net/shell/"
```

### 7 删除变量

```shell
unset variable_name
```

## 二、shell变量作用域

Shell 变量的作用域可以分为三种：
- 有的变量只能在函数内部使用，这叫做 **局部变量** （local variable）
- 有的变量可以在当前 Shell 进程中使用，这叫做 **全局变量** （global variable）
- 而有的变量还可以在子进程中使用，这叫做 **环境变量** （environment variable）

### 1 局部变量
