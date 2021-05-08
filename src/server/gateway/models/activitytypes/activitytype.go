package activitytypes

//ActivityType represents an activity type in the database
type ActivityType struct {
    ActivityTypeID   	int64   `json:"activityTypeID"`
	ActivityTypeName	string	`json:"activityTypeName"`
	ActivityTypeDescr	string	`json:"activityTypeDescr"`
	InitialActivity		bool	`json:"initialActivity"`
}