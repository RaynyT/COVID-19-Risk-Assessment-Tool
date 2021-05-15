package handlers

import "net/http"

/*
  Access-Control-Allow-Origin: *
  Access-Control-Allow-Methods: GET, POST
  Access-Control-Allow-Headers: Content-Type, Authorization
  Access-Control-Expose-Headers: Authorization
  Access-Control-Max-Age: 600
*/

// CORS struct
type CORS struct {
	Handler http.Handler
}

func (c *CORS) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Max-Age", "600")
	/*
	w.Header().Set("Access-Control-Expose-Headers", "")
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}
	*/
	c.Handler.ServeHTTP(w, r)
}

// NewCORSMiddleware returns a CORSMiddlware structure.
func NewCORS(handler http.Handler) *CORS {
	return &CORS{
		Handler: handler,
	}
}