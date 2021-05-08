package users

import (
	"fmt"
)

//User represents a user in the database
type User struct {
	UserID           int64   `json:"userID"`
    CookieHash       string  `json: cookieHash`
}

//NewUser represents a new user in the database
type NewUser struct {
    CookieHash       string  `json:"cookieHash"`
}

//Validate validates the new user and returns an error if it violates any of these rules
func (nu *NewUser) Validate() error {
    if len(nu.CookieHash) <= 0  {
        return fmt.Errorf("No cookie has been hashed.")
    }

    return nil
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