const Schema = require('mongoose').Schema;

const tblState = new Schema({
    StateID: { type: Schema.Types.ObjectId, required: true, unique: true, auto: true },
    StateAbbr: { type: String, required: true, unique: true },
    StateName: { type: String, required: true, unique: true }
})

const tblCounty = new Schema({
    CountyID: { type: Schema.Types.ObjectId, required: true, unique: true, auto: true },
    StateID: { type: Schema.Types.ObjectId, required: true },
    CountyName: { type: String, required: true }
})

const tblZipCode = new Schema({
    ZipCodeID: { type: Schema.Types.ObjectId, required: true, unique: true, auto: true },
    CountyID: { type: Schema.Types.ObjectId, required: true },
    ZipCode: { type: String, required: true }
})

const tblCountyRate = new Schema({
    CountyRateID: { type: Schema.Types.ObjectId, required: true, unique: true, auto: true },
    CountyID: { type: Schema.Types.ObjectId, required: true },
    Uploaded: { type: Date, required: true },
    PosTestRateCounty: { type: Decimal128, required: true },
    NumNewCasesLastWeek: { type: Decimal128, required: true },
    NumNewCasesPrevToLastWeek: { type: Decimal128, required: true }
})

const tblWorkStatus = new Schema({
    WorkStatusID: { type: Schema.Types.ObjectId, required: true, unique: true, auto: true },
    RiskCoefficient: { type: Decimal128, required: true },
    WorkStatusName: { type: String, required: true, unique: true },
    WorkStatusDescr: { type: String }
})

const tblUser = new Schema({
    UserID: { type: Schema.Types.ObjectId, required: true, unique: true, auto: true },
    CookiesHash: { type: String, required: true }
})

const tblUserStatusDate = new Schema({
    UserStatusDateID: { type: Schema.Types.ObjectId, required: true, unique: true, auto: true },
    UserID: { type: Schema.Types.ObjectId, required: true },
    CountyID: { type: Schema.Types.ObjectId, required: true },
    WorkStatusID: { type: Schema.Types.ObjectId, required: true }
})

const tblActivityType = new Schema({
    ActivityTypeID: { type: Schema.Types.ObjectId, required: true, unique: true, auto: true },
    ActivityTypeName: { type: String, required: true, unique: true },
    InitialActivity: { type: Boolean, required: true }
})

const tblVolume = new Schema({
    VolumeID: { type: Schema.Types.ObjectId, required: true, unique: true, auto: true },
    RiskCoefficient: { type: Decimal128, required: true },
    VolumeName: { type: String, required: true, unique: true },
    VolumeDescr: { type: String }
})

const tblInOut = new Schema({
    InOutID: { type: Schema.Types.ObjectId, required: true, unique: true, auto: true },
    RiskCoefficient: { type: Decimal128, required: true },
    InOutName: { type: String, required: true, unique: true },
    InOutDescr: { type: String }
})

const tblMask = new Schema({
    MaskID: { type: Schema.Types.ObjectId, required: true, unique: true, auto: true },
    RiskCoefficient: { type: Decimal128, required: true },
    MaskName: { type: String, required: true, unique: true },
    MaskDescr: { type: String }
})

const tblDistance = new Schema({
    DistanceID: { type: Schema.Types.ObjectId, required: true, unique: true, auto: true },
    RiskCoefficient: { type: Decimal128, required: true },
    DistanceName: { type: String, required: true, unique: true },
    DistanceDescr: { type: String }
})

const tblActivity = new Schema({
    ActivityID: { type: Schema.Types.ObjectId, required: true, unique: true, auto: true },
    ActivityTypeID: { type: Schema.Types.ObjectId, required: true },
    UserID: { type: Schema.Types.ObjectId, required: true },
    VolumeID: { type: Schema.Types.ObjectId, required: true },
    InOutID: { type: Schema.Types.ObjectId, required: true },
    CountyID: { type: Schema.Types.ObjectId, required: true },
    DistanceID: { type: Schema.Types.ObjectId, required: true },
    SelfMaskID: { type: Schema.Types.ObjectId, required: true },
    OthersMasksID: { type: Schema.Types.ObjectId, required: true },
    DateTimeCreated: { type: Date, required: true },
    NumPeople: { type: Number, max: 200000, required: true },
    NumPeopleMasks: { type: Number, max: 200000, required: true },
    Duration: { type: { hours: Number, minutes: Number }, required: true },
    GivenName: { type: String },
    RiskResult: { type: Decimal128, required: true},
    PreviousSurveyID: { type: Schema.Types.ObjectId }
})

module.exports = { forumSchema, messageSchema }