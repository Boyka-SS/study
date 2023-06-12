### 构造函数初始化列表

构造函数的初始化列表使得代码更加简洁

```c++

class Student{
private:
    char *m_name;
    int m_age;
    float m_score;
public:
    Student(char *name, int age, float score);
    void show();
};

// 全部变量 初始化
Student::Student(char *name, int age, float score): m_name(name), m_age(age), m_score(score){
    //TODO:
}

// 局部变量 初始化
Student::Student(char *name, int age, float score): m_name(name){
    m_age=age;
    m_score=score;
}
```

**【注意】：成员变量的初始化顺序与初始化列表中列出的变量的顺序无关，它`只与成员变量在类中声明的顺序有关`**

> 没有效率上的优势，仅仅是书写方便
