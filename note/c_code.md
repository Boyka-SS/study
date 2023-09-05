#### 数组倒置

```c
int array[5] = {66, 88, 33, 44, 22};
int length = sizeof(array) / sizeof(array[0]);
reverseArray(array, length);

void reverseArray(int *arr, int size) {
  int *tmpP = arr;
  int tmp = 0;
  for (int i = 0; i < size / 2; i++) {
    tmp = *(tmpP + i);
    *(tmpP + i) = *(tmpP + size - 1 - i);
    *(tmpP + size - 1 - i) = tmp;
  }
  // for (int i = 0; i < size / 2; i++) {
  //   tmp = tmpP[i];
  //   tmpP[i] = tmpP[size - 1 - i]; 
  //   tmpP[size - 1 - i] = tmp;
  // }
}
```

#### 简单选择排序

```c
/**
 *
 * 简单选择排序
 *
 * 1. 从头到尾顺序扫描序列，找出最小的元素与第一位进行交换（扫描数组，找到最小的元素替换到第一位）
 * 2. 一次排序完成后肯定能找到最小的元素
 * 3. 从剩下的无序队列中选出最小关键字与第一位进行交换
 */
void simpleSelectSort(int *const arr, int length)
{
	int *tmpArr = arr;
	int tmp = 0;
	for (int i = 0; i < length-1; i++)
	{
		for (int j = i + 1; j < length; j++)
		{
			if (*(tmpArr + j) > *(tmpArr +i))
			{
				tmp = *(tmpArr + j);
				*(tmpArr + j) = *(tmpArr +i);
				*(tmpArr + i) = tmp;
			}
		}
	}
}

```

#### 阶乘——递归

```c
int getFactorial(int n){
	int result;
	if(n==1){
	    result = 1;
	}else{
	    result = getFac(n-1) * n;
	}
	return result;
}
```

#### 二分查找

```c
int binarySearch(List tb1,ElementType K){
    int left,right,mid,noFound=-1;
	//初始化左右边界
    left=1;
    right=tb1->Length;
    while(left<=right){
        //计算中间元素坐标
        mid=(left+right)/2;
        if(K<tb1->Element[mid]){
            //调整右边界
            right=mid-1;
        }else if(K>tb1->Element[mid]){
			//调整左边界
            left=mid+1;
        }else {
            //查找成功，返回数据元素的的下班
            return mid;
        }
    }
}
```

#### 快排

```c
 void qsort(void *base, size_t nmemb, size_t size,int (*compar)(const void *, const void *));

/*
base:待排序的数组
nmeme:待排序的数组元素数量
size:数组元素字节大小
compar:指定排序
*/

int arr[]={2,36,12,98,10}
qsort(arr,5,sizeof(arr[0]),cmp)
int cmp(const void *a,const void * b){
    return *(int*)a-*(int*)b;//小大
//    return *(int *)b-*(int*)a; //大小
}
```

#### 时钟打点

```c
#include<stdio.h>
#include<time.h>

clock_t start,stop;
//clock_t 是clock()函数返回的变量类型
double duration;
//记录被测函数运行时间，以秒为单位
int main(){
    /* 不在测试范围内的准备工作写在clock()调用之前*/
    start=clock();/*开始计时*/
    //TODO
    stop=clock();
    /* 其他不在测试范围的处理写在后面，例如输出duration的值*/
    duration=((double)(stop-start))/CLK_TCK;

    return 0;
}
```

> `clock()`
>
> 捕捉`从程序开始运行到clock()被调用时所耗费的时间`。时间单位：clock tick（时钟打点）
>
> 常数 `CLK_TCK`：机器时钟每秒所走的时钟打点数
>
> 存在全为 0 的情况：运行时间不超过一个 tick

#### 打印 main 函数参数

```c
#include<stdio.h>
int main(int argc, char **argv) {
    for (int i = 0; i < argc; i++) {
    	printf("%s\n", *(argv + i));
	}
	printf("%d\n", argc);
    return 0;
}
```

#### 冒泡排序

