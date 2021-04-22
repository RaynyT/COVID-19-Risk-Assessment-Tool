-- MySQL
-- Inserts Done
CREATE TABLE IF NOT EXISTS tblState (
    StateID INT NOT NULL auto_increment PRIMARY KEY,
    StateAbbr CHAR(2) NOT NULL UNIQUE,
    StateName VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO tblState (StateAbbr, StateName)
VALUES("AL", "Alabama"), ("AK", "Alaska"), ("AZ", "Arizona"), ("AR", "Arkansas"),
      ("CA", "California"), ("CO", "Colorado"), ("CT", "Connecticut"), ("DE", "Delaware"), 
      ("FL", "Florida"), ("GA", "Georgia"), ("HI", "Hawaii"), ("ID", "Idaho"),
      ("IL", "Illinois"), ("IN", "Indiana"), ("IA", "Iowa"), ("KS", "Kansas"),
      ("KY", "Kentucky"), ("LA", "Louisiana"), ("ME", "Maine"), ("MD", "Maryland"),
      ("MA", "Massachusetts"), ("MI", "Michigan"), ("MN", "Minnesota"), ("MS", "Mississippi"),
      ("MO", "Missouri"), ("MT", "Montana"), ("NE", "Nebraska"), ("NV", "Nevada"),
      ("NH", "New Hampshire"), ("NJ", "New Jersey"), ("NM", "New Mexico"), ("NY", "New York"),
      ("NC", "North Carolina"), ("ND", "Nord Dakota"), ("OH", "Ohio"), ("OK", "Oklahoma"),
      ("OR", "Oregon"), ("PA", "Pennsylvania"), ("RI", "Rhode Island"), ("SC", "South Carolina"),
      ("SD", "South Dakota"), ("TN", "Tennessee"), ("TX", "Texas"), ("UT", "Utah"),
      ("VT", "Vermont"), ("VA", "Virginia"), ("WA", "Washington"), ("WV", "West Virginia"),
      ("WI", "Wisconsin"), ("WY", "Wyoming");

CREATE TABLE IF NOT EXISTS tblCounty (
    CountyID INT NOT NULL auto_increment PRIMARY KEY,
    StateID INT FOREIGN KEY REFERENCES tblState(StateID),
    StateName VARCHAR(50) NOT NULL UNIQUE
);

/*
CREATE TABLE IF NOT EXISTS tblZipCode (
    ZipCodeID INT NOT NULL auto_increment PRIMARY KEY,
    CountyID INT FOREIGN KEY REFERENCES tblCounty(CountyID),
    ZipCode CHAR(5) NOT NULL
);
*/

CREATE TABLE IF NOT EXISTS tblCountyRate (
    CountyRateID INT NOT NULL auto_increment PRIMARY KEY,
    CountyID INT FOREIGN KEY REFERENCES tbCounty(CountyID),
    Uploaded DATETIME NOT NULL,
    PosTestRateCounty DECIMAL(20, 10) NOT NULL,
    NumNewCasesLastWeek INT NOT NULL,
    NumNewCasesPrevToLastWeek INT NOT NULL
);

-- Need to talk with Iris
CREATE TABLE IF NOT EXISTS tblWorkStatus (
    WorkStatusID INT NOT NULL auto_increment PRIMARY KEY,
    RiskCoefficient DECIMAL(20, 10 )NOT NULL,
    WorkStatusName VARCHAR(50) NOT NULL UNIQUE
);


CREATE TABLE IF NOT EXISTS tblUser (
    UserID INT NOT NULL auto_increment PRIMARY KEY,
    CookieHash CHAR(128) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS tblUserCountyStatusDate (
    UserStatusDateID INT NOT NULL auto_increment PRIMARY KEY,
    UserID INT FOREIGN KEY REFERENCES tblUser(UserID),
    CountyID INT FOREIGN KEY REFERENCES tblCounty(CountyID),
    WorkStatusID INT FOREIGN KEY REFERENCES tblWorkStatus(WorkStatusID),
    UserUpdateDate DATE NOT NULL
);

-- Need to figure out Activity Types
CREATE TABLE IF NOT EXISTS tblActivityType (
    ActivityTypeID INT NOT NULL auto_increment PRIMARY KEY,
    ActivityTypeName VARCHAR(50) NOT NULL UNIQUE,
    ActivityTypeDescr VARCHAR(500) NULL,
    InitialActivity BOOLEAN DEFAULT FALSE NOT NULL
);

-- Inserts Done
CREATE TABLE IF NOT EXISTS tblVolume (
    VolumeID INT NOT NULL auto_increment PRIMARY KEY,
    RiskCoefficient DECIMAL(20, 10 )NOT NULL,
    VolumeName VARCHAR(50) NOT NULL
);

INSERT INTO tblVolume (RiskCoefficient, VolumeName)
VALUES(0.2, "Speaking Minimally"), (1.0, "Speaking Normally"), (5.0, "Speaking Loudly / Shouting");

-- Inserts Done
CREATE TABLE IF NOT EXISTS tblInOut (
    InOutID INT NOT NULL auto_increment PRIMARY KEY,
    RiskCoefficient DECIMAL(20, 10 )NOT NULL,
    InOutName VARCHAR(50) NOT NULL
);

INSERT INTO tblInOut (RiskCoefficient, InOutName)
VALUES(0.05, "Outdoors"), (1.0, "Indoors");

-- For survey taker / Inserts Done
CREATE TABLE IF NOT EXISTS tblSelfMask (
    SelfMaskID INT NOT NULL auto_increment PRIMARY KEY,
    RiskCoefficient DECIMAL(20, 10 )NOT NULL,
    SelfMaskName VARCHAR(50) NOT NULL
);

INSERT INTO tblSelfMask (RiskCoefficient, SelfMaskName)
VALUES(0.3333333333, "KN95 Mask"), (0.5, "Surgical Mask"), (1.0, "Cotton Mask"), (1.0, "No Mask") -- Self

-- For other people attending activity / Inserts Done
CREATE TABLE IF NOT EXISTS tblOtherMasks (
    OtherMasksID INT NOT NULL auto_increment PRIMARY KEY,
    RiskCoefficient DECIMAL(20, 10 )NOT NULL,
    OtherMasksName VARCHAR(50) NOT NULL
);

INSERT INTO tblOtherMasks (RiskCoefficient, OtherMasksName)
VALUES(0.1666666666, "KN95 Mask"), (0.25, "Surgical Mask"), (0.5, "Cotton Mask", ), (1.0, "No Mask") -- Others

-- Inserts Done
CREATE TABLE IF NOT EXISTS tblDistance (
    DistanceID INT NOT NULL auto_increment PRIMARY KEY,
    RiskCoefficient DECIMAL(20, 10 )NOT NULL,
    DistanceName VARCHAR(50) NOT NULL
);

INSERT INTO tblDistance (RiskCoefficient, VolumeName)
VALUES(0.125, "12+ Feet"), (0.25, "9+ Feet"), (0.5, "6+ Feet"), (1.0, "<6 Feet")

-- Need to figure out default activities
CREATE TABLE IF NOT EXISTS tblActivity (
    ActivityID INT NOT NULL auto_increment PRIMARY KEY,
    ActivityTypeID INT FOREIGN KEY REFERENCES tblActivityType(ActivityTypeID),
    UserID INT FOREIGN KEY REFERENCES tblUser(UserID),
    VolumeID INT FOREIGN KEY REFERENCES tblVolume(VolumeID),
    InOutID INT FOREIGN KEY REFERENCES tblInOut(InOutID),
    CountyID INT FOREIGN KEY REFERENCES tblCounty(CountyID),
    DistanceID INT FOREIGN KEY REFERENCES tblDistance(DistanceID),
    SelfMaskID INT FOREIGN KEY REFERENCES tblSelfMask(SelfMaskID),
    OtherMasksID INT FOREIGN KEY REFERENCES tblOtherMasks(OtherMasksID),
    DateTimeCreated DATETIME NOT NULL,
    NumPeople INT NOT NULL,
    NumPeopleMasks INT NOT NULL,
    DurationHours INT NOT NULL,
    DurationMinutes INT NOT NULL,
    RiskResult DECIMAL(20, 10) NOT NULL,
    GivenName VARCHAR(50) NULL,
    PreviousSurveyID INT NULL
);