### 成员访问限定符

C++通过 `public、protected、private` 三个关键字来`控制成员变量和成员函数的访问权限`，它们分别表示公有的、受保护的、私有的

> C++ 中的 public、private、protected 只能修饰类的成员，不能修饰类，C++中的类没有共有私有之分。

在类的内部，没有访问权限的控制，无论成员被声明为 public、protected 还是 private。

在类的外部，`只能通过对象访问成员，并且通过对象只能访问 public 属性的成员，不能访问 private、protected 属性的成员。`

```c++
#include <iostream>
using namespace std;
//类的声明
class Student{
private:  //私有的
    char *m_name;
    int m_age;
    float m_score;
public:  //共有的
    void setname(char *name);
    void setage(int age);
    void setscore(float score);
    void show();
};
//成员函数的定义
void Student::setname(char *name){
    m_name = name;
}
void Student::setage(int age){
    m_age = age;
}
void Student::setscore(float score){
    m_score = score;
}
void Student::show(){
    cout<<m_name<<"的年龄是"<<m_age<<"，成绩是"<<m_score<<endl;
}
int main(){
    //在栈上创建对象
    Student stu;
    stu.setname("小明");
    stu.setage(15);
    stu.setscore(92.5f);
    stu.show();
    //在堆上创建对象
    Student *pstu = new Student;
    pstu -> setname("李华");
    pstu -> setage(16);
    pstu -> setscore(96);
    pstu -> show();
    return 0;
}
```

类的声明和成员函数的定义都是类定义的一部分，在实际开发中，我们`通常将类的声明放在头文件中，而将成员函数的定义放在源文件中。`

### 类的封装

项目开发中的成员变量以及只在类内部使用的成员函数（只被成员函数调用的成员函数）都建议声明为 private，而只将允许通过对象调用的成员函数声明为 public。

Setter/Getter 设置/获取 私有成员变量的值

**所谓封装，是指尽量隐藏类的内部实现，只向用户提供有用的成员函数。**

### private 和 public 的更多说明

`成员默认访问权限为private`

> 在一个类体中，private 和 public 可以分别出现多次。每个部分的有效范围到出现另一个访问限定符或类体结束时（最后一个右花括号）为止。
> 为了使程序清晰，应该养成这样的习惯，使每一种成员访问限定符在类定义体中只出现一次。

```c++

class Student{
private:
    char *m_name;
private:
    int m_age;
    float m_score;
public:
    void setname(char *name);
    void setage(int age);
public:
    void setscore(float score);
    void show();
};
```
