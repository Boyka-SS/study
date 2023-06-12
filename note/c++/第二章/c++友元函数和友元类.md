c++访问权限共有 public，protect，private

但是借助**友元**，可以**使得其它类中的成员函数以及全局范围内的函数访问当前类的 private 成员**

### 友元函数

`将类外的函数（全局函数或者其他类的成员函数）通过关键字 friend 声明在本类中`，这样的函数称为`友元函数`

友元函数可以访问当前类中的所有成员，包括 public,protected,private 属性的

1.  `非成员函数`声明为友元函数

    ```c++

    class Student {
    public:
        friend void show(Student* pstu);
    };

    //非成员函数
    void show(Student \*pstu){
    cout<<pstu->m_name<<"的年龄是 "<<pstu->m_age<<"，成绩是 "<<pstu->m_score<<endl;
    }
    ```

    【注意】友元函数不同于类的成员函数，在友元函数中不能直接访问类的成员，必须要借助对象

2.  将`类外的成员函数声明`为友元函数

        friend 函数不仅可以是全局函数（非成员函数），还可以是另外一个类的成员函数。

    ```c++
        #include <iostream>

        using namespace std;
        class Address; //提前声明 Address 类
        //声明 Student 类
        class Student{
        public:
        Student(char *name, int age, float score);
        public:
        void show(Address *addr);
        private:
        char *m_name;
        int m_age;
        float m_score;
        };
        //声明 Address 类
        class Address{
        private:
        char *m_province; //省份
        char *m_city; //城市
        char *m_district; //区（市区）
        public:
        Address(char *province, char *city, char *district);
        //将 Student 类中的成员函数 show()声明为友元函数
        friend void Student::show(Address *addr);
        };
        //实现 Student 类
        Student::Student(char *name, int age, float score): m_name(name), m_age(age), m_score(score){ }
        void Student::show(Address *addr){
        cout<<m_name<<"的年龄是 "<<m_age<<"，成绩是 "<<m_score<<endl;
        cout<<"家庭住址："<<addr->m_province<<"省"<<addr->m_city<<"市"<<addr->m_district<<"区"<<endl;
        }
        //实现 Address 类
        Address::Address(char *province, char *city, char \*district){
        m_province = province;
        m_city = city;
        m_district = district;
        }
        int main(){
        Student stu("小明", 16, 95.5f);
        Address addr("陕西", "西安", "雁塔");
        stu.show(&addr);

            Student *pstu = new Student("李磊", 16, 80.5);
            Address *paddr = new Address("河北", "衡水", "桃城");
            pstu -> show(paddr);
            return 0;

        }
    ```

    【说明】

    -   一个函数可以被多个类声明为友元函数，这样就可以访问多个类中的 private 成员。
    -

### 友元类

友元类中的所有成员函数都是另外一个类的友元函数。

例如将类 B 声明为类 A 的友元类，那么类 B 中的所有成员函数都是类 A 的友元函数，可以访问类 A 的所有成员，包括 public、protected、private 属性的。

```c++
//声明Student类
class Student{
public:
    Student(char *name, int age, float score);
public:
    void show(Address *addr);
private:
    char *m_name;
    int m_age;
    float m_score;
};
//声明Address类
class Address{
public:
    Address(char *province, char *city, char *district);
public:
    //将Student类声明为Address类的友元类
    friend class Student;
private:
    char *m_province;  //省份
    char *m_city;  //城市
    char *m_district;  //区（市区）
};

```

-   **友元的关系是单向的而不是双向的**如果声明了类 B 是类 A 的友元类，不等于类 A 是类 B 的友元类，类 A 中的成员函数不能访问类 B 中的 private 成员。

-   **友元的关系不能传递**。如果类 B 是类 A 的友元类，类 C 是类 B 的友元类，不等于类 C 是类 A 的友元类。
-   一般不建议把整个类声明为友元类，而只将某些成员函数声明为友元函数，这样更安全一些。
