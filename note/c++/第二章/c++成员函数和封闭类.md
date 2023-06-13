### 封闭类

一个类的成员变量如果是另一个类的对象，就称之为**成员对象**。包含成员对象的类叫**封闭类**

### 成员对象的初始化

创建封闭类对象时，其包含的成员对象也需要被创建，会引发成员对象的构造函数调用。

**封闭类的成员对象的初始化需要借助封闭类构造函数的初始化列表。**

**封闭类对象创建语法：**

```
类名::构造函数名(参数表): 成员变量 1(参数表), 成员变量 2(参数表), ...
{
    //TODO
}
```

对于基本数据类型，参数表只需要一个初始值；对于成员对象，参数表则需要是构造函数的参数，指明成员对象如何被初始化

```c++
class Tyre {
public:
    Tyre(int radius, int width);
private:
    int m_radius;
    int m_width;
};
Tyre::Tyre(int radius, int width) : m_radius(radius), m_width(width) { }


class Engine{
public:
    Engine(float displacement = 2.0);
private:
    float m_displacement;
};
Engine::Engine(float displacement) : m_displacement(displacement) {}
```

```c++
class Car{
public:
    Car(int price, int radius, int width);
private:
    int m_price;
    Tyre m_tyre;
    Engine m_engine;
};
Car::Car(int price, int radius, int width): m_price(price), m_tyre(radius, width){ };
```

### 成员对象的消亡

封闭类对象生成时，先执行所有成员对象的构造函数，然后才执行封闭类自己的构造函数。

当封闭类对象消亡时，先执行封闭类的析构函数，然后再执行成员对象的析构函数，

成员对象析构函数的执行次序和构造函数的执行次序相反，即先构造的后析构

> 构造时，先构造里面，再构造外面；析构时，先析构外面，再析构里面
> 倒立的金字塔，先修建“塔尖”，再修边围；毁坏时，先毁坏边围，再毁坏塔尖
> **塔尖是成员对象，塔底是封闭类**
