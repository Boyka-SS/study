#### 冒泡排序

```c
int temp = 0;
for(int i = 0; i < sizeof(arr) / sizeof(int); i++) {
	for(int j = i; j < sizeof(arr) / sizeof(int); j++) {
    	if(arr[i] > arr[j]) {
        	temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
}
```

#### 条件编译：

```c
#if 整型常量表达式1
    程序段1
#elif 整型常量表达式2
    程序段2
#elif 整型常量表达式3
    程序段3
#else
    程序段4
#endif
```

```c
#ifdef  宏名
    程序段1
#else
    程序段2
#endif
```

> 如果当前的宏已被定义过，则对“程序段1”进行编译，否则对“程序段2”进行编译。

```c
#ifndef 宏名
    程序段1 
#else 
    程序段2 
#endif
```

> 如果当前的宏未被定义，则对“程序段1”进行编译，否则对“程序段2”进行编译

![](C:\Users\HP\Desktop\笔记\images\QQ截图20230213163011.png)

`#if 后面跟的是“整型常量表达式”，而 #ifdef 和 #ifndef 后面跟的只能是一个宏名，不能是其他的。`

#### 指针：

二维数组指针与指针数组：

```c
int (*p)arr[4];//二维数组指针，不能去掉括号
int *(arr[4]);//指针数组，可以去掉括号直接写作 int *arr[4];
```

```c
#include <stdio.h>

int main() {
  int arr[3][4] = {{0, 1, 2, 3}, {4, 5, 6, 7}, {8, 9, 10, 11}};

  //   int(*p)[4] = &arr[0];
  int(*p)[4] = arr;
 
  int i = 0;
  printf("%p\n", p );//0061FEE8
  printf("%p\n", arr);//0061FEE8
  printf("%p\n", arr[0]);//0061FEE8
  
  printf("%p\n", p+1 );//0061FEF8
  printf("%p\n", arr[1]);//0061FEF8
  
  for (; i < 4; i++) {
    printf("%d ", *(p[0] + i));
  }// 0 1 2 3 
  p = p + 1;
  printf("\n");
  for (i = 0; i < 4; i++) {
    printf("%d ", *(p[0] + i));
  }//4 5 6 7
  return 0;
}
```

函数指针：

```c
returnType (*pointName)(param list);
```

```c
#include <stdio.h>
// 返回两个数中较大的一个
int max(int a, int b) { return a > b ? a : b; }

int main() {
  int x, y, maxval;
  // 定义函数指针
  int (*pmax)(int, int) = max;  // 也可以写作int (*pmax)(int a, int b)
  printf("Input two numbers:");
  scanf("%d %d", &x, &y);
  maxval = (*pmax)(x, y);
  printf("Max value: %d\n", maxval);
  return 0;
}
```

#### 结构体：

结构体定义

```c
//结构体定义
struct struct_name{
	//variable_name
	//array_name
};
```

结构体声明变量

```c
//结构体声明变量
//方式一
struct struct_name variable1,variable2;
//方式二
struct struct_name{
    //variable_name
	//array_name
}variable3,variable4;
//方式三
//无结构名，仅可定义变量5，6，后面就没法用该结构体定义新的变量
struct {
    //variable_name
	//array_name
}variable5,variable6;
```

结构体变量成员获取和赋值

```c
struct{
	char *name;  //姓名
    int num;  //学号
} stu1;
//给结构体成员赋值
//逐一赋值
stu1.name = "Tom";
stu1.num = 12;
//整体赋值
struct{
	char *name;  //姓名
    int num;  //学号
} stu2={"Candy",20};
```

结构体数组

```c
struct{
	char *name;  //姓名
    int num;  //学号
} stu1[2]={
    {"Tom",270},
    {"Candy",20}
};
//数组中全部元素赋值时，也可不给出数组长度，
struct{
	char *name;  //姓名
    int num;  //学号
} stu2[]={
    {"Tom",270},
    {"Candy",20}
};
```

结构体指针

```c
struct struct_name * var;
```

```c
struct stu{
    char *name;  //姓名
    int num;  //学号
} stu1 = { "Tom", 12 }, *pstu = &stu1;

struct stu{
    char *name;  //姓名
    int num;  //学号
} stu1 = { "Tom", 12 };
struct stu  *pstu = &stu1;

*(pstu).name;
pstu->name;

```

#### 枚举

枚举定义

```c
//枚举值默认从 0 开始，往后逐个加 1（递增）；
enum typeName{ valueName1, valueName2, valueName3, ...... };
//可以给每个名字都指定一个值
enum week { Mon = 1, Tues = 2, Wed = 3, Thurs = 4, Fri = 5, Sat = 6, Sun = 7 }
```

声明变量

```c
enum typename var1;
enum typename {valueName1, valueName2, valueName3, ...... } var1,var2;
enum typename {valueName1, valueName2, valueName3, ...... } var1=valuName1,var2=valuName1;
```

> 宏在预处理阶段将名字替换成对应的值，枚举在编译阶段将名字替换成对应的值。
>
> 不占用数据区（常量区、全局数据区、栈区和堆区）的内存，而是直接被编译到命令里面，放到代码区，所以不能用`&`取得它们的地址。

#### 联合

定义

```c
union union_name{
  //成员列表  
};
```

> 结构体的各个成员会占用不同的内存，互相之间没有影响；而共用体的所有成员占用同一段内存，修改一个成员会影响其余所有成员

`结构体占用的内存大于等于所有成员占用的内存的总和（成员之间可能会存在缝隙），共用体占用的内存等于最长的成员占用的内存。`共用体使用了内存覆盖技术，同一时刻只能保存一个成员的值，如果对新的成员赋值，就会把原来成员的值覆盖掉。

声明变量

```c
//
union data{
    int n;
    char ch;
    double f;
}e,f;
//
union{
    int n;
    char ch;
    double f;
}g,h;
//
union data a, b, c;
```

#### 文件IO

`fgets()`：读取一行数据

```c
 char *fgets(char *s, int size, FILE *stream);
```

```c
#include<stdio.h>
#include<stdlib.h>

#define N 100

int main(int argc, const char *argv[]){
    FILE *fp = fopen("xxx","r|r+|w|w+|a|a+|bt|");
    if(fp==NULL){
        printf("fail to open file\n");
        exit(0);
    }
    
    while(fgets(str,N,fp)!=NUlLL){
        printf("%s\n",str);
    }
    
    fclose(fp);
    return 0;
}
```

> 文件打开方式：文本文件和二进制方式
>
> 以二进制读取写入文件数据时，无需多大变化；
>
> 以文本文件时，主要处理window系统`\r\n`换行符问题
>
> 总结：在window系统上，用`t`打开文本文件，用`b`打开二进制文件；在其它系统无所谓bt。

`fgetc//fputc`：一次读写一个字符

```c
int fgetc(FILE *stream);
//返回值：
//成功，返回读取到的字符；否则，读取到文件结尾或读取失败返回EOF（一般为-1）
int fputc(int c, FILE *stream);
```

```c
#include<stdio.h>

int main(){
    FILE * fp = fopen("xxx","rt");
    
    if(fp==NULL){
        printf("fail to open file\n");
        exit(0);
    }
    char ch;
    while((ch=fgetc(fp))!=EOF){
        putchar(ch);
    }
    putchar("\n");
    
    fclose(fp);
    return 0;
}
```

