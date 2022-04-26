import numpy as np


# Redukcja macierzy, schemat ogolny algorytmu
def reduce_matrix(M):
    M -= np.min(M, axis=1)
    return M - np.min(M, axis=0)
    


# Algorytm wyznaczenia zer niezaleznych
def zeros_independent():
    pass



# Algorytm wykreslania zer macierzy minimalna liczb linii
def cross_zeros():
    pass


if __name__ == "__main__":
    n = 5
    M = np.array([
        [1, 8, 3, 4, 1],
        [6, 6, 9, 3, 5],
        [2, 1, 7, 8, 1],
        [4, 3, 5, 8, 3],
        [9, 3, 4, 1, 6],
        ])
    print(reduce_matrix(M))