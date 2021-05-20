package surveys

import (
	"database/sql"
)

// GetByType is an enumerate for GetBy* functions implemented
// by MySQLStore structs
type GetByType string

// These are the enumerates for GetByType
const (
	ID GetByType = "SurveyID"
)

// MySQLStore is a user.Store backed by MySQL
type MySQLStore struct {
	Database *sql.DB
}

// NewMySQLStore constructs a new MySQLStore, and returns an error
// if there is a problem along the way.
func NewMySQLStore(dataSourceName string) (*MySQLStore, error) {
	db, err := sql.Open("mysql", dataSourceName)
	if err != nil {
		return nil, err
	}

	return &MySQLStore{db}, nil
}

// getByProvidedType gets a specific survey given the provided type.
// This requires the GetByType to be "unique" in the database - hence SurveyID and UserID
func (ms *MySQLStore) getByProvidedType(t GetByType, arg interface{}) (*Survey, error) {
	sel := string("SELECT SurveyID, DemographicID, ActivityID, GivenName, CreationDate, OverallScore, LastSurveyID FROM TblSurvey WHERE " + t + " = ?")

	rows, err := ms.Database.Query(sel, arg)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	survey := &Survey{}

	// Should never have more than one row, so only grab one
	rows.Next()
	if err := rows.Scan(
		&survey.SurveyID,
		&survey.DemographicID,
		&survey.ActivityID,
		&survey.GivenName,
		&survey.CreationDate,
		&survey.OverallScore,
		&survey.LastSurveyID); err != nil {
		return nil, err
	}
	return survey, nil
}

//GetByID returns the Survey with the given ID
func (ms *MySQLStore) GetByID(id int64) (*Survey, error) {
	return ms.getByProvidedType(ID, id)
}

//Insert inserts the survey into the database, and returns
//the newly-inserted Survey, complete with the DBMS-assigned SurveyID
func (ms *MySQLStore) Insert(survey *Survey) (*Survey, error) {
	ins := string("INSERT INTO TblSurvey(DemographicID, ActivityID, GivenName, CreationDate, OverallScore, LastSurveyID) VALUES(?,?,?,CURRENT_TIMESTAMP(),?,?)")
	res, err := ms.Database.Exec(ins, survey.DemographicID, survey.ActivityID, survey.GivenName, survey.OverallScore, survey.LastSurveyID)
	if err != nil {
		return nil, err
	}

	lid, lidErr := res.LastInsertId()
	if lidErr != nil {
		return nil, lidErr
	}

	survey.SurveyID = lid
	return survey, nil
}

//Delete deletes the survey with the given ID
func (ms *MySQLStore) Delete(id int64) error {
	del := string("DELETE FROM TblSurvey WHERE SurveyID = ?")
	res, err := ms.Database.Exec(del, id)
	if err != nil {
		return err
	}

	rowsAffected, rowsAffectedErr := res.RowsAffected()
	if rowsAffectedErr != nil {
		return rowsAffectedErr
	}

	if rowsAffected != 1 {
		return ErrSurveyNotFound
	}

	return nil
}

// Gets all surveys based on a given:
// DemographicID, ActivityID, LastSurveyID
func (ms *MySQLStore) AllSurveys(id int64, column string) (*[]Survey, error) {
	sel := string("SELECT SurveyID, DemographicID, ActivityID, GivenName, CreationDate, OverallScore, LastSurveyID FROM TblSurvey WHERE " + column + " = ?")

	rows, err := ms.Database.Query(sel, id)
	var surveys []Survey

	for rows.Next() {
		var survey Survey
		err = rows.Scan(&survey.SurveyID, &survey.DemographicID, &survey.ActivityID, &survey.GivenName, &survey.CreationDate, &survey.OverallScore, &survey.LastSurveyID)
		
		if err != nil {
			return nil, err
		}
		surveys = append(surveys, survey)
	}

	return &surveys, nil
}

type SurID struct {
	ID int64
}

// Returns most recent survey id for given demographic id
func (ms *MySQLStore) GetLastSurvey(demid int64) (int64, error) {
	sel := string("SELECT SurveyID FROM TblSurvey WHERE DemographicID = ? ORDER BY CreationDate DESC LIMIT 1")
	
	rows, err := ms.Database.Query(sel, demid)
	if err != nil {
		return -1, err
	}
	defer rows.Close()

	id := &SurID{}

	// Should never have more than one row, so only grab one
	rows.Next()
	if err := rows.Scan(
		&id.ID); err != nil {
		return -1, err
	}
	return id.ID, nil
}