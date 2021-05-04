package activities

import (
	"fmt"
	"strings"
)

type Acitivity struct {
	ActivityID       int64   `json:"activityID"`
    ActivityTypeID   int64   `json:"activityTypeID"`
    VolumeID INT     int64   `json:"volumeID"`
    InOutID INT      int64   `json:"inOutID"`
    DistanceID INT   int64   `json:"distanceID"`
    SelfMaskID INT   int64   `json:"selfMaskID"`
    OtherMasksID INT int64   `json:"otherMasksID"`
    NumPeople        int64   `json:"numPeople"`
    NumPeopleMasks   int64   `json:"numPeopleMasks"`
    DurationHours    int64   `json:"durationHours"`
    DurationMinutes  int64   `json:"durationMinutes"`
    ActivityScore    float64 `json:"activityScore"`
}

type NewActivity struct {
	ActivityTypeID   int64   `json:"activityTypeID"`
    VolumeID INT     int64   `json:"volumeID"`
    InOutID INT      int64   `json:"inOutID"`
    DistanceID INT   int64   `json:"distanceID"`
    SelfMaskID INT   int64   `json:"selfMaskID"`
    OtherMasksID INT int64   `json:"otherMasksID"`
    NumPeople        int64   `json:"numPeople"`
    NumPeopleMasks   int64   `json:"numPeopleMasks"`
    DurationHours    int64   `json:"durationHours"`
    DurationMinutes  int64   `json:"durationMinutes"`
    ActivityScore    float64 `json:"activityScore"`
}
