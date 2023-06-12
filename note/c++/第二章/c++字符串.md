### string 类型变量定义

```c++

#include<string>

string s1;
string s2="c plus plus";
string s3=s2;
string s4(5,'s');//"sssss"
```

获取字符串长度:`s2.length()`

### 转为 c 风格的字符串

```c++

string s1="hello linux";
s1.c_str();

```

### 字符串输入和输出

```c++

cin>>str;
cout<<str<<endl;

```

### 访问字符串中的字符

```c++

string s1="hello linux";
s1[0];//'h'

```

### 字符串拼接

```c++

string s1="hello";
string s2="world";

string str=s1+s2;//"helloworld"
s1+=s2;//"helloworld"
```

### string 增删改查

#### 插入

`string& insert(size_t pos,const string &str)`
pos 表示要插入的位置，也就是下标；str 表示要插入的字符串，它可以是 string 字符串，也可以是 C 风格的字符串。

#### 删除

`string& erase (size_t pos = 0, size_t len = npos);`
删除 string 中的一个子字符串

pos 表示要删除的子字符串的起始下标，len 表示要删除子字符串的长度。

如果不指明 len 的话，那么直接删除从 pos 到字符串结束处的所有字符（此时 len = str.length - pos）。

#### 提取

`string substr (size_t pos = 0, size_t len = npos) const;`

pos 为要提取的子字符串的起始下标，len 为要提取的子字符串的长度。

系统对 substr() 参数的处理和 erase() 类似：

-   如果 pos 越界，会抛出异常；
-   如果 len 越界，会提取从 pos 到字符串结尾处的所有字符。

#### 查找

1. find
   在 string 字符串中查找子字符串出现的位置
2. rfind
   是在字符串中查找子字符串，不同的是 find() 函数从第二个参数开始往后查找，而 rfind() 函数则最多查找到第二个参数处，如果到了第二个参数所指定的下标还没有找到子字符串，则返回 string::npos。
3. find_first_of
   用于查找子字符串和字符串共同具有的字符在字符串中首次出现的位置
