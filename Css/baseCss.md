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


