package users

import (
	"errors"
)

//ErrUserNotFound is returned when the student can't be found
var ErrUserNotFound = errors.New("User not found")

//Store represents a store for Users
type Store interface {
	//GetByID returns the User with the given ID
	GetByID(id int64) (*User, error)

	//GetByID returns the User with the given UserID
	GetByCookieHash(ch string) (*User, error)

	//Insert inserts the user into the database, and returns
	//the newly-inserted User, complete with the DBMS-assigned ID
	Insert(userHash string) (int64, error)

	//Delete deletes the user with the given ID
	Delete(id int64) error
}