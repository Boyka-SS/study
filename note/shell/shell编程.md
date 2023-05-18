



## Shell编程

## 一、shell功能

shell是一个`命令行解释器`，接收应用程序/用户命令，然后调用操作系统内核

<img src="https://foruda.gitee.com/images/1673329847373157902/cc745f36_8027319.png " style="zoom:80%;float:left" />

## 二、shell解析器

### 1）linux 提供的Shell解析器有：

`cat /etc/shells`

```shell
/bin/sh
/bin/bash
/usr/bin/bash
/bin/rbash
/usr/bin/rbash
/bin/dash
/usr/bin/dash
/usr/bin/tmux
/usr/bin/screen
```

### 2）bash和sh的关系

`sh -> bash`

## 三、shell脚本入门

### 1）脚本格式

脚本以`#!/bin/bash`开头（指定解析器）

### 2）案例：输出hello world

```shell
#!/bin/bash

echo "Hello World"
```

### 3）`脚本执行方式`

- `采用bash或sh+脚本的相对路径或绝对路径（不用赋予脚本+x权限）`

  ```shell
  sh demo.sh
  sh /home/fanlihao/demo.sh
  
  bash demo.sh
  bash /home/fanlihao/demo.sh
  ```

- `采用输入脚本的绝对路径或相对路径执行脚本（必须具有可执行权限+x）`

  ```shell
  chmod -R 777 demo.sh  #修改文件变为可执行
  
  #第一种执行方法，本质是bash解析器帮你执行脚本，所以脚本本身不需要执行权限
  ./demo.sh
  #第二种执行方法，本质是脚本需要自己执行，所以需要执行权限
  /home/fanlihao/demo.sh
  ```

### 4）多命令处理

可在.sh文件中写入多个命令

## 四、Shell中的变量

### 1）变量类型

- `局部变量` 

  局部变量在脚本或命令中定义，仅在当前shell实例中有效，其他shell启动的程序不能访问局部变量。

- `环境变量`

  所有的程序，包括shell启动的程序，都能访问环境变量，有些程序需要环境变量来保证其正常运行。

  必要的时候shell脚本也可以定义环境变量。

- `shell变量`

  shell变量是由shell程序设置的特殊变量。shell变量中有一部分是环境变量，有一部分是局部变量，这些变量保证了shell的正常运行

### 2）环境变量

1. 常用的环境变量

   `$HOME`、`$PWD`、`$SHELL`、`$USER`等

2. 案例

   - 查看环境变量值：`echo $HOME`
   - 显示当前Shell中所有变量：`set`

### 3）自定义变量

1. 语法+变量命名规则

   `variable_name=variable_value`

   注意：

   - 等号两侧不能有空格
   - 命名只能使用英文字母，数字和下划线，首个字符不能以数字开头
   - 变量名中间不能有空格，可以使用下划线 **_**
   - 变量的值如果有空格，需要使用双引号或单引号括起来
   - 在bash中，变量默认类型都是字符串类型，无法直接进行数值运算
   - 不能使用标点符号和bash中的关键字（`help`查看所有关键字）

2. 使用变量

   `${variable_name}`

3. 删除变量

   `unset variable_name`

4. 只读静态变量，仅在定义时候可以赋值

   `readonly variable_name`，切记只读变量`不可以unset`

5. 全局变量供其他Shell程序使用

   `export variable_name`

### 4）特殊变量：`$n` ——  各个参数

1. 基本语法

   `$n`

   n为数字，$0代表该脚本名称，$1-$9`代表脚本执行时候命令行输入的依次参数`，第一到第九个参数，十以上的参数，十以上的参数需要用大括号包含，如${10}

2. 案例

   ```shell
   #!/bin/bash
   
   echo $0 $1 $2 $3 $4
   
   bash test.sh 0 1 2 3 4 5
   
   #test.sh 0 1 2 3
   ```

### 5）特殊变量：`$#` ——参数个数

1. 基本语法

   `$#`

   获取所有脚本名后`输入参数个数`，常用于循环

2. 案例

   ```shell
   #!/bin/bash
   
   echo $0 $1 $2 $3 $4
   echo $#
   
   bash test.sh 0 1 2 3 4 5
   
   #test.sh 0 1 2 3
   #6
   ```

### 6）特殊变量：`$*`、`$@` —— 所有参数

