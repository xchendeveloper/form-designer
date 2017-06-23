package com.suppercoder.java.formdesigner.common.component.tree;


import com.suppercoder.java.formdesigner.common.component.tree.model.Node;
import com.suppercoder.java.formdesigner.common.component.tree.model.TreeNode;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by chenxing on 2017-5-15.
 */
public class TreeService<T extends TreeNode> {

    //===================基本方法开始===================

    /**
     * 通过dataList 生成树
     *
     * @param dataList
     * @return
     */
    public Node<T> generalTree(List<T> dataList) {
        ;

        Node<T> root = new Node<T>(null, new ArrayList<Node<T>>());
        List<Node<T>> nodeList = generalNodeList(dataList);
        for (Node<T> node : nodeList) {
            int parentId = node.getData().getpId();
            int count = 0;
            for (Node<T> node1 : nodeList) {
                if (node1.getData().getId() == parentId) {
                    count++;
                    node1.getSubNodeList().add(node);
                    node.setParentNode(node1);
                    break;
                }
            }
            if (count == 0) {
                //是根节点
                root.getSubNodeList().add(node);
            }
        }

        if (root.getSubNodeList().size() == 1) {
            //只有一个根节点
            return root.getSubNodeList().get(0);
        }

        return root;
    }

    /**
     * 将树转为 Node List
     *
     * @param tree
     * @param nodeList
     * @return
     */
    public List<Node<T>> treeToNodeList(Node<T> tree, List<Node<T>> nodeList) {
        for (Node<T> node : tree.getSubNodeList()) {
            nodeList.add(node);
            if (node.getSubNodeList().size() > 0) {
                treeToNodeList(node, nodeList);
            }
        }
        nodeList.add(tree);
        return nodeList;
    }

    /**
     * 根据id查找树中的node
     *
     * @param tree 树实体
     * @param id   要搜索的ID
     * @return
     */
    public Node<T> getNodeById(Node<T> tree, int id) {
        if (tree != null && tree.getData() != null && tree.getData().getId() == id) {
            return tree;
        }
        for (Node<T> node : tree.getSubNodeList()) {
            Node<T> returnVal = getNodeById(node, id);
            if (returnVal == null) {
                continue;
            }
            return returnVal;
        }
        return null;
    }

    /**
     * 获得指定节点下的子节点
     *
     * @param node        指定的节点
     * @param recursion   是否递归获取（ true 所有子节点，false 直接子节点 ）
     * @param includeSelf 返回列表中是否包含自身 （ true 包含自身 false 不包含自身）
     * @return
     */
    public List<Node<T>> getSubNodeList(Node<T> node, boolean recursion, boolean includeSelf) {
        List<Node<T>> subNodeList = new ArrayList<Node<T>>();
        if (recursion) {
            getSubNodeListRecursion(node, subNodeList);
            if (!includeSelf && subNodeList.size() > 0) {
                subNodeList.remove(0);
            }
            return subNodeList;
        }

        return node.getSubNodeList();

    }

    /**
     * 获取指定节点下子节点Id组成的列表
     *
     * @param node
     * @param recursion
     * @param includeSelf
     * @return
     */
    public List<Integer> getSubNodeIdList(Node<T> node, boolean recursion, boolean includeSelf) {
        List<Integer> subNodeList = new ArrayList<Integer>();
        if (recursion) {
            getSubNodeIdListRecursion(node, subNodeList);
            if (!includeSelf && subNodeList.size() > 0) {
                subNodeList.remove(0);
            }
            return subNodeList;
        }

        for (Node<T> nd : node.getSubNodeList()) {
            subNodeList.add(nd.getData().getId());
        }

        return subNodeList;
    }


    //===================基本方法结束===================

    //===================扩展方法开始===================

    /**
     * 已知树，查找该树下指定节点的子节点
     *
     * @param tree        树实体
     * @param nodeId      要查找的父节点ID
     * @param recursion   是否递归查找
     * @param includeSelf 是否包含自身
     * @return
     */
    public List<Node<T>> getTreeSubNodeListById(Node<T> tree, int nodeId, boolean recursion, boolean includeSelf) {
        Node<T> parentNode = getNodeById(tree, nodeId);
        return getSubNodeList(parentNode, recursion, includeSelf);
    }

    /**
     * 已知树，查找该树下指定节点的子节点 Id 组成的列表
     *
     * @param tree
     * @param nodeId
     * @param recursion
     * @param includeSelf
     * @return
     */
    public List<Integer> getTreeSubNodeIdListById(Node<T> tree, int nodeId, boolean recursion, boolean includeSelf) {
        Node<T> parentNode = getNodeById(tree, nodeId);
        return getSubNodeIdList(parentNode, recursion, includeSelf);
    }


    //===================扩展方法结束===================


    //===================辅助方法开始===================

    /**
     * 递归获取指定节点下所有子节点（包括自己）
     *
     * @param node   指定的节点
     * @param result 存放的结果集
     */
    private void getSubNodeListRecursion(Node<T> node, List<Node<T>> result) {
        if (node != null) {
            result.add(node);
            for (Node<T> subNode : node.getSubNodeList()) {
                getSubNodeListRecursion(subNode, result);
            }
        }
    }

    /**
     * 递归获取指定节点下所有子节点的 Id 组成的列表（包括自己）
     *
     * @param node
     * @param result
     */
    private void getSubNodeIdListRecursion(Node<T> node, List<Integer> result) {
        if (node != null) {
            result.add(node.getData().getId());
            for (Node<T> subNode : node.getSubNodeList()) {
                getSubNodeIdListRecursion(subNode, result);
            }
        }
    }

    /**
     * 将列表组装为node列表
     *
     * @param dataList
     * @return
     */
    private List<Node<T>> generalNodeList(List<T> dataList) {

        List<Node<T>> nl = new ArrayList<Node<T>>();
        for (T data : dataList) {
            Node<T> node = new Node<T>(data, new ArrayList<Node<T>>());
            nl.add(node);
        }
        return nl;

    }

    //===================辅助方法结束===================


    //===================测试开始===================

    public static void main(String[] args) {

        class Org extends TreeNode {
            public Org() {
            }

            public Org(int id, int pId, String name) {
                super(id, pId);
                this.name = name;
            }

            public String name;

            public String getName() {
                return name;
            }

            public void setName(String name) {
                this.name = name;
            }
        }

        List<Org> list = new ArrayList<Org>();

        Org org = new Org(1, 0, "永中股份有限公司");
        Org org2 = new Org(2, 1, "无锡分公司");
        Org org3 = new Org(3, 1, "北京分公司");
        Org org4 = new Org(4, 2, "财务部");
        Org org5 = new Org(5, 2, "人事部");
        Org org6 = new Org(6, 2, "技术部");
        Org org7 = new Org(7, 3, "销售部");

        list.add(org);
        list.add(org3);
        list.add(org2);
        list.add(org4);
        list.add(org7);
        list.add(org6);
        list.add(org5);

        TreeService<Org> service = new TreeService<Org>();
        Node<Org> tree = service.generalTree(list);
        /*List<Node<Org>> list1 = service.treeToNodeList(tree,new ArrayList<Node<Org>>());
        for(Node<Org> node : list1){
            System.out.println(node.getData().getName());
        }*/

        /*Node<Org> node = service.getNodeById(tree,4);
        System.out.println(node.getData().getName());*/

        List<Node<Org>> list1 = service.getTreeSubNodeListById(tree, 1, false, false);
        for (Node<Org> node : list1) {
            System.out.println(node.getData().getName());
        }

    }

    //===================测试结束===================


}
