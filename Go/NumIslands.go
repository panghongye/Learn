package m

func dfs(grid [][]byte, i, j int) {
	if i < 0 || j < 0 || i >= len(grid) || j >= len(grid[0]) {
		return
	}

	if grid[i][j] == '1' || grid[i][j] == 1 {
		grid[i][j] = 0
		dfs(grid, i-1, j)
		dfs(grid, i+1, j)
		dfs(grid, i, j-1)
		dfs(grid, i, j+1)
	}

}

func NumIslands(grid [][]byte) int {
	if len(grid) == 0 || len(grid[0]) == 0 {
		return 0
	}

	count := 0
	for i := range grid {
		for j := range grid[i] {
			if grid[i][j] == '1' || grid[i][j] == 1 {
				count++
				dfs(grid, i, j)
			}
		}
	}
	return count
}
