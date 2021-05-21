export default function calculateRiskScore(props) {

    const numericValues = {
        "indoors": 1,
        "outdoors": .05,
        "lessThanSixFeet": 1,
        "sixFeet": .5,
        "nineFeet": .25,
        "twelveFeetOrMore": .125,
        "notSpeaking": .20,
        "normalSpeaking": 1,
        "loudSpeaking": 5,
        "cottonMask": .6666666666,
        "surgicalMask": .5,
        "kn95Mask": .3333333333,
        "noMask": 1
    }
    
    let percentOthersWearingMask = props.othersMask.numWearers / props.activityBasicInfo.attendees
    
    // Determine vaccine efficacy
    let vaccineEfficacy = 1;
    let doseInt = parseInt(props.vaccination.effectiveDoseNumber);
    if (doseInt === 1) {
        vaccineEfficacy = .56;
    } else if (doseInt === 2) {
        if (props.vaccination.type === "pfizer" || props.vaccination.type === "moderna") {
            vaccineEfficacy = .1;
        } else {
            vaccineEfficacy = .4;
        }
    }
    
    let score = (
        // Activity setting risk coefficient * Number of attendees
        numericValues[props.activityBasicInfo.setting] * props.activityBasicInfo.attendees *
        // * Duration in hours
        (props.activityBasicInfo.hours + (props.activityBasicInfo.minutes / 60)) *
        // * Own mask type risk coefficent
        numericValues[props.ownMask] * 
        // * ((Others mask type risk * percent of others wearing mask) + percent of others not wearing that mask)
        ((numericValues[props.othersMask.type] * percentOthersWearingMask) + (1 - percentOthersWearingMask)) *
        // * Distancing risk * Volume risk
        numericValues[props.distancing] * numericValues[props.speakingVolume] *
        // * Vaccine efficacy
        vaccineEfficacy *
        // * Person Risk
        props.personRisk
        );
        
    return score;
}