package users

import (
	"fmt"
	"strings"
    "time"
)

//User represents a user in the database
type User struct {
	UserID           int64   `json:"userID"`
    CookieHash       string  `json: cookieHash`
}

//NewUser represents a new user in the database
type NewUser struct {
    CookieHash       int64   `json:"cookieHash"`
}

//Validate validates the new user and returns an error if it violates any of these rules
func (nu *NewUser) Validate() error {
    if nu.CookieHash == nil  {
        return fmt.Errorf("No cookie has been hashed.")
    }
}

//ToUser converts the NewUser to User
func (nu *NewUser) ToUser() (*User, error) {
    validationErr := nu.Validate()
    if validationErr != nil {
        return nil, validationErr
    }
	
    newUser := &User {
		CookieHash: nu.CookieHash,
    }

    return newUser, nil
}