```c
/**
 * 冒泡排序
 *
 * 对存放原始数据的数组，按从前往后的方向多次扫描，每次扫描称为 一轮
 *
 * 当发现相邻的两个数据的次序与排序要求的大小次序不符合时，进行数据交换
 *
 *
 * 特点：升序排序中每一轮比较会把最大的数沉到最底，所以相互比较的次数每一轮都会比前一轮少一次
 *
 * 对N个数排序，则需要N-1轮比较
 *
*/
void bubbleSort(int * const arr,int length){
	int *tmpArr = arr;
	int tmp=0;
	for(int i=0;i<length -1;i++){
		for(int j=0;j<length-1-i;j++){
			if(*(tmpArr+j)>*(tmpArr+j+1)){
				tmp = *(tmpArr+j);
				*(tmpArr+j)=*(tmpArr+j+1);
				*(tmpArr+j+1)=tmp;
			}
		}
	}
	for(int i=0;i<length;i++){
		printf("%d ",*(tmpArr+i));
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

> 如果当前的宏已被定义过，则对“程序段 1”进行编译，否则对“程序段 2”进行编译。

```c
#ifndef 宏名
    程序段1
#else
    程序段2
#endif
```

> 如果当前的宏未被定义，则对“程序段 1”进行编译，否则对“程序段 2”进行编译

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

#### 文件 IO

##### `fopen`打开流

```c
#include<stdio.h>
int main(int argc,char **args){
    FILE *fp=NULL;
    if((fp=fopen(pathname,mode))==NULL){
        perror("open failed");
        printf("fopen:%s\n",strerror(errno));
        return -1;
    }
    ...
    return 0;
}
```

```c
FILE* fopen(const char * path,const char *mode)
```

- <u>_成功时返回流指针，出错时返回 NULL_</u>

【mode 取值】：
![输入图片说明](https://foruda.gitee.com/images/1677570951588663906/967d276c_8027319.png "Snipaste_2023-02-28_15-02-58.png")

##### 处理错误信息

```c
extern int errno;
void perror(const char *s);
char * strerror(int errno);
```

`errno` 存放错误号

`perror` 先输出 s，再输出错误号对应的错误信息

`strerror` 根据错误号返回对应的错误信息

##### fclose 关闭流

```c
#include<stdio.h>
int main(int argc,char **args){
    FILE *fp=NULL;
    if((fp=fopen(pathname,mode))==NULL){
        perror("open failed");
        printf("fopen:%s\n",strerror(errno));
        return -1;
    }
    ...
    fclose(fp);
    return 0;
}
```

```c
int fclose(FILE *stream);
```

- <u>_调用成功返回 0，失败返回 EOF，并设置 errno_</u>
- <u>_流关闭时自动刷新缓冲区中的数据并释放缓冲区_</u>
- <u>_当一个程序正常终止时，所有打开的流都会被关闭_</u>
- <u>_流一旦关闭后就不能执行任何操作_</u>

##### `fgets//fputs`

读写一行数据，用来从指定的文件中读取一个字符串，并保存到字符数组中

```c

//从stream中读取size个字符到数组str里面
char *fgets(char *str, int size, FILE *stream);
//读取成功时返回字符数组首地址，也即 str；读取失败时返回 NULL；
//如果开始读取时文件内部指针已经指向了文件末尾，那么将读取不到任何字符，也返回 NULL。
//读取到的字符串会在末尾自动添加 '\0'，实际读取到的字符数为size-1
//在size-1个字符之前遇到换行或者文件结尾，则读取结束(n大，可以读取一行)

//用来向指定的文件（fp）写入一个字符串(str)
int fputs( char *str, FILE *fp );
//写入成功返回非负数，失败返回 EOF。
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

    char *str="fanlihao";
    fputs(str,fp);

    fclose(fp);
    return 0;
}
```

> 文件打开方式：文本文件和二进制方式
>
> 以二进制读取写入文件数据时，无需多大变化；
>
> 以文本文件时，主要处理 window 系统`\r\n`换行符问题
>
> 总结：在 window 系统上，用`t`打开文本文件，用`b`打开二进制文件；在其它系统无所谓 bt。

##### `fgetc//fputc`：一次读写一个字符

```c
int fgetc(FILE *stream);
//成功，返回读取到的字符；否则，读取到文件结尾或读取失败返回EOF（一般为-1）
int fputc(int c, FILE *stream);
//成功时返回写入的字符，失败时返回 EOF
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

```c
#include<stdio.h>

int main(){
    FILE * fp = fopen("xxx","w+");

    if(fp==NULL){
        printf("fail to open file\n");
        exit(0);
    }
    char ch
    while((ch=getchar())!='\n'){
           fputc(ch,fp);
    }
    putchar("\n");

    fclose(fp);
    return 0;
}
```

> `EOF`：本意文件末尾表示读取结束。但存在出错情况也返回 EOF。如果判断是出错还是读取结束？
>
> `feof`用来判断文件内部指针是否指向了文件末尾
>
> ```c
> int feof(FILE *fp);
> //指向文件末尾时返回非零值，否则返回零值。
> ```
>
> `ferror`用来判断文件操作是否出错
>
> ```c
> int ferror(FILE *p);
> //出错时返回非零值，否则返回零值。
> ```

##### `fread//fwite`

