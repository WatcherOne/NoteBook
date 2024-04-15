- 给元素设置阴影效果
- 可以给同一个元素设置`多个阴影`效果，属性值用`逗号`隔开
- 多个阴影效果时，第一个阴影在最上面，而元素本身肯定是最上面的

-----

```css
box-shadow: inset offset-x offset-y blur-radius spread-radius color;
```
[inset](#user-content-inset): &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;可选, 设置关键词后为内阴影 <br/>
[offset-x](#user-content-offsetX): &nbsp;必填, 阴影的水平偏移量, 允许负值 <br/>
[offset-y](#user-content-offsetY): &nbsp;必填, 阴影的垂直偏移量, 允许负值 <br/>
[blur-](#user-content-blurRadius): &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;可选, 阴影的模糊程度, 默认为0, 不允许负值 <br/>
[spread-](#user-content-spreadRadius): &nbsp;可选, 阴影的大小, 正值扩大,负值缩小,默认为0<br/>
[color](#user-content-color): &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;可选, 阴影的颜色

-----

### <span id="1">参数详解</span>

> <span id="user-content-inset">**inset**</span>

- 设置阴影在边框`内部`还是`外部`，默认不指定则在元素外，阴影向外扩散
- 设置了 `inset` 关键词，则阴影落在盒子内部，看起来像是内容被压低了
- inset 会使阴影会在边框之内（即使是透明边框）、背景之上、内容之下

![1.png]

![2.png]

> <span id="user-content-offsetX">**offset-x**</span>

- 设置阴影`水平偏移量`
- 正值阴影在右边，负值阴影在左边，0的时候阴影中盒子后面，看不见的
- 如果是内阴影，正值阴影从内部的左边开始，负值从内部的右边开始

> <span id="user-content-offsetY">**offset-y**</span>

- 设置阴影`垂直偏移量`
- 正值阴影在下边，负值阴影在上边，0同理
- 如果是外阴影，正值阴影从内部的上边开始，负值从内部的下边开始

> <span id="user-content-blurRadius">**blur-radius**</span>

- 设置阴影的`模糊程度`
- 值越大，模糊面积越大，阴影就越大越淡。不能为负值。默认为 0，此时阴影边缘锐利
- 对于长而直的阴影边缘，它会创建一个过渡颜色用于模糊 以阴影边缘为中心、模糊半径为半径的局域，过渡颜色的范围在完整的阴影颜色到它最外面的终点的透明之间
- 由下图可见模糊程度越大，扩散得越宽；的确是一个渐变地过渡效果

![3.png]

> <span id="user-content-spreadRadius">**spread-radius**</span>

- 设置阴影的`扩大与缩小`
- 默认0，此时阴影与元素同样大；正值阴影扩大，负值阴影收缩
- 内阴影时，即内部的扩大缩小，一般取 <`length`> 值（px单位值...）

![7.png]

> <span id="user-content-color">**color**</span>

- 设置阴影的`颜色`
- 没有指定则safari: 透明/chrome: 黑色，通常是 <`color`> 值

----

### <span id="2">参数个数详解</span>

- 至少两个参数，inset 与 color 是可选的
- 阴影默认: 外阴影 + 黑色

```text
两个参数: 会被当做 ==> 水平偏移 + 垂直偏移
三个参数: 会被当做 ==> 水平偏移 + 垂直偏移 + 阴影模糊
四个参数: 会被当做 ==> 水平偏移 + 垂直偏移 + 阴影模糊 + 阴影扩缩
五个参数/六个参数: 就是包含 inset 与 color 的可选值
```

----

### <span id="3">阴影的影响因素</span>

> **box-shadow本身是由元素产生，是作为元素本身的阴影来投射的，固大小原本与元素相同（除了手动去扩大缩小）**

1. **border (边框)**

    - 边框本身不作为阴影包含的部分
    - 但如果设置 box-sizing: border-box; 时，边框的宽度 将影响阴影的大小
    - 其实实际上是因为影响了 `元素的大小` 才影响了阴影的大小！

2. **border-radius（圆角）**

    - 设置元素本身的圆角 阴影也会圆角

----

### <span id="4">**多个阴影**</span>

- 元素可以设置`多个阴影`，通过`逗号隔开`
- 多个阴影的层级，`先定义先展示`
- 阴影本身不能 翻转，旋转；只能作类似于‘平移’的操作

![4.png]

----

### <span id="5">**阴影的应用**</span>

> **两个圆相交**

```css
.div {
    width: 100px;
    height: 100px;
    background-color: lightblue;
    border-radius: 50%;
    box-shadow: inset 65px 0 0 0 yellow,
                65px 0 0 0 red;
}
```

![5.png]

> **多个正方形**

```css
div {
    width: 50px;
    height: 50px;
    background-color: lightblue;
    box-shadow: 100px 0 0 0 lightblue,
                0 100px 0 0 lightblue,
                100px 100px 0 0 lightblue;
}
```

![6.png]

> **圆环靶子**

```css
div {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: lightblue;
    box-shadow: 0 0 0 10px yellow,
                0 0 0 20px gray,
                0 0 0 30px red;
}
```

![8.png]
