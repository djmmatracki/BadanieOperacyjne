import numpy as np


# Redukcja macierzy, schemat ogolny algorytmu
def reduce_matrix(M):
    result = M.copy()
    for row in result:
        row -= min(row)

    result -= np.min(result, axis=0)
    return result
    



# Algorytm wyznaczenia zer niezaleznych
def zeros_independent():
    pass



# Algorytm wykreslania zer macierzy minimalna liczb linii
def cross_zeros():
    pass
