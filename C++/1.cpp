#include <iostream>
#include <ctime>

using namespace std;

void fn()
{
    // 基于当前系统的当前日期/时间
    time_t now = time(0);
    // 把 now 转换为字符串形式
    char *dt = ctime(&now);
    cout << "本地日期和时间：" << dt << endl;
    fn();
}

int main()
{
    fn();
}