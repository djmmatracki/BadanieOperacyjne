import unittest
import numpy as np
from procedury import reduce_matrix, cross_zeros, zeros_independent


class TestProcedures(unittest.TestCase):
    def setUp(self) -> None:
        n = 5
        self.matrix = np.array([
            [1, 8, 3, 4, 1],
            [6, 6, 9, 3, 5],
            [2, 1, 7, 8, 1],
            [4, 3, 5, 8, 3],
            [9, 3, 4, 1, 6],
            ])
        
    def test_reduce_matrix(self):
        M = reduce_matrix(self.matrix)

        # self.assertTrue(M == np.array([
        #     [0, 7, 0, 3, 0],
        #     [3, 3, 4, 0, 2],
        #     [1, 0, 4, 7, 0],
        #     [1, 0, 0, 5, 0],
        #     [8, 2, 1, 0, 5],
        # ]))


    def test_zeros_independent(self):
        pass


    def test_cross_zeros(self):
        pass

if __name__ == "__main__":
    unittest.main()