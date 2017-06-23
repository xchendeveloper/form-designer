# 树组件说明 

## 2017-5-15 创建
1. 通过 dataList 生成树 ,要求T继承TreeNode
```java
/**
    * 通过dataList 生成树
    * @param dataList
    * @return
    */
Node<T> generalTree(List<T> dataList) 
```

2. 将tree转换为List,
```java
/**
     * 将树转为 Node List
     * @param tree
     * @param nodeList
     * @return
     */
List<Node<T>> treeToNodeList(Node<T> tree, List<Node<T>> nodeList)
```
    
3. 根据id查找树中的node
```java
/**
     *  根据id查找树中的node
     * @param tree 树实体
     * @param id 要搜索的ID
     * @return
     */
Node<T> getNodeById(Node<T> tree , int id )
```
  
4. 获得指定节点下的子节点
```java
/**
     * 获得指定节点下的子节点
     * @param node 指定的节点
     * @param recursion 是否递归获取（ true 所有子节点，false 直接子节点 ）
     * @param includeSelf 返回列表中是否包含自身 （ true 包含自身 false 不包含自身）
     * @return
     */
List<Node<T>> getSubNodeList(Node<T> node, boolean recursion,boolean includeSelf)
```

5. 已知树，查找该树下指定节点的子节点
```java
 /**
     * 已知树，查找该树下指定节点的子节点
     * @param tree 树实体
     * @param id 要查找的父节点ID
     * @param recursion 是否递归查找
     * @param includeSelf 是否包含自身
     * @return
     */
List<Node<T>> getSubNodeListById(Node<T> tree, int id ,boolean recursion,boolean includeSelf)
```
    