##### 读取多行内容

```c

//用来从指定文件中读取块数据
size_t fread ( void *ptr, size_t size, size_t count, FILE *fp );

//用来向文件中写入块数据
size_t fwrite ( void * ptr, size_t size, size_t count, FILE *fp );

```

【参数】

- `ptr`：fread() 中的 ptr 用来存放读取到的数据，fwrite() 中的 ptr 用来存放要写入的数据。
- `size`：表示每个数据块的字节数
- `count`：表示要读写的数据块的块数。
- `fp`：表示文件指针

【返回值】

- 返回成功读写的块数，也即 count。如果返回值小于 count：
  - 对于 fwrite() 来说，肯定发生了写入错误，可以用 ferror() 函数检测。
  - 对于 fread() 来说，可能读到了文件末尾，可能发生了错误，可以用 ferror() 或 feof() 检测。

```c
#include <stdio.h>
#include <stdlib.h>

#define N 5

int main(int argc, const char *argv[]) {
    int   a[ N ], b[ N ];
    int   i = 0, size = sizeof(int);
    FILE *fp = fopen("./demo", "r+");

    if (fp == NULL) {
        printf("fail to open file\n");
        exit(0);
    }

    for (i = 0; i < N; i++) {
        scanf("%d", &a[ i ]);
    }

    fwrite(a, size, N, fp);

    rewind(fp);
    fread(b, size, N, fp);

    for (i = 0; i < N; i++) {
        printf("%d ", b[ i ]);
    }
    printf("\n");

    return 0;
}
```

##### `fscanf//fprintf`

```c
int fscanf ( FILE *fp, char * format, ... );
int fprintf ( FILE *fp, char * format, ... );
```

```c
#include <stdio.h>
#include <stdlib.h>

#define N 2

typedef struct {
    char  name[ 100 ];
    int   num;
    int   age;
    float score;
} Stu;

Stu boya[ N ], boyb[ N ], *pa, *pb;

int main(int argc, const char *argv[]) {

    FILE *p = fopen("./demo", "wt+");
    if (p == NULL) {
        printf("fail to open file\n");
        exit(0);
    }
    int i;
    pa = boya;
    pb = boyb;
    printf("Input String:\n");
    for (i = 0; i < N; i++, pa++) {
        scanf("%s %d %d %f", pa->name, &pa->num, &pa->age, &pa->score);
    }
    pa = boya;
    for (i = 0; i < N; i++, pa++) {
        fprintf(p, "%s\t%d\t%d\t%.1f\n", pa->name, pa->num, pa->age, pa->score);
    }
    pa = boya;

    rewind(p);
    for (i = 0; i < N; i++,pb++) {
        fscanf(p, "%s %d %d %f\n", pb->name, &pb->num, &pb->age, &pb->score);
    }
    pb = boyb;
    //将boyb中的数据输出到显示器
    for (i = 0; i < N; i++, pb++) {
        printf("%s\t%d\t%d\t%.1f\n", pb->name, pb->num, pb->age, pb->score);
    }
    fclose(p);

    return 0;
}
```

##### `rewind//fseek`

前面介绍的文件读写函数都是顺序读写，即读写文件只能从头开始，依次读写各个数据

随机读写：`从文件的任意位置开始读写`

实现随机读写的关键是要按要求移动位置指针，这称为`文件的定位`

```c
//将位置指针移动到文件开头
void rewind ( FILE *fp );
//将位置指针移动到任意位置
int fseek ( FILE *fp, long offset, int origin );
```

【参数】

- `fp` ：被移动的文件

- `offset` ：偏移量，要移动的字节数

- `origin`：起始位置，也就是从何处开始计算偏移量

  | 起始点   | 常量名   | 常量值 |
  | -------- | -------- | ------ |
  | 文件开头 | SEEK_SET | 0      |
  | 当前位置 | SEEK_CUR | 1      |
  | 文件末尾 | SEEK_END | 2      |

> fseek() 一般用于二进制文件，在文本文件中由于要进行转换，计算的位置有时会出错。

