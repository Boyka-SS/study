#### socket 编程

```c
//server.c


//client.c

```

#### 截取字符串

```c

// 字符串截取函数
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
