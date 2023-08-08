### CSS题库

1. 盒子模型的理解？

    - 当对一个文档进行布局时，浏览器的渲染引擎会根据标准之一的CSS基础框盒模型
    - 将所有元素表示为一个个矩形的盒子
    - 标准包括：标准模型 + 怪异模型
    - 盒子由：content + padding + border + margin 组成
    - padding：内边距，清除内容周围的区域，取值不能为负值！
    - margin:  外边距，在元素外创建额外的空白，可以为负值！

    - 标准模型：W3C标准盒子模型，浏览器默认的盒子模型
        A. 盒子总宽度 = width + padding + border + margin
        B. 盒子总高度 = height + padding + border + margin

    - 怪异模型：IE怪异盒子模型
        A. 盒子总宽度 = width + margin
        B. 盒子总高度 = height + margin
        也就是说 width/height 包含了 padding 和 border 值

    - box-sizing 属性定义了引擎应该如何计算一个元素的总宽度和总高度
        content-box：默认值，元素 width/height 不包含 padding,border 与标准盒子模型表现一致
        border-box：元素 width/height 包含 padding,border 与怪异盒子模型表现一致
        inherit：指定 box-sizing 属性值 从父元素继承


2. BFC的理解？

    - Block Formatting Context: 块级格式化上下文，它是页面上的一块渲染区域，并且有一套自己的渲染规则
        · 内部的盒子会在垂直方向上一个接一个的放置
        · 对于同一个BFC的俩个相邻的盒子的margin会发生重叠，与方向无关
        · 每个元素的左外边距与包含块的左边界相接触（从左到右）
        · BFC区域不会与float的元素区域重叠
        · 计算BFC的高度时，浮动子元素也参与计算
        · BFC就是页面上一个隔离的独立容器，容器内的子元素不会影响到外面的元素！
    - BFC 目的就是形成一个相对于外界完全独立的空间，让内部子元素不会影响到外部的元素

    - 触发条件
        A...

    - 应用场景
        A. 防止 margin 重叠（塌陷）
        B. 清除内部浮动（在BFC中计算高度时，浮动元素也会参入则浮动元素就不会重叠）

3. 响应式布局的理解
4. 水平垂直居中的方法有哪些？
5. 几栏布局，固定与自适应

6. CSS选择器

    - CSS选择器是 CSS规则的第一部分
        · ID选择器
        · 类选择器
        · 标签选择器
        · 后代选择器（#box div），选择ID为box元素的内部所有div元素
        · 子选择器（#box > div），选择父元素为ID为box元素的所有div元素（只有父子关系）
        · 相邻同胞选择器（#box + .two），选择紧接ID为box元素之后的所有 .two 元素
        · 群组选择器（div,p），选择div，p的所有元素
    - 伪类选择器
        · :link         选择未被访问的链接
        · :visited      选择已被访问的链接
        · :active       选择活动链接
        · :hover        选择鼠标指针浮动在上面的元素
        · :focus        选择具有焦点的元素
        · :first-child  选择父元素的首个子元素
    - 伪元素选择器
        · :first-letter 选择指定选择器的首字母（包括中文）
        · :first-line   选择指定选择器的首行
        · :before       选择器在被选元素的内容前面插入内容
        · :after        选择器在被选元素的内容后面插入内容
    - 属性选择器
        · [attribute]          选择带有 attribute 属性的元素
        · [attribute=value]    选择所有使用 attribute=value 的元素
        · [attribute~=value]   选择 attribute 属性包含 value 的元素
        · [attribute|=value]   选择 attribute 属性以 value 开头的元素



