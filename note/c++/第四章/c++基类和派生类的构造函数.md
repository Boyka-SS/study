### 派生类的构造函数

类的构造函数不能被继承

对继承过来的成员变量的初始化工作也要由派生类的构造函数完成，但是基类的 private 成员则无法使用派生类的构造函数进行初始化。
解决这个问题的思路是：**在派生类的构造函数中调用基类的构造函数。**

```c++
//基类People
class People{
protected:
    char *m_name;
    int m_age;
public:
    People(char*, int);
};
People::People(char *name, int age): m_name(name), m_age(age){}
//派生类Student
class Student: public People{
private:
    float m_score;
public:
    Student(char *name, int age, float score);
    void display();
};
//People(name, age)就是调用基类的构造函数
Student::Student(char *name, int age, float score): People(name, age), m_score(score){ }
void Student::display(){
    cout<<m_name<<"的年龄是"<<m_age<<"，成绩是"<<m_score<<"。"<<endl;
}
```

`Student::Student(char *name, int age, float score): People(name, age), m_score(score){ }`
`Student::Student(char *name, int age, float score): m_score(score),People(name, age){ }`

不管它们的顺序如何，**派生类构造函数总是先调用基类构造函数再执行其他代码(联系派生类对象的内存模型)**（包括参数初始化表以及函数体中的代码），**只能将基类构造函数的调用放在函数头部，不能放在函数体中。**

函数头部是对基类构造函数的调用，而不是声明，所以括号里的参数是实参，它们不但可以是派生类构造函数参数列表中的参数，还可以是局部变量、常量等

`Student::Student(char *name, int age, float score): People("小明", 16), m_score(score){ }`

### 构造函数的调用顺序(联系派生类对象的内存模型)

基类构造函数总是被优先调用，这说明创建派生类对象时，会先调用基类构造函数，再调用派生类构造函数

构造函数的调用顺序是按照继承的层次自顶向下、从基类再到派生类的。

派生类构造函数中只能调用直接基类的构造函数，不能调用间接基类的。

> C++ 这样规定是有道理的，因为我们在 C 中调用了 B 的构造函数，B 又调用了 A 的构造函数，相当于 C 间接地（或者说隐式地）调用了 A 的构造函数，如果再在 C 中显式地调用 A 的构造函数，那么 A 的构造函数就被调用了两次，相应地，初始化工作也做了两次，这不仅是多余的，还会浪费 CPU 时间以及内存，毫无益处，所以 C++ 禁止在 C 中显式地调用 A 的构造函数。

### 基类构造函数调用规则

