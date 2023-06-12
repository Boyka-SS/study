### 对象数组

`C++ 允许数组的每个元素都是对象，这样的数组称为对象数组。`

对象数组中的每个元素都需要用构造函数初始化。`具体哪些元素用哪些构造函数初始化，取决于定义数组时的写法`

```cpp
#include<iostream>
using namespace std;
class CSample{
public:
    CSample(){
        cout<<"Constructor 1 Called"<<endl;
    }
    CSample(int n){
        cout<<"Constructor 2 Called"<<endl;
    }
};
int main(){
    cout<<"stepl"<<endl;
    CSample arrayl[2];// 1 1
    cout<<"step2"<<endl;
    CSample array2[2] = {4, 5};// 2 2
    cout<<"step3"<<endl;
    CSample array3[2] = {3};// 2 1
    cout<<"step4"<<endl;
    CSample* array4 = new CSample[2];// 1 1
    delete [] array4;
    return 0;
}
```

**在构造函数有多个参数时，数组的初始化列表中要显式地包含对构造函数的调用**

```cpp
class CTest{
public:
    CTest(int n){ }  //构造函数(1)
    CTest(int n, int m){ }  //构造函数(2)
    CTest(){ }  //构造函数(3)
};
int main(){
    //三个元素分别用构造函数(1)、(2)、(3) 初始化
    CTest arrayl [3] = { 1, CTest(1,2) };
    //三个元素分别用构造函数(2)、(2)、(1)初始化
    CTest array2[3] = { CTest(2,3), CTest(1,2), 1};
    //两个元素指向的对象分别用构造函数(1)、(2)初始化
    CTest* pArray[3] = { new CTest(4), new CTest(1,2) };
    return 0;
}
```