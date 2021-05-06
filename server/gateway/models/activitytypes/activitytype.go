package activitytypes

import (
	"fmt"
	"strings"
)

//ActivityType represents an activity type in the database
type ActivityType struct {
    ActivityTypeID   	int64   `json:"activityTypeID"`
	ActivityTypeName	string	`json:"activityTypeName"`
	ActivityTypeDescr	string	`json:"activityTypeDescr"`
	InitialActivity		bool	`json:"initialActivity"`
}

//NewActivityType represents a new activity type in the database
type NewActivityType struct {
    ActivityTypeID   	int64   `json:"activityTypeID"`
	ActivityTypeName	string	`json:"activityTypeName"`
	ActivityTypeDescr	string	`json:"activityTypeDescr"`
	InitialActivity		bool	`json:"initialActivity"`
}

//Validate validates the new activity type and returns an error if it violates any of these rules
func (na *NewActivityType) Validate() error {
    if na.ActivityTypeID > 4 {
        return fmt.Errorf("Activity type is invalid.")
    }
}

//ToActivityType converts the NewActivityType to ActivityType
func (na *NewActivityType) ToActivityType() (*ActivityType, error) {
    validationErr := na.Validate()
    if validationErr != nil {
        return nil, validationErr
    }

    newActivityType := &ActivityType {
		ActivityTypeID:		na.ActivityTypeID,
		ActivityTypeName:	na.ActivityTypeName,
		ActivityTypeDescr:	na.ActivityTypeDescr,
		InitialActivity:	na.InitialActivity,
    }

    return newActivityType, nil
}