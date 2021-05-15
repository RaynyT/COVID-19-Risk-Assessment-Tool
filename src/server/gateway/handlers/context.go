package handlers

import (
	"server/gateway/models/activities"
	"server/gateway/models/counties"
	"server/gateway/models/demographics"
	"server/gateway/models/distances"
	"server/gateway/models/inouts"
	"server/gateway/models/othersmasks"
	"server/gateway/models/selfmasks"
	"server/gateway/models/statecounties"
	"server/gateway/models/statecounty_rates"
	"server/gateway/models/states"
	"server/gateway/models/surveys"
	"server/gateway/models/users"
	"server/gateway/models/vaccinetypes"
	"server/gateway/models/volumes"
)

//HandlerContext defines a handler context struct that
//will be a receiver on any of your HTTP handler functions 
//that need access to globals
type HandlerContext struct {
	ActivitiesStore         activities.Store         `json:"activitiesStore"`
	CountiesStore           counties.Store           `json:"countiesStore"`
	DemographicsStore       demographics.Store       `json:"demographicsStore"`
	DistancesStore          distances.Store          `json:"distancesStore"`
	InOutsStore             inouts.Store             `json:"inOutsStore"`
	OthersMasksStore        othersmasks.Store        `json:"othersMasksStore"`
	SelfMasksStore          selfmasks.Store          `json:"selfMasksStore"`
	StateCountiesStore      statecounties.Store      `json:"stateCountiesStore"`
	StateCounty_RatesStore  statecounty_rates.Store  `json:"stateCounty_RatesStore"`
	StatesStore             states.Store             `json:"statesStore"`
	SurveysStore            surveys.Store            `json:"surveysStore"`
	UsersStore              users.Store              `json:"usersStore"`
	VaccineTypesStore       vaccinetypes.Store       `json:"vaccineTypesStore"`
	VolumesStore            volumes.Store            `json:"volumesStore"`
}

//NewHandlerContext constructs a new database
func NewHandlerContext(activitiesStore activities.Store, countiesStore counties.Store, 
					   demographicsStore demographics.Store, distancesStore distances.Store,
					   inOutsStore inouts.Store, othersMasksStore othersmasks.Store, 
					   selfMasksStore selfmasks.Store, stateCountiesStore statecounties.Store, 
					   stateCounty_RatesStore statecounty_rates.Store, statesStore states.Store, 
					   surveysStore surveys.Store, usersStore users.Store, 
					   vaccineTypesStore vaccinetypes.Store, volumesStore volumes.Store) *HandlerContext {
	return &HandlerContext{
		ActivitiesStore:        activitiesStore,
		CountiesStore:          countiesStore,
		DemographicsStore:      demographicsStore,
		DistancesStore:         distancesStore,
		InOutsStore:            inOutsStore,
		OthersMasksStore:       othersMasksStore,
		SelfMasksStore:         selfMasksStore,
		StateCountiesStore:     stateCountiesStore,
		StateCounty_RatesStore: stateCounty_RatesStore,
		StatesStore:            statesStore,
		SurveysStore:           surveysStore,
		UsersStore:             usersStore,
		VaccineTypesStore:      vaccineTypesStore,
		VolumesStore:           volumesStore,
	}
}