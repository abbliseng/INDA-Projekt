package actions

import (
	"fmt"

	"github.com/gin-gonic/gin"
	// "encoding/json"
)

func Drinks(c *gin.Context) {

	data := "This is cool drink data!"

	fmt.Println("Drinks action called")

	c.JSON(200, gin.H{
		"data": data,
	})
}
