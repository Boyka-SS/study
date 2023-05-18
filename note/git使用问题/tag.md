1.查看所有标签
`git tag -ln`

2.创建标签
`git tag <tag_name>`
> 默认标签是打在最新提交的commit上的，提交记录是按照分支进行分组的（不同的分支上存在不同的提交记录）

3.为特定的commitID打标签
`git tag <tag_name> <commit_id>`

4.创建带有说明的标签，用-a指定标签名，-m指定说明文字
`git tag -a v0.1 -m "version 0.1 released" 1094adb`

5.删除标签名
`git tag -d <tag_name>`

6.推送标签到远端
`git push origin <tag_name>`

> 一次性推送全部尚未推送到远程的本地标签
> `git push origin --tags`

7.删除远端标签

- 第一步，删除本地标签
   `git tag -d <tag_name>`
- 第二步，推送远端
    `git push origin :refs/tags/<tag_name>`

8.克隆指定的tag
`git clone --branch [tag_name] [git地址]`

9.已有仓库切换 tag
`git checkout <tag_name>`

> 注意这时候git会提示你目前处于detached HEAD的状态，因为tag相当于一个快照，不能修改他的代码，如果想要在这个tag的代码基础上进行开发，则根据tag创建一个新的分支
> `git checkout -b [branch_name] [tag_name]`