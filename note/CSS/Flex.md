[TOC]

> 本文链接：https://www.cnblogs.com/jpwz/p/12483053.html
>
> 拓展：https://www.cnblogs.com/xiaozhang666/p/11416856.html

## 1、什么是 flex 布局

Flex 是 Flexible Box 的缩写，意为"灵活的盒子"或"弹性的盒子"，所以 flex 布局一般也叫作"弹性布局"。

## 2、基本概念

#### 2.1、什么是 flex 容器（flex container）？

采用 flex 布局的元素，称为 flex 容器：

```css
.box { 
    display: flex | inline-flex; 
}
```

#### 2.2、什么是 flex 项目（flex item）？

flex 容器的所有子元素自动成为容器成员，称为 flex 项目。

![img](https://img2020.cnblogs.com/blog/480452/202003/480452-20200312213653064-1133852503.png)

> 项目默认沿主轴排列。

## 3、容器的属性

#### 3.1、display 属性

display 属性决定是否使用flex布局：

```css
.box { 
    display: flex | inline-flex; 
}
```

> flex：将对象作为弹性伸缩盒显示

![img](https://img2020.cnblogs.com/blog/480452/202003/480452-20200312213915703-1352394682.png)

> inline-flex：将对象作为内联块级弹性伸缩盒显示

![img](https://img2020.cnblogs.com/blog/480452/202003/480452-20200312214009120-1006555353.png)

#### 3.2、flex-direction 属性

flex-direction 属性决定主轴的方向（即项目的排列方向）：

```css
.box { 
    flex-direction: row | row-reverse | column | column-reverse; 
}
```

> row（默认值）：主轴为水平方向，起点在左端

![img](https://img2020.cnblogs.com/blog/480452/202003/480452-20200312214131718-266037847.png)

> row-reverse：主轴为水平方向，起点在右端

![img](https://img2020.cnblogs.com/blog/480452/202003/480452-20200312214158872-1719559415.png)

> column：主轴为垂直方向，起点在上沿

![img](https://img2020.cnblogs.com/blog/480452/202003/480452-20200312214238811-345051064.png)

> column-reverse：主轴为垂直方向，起点在下沿

![img](https://img2020.cnblogs.com/blog/480452/202003/480452-20200312214303503-287345199.png)

#### 3.3、flex-wrap 属性

默认情况下，项目都排在一条线（又称"轴线"）上，flex-wrap 属性定义，如果一条轴线排不下，如何换行：

```css
.box{ 
    flex-wrap: nowrap | wrap | wrap-reverse; 
}
```

> nowrap（默认）：不换行

![img](https://img2020.cnblogs.com/blog/480452/202003/480452-20200312214421359-1829250236.png)

> wrap：换行，第一行在上方

![img](https://img2020.cnblogs.com/blog/480452/202003/480452-20200312214456040-1090606904.png)

> wrap-reverse：换行，第一行在下方

![img](https://img2020.cnblogs.com/blog/480452/202003/480452-20200312214525729-360620537.png)

#### 3.4、flex-flow

flex-flow 属性是 flex-direction 属性和 flex-wrap 属性的简写形式，默认值为 row nowrap

```css
.box { 
    flex-flow: <flex-direction> || <flex-wrap>; 
}
```

![img](https://img2020.cnblogs.com/blog/480452/202003/480452-20200312214623951-282639907.png)

#### 3.5、justify-content 属性

justify-content 属性定义了项目在主轴上的对齐方式

```css
.box { 
    justify-content: flex-start | flex-end | center | space-between | space-around; 
}
```

> flex-start（默认值）：左对齐

![img](https://img2020.cnblogs.com/blog/480452/202003/480452-20200312214725277-2014365329.png)

> flex-end：右对齐

![img](https://img2020.cnblogs.com/blog/480452/202003/480452-20200312214751454-224263600.png)

> center： 居中

![img](https://img2020.cnblogs.com/blog/480452/202003/480452-20200312214815121-1146495341.png)

> space-between：两端对齐，项目之间的间隔都相等

![img](https://img2020.cnblogs.com/blog/480452/202003/480452-20200312214843763-1058729461.png)

> space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍

![img](https://img2020.cnblogs.com/blog/480452/202003/480452-20200312214907798-1688511894.png)

#### 3.6、align-items 属性

align-items 属性定义项目在交叉轴上如何对齐

```css
.box { 
    align-items: flex-start | flex-end | center | baseline | stretch; 
}
```

> flex-start：交叉轴的起点对齐

![img](https://img2020.cnblogs.com/blog/480452/202003/480452-20200312215004796-928206269.png)

> flex-end：交叉轴的终点对齐

![img](https://img2020.cnblogs.com/blog/480452/202003/480452-20200312215024966-92036232.png)

> center：交叉轴的中点对齐

![img](https://img2020.cnblogs.com/blog/480452/202003/480452-20200312215046471-1930539066.png)

> baseline: 项目的第一行文字的基线对齐

![img](https://img2020.cnblogs.com/blog/480452/202003/480452-20200312215108594-1283628549.png)

> stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度

![img](https://img2020.cnblogs.com/blog/480452/202003/480452-20200312215135529-1529757413.png)

#### 3.7、align-content 属性

align-content 属性定义了多根轴线（多行）在交叉轴上的对齐方式，如果项目只有一根轴线（一行），该属性不起作用：

```css
.box { 
    align-content: flex-start | flex-end | center | space-between | space-around | stretch; 
}
```

> flex-start：交叉轴的起点对齐

![img](https://img2020.cnblogs.com/blog/480452/202003/480452-20200312215255955-504115800.png)

> flex-end：与交叉轴的终点对齐

![img](https://img2020.cnblogs.com/blog/480452/202003/480452-20200312215321705-825921613.png)

> center：与交叉轴的中点对齐

![img](https://img2020.cnblogs.com/blog/480452/202003/480452-20200312215347758-1957069217.png)

> space-between：与交叉轴两端对齐，轴线之间的间隔平均分布

![img](https://img2020.cnblogs.com/blog/480452/202003/480452-20200312215413085-1908343233.png)

> space-around：每根轴线两侧的间隔都相等，所以，轴线之间的间隔比轴线与边框的间隔大一倍

![img](https://img2020.cnblogs.com/blog/480452/202003/480452-20200312215439987-124653214.png)

> stretch（默认值）：轴线占满整个交叉轴

![img](https://img2020.cnblogs.com/blog/480452/202003/480452-20200312215512308-1237760156.png)

## 4、项目的属性

#### 4.1、order 属性

order 属性定义项目的排列顺序，数值越小，排列越靠前，默认为0：

```css
.item { 
    order: <integer>; 
}
```

![img](https://img2020.cnblogs.com/blog/480452/202003/480452-20200312215828784-187902583.png)

#### 4.2、flex-grow 属性

flex-grow 属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大

如果所有项目的 flex-grow 属性都为1，则它们将等分剩余空间（如果有的话）
如果一个项目的 flex-grow 属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍

```css
.item { 
    flex-grow: <number>; /* default 0 */ 
}
```

![img](https://img2020.cnblogs.com/blog/480452/202003/480452-20200312215924027-1478423560.png)

如果有的项目有 flex-grow 属性，有的项目有 width 属性，
有 flex-grow 属性的项目将等分剩余空间

![img](https://img2020.cnblogs.com/blog/480452/202003/480452-20200312215950805-1167640449.png)

#### 4.3、flex-shrink 属性

flex-shrink 属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小

如果所有项目的 flex-shrink 属性都为1，当空间不足时，都将等比例缩小
如果一个项目的 flex-shrink 属性为0，其他项目都为1，则空间不足时，前者不缩小
负值对该属性无效。

```css
.item { 
    flex-shrink: <number>; /* default 1 */ 
}
```

![img](https://img2020.cnblogs.com/blog/480452/202003/480452-20200312220037086-462182237.png)

#### 4.4、flex-basis 属性

flex-basis 属性定义了在分配多余空间之前，项目占据的主轴空间（main size）
浏览器根据这个属性，计算主轴是否有多余空间
它的默认值为auto，即项目的本来大小

```css
.item { 
    flex-basis: <length>; | auto; /* default auto */ 
}
```

![img](https://img2020.cnblogs.com/blog/480452/202003/480452-20200312220115209-775175894.png)

#### 4.5、flex 属性

flex 属性是 flex-grow, flex-shrink 和 flex-basis 的简写，默认值为0 1 auto
后两个属性可选

该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)

```css
.item { 
    flex: none | [ <flex-grow> <flex-shrink>? || <flex-basis> ] 
}
```

![img](https://img2020.cnblogs.com/blog/480452/202003/480452-20200312220213860-579179896.png)

#### 4.6、align-self 属性

align-self 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性
默认值为auto，表示继承父元素的align-items属性，如果没有父元素+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++，则等同于stretch

```css
.item { 
    align-self: auto | flex-start | flex-end | center | baseline | stretch; 
}
```

![img](https://img2020.cnblogs.com/blog/480452/202003/480452-20200312220310747-1937059974.png)



拓展：

https://segmentfault.com/a/1190000008942008