1. 基本语法

   `$*`：代表命令行中所有的参数，$*把所有的参数看成一个整体

   `$@`：代表命令行中所有的参数，不过$@把每个参数区分对待

2. 案例

   ```shell
   #!/bin/bash
   
   echo $0 $1 $2 $3 $4
   echo $#
   echo $*
   echo $@
   
   bash test.sh 0 1 2 3 4 5
   
   #test.sh 0 1 2 3
   #6
   #0 1 2 3 4 5
   #0 1 2 3 4 5 
   ```

### 7）特殊变量：`$?` —— 检查上一次命令执行是否正确

1. 基本语法：

   `$?`

   最后一次执行的命令的返回状态。如果这个变量的值为0，证明上一个命令正确执行；如果这个变量的值为非0（具体是哪个数，由命令自己来决定），则证明上一个命令执行不正确了

2. 案例：

   ```shell
   bash test.sh 0 1 2 3 4 5
   
   echo $?
   #0
   ```

   

## 五、运算符

1. 基本语法：

   1. “`$((运算式))`”或“`$[运算符]`”

   2. `expr +,-,\*,/,% `

      > expr运算符间要有空格，变量赋值则不需要；
      >
      > 注意乘法需要转义

2. 案例：

   ```shell
   expr 2 + 3
   expr 3 - 2
   #(2+3)*4
   expr `expr 2 + 3` \* 4
   S=$[(2+3)*4]
   echo $S
   ```

## 六、 条件判断

1. 基本语法

   `[ condition ](注意condition前后有空格)`

   `注意：`条件非空即为true。[ ] 返回false，[ a ] 返回true

2. 常用判断条件

   - `整数比较`

     `=`  字符串比较

     `-lt(less than)` <  

     `-le(less equal)` <=

     `-gt(greater than )` >

     `-ge(great equal)` >=

     `-eq` 等于

     `-nq`不等于

   - `判断文件权限`

     `-r`：是否有读权限

     `-w`：是否有写权限

     `-x`：是否有可执行权限

   - `判断文件类型`

     `-f`：是否为文件（同时判断文件是否存在）

     `-e`：文件是否存在

     `-d`：文件是否存在是否为一个目录

3. 案例（多条件判断）

   ```shell
   [ 23 -ge 20 ]
   echo $?
   [ -w test.sh ]
   echo $?
   [ -e /home/fanlihao/test.sh ]
   echo $?
   
   #多条件判断
   # &&表示前一条命令执行成功时，才执行后一条命令
   # || 表示上一条命令执行失败后，才开始执行下一条命令
   [ -w test.sh ] && echo OK
   #ok
   [ -d test.sh ] && echo OK
   #啥也不输出
   [ -d test.sh ] || echo OK
   #OK
   ```


## 七、流程控制

### 7.1 if 判断

1. 基本语法

   ```shell
   if [ condition ];then
   	command...
   if
   ```

   ```shell
   if [ condition ]
   then 
   	command 
   if
   ```

   注意事项：

   - [ condition ] ，中括号和条件判断式之间必须有空格
   - if 后要有空格

2. 案例

   ```shell
   #!/bin/bash
   
   if [ $1 -eq 1 ]; then
   	echo "This is 1"
   fi
   
   if [ $1 -eq 2 ]; then
   	echo "This is 2"
   fi
   ```

### 7.2 case语句

1. 基本语法

   ```shell
   case $变量名 in 
   
   值1)
   	command
   ;;
   值2）
   	command
   ;;
   *)
   	#都未匹配上，执行此步骤
   	command
   ;;
   esac
   ```

   > 1.  case行尾必须为单词`in`，每一个模式匹配必须以右括号`）`结束。
   > 2. 双分号`;;`表示命令序列结束
   > 3. 最后的`*）`表示默认模式

