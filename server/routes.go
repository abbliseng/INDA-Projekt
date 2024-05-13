package server

import (
	"net/http"

	"github.com/gin-gonic/gin"
	cors "github.com/rs/cors/wrapper/gin"

	actions "github.com/abbliseng/INDA-Projekt/server/actions"
)

func InitRoutes(r *gin.RouterGroup) {
	r.Use(cors.New(cors.Options{}))

	r.GET("/ping", func(c *gin.Context) { c.String(http.StatusOK, "pong") })

	r.GET("/drinks", actions.Drinks)

}
