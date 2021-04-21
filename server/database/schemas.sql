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

CREATE TABLE IF NOT EXISTS tblZipCode (
    ZipCodeID INT NOT NULL auto_increment PRIMARY KEY,
    CountyID INT FOREIGN KEY REFERENCES tblCounty(CountyID),
    ZipCode CHAR(5) NOT NULL
);

CREATE TABLE IF NOT EXISTS tblCountyRate (
    CountyRateID INT NOT NULL auto_increment PRIMARY KEY,
    CountyID INT FOREIGN KEY REFERENCES tblCounty(CountyID),
    Uploaded DATETIME NOT NULL,
    PosTestRateCounty DECIMAL(20, 10) NOT NULL,
    NumNewCasesLastWeek DECIMAL(20, 10) NOT NULL,
    NumNewCasesPrevToLastWeek DECIMAL(20, 10) NOT NULL
);

-- Need to talk with Iris
CREATE TABLE IF NOT EXISTS tblWorkStatus (
    WorkStatusID INT NOT NULL auto_increment PRIMARY KEY,
    RiskCoefficient DECIMAL(20, 10 )NOT NULL,
    WorkStatusName VARCHAR(50) NOT NULL UNIQUE,
    WorkStatusDescr VARCHAR(100) NULL
);


CREATE TABLE IF NOT EXISTS tblUser (
    UserID INT NOT NULL auto_increment PRIMARY KEY,
    CookieHash CHAR(128) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS tblUserStatusDate (
    UserStatusDateID INT NOT NULL auto_increment PRIMARY KEY,
    UserID INT FOREIGN KEY REFERENCES tblUser(UserID),
    CountyID INT FOREIGN KEY REFERENCES tblCounty(CountyID),
    WorkStatusID INT FOREIGN KEY REFERENCES tblWorkStatus(WorkStatusID)
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
    VolumeName VARCHAR(50) NOT NULL,
    VolumeDescr VARCHAR(500) NULL
);

INSERT INTO tblVolume (RiskCoefficient, VolumeName)
VALUES(0.2, "Speaking Minimally"), (1.0, "Speaking Normally"), (5.0, "Speaking Loudly / Shouting");

CREATE TABLE IF NOT EXISTS tblInOut (
    InOutID INT NOT NULL auto_increment PRIMARY KEY,
    RiskCoefficient DECIMAL(20, 10 )NOT NULL,
    InOutName VARCHAR(50) NOT NULL,
    InOutDescr VARCHAR(500) NULL
);

-- Inserts Done
INSERT INTO tblInOut (RiskCoefficient, InOutName)
VALUES(0.05, "Outdoors"), (1.0, "Indoors");

CREATE TABLE IF NOT EXISTS tblMask (
    MaskID INT NOT NULL auto_increment PRIMARY KEY,
    RiskCoefficient DECIMAL(20, 10 )NOT NULL,
    MaskName VARCHAR(50) NOT NULL,
    MaskDescr VARCHAR(500) NOT NULL
);

-- On risk model, thin cotton mask = unmasked = 1, should we use 2/3 instead for a thick cotton mask?
-- I remember why we had two seperate tables for others masks and self masks, the coefficients are different
-- Should we implement the Risk Coefficient Table just for the mask portion and call it MaskRiskCoefficient?
INSERT INTO tblMask (RiskCoefficient, MaskName, MaskDescr)
VALUES(0.3333333333, "KN95 Mask", "KN95 masks provide 95% protection against all particles that are greater 
            than 0.3 µm in diameter (bacteria, viruses, pollution particles, fine particles, dust, smog, pollen, 
            etc.) KN95 masks have a 3D foldable design, earloops, nose bridge/nosepiece, and provide excellent 
            fitting and sealing."), (0.5, "Surgical Mask", "A single-use filtration device made of fabric and 
            wornover the nose and mouth of surgical staff to prevent contamination of the operative field and 
            to protect the wearer from splashes and splatter."), (1.0, "Cotton Mask", "A cloth face mask is a 
            mask made of common textiles, usually cotton, worn over the mouth and nose. ... Because they are 
            less effective than N95 masks, surgical masks, or physical distancing in protecting the wearer 
            against viruses, they are not considered to be personal protective equipment by public health 
            agencies."), (1.0, "No Mask", "No mask is being worn and no filtration is taking place.") -- Self
VALUES(0.1666666666, "KN95 Mask", "KN95 masks provide 95% protection against all particles that are greater 
            than 0.3 µm in diameter (bacteria, viruses, pollution particles, fine particles, dust, smog, pollen, 
            etc.) KN95 masks have a 3D foldable design, earloops, nose bridge/nosepiece, and provide excellent 
            fitting and sealing."), (0.25, "Surgical Mask", "A single-use filtration device made of fabric and 
            wornover the nose and mouth of surgical staff to prevent contamination of the operative field and 
            to protect the wearer from splashes and splatter."), (0.5, "Cotton Mask", "A cloth face mask is a 
            mask made of common textiles, usually cotton, worn over the mouth and nose. ... Because they are 
            less effective than N95 masks, surgical masks, or physical distancing in protecting the wearer 
            against viruses, they are not considered to be personal protective equipment by public health 
            agencies."), (1.0, "No Mask", "No mask is being worn and no filtration is taking place.") -- Others

CREATE TABLE IF NOT EXISTS tblDistance (
    DistanceID INT NOT NULL auto_increment PRIMARY KEY,
    RiskCoefficient DECIMAL(20, 10 )NOT NULL,
    DistanceName VARCHAR(50) NOT NULL,
    DistanceDescr VARCHAR(500) NULL
);

-- Still need to figure out distribution, I think this is okay?
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
    SelfMaskID INT FOREIGN KEY REFERENCES tblMask(MaskID),
    OthersMasksID INT FOREIGN KEY REFERENCES tblMask(MaskID),
    DateTimeCreated DATETIME NOT NULL,
    NumPeople INT NOT NULL,
    NumPeopleMasks INT NOT NULL,
    Duration INT NOT NULL, -- Stored in minutes
    RiskResult DECIMAL(20, 10) NOT NULL,
    GivenName VARCHAR(50) NULL,
    PreviousSurveyID INT NULL
);