# Git如何在不提交当前分支的情况下切换到其它分支进行操作

- 储存当前分支的修改

```
git stash
1
```

- 查看储存的修改信心

```
git stash list
1
```

- 恢复stash的修改
- 方法一：

```
git stash apply
//但是恢复后，stash内容并不删除，
这时候再执行git stash list 命令，id 为xxx的储藏项目还会在列表中，你需要用git stash drop 来删除；
123
```

注意： 如果有一个分支上多个 stash，如果需要恢复指定的 stash ，可以在命令尾部加id，如git stash apply stash@{0}，同样删除指定 stash 项目则执行如 git stash drop stash@{1} 。

方法二：

```
git stash pop命令，恢复的同时把 stash 存储列表的内容也删了。这时候再执行git stash list 命令，id 为xxx 的储藏项目不会在列表中。
```

