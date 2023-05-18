

## module语法

ES6的模块自动采用严格模式，无论是否在模块头部加上 ‘use strict’

### 一、export命令

模块功能主要由两个命令构成：
  - **import**：输入其他模块提供的功能
  - **export**：规定模块的对外接口

一个文件就是一个独立的模块，文件内的所有变量，外部都无法获取。可以使用export关键字输出某一变量，使得外部可获取改变量

#### 1.1 export —— 变量
```js
//profile.js
//方式一
export let firstName = "Fan"
export let lastName = "Lihao"

```

```js
//profile.js
//方式二
let firstName="fan"
let lastName='lihao'

export { firstName , lastName }
```
方式二：`在export命令后面使用大括号指定所要输出的一组变量，与方式一等价，但是更加清晰`

#### 1.2 export —— 函数或类

```js
export function multiply(x, y) {
  return x * y;
}
```
通常情况下，export输出的变量就是本来的名字，`但是可以使用as关键字重命名`
```js
function v1() {
  ...
}

function v2() {
  ...
}

export {
  v1 as streamV1,
  v2 as streamV2,
  v2 as streamLatestVersion
}
```
as关键字重命名v1,v2对外的接口，v2可以不同的名字输出两次

**注意：**
  `export命令规定的是对外的接口，必须与模块内部的变量建立一一对应的关系`

```js
//错误写法
export 1

let m = 1
export m

//正确写法
export let m = 1

let m = 1
export (m)

let m = 1
export (m as n)
```
`本质上是，在接口名和模块内部变量之间建立了一一对应的关系，另外，export语句输出的接口与其对应的值是动态绑定的关系，即通过该接口可以取到模块内部实时的值。CommonJS模块输出的是值的缓存，不存在动态更新`

最后，export命令可以出现在模块的任何位置，只要处于模块顶层就可以。不可以处于局部作用域，否则就会报错

### 二、import 命令

使用import命令可以导入其他模块中export命令定义的对外接口

```js
//main.js
import {
  firstName,
    lastName as surName
} from './profile'
```

`import命令接受一个对象（{}表示），里面指定要从其他模块导入的变量名，{}中的变量名必须与被导入模块对外接口的名称相同。后面的from指定模块文件的位置，可以相对路径，可以决定路径，后缀名.js可省略`


`在import命令中使用关键字as，将输入的变量重命名`

**注意：**

*import命令具有提升效果，会提升整个模块的头部，并首先执行。本质是，import命令是编译阶段执行的，在代码运行之前。另外，由于import是静态执行，所以不能使用表达式和变量，只能在运行时才能得到结果的语法结构*

```js
//正确
foo()

import { foo } from "my_module"
```
**说明：**

- import语句会执行所加载的模块，故如下代码仅仅执行lodash模块，但不会由任何输出：
```js
import {lodash}
```
- 多次重复执行同一句import语句，那么只会执行一次，不会执行多次，是Singleton模式
- CommonJs模块的require命令和import命令最好不要在同一个模块中使用

### 三、模块的整体加载

**import可以使用整体加载（即星号*）来指定一个对象，所有输出值都加载在这个对象上**。如下代码：

```js
//circle.js
export function area(radius) {
  return Math.PI * radius * radius;
}

export function circumference(radius) {
  return 2 * Math.PI * radius;
}
```

加载到main.js

```js
//main.js 方式一
import {
  area,
  circumference
} from './circle'

console.log(area(4));
console.log(circumference(14));
```

```js
//main.js 方式二
import * as circle from './circle'

console.log(circle.area(4));
console.log(circle.circumference(14));
```

**注意：**

`模块整体加载所在的对象应该是可以静态分析的，所有不允许运行时改变`

```js
import * as circle from './circle'
//错误
circle.foo='hello'
```

### 四、export default 命令

&emsp;用户使用import命令必须需要知道所要加载的变量名或函数名，否则无法加载。为了方便用户不看文档就能加载模块，可以**使用export default命令指定默认输出**。

```js
//export-default.js
export default function() {
  console.log('foo');
}
```
import命令可以用任意名称指向export-default.js输出的方法，并且无需 { }
```js
//import-default.js
import customName from './export-default'
customName();//'foo'
```
*export default同样可以用于非匿名函数*
```js
//export-default.js
export default function foo() {
  console.log('foo');
}

//或者
function foo() {
  console.log('foo');
}
export default foo;

```
**注意：**
foo函数的函数名foo在外部时无效的。加载时，视同匿名函数

export default 命令用于指定模块的默认输出。一个模块只能有一个默认输出，因此，该命令只能用一次。
