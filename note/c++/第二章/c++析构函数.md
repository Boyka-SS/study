### 析构函数

创建对象时，会自动调用构造函数进行初始化工作，同样，对象销毁时，也会调用析构函数进行分配内存释放，关闭打开的文件等

析构函数是一种特殊的函数，**没有返回值，不需要程序员显式调用，而是在销毁对象时，自动执行**

> 析构函数**没有参数**，**不能重载**，因此**一个类只能有一个析构函数**。如果用户没有定义，_编译器会自动生成一个默认的析构函数。_

**形式**

`~ClassName()`

> 构造函数形式：`ClassName()`

```c++

#include <iostream>
using namespace std;
class VLA {
public:
    VLA(int len);  //构造函数
    ~VLA();  //析构函数
public:
    void input();
    void show();
private:
    int* at(int i);
private:
    const int m_len;
    int* m_arr;
    int* m_p;
};
VLA::VLA(int len) : m_len(len) {
    if (len > 0) { m_arr = new int[len];   }
    else { m_arr = NULL; }
}
VLA::~VLA() {
    delete[] m_arr;
}
void VLA::input() {
    for (int i = 0; m_p = at(i); i++) { cin >> *at(i); }
}
void VLA::show() {
    for (int i = 0; m_p = at(i); i++) {
        if (i == m_len - 1) { cout << *at(i) << endl; }
        else { cout << *at(i) << ", "; }
    }
}
int* VLA::at(int i) {
    if (!m_arr || i < 0 || i >= m_len) { return NULL; }
    else { return m_arr + i; }
}
int main() {
    int n;
    cout << "Input array length: ";
    cin >> n;
    VLA* parr = new VLA(n);
    cout << "Input " << n << " numbers: ";
    parr->input();
    cout << "Elements: ";
    parr->show();
    delete parr;
    return 0;
}
```

C++ 中的 new 和 delete 分别用来分配和释放内存，用 new 分配内存时会调用构造函数，用 delete 释放内存时会调用析构函数。


### 析构函数执行时机

