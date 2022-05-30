package main

import (
	"errors"
	"fmt"
)

// Traversal of graphs

type Graph = map[int][]int

func pop(array *[]int, index int) (int, error) {
	if index > len(*array) {
		return -1, errors.New("Out of range")
	}
	var value = (*array)[index]
	*array = append((*array)[:index], (*array)[index+1:]...)
	return value, nil
}

func contains(array []int, element int) bool {
	for _, el := range array {
		if element == el {
			return true
		}
	}
	return false
}

func traversal(G Graph, start, mode int) []int {
	// Sprawdzamy czy liczba wierzcholkow odwiedzonych jest rowna liczbie wierzcholkow
	var current int
	var visited, queue []int
	queue = append(queue, start)

	for len(queue) > 0 {
		switch mode {
		case 0:
			current, _ = pop(&queue, 0)
			break
		case 1:
			current, _ = pop(&queue, len(queue)-1)
			break
		}

		visited = append(visited, current)

		for _, neigbour := range G[current] {
			if !contains(visited, neigbour) {
				queue = append(queue, neigbour)
			}
		}
	}
	return visited
}

// ====================================

// Traversal of binary trees

type Node struct {
	value int
	left  *Node
	right *Node
}

func newNode(value int) Node {
	return Node{value: value, left: nil, right: nil}
}

// Depth first search

func inorder(root *Node) []int {
	/*
		1. Traverse the left subtree
		2. Visit the root
		3. Traverse the right subtree
	*/
	if root == nil {
		return []int{}
	}
	var visited = []int{}
	visited = append(visited, inorder(root.left)...)
	visited = append(visited, root.value)
	visited = append(visited, inorder(root.right)...)
	return visited
}

func preorder() {

}

func postorder() {

}

// Breadth-first search

func breadthFirstSearch(root *Node) {
	// var visited []int
	// var queue []*Node
	// queue = append(queue, root)
	// for len(queue) > 0 {

	// }
}

// popNode
func popNode(array *[]*Node, index int) (*Node, error) {
	if index > len(*array) {
		return &Node{}, errors.New("Out of range")
	}
	var value = (*array)[index]
	*array = append((*array)[:index], (*array)[index+1:]...)
	return value, nil
}

// Genereate binary tree
func genereateBinaryTree(n int) *Node {
	var root Node = newNode(1)
	var queue []*Node
	var current *Node
	var i = 2
	queue = append(queue, &root)

	for i < n {
		current, _ = popNode(&queue, 0)
		(*current).left = &Node{value: i}
		(*current).right = &Node{value: i + 1}
		i += 2
		queue = append(queue, (*current).left)
		queue = append(queue, (*current).right)
	}
	return &root
}

func main() {
	var G Graph = make(map[int][]int)
	G[0] = []int{1, 2}
	G[1] = []int{0, 3, 4}
	G[2] = []int{0, 5, 6}
	G[3] = []int{1}
	G[4] = []int{1}
	G[5] = []int{2}
	G[6] = []int{2}

	var visited []int = traversal(G, 0, 0)
	fmt.Println("Kolejnosc przejscia bfs", visited)

	visited = traversal(G, 0, 1)
	fmt.Println("Kolejnosc przejscia bfs", visited)

	fmt.Println()
	root := genereateBinaryTree(10)
	v := inorder(root)
	fmt.Println(v)
}
