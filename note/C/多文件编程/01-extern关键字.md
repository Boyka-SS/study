### extern 关键字

C 语言代码是由上而下的依次执行的，不管是变量还是函数，原则上都要先定义再使用，否则就会报错。

但在实际开发中，经常会在变量或者函数在定义之前就开始使用，这个时候需要`提前声明`

`声明就是提前告诉编译器我需要使用该变量或者函数，现在没有找到其定义请不要报错，稍后会补上`

**extern 用来声明一个变量或函数。**

如：#include<stdio.h>该头文件里面全是函数的声明，而函数的定义则在系统库里面，只有头文件而没有系统库，程序根本跑不起来。

#### 函数的声明

函数声明有四种形式：

```c
datatype functionname(datatype1 name1,datatype2 name2,...)
datatype functionname(datatype1 ,datatype2 ,...)
extern datatype function (datatype1 name1,datatype2 name2,...)
extern datatype function (datatype1 ,datatype2 ,...)
```

> datatype1 name1,datatype2 name2,...

#### 变量的声明

编译器认为`有 extern 才是声明，没有 extern 就是定义`

- 变量定义

  ```c
    datatype name = value;
    datatype name;
  ```

  > 可以在定义的同时初始化，也可以不初始化

- 变量声明

  ```c
  extern datatype name;
  ```

**extern 用来声明一个外部（其他文件中）的变量或函数，也就是说，变量或函数的定义在其他文件中。**
