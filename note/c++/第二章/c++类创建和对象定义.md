### 类和对象关系

类是创建对象的模板，一个类可以创建多个对象，每个对象都是类类型的一个变量；

创建对象的过程也叫**类的实例化**。

每个对象都是类的一个具体实例（Instance），拥有类的成员变量和成员函数。

> 类是一个模板，不占用系统资源；而对象则是实实在在的变量会占用系统资源。

### 类的定义

```c++

class Student {
public:
	char* name;
	int age;
	float score;
public:
	void say() {
		cout << name << age << score;
	}
};
```

类只是一个模板（Template），`编译后不占用内存空间，所以在定义类时不能对成员变量进行初始化，因为没有地方存储数据。`

只有在创建对象以后才会给成员变量分配内存，这个时候就可以赋值了。

### 创建对象

使用点号`.`来访问成员变量和成员函数

```c++

Student stu;
Student stu[100];

class Student liLei;
```

### 访问类的成员

```c++
//创建对象
Student stu;
stu.name = "小明";
stu.age = 15;
stu.score = 92.5f;
stu.say();
```

### 使用对象指针

通过箭头`->`来访问对象的成员变量和成员函数

```c++
//创建的对象 stu 在栈上分配内存，需要使用&获取它的地址
Student stu;
Student *pStu = &stu;

// 使用new会在堆上创建对象
Student* pStu = new Student;
pStu->name = (char *)"fanlihao";
pStu->age = 23;
pStu->score = 23.5f;

delete pStu;
```

在栈上创建对象都有一个名字，使用指针指向它不是必须的；
使用 new 创建对象，是在堆区分配的内存，没有名字，只能用一个指针来操作这个内存，从而操作对象。

> 使用 new 在堆上创建出来的对象是匿名的，没法直接使用，必须要用一个指针指向它，再借助指针来访问它的成员变量或成员函数。

**栈内存是程序自动管理的，不能使用 delete 删除在栈上创建的对象；堆内存由程序员管理，对象使用完毕后可以通过 delete 删除。**

#### 总结

本章介绍两种创建对象的方式：

- 在栈上创建(.)
  `TypeData variable;`
- 在堆上使用 new 关键字创建，必须使用指针指向，使用结束后需要 delete(->)
  `TypeData *pVariable=new TypeData;`
