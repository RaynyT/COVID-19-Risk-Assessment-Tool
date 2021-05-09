How does the algorithm work?

The algorithm is inspired and adapted from the risk model developed by MicroCOVID project. 

The total risk of a given activity is determined by 3 major factors: activity risk, person risk, and vaccination status. 

Activity risk is the chance of COVID infection through the activity, if the other person or other people have COVID.

Person risk is the chance that the other person or other people have COVID.

Vaccination status changes COVID risk because vaccinated people are less likely to catch and transmit COVID. 


To calculate activity risk, we first consider a baseline scenario. The baseline scenario is talking to 1 person who has COVID, for 1 hour, indoors, unmasked, at 3 feet distance. The activity risk of the baseline scenario is 9%. Factors that change the activity risk include: number of people, duration of interaction, indoor vs. outdoor environment, wearing masks, distance from each other, and volume of talking. Generally speaking, the higher number of people, longer duration of interaction, and higher volume of talking, all contribute to higher activity risk; being in an outdoor environment, wearing masks, and longer distance from each other, correspond to lower activity risks. For detailed numbers and calculations, please refer to the research by MicroCOVID project.

Person risk is determined by the number of cases in the given geographical area in the past week, proportions of people who have COVID but not been tested and officially reported (underreporting factor), and the time delay between the time someone becomes infected and the time their positive test result comes back (delay factor). For a walkthrough of the calculation, please see the post from MicroCOVID project. 

Depending on the brand of the vaccine and the number of doses one has received, the total risk of COVID is multiplied by a factor. The factors for each brand of vaccine is calculated based on the Phase III study from Pfizer, Moderna, and Johnson & Johnson.

Putting it all together, the total risk is calculated by multiplying the activity risk, person risk, and a factor indicating risk duction due to vaccination.
