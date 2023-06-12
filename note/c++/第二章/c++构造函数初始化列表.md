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

> 没有效率上的优势，仅仅是书写方便

**【注意】：成员变量的初始化顺序与初始化列表中列出的变量的顺序无关，它`只与成员变量在类中声明的顺序有关`**

```c++
class Demo{
private:
    int m_a;
    int m_b;
public:
    Demo(int b);
};
Demo::Demo(int b): m_b(b), m_a(m_b){ }
```

**成员变量的赋值顺序由它们在类中的声明顺序决定**

```c++
class Student {
public:
	char* m_name;
	int m_age;
	float m_score;
public:
	Student(char *name,int age,float score);
	void say();
};

Student::Student(char* name, int age, float score) :m_name(name), m_age(age), m_score(score) {}

void Student::say(){
	cout << m_name << "的年纪是" << m_age << "，成绩是" << m_score << endl;
}
```

### 初始化 const 成员变量

**初始化 const 成员变量的唯一办法就是使用初始化列表**

```c++
class VLA{
private:
    const int m_len;
    int *m_arr;
public:
    VLA(int len);
};

VLA::VLA(int len): m_len(len){
    m_arr = new int[len];
}
```
