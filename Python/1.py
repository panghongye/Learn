# coding=utf8
import numpy as np
from matplotlib import pyplot as plt

#  f(-x)= -f(x) 是奇函数
#  f(-x)= f(x)  是偶函数


x = np.arange(-100, 100)
y = -1/x
plt.plot(x, y)
plt.show()
