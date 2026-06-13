package main

import (
	"encoding/json"
	"io"
	"log"
"os"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

type UploadResponse struct {
	Success bool        `json:"success"`
	Data    interface{} `json:"data,omitempty"`
	Error   string      `json:"error,omitempty"`
}

func main() {
	app := fiber.New()
	frontendURL := os.Getenv("FRONTEND_URL")

		app.Use(cors.New(cors.Config{
		AllowOrigins: frontendURL,
		AllowHeaders: "Origin, Content-Type, Accept",
	}))


	app.Get("/", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"status": "ok",
		})
	})

	app.Post("/api/upload", UploadJSON)

	log.Println("Server running on :3000")
	log.Fatal(app.Listen(":3000"))
}

func UploadJSON(c *fiber.Ctx) error {

	file, err := c.FormFile("file")
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(UploadResponse{
			Success: false,
			Error:   "file is required",
		})
	}

	// 1 MB limit
	const maxSize = 1 * 1024 * 1024

	if file.Size > maxSize {
		return c.Status(fiber.StatusBadRequest).JSON(UploadResponse{
			Success: false,
			Error:   "file size exceeds 1MB limit",
		})
	}

	f, err := file.Open()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(UploadResponse{
			Success: false,
			Error:   "unable to open file",
		})
	}
	defer f.Close()

	content, err := io.ReadAll(f)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(UploadResponse{
			Success: false,
			Error:   "unable to read file",
		})
	}

	var jsonData interface{}

	if err := json.Unmarshal(content, &jsonData); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(UploadResponse{
			Success: false,
			Error:   "invalid json",
		})
	}

	return c.JSON(UploadResponse{
		Success: true,
		Data:    jsonData,
	})
}