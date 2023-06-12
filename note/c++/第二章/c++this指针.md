### this 指针

this 是 c++的一个关键字，是一个 const 指针，指向当前对象（正在使用的对象），通过他可以访问当前的对象的所有成员。

```c++
class Student{
public:
    void setname(char *name);
    void setage(int age);
    void setscore(float score);
    void show();
private:
    char *name;
    int age;
    float score;
};

// 成员函数的参数和成员变量重名，只能通过 this 区分

void Student::setname(char *name){
    this->name = name;
}
void Student::setage(int age){
    this->age = age;
}
void Student::setscore(float score){
    this->score = score;
}
void Student::show(){
    cout<<this->name<<"的年龄是"<<this->age<<"，成绩是"<<this->score<<endl;
}
```

`this 只能用在类的内部`，通过 _this 可以访问类的所有成员_，包括 private、protected、public 属性的

【注意】

-   this 是一个指针，要用`->`来访问成员变量或成员函数

-   this 只有在对象被创建以后才会给 this 赋值，并且这个赋值的过程是编译器自动完成的，不需要用户干预，用户也不能显式地给 this 赋值

-   this 是 const 指针，它的值是不能被修改的，一切企图修改该指针的操作，如赋值、递增、递减等都是不允许的。
-   this 只能在成员函数内部使用，用在其他地方没有意义，也是非法的。
-   只有当对象被创建后 this 才有意义，因此不能在 static 成员函数中使用（后续会讲到 static 成员）

### this 到底是什么

this 实际上**是成员函数的一个形参**，在**调用成员函数时将对象的地址作为实参传递给 this**。

不过 this 这个形参是隐式的，它并不出现在代码中，而是在编译阶段由编译器默默地将它添加到参数列表中。

`成员函数最终被编译成与对象无关的普通函数`，除了成员变量，会丢失所有信息，所以`编译时要在成员函数中添加一个额外的参数，把当前对象的首地址传入，以此来关联成员函数和成员变量。`

这个额外的参数，实际上就是 this，它是**成员函数和成员变量关联的桥梁**
