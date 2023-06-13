### 继承语法

```c++

class 派生类名:［继承方式］ 基类名{
    派生类新增加的成员
};

```

默认为 private（成员变量和成员函数默认也是 private）。

继承方式不写，默认为 private（成员变量和成员函数默认也是 private）。

### public、protected、private 修饰类的成员

public 成员可以通过对象来访问，private 成员不能通过对象访问。

protected 成员不能通过对象访问。但是当存在继承关系时，protected ：`基类中的 protected 成员可以在派生类中使用，而基类中的 private 成员不能在派生类中使用`

### public、protected、private 指定继承方式

- 基类成员在派生类中的访问权限不得高于继承方式中指定的权限
- 不管继承方式如何，基类中的 private 成员在派生类中始终不能使用（不能在派生类的成员函数中访问或调用）。
- 不管继承方式如何，基类中的 private 成员在派生类中始终不能使用（不能在派生类的成员函数中访问或调用）。
- 如果希望基类的成员既不向外暴露（不能通过对象访问），还能在派生类中使用，那么只能声明为 protected。

注意，我们这里**说的是基类的 private 成员不能在派生类中使用，并没有说基类的 private 成员不能被继承**。

实际上，**基类的 private 成员是能够被继承的，并且（成员变量）会占用派生类对象的内存，它只是在派生类中不可见，导致无法使用罢了**。

_在派生类中访问基类 private 成员的唯一方法就是借助基类的非 private 成员函数，如果基类没有非 private 成员函数，那么该成员在派生类中将无法访问。_

### 改变访问权限

使用 using 关键字可以改变基类成员在派生类中的访问权限

注意：using 只能改变基类中 public 和 protected 成员的访问权限，不能改变 private 成员的访问权限，因为基类中 private 成员在派生类中是不可见的，根本不能使用，所以基类中的 private 成员在派生类中无论如何都不能访问。

```c++
#include<iostream>
using namespace std;
//基类People
class People {
public:
    void show();
protected:
    char *m_name;
    int m_age;
};
void People::show() {
    cout << m_name << "的年龄是" << m_age << endl;
}
//派生类Student
class Student : public People {
public:
    void learning();
public:
    using People::m_name;  //将protected改为public
    using People::m_age;  //将protected改为public
    float m_score;
private:
    using People::show;  //将public改为private
};
void Student::learning() {
    cout << "我是" << m_name << "，今年" << m_age << "岁，这次考了" << m_score << "分！" << endl;
}
int main() {
    Student stu;
    stu.m_name = "小明";
    stu.m_age = 16;
    stu.m_score = 99.5f;
    stu.show();  //compile error
    stu.learning();
    return 0;
}
```