2. 案例

   ```shell
   #!/bin/bash
   
   case $1 in 
   1)
   	echo "this is 1"
   ;;
   2)
   	echo "this is 2"
   ;;
   *)
   	echo "栓Q，I don`t know what you input"
   ;;
   esac
   ```

### 7.3 for循环

1. 基本语法

   ```shell
   for((初始值;循环控制条件;变量变化))
   
   do
   	command
   done
   ```

   ```shell
   for variable_name in va1 va2 va3...
   do
   	command
   done
   ```

   > 





1. 案例

   ```shell
   #!/bin/bash
   
   s=0
   for((i=0;i<100;i++))
   do
   	s=$[$s+$i]
   done
   
   echo $s
   ```

   ```shell
   #!/bin/bash
   
   for i in $*
   do
   	echo "this is $i"
   done
   ```

   `比较$@和$*的区别`

   - `$*`和`$@`都表示传递给函数或脚本的所有参数，不被双引号“”包含时，都以$1 $2 …$n的形式输出所有参数。

     ```shell
     for i in $*
     do
     	echo "this is $i"
     done
     
     #
     for i in $@
     do
     	echo "this is $i"
     done
     ```

     

   - 当它们被双引号“”包含时，“$*”会将所有的参数作为一个整体，以“$1 $2 …$n”的形式输出所有参数；“$@”会将各个参数分开，以“$1” “$2”…”$n”的形式输出所有参数。

     ```shell
     for i in “$*”
     do
     	echo "this is $i"
     done
     ```

     ```shell
     for i in “$@”
     do
     	echo "this is $i"
     done
     ```

     

### 7.4 while 循环

1. 基本语法

   ```shell
   while [ condition ]
   do 
   	command
   done
   ```

2. 案例

   ```shell
   i=0
   sum=0
   while [ $i -eq 100 ]
   do 
   	sum=$[$sum+$i]
   done
   ```

   

## 八、read读取控制台输入

1. 基本语法

   `read [选项] [参数]`

   选项

   `-t`指定读取值时等待的时间（秒）

   `-p`指定读取值时的提示符

   参数

   `变量`：指定读取值的变量名

2. 案例

   ```shell
   #!/bin/bash
   
   read -t 7 -p "输入你的名字在7秒呢" NAME
   
   echo $NAME
   ```

## 九、函数

### 9.1 系统函数

1. `basename`基本语法

   `basename [string/pathname] [suffix]`

   获取最后一个string/pathname中`/`后面的内容

   `suffix`

   指定suffix后，basename会在最后的内容中去除.suffix

2. 案例

   ```shell
   basename /home/fanlihao/test.sh 
   #test.sh
   basename /home/fanlihao/test.sh .sh
   #tesh
   ```



1. `dirname`基本语法

   `dirname string/pathname`

   从给 定的包含绝对路径的文件名中去除文件名（非目录的部分），然后返回剩下的路径（目录的部分）

2. 案例

   ```shell
   dirname /home/fanlihao/test.sh
   
   #/home/fanlihao
   ```

   

### 9.2 自定义函数

1. 基本语法

   ```shell
   function funcname(){
   	command...
   	[return int]
   }
   ```

   > 必须在调用函数地方之前，先声明函数，shell脚本是逐行运行。不会像其它语言一样先编译。
   >
   > 函数返回值，只能通过$?系统变量获得，可以显示加：return返回，如果不加，将以最后一条命令运行结果，作为返回值。return后跟数值n(0-255)

   

2. 案例


## 十、数组

```shell
#定义数组
#方式一
array_name=(value1 value2 ...)#值 空格隔开
#方式二
array_name[0]=value0
array_name[1]=value1
array_name[2]=value2

#读取数组元素值
${array_name[index]}
#读取数组所有元素
${array_name[*]}
${array_name[@]}

#定义关联数组(键值对)
#方式一
declare -A site=(["google"]="www.google.com" ["runoob"]="www.runoob.com" ["taobao"]="www.taobao.com")
#方式二
declare -A site
site["google"]="www.google.com"
site["runoob"]="www.runoob.com"
site["taobao"]="www.taobao.com"
#读取数组元素值
site["google"]

#读取数组所有元素
${site[@]}
${site[*]}
#数组前加一个感叹号 ! 可以获取数组的所有键
${!site[@]}
${!site[*]}

#获取数组长度
${#my_array[@]}
${#my_array[*]}

```



## 十一、调试与排错

1. 常见问题
   - 特殊字符问题
   - 环境变量问题
   - `test`
2. 调试与排查
   - `bash -n`
   - `bash -x`



## 十二、系统公共函数库

```shell
# 系统公共函数库文件

/etc/init.d/function

# 调用系统公共函数库中的函数

. /etc/init.d/functions
source /etc/init.d/functions

# 第三方公共函数库

Bash Shell Function Library
Bash Lib

```







## 十二、代码片段

- 获取脚本执行路径的方法

  ```shell
  echo $(cd $(dirname $0) && pwd)
  ```

  

## 十三、字符串






































