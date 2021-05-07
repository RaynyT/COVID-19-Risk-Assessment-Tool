package surveys

import (
	"errors"
)

//ErrSurveyNotFound is returned when the student can't be found
var ErrSurveyNotFound = errors.New("Survey not found")

//Store represents a store for Surveys
type Store interface {
	//GetByID returns the Survey with the given ID
	GetByID(id int64) (*Survey, error)

	//Insert inserts the survey into the database, and returns
	//the newly-inserted Survey, complete with the DBMS-assigned ID
	Insert(survey *Survey) (*Survey, error)

	//Delete deletes the survey with the given ID
	Delete(id int64) error

	//AllSurveys returns all the surveys given an survey type
	AllSurveys(id int64, column string) (*[]Survey, error)
}