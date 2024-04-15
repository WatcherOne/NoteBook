- 给元素设置外边框圆角
- 即使元素没有边框，圆角也可以用到 background 上，即生效

-----

```css
border-radius: 10px 10px 10% 10%;
/* border-radius是将下面4个属性简写一个属性了 */
border-top-left-radius: 10px;
border-top-right-radius: 10px;
border-bottom-left-radius: 10%;
border-bottom-right-radius: 10%;
/* 值为 <length> 或 <percentage> */
```

-----

### **参数详解**

    - 圆角就是 以某一个角为起点, 以水平40px, 垂直40px的点为圆心, 40px为半径画的圆
    - 第一个参数是水平半径, 第二个参数是垂直半径; 只有一个参数则表示水平垂直半径相同
    - 如果第一个与第二个不同, 则是以 第一个参数为: `水平半长轴` 第二参数为: `垂直半长轴` 画椭圆
    - 值不能为负值
    - 如果为百分比, 则水平半轴相对于盒模型的宽度; 垂直半轴相对于盒模型的高度
    - 如果值超过最大值时，后面有解释

> **border-top-left-radius**

- 设置元素`左上角`的圆角效果

![1.png]

> **border-top-right-radius**

- 设置元素`右上角`的圆角效果
- 道理同理就不作图了，位置在右上角

> **border-bottom-left-radius**

- 设置元素`左下角`的圆角效果
- 道理同理就不作图了，位置在左下角

> **border-bottom-right-radius**

- 设置元素`右下角`的圆角效果
- 道理同理就不作图了，位置在右下角

-----

### **参数简写规则**

- 值只能为 length 或 percentage
- `/` 表示前面的为 水平半径; 后面的为 垂直半径
- 简写规则类似于 `margin` 或 `padding` 的简写

> 一个参数

```css
border-radius: 30px;
/* 表示 4个角 都是一样的 */
/* 以 水平半径30px，垂直半径30px 作圆角 */
```

> 两个参数

```css
border-radius: 30px 20px;
/* 表示 左上角 + 右下角 都是 以 30px 为‘水平/垂直’半径 作圆 */
/* 表示 右上角 + 左下角 都是 以 20px 为’水平/垂直‘半径 作圆 */
```

> 三个参数

```css
border-radius: 30px 20px 40px;
/* 表示 左上角 都是 以 30px 为‘水平/垂直’半径 作圆 */
/* 表示 右上角 + 左下角 都是 以 20px 为’水平/垂直‘半径 作圆 */
/* 表示 右下角 都是 以 40px 为’水平/垂直‘半径 作圆 */
```

> 四个参数

```css
border-radius: 30px 20px 40px 50px;
/* 表示分别 按 左上角, 右上角, 右下角, 左下角 来依次以 不同值 为半径作圆角 */
```

> 两个参数 + /

```css
border-radius: 30px / 20px;
/* 表示 4个角 相同 */
/* 以 水平半径30px，垂直半径20px 作圆角 */
```

> 三个参数 + /

```css
border-radius: 20px 30px / 40px;
/* 记住一点: / 前面是水平的，后面是垂直的 */
/* 先看后面即 都是以 垂直半径 40px 作圆角 */
/* 看前面 两个参数 说明是符合 两个参数的规则: 左上角和右下角 相同, 右上角与左下角相同 */
/* 前者以 20px 作为水平半径，后者以 30px 作为垂直半径 */
```

```css
border-radius: 20px / 30px 40px;
/* 跟上面差不多方式 */
/* 可以得出: 都是以水平半径为 20px 作圆角 */
/* 左上角和右下角 以 30px 作垂直半径  左下角和右上角 以 40px 作垂直半径 */
```

> 四个参数 + /

```css
border-raiuds: 20% 30% / 10% 40%;
/* 其实也差不多: 就是先看 / 前面 */
/* 前面 20% 30% 说明两种水平半径 */
/* 左上角: 20% 10% */
/* 右上角: 30% 40% */
/* 右下角: 20% 10% */
/* 左下角: 30% 40% */
```

```css
border-radius: 10px / 20px 30px 40px;
/* 左上角: 10px 20px */
/* 右上角: 10px 30px */
/* 右下角: 10px 40px */
/* 左下角: 10px 30px */
```

- 可以思考一下下面的
- border-radius: 10px 20px 30px / 40px;
- border-radius: 10px 20px 30px 40px / 20px 10px 40px 30px;

-----

### **参数值详解**

- 属性参数值没有负值，可以理解为半径没有负值
- 设置 border-top-left-radius: 100% 后, 可见用边长为半径构建圆形
- 圆形于边框的交集，形成圆角
- 添加设置 border-top-right-radius: 100%后，可见其效果为：用边长的一半为半径构建圆形

![2.png]

- `重合曲线`: 如果两个相邻角的半径和超过了对应的盒子的边的长度，那么浏览器要重新计算保证它们不会重合
- 设置一个圆角是可以的，但多个就会出现重合问题，建议使用 border-radius = 50% 来避免浏览器不必要的计算

> 元素对布局的影响跟没变成圆角前的一样，这是没有改变的
> 影响的是变成圆角的后元素的`可点击区域`

> 当没有边框时上面说到也是有圆角的，作用在 background 上，当只有边框时如下

```css
.left {
    border-top: 50px solid red;
    border-left: 50px solid yellow;
}
.right {
    border-top: 50px solid red;
    border-left: 50px solid yellow;
    border-top-left-radius: 100%;
}
```

![3.png]
