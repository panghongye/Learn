#include <iostream>
#include <math.h>
using namespace std;
int main()
{
    cout << "请输入半菱形高度n" << endl;
    int n = 10;
    // cin >> n;
    for (int i = 0; i < 2 * n + 1; i++)
    {
        for (int j = 0; j < 2 * n + 1; j++)
        {
            if (abs(i - n) + abs(j - n) == n)
                cout << "*";
            else
                cout << " ";
        }
        cout << endl;
    }
}