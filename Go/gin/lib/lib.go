package lib

import "github.com/gin-gonic/gin"

func SendErr(err error, c *gin.Context) bool {
	if err != nil {
		c.JSON(500, gin.H{
			"err": err.Error(),
		})
		return true
	}
	return false
}
