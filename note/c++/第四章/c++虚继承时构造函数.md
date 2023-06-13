**虚基类**是由**最终的派生类**初始化的，换句话说，最终派生类的构造函数必须要调用虚基类的构造函数。

```c++

//虚基类A
class A{
public:
    A(int a);
protected:
    int m_a;
};
A::A(int a): m_a(a){ }
//直接派生类B
class B: virtual public A{
public:
    B(int a, int b);
public:
    void display();
protected:
    int m_b;
};
B::B(int a, int b): A(a), m_b(b){ }
void B::display(){
    cout<<"m_a="<<m_a<<", m_b="<<m_b<<endl;
}
//直接派生类C
class C: virtual public A{
public:
    C(int a, int c);
public:
    void display();
protected:
    int m_c;
};
C::C(int a, int c): A(a), m_c(c){ }
void C::display(){
    cout<<"m_a="<<m_a<<", m_c="<<m_c<<endl;
}
//间接派生类D
class D: public B, public C{
public:
    D(int a, int b, int c, int d);
public:
    void display();
private:
    int m_d;
};
D::D(int a, int b, int c, int d): A(a), B(90, b), C(100, c), m_d(d){ }
void D::display(){
    cout<<"m_a="<<m_a<<", m_b="<<m_b<<", m_c="<<m_c<<", m_d="<<m_d<<endl;
}
```

普通继承中，派生类的构造函数只负责初始化它的直接基类，再由直接基类的构造函数初始化间接基类，用户尝试调用间接基类的构造函数将导致错误。

而虚继承的构造函数中，最终的派生类需要在构造函数中初始化间接基类，虽然虚基类的直接派生类的构造函数也可以调用虚基类的构造函数对其进行初始化，但是最终生效的还是最终的派生类的初始化。

### 构造函数的执行顺序

虚继承时构造函数的执行顺序与普通继承时不同：

在最终派生类的构造函数调用列表中，不管各个构造函数出现的顺序如何，编译器总是先调用虚基类的构造函数，再按照出现的顺序调用其他的构造函数；

而对于普通继承，就是按照构造函数出现的顺序依次调用的。
