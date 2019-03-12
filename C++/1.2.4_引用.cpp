#include <iostream>
using namespace std;

int main()
{
    int x = 56;
    int &x1 = x;
    x1 = 4;
    cout << "?? " << *&x;
}