```c
#include <stdio.h>
#include <stdlib.h>

#define N 3

struct Stu {
  char name[10];
  int num;
  int age;
  float score;
} boys[N], boy, *pboy;

int main(int argc, const char *argv[]) {
  FILE *fp = fopen("./demo.txt", "wb+");

  if (fp == NULL) {
    printf("fail to open file,press any key to exit!\n");
    exit(0);
  }

  printf("Input data!\n");
  int i;
  pboy = boys;

  for (i = 0; i < N; i++, pboy++) {
    scanf("%s %d %d %f\n", pboy->name, &pboy->num, &pboy->age, &pboy->score);
  }
  pboy = boys;

  fwrite(boys, sizeof(struct Stu), N, fp);
  fseek(fp, sizeof(struct Stu), SEEK_SET);
  fread(&boy, sizeof(struct Stu), 1, fp);
  printf("%s %d %d %f\n", boy.name, boy.num, boy.age, boy.score);

  fclose(fp);

  return 0;
}

```

#### 【案例】文件复制

```c
#include <stdio.h>
#include <stdlib.h>

#define BUFFSIZE 4096

int copy();
int main(int argc, const char** argv) {
  // 进行复制操作
  if (copy()) {
    printf("恭喜你，文件复制成功！\n");
  } else {
    printf("文件复制失败！\n");
  }

  return 0;
}
int copy() {
  FILE* fp_read = fopen("/home/fanlihao/projects/expertment/c/demo.txt", "rb");
  FILE* fp_write = fopen("/home/fanlihao/projects/expertment/demo.txt", "wb+");

  if (fp_read == NULL || fp_write == NULL) {
    printf("Fail to open file\n");
    return 0;
  }
  char buffer[BUFFSIZE];
  int readCount = 0;
  while ((readCount = fread(buffer, 1, BUFFSIZE, fp_read)) > 0) {
    fwrite(buffer, 1, BUFFSIZE, fp_write);
  }

  fclose(fp_read);
  fclose(fp_write);
  return 1;
}
```

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
  char ch;
  char* source = "/home/fanlihao/projects/expertment/c/demo.txt";
  char* destination = "/home/fanlihao/projects/expertment/demo.txt";
  FILE* fp_source = fopen(source, "rb");
  FILE* fp_destination = fopen(destination, "wb+");

  if (fp_source == NULL || fp_destination == NULL) {
    printf("fail to open file\n");
    exit(0);
  }

  while ((ch = fgetc(fp_source)) != EOF) {
    fputc(ch, fp_destination);
  }

  fclose(fp_destination);
  fclose(fp_source);
  return 0;
}
```

> 【问题】
>
> 使用 fread/fwrite 会存在最后一个缓存数组写不满的情况，空数组元素自动赋值 NULL，这些 NULL 也会被写进文件。使用 fgetc/fputc 就没这种事情。

#### 【案例】获取文件大小——`ftell`

```c
//用来获取文件内部指针（位置指针）距离文件开头的字节数
long int ftell ( FILE * fp );
```

【注意】用来获取文件内部指针（位置指针）距离文件开头的字节数

```c
//先使用 fseek() 将文件内部指针定位到文件末尾，
//再使用 ftell() 返回内部指针距离文件开头的字节数，
//这个返回值就等于文件的大小。
long fsize(FILE *fp){
    fseek(fp, 0, SEEK_END);
    return ftell(fp);
}
//上面函数移动了文件内部指针，可能会导致接下来的文件操作错误

long fsize(FILE *fp){
    long n;
    fpos_t fpos;  //当前位置
    fgetpos(fp, &fpos);  //获取当前位置
    fseek(fp, 0, SEEK_END);
    n = ftell(fp);
    fsetpos(fp,&fpos);  //恢复之前的位置
    return n;
}
//fpos_t 是在 stdio.h 中定义的结构体，用来保存文件的内部指针。
//fgetpos() 用来获取文件内部指针，fsetpos() 用来设置文件内部指针。
```

> ```c
> typedef struct _iobuf {
>     int cnt;  // 剩余的字符，如果是输入缓冲区，那么就表示缓冲区中还有多少个字符未被读取
>     char *ptr;  // 下一个要被读取的字符的地址
>     char *base;  // 缓冲区基地址
>     int flag;  // 读写状态标志位
>     int fd;  // 文件描述符
>     // 其他成员
> } FILE;
> ```
>
> `缓冲区的刷新就是将指针 ptr 变为缓冲区的基地址 ，同时 cnt 的值变为0 ，因为缓冲区刷新后里面是没有数据的！`

#### 内存管理

#### 进程

##### fork 创建子进程

```c
#include<sys/types.h>
#include<unistd.h>

pid_t fork(void);
```

调用失败返回-1
