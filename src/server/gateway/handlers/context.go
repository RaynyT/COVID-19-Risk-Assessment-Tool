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
//will be a receiver on any of your HTTP
//handler functions that need access to
//globals
type HandlerContext struct {
	ActivitiesStore         activities.Store
	CountiesStore           counties.Store
	DemographicsStore       demographics.Store
	DistancesStore          distances.Store
	InOutsStore             inouts.Store
	OthersMasksStore        othersmasks.Store
	SelfMasksStore          selfmasks.Store
	StateCountiesStore      statecounties.Store
	StateCounty_RatesStore  statecounty_rates.Store
	StatesStore             states.Store
	SurveysStore            surveys.Store
	UsersStore              users.Store
	VaccineTypesStore       vaccinetypes.Store
	VolumesStore            volumes.Store
}