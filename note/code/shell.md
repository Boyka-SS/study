```shell
ps -elf | grep a.out | grep -v grep
```

**linux 开机自动执行命令和脚本 自动启动**

```shell
/etc/rc.local(/etc/rc.d/rc.local)
```

https://www.jianshu.com/p/0cd6727aa082

**linux 后台运行程序,查看和关闭后台运行程序**

运行

```shell

1. xxx &
```

查看

```shell

1. jobs
2. ps -axu | grep xxx
```

关闭

```shell

1. kill pid
2. kill &jobsnum
```

切换

```shell
1. fg %jobnum
2. bg %jobnum
3. ctrl+z
```

https://blog.csdn.net/u013846293/article/details/74003051
