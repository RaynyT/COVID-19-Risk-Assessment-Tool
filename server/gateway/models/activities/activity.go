package activities

import (
	"fmt"
	"strings"
)

//Activity represents an activity in the database
type Acitivity struct {
	ActivityID       int64   `json:"activityID"`
    ActivityTypeID   int64   `json:"activityTypeID"`
    VolumeID         int64   `json:"volumeID"`
    InOutID          int64   `json:"inOutID"`
    DistanceID       int64   `json:"distanceID"`
    SelfMaskID       int64   `json:"selfMaskID"`
    OtherMasksID     int64   `json:"otherMasksID"`
    ActivityName     string  `json:"activityName"`
    NumPeople        int64   `json:"numPeople"`
    NumPeopleMasks   int64   `json:"numPeopleMasks"`
    DurationHours    int64   `json:"durationHours"`
    DurationMinutes  int64   `json:"durationMinutes"`
}

//NewActivity represents a new activity in the database (mostly for preset funcitonality)
type NewActivity struct {
	ActivityTypeID   int64   `json:"activityTypeID"`
    VolumeID         int64   `json:"volumeID"`
    InOutID          int64   `json:"inOutID"`
    DistanceID       int64   `json:"distanceID"`
    SelfMaskID       int64   `json:"selfMaskID"`
    OtherMasksID     int64   `json:"otherMasksID"`
    ActivityName     string  `json:"activityName"`
    NumPeople        int64   `json:"numPeople"`
    NumPeopleMasks   int64   `json:"numPeopleMasks"`
    DurationHours    int64   `json:"durationHours"`
    DurationMinutes  int64   `json:"durationMinutes"`
}

//Validate validates the new activity and returns an error if it violates and of these rules
func (na *NewActivity) Validate() error {
    if na.NumPeopleMasks > na.NumPeople {
        return fmt.Errorf("Number of people wearing masks cannot be greater than number of people attending activity.")
    }

    if na.ActivityTypeID > 4 {
        return fmt.Errorf("Activity type is invalid.")
    }

    if na.VolumeID > 3 {
        return fmt.Errorf("Volume is invalid.")
    }

    if na.InOutID > 2 {
        return fmt.Errorf("Must be indoor or outdoor.")
    }

    if na.DistanceID > 4 {
        return fmt.Errorf("Distance is invalid.")
    }

    if na.SelfMaskID > 4 {
        return fmt.Errorf("Mask type is invalid.")
    }

    if na.OtherMasksID > 4 {
        return fmt.Errorf("Mask type is invalid.")
    }

    if na.DurationHours > 24 {
        return fmt.Errorf("No more than 24 hours.")
    }

    if na.DurationMinutes > 59 {
        return fmt.Errorf("No more than 59 minutes.")
    }
}

//ToActivity converts the NewActivity to Activity
func (na *NewActivity) ToActivity() (*Activity, error) {
    validationErr := na.Validate()
    if validationErr != nil {
        return nil, validationErr
    }

    newActivity := &Activity{
        ActivityTypeID:   na.ActivityTypeID,
        VolumeID:         na.VolumeID,
        InOutID:          na.InOutID,
        DistanceID:       na.DistanceID,
        SelfMaskID:       na.SelfMaskID,
        OtherMasksID:     na.OtherMasksID,
        ActivityName:     na.ActivityName,
        NumPeople:        na.NumPeople,
        NumPeopleMasks:   na.NumPeopleMasks,
        DurationHours:    na.DurationHours,
        DurationMinutes:  na.DurationMinutes,
    }

    return NewActivity, nil
}