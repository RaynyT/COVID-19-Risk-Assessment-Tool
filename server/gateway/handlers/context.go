package handlers

import (
	"github.com/COVID-19-Risk-Assessment-Tool/server/gateway/models/activities"
	"github.com/COVID-19-Risk-Assessment-Tool/server/gateway/models/activitytypes"
	"github.com/COVID-19-Risk-Assessment-Tool/server/gateway/models/counties"
	"github.com/COVID-19-Risk-Assessment-Tool/server/gateway/models/demographics"
	"github.com/COVID-19-Risk-Assessment-Tool/server/gateway/models/distances"
	"github.com/COVID-19-Risk-Assessment-Tool/server/gateway/models/inouts"
	"github.com/COVID-19-Risk-Assessment-Tool/server/gateway/models/othersmasks"
	"github.com/COVID-19-Risk-Assessment-Tool/server/gateway/models/selfmasks"
	"github.com/COVID-19-Risk-Assessment-Tool/server/gateway/models/statecounties"
	"github.com/COVID-19-Risk-Assessment-Tool/server/gateway/models/statecounty_rates"
	"github.com/COVID-19-Risk-Assessment-Tool/server/gateway/models/states"
	"github.com/COVID-19-Risk-Assessment-Tool/server/gateway/models/surveys"
	"github.com/COVID-19-Risk-Assessment-Tool/server/gateway/models/users"
	"github.com/COVID-19-Risk-Assessment-Tool/server/gateway/models/vaccinetypes"
	"github.com/COVID-19-Risk-Assessment-Tool/server/gateway/models/volumes"
)

//HandlerContext defines a handler context struct that
//will be a receiver on any of your HTTP
//handler functions that need access to
//globals
type HandlerContext struct {
	ActivitiesStore         activities.Store
	ActivityTypesStore      activitytypes.Store
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