类是一种用户自定义的数据类型，是成员变量和成员函数的集合

成员变量和普通变量一样，有数据类型和变量名，但是`定义类的时候不能对成员变量赋值`

成员函数和普通函数一样，都有返回值和参数列表，它与一般函数的区别是：`成员函数是一个类的成员，出现在类体中，`

`它的作用范围由类来决定；而普通函数是独立的，作用范围是全局的，或位于某个命名空间内。`

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

也**可以只在类体中声明函数，而将函数定义放在类体外面**

```c++

class Student {
public:
	char* name;
	int age;
	float score;
public:
	void say() ;
};

void Student::say() {
	cout << name << age << score;
}
```

> **成员函数必须先在类体中作原型声明，然后在类外定义，也就是说类体的位置应在函数定义之前。**

### 成员函数类体内外定义的区别

**在类体中定义的成员函数会自动成为内联函数，在类体外定义的不会。**

建议`在类体内部对成员函数作声明，而在类体外部进行定义`，这是一种良好的编程习惯，实际开发中大家也是这样做的。

**既希望将函数定义在类体外部，又希望它是内联函数，那么可以在定义函数时加 inline 关键字**

```c++
class Student{
public:
    char *name;
    int age;
    float score;
    void say();  //内联函数声明，可以增加 inline 关键字，但编译器会忽略
};
//函数定义
inline void Student::say(){
    cout<<name<<"的年龄是"<<age<<"，成绩是"<<score<<endl;
}
```
