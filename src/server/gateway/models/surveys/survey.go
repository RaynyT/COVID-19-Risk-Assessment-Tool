package surveys

import (
	"fmt"
	"time"
)

//Survey represents an survey in the database
type Survey struct {
	SurveyID         int64   `json:"surveyID"`
    DemographicID    int64   `json:"demographicID"`
    ActivityID       int64   `json:"activityID"`
    GivenName        string  `json:"givenName"`
    CreationDate     string  `json:"creationDate"`
    OverallScore     float64 `json:"overallScore"`
    LastSurveyID     int64   `json:"lastSurveyID"`
}

//NewSurvey represents a new survey in the database (mostly for preset funcitonslity)
type NewSurvey struct {
	DemographicID    int64   `json:"demographicID"`
    ActivityID       int64   `json:"activityID"`
    GivenName        string  `json:"givenName"`
    OverallScore     float64 `json:"overallScore"`
    LastSurveyID     int64   `json:"lastSurveyID"`
}

//Validate validates the new survey and returns an error if it violates any of these rules
func (ns *NewSurvey) Validate() error {
    if ns.DemographicID < 0 {
        return fmt.Errorf("Demographic info cannot be null.")
    }

	if ns.ActivityID < 0 {
        return fmt.Errorf("Activity info cannot be null.")
    }

	if ns.OverallScore < 0 {
		return fmt.Errorf("Risk score cannot be null.")
	}

    return nil
}

//ToSurvey converts the NewSurvey to Survey
func (ns *NewSurvey) ToSurvey() (*Survey, error) {
    validationErr := ns.Validate()
    if validationErr != nil {
        return nil, validationErr
    }
	t := time.Now().Format("01-02-2006")

    newSurvey := &Survey {
        DemographicID:   ns.DemographicID,
        ActivityID:      ns.ActivityID,
        GivenName:       ns.GivenName,
        CreationDate:    t,
        OverallScore:    ns.OverallScore,
        LastSurveyID:    ns.LastSurveyID,
	}

    return newSurvey, nil
}