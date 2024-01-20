#### 队列

```c
//queue.h
#ifndef QUEUE_H_INCLUDED
#define QUEUE_H_INCLUDED

#define QUEUE_TYPE int

void create_queue(size_t size);

void destory_queue(void);

void insert_queue(QUEUE_TYPE value);

void delete_queue(void);

QUEUE_TYPE first(void);

int is_empty(void);

int is_full(void);

#endif // QUEUE_H_INCLUDED

//queue.c
#include "queue.h"
#include <stdlib.h>
#include <stdio.h>
#include <malloc.h>
#include <assert.h>


#define QUEUE_SIZE 100;
#define ARRAY_SIZE (QUEUE_SIZE+1);


static QUEUE_TYPE queueList[QUEUE_SIZE];
static size_t front = 1;
static size_t rear = 0;


void insert_queue(QUEUE_TYPE value)
{
    assert(!is_full());
    rear = (rear + 1) % ARRAY_SIZE;
    queueList[rear] = value;
}


void delete_queue(void)
{
    assert(!is_empty());
    front = (front + 1) % ARRAY_SIZE;
}

QUEUE_TYPE first(void)
{
    assert(!is_empty());
    return queueList[front];
}

int is_empty(void)
{
    return (rear + 1) % ARRAY_SIZE == front;
}

int is_full(void)
{
    return (rear + 2) % ARRAY_SIZE == front;
}

```

#### 堆栈

堆栈是一种**LIFO**结构

> 所有的 ADT 都必须首先考虑，采用哪种方式进行内存占去
> 已有方式：
>
> 1. 静态数组
> 2. 动态数组
> 3. 链表

常用操作：

1. push:将新值压入栈中
2. pop：删除栈顶元素
3. top：返回栈顶元素
4. is_empty：判断堆栈是否已空
5. is_full：判断堆栈是否已满

```c
//stack.h
#ifndef STACK_H_INCLUDED
#define STACK_H_INCLUDED

#define TRUE 1
#define FALSE 0

#define STACK_TYPE int

void push(STACK_TYPE value);

void pop(void);

STACK_TYPE top(void);

int is_empty(void);

int is_full(void);

#endif // STACK_H_INCLUDED


// 静态数组方式实现
#include "stack.h"
#include <assert.h>

#define STACK_SIZE 100

// 静态数组实现堆栈
static STACK_TYPE stackList[STACK_SIZE];
// 指向顶部元素的指针
static int top_element = -1;

void push(STACK_TYPE value)
{
    assert(!is_full());
    top_element += 1;
    stackList[top_element] = value;
}

void pop(void)
{
    assert(!is_empty());
    top_element -= 1;
}

int is_empty()
{
    return top_element == -1;
}

int is_full(void)
{
    return top_element == STACK_SIZE - 1;
}


// 动态数组
#include "stack.h"
#include <stdlib.h>
#include <stdio.h>
#include <malloc.h>
#include <assert.h>

#define STACK_SIZE 100

// 静态数组实现堆栈
static STACK_TYPE *stackList;
static size_t stack_size;
// 指向顶部元素的指针
static int top_element = -1;


void create_stack(size_t size)
{
    assert(stack_size == 0);
    stack_size = size;
    stack = malloc(sizeof(STACK_TYPE) * stack_size);
    assert(stack != NULL);
}

void destory_stack(void)
{
    assert(stack_size > 0);
    stack_size = 0;
    free(stack);
stack = NULL:
}


void push(STACK_TYPE value)
{
    assert(!is_full());
    top_element += 1;
    stackList[top_element] = value;
}

void pop(void)
{
    assert(!is_empty());
    top_element -= 1;
}

int is_empty()
{
    return top_element == -1;
}

int is_full(void)
{
    return top_element == STACK_SIZE - 1;
}


```

#### 查找

```c
#include<stdlib.h>
void* bsearch(void const * key,void const * base,size_t n_elements,size_t el_size,int (*compare)(void const *item1,void const *item2));
```

**bsearch 用二分法查找一个元素，前提数组必须排好序**

**【参数解释】**

- key:需要查找的值
- base:需要排序的数组
- elements:数组中元素数目
- el_size:指定每个元素的长度，以字符为单位
- compare:与 qsort 报纸一致

**【函数返回值解释】**
找到，返回一个指向目标值的指针，否则返回 NULL;

```c
#include<stdio.h>
#include<stdlib.h>
#include<assert.h>
#include<string.h>

int int_compare(void const  * item1, void const  * item2){
    return *(int *)item1-*(int *)item2;
}

int main(int argc, char * argv[]){
    int array[] = {12, 3, 45, 34, 100};
    qsort(array,sizeof(array)/sizeof(int),sizeof(int),int_compare);

    int a = 12;
    int * b  =(int *)bsearch(&a,array,sizeof(array)/sizeof(int),sizeof(int),int_compare);

    printf("%d\n",*(b-1));//3
    printf("%d\n",*(b));//12
    printf("%d\n",*(b+1));//34
    return 0;
}

```

#### 排序

```c
#include<stdlib.h>
void qsort(void *base,size_t n_elements,size_t el_size,int (*compare)(void const *item1,void const *item2));
```

**qsort 可以排序任意类型的数据，但是数组中的元素长度是固定的**

**【参数解释】**

- base:需要排序的数组
- elements:数组中元素数目
- el_size:指定每个元素的长度，以字符为单位
- compare:函数指针，对需要排序的元素类型进行比较

**【compare 函数返回值解释】**

1. \>0:item1 > item2;
2. =0:item1 = item2;
3. <0:item1 \< item2;

```c
#include<stdio.h>
#include<stdlib.h>
#include<assert.h>
#include<string.h>

int int_compare(void const  * item1, void const  * item2)
{
    return *(int *)item1-*(int *)item2;
}
int char_compare(void const  * item1, void const  * item2)
{
    return  strcmp((char *)item1,(char *)item2);
}
int main(int argc, char * argv[])
{
    int array[] = {12, 3, 45, 34, 100};
    qsort(array,sizeof(array)/sizeof(int),sizeof(int),int_compare);
    for(int i=0;i<sizeof(array)/sizeof(int);i++){
            printf("array[%d] = %d\n",i,array[i]);
    }
    return 0;
}
```

#### KMP 字符串匹配算法

```c

#include <string.h>
#include <stdio.h>
#include <stdlib.h>



// 字符串截取函数
// start    截取起点
// length   截取长度（包括起点）
char* substr(char *origin, int start, int length)
{
    int len = strlen(origin);
    char *str;
    char *temp;
    if(start < 0 || start >= len || start + length == 0) {
        return NULL;
    }
    if(start + length >= len) {
        str = (char*)malloc(len);
        temp = str;
        for(int i = start; i < len; i++) {
            * (temp++) = *(origin + i);
        }
    } else {
        str = (char*)malloc(length);
        temp = str;
        for(int i = start; i < start + length; i++) {
            *(temp++) = *(origin + i);
        }

    }
    *(temp) = '\0';
    return str;
}

// 获取子串subString 最大相等前后缀的长度 构建前缀表
// 前缀表可以指示模式串下次匹配的起点
int getSubStrMaxLength(char * subString, int subStringLength)
{
    char * prefix = NULL;
    char *  suffix = NULL;

    for(int m = 0; m < subStringLength - 1; m++) {
        // 前缀 从最长到最短
        prefix = substr(subString, 0, subStringLength - 1 - m);
        // 后缀  从最长到最短
        suffix = substr(subString, m + 1, subStringLength);

        if(strcmp(prefix, suffix) == 0) {
            return strlen(suffix);
        }
    }
    return 0;
}
/*


字符串匹配算法——KMP算法

文本串+模式串

算法由两部分组成

1、计算ptr每一位及之前的字符串中，前缀和后缀公共部分的最大长度的next数组
2、匹配ptr和str，当ptr失配时，利用next数组，实现ptr的最大后移，从而避免不必要的匹配，减少匹配次数

*/

int kmpSearch(char *str, char *ptr)
{
    int strIndex = 0;
    int patternIndex  = 0;
    // 模式串的长度
    int plen = strlen(ptr);
    // next数组
    int arr[plen];

    // 1. 构建 模式字符串的 所有子串的前后缀最大相等的长度数组，指明不匹配时候模式字符串检索起始位置
    // 子串
    char *subString = NULL;
    // 子串长度
    int subStringLength = 0;

    for(int k = 0; k < plen  ; k++) {
        // 所有子串
        subString = substr(ptr, 0, k + 1 );
        if(subString == NULL  ) {
            continue;
        }
        subStringLength = strlen(subString);
        // printf("%s %d\n",  subString, subStringLength);
        // 所有模式串第一个子串都是0
        // 子串中最大相等的前后缀的长度
        arr[k] = getSubStrMaxLength(subString, subStringLength);
    }


    // 2. 匹配ptr和str
    int i = 0;

    // 从文本串第一个匹配字符开始
    char *tmp = strchr(str, *(ptr + patternIndex));
    if(tmp != NULL) {
        i = tmp - str ;
    } else {
        return -1;
    }

    while(*(str + i) != '\0') {

        if(*(str + i) == *(ptr + patternIndex)) {
            // 相等
            ++patternIndex;
            if(patternIndex==plen){
                return i-plen+1;
            }
        } else {
            // 不相等，从前缀表中选择模式串匹配起点
            patternIndex = arr[patternIndex - 1];
            // 如果模式串指针为0，表示模式串需要从头开始匹配，并且文本串当前字符在模式串中无法匹配，需匹配下一个
            if(patternIndex == 0) {
                i++;
            }
            continue;
        }
        i++;
    }
    return 0;
}

int main ()
{
    int ret = kmpSearch("bbc abcdab abcdabcdabde", "abcdabd");
    if(ret < 0) {
        printf("don't match\n");
    } else {
        printf("matched position :%d\n", ret);
    }
    return(0);
}

```

#### socket 编程

```c
//server.c


//client.c

```

