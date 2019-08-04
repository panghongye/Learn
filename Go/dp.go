package dp

import (
	"math"
)

// 输入: n = 12
// 输出: 3
// 解释: 12 = 4 + 4 + 4.

// 输入: n = 13
// 输出: 2
// 解释: 13 = 4 + 9.

func numSquares(n int) int {
	dp := make([]int, n+1)
	for i := range dp {
		dp[i] = i
		for j := 1; i-j*j >= 0; j++ {
			dp[i] = int(math.Min(float64(dp[i]), float64(dp[i-j*j]+1)))
		}
	}
	return dp[n]
}
