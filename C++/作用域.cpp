#include <iostream>
using namespace std;

int g = 99; // 全局变量声明

int func(); // 函数声明

int main()
{
    int g = 10; // 局部变量声明
    cout << "局部" << g << endl;
    cout << "全局" << ::g << endl;
    int kk = func();
    cout << "全局" << kk;
    return 0;
}

// 函数定义
int func()
{
    return g;
}