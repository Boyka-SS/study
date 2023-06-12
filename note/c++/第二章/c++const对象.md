用 const 修饰的对象，称为`常对象`

常对象只能调用类的 const 成员（成员变量和成员函数）

### 定义常对象

```c++
const  class  object(params);
class const object(params);

const class *p = new class(params);
class const *p = new class(params);
```

一旦将对象定义为常对象之后，就只能访问被 const 修饰的成员了（包括 const 成员变量和 const 成员函数）

```c++

#include <iostream>
using namespace std;

class Student{
public:
    Student(char *name, int age, float score);
public:
    void show();
    char *getname() const;
    int getage() const;
    float getscore() const;
private:
    char *m_name;
    int m_age;
    float m_score;
};

Student::Student(char *name, int age, float score): m_name(name), m_age(age), m_score(score){ }
void Student::show(){
    cout<<m_name<<"的年龄是"<<m_age<<"，成绩是"<<m_score<<endl;
}
char * Student::getname() const{
    return m_name;
}
int Student::getage() const{
    return m_age;
}
float Student::getscore() const{
    return m_score;
}

int main(){
    const Student stu("小明", 15, 90.6);
    //stu.show();  //error
    cout<<stu.getname()<<"的年龄是"<<stu.getage()<<"，成绩是"<<stu.getscore()<<endl;

    const Student *pstu = new Student("李磊", 16, 80.5);
    //pstu -> show();  //error
    cout<<pstu->getname()<<"的年龄是"<<pstu->getage()<<"，成绩是"<<pstu->getscore()<<endl;

    return 0;
}
```
