package com.suppercoder.java.formdesigner.common.component.tree.model;

/**
 * Created by chenxing on 2017-5-15.
 */
public class TreeNode {

    int id; //节点ID
    int pId;  //父节点ID

    public TreeNode() {
    }

    public TreeNode(int id, int pId){
        this.id = id;
        this.pId = pId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getpId() {
        return pId;
    }

    public void setpId(int pId) {
        this.pId = pId;
    }
}
