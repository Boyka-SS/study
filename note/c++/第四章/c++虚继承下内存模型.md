构造函数的执行顺序。虚继承时构造函数的执行顺序与普通继承时不同：在最终派生类的构造函数调用列表中，不管各个构造函数出现的顺序如何，编译器总是先调用虚基类的构造函数，再按照出现的顺序调用其他的构造函数；而对于普通继承，就是按照构造函数出现的顺序依次调用的。

```c++
class A{
protected:
    int m_a1;
    int m_a2;
};
class B: public A{
protected:
    int b1;
    int b2;
};
class C: public B{
protected:
    int c1;
    int c2;
};
class D: public C{
protected:
    int d1;
    int d2;
};
int main(){
    A obj_a;
    B obj_b;
    C obj_c;
    D obj_d;
    return 0;
}
```
1. 
![](../../../images/Snipaste_2023-06-13_10-53-33.png)