#### 截取字符串

```c
// 字符串截取函数
// start    截取起点
// length   截取长度（包括起点）
char* substr(char *origin, int start, int length)
{
    int len = strlen(origin);
    char *str;
    char *temp;
    if(start < 0 || start >= len) {
        return NULL;
    }
    if(start + length >= len) {
        str = (char*)malloc(len);
        temp = str;
        for(int i = start; i < len; i++) {
            * (temp++) = *(origin + i);
        }
    } else {
        str = (char*)malloc(length);
        temp = str;
        for(int i = start; i < start + length; i++) {
            *(temp++) = *(origin + i);
        }
    }
    *(temp) = '\0';
    return str;
}
```

#### 逆序字符串

```c
char* reverseStr(char* str)
{
    int len = strlen(str);
    char *strcopy =(char*)malloc(sizeof(char)*len+1);
    char *start = strcopy;

    int i = len-1;
    for(;i>=0;i--){
        *(start++) = *(str+i);
    }
    free(start);
    return strcopy;
}
```

#### UART

```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <stdint.h>
#include <stdarg.h>
#include <string.h>
#include <termios.h>
#include <unistd.h>
#include <fcntl.h>
#include <sys/ioctl.h>
#include <sys/types.h>
#include <sys/stat.h>

int mySerialOpen (const char *device, const int baud)
{
  struct termios options ;
  speed_t myBaud ;
  int     status, fd ;

  switch (baud)
  {
    case    9600:	myBaud =    B9600 ; break ;
    case  115200:	myBaud =  B115200 ; break ;
  }

  if ((fd = open (device, O_RDWR | O_NOCTTY | O_NDELAY | O_NONBLOCK)) == -1)
    return -1 ;

  fcntl (fd, F_SETFL, O_RDWR) ;

  // Get and modify current options:

  tcgetattr (fd, &options) ;

  cfmakeraw   (&options) ;
  cfsetispeed (&options, myBaud) ;
  cfsetospeed (&options, myBaud) ;

  options.c_cflag |= (CLOCAL | CREAD) ;
  options.c_cflag &= ~PARENB ;
  options.c_cflag &= ~CSTOPB ;
  options.c_cflag &= ~CSIZE ;
  options.c_cflag |= CS8 ;
  options.c_lflag &= ~(ICANON | ECHO | ECHOE | ISIG) ;
  options.c_oflag &= ~OPOST ;

  options.c_cc [VMIN]  =   0 ;
  options.c_cc [VTIME] = 100 ;	// Ten seconds (100 deciseconds)

  tcsetattr (fd, TCSANOW, &options) ;
  ioctl (fd, TIOCMGET, &status);
  status |= TIOCM_DTR ;
  status |= TIOCM_RTS ;
  ioctl (fd, TIOCMSET, &status);
  usleep (10000) ;	// 10mS
  return fd ;
}

void sendString (const int fd, const char *s)
{
	int ret;
	ret = write (fd, s, strlen (s));
	if (ret < 0)
		printf("Serial Puts Error\n");
}

int getString (const int fd,char * buffer)
{
  int n_read = read(fd,buffer,32);
  return  n_read;
}
```

#### 守护进程

```c
#include <unistd.h>
#include <signal.h>
#include <stdlib.h>
#include <string.h>
#include <fcntl.h>
#include <sys/stat.h>
#include <time.h>
#include <stdio.h>
#include <stdbool.h>

static bool flag = true;

void handler(int signum){
	printf("SIGQUIT = %d\n",signum);
	flag = false;
}

int main(){
    time_t t;
	int fd;
	// 创建守护进程
	if(daemon(0,0)==-1){
		printf("daemon error\n");
		exit(-1);
	}
	// 守护进程 设置信号处理函数
	struct sigaction act;
	act.sa_handler = handler;
	sigemptyset(&act.sa_mask);
	act.sa_flags=0;
	if(sigaction(SIGQUIT,&act,NULL)){
		printf("sigaction error\n");
		exit(0);
	}
	// 守护进程工作内容
	while(flag){
		fd = open("/home/orangepi/workspace/c/daemon.log",O_WRONLY|O_CREAT|O_APPEND,0644);
		if(fd==-1){
			printf("open or create log file unsuccessfully\n");
		}
		t = time(NULL);
		char* str=asctime(localtime(&t));
		write(fd,str,strlen(str));
		close(fd);
		sleep(10);
	}
	return 0;
}

```

#### 获取时间

**api**

```c
// 获取自纪元以来的秒数，并存储与arg
time_t time(time_t * atg);
// 将参数timer转化为UTC时间
struct tm *gmtime(const time_t *timer);
// 将参数timer转化为以本地时间表示的日历时间
struct tm *localtime(const time_t *timer);
```

**案例**

```c
#include<stdio.h>
#include<time.h>

int main(){

    time_t t;
    t = time(NULL);
    // 本时区日历
    printf("time:%s\n",asctime(localtime(&t)));
    // UTC
    printf("time:%s\n",asctime(gmtime(&t)));
    return 0;
}
```
