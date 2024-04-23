## Node对象节点

- `Node`是一个接口
- 各种类型的`DOM API对象`会从这个接口继承

### 常用属性

1. Node.childNodes

- 只读
- 返回一个包含了该节点所有子节点的实时的`NodeList`
- NodeList是动态变化的. 如果该节点的子节点发生了变化, NodeList对象就会自动更新

2. Node.firstChild

- 只读
- 返回该节点的第一个子节点Node, 如果没有子节点则返回 null

3. Node.lastChild

- 只读
- 返回该节点的最后一个子节点Node, 如果没有子节点则返回 null

4. Node.nextSibling

- 只读
- 返回该节点同级的下一个节点Node, 如果没有则返回 null

5. Node.previousSibling

- 只读
- 返回该节点同级的上一个节点Node, 如果没有则返回 null

6. Node.nodeType

- 只读
- 返回一个与该节点类型对应的无符号短整型的值
- 如
    - `ELEMENT_NODE`: 1
    - `TEXT_NODE`: 3
    - `DOCUMENT_NODE`: 9

### 常用方法



-----

## NodeList

- 节点的集合, 类数组对象, 可以通过`forEach()`来迭代
- 一般情况下, NodeList是一个实时集合, 如果文档中的节点树发生变化, NodeList也会随之变化
- 通常是由属性和方法得到, 如`Node.childNodes`和`document.querySelectorAll()`返回的

### 常用属性

1. NodeList.length

- 返回包含的节点个数

### 常用方法

1. NodeList.item(index: number)

- 返回指定索引的节点
- 索引越界返回 null
- 等效于`NodeList[i]`, 但这种情况越界会返回 undefined

2. NodeList.forEach()

- 遍历Node节点

3. NodeList.keys()

- 返回一个索引值的迭代器

3. NodeList.values()

- 返回一个Node节点的迭代器

3. NodeList.entries()

- 返回一个key/value的迭代器

-----

> 不要尝试使用 for...in 或者 for each...in 来遍历一个 NodeList 对象中的元素
> 因为，如果你把上述两个属性也看成 element 对象的话
> NodeList 对象中的 length 和 item 属性也会被遍历出来
> `for...of`循环将会正确的遍历NodeList对象

-----

## Element

- 最通用的基类
- Document 中的所有元素对象（即表示元素的对象）都继承自它

### 常用实例属性

1. Element.attributes

- 只读
- 返回一个`NamedNodeMap`对象
- 其中包含相应 HTML 元素的指定属性

2. Element.classList

- 只读
- 返回该元素包含的所有class属性，是一个`DOMTokenList`

3. Element.className

- 返回一个字符串
- 表示这个元素的类
- 可以通过 `Element.className = 'xxx'` 来修改

4. Element.innerHTML

- 返回一个字符串
- 表示元素内容标记
- 可以通过 `Element.innerHTML = 'xxx'` 来修改

5. Element.children

- 只读
- 返回此元素的子元素
- 一个`HTMLCollection`集合

6. Element.firstElementChild

- 只读
- 返回此元素的第一个子元素, 没有则返回null

7. Element.lastElementChild

- 只读
- 返回此元素的最后一个子元素, 没有则返回null

8. Element.nextElementSibling

- 只读
- 一个 Element, 树中`紧跟`给定元素的元素
- 如果没有同级元素, 则返回null

9. Element.previousElementSibling

- 只读
- 一个 Element, 树中`紧靠`给定元素的元素
- 如果没有同级元素, 则返回null

### 常用实例方法

1. Element.after(Node | string)

- 在 Element `父节点的子节点`列表中插入一组 Node 对象或字符串
- 位于 Element 之后

2. Element.before(Node | string)

- 在 Element `父节点的子节点`列表中插入一组 Node 对象或字符串
- 位于 Element 之前

3. Element.append(Node | string)

- 在元素的最后一个子元素后插入一组 Node 对象或字符串
- 上面1.2都是元素的同级, 这个是向元素里面插入

4. Element.prepend(Node | string)

- 在元素的第一个子元素之前插入一组 Node 对象或字符串

5. Element.closest(selectors)

- 返回 Element 当前元素（或当前元素本身）最接近的祖先
- 且与参数中给定的选择器匹配
- 没找到则返回 null

6. Element.querySelector()

- 返回相对于元素符合指定选择器字符串的第一个 Node

7. Element.querySelectorAll()

- 返回 NodeList 中相对于元素符合指定选择器字符串的节点

8. Element.getElementsByClassName / getElementsByTagName

- 返回符合规则的所有后代元素

9. Element.hasAttribute(string)

- 返回一个boolean值
- 表示元素是否具有指定属性

10. Element.getAttribute(string)

- 从当前节点读取`指定属性`的值
- 返回字符串形式

11. Element.removeAttribute(string)

- 从当前节点删除指定属性

12. Element.remove()

- 从父元素的子元素列表中删除元素

13. Element.setAttribute(name, value)

- 用于设置指定元素上的某个属性值
- 如果属性已经存在, 则更新该值
- 否则, 使用指定的名称和值添加一个新的属性


