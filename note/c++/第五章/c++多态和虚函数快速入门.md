### 虚函数

由第四章，将派生类赋值给基类可知：

*编译器通过指针来访问成员变量，指针指向哪个对象就使用哪个对象的数据；编译器通过指针的类型来访问成员函数，指针属于哪个类的类型就使用哪个类的函数。*

所以很尴尬，父类指针指向子类对象时候，只可以调用子类对象的成员变量，而无法调用子类的成员函数

但是在函数声明前面增加 virtual 关键字，让函数成为虚函数（共享，使用 virtual 声明的函数可以使得函数不仅本类的对象可以访问），父类指针就可以调用子类对象的成员函数。

```c++

#include <iostream>
using namespace std;
//基类People
class People{
public:
    People(char *name, int age);
    virtual void display();  //声明为虚函数
protected:
    char *m_name;
    int m_age;
};
People::People(char *name, int age): m_name(name), m_age(age){}
void People::display(){
    cout<<m_name<<"今年"<<m_age<<"岁了，是个无业游民。"<<endl;
}
//派生类Teacher
class Teacher: public People{
public:
    Teacher(char *name, int age, int salary);
    virtual void display();  //声明为虚函数
private:
    int m_salary;
};
Teacher::Teacher(char *name, int age, int salary): People(name, age), m_salary(salary){}
void Teacher::display(){
    cout<<m_name<<"今年"<<m_age<<"岁了，是一名教师，每月有"<<m_salary<<"元的收入。"<<endl;
}
int main(){
    People *p = new People("王志刚", 23);
    p -> display();
    p = new Teacher("赵宏佳", 45, 8200);
    p -> display();
    return 0;
}

```

有了虚函数，基类指针指向基类对象时就使用基类的成员（包括成员函数和成员变量），指向派生类对象时就使用派生类的成员。换句话说，基类指针可以按照基类的方式来做事，也可以按照派生类的方式来做事，它有多种形态，或者说有多种表现方式，我们将这种现象称为**多态**

> C++中虚函数的唯一用处就是构成多态。

C++提供多态的目的是：`可以通过基类指针对所有派生类（包括直接派生和间接派生）的成员变量和成员函数进行“全方位”的访问，尤其是成员函数。如果没有多态，我们只能访问成员变量。`

虚函数是根据指针的指向来调用的，指针指向哪个类的对象就调用哪个类的虚函数。

### 多态作用

对于具有复杂继承关系的大中型程序，多态可以增加其灵活性，让代码更具有表现力。
