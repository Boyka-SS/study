### 构造函数

构造函数：名字和类名相同，没有返回值，不需要用户显式调用（用户也不能调用），而是在创建对象时自动执行

> 在创建对象的同时为成员变量赋值

```c++
class Student{
private:
    char *m_name;
public:
    Student(char *name);
    void show();
};
Student::Student(char *name){
    m_name = name;
}
void Student::show(){
    cout<<m_name<<endl;
}

int main(){
    //在栈上创建对象
    Student stu("小明", 15, 92.5f);
    //在堆上创建对象
    Student *pstu = new Student("李华", 16, 96);
    return 0;
}
```

调用该构造函数，就得在创建对象的同时传递实参，并且实参由( )包围，和普通的函数调用非常类似。

在栈上创建对象时，实参位于对象名后面；在堆上创建对象时，实参位于类名后面

构造函数注意点；

- 不论是声明还是定义，函数名前面都不需要返回值类型
- 函数体不能有 return 语句

> 构造函数必须是 public 属性的，否则创建对象时无法调用。当然，设置为 private、protected 属性也不会报错，但是没有意义。

### 构造函数重载

构造函数是允许重载的，创建对象时根据传递的实参来判断调用哪一个构造函数。

构造函数的调用是强制性的，一旦在类中定义了构造函数，那么创建对象时就一定要调用，不调用是错误的。如果有多个重载的构造函数，那么`创建对象时提供的实参必须和其中的一个构造函数匹配`；反过来说，创建对象时只有一个构造函数会被调用。

```c++
class Student{
private:
    char *m_name;
public:
    Student();
    Student(char *name);
    void show();
};
Student::Student(){
    m_name=NULL;
}
Student::Student(char *name){
    m_name = name;
}
void Student::show(){
    cout<<m_name<<endl;
}

int main(){
    //在栈上创建对象
    Student stu("小明", 15, 92.5f);
    //在堆上创建对象
    Student *pstu = new Student("李华", 16, 96);
    return 0;
}
```

构造函数【作用】：初始化对象参数

### 默认构造函数

没有定义构造函数，那么编译器会自动生成一个默认的构造函数，只是这个构造函数的函数体是空的，也没有形参，也不执行任何操作

```c++
ClassName(){}
```

一个类必须有构造函数，要么使用编译器默认生成的构造函数，要么使用用户自定义的构造函数

调用没有参数的构造函数也可以省略括号。

在栈上创建对象可以写作 Student stu()或 Student stu；在堆上创建对象可以写作 Student *pstu = new Student()或 Student *pstu = new Student；它们都会调用构造函数 Student()。
