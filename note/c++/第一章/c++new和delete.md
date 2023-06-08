申请和释放内存函数

|     | 申请     | 释放     |
| --- | -------- | -------- |
| c   | `malloc` | `free`   |
| c++ | `new`    | `delete` |

c

```c

int *p=(int *)malloc(sizeof(int));
free(p);

```

c++

```c++

int *p=new int;
delete p;


int *array = new int[10];
delete[] int;
```

new 也是在`堆区分配内存`，必须`手动释放`，否则只能等到程序运行结束由操作系统回收。

> 通常 new 和 delete、new[] 和 delete[] 操作符应该成对出现，并且不要和 C 语言中 malloc()、free() 一起混用。
