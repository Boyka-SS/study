### 静态成员变量

**使用静态成员变量来实现多个对象共享数据的目标。**

```c++
class Student{
public:
    Student(char *name, int age, float score);
    void show();
public:
    static int m_total;  //静态成员变量
private:
    char *m_name;
    int m_age;
    float m_score;
};
```

### static 成员变量初始化

static 成员变量属于类，不属于某个具体的对象，即使创建多个对象，也只为 m_total 分配一份内存，所有对象使用的都是这份内存中的数据。当某个对象修改了 m_total，也会影响到其他对象。

static 成员变量**必须在类声明的外部初始化**

**形式**

`type class::name = value;`

> type 是变量的类型，class 是类名，name 是变量名，value 是初始值。

【注意】static 成员变量的内存既不是在声明类时分配，也不是在创建对象时分配，而是在（类外）初始化时分配。反过来说，没有在类外初始化的 static 成员变量不能使用。

### static 成员变量访问

```c++

//通过类类访问 static 成员变量
Student::m_total = 10;
//通过对象来访问 static 成员变量
Student stu("小明", 15, 92.5f);
stu.m_total = 20;
//通过对象指针来访问 static 成员变量
Student *pstu = new Student("李华", 16, 96);
pstu -> m_total = 20;
```

【注意】static 成员变量不占用对象的内存，而是在所有对象之外开辟内存，即使不创建对象也可以访问。

### static 注意点

1. 一个类中可以有一个或多个静态成员变量，所有的对象都共享这些静态成员变量，都可以引用它。
2. static 成员变量和普通 static 变量一样，都在内存分区中的全局数据区分配内存，到程序结束时才释放。
   这就意味着，static 成员变量不随对象的创建而分配内存，也不随对象的销毁而释放内存。而普通成员变量在对象创建时分配内存，在对象销毁时释放内存
3. 静态成员变量必须初始化，而且只能在类体外进行。
4. 静态成员变量既可以通过对象名访问，也可以通过类名访问，但要遵循 private、protected 和 public 关键字的访问权限限制。
