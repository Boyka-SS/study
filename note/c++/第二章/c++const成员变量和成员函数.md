const 可以用来修饰成员变量和成员函数。

### const 成员变量

在声明时加上 const 关键字。初始化 const 成员变量只有一种方法，就是通过**构造函数的初始化列表**

### const 成员函数（常成员函数）

`可以使用类中的所有成员变量，但是不能修改它们的值，`

常成员函数需要在声明和定义的时候在`函数头部的结尾`加上 const 关键字

常常将 Getter 函数设置为常成员函数

```c++

class Student{
public:
    char *getname() const;
    int getage() const;
    float getscore() const;
private:
    char *m_name;
    int m_age;
    float m_score;
};
char * Student::getname() const{
    return this->m_name;
}
int Student::getage() const{
    return this->m_age;
}
float Student::getscore() const{
    return  this->m_score;
}
```

**必须在成员函数的声明和定义处同时加上 const 关键字。**
