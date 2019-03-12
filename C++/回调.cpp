#include <iostream>
using namespace std;

void a(int(fn)())
{
    fn();
}

int b()
{
    cout << "sdfsdfsdfsdf";
    printf("pppppppppppppp");
    return 1;
}

int main()
{
    a(b);
    return 0;
}