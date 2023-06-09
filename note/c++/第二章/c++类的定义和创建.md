[toc]

**类和对象的关系**

类是创建对象的模板，一个类可以创建多个对象，每个对象都是类类型的一个变量；

创建对象的过程也叫`类的实例化`。每个对象都是类的一个具体实例（Instance），拥有类的`成员变量和成员函数`。

> 与结构一样，类只是用来描述复杂数据类型的模板，不占用内存；而对象则是类的实例化，会占用内存

#### 类的定义

```c++
class Student{
public:
    //成员变量
    char * name;
    int age;
    float score;
    //成员函数
    void say(){
        cout<<name<<"的年龄是"<<age<<"，成绩是"<<score<<endl;
    }
};
```

**类只是一个模板（Template），编译后不占用内存空间，所以在定义类时不能对成员变量进行初始化，因为没有地方存储数据。只有在创建对象以后才会给成员变量分配内存，这个时候就可以赋值了。**

#### 创建对象

```c++
Student stu;
class Student stu;
Student allStu[100];
```

#### 访问类的成员

```c++
#include "iostream"
using namespace std;

class Student {
public:
	char* name;
	int age;
	float score;
public:
	void say() {
		cout << name << "的年纪是" << age << "，成绩是" << score << endl;
	}
};

int main(int agrc, char** argv) {
	Student stu;
	stu.name = (char *)"FanLihao";
	stu.age = 23;
	stu.score = 78.9f;
	stu.say();
	return 0;
}
```

#### 使用对象指针

```c++
Student* stu1 = new Student;
stu1->name = (char*)"XuDaWei";
stu1->age = 23;
stu1->score = 12.0f;
stu1->say();

```

在栈上创建出来的对象都有一个名字，比如 stu，使用指针指向它不是必须的。
但是通过 new 创建出来的对象就不一样了，它在堆上分配内存，没有名字，只能得到一个指向它的指针，
所以必须使用一个指针变量来接收这个指针，否则以后再也无法找到这个对象了，更没有办法使用它。

使用 new 在堆上创建出来的对象是匿名的，没法直接使用，
必须要用一个指针指向它，再借助指针来访问它的成员变量或成员函数。

栈内存是程序自动管理的，不能使用 delete 删除在栈上创建的对象；堆内存由程序员管理，对象使用完毕后可以通过 delete 删除。

