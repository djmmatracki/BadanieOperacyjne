package main

import (
	"math"
)

type Graph = map[int][]int

func DPA(G Graph, s int) {
	/* Algorytm znajdujacy minimalne drzewo rozpinajace */
	var A, Q []int
	var alfa, beta []float64
	// var suma = 0
	var i = 0
	var n = len(G)
	// Fill alpha and beta
	for i < n {
		alfa = append(alfa, 0)
		beta = append(beta, math.Inf(1))
		i++
	}
	// Fill Q
	for key := range G {
		Q = append(Q, key)
	}
	beta[s] = 0
	Q = append(Q[:s], Q[s+1:]...)
	u := s
	for len(Q) > 0 {
		for neigbour
	}
}

func main() {
	var G Graph = make(map[int][]int)
	G[1] = []int{2, 5}
	G[2] = []int{1, 5, 3}
	G[3] = []int{2, 4}
	G[4] = []int{6, 5, 3}
	G[5] = []int{4, 2, 1}
	G[6] = []int{4}
	DPA(G)
}
