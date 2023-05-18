## 开始
TS是仅仅基于类型的成员来判断类型间是否可以相互赋值
一般来说，`涉及类型兼容的类型检查，*只需要目标类型的成员*，如果其可以在源类型中一一找到对应，则源类型可以赋值给目标类型`

```ts
interface Pet{
    name:string
}

class Test{
    name:string
    constructor(name:string){
        this.name=name;
    }
}
let pp:Pet=new Test("caihua");//allow
```

```ts
interface Pet{
    name:string
    age:number
}

class Test{
    name:string
    constructor(name:string){
        this.name=name;
    }
}
let pp:Pet=new Test("caihua");//disallowed
```

> 如果目标类型中的成员是用户自定义的类型（interface,class...）类型兼容需要递归的展开所有的类型

## 对比两个函数

对于函数间的赋值，**首先需要看形参列表（仅看参数类型，参数名不重要）**

```ts
let x = (a: number) => 0;
let y = (b: number, s: string) => 0;
y = x; // OK
x = y; // Error
```

> PS:在函数赋值时候，要考虑参数列表是否可以兼容，这个和 **开始**部分相反，类型兼容的类型检查是只考虑源函数的参数列表的成员是否在目标函数的参数列表中一一对应

**如果看函数返回值类型**，则和**开始**部分一致

```ts
let x = () => ({ name: "Alice" });
let y = () => ({ name: "Alice", location: "Seattle" });
x = y; // allow
y = x; // disallowed
```
> 目标函数的返回值类型要是源函数返回值类型的子类型，目标函数的返回值类型的成员要在源函数的返回值类型中一一对应
