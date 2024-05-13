package actions

import (
	"github.com/gin-gonic/gin"
	// "fmt"
	// "encoding/json"
)

func Drinks(c *gin.Context) {

	data := "This is cool drink data!"

	c.JSON(200, gin.H{
		"data": data,
	})
}
