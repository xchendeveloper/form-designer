package com.suppercoder.java.formdesigner.common.component.tree.model;

import java.util.List;

/**
 * Created by chenxing on 2017-5-15.
 */
public class Node<T extends TreeNode> {

    public T data;
    private Node<T> parentNode;
    private List<Node<T>> subNodeList;

    public Node(T data,List<Node<T>> subNodeList){
        this.data = data;
        this.subNodeList = subNodeList;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public Node<T> getParentNode() {
        return parentNode;
    }

    public void setParentNode(Node<T> parentNode) {
        this.parentNode = parentNode;
    }

    public List<Node<T>> getSubNodeList() {
        return subNodeList;
    }

    public void setSubNodeList(List<Node<T>> subNodeList) {
        this.subNodeList = subNodeList;
    }
}
