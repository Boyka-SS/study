**参数的传递**参数的传递本质上是一次赋值的过程，赋值就是对内存进行拷贝。所谓内存拷贝，是指将一块内存上的数据复制到另一块内存上

在 C++ 中，我们有了一种比指针更加便捷的传递聚合类型数据的方式，那就是引用（Reference）。

### 引用

**引用**可以看做是数据的一个别名，通过这个别名和原来的名字都能够找到这份数据

**引用定义的语法格式**

`type &name=data;`

type 是被引用的数据的类型，name 是引用的名称，data 是被引用的数据。

**引用必须在定义的同时初始化，并且以后也要从一而终，不能再引用其它数据，这有点类似于常量（const 变量）。**

```c++
#include <iostream>
using namespace std;
int main() {
    int a = 99;
    int &r = a;
    cout << a << ", " << r << endl;
    cout << &a << ", " << &r << endl;
    return 0;
}
```

【注意】
引用在定义时需要添加&，在使用时不能添加&，使用时添加&表示取地址

由于引用 r 和原始变量 a 都是指向同一地址，所以通过引用也可以修改原始变量中所存储的数据

```c++
#include <iostream>
using namespace std;
int main() {
    int a = 99;
    int &r = a;
    r = 47;
    cout << a << ", " << r << endl;//47,47
    return 0;
}
```

如果不希望引用修改数据，则定义方式如下：(常引用)
`const type &name=value;`
`type const &name=value;`

### c++引用作为函数参数

在`定义或声明函数`时候，可以`将函数的形参指定为引用的形式`，这样在`调用函数时就会将实参和形参绑定在一起`，让它们都指代同一份数据。如此一来，如果`在函数体中修改了形参的数据，那么实参的数据也会被修改`，从而拥有“在函数内部影响函数外部数据”的效果

```c++

#include <iostream>
using namespace std;
void swap1(int a, int b);
void swap2(int *p1, int *p2);
void swap3(int &r1, int &r2);
int main() {
    int num1, num2;
    cout << "Input two integers: ";
    cin >> num1 >> num2;
    swap1(num1, num2);
    cout << num1 << " " << num2 << endl;
    cout << "Input two integers: ";
    cin >> num1 >> num2;
    swap2(&num1, &num2);
    cout << num1 << " " << num2 << endl;
    cout << "Input two integers: ";
    cin >> num1 >> num2;
    swap3(num1, num2);
    cout << num1 << " " << num2 << endl;
    return 0;
}
//直接传递参数内容
void swap1(int a, int b) {
    int temp = a;
    a = b;
    b = temp;
}
//传递指针
void swap2(int *p1, int *p2) {
    int temp = *p1;
    *p1 = *p2;
    *p2 = temp;
}
//按引用传参
void swap3(int &r1, int &r2) {
    int temp = r1;
    r1 = r2;
    r2 = temp;
}
```

### C++引用作为函数返回值

```c++

#include <iostream>
using namespace std;
int &plus10(int &r) {
    r += 10;
    return r;
}
int main() {
    int num1 = 10;
    int num2 = plus10(num1);
    cout << num1 << " " << num2 << endl;//20 20
    return 0;
}
```

将引用作为函数返回值时应该注意一个小问题，就是不能返回局部数据（例如局部变量、局部对象、局部数组等）的引用，因为当函数调用完成后局部数据就会被销毁，有可能在下次使用时数据就不存在了，C++ 编译器检测到该行为时也会给出警告。
