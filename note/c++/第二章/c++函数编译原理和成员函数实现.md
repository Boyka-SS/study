### c++函数的编译

【思考】

c++对象内存模型中只保留了成员变量，c++是如何通过对象调用成员函数的呢？

C++中的函数在编译时会根据它所在的命名空间、它所属的类、以及它的参数列表（也叫参数签名）等信息**进行重新命名**，形成一个新的函数名。

> 这个新的函数名只有编译器知道，对用户是不可见的。对函数重命名的过程叫做`名字编码`（Name Mangling），是通过一种特殊的算法来实现的。

### 成员函数的调用

_成员函数最终被编译成与对象无关的全局函数_，

如果函数体中没有成员变量，那问题就很简单，不用对函数做任何处理，直接调用即可。

**C++规定，编译成员函数时要额外添加一个参数，把当前对象的指针传递进去，通过指针来访问成员变量。**

【案例代码】

```c++
void Demo::display(){
    cout<<a<<endl;
    cout<<b<<endl;
}

// 编译后的代码类似于下面情况
void new_function_name(Demo * const p){
    //通过指针p来访问a、b
    cout<<p->a<<endl;
    cout<<p->b<<endl;
}
```

通过传递对象指针就完成了成员函数和成员变量的关联。这与我们从表明上看到的刚好相反，**通过对象调用成员函数时，不是通过对象找函数，而是通过函数找对象。**
