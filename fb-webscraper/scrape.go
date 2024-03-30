// https://siongui.github.io/2017/02/17/go-parse-facebook-post-via-goquery/

// url: https://mbasic.facebook.com/datasklubbmasteri?v=timeline
package main

// Hello world example
import (
	"fmt"

	"github.com/PuerkitoBio/goquery"
)

func Parse(url string) (string, error) {
	doc, err := goquery.NewDocument(url)
	if err != nil {
		return "", err
	}

	s := doc.Find("div.hidden_elem > code").First()
	cmt, err := s.Html()
	if err != nil {
		return "", err
	}
	postHtml := cmt[5 : len(cmt)-4]
	return postHtml, nil
}

func main() {
	fmt.Println("Hello, 世界")
}
