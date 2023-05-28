## 一、文件IO

从用户空间角度考虑的输入与输出：

  **从内核读取数据**或**从文件中读取数据**，叫 "input" <br/>
  **写数据到内核**或**写数据到文件**中，叫 "output"

## 二、open函数

### 原型
```c
open(char *,flag,mode)
```
在**fcntl.h**中声明，最多三个参数。函数作用：**创建或打开某个文件**

### 参数解释

|参数名|含义|
| --- | --- |
|`char *`| 要打开的文件的路径（名称，路径） |
|`flag`| 打开文件的方式 |
|`mode`| 初始化创建新文件的权限 |


> **打开文件**时候，可以无mode参数；但是**创建文件**的时候，必须有mode参数
>
> 指定mode参数时候，open函数并不会按照"你的意愿"去初始化文件权限，而是经过**文件掩码**处理后，才得到真正的初始化权限数字。
>
> 所谓掩码就是，mode和umask都转为二进制，umask为1的比特位，对应位置的mode的数值会被掩盖点转为0
>
> ![](C:\Users\HP\Desktop\笔记\images\Snipaste_2023-05-25_07-53-19.png)



flag内容：

|flag| 功能 |
| --- | --- |
| O_RDONLY | 只读 |
| O_WRONLY | 只写 |
| O_RDWR | 读写 |
| O_CREAT | 创建一个文件 |
| O_EXCL | 如果使用O_CREAT时，文件存在，则可返回错误信息。这一参数可测试文件是否存在 |
| O_TRUNC | 打开文件（会把已经存在的内容给删除） |
| O_APPEND | 追加方式打开文件（不会把已经存在的内容给删除） |

### 返回值


文件操作成功，返回文件描述符（一个非负的正整数，文件的ID号）；操作出错返回　｀－１｀



内核的一个重要功能就是**文件管理**。

系统有非常多的文件，内核怎样认识每一个文件呢？

内核采用ID号的方式标识这些文件，即inode号。 

_inode号表示不同的文件，只要文件不一样，inode号就不一样。内核文件的ID号，在每个用户的程序中用文件描述符映射。_

 open函数的返回值就是这个ID号。

### 案例——仿touch命令
```c
#include<stdio.h>
#include<unistd.h>
#include<fcntl.h>
int main(int argc,char * argc[])
{
  int fd;
  //打开文件
  fd=open(argv[1],O_CREAT|O_RDWR,0777);
  if(fd<0)
  {
    printf("create file %s failure\n",argv[1]);
    return -1;
  }
  printf("create file %s success,fd=%d\n",argv[1],fd);
  //关闭文件
  close(fd);
  return 0;
}
```



掩码的作用是将open函数的mode参数对应位置的权限掩盖掉。

Open函数创建文件时的权限是` mode & (~umask)`，mode值与取反的umask值相与。
