package main

import (
	"fmt"
	"math"
)

type cost func(int) int

func min(values ...int) int {
	var minimal = int(math.Inf(1))

	for _, val := range values {
		if val < minimal {
			minimal = val
		}
	}
	return minimal
}

func max(values ...int) int {
	var maximum = int(math.Inf(-1))

	for _, val := range values {
		if val > maximum {
			maximum = val
		}
	}
	return maximum
}

func zeros(array_ptr *[][]int, n, m int) {
	for i := 0; i < n; i++ {
		*array_ptr = append(*array_ptr, make([]int, m))
	}
}

func production(storage_cost, cost, products []int, max_storage, min_storage, period, initial, final int) {
	/*
		storage_cost[y] - koszt przechowywania y produktow
		cost[x] - koszt produkcji x produktow
		storage_cost[] - ilosc miejsca dostepnego w magazynie
		period - ilosc miesiecy przez ktore musimy dostarczac produkty
	*/

	var f_col int = 2
	var x_col int = 1
	var production_num int = len(cost) - 1
	var value, y, etap int

	var table [][]int
	zeros(&table, max_storage+1, period*2+1)
	etap = period - 1

	for f_col < period*2+1 {
		y = 0
		for y < max_storage+1 {

			minimal := int(math.Inf(1))
			items := 0

			for x := max(products[etap]-y, 0, min_storage); x <= min(production_num, max_storage+products[etap]); x++ {

				if x+y-products[etap] < 6 {
					value = cost[x] + storage_cost[x+y-products[etap]] + table[x+y-products[etap]][f_col-2]
					if minimal > value {
						minimal = value
						items = x
					}
				}
			}
			if minimal != int(math.Inf(1)) {
				table[y][f_col] = minimal
			} else {
				table[y][f_col] = -1
			}
			table[y][x_col] = items
			y++
		}
		f_col += 2
		x_col += 2
		etap--
	}

	fmt.Println("Tabela z wartosciami: ")
	for _, val := range table {
		fmt.Println(val)
	}
	fmt.Println("Minimalny koszt realizacji:", table[initial][period*2])
	var result = make([]int, period)
	var k int = 0
	var row int = initial
	x_col = period*2 - 1

	for k < period {
		result[k] = table[row][x_col]
		row = max(table[row][x_col]+row-products[k], 0)
		x_col -= 2
		k++
	}
	fmt.Println(result)
}

func main() {
	// storage_cost, cost, products []int, max_storage, min_storage, period, initial, final int
	var storage_cost = []int{0, 0, 1, 2, 2, 4}
	var cost = []int{2, 8, 12, 15, 17, 20}
	var products = []int{4, 2, 6, 5}
	production(storage_cost, cost, products, 5, 2, 4, 0, 0)
}
