import { Input } from 'reactstrap'

export default function CountyList(props) {

    let list = {
        AL: (
            <Input type="select" name="county" className="w-auto" defaultValue={props.selection}>
                <option>Autauga County</option>
                <option>Baldwin County</option>
                <option>Barbour County</option>
                <option>Bibb County</option>
                <option>Blount County</option>
                <option>Bullock County</option>
                <option>Butler County</option>
                <option>Calhoun County</option>
                <option>Chambers County</option>
                <option>Cherokee County</option>
                <option>Chilton County</option>
                <option>Choctaw County</option>
                <option>Clarke County</option>
                <option>Clay County</option>
                <option>Cleburne County</option>
                <option>Coffee County</option>
                <option>Colbert County</option>
                <option>Conecuh County</option>
                <option>Coosa County</option>
                <option>Covington County</option>
                <option>Crenshaw County</option>
                <option>Cullman County</option>
                <option>Dale County</option>
                <option>Dallas County</option>
                <option>DeKalb County</option>
                <option>Elmore County</option>
                <option>Escambia County</option>
                <option>Etowah County</option>
                <option>Fayette County</option>
                <option>Franklin County</option>
                <option>Geneva County</option>
                <option>Greene County</option>
                <option>Hale County</option>
                <option>Henry County</option>
                <option>Houston County</option>
                <option>Jackson County</option>
                <option>Jefferson County</option>
                <option>Lamar County</option>
                <option>Lauderdale County</option>
                <option>Lawrence County</option>
                <option>Lee County</option>
                <option>Limestone County</option>
                <option>Lowndes County</option>
                <option>Macon County</option>
                <option>Madison County</option>
                <option>Marengo County</option>
                <option>Marion County</option>
                <option>Marshall County</option>
                <option>Mobile County</option>
                <option>Monroe County</option>
                <option>Montgomery County</option>
                <option>Morgan County</option>
                <option>Perry County</option>
                <option>Pickens County</option>
                <option>Pike County</option>
                <option>Randolph County</option>
                <option>Russell County</option>
                <option>St. Clair County</option>
                <option>Shelby County</option>
                <option>Sumter County</option>
                <option>Talladega County</option>
                <option>Tallapoosa County</option>
                <option>Tuscaloosa County</option>
                <option>Walker County</option>
                <option>Washington County</option>
                <option>Wilcox County</option>
                <option>Winston County</option>
            </Input>
        ),
        AK: (
            <Input type="select" name="county" className="w-auto" defaultValue={props.selection}>
                <option>Aleutians East Borough</option>
                <option>Aleutians West Census Area</option>
                <option>Anchorage Municipality</option>
                <option>Bethel Census Area</option>
                <option>Bristol Bay Borough</option>
                <option>Denali Borough</option>
                <option>Dillingham Census Area</option>
                <option>Fairbanks North Star Borough</option>
                <option>Haines Borough</option>
                <option>Hoonah-Angoon Census Area</option>
                <option>Juneau City and Borough</option>
                <option>Kenai Peninsula Borough</option>
                <option>Ketchikan Gateway Borough</option>
                <option>Kodiak Island Borough</option>
                <option>Kusilvak Census Area</option>
                <option>Lake and Peninsula Borough</option>
                <option>Matanuska-Susitna Borough</option>
                <option>Nome Census Area</option>
                <option>North Slope Borough</option>
                <option>Northwest Arctic Borough</option>
                <option>Petersburg Borough</option>
                <option>Prince of Wales-Hyder Census Area</option>
                <option>Sitka City and Borough</option>
                <option>Skagway Municipality</option>
                <option>Southeast Fairbanks Census Area</option>
                <option>Valdez-Cordova Census Area</option>
                <option>Wrangell City and Borough</option>
                <option>Yakutat City and Borough</option>
                <option>Yukon-Koyukuk Census Area</option>
            </Input>
        ),
        AZ: (
            <Input type="select" name="county" className="w-auto" defaultValue={props.selection}>
                <option>Apache County</option>
                <option>Cochise County</option>
                <option>Coconino County</option>
                <option>Gila County</option>
                <option>Graham County</option>
                <option>Greenlee County</option>
                <option>La Paz County</option>
                <option>Maricopa County</option>
                <option>Mohave County</option>
                <option>Navajo County</option>
                <option>Pima County</option>
                <option>Pinal County</option>
                <option>Santa Cruz County</option>
                <option>Yavapai County</option>
                <option>Yuma County</option>
            </Input>
        ),
        AR: (
            <Input type="select" name="county" className="w-auto" defaultValue={props.selection}>
                <option>Arkansas County</option>
                <option>Ashley County</option>
                <option>Baxter County</option>
                <option>Benton County</option>
                <option>Boone County</option>
                <option>Bradley County</option>
                <option>Calhoun County</option>
                <option>Carroll County</option>
                <option>Chicot County</option>
                <option>Clark County</option>
                <option>Clay County</option>
                <option>Cleburne County</option>
                <option>Cleveland County</option>
                <option>Columbia County</option>
                <option>Conway County</option>
                <option>Craighead County</option>
                <option>Crawford County</option>
                <option>Crittenden County</option>
                <option>Cross County</option>
                <option>Dallas County</option>
                <option>Desha County</option>
                <option>Drew County</option>
                <option>Faulkner County</option>
                <option>Franklin County</option>
                <option>Fulton County</option>
                <option>Garland County</option>
                <option>Grant County</option>
                <option>Greene County</option>
                <option>Hempstead County</option>
                <option>Hot Spring County</option>
                <option>Howard County</option>
                <option>Independence County</option>
                <option>Izard County</option>
                <option>Jackson County</option>
                <option>Jefferson County</option>
                <option>Johnson County</option>
                <option>Lafayette County</option>
                <option>Lawrence County</option>
                <option>Lee County</option>
                <option>Lincoln County</option>
                <option>Little River County</option>
                <option>Logan County</option>
                <option>Lonoke County</option>
                <option>Madison County</option>
                <option>Marion County</option>
                <option>Miller County</option>
                <option>Mississippi County</option>
                <option>Monroe County</option>
                <option>Montgomery County</option>
                <option>Nevada County</option>
                <option>Newton County</option>
                <option>Ouachita County</option>
                <option>Perry County</option>
                <option>Phillips County</option>
                <option>Pike County</option>
                <option>Poinsett County</option>
                <option>Polk County</option>
                <option>Pope County</option>
                <option>Prairie County</option>
                <option>Pulaski County</option>
                <option>Randolph County</option>
                <option>St. Francis County</option>
                <option>Saline County</option>
                <option>Scott County</option>
                <option>Searcy County</option>
                <option>Sebastian County</option>
                <option>Sevier County</option>
                <option>Sharp County</option>
                <option>Stone County</option>
                <option>Union County</option>
                <option>Van Buren County</option>
                <option>Washington County</option>
                <option>White County</option>
                <option>Woodruff County</option>
                <option>Yell County</option>
            </Input>
        ),
        CA: (
            <Input type="select" name="county" className="w-auto" defaultValue={props.selection}>
                <option>Alameda County</option>
                <option>Alpine County</option>
                <option>Amador County</option>
                <option>Butte County</option>
                <option>Calaveras County</option>
                <option>Colusa County</option>
                <option>Contra Costa County</option>
                <option>Del Norte County</option>
                <option>El Dorado County</option>
                <option>Fresno County</option>
                <option>Glenn County</option>
                <option>Humboldt County</option>
                <option>Imperial County</option>
                <option>Inyo County</option>
                <option>Kern County</option>
                <option>Kings County</option>
                <option>Lake County</option>
                <option>Lassen County</option>
                <option>Los Angeles County</option>
                <option>Madera County</option>
                <option>Marin County</option>
                <option>Mariposa County</option>
                <option>Mendocino County</option>
                <option>Merced County</option>
                <option>Modoc County</option>
                <option>Mono County</option>
                <option>Monterey County</option>
                <option>Napa County</option>
                <option>Nevada County</option>
                <option>Orange County</option>
                <option>Placer County</option>
                <option>Plumas County</option>
                <option>Riverside County</option>
                <option>Sacramento County</option>
                <option>San Benito County</option>
                <option>San Bernardino County</option>
                <option>San Diego County</option>
                <option>San Francisco County</option>
                <option>San Joaquin County</option>
                <option>San Luis Obispo County</option>
                <option>San Mateo County</option>
                <option>Santa Barbara County</option>
                <option>Santa Clara County</option>
                <option>Santa Cruz County</option>
                <option>Shasta County</option>
                <option>Sierra County</option>
                <option>Siskiyou County</option>
                <option>Solano County</option>
                <option>Sonoma County</option>
                <option>Stanislaus County</option>
                <option>Sutter County</option>
                <option>Tehama County</option>
                <option>Trinity County</option>
                <option>Tulare County</option>
                <option>Tuolumne County</option>
                <option>Ventura County</option>
                <option>Yolo County</option>
                <option>Yuba County</option>

            </Input>
        ),
        CO: (
            <Input type="select" name="county" className="w-auto" defaultValue={props.selection}>
                <option>Adams County</option>
                <option>Alamosa County</option>
                <option>Arapahoe County</option>
                <option>Archuleta County</option>
                <option>Baca County</option>
                <option>Bent County</option>
                <option>Boulder County</option>
                <option>Broomfield County</option>
                <option>Chaffee County</option>
                <option>Cheyenne County</option>
                <option>Clear Creek County</option>
                <option>Conejos County</option>
                <option>Costilla County</option>
                <option>Crowley County</option>
                <option>Custer County</option>
                <option>Delta County</option>
                <option>Denver County</option>
                <option>Dolores County</option>
                <option>Douglas County</option>
                <option>Eagle County</option>
                <option>Elbert County</option>
                <option>El Paso County</option>
                <option>Fremont County</option>
                <option>Garfield County</option>
                <option>Gilpin County</option>
                <option>Grand County</option>
                <option>Gunnison County</option>
                <option>Hinsdale County</option>
                <option>Huerfano County</option>
                <option>Jackson County</option>
                <option>Jefferson County</option>
                <option>Kiowa County</option>
                <option>Kit Carson County</option>
                <option>Lake County</option>
                <option>La Plata County</option>
                <option>Larimer County</option>
                <option>Las Animas County</option>
                <option>Lincoln County</option>
                <option>Logan County</option>
                <option>Mesa County</option>
                <option>Mineral County</option>
                <option>Moffat County</option>
                <option>Montezuma County</option>
                <option>Montrose County</option>
                <option>Morgan County</option>
                <option>Otero County</option>
                <option>Ouray County</option>
                <option>Park County</option>
                <option>Phillips County</option>
                <option>Pitkin County</option>
                <option>Prowers County</option>
                <option>Pueblo County</option>
                <option>Rio Blanco County</option>
                <option>Rio Grande County</option>
                <option>Routt County</option>
                <option>Saguache County</option>
                <option>San Juan County</option>
                <option>San Miguel County</option>
                <option>Sedgwick County</option>
                <option>Summit County</option>
                <option>Teller County</option>
                <option>Washington County</option>
                <option>Weld County</option>
                <option>Yuma County</option>

            </Input>
        ),
        CT: (
            <Input type="select" name="county" className="w-auto" defaultValue={props.selection}>
                <option>Fairfield County</option>
                <option>Hartford County</option>
                <option>Litchfield County</option>
                <option>Middlesex County</option>
                <option>New Haven County</option>
                <option>New London County</option>
                <option>Tolland County</option>
                <option>Windham County</option>

            </Input>
        ),
        DC: (
            <Input type="select" name="county" className="w-auto" defaultValue={props.selection}>
                <option>District of Columbia</option>

            </Input>
        ),
        DE: (
            <Input type="select" name="county" className="w-auto" defaultValue={props.selection}>
                <option>Kent County</option>
                <option>New Castle County</option>
                <option>Sussex County</option>

            </Input>
        ),
        FL: (
            <Input type="select" name="county" className="w-auto" defaultValue={props.selection}>
                <option>Alachua County</option>
                <option>Baker County</option>
                <option>Bay County</option>
                <option>Bradford County</option>
                <option>Brevard County</option>
                <option>Broward County</option>
                <option>Calhoun County</option>
                <option>Charlotte County</option>
                <option>Citrus County</option>
                <option>Clay County</option>
                <option>Collier County</option>
                <option>Columbia County</option>
                <option>DeSoto County</option>
                <option>Dixie County</option>
                <option>Duval County</option>
                <option>Escambia County</option>
                <option>Flagler County</option>
                <option>Franklin County</option>
                <option>Gadsden County</option>
                <option>Gilchrist County</option>
                <option>Glades County</option>
                <option>Gulf County</option>
                <option>Hamilton County</option>
                <option>Hardee County</option>
                <option>Hendry County</option>
                <option>Hernando County</option>
                <option>Highlands County</option>
                <option>Hillsborough County</option>
                <option>Holmes County</option>
                <option>Indian River County</option>
                <option>Jackson County</option>
                <option>Jefferson County</option>
                <option>Lafayette County</option>
                <option>Lake County</option>
                <option>Lee County</option>
                <option>Leon County</option>
                <option>Levy County</option>
                <option>Liberty County</option>
                <option>Madison County</option>
                <option>Manatee County</option>
                <option>Marion County</option>
                <option>Martin County</option>
                <option>Miami-Dade County</option>
                <option>Monroe County</option>
                <option>Nassau County</option>
                <option>Okaloosa County</option>
                <option>Okeechobee County</option>
                <option>Orange County</option>
                <option>Osceola County</option>
                <option>Palm Beach County</option>
                <option>Pasco County</option>
                <option>Pinellas County</option>
                <option>Polk County</option>
                <option>Putnam County</option>
                <option>St. Johns County</option>
                <option>St. Lucie County</option>
                <option>Santa Rosa County</option>
                <option>Sarasota County</option>
                <option>Seminole County</option>
                <option>Sumter County</option>
                <option>Suwannee County</option>
                <option>Taylor County</option>
                <option>Union County</option>
                <option>Volusia County</option>
                <option>Wakulla County</option>
                <option>Walton County</option>
                <option>Washington County</option>

            </Input>
        ),
        GA: (
            <Input type="select" name="county" className="w-auto" defaultValue={props.selection}>
                <option>Appling County</option>
                <option>Atkinson County</option>
                <option>Bacon County</option>
                <option>Baker County</option>
                <option>Baldwin County</option>
                <option>Banks County</option>
                <option>Barrow County</option>
                <option>Bartow County</option>
                <option>Ben Hill County</option>
                <option>Berrien County</option>
                <option>Bibb County</option>
                <option>Bleckley County</option>
                <option>Brantley County</option>
                <option>Brooks County</option>
                <option>Bryan County</option>
                <option>Bulloch County</option>
                <option>Burke County</option>
                <option>Butts County</option>
                <option>Calhoun County</option>
                <option>Camden County</option>
                <option>Candler County</option>
                <option>Carroll County</option>
                <option>Catoosa County</option>
                <option>Charlton County</option>
                <option>Chatham County</option>
                <option>Chattahoochee County</option>
                <option>Chattooga County</option>
                <option>Cherokee County</option>
                <option>Clarke County</option>
                <option>Clay County</option>
                <option>Clayton County</option>
                <option>Clinch County</option>
                <option>Cobb County</option>
                <option>Coffee County</option>
                <option>Colquitt County</option>
                <option>Columbia County</option>
                <option>Cook County</option>
                <option>Coweta County</option>
                <option>Crawford County</option>
                <option>Crisp County</option>
                <option>Dade County</option>
                <option>Dawson County</option>
                <option>Decatur County</option>
                <option>DeKalb County</option>
                <option>Dodge County</option>
                <option>Dooly County</option>
                <option>Dougherty County</option>
                <option>Douglas County</option>
                <option>Early County</option>
                <option>Echols County</option>
                <option>Effingham County</option>
                <option>Elbert County</option>
                <option>Emanuel County</option>
                <option>Evans County</option>
                <option>Fannin County</option>
                <option>Fayette County</option>
                <option>Floyd County</option>
                <option>Forsyth County</option>
                <option>Franklin County</option>
                <option>Fulton County</option>
                <option>Gilmer County</option>
                <option>Glascock County</option>
                <option>Glynn County</option>
                <option>Gordon County</option>
                <option>Grady County</option>
                <option>Greene County</option>
                <option>Gwinnett County</option>
                <option>Habersham County</option>
                <option>Hall County</option>
                <option>Hancock County</option>
                <option>Haralson County</option>
                <option>Harris County</option>
                <option>Hart County</option>
                <option>Heard County</option>
                <option>Henry County</option>
                <option>Houston County</option>
                <option>Irwin County</option>
                <option>Jackson County</option>
                <option>Jasper County</option>
                <option>Jeff Davis County</option>
                <option>Jefferson County</option>
                <option>Jenkins County</option>
                <option>Johnson County</option>
                <option>Jones County</option>
                <option>Lamar County</option>
                <option>Lanier County</option>
                <option>Laurens County</option>
                <option>Lee County</option>
                <option>Liberty County</option>
                <option>Lincoln County</option>
                <option>Long County</option>
                <option>Lowndes County</option>
                <option>Lumpkin County</option>
                <option>McDuffie County</option>
                <option>McIntosh County</option>
                <option>Macon County</option>
                <option>Madison County</option>
                <option>Marion County</option>
                <option>Meriwether County</option>
                <option>Miller County</option>
                <option>Mitchell County</option>
                <option>Monroe County</option>
                <option>Montgomery County</option>
                <option>Morgan County</option>
                <option>Murray County</option>
                <option>Muscogee County</option>
                <option>Newton County</option>
                <option>Oconee County</option>
                <option>Oglethorpe County</option>
                <option>Paulding County</option>
                <option>Peach County</option>
                <option>Pickens County</option>
                <option>Pierce County</option>
                <option>Pike County</option>
                <option>Polk County</option>
                <option>Pulaski County</option>
                <option>Putnam County</option>
                <option>Quitman County</option>
                <option>Rabun County</option>
                <option>Randolph County</option>
                <option>Richmond County</option>
                <option>Rockdale County</option>
                <option>Schley County</option>
                <option>Screven County</option>
                <option>Seminole County</option>
                <option>Spalding County</option>
                <option>Stephens County</option>
                <option>Stewart County</option>
                <option>Sumter County</option>
                <option>Talbot County</option>
                <option>Taliaferro County</option>
                <option>Tattnall County</option>
                <option>Taylor County</option>
                <option>Telfair County</option>
                <option>Terrell County</option>
                <option>Thomas County</option>
                <option>Tift County</option>
                <option>Toombs County</option>
                <option>Towns County</option>
                <option>Treutlen County</option>
                <option>Troup County</option>
                <option>Turner County</option>
                <option>Twiggs County</option>
                <option>Union County</option>
                <option>Upson County</option>
                <option>Walker County</option>
                <option>Walton County</option>
                <option>Ware County</option>
                <option>Warren County</option>
                <option>Washington County</option>
                <option>Wayne County</option>
                <option>Webster County</option>
                <option>Wheeler County</option>
                <option>White County</option>
                <option>Whitfield County</option>
                <option>Wilcox County</option>
                <option>Wilkes County</option>
                <option>Wilkinson County</option>
                <option>Worth County</option>

            </Input>
        ),
        HI: (
            <Input type="select" name="county" className="w-auto" defaultValue={props.selection}>
                <option>Hawaii County</option>
                <option>Honolulu County</option>
                <option>Kalawao County</option>
                <option>Kauai County</option>
                <option>Maui County</option>

            </Input>
        ),
        ID: (
            <Input type="select" name="county" className="w-auto" defaultValue={props.selection}>
                <option>Ada County</option>
                <option>Adams County</option>
                <option>Bannock County</option>
                <option>Bear Lake County</option>
                <option>Benewah County</option>
                <option>Bingham County</option>
                <option>Blaine County</option>
                <option>Boise County</option>
                <option>Bonner County</option>
                <option>Bonneville County</option>
                <option>Boundary County</option>
                <option>Butte County</option>
                <option>Camas County</option>
                <option>Canyon County</option>
                <option>Caribou County</option>
                <option>Cassia County</option>
                <option>Clark County</option>
                <option>Clearwater County</option>
                <option>Custer County</option>
                <option>Elmore County</option>
                <option>Franklin County</option>
                <option>Fremont County</option>
                <option>Gem County</option>
                <option>Gooding County</option>
                <option>Idaho County</option>
                <option>Jefferson County</option>
                <option>Jerome County</option>
                <option>Kootenai County</option>
                <option>Latah County</option>
                <option>Lemhi County</option>
                <option>Lewis County</option>
                <option>Lincoln County</option>
                <option>Madison County</option>
                <option>Minidoka County</option>
                <option>Nez Perce County</option>
                <option>Oneida County</option>
                <option>Owyhee County</option>
                <option>Payette County</option>
                <option>Power County</option>
                <option>Shoshone County</option>
                <option>Teton County</option>
                <option>Twin Falls County</option>
                <option>Valley County</option>
                <option>Washington County</option>

            </Input>
        ),
        IL: (
            <Input type="select" name="county" className="w-auto" defaultValue={props.selection}>
                <option>Adams County</option>
                <option>Alexander County</option>
                <option>Bond County</option>
                <option>Boone County</option>
                <option>Brown County</option>
                <option>Bureau County</option>
                <option>Calhoun County</option>
                <option>Carroll County</option>
                <option>Cass County</option>
                <option>Champaign County</option>
                <option>Christian County</option>
                <option>Clark County</option>
                <option>Clay County</option>
                <option>Clinton County</option>
                <option>Coles County</option>
                <option>Cook County</option>
                <option>Crawford County</option>
                <option>Cumberland County</option>
                <option>DeKalb County</option>
                <option>De Witt County</option>
                <option>Douglas County</option>
                <option>DuPage County</option>
                <option>Edgar County</option>
                <option>Edwards County</option>
                <option>Effingham County</option>
                <option>Fayette County</option>
                <option>Ford County</option>
                <option>Franklin County</option>
                <option>Fulton County</option>
                <option>Gallatin County</option>
                <option>Greene County</option>
                <option>Grundy County</option>
                <option>Hamilton County</option>
                <option>Hancock County</option>
                <option>Hardin County</option>
                <option>Henderson County</option>
                <option>Henry County</option>
                <option>Iroquois County</option>
                <option>Jackson County</option>
                <option>Jasper County</option>
                <option>Jefferson County</option>
                <option>Jersey County</option>
                <option>Jo Daviess County</option>
                <option>Johnson County</option>
                <option>Kane County</option>
                <option>Kankakee County</option>
                <option>Kendall County</option>
                <option>Knox County</option>
                <option>Lake County</option>
                <option>LaSalle County</option>
                <option>Lawrence County</option>
                <option>Lee County</option>
                <option>Livingston County</option>
                <option>Logan County</option>
                <option>McDonough County</option>
                <option>McHenry County</option>
                <option>McLean County</option>
                <option>Macon County</option>
                <option>Macoupin County</option>
                <option>Madison County</option>
                <option>Marion County</option>
                <option>Marshall County</option>
                <option>Mason County</option>
                <option>Massac County</option>
                <option>Menard County</option>
                <option>Mercer County</option>
                <option>Monroe County</option>
                <option>Montgomery County</option>
                <option>Morgan County</option>
                <option>Moultrie County</option>
                <option>Ogle County</option>
                <option>Peoria County</option>
                <option>Perry County</option>
                <option>Piatt County</option>
                <option>Pike County</option>
                <option>Pope County</option>
                <option>Pulaski County</option>
                <option>Putnam County</option>
                <option>Randolph County</option>
                <option>Richland County</option>
                <option>Rock Island County</option>
                <option>St. Clair County</option>
                <option>Saline County</option>
                <option>Sangamon County</option>
                <option>Schuyler County</option>
                <option>Scott County</option>
                <option>Shelby County</option>
                <option>Stark County</option>
                <option>Stephenson County</option>
                <option>Tazewell County</option>
                <option>Union County</option>
                <option>Vermilion County</option>
                <option>Wabash County</option>
                <option>Warren County</option>
                <option>Washington County</option>
                <option>Wayne County</option>
                <option>White County</option>
                <option>Whiteside County</option>
                <option>Will County</option>
                <option>Williamson County</option>
                <option>Winnebago County</option>
                <option>Woodford County</option>

            </Input>
        ),
        IN: (
            <Input type="select" name="county" className="w-auto" defaultValue={props.selection}>
                <option>Adams County</option>
                <option>Allen County</option>
                <option>Bartholomew County</option>
                <option>Benton County</option>
                <option>Blackford County</option>
                <option>Boone County</option>
                <option>Brown County</option>
                <option>Carroll County</option>
                <option>Cass County</option>
                <option>Clark County</option>
                <option>Clay County</option>
                <option>Clinton County</option>
                <option>Crawford County</option>
                <option>Daviess County</option>
                <option>Dearborn County</option>
                <option>Decatur County</option>
                <option>DeKalb County</option>
                <option>Delaware County</option>
                <option>Dubois County</option>
                <option>Elkhart County</option>
                <option>Fayette County</option>
                <option>Floyd County</option>
                <option>Fountain County</option>
                <option>Franklin County</option>
                <option>Fulton County</option>
                <option>Gibson County</option>
                <option>Grant County</option>
                <option>Greene County</option>
                <option>Hamilton County</option>
                <option>Hancock County</option>
                <option>Harrison County</option>
                <option>Hendricks County</option>
                <option>Henry County</option>
                <option>Howard County</option>
                <option>Huntington County</option>
                <option>Jackson County</option>
                <option>Jasper County</option>
                <option>Jay County</option>
                <option>Jefferson County</option>
                <option>Jennings County</option>
                <option>Johnson County</option>
                <option>Knox County</option>
                <option>Kosciusko County</option>
                <option>LaGrange County</option>
                <option>Lake County</option>
                <option>LaPorte County</option>
                <option>Lawrence County</option>
                <option>Madison County</option>
                <option>Marion County</option>
                <option>Marshall County</option>
                <option>Martin County</option>
                <option>Miami County</option>
                <option>Monroe County</option>
                <option>Montgomery County</option>
                <option>Morgan County</option>
                <option>Newton County</option>
                <option>Noble County</option>
                <option>Ohio County</option>
                <option>Orange County</option>
                <option>Owen County</option>
                <option>Parke County</option>
                <option>Perry County</option>
                <option>Pike County</option>
                <option>Porter County</option>
                <option>Posey County</option>
                <option>Pulaski County</option>
                <option>Putnam County</option>
                <option>Randolph County</option>
                <option>Ripley County</option>
                <option>Rush County</option>
                <option>St. Joseph County</option>
                <option>Scott County</option>
                <option>Shelby County</option>
                <option>Spencer County</option>
                <option>Starke County</option>
                <option>Steuben County</option>
                <option>Sullivan County</option>
                <option>Switzerland County</option>
                <option>Tippecanoe County</option>
                <option>Tipton County</option>
                <option>Union County</option>
                <option>Vanderburgh County</option>
                <option>Vermillion County</option>
                <option>Vigo County</option>
                <option>Wabash County</option>
                <option>Warren County</option>
                <option>Warrick County</option>
                <option>Washington County</option>
                <option>Wayne County</option>
                <option>Wells County</option>
                <option>White County</option>
                <option>Whitley County</option>

            </Input>
        ),
        IA: (
            <Input type="select" name="county" className="w-auto" defaultValue={props.selection}>
                <option>Adair County</option>
                <option>Adams County</option>
                <option>Allamakee County</option>
                <option>Appanoose County</option>
                <option>Audubon County</option>
                <option>Benton County</option>
                <option>Black Hawk County</option>
                <option>Boone County</option>
                <option>Bremer County</option>
                <option>Buchanan County</option>
                <option>Buena Vista County</option>
                <option>Butler County</option>
                <option>Calhoun County</option>
                <option>Carroll County</option>
                <option>Cass County</option>
                <option>Cedar County</option>
                <option>Cerro Gordo County</option>
                <option>Cherokee County</option>
                <option>Chickasaw County</option>
                <option>Clarke County</option>
                <option>Clay County</option>
                <option>Clayton County</option>
                <option>Clinton County</option>
                <option>Crawford County</option>
                <option>Dallas County</option>
                <option>Davis County</option>
                <option>Decatur County</option>
                <option>Delaware County</option>
                <option>Des Moines County</option>
                <option>Dickinson County</option>
                <option>Dubuque County</option>
                <option>Emmet County</option>
                <option>Fayette County</option>
                <option>Floyd County</option>
                <option>Franklin County</option>
                <option>Fremont County</option>
                <option>Greene County</option>
                <option>Grundy County</option>
                <option>Guthrie County</option>
                <option>Hamilton County</option>
                <option>Hancock County</option>
                <option>Hardin County</option>
                <option>Harrison County</option>
                <option>Henry County</option>
                <option>Howard County</option>
                <option>Humboldt County</option>
                <option>Ida County</option>
                <option>Iowa County</option>
                <option>Jackson County</option>
                <option>Jasper County</option>
                <option>Jefferson County</option>
                <option>Johnson County</option>
                <option>Jones County</option>
                <option>Keokuk County</option>
                <option>Kossuth County</option>
                <option>Lee County</option>
                <option>Linn County</option>
                <option>Louisa County</option>
                <option>Lucas County</option>
                <option>Lyon County</option>
                <option>Madison County</option>
                <option>Mahaska County</option>
                <option>Marion County</option>
                <option>Marshall County</option>
                <option>Mills County</option>
                <option>Mitchell County</option>
                <option>Monona County</option>
                <option>Monroe County</option>
                <option>Montgomery County</option>
                <option>Muscatine County</option>
                <option>O'Brien County</option>
                <option>Osceola County</option>
                <option>Page County</option>
                <option>Palo Alto County</option>
                <option>Plymouth County</option>
                <option>Pocahontas County</option>
                <option>Polk County</option>
                <option>Pottawattamie County</option>
                <option>Poweshiek County</option>
                <option>Ringgold County</option>
                <option>Sac County</option>
                <option>Scott County</option>
                <option>Shelby County</option>
                <option>Sioux County</option>
                <option>Story County</option>
                <option>Tama County</option>
                <option>Taylor County</option>
                <option>Union County</option>
                <option>Van Buren County</option>
                <option>Wapello County</option>
                <option>Warren County</option>
                <option>Washington County</option>
                <option>Wayne County</option>
                <option>Webster County</option>
                <option>Winnebago County</option>
                <option>Winneshiek County</option>
                <option>Woodbury County</option>
                <option>Worth County</option>
                <option>Wright County</option>

            </Input>
        ),
        KS: (
            <Input type="select" name="county" className="w-auto" defaultValue={props.selection}>
                <option>Allen County</option>
                <option>Anderson County</option>
                <option>Atchison County</option>
                <option>Barber County</option>
                <option>Barton County</option>
                <option>Bourbon County</option>
                <option>Brown County</option>
                <option>Butler County</option>
                <option>Chase County</option>
                <option>Chautauqua County</option>
                <option>Cherokee County</option>
                <option>Cheyenne County</option>
                <option>Clark County</option>
                <option>Clay County</option>
                <option>Cloud County</option>
                <option>Coffey County</option>
                <option>Comanche County</option>
                <option>Cowley County</option>
                <option>Crawford County</option>
                <option>Decatur County</option>
                <option>Dickinson County</option>
                <option>Doniphan County</option>
                <option>Douglas County</option>
                <option>Edwards County</option>
                <option>Elk County</option>
                <option>Ellis County</option>
                <option>Ellsworth County</option>
                <option>Finney County</option>
                <option>Ford County</option>
                <option>Franklin County</option>
                <option>Geary County</option>
                <option>Gove County</option>
                <option>Graham County</option>
                <option>Grant County</option>
                <option>Gray County</option>
                <option>Greeley County</option>
                <option>Greenwood County</option>
                <option>Hamilton County</option>
                <option>Harper County</option>
                <option>Harvey County</option>
                <option>Haskell County</option>
                <option>Hodgeman County</option>
                <option>Jackson County</option>
                <option>Jefferson County</option>
                <option>Jewell County</option>
                <option>Johnson County</option>
                <option>Kearny County</option>
                <option>Kingman County</option>
                <option>Kiowa County</option>
                <option>Labette County</option>
                <option>Lane County</option>
                <option>Leavenworth County</option>
                <option>Lincoln County</option>
                <option>Linn County</option>
                <option>Logan County</option>
                <option>Lyon County</option>
                <option>McPherson County</option>
                <option>Marion County</option>
                <option>Marshall County</option>
                <option>Meade County</option>
                <option>Miami County</option>
                <option>Mitchell County</option>
                <option>Montgomery County</option>
                <option>Morris County</option>
                <option>Morton County</option>
                <option>Nemaha County</option>
                <option>Neosho County</option>
                <option>Ness County</option>
                <option>Norton County</option>
                <option>Osage County</option>
                <option>Osborne County</option>
                <option>Ottawa County</option>
                <option>Pawnee County</option>
                <option>Phillips County</option>
                <option>Pottawatomie County</option>
                <option>Pratt County</option>
                <option>Rawlins County</option>
                <option>Reno County</option>
                <option>Republic County</option>
                <option>Rice County</option>
                <option>Riley County</option>
                <option>Rooks County</option>
                <option>Rush County</option>
                <option>Russell County</option>
                <option>Saline County</option>
                <option>Scott County</option>
                <option>Sedgwick County</option>
                <option>Seward County</option>
                <option>Shawnee County</option>
                <option>Sheridan County</option>
                <option>Sherman County</option>
                <option>Smith County</option>
                <option>Stafford County</option>
                <option>Stanton County</option>
                <option>Stevens County</option>
                <option>Sumner County</option>
                <option>Thomas County</option>
                <option>Trego County</option>
                <option>Wabaunsee County</option>
                <option>Wallace County</option>
                <option>Washington County</option>
                <option>Wichita County</option>
                <option>Wilson County</option>
                <option>Woodson County</option>
                <option>Wyandotte County</option>

            </Input>
        ),
        KY: (
            <Input type="select" name="county" className="w-auto" defaultValue={props.selection}>
                <option>Adair County</option>
                <option>Allen County</option>
                <option>Anderson County</option>
                <option>Ballard County</option>
                <option>Barren County</option>
                <option>Bath County</option>
                <option>Bell County</option>
                <option>Boone County</option>
                <option>Bourbon County</option>
                <option>Boyd County</option>
                <option>Boyle County</option>
                <option>Bracken County</option>
                <option>Breathitt County</option>
                <option>Breckinridge County</option>
                <option>Bullitt County</option>
                <option>Butler County</option>
                <option>Caldwell County</option>
                <option>Calloway County</option>
                <option>Campbell County</option>
                <option>Carlisle County</option>
                <option>Carroll County</option>
                <option>Carter County</option>
                <option>Casey County</option>
                <option>Christian County</option>
                <option>Clark County</option>
                <option>Clay County</option>
                <option>Clinton County</option>
                <option>Crittenden County</option>
                <option>Cumberland County</option>
                <option>Daviess County</option>
                <option>Edmonson County</option>
                <option>Elliott County</option>
                <option>Estill County</option>
                <option>Fayette County</option>
                <option>Fleming County</option>
                <option>Floyd County</option>
                <option>Franklin County</option>
                <option>Fulton County</option>
                <option>Gallatin County</option>
                <option>Garrard County</option>
                <option>Grant County</option>
                <option>Graves County</option>
                <option>Grayson County</option>
                <option>Green County</option>
                <option>Greenup County</option>
                <option>Hancock County</option>
                <option>Hardin County</option>
                <option>Harlan County</option>
                <option>Harrison County</option>
                <option>Hart County</option>
                <option>Henderson County</option>
                <option>Henry County</option>
                <option>Hickman County</option>
                <option>Hopkins County</option>
                <option>Jackson County</option>
                <option>Jefferson County</option>
                <option>Jessamine County</option>
                <option>Johnson County</option>
                <option>Kenton County</option>
                <option>Knott County</option>
                <option>Knox County</option>
                <option>Larue County</option>
                <option>Laurel County</option>
                <option>Lawrence County</option>
                <option>Lee County</option>
                <option>Leslie County</option>
                <option>Letcher County</option>
                <option>Lewis County</option>
                <option>Lincoln County</option>
                <option>Livingston County</option>
                <option>Logan County</option>
                <option>Lyon County</option>
                <option>McCracken County</option>
                <option>McCreary County</option>
                <option>McLean County</option>
                <option>Madison County</option>
                <option>Magoffin County</option>
                <option>Marion County</option>
                <option>Marshall County</option>
                <option>Martin County</option>
                <option>Mason County</option>
                <option>Meade County</option>
                <option>Menifee County</option>
                <option>Mercer County</option>
                <option>Metcalfe County</option>
                <option>Monroe County</option>
                <option>Montgomery County</option>
                <option>Morgan County</option>
                <option>Muhlenberg County</option>
                <option>Nelson County</option>
                <option>Nicholas County</option>
                <option>Ohio County</option>
                <option>Oldham County</option>
                <option>Owen County</option>
                <option>Owsley County</option>
                <option>Pendleton County</option>
                <option>Perry County</option>
                <option>Pike County</option>
                <option>Powell County</option>
                <option>Pulaski County</option>
                <option>Robertson County</option>
                <option>Rockcastle County</option>
                <option>Rowan County</option>
                <option>Russell County</option>
                <option>Scott County</option>
                <option>Shelby County</option>
                <option>Simpson County</option>
                <option>Spencer County</option>
                <option>Taylor County</option>
                <option>Todd County</option>
                <option>Trigg County</option>
                <option>Trimble County</option>
                <option>Union County</option>
                <option>Warren County</option>
                <option>Washington County</option>
                <option>Wayne County</option>
                <option>Webster County</option>
                <option>Whitley County</option>
                <option>Wolfe County</option>
                <option>Woodford County</option>

            </Input>
        ),
        LA: (
            <Input type="select" name="county" className="w-auto" defaultValue={props.selection}>
                <option>Acadia Parish</option>
                <option>Allen Parish</option>
                <option>Ascension Parish</option>
                <option>Assumption Parish</option>
                <option>Avoyelles Parish</option>
                <option>Beauregard Parish</option>
                <option>Bienville Parish</option>
                <option>Bossier Parish</option>
                <option>Caddo Parish</option>
                <option>Calcasieu Parish</option>
                <option>Caldwell Parish</option>
                <option>Cameron Parish</option>
                <option>Catahoula Parish</option>
                <option>Claiborne Parish</option>
                <option>Concordia Parish</option>
                <option>De Soto Parish</option>
                <option>East Baton Rouge Parish</option>
                <option>East Carroll Parish</option>
                <option>East Feliciana Parish</option>
                <option>Evangeline Parish</option>
                <option>Franklin Parish</option>
                <option>Grant Parish</option>
                <option>Iberia Parish</option>
                <option>Iberville Parish</option>
                <option>Jackson Parish</option>
                <option>Jefferson Parish</option>
                <option>Jefferson Davis Parish</option>
                <option>Lafayette Parish</option>
                <option>Lafourche Parish</option>
                <option>LaSalle Parish</option>
                <option>Lincoln Parish</option>
                <option>Livingston Parish</option>
                <option>Madison Parish</option>
                <option>Morehouse Parish</option>
                <option>Natchitoches Parish</option>
                <option>Orleans Parish</option>
                <option>Ouachita Parish</option>
                <option>Plaquemines Parish</option>
                <option>Pointe Coupee Parish</option>
                <option>Rapides Parish</option>
                <option>Red River Parish</option>
                <option>Richland Parish</option>
                <option>Sabine Parish</option>
                <option>St. Bernard Parish</option>
                <option>St. Charles Parish</option>
                <option>St. Helena Parish</option>
                <option>St. James Parish</option>
                <option>St. John the Baptist Parish</option>
                <option>St. Landry Parish</option>
                <option>St. Martin Parish</option>
                <option>St. Mary Parish</option>
                <option>St. Tammany Parish</option>
                <option>Tangipahoa Parish</option>
                <option>Tensas Parish</option>
                <option>Terrebonne Parish</option>
                <option>Union Parish</option>
                <option>Vermilion Parish</option>
                <option>Vernon Parish</option>
                <option>Washington Parish</option>
                <option>Webster Parish</option>
                <option>West Baton Rouge Parish</option>
                <option>West Carroll Parish</option>
                <option>West Feliciana Parish</option>
                <option>Winn Parish</option>

            </Input>
        ),
        ME: (
            <Input type="select" name="county" className="w-auto" defaultValue={props.selection}>
                <option>Androscoggin County</option>
                <option>Aroostook County</option>
                <option>Cumberland County</option>
                <option>Franklin County</option>
                <option>Hancock County</option>
                <option>Kennebec County</option>
                <option>Knox County</option>
                <option>Lincoln County</option>
                <option>Oxford County</option>
                <option>Penobscot County</option>
                <option>Piscataquis County</option>
                <option>Sagadahoc County</option>
                <option>Somerset County</option>
                <option>Waldo County</option>
                <option>Washington County</option>
                <option>York County</option>

            </Input>
        ),
        MD: (
            <Input type="select" name="county" className="w-auto" defaultValue={props.selection}>
                <option>Allegany County</option>
                <option>Anne Arundel County</option>
                <option>Baltimore County</option>
                <option>Calvert County</option>
                <option>Caroline County</option>
                <option>Carroll County</option>
                <option>Cecil County</option>
                <option>Charles County</option>
                <option>Dorchester County</option>
                <option>Frederick County</option>
                <option>Garrett County</option>
                <option>Harford County</option>
                <option>Howard County</option>
                <option>Kent County</option>
                <option>Montgomery County</option>
                <option>Prince George's County</option>
                <option>Queen Anne's County</option>
                <option>St. Mary's County</option>
                <option>Somerset County</option>
                <option>Talbot County</option>
                <option>Washington County</option>
                <option>Wicomico County</option>
                <option>Worcester County</option>

            </Input>
        ),
        MA: (
            <Input type="select" name="county" className="w-auto" defaultValue={props.selection}>
                <option>Baltimore city</option>
                <option>Barnstable County</option>
                <option>Berkshire County</option>
                <option>Bristol County</option>
                <option>Dukes County</option>
                <option>Essex County</option>
                <option>Franklin County</option>
                <option>Hampden County</option>
                <option>Hampshire County</option>
                <option>Middlesex County</option>
                <option>Nantucket County</option>
                <option>Norfolk County</option>
                <option>Plymouth County</option>
                <option>Suffolk County</option>
                <option>Worcester County</option>

            </Input>
        ),
        MI: (
            <Input type="select" name="county" className="w-auto" defaultValue={props.selection}>
                <option>Alcona County</option>
                <option>Alger County</option>
                <option>Allegan County</option>
                <option>Alpena County</option>
                <option>Antrim County</option>
                <option>Arenac County</option>
                <option>Baraga County</option>
                <option>Barry County</option>
                <option>Bay County</option>
                <option>Benzie County</option>
                <option>Berrien County</option>
                <option>Branch County</option>
                <option>Calhoun County</option>
                <option>Cass County</option>
                <option>Charlevoix County</option>
                <option>Cheboygan County</option>
                <option>Chippewa County</option>
                <option>Clare County</option>
                <option>Clinton County</option>
                <option>Crawford County</option>
                <option>Delta County</option>
                <option>Dickinson County</option>
                <option>Eaton County</option>
                <option>Emmet County</option>
                <option>Genesee County</option>
                <option>Gladwin County</option>
                <option>Gogebic County</option>
                <option>Grand Traverse County</option>
                <option>Gratiot County</option>
                <option>Hillsdale County</option>
                <option>Houghton County</option>
                <option>Huron County</option>
                <option>Ingham County</option>
                <option>Ionia County</option>
                <option>Iosco County</option>
                <option>Iron County</option>
                <option>Isabella County</option>
                <option>Jackson County</option>
                <option>Kalamazoo County</option>
                <option>Kalkaska County</option>
                <option>Kent County</option>
                <option>Keweenaw County</option>
                <option>Lake County</option>
                <option>Lapeer County</option>
                <option>Leelanau County</option>
                <option>Lenawee County</option>
                <option>Livingston County</option>
                <option>Luce County</option>
                <option>Mackinac County</option>
                <option>Macomb County</option>
                <option>Manistee County</option>
                <option>Marquette County</option>
                <option>Mason County</option>
                <option>Mecosta County</option>
                <option>Menominee County</option>
                <option>Midland County</option>
                <option>Missaukee County</option>
                <option>Monroe County</option>
                <option>Montcalm County</option>
                <option>Montmorency County</option>
                <option>Muskegon County</option>
                <option>Newaygo County</option>
                <option>Oakland County</option>
                <option>Oceana County</option>
                <option>Ogemaw County</option>
                <option>Ontonagon County</option>
                <option>Osceola County</option>
                <option>Oscoda County</option>
                <option>Otsego County</option>
                <option>Ottawa County</option>
                <option>Presque Isle County</option>
                <option>Roscommon County</option>
                <option>Saginaw County</option>
                <option>St. Clair County</option>
                <option>St. Joseph County</option>
                <option>Sanilac County</option>
                <option>Schoolcraft County</option>
                <option>Shiawassee County</option>
                <option>Tuscola County</option>
                <option>Van Buren County</option>
                <option>Washtenaw County</option>
                <option>Wayne County</option>
                <option>Wexford County</option>

            </Input>
        ),
        MN: (
            <Input type="select" name="county" className="w-auto" defaultValue={props.selection}>
                <option>Aitkin County</option>
                <option>Anoka County</option>
                <option>Becker County</option>
                <option>Beltrami County</option>
                <option>Benton County</option>
                <option>Big Stone County</option>
                <option>Blue Earth County</option>
                <option>Brown County</option>
                <option>Carlton County</option>
                <option>Carver County</option>
                <option>Cass County</option>
                <option>Chippewa County</option>
                <option>Chisago County</option>
                <option>Clay County</option>
                <option>Clearwater County</option>
                <option>Cook County</option>
                <option>Cottonwood County</option>
                <option>Crow Wing County</option>
                <option>Dakota County</option>
                <option>Dodge County</option>
                <option>Douglas County</option>
                <option>Faribault County</option>
                <option>Fillmore County</option>
                <option>Freeborn County</option>
                <option>Goodhue County</option>
                <option>Grant County</option>
                <option>Hennepin County</option>
                <option>Houston County</option>
                <option>Hubbard County</option>
                <option>Isanti County</option>
                <option>Itasca County</option>
                <option>Jackson County</option>
                <option>Kanabec County</option>
                <option>Kandiyohi County</option>
                <option>Kittson County</option>
                <option>Koochiching County</option>
                <option>Lac qui Parle County</option>
                <option>Lake County</option>
                <option>Lake of the Woods County</option>
                <option>Le Sueur County</option>
                <option>Lincoln County</option>
                <option>Lyon County</option>
                <option>McLeod County</option>
                <option>Mahnomen County</option>
                <option>Marshall County</option>
                <option>Martin County</option>
                <option>Meeker County</option>
                <option>Mille Lacs County</option>
                <option>Morrison County</option>
                <option>Mower County</option>
                <option>Murray County</option>
                <option>Nicollet County</option>
                <option>Nobles County</option>
                <option>Norman County</option>
                <option>Olmsted County</option>
                <option>Otter Tail County</option>
                <option>Pennington County</option>
                <option>Pine County</option>
                <option>Pipestone County</option>
                <option>Polk County</option>
                <option>Pope County</option>
                <option>Ramsey County</option>
                <option>Red Lake County</option>
                <option>Redwood County</option>
                <option>Renville County</option>
                <option>Rice County</option>
                <option>Rock County</option>
                <option>Roseau County</option>
                <option>St. Louis County</option>
                <option>Scott County</option>
                <option>Sherburne County</option>
                <option>Sibley County</option>
                <option>Stearns County</option>
                <option>Steele County</option>
                <option>Stevens County</option>
                <option>Swift County</option>
                <option>Todd County</option>
                <option>Traverse County</option>
                <option>Wabasha County</option>
                <option>Wadena County</option>
                <option>Waseca County</option>
                <option>Washington County</option>
                <option>Watonwan County</option>
                <option>Wilkin County</option>
                <option>Winona County</option>
                <option>Wright County</option>
                <option>Yellow Medicine County</option>

            </Input>
        ),
        MS: (
            <Input type="select" name="county" className="w-auto" defaultValue={props.selection}>
                <option>Adams County</option>
                <option>Alcorn County</option>
                <option>Amite County</option>
                <option>Attala County</option>
                <option>Benton County</option>
                <option>Bolivar County</option>
                <option>Calhoun County</option>
                <option>Carroll County</option>
                <option>Chickasaw County</option>
                <option>Choctaw County</option>
                <option>Claiborne County</option>
                <option>Clarke County</option>
                <option>Clay County</option>
                <option>Coahoma County</option>
                <option>Copiah County</option>
                <option>Covington County</option>
                <option>DeSoto County</option>
                <option>Forrest County</option>
                <option>Franklin County</option>
                <option>George County</option>
                <option>Greene County</option>
                <option>Grenada County</option>
                <option>Hancock County</option>
                <option>Harrison County</option>
                <option>Hinds County</option>
                <option>Holmes County</option>
                <option>Humphreys County</option>
                <option>Issaquena County</option>
                <option>Itawamba County</option>
                <option>Jackson County</option>
                <option>Jasper County</option>
                <option>Jefferson County</option>
                <option>Jefferson Davis County</option>
                <option>Jones County</option>
                <option>Kemper County</option>
                <option>Lafayette County</option>
                <option>Lamar County</option>
                <option>Lauderdale County</option>
                <option>Lawrence County</option>
                <option>Leake County</option>
                <option>Lee County</option>
                <option>Leflore County</option>
                <option>Lincoln County</option>
                <option>Lowndes County</option>
                <option>Madison County</option>
                <option>Marion County</option>
                <option>Marshall County</option>
                <option>Monroe County</option>
                <option>Montgomery County</option>
                <option>Neshoba County</option>
                <option>Newton County</option>
                <option>Noxubee County</option>
                <option>Oktibbeha County</option>
                <option>Panola County</option>
                <option>Pearl River County</option>
                <option>Perry County</option>
                <option>Pike County</option>
                <option>Pontotoc County</option>
                <option>Prentiss County</option>
                <option>Quitman County</option>
                <option>Rankin County</option>
                <option>Scott County</option>
                <option>Sharkey County</option>
                <option>Simpson County</option>
                <option>Smith County</option>
                <option>Stone County</option>
                <option>Sunflower County</option>
                <option>Tallahatchie County</option>
                <option>Tate County</option>
                <option>Tippah County</option>
                <option>Tishomingo County</option>
                <option>Tunica County</option>
                <option>Union County</option>
                <option>Walthall County</option>
                <option>Warren County</option>
                <option>Washington County</option>
                <option>Wayne County</option>
                <option>Webster County</option>
                <option>Wilkinson County</option>
                <option>Winston County</option>
                <option>Yalobusha County</option>
                <option>Yazoo County</option>

            </Input>
        ),
        MO: (
            <Input type="select" name="county" className="w-auto" defaultValue={props.selection}>
                <option>Adair County</option>
                <option>Andrew County</option>
                <option>Atchison County</option>
                <option>Audrain County</option>
                <option>Barry County</option>
                <option>Barton County</option>
                <option>Bates County</option>
                <option>Benton County</option>
                <option>Bollinger County</option>
                <option>Boone County</option>
                <option>Buchanan County</option>
                <option>Butler County</option>
                <option>Caldwell County</option>
                <option>Callaway County</option>
                <option>Camden County</option>
                <option>Cape Girardeau County</option>
                <option>Carroll County</option>
                <option>Carter County</option>
                <option>Cass County</option>
                <option>Cedar County</option>
                <option>Chariton County</option>
                <option>Christian County</option>
                <option>Clark County</option>
                <option>Clay County</option>
                <option>Clinton County</option>
                <option>Cole County</option>
                <option>Cooper County</option>
                <option>Crawford County</option>
                <option>Dade County</option>
                <option>Dallas County</option>
                <option>Daviess County</option>
                <option>DeKalb County</option>
                <option>Dent County</option>
                <option>Douglas County</option>
                <option>Dunklin County</option>
                <option>Franklin County</option>
                <option>Gasconade County</option>
                <option>Gentry County</option>
                <option>Greene County</option>
                <option>Grundy County</option>
                <option>Harrison County</option>
                <option>Henry County</option>
                <option>Hickory County</option>
                <option>Holt County</option>
                <option>Howard County</option>
                <option>Howell County</option>
                <option>Iron County</option>
                <option>Jackson County</option>
                <option>Jasper County</option>
                <option>Jefferson County</option>
                <option>Johnson County</option>
                <option>Knox County</option>
                <option>Laclede County</option>
                <option>Lafayette County</option>
                <option>Lawrence County</option>
                <option>Lewis County</option>
                <option>Lincoln County</option>
                <option>Linn County</option>
                <option>Livingston County</option>
                <option>McDonald County</option>
                <option>Macon County</option>
                <option>Madison County</option>
                <option>Maries County</option>
                <option>Marion County</option>
                <option>Mercer County</option>
                <option>Miller County</option>
                <option>Mississippi County</option>
                <option>Moniteau County</option>
                <option>Monroe County</option>
                <option>Montgomery County</option>
                <option>Morgan County</option>
                <option>New Madrid County</option>
                <option>Newton County</option>
                <option>Nodaway County</option>
                <option>Oregon County</option>
                <option>Osage County</option>
                <option>Ozark County</option>
                <option>Pemiscot County</option>
                <option>Perry County</option>
                <option>Pettis County</option>
                <option>Phelps County</option>
                <option>Pike County</option>
                <option>Platte County</option>
                <option>Polk County</option>
                <option>Pulaski County</option>
                <option>Putnam County</option>
                <option>Ralls County</option>
                <option>Randolph County</option>
                <option>Ray County</option>
                <option>Reynolds County</option>
                <option>Ripley County</option>
                <option>St. Charles County</option>
                <option>St. Clair County</option>
                <option>Ste. Genevieve County</option>
                <option>St. Francois County</option>
                <option>St. Louis County</option>
                <option>Saline County</option>
                <option>Schuyler County</option>
                <option>Scotland County</option>
                <option>Scott County</option>
                <option>Shannon County</option>
                <option>Shelby County</option>
                <option>Stoddard County</option>
                <option>Stone County</option>
                <option>Sullivan County</option>
                <option>Taney County</option>
                <option>Texas County</option>
                <option>Vernon County</option>
                <option>Warren County</option>
                <option>Washington County</option>
                <option>Wayne County</option>
                <option>Webster County</option>
                <option>Worth County</option>
                <option>Wright County</option>
                <option>St. Louis city</option>

            </Input>
        ),
        MT: (
            <Input type="select" name="county" className="w-auto" defaultValue={props.selection}>
                <option>Beaverhead County</option>
                <option>Big Horn County</option>
                <option>Blaine County</option>
                <option>Broadwater County</option>
                <option>Carbon County</option>
                <option>Carter County</option>
                <option>Cascade County</option>
                <option>Chouteau County</option>
                <option>Custer County</option>
                <option>Daniels County</option>
                <option>Dawson County</option>
                <option>Deer Lodge County</option>
                <option>Fallon County</option>
                <option>Fergus County</option>
                <option>Flathead County</option>
                <option>Gallatin County</option>
                <option>Garfield County</option>
                <option>Glacier County</option>
                <option>Golden Valley County</option>
                <option>Granite County</option>
                <option>Hill County</option>
                <option>Jefferson County</option>
                <option>Judith Basin County</option>
                <option>Lake County</option>
                <option>Lewis and Clark County</option>
                <option>Liberty County</option>
                <option>Lincoln County</option>
                <option>McCone County</option>
                <option>Madison County</option>
                <option>Meagher County</option>
                <option>Mineral County</option>
                <option>Missoula County</option>
                <option>Musselshell County</option>
                <option>Park County</option>
                <option>Petroleum County</option>
                <option>Phillips County</option>
                <option>Pondera County</option>
                <option>Powder River County</option>
                <option>Powell County</option>
                <option>Prairie County</option>
                <option>Ravalli County</option>
                <option>Richland County</option>
                <option>Roosevelt County</option>
                <option>Rosebud County</option>
                <option>Sanders County</option>
                <option>Sheridan County</option>
                <option>Silver Bow County</option>
                <option>Stillwater County</option>
                <option>Sweet Grass County</option>
                <option>Teton County</option>
                <option>Toole County</option>
                <option>Treasure County</option>
                <option>Valley County</option>
                <option>Wheatland County</option>
                <option>Wibaux County</option>
                <option>Yellowstone County</option>

            </Input>
        ),
        NE: (
            <Input type="select" name="county" className="w-auto" defaultValue={props.selection}>
                <option>Adams County</option>
                <option>Antelope County</option>
                <option>Arthur County</option>
                <option>Banner County</option>
                <option>Blaine County</option>
                <option>Boone County</option>
                <option>Box Butte County</option>
                <option>Boyd County</option>
                <option>Brown County</option>
                <option>Buffalo County</option>
                <option>Burt County</option>
                <option>Butler County</option>
                <option>Cass County</option>
                <option>Cedar County</option>
                <option>Chase County</option>
                <option>Cherry County</option>
                <option>Cheyenne County</option>
                <option>Clay County</option>
                <option>Colfax County</option>
                <option>Cuming County</option>
                <option>Custer County</option>
                <option>Dakota County</option>
                <option>Dawes County</option>
                <option>Dawson County</option>
                <option>Deuel County</option>
                <option>Dixon County</option>
                <option>Dodge County</option>
                <option>Douglas County</option>
                <option>Dundy County</option>
                <option>Fillmore County</option>
                <option>Franklin County</option>
                <option>Frontier County</option>
                <option>Furnas County</option>
                <option>Gage County</option>
                <option>Garden County</option>
                <option>Garfield County</option>
                <option>Gosper County</option>
                <option>Grant County</option>
                <option>Greeley County</option>
                <option>Hall County</option>
                <option>Hamilton County</option>
                <option>Harlan County</option>
                <option>Hayes County</option>
                <option>Hitchcock County</option>
                <option>Holt County</option>
                <option>Hooker County</option>
                <option>Howard County</option>
                <option>Jefferson County</option>
                <option>Johnson County</option>
                <option>Kearney County</option>
                <option>Keith County</option>
                <option>Keya Paha County</option>
                <option>Kimball County</option>
                <option>Knox County</option>
                <option>Lancaster County</option>
                <option>Lincoln County</option>
                <option>Logan County</option>
                <option>Loup County</option>
                <option>McPherson County</option>
                <option>Madison County</option>
                <option>Merrick County</option>
                <option>Morrill County</option>
                <option>Nance County</option>
                <option>Nemaha County</option>
                <option>Nuckolls County</option>
                <option>Otoe County</option>
                <option>Pawnee County</option>
                <option>Perkins County</option>
                <option>Phelps County</option>
                <option>Pierce County</option>
                <option>Platte County</option>
                <option>Polk County</option>
                <option>Red Willow County</option>
                <option>Richardson County</option>
                <option>Rock County</option>
                <option>Saline County</option>
                <option>Sarpy County</option>
                <option>Saunders County</option>
                <option>Scotts Bluff County</option>
                <option>Seward County</option>
                <option>Sheridan County</option>
                <option>Sherman County</option>
                <option>Sioux County</option>
                <option>Stanton County</option>
                <option>Thayer County</option>
                <option>Thomas County</option>
                <option>Thurston County</option>
                <option>Valley County</option>
                <option>Washington County</option>
                <option>Wayne County</option>
                <option>Webster County</option>
                <option>Wheeler County</option>
                <option>York County</option>

            </Input>
        ),
        NV: (
            <Input type="select" name="county" className="w-auto" defaultValue={props.selection}>
                <option>Churchill County</option>
                <option>Clark County</option>
                <option>Douglas County</option>
                <option>Elko County</option>
                <option>Esmeralda County</option>
                <option>Eureka County</option>
                <option>Humboldt County</option>
                <option>Lander County</option>
                <option>Lincoln County</option>
                <option>Lyon County</option>
                <option>Mineral County</option>
                <option>Nye County</option>
                <option>Pershing County</option>
                <option>Storey County</option>
                <option>Washoe County</option>
                <option>White Pine County</option>
                <option>Carson City</option>

            </Input>
        ),
        NH: (
            <Input type="select" name="county" className="w-auto" defaultValue={props.selection}>
                <option>Belknap County</option>
                <option>Carroll County</option>
                <option>Cheshire County</option>
                <option>Coos County</option>
                <option>Grafton County</option>
                <option>Hillsborough County</option>
                <option>Merrimack County</option>
                <option>Rockingham County</option>
                <option>Strafford County</option>
                <option>Sullivan County</option>

            </Input>
        ),
        NJ: (
            <Input type="select" name="county" className="w-auto" defaultValue={props.selection}>
                <option>Atlantic County</option>
                <option>Bergen County</option>
                <option>Burlington County</option>
                <option>Camden County</option>
                <option>Cape May County</option>
                <option>Cumberland County</option>
                <option>Essex County</option>
                <option>Gloucester County</option>
                <option>Hudson County</option>
                <option>Hunterdon County</option>
                <option>Mercer County</option>
                <option>Middlesex County</option>
                <option>Monmouth County</option>
                <option>Morris County</option>
                <option>Ocean County</option>
                <option>Passaic County</option>
                <option>Salem County</option>
                <option>Somerset County</option>
                <option>Sussex County</option>
                <option>Union County</option>
                <option>Warren County</option>

            </Input>
        ),
        NM: (
            <Input type="select" name="county" className="w-auto" defaultValue={props.selection}>
                <option>Bernalillo County</option>
                <option>Catron County</option>
                <option>Chaves County</option>
                <option>Cibola County</option>
                <option>Colfax County</option>
                <option>Curry County</option>
                <option>De Baca County</option>
                <option>Doña Ana County</option>
                <option>Eddy County</option>
                <option>Grant County</option>
                <option>Guadalupe County</option>
                <option>Harding County</option>
                <option>Hidalgo County</option>
                <option>Lea County</option>
                <option>Lincoln County</option>
                <option>Los Alamos County</option>
                <option>Luna County</option>
                <option>McKinley County</option>
                <option>Mora County</option>
                <option>Otero County</option>
                <option>Quay County</option>
                <option>Rio Arriba County</option>
                <option>Roosevelt County</option>
                <option>Sandoval County</option>
                <option>San Juan County</option>
                <option>San Miguel County</option>
                <option>Santa Fe County</option>
                <option>Sierra County</option>
                <option>Socorro County</option>
                <option>Taos County</option>
                <option>Torrance County</option>
                <option>Union County</option>
                <option>Valencia County</option>

            </Input>
        ),
        NY: (
            <Input type="select" name="county" className="w-auto" defaultValue={props.selection}>
                <option>Albany County</option>
                <option>Allegany County</option>
                <option>Bronx County</option>
                <option>Broome County</option>
                <option>Cattaraugus County</option>
                <option>Cayuga County</option>
                <option>Chautauqua County</option>
                <option>Chemung County</option>
                <option>Chenango County</option>
                <option>Clinton County</option>
                <option>Columbia County</option>
                <option>Cortland County</option>
                <option>Delaware County</option>
                <option>Dutchess County</option>
                <option>Erie County</option>
                <option>Essex County</option>
                <option>Franklin County</option>
                <option>Fulton County</option>
                <option>Genesee County</option>
                <option>Greene County</option>
                <option>Hamilton County</option>
                <option>Herkimer County</option>
                <option>Jefferson County</option>
                <option>Kings County</option>
                <option>Lewis County</option>
                <option>Livingston County</option>
                <option>Madison County</option>
                <option>Monroe County</option>
                <option>Montgomery County</option>
                <option>Nassau County</option>
                <option>New York County</option>
                <option>Niagara County</option>
                <option>Oneida County</option>
                <option>Onondaga County</option>
                <option>Ontario County</option>
                <option>Orange County</option>
                <option>Orleans County</option>
                <option>Oswego County</option>
                <option>Otsego County</option>
                <option>Putnam County</option>
                <option>Queens County</option>
                <option>Rensselaer County</option>
                <option>Richmond County</option>
                <option>Rockland County</option>
                <option>St. Lawrence County</option>
                <option>Saratoga County</option>
                <option>Schenectady County</option>
                <option>Schoharie County</option>
                <option>Schuyler County</option>
                <option>Seneca County</option>
                <option>Steuben County</option>
                <option>Suffolk County</option>
                <option>Sullivan County</option>
                <option>Tioga County</option>
                <option>Tompkins County</option>
                <option>Ulster County</option>
                <option>Warren County</option>
                <option>Washington County</option>
                <option>Wayne County</option>
                <option>Westchester County</option>
                <option>Wyoming County</option>
                <option>Yates County</option>

            </Input>
        ),
        NC: (
            <Input type="select" name="county" className="w-auto" defaultValue={props.selection}>
                <option>Alamance County</option>
                <option>Alexander County</option>
                <option>Alleghany County</option>
                <option>Anson County</option>
                <option>Ashe County</option>
                <option>Avery County</option>
                <option>Beaufort County</option>
                <option>Bertie County</option>
                <option>Bladen County</option>
                <option>Brunswick County</option>
                <option>Buncombe County</option>
                <option>Burke County</option>
                <option>Cabarrus County</option>
                <option>Caldwell County</option>
                <option>Camden County</option>
                <option>Carteret County</option>
                <option>Caswell County</option>
                <option>Catawba County</option>
                <option>Chatham County</option>
                <option>Cherokee County</option>
                <option>Chowan County</option>
                <option>Clay County</option>
                <option>Cleveland County</option>
                <option>Columbus County</option>
                <option>Craven County</option>
                <option>Cumberland County</option>
                <option>Currituck County</option>
                <option>Dare County</option>
                <option>Davidson County</option>
                <option>Davie County</option>
                <option>Duplin County</option>
                <option>Durham County</option>
                <option>Edgecombe County</option>
                <option>Forsyth County</option>
                <option>Franklin County</option>
                <option>Gaston County</option>
                <option>Gates County</option>
                <option>Graham County</option>
                <option>Granville County</option>
                <option>Greene County</option>
                <option>Guilford County</option>
                <option>Halifax County</option>
                <option>Harnett County</option>
                <option>Haywood County</option>
                <option>Henderson County</option>
                <option>Hertford County</option>
                <option>Hoke County</option>
                <option>Hyde County</option>
                <option>Iredell County</option>
                <option>Jackson County</option>
                <option>Johnston County</option>
                <option>Jones County</option>
                <option>Lee County</option>
                <option>Lenoir County</option>
                <option>Lincoln County</option>
                <option>McDowell County</option>
                <option>Macon County</option>
                <option>Madison County</option>
                <option>Martin County</option>
                <option>Mecklenburg County</option>
                <option>Mitchell County</option>
                <option>Montgomery County</option>
                <option>Moore County</option>
                <option>Nash County</option>
                <option>New Hanover County</option>
                <option>Northampton County</option>
                <option>Onslow County</option>
                <option>Orange County</option>
                <option>Pamlico County</option>
                <option>Pasquotank County</option>
                <option>Pender County</option>
                <option>Perquimans County</option>
                <option>Person County</option>
                <option>Pitt County</option>
                <option>Polk County</option>
                <option>Randolph County</option>
                <option>Richmond County</option>
                <option>Robeson County</option>
                <option>Rockingham County</option>
                <option>Rowan County</option>
                <option>Rutherford County</option>
                <option>Sampson County</option>
                <option>Scotland County</option>
                <option>Stanly County</option>
                <option>Stokes County</option>
                <option>Surry County</option>
                <option>Swain County</option>
                <option>Transylvania County</option>
                <option>Tyrrell County</option>
                <option>Union County</option>
                <option>Vance County</option>
                <option>Wake County</option>
                <option>Warren County</option>
                <option>Washington County</option>
                <option>Watauga County</option>
                <option>Wayne County</option>
                <option>Wilkes County</option>
                <option>Wilson County</option>
                <option>Yadkin County</option>
                <option>Yancey County</option>

            </Input>
        ),
        ND: (
            <Input type="select" name="county" className="w-auto" defaultValue={props.selection}>
                <option>Adams County</option>
                <option>Barnes County</option>
                <option>Benson County</option>
                <option>Billings County</option>
                <option>Bottineau County</option>
                <option>Bowman County</option>
                <option>Burke County</option>
                <option>Burleigh County</option>
                <option>Cass County</option>
                <option>Cavalier County</option>
                <option>Dickey County</option>
                <option>Divide County</option>
                <option>Dunn County</option>
                <option>Eddy County</option>
                <option>Emmons County</option>
                <option>Foster County</option>
                <option>Golden Valley County</option>
                <option>Grand Forks County</option>
                <option>Grant County</option>
                <option>Griggs County</option>
                <option>Hettinger County</option>
                <option>Kidder County</option>
                <option>LaMoure County</option>
                <option>Logan County</option>
                <option>McHenry County</option>
                <option>McIntosh County</option>
                <option>McKenzie County</option>
                <option>McLean County</option>
                <option>Mercer County</option>
                <option>Morton County</option>
                <option>Mountrail County</option>
                <option>Nelson County</option>
                <option>Oliver County</option>
                <option>Pembina County</option>
                <option>Pierce County</option>
                <option>Ramsey County</option>
                <option>Ransom County</option>
                <option>Renville County</option>
                <option>Richland County</option>
                <option>Rolette County</option>
                <option>Sargent County</option>
                <option>Sheridan County</option>
                <option>Sioux County</option>
                <option>Slope County</option>
                <option>Stark County</option>
                <option>Steele County</option>
                <option>Stutsman County</option>
                <option>Towner County</option>
                <option>Traill County</option>
                <option>Walsh County</option>
                <option>Ward County</option>
                <option>Wells County</option>
                <option>Williams County</option>

            </Input>
        ),
        OH: (
            <Input type="select" name="county" className="w-auto" defaultValue={props.selection}>
                <option>Adams County</option>
                <option>Allen County</option>
                <option>Ashland County</option>
                <option>Ashtabula County</option>
                <option>Athens County</option>
                <option>Auglaize County</option>
                <option>Belmont County</option>
                <option>Brown County</option>
                <option>Butler County</option>
                <option>Carroll County</option>
                <option>Champaign County</option>
                <option>Clark County</option>
                <option>Clermont County</option>
                <option>Clinton County</option>
                <option>Columbiana County</option>
                <option>Coshocton County</option>
                <option>Crawford County</option>
                <option>Cuyahoga County</option>
                <option>Darke County</option>
                <option>Defiance County</option>
                <option>Delaware County</option>
                <option>Erie County</option>
                <option>Fairfield County</option>
                <option>Fayette County</option>
                <option>Franklin County</option>
                <option>Fulton County</option>
                <option>Gallia County</option>
                <option>Geauga County</option>
                <option>Greene County</option>
                <option>Guernsey County</option>
                <option>Hamilton County</option>
                <option>Hancock County</option>
                <option>Hardin County</option>
                <option>Harrison County</option>
                <option>Henry County</option>
                <option>Highland County</option>
                <option>Hocking County</option>
                <option>Holmes County</option>
                <option>Huron County</option>
                <option>Jackson County</option>
                <option>Jefferson County</option>
                <option>Knox County</option>
                <option>Lake County</option>
                <option>Lawrence County</option>
                <option>Licking County</option>
                <option>Logan County</option>
                <option>Lorain County</option>
                <option>Lucas County</option>
                <option>Madison County</option>
                <option>Mahoning County</option>
                <option>Marion County</option>
                <option>Medina County</option>
                <option>Meigs County</option>
                <option>Mercer County</option>
                <option>Miami County</option>
                <option>Monroe County</option>
                <option>Montgomery County</option>
                <option>Morgan County</option>
                <option>Morrow County</option>
                <option>Muskingum County</option>
                <option>Noble County</option>
                <option>Ottawa County</option>
                <option>Paulding County</option>
                <option>Perry County</option>
                <option>Pickaway County</option>
                <option>Pike County</option>
                <option>Portage County</option>
                <option>Preble County</option>
                <option>Putnam County</option>
                <option>Richland County</option>
                <option>Ross County</option>
                <option>Sandusky County</option>
                <option>Scioto County</option>
                <option>Seneca County</option>
                <option>Shelby County</option>
                <option>Stark County</option>
                <option>Summit County</option>
                <option>Trumbull County</option>
                <option>Tuscarawas County</option>
                <option>Union County</option>
                <option>Van Wert County</option>
                <option>Vinton County</option>
                <option>Warren County</option>
                <option>Washington County</option>
                <option>Wayne County</option>
                <option>Williams County</option>
                <option>Wood County</option>
                <option>Wyandot County</option>

            </Input>
        ),
        OK: (
            <Input type="select" name="county" className="w-auto" defaultValue={props.selection}>
                <option>Adair County</option>
                <option>Alfalfa County</option>
                <option>Atoka County</option>
                <option>Beaver County</option>
                <option>Beckham County</option>
                <option>Blaine County</option>
                <option>Bryan County</option>
                <option>Caddo County</option>
                <option>Canadian County</option>
                <option>Carter County</option>
                <option>Cherokee County</option>
                <option>Choctaw County</option>
                <option>Cimarron County</option>
                <option>Cleveland County</option>
                <option>Coal County</option>
                <option>Comanche County</option>
                <option>Cotton County</option>
                <option>Craig County</option>
                <option>Creek County</option>
                <option>Custer County</option>
                <option>Delaware County</option>
                <option>Dewey County</option>
                <option>Ellis County</option>
                <option>Garfield County</option>
                <option>Garvin County</option>
                <option>Grady County</option>
                <option>Grant County</option>
                <option>Greer County</option>
                <option>Harmon County</option>
                <option>Harper County</option>
                <option>Haskell County</option>
                <option>Hughes County</option>
                <option>Jackson County</option>
                <option>Jefferson County</option>
                <option>Johnston County</option>
                <option>Kay County</option>
                <option>Kingfisher County</option>
                <option>Kiowa County</option>
                <option>Latimer County</option>
                <option>Le Flore County</option>
                <option>Lincoln County</option>
                <option>Logan County</option>
                <option>Love County</option>
                <option>McClain County</option>
                <option>McCurtain County</option>
                <option>McIntosh County</option>
                <option>Major County</option>
                <option>Marshall County</option>
                <option>Mayes County</option>
                <option>Murray County</option>
                <option>Muskogee County</option>
                <option>Noble County</option>
                <option>Nowata County</option>
                <option>Okfuskee County</option>
                <option>Oklahoma County</option>
                <option>Okmulgee County</option>
                <option>Osage County</option>
                <option>Ottawa County</option>
                <option>Pawnee County</option>
                <option>Payne County</option>
                <option>Pittsburg County</option>
                <option>Pontotoc County</option>
                <option>Pottawatomie County</option>
                <option>Pushmataha County</option>
                <option>Roger Mills County</option>
                <option>Rogers County</option>
                <option>Seminole County</option>
                <option>Sequoyah County</option>
                <option>Stephens County</option>
                <option>Texas County</option>
                <option>Tillman County</option>
                <option>Tulsa County</option>
                <option>Wagoner County</option>
                <option>Washington County</option>
                <option>Washita County</option>
                <option>Woods County</option>
                <option>Woodward County</option>


            </Input>
        ),
        OR: (
            <Input type="select" name="county" className="w-auto" defaultValue={props.selection}>
                <option>Baker County</option>
                <option>Benton County</option>
                <option>Clackamas County</option>
                <option>Clatsop County</option>
                <option>Columbia County</option>
                <option>Coos County</option>
                <option>Crook County</option>
                <option>Curry County</option>
                <option>Deschutes County</option>
                <option>Douglas County</option>
                <option>Gilliam County</option>
                <option>Grant County</option>
                <option>Harney County</option>
                <option>Hood River County</option>
                <option>Jackson County</option>
                <option>Jefferson County</option>
                <option>Josephine County</option>
                <option>Klamath County</option>
                <option>Lake County</option>
                <option>Lane County</option>
                <option>Lincoln County</option>
                <option>Linn County</option>
                <option>Malheur County</option>
                <option>Marion County</option>
                <option>Morrow County</option>
                <option>Multnomah County</option>
                <option>Polk County</option>
                <option>Sherman County</option>
                <option>Tillamook County</option>
                <option>Umatilla County</option>
                <option>Union County</option>
                <option>Wallowa County</option>
                <option>Wasco County</option>
                <option>Washington County</option>
                <option>Wheeler County</option>
                <option>Yamhill County</option>

            </Input>
        ),
        PA: (
            <Input type="select" name="county" className="w-auto" defaultValue={props.selection}>
                <option>Adams County</option>
                <option>Allegheny County</option>
                <option>Armstrong County</option>
                <option>Beaver County</option>
                <option>Bedford County</option>
                <option>Berks County</option>
                <option>Blair County</option>
                <option>Bradford County</option>
                <option>Bucks County</option>
                <option>Butler County</option>
                <option>Cambria County</option>
                <option>Cameron County</option>
                <option>Carbon County</option>
                <option>Centre County</option>
                <option>Chester County</option>
                <option>Clarion County</option>
                <option>Clearfield County</option>
                <option>Clinton County</option>
                <option>Columbia County</option>
                <option>Crawford County</option>
                <option>Cumberland County</option>
                <option>Dauphin County</option>
                <option>Delaware County</option>
                <option>Elk County</option>
                <option>Erie County</option>
                <option>Fayette County</option>
                <option>Forest County</option>
                <option>Franklin County</option>
                <option>Fulton County</option>
                <option>Greene County</option>
                <option>Huntingdon County</option>
                <option>Indiana County</option>
                <option>Jefferson County</option>
                <option>Juniata County</option>
                <option>Lackawanna County</option>
                <option>Lancaster County</option>
                <option>Lawrence County</option>
                <option>Lebanon County</option>
                <option>Lehigh County</option>
                <option>Luzerne County</option>
                <option>Lycoming County</option>
                <option>McKean County</option>
                <option>Mercer County</option>
                <option>Mifflin County</option>
                <option>Monroe County</option>
                <option>Montgomery County</option>
                <option>Montour County</option>
                <option>Northampton County</option>
                <option>Northumberland County</option>
                <option>Perry County</option>
                <option>Philadelphia County</option>
                <option>Pike County</option>
                <option>Potter County</option>
                <option>Schuylkill County</option>
                <option>Snyder County</option>
                <option>Somerset County</option>
                <option>Sullivan County</option>
                <option>Susquehanna County</option>
                <option>Tioga County</option>
                <option>Union County</option>
                <option>Venango County</option>
                <option>Warren County</option>
                <option>Washington County</option>
                <option>Wayne County</option>
                <option>Westmoreland County</option>
                <option>Wyoming County</option>
                <option>York County</option>

            </Input>
        ),
        RI: (
            <Input type="select" name="county" className="w-auto" defaultValue={props.selection}>
                <option>Bristol County</option>
                <option>Kent County</option>
                <option>Newport County</option>
                <option>Providence County</option>
                <option>Washington County</option>

            </Input>
        ),
        SC: (
            <Input type="select" name="county" className="w-auto" defaultValue={props.selection}>
                <option>Abbeville County</option>
                <option>Aiken County</option>
                <option>Allendale County</option>
                <option>Anderson County</option>
                <option>Bamberg County</option>
                <option>Barnwell County</option>
                <option>Beaufort County</option>
                <option>Berkeley County</option>
                <option>Calhoun County</option>
                <option>Charleston County</option>
                <option>Cherokee County</option>
                <option>Chester County</option>
                <option>Chesterfield County</option>
                <option>Clarendon County</option>
                <option>Colleton County</option>
                <option>Darlington County</option>
                <option>Dillon County</option>
                <option>Dorchester County</option>
                <option>Edgefield County</option>
                <option>Fairfield County</option>
                <option>Florence County</option>
                <option>Georgetown County</option>
                <option>Greenville County</option>
                <option>Greenwood County</option>
                <option>Hampton County</option>
                <option>Horry County</option>
                <option>Jasper County</option>
                <option>Kershaw County</option>
                <option>Lancaster County</option>
                <option>Laurens County</option>
                <option>Lee County</option>
                <option>Lexington County</option>
                <option>McCormick County</option>
                <option>Marion County</option>
                <option>Marlboro County</option>
                <option>Newberry County</option>
                <option>Oconee County</option>
                <option>Orangeburg County</option>
                <option>Pickens County</option>
                <option>Richland County</option>
                <option>Saluda County</option>
                <option>Spartanburg County</option>
                <option>Sumter County</option>
                <option>Union County</option>
                <option>Williamsburg County</option>
                <option>York County</option>

            </Input>
        ),
        SD: (
            <Input type="select" name="county" className="w-auto" defaultValue={props.selection}>
                <option>Aurora County</option>
                <option>Beadle County</option>
                <option>Bennett County</option>
                <option>Bon Homme County</option>
                <option>Brookings County</option>
                <option>Brown County</option>
                <option>Brule County</option>
                <option>Buffalo County</option>
                <option>Butte County</option>
                <option>Campbell County</option>
                <option>Charles Mix County</option>
                <option>Clark County</option>
                <option>Clay County</option>
                <option>Codington County</option>
                <option>Corson County</option>
                <option>Custer County</option>
                <option>Davison County</option>
                <option>Day County</option>
                <option>Deuel County</option>
                <option>Dewey County</option>
                <option>Douglas County</option>
                <option>Edmunds County</option>
                <option>Fall River County</option>
                <option>Faulk County</option>
                <option>Grant County</option>
                <option>Gregory County</option>
                <option>Haakon County</option>
                <option>Hamlin County</option>
                <option>Hand County</option>
                <option>Hanson County</option>
                <option>Harding County</option>
                <option>Hughes County</option>
                <option>Hutchinson County</option>
                <option>Hyde County</option>
                <option>Jackson County</option>
                <option>Jerauld County</option>
                <option>Jones County</option>
                <option>Kingsbury County</option>
                <option>Lake County</option>
                <option>Lawrence County</option>
                <option>Lincoln County</option>
                <option>Lyman County</option>
                <option>McCook County</option>
                <option>McPherson County</option>
                <option>Marshall County</option>
                <option>Meade County</option>
                <option>Mellette County</option>
                <option>Miner County</option>
                <option>Minnehaha County</option>
                <option>Moody County</option>
                <option>Oglala Lakota County</option>
                <option>Pennington County</option>
                <option>Perkins County</option>
                <option>Potter County</option>
                <option>Roberts County</option>
                <option>Sanborn County</option>
                <option>Spink County</option>
                <option>Stanley County</option>
                <option>Sully County</option>
                <option>Todd County</option>
                <option>Tripp County</option>
                <option>Turner County</option>
                <option>Union County</option>
                <option>Walworth County</option>
                <option>Yankton County</option>
                <option>Ziebach County</option>

            </Input>
        ),
        TN: (
            <Input type="select" name="county" className="w-auto" defaultValue={props.selection}>
                <option>Anderson County</option>
                <option>Bedford County</option>
                <option>Benton County</option>
                <option>Bledsoe County</option>
                <option>Blount County</option>
                <option>Bradley County</option>
                <option>Campbell County</option>
                <option>Cannon County</option>
                <option>Carroll County</option>
                <option>Carter County</option>
                <option>Cheatham County</option>
                <option>Chester County</option>
                <option>Claiborne County</option>
                <option>Clay County</option>
                <option>Cocke County</option>
                <option>Coffee County</option>
                <option>Crockett County</option>
                <option>Cumberland County</option>
                <option>Davidson County</option>
                <option>Decatur County</option>
                <option>DeKalb County</option>
                <option>Dickson County</option>
                <option>Dyer County</option>
                <option>Fayette County</option>
                <option>Fentress County</option>
                <option>Franklin County</option>
                <option>Gibson County</option>
                <option>Giles County</option>
                <option>Grainger County</option>
                <option>Greene County</option>
                <option>Grundy County</option>
                <option>Hamblen County</option>
                <option>Hamilton County</option>
                <option>Hancock County</option>
                <option>Hardeman County</option>
                <option>Hardin County</option>
                <option>Hawkins County</option>
                <option>Haywood County</option>
                <option>Henderson County</option>
                <option>Henry County</option>
                <option>Hickman County</option>
                <option>Houston County</option>
                <option>Humphreys County</option>
                <option>Jackson County</option>
                <option>Jefferson County</option>
                <option>Johnson County</option>
                <option>Knox County</option>
                <option>Lake County</option>
                <option>Lauderdale County</option>
                <option>Lawrence County</option>
                <option>Lewis County</option>
                <option>Lincoln County</option>
                <option>Loudon County</option>
                <option>McMinn County</option>
                <option>McNairy County</option>
                <option>Macon County</option>
                <option>Madison County</option>
                <option>Marion County</option>
                <option>Marshall County</option>
                <option>Maury County</option>
                <option>Meigs County</option>
                <option>Monroe County</option>
                <option>Montgomery County</option>
                <option>Moore County</option>
                <option>Morgan County</option>
                <option>Obion County</option>
                <option>Overton County</option>
                <option>Perry County</option>
                <option>Pickett County</option>
                <option>Polk County</option>
                <option>Putnam County</option>
                <option>Rhea County</option>
                <option>Roane County</option>
                <option>Robertson County</option>
                <option>Rutherford County</option>
                <option>Scott County</option>
                <option>Sequatchie County</option>
                <option>Sevier County</option>
                <option>Shelby County</option>
                <option>Smith County</option>
                <option>Stewart County</option>
                <option>Sullivan County</option>
                <option>Sumner County</option>
                <option>Tipton County</option>
                <option>Trousdale County</option>
                <option>Unicoi County</option>
                <option>Union County</option>
                <option>Van Buren County</option>
                <option>Warren County</option>
                <option>Washington County</option>
                <option>Wayne County</option>
                <option>Weakley County</option>
                <option>White County</option>
                <option>Williamson County</option>
                <option>Wilson County</option>

            </Input>
        ),
        TX: (
            <Input type="select" name="county" className="w-auto" defaultValue={props.selection}>
                <option>Anderson County</option>
                <option>Andrews County</option>
                <option>Angelina County</option>
                <option>Aransas County</option>
                <option>Archer County</option>
                <option>Armstrong County</option>
                <option>Atascosa County</option>
                <option>Austin County</option>
                <option>Bailey County</option>
                <option>Bandera County</option>
                <option>Bastrop County</option>
                <option>Baylor County</option>
                <option>Bee County</option>
                <option>Bell County</option>
                <option>Bexar County</option>
                <option>Blanco County</option>
                <option>Borden County</option>
                <option>Bosque County</option>
                <option>Bowie County</option>
                <option>Brazoria County</option>
                <option>Brazos County</option>
                <option>Brewster County</option>
                <option>Briscoe County</option>
                <option>Brooks County</option>
                <option>Brown County</option>
                <option>Burleson County</option>
                <option>Burnet County</option>
                <option>Caldwell County</option>
                <option>Calhoun County</option>
                <option>Callahan County</option>
                <option>Cameron County</option>
                <option>Camp County</option>
                <option>Carson County</option>
                <option>Cass County</option>
                <option>Castro County</option>
                <option>Chambers County</option>
                <option>Cherokee County</option>
                <option>Childress County</option>
                <option>Clay County</option>
                <option>Cochran County</option>
                <option>Coke County</option>
                <option>Coleman County</option>
                <option>Collin County</option>
                <option>Collingsworth County</option>
                <option>Colorado County</option>
                <option>Comal County</option>
                <option>Comanche County</option>
                <option>Concho County</option>
                <option>Cooke County</option>
                <option>Coryell County</option>
                <option>Cottle County</option>
                <option>Crane County</option>
                <option>Crockett County</option>
                <option>Crosby County</option>
                <option>Culberson County</option>
                <option>Dallam County</option>
                <option>Dallas County</option>
                <option>Dawson County</option>
                <option>Deaf Smith County</option>
                <option>Delta County</option>
                <option>Denton County</option>
                <option>DeWitt County</option>
                <option>Dickens County</option>
                <option>Dimmit County</option>
                <option>Donley County</option>
                <option>Duval County</option>
                <option>Eastland County</option>
                <option>Ector County</option>
                <option>Edwards County</option>
                <option>Ellis County</option>
                <option>El Paso County</option>
                <option>Erath County</option>
                <option>Falls County</option>
                <option>Fannin County</option>
                <option>Fayette County</option>
                <option>Fisher County</option>
                <option>Floyd County</option>
                <option>Foard County</option>
                <option>Fort Bend County</option>
                <option>Franklin County</option>
                <option>Freestone County</option>
                <option>Frio County</option>
                <option>Gaines County</option>
                <option>Galveston County</option>
                <option>Garza County</option>
                <option>Gillespie County</option>
                <option>Glasscock County</option>
                <option>Goliad County</option>
                <option>Gonzales County</option>
                <option>Gray County</option>
                <option>Grayson County</option>
                <option>Gregg County</option>
                <option>Grimes County</option>
                <option>Guadalupe County</option>
                <option>Hale County</option>
                <option>Hall County</option>
                <option>Hamilton County</option>
                <option>Hansford County</option>
                <option>Hardeman County</option>
                <option>Hardin County</option>
                <option>Harris County</option>
                <option>Harrison County</option>
                <option>Hartley County</option>
                <option>Haskell County</option>
                <option>Hays County</option>
                <option>Hemphill County</option>
                <option>Henderson County</option>
                <option>Hidalgo County</option>
                <option>Hill County</option>
                <option>Hockley County</option>
                <option>Hood County</option>
                <option>Hopkins County</option>
                <option>Houston County</option>
                <option>Howard County</option>
                <option>Hudspeth County</option>
                <option>Hunt County</option>
                <option>Hutchinson County</option>
                <option>Irion County</option>
                <option>Jack County</option>
                <option>Jackson County</option>
                <option>Jasper County</option>
                <option>Jeff Davis County</option>
                <option>Jefferson County</option>
                <option>Jim Hogg County</option>
                <option>Jim Wells County</option>
                <option>Johnson County</option>
                <option>Jones County</option>
                <option>Karnes County</option>
                <option>Kaufman County</option>
                <option>Kendall County</option>
                <option>Kenedy County</option>
                <option>Kent County</option>
                <option>Kerr County</option>
                <option>Kimble County</option>
                <option>King County</option>
                <option>Kinney County</option>
                <option>Kleberg County</option>
                <option>Knox County</option>
                <option>Lamar County</option>
                <option>Lamb County</option>
                <option>Lampasas County</option>
                <option>La Salle County</option>
                <option>Lavaca County</option>
                <option>Lee County</option>
                <option>Leon County</option>
                <option>Liberty County</option>
                <option>Limestone County</option>
                <option>Lipscomb County</option>
                <option>Live Oak County</option>
                <option>Llano County</option>
                <option>Loving County</option>
                <option>Lubbock County</option>
                <option>Lynn County</option>
                <option>McCulloch County</option>
                <option>McLennan County</option>
                <option>McMullen County</option>
                <option>Madison County</option>
                <option>Marion County</option>
                <option>Martin County</option>
                <option>Mason County</option>
                <option>Matagorda County</option>
                <option>Maverick County</option>
                <option>Medina County</option>
                <option>Menard County</option>
                <option>Midland County</option>
                <option>Milam County</option>
                <option>Mills County</option>
                <option>Mitchell County</option>
                <option>Montague County</option>
                <option>Montgomery County</option>
                <option>Moore County</option>
                <option>Morris County</option>
                <option>Motley County</option>
                <option>Nacogdoches County</option>
                <option>Navarro County</option>
                <option>Newton County</option>
                <option>Nolan County</option>
                <option>Nueces County</option>
                <option>Ochiltree County</option>
                <option>Oldham County</option>
                <option>Orange County</option>
                <option>Palo Pinto County</option>
                <option>Panola County</option>
                <option>Parker County</option>
                <option>Parmer County</option>
                <option>Pecos County</option>
                <option>Polk County</option>
                <option>Potter County</option>
                <option>Presidio County</option>
                <option>Rains County</option>
                <option>Randall County</option>
                <option>Reagan County</option>
                <option>Real County</option>
                <option>Red River County</option>
                <option>Reeves County</option>
                <option>Refugio County</option>
                <option>Roberts County</option>
                <option>Robertson County</option>
                <option>Rockwall County</option>
                <option>Runnels County</option>
                <option>Rusk County</option>
                <option>Sabine County</option>
                <option>San Augustine County</option>
                <option>San Jacinto County</option>
                <option>San Patricio County</option>
                <option>San Saba County</option>
                <option>Schleicher County</option>
                <option>Scurry County</option>
                <option>Shackelford County</option>
                <option>Shelby County</option>
                <option>Sherman County</option>
                <option>Smith County</option>
                <option>Somervell County</option>
                <option>Starr County</option>
                <option>Stephens County</option>
                <option>Sterling County</option>
                <option>Stonewall County</option>
                <option>Sutton County</option>
                <option>Swisher County</option>
                <option>Tarrant County</option>
                <option>Taylor County</option>
                <option>Terrell County</option>
                <option>Terry County</option>
                <option>Throckmorton County</option>
                <option>Titus County</option>
                <option>Tom Green County</option>
                <option>Travis County</option>
                <option>Trinity County</option>
                <option>Tyler County</option>
                <option>Upshur County</option>
                <option>Upton County</option>
                <option>Uvalde County</option>
                <option>Val Verde County</option>
                <option>Van Zandt County</option>
                <option>Victoria County</option>
                <option>Walker County</option>
                <option>Waller County</option>
                <option>Ward County</option>
                <option>Washington County</option>
                <option>Webb County</option>
                <option>Wharton County</option>
                <option>Wheeler County</option>
                <option>Wichita County</option>
                <option>Wilbarger County</option>
                <option>Willacy County</option>
                <option>Williamson County</option>
                <option>Wilson County</option>
                <option>Winkler County</option>
                <option>Wise County</option>
                <option>Wood County</option>
                <option>Yoakum County</option>
                <option>Young County</option>
                <option>Zapata County</option>
                <option>Zavala County</option>

            </Input>
        ),
        UT: (
            <Input type="select" name="county" className="w-auto" defaultValue={props.selection}>
                <option>Beaver County</option>
                <option>Box Elder County</option>
                <option>Cache County</option>
                <option>Carbon County</option>
                <option>Daggett County</option>
                <option>Davis County</option>
                <option>Duchesne County</option>
                <option>Emery County</option>
                <option>Garfield County</option>
                <option>Grand County</option>
                <option>Iron County</option>
                <option>Juab County</option>
                <option>Kane County</option>
                <option>Millard County</option>
                <option>Morgan County</option>
                <option>Piute County</option>
                <option>Rich County</option>
                <option>Salt Lake County</option>
                <option>San Juan County</option>
                <option>Sanpete County</option>
                <option>Sevier County</option>
                <option>Summit County</option>
                <option>Tooele County</option>
                <option>Uintah County</option>
                <option>Utah County</option>
                <option>Wasatch County</option>
                <option>Washington County</option>
                <option>Wayne County</option>
                <option>Weber County</option>

            </Input>
        ),
        VT: (
            <Input type="select" name="county" className="w-auto" defaultValue={props.selection}>
                <option>Addison County</option>
                <option>Bennington County</option>
                <option>Caledonia County</option>
                <option>Chittenden County</option>
                <option>Essex County</option>
                <option>Franklin County</option>
                <option>Grand Isle County</option>
                <option>Lamoille County</option>
                <option>Orange County</option>
                <option>Orleans County</option>
                <option>Rutland County</option>
                <option>Washington County</option>
                <option>Windham County</option>
                <option>Windsor County</option>

            </Input>
        ),
        VA: (
            <Input type="select" name="county" className="w-auto" defaultValue={props.selection}>
                <option>Accomack County</option>
                <option>Albemarle County</option>
                <option>Alleghany County</option>
                <option>Amelia County</option>
                <option>Amherst County</option>
                <option>Appomattox County</option>
                <option>Arlington County</option>
                <option>Augusta County</option>
                <option>Bath County</option>
                <option>Bedford County</option>
                <option>Bland County</option>
                <option>Botetourt County</option>
                <option>Brunswick County</option>
                <option>Buchanan County</option>
                <option>Buckingham County</option>
                <option>Campbell County</option>
                <option>Caroline County</option>
                <option>Carroll County</option>
                <option>Charles City County</option>
                <option>Charlotte County</option>
                <option>Chesterfield County</option>
                <option>Clarke County</option>
                <option>Craig County</option>
                <option>Culpeper County</option>
                <option>Cumberland County</option>
                <option>Dickenson County</option>
                <option>Dinwiddie County</option>
                <option>Essex County</option>
                <option>Fairfax County</option>
                <option>Fauquier County</option>
                <option>Floyd County</option>
                <option>Fluvanna County</option>
                <option>Franklin County</option>
                <option>Frederick County</option>
                <option>Giles County</option>
                <option>Gloucester County</option>
                <option>Goochland County</option>
                <option>Grayson County</option>
                <option>Greene County</option>
                <option>Greensville County</option>
                <option>Halifax County</option>
                <option>Hanover County</option>
                <option>Henrico County</option>
                <option>Henry County</option>
                <option>Highland County</option>
                <option>Isle of Wight County</option>
                <option>James City County</option>
                <option>King and Queen County</option>
                <option>King George County</option>
                <option>King William County</option>
                <option>Lancaster County</option>
                <option>Lee County</option>
                <option>Loudoun County</option>
                <option>Louisa County</option>
                <option>Lunenburg County</option>
                <option>Madison County</option>
                <option>Mathews County</option>
                <option>Mecklenburg County</option>
                <option>Middlesex County</option>
                <option>Montgomery County</option>
                <option>Nelson County</option>
                <option>New Kent County</option>
                <option>Northampton County</option>
                <option>Northumberland County</option>
                <option>Nottoway County</option>
                <option>Orange County</option>
                <option>Page County</option>
                <option>Patrick County</option>
                <option>Pittsylvania County</option>
                <option>Powhatan County</option>
                <option>Prince Edward County</option>
                <option>Prince George County</option>
                <option>Prince William County</option>
                <option>Pulaski County</option>
                <option>Rappahannock County</option>
                <option>Richmond County</option>
                <option>Roanoke County</option>
                <option>Rockbridge County</option>
                <option>Rockingham County</option>
                <option>Russell County</option>
                <option>Scott County</option>
                <option>Shenandoah County</option>
                <option>Smyth County</option>
                <option>Southampton County</option>
                <option>Spotsylvania County</option>
                <option>Stafford County</option>
                <option>Surry County</option>
                <option>Sussex County</option>
                <option>Tazewell County</option>
                <option>Warren County</option>
                <option>Washington County</option>
                <option>Westmoreland County</option>
                <option>Wise County</option>
                <option>Wythe County</option>
                <option>York County</option>
                <option>Alexandria city</option>
                <option>Bristol city</option>
                <option>Buena Vista city</option>
                <option>Charlottesville city</option>
                <option>Chesapeake city</option>
                <option>Colonial Heights city</option>
                <option>Covington city</option>
                <option>Danville city</option>
                <option>Emporia city</option>
                <option>Fairfax city</option>
                <option>Falls Church city</option>
                <option>Franklin city</option>
                <option>Fredericksburg city</option>
                <option>Galax city</option>
                <option>Hampton city</option>
                <option>Harrisonburg city</option>
                <option>Hopewell city</option>
                <option>Lexington city</option>
                <option>Lynchburg city</option>
                <option>Manassas city</option>
                <option>Manassas Park city</option>
                <option>Martinsville city</option>
                <option>Newport News city</option>
                <option>Norfolk city</option>
                <option>Norton city</option>
                <option>Petersburg city</option>
                <option>Poquoson city</option>
                <option>Portsmouth city</option>
                <option>Radford city</option>
                <option>Richmond city</option>
                <option>Roanoke city</option>
                <option>Salem city</option>
                <option>Staunton city</option>
                <option>Suffolk city</option>
                <option>Virginia Beach city</option>
                <option>Waynesboro city</option>
                <option>Williamsburg city</option>
                <option>Winchester city</option>

            </Input>
        ),
        WA: (
            <Input type="select" name="county" className="w-auto" defaultValue={props.selection}>
                <option>Adams County</option>
                <option>Asotin County</option>
                <option>Benton County</option>
                <option>Chelan County</option>
                <option>Clallam County</option>
                <option>Clark County</option>
                <option>Columbia County</option>
                <option>Cowlitz County</option>
                <option>Douglas County</option>
                <option>Ferry County</option>
                <option>Franklin County</option>
                <option>Garfield County</option>
                <option>Grant County</option>
                <option>Grays Harbor County</option>
                <option>Island County</option>
                <option>Jefferson County</option>
                <option>King County</option>
                <option>Kitsap County</option>
                <option>Kittitas County</option>
                <option>Klickitat County</option>
                <option>Lewis County</option>
                <option>Lincoln County</option>
                <option>Mason County</option>
                <option>Okanogan County</option>
                <option>Pacific County</option>
                <option>Pend Oreille County</option>
                <option>Pierce County</option>
                <option>San Juan County</option>
                <option>Skagit County</option>
                <option>Skamania County</option>
                <option>Snohomish County</option>
                <option>Spokane County</option>
                <option>Stevens County</option>
                <option>Thurston County</option>
                <option>Wahkiakum County</option>
                <option>Walla Walla County</option>
                <option>Whatcom County</option>
                <option>Whitman County</option>
                <option>Yakima County</option>

            </Input>
        ),
        WV: (
            <Input type="select" name="county" className="w-auto" defaultValue={props.selection}>
                <option>Barbour County</option>
                <option>Berkeley County</option>
                <option>Boone County</option>
                <option>Braxton County</option>
                <option>Brooke County</option>
                <option>Cabell County</option>
                <option>Calhoun County</option>
                <option>Clay County</option>
                <option>Doddridge County</option>
                <option>Fayette County</option>
                <option>Gilmer County</option>
                <option>Grant County</option>
                <option>Greenbrier County</option>
                <option>Hampshire County</option>
                <option>Hancock County</option>
                <option>Hardy County</option>
                <option>Harrison County</option>
                <option>Jackson County</option>
                <option>Jefferson County</option>
                <option>Kanawha County</option>
                <option>Lewis County</option>
                <option>Lincoln County</option>
                <option>Logan County</option>
                <option>McDowell County</option>
                <option>Marion County</option>
                <option>Marshall County</option>
                <option>Mason County</option>
                <option>Mercer County</option>
                <option>Mineral County</option>
                <option>Mingo County</option>
                <option>Monongalia County</option>
                <option>Monroe County</option>
                <option>Morgan County</option>
                <option>Nicholas County</option>
                <option>Ohio County</option>
                <option>Pendleton County</option>
                <option>Pleasants County</option>
                <option>Pocahontas County</option>
                <option>Preston County</option>
                <option>Putnam County</option>
                <option>Raleigh County</option>
                <option>Randolph County</option>
                <option>Ritchie County</option>
                <option>Roane County</option>
                <option>Summers County</option>
                <option>Taylor County</option>
                <option>Tucker County</option>
                <option>Tyler County</option>
                <option>Upshur County</option>
                <option>Wayne County</option>
                <option>Webster County</option>
                <option>Wetzel County</option>
                <option>Wirt County</option>
                <option>Wood County</option>
                <option>Wyoming County</option>

            </Input>
        ),
        WI: (
            <Input type="select" name="county" className="w-auto" defaultValue={props.selection}>
                <option>Adams County</option>
                <option>Ashland County</option>
                <option>Barron County</option>
                <option>Bayfield County</option>
                <option>Brown County</option>
                <option>Buffalo County</option>
                <option>Burnett County</option>
                <option>Calumet County</option>
                <option>Chippewa County</option>
                <option>Clark County</option>
                <option>Columbia County</option>
                <option>Crawford County</option>
                <option>Dane County</option>
                <option>Dodge County</option>
                <option>Door County</option>
                <option>Douglas County</option>
                <option>Dunn County</option>
                <option>Eau Claire County</option>
                <option>Florence County</option>
                <option>Fond du Lac County</option>
                <option>Forest County</option>
                <option>Grant County</option>
                <option>Green County</option>
                <option>Green Lake County</option>
                <option>Iowa County</option>
                <option>Iron County</option>
                <option>Jackson County</option>
                <option>Jefferson County</option>
                <option>Juneau County</option>
                <option>Kenosha County</option>
                <option>Kewaunee County</option>
                <option>La Crosse County</option>
                <option>Lafayette County</option>
                <option>Langlade County</option>
                <option>Lincoln County</option>
                <option>Manitowoc County</option>
                <option>Marathon County</option>
                <option>Marinette County</option>
                <option>Marquette County</option>
                <option>Menominee County</option>
                <option>Milwaukee County</option>
                <option>Monroe County</option>
                <option>Oconto County</option>
                <option>Oneida County</option>
                <option>Outagamie County</option>
                <option>Ozaukee County</option>
                <option>Pepin County</option>
                <option>Pierce County</option>
                <option>Polk County</option>
                <option>Portage County</option>
                <option>Price County</option>
                <option>Racine County</option>
                <option>Richland County</option>
                <option>Rock County</option>
                <option>Rusk County</option>
                <option>St. Croix County</option>
                <option>Sauk County</option>
                <option>Sawyer County</option>
                <option>Shawano County</option>
                <option>Sheboygan County</option>
                <option>Taylor County</option>
                <option>Trempealeau County</option>
                <option>Vernon County</option>
                <option>Vilas County</option>
                <option>Walworth County</option>
                <option>Washburn County</option>
                <option>Washington County</option>
                <option>Waukesha County</option>
                <option>Waupaca County</option>
                <option>Waushara County</option>
                <option>Winnebago County</option>
                <option>Wood County</option>

            </Input>
        ),
        WY: (
            <Input type="select" name="county" className="w-auto" defaultValue={props.selection}>
                <option>Albany County</option>
                <option>Big Horn County</option>
                <option>Campbell County</option>
                <option>Carbon County</option>
                <option>Converse County</option>
                <option>Crook County</option>
                <option>Fremont County</option>
                <option>Goshen County</option>
                <option>Hot Springs County</option>
                <option>Johnson County</option>
                <option>Laramie County</option>
                <option>Lincoln County</option>
                <option>Natrona County</option>
                <option>Niobrara County</option>
                <option>Park County</option>
                <option>Platte County</option>
                <option>Sheridan County</option>
                <option>Sublette County</option>
                <option>Sweetwater County</option>
                <option>Teton County</option>
                <option>Uinta County</option>
                <option>Washakie County</option>
                <option>Weston County</option>

            </Input>
        ),
        PR: (
            <Input type="select" name="county" className="w-auto" defaultValue={props.selection}>
                <option>Adjuntas Municipio, Puerto Rico</option>
                <option>Aguada Municipio, Puerto Rico</option>
                <option>Aguadilla Municipio, Puerto Rico</option>
                <option>Aguas Buenas Municipio, Puerto Rico</option>
                <option>Aibonito Municipio, Puerto Rico</option>
                <option>Añasco Municipio, Puerto Rico</option>
                <option>Arecibo Municipio, Puerto Rico</option>
                <option>Arroyo Municipio, Puerto Rico</option>
                <option>Barceloneta Municipio, Puerto Rico</option>
                <option>Barranquitas Municipio, Puerto Rico</option>
                <option>Bayamón Municipio, Puerto Rico</option>
                <option>Cabo Rojo Municipio, Puerto Rico</option>
                <option>Caguas Municipio, Puerto Rico</option>
                <option>Camuy Municipio, Puerto Rico</option>
                <option>Canóvanas Municipio, Puerto Rico</option>
                <option>Carolina Municipio, Puerto Rico</option>
                <option>Cataño Municipio, Puerto Rico</option>
                <option>Cayey Municipio, Puerto Rico</option>
                <option>Ceiba Municipio, Puerto Rico</option>
                <option>Ciales Municipio, Puerto Rico</option>
                <option>Cidra Municipio, Puerto Rico</option>
                <option>Coamo Municipio, Puerto Rico</option>
                <option>Comerío Municipio, Puerto Rico</option>
                <option>Corozal Municipio, Puerto Rico</option>
                <option>Culebra Municipio, Puerto Rico</option>
                <option>Dorado Municipio, Puerto Rico</option>
                <option>Fajardo Municipio, Puerto Rico</option>
                <option>Florida Municipio, Puerto Rico</option>
                <option>Guánica Municipio, Puerto Rico</option>
                <option>Guayama Municipio, Puerto Rico</option>
                <option>Guayanilla Municipio, Puerto Rico</option>
                <option>Guaynabo Municipio, Puerto Rico</option>
                <option>Gurabo Municipio, Puerto Rico</option>
                <option>Hatillo Municipio, Puerto Rico</option>
                <option>Hormigueros Municipio, Puerto Rico</option>
                <option>Humacao Municipio, Puerto Rico</option>
                <option>Isabela Municipio, Puerto Rico</option>
                <option>Jayuya Municipio, Puerto Rico</option>
                <option>Juana Díaz Municipio, Puerto Rico</option>
                <option>Juncos Municipio, Puerto Rico</option>
                <option>Lajas Municipio, Puerto Rico</option>
                <option>Lares Municipio, Puerto Rico</option>
                <option>Las Marías Municipio, Puerto Rico</option>
                <option>Las Piedras Municipio, Puerto Rico</option>
                <option>Loíza Municipio, Puerto Rico</option>
                <option>Luquillo Municipio, Puerto Rico</option>
                <option>Manatí Municipio, Puerto Rico</option>
                <option>Maricao Municipio, Puerto Rico</option>
                <option>Maunabo Municipio, Puerto Rico</option>
                <option>Mayagüez Municipio, Puerto Rico</option>
                <option>Moca Municipio, Puerto Rico</option>
                <option>Morovis Municipio, Puerto Rico</option>
                <option>Naguabo Municipio, Puerto Rico</option>
                <option>Naranjito Municipio, Puerto Rico</option>
                <option>Orocovis Municipio, Puerto Rico</option>
                <option>Patillas Municipio, Puerto Rico</option>
                <option>Peñuelas Municipio, Puerto Rico</option>
                <option>Ponce Municipio, Puerto Rico</option>
                <option>Quebradillas Municipio, Puerto Rico</option>
                <option>Rincón Municipio, Puerto Rico</option>
                <option>Río Grande Municipio, Puerto Rico</option>
                <option>Sabana Grande Municipio, Puerto Rico</option>
                <option>Salinas Municipio, Puerto Rico</option>
                <option>San Germán Municipio, Puerto Rico</option>
                <option>San Juan Municipio, Puerto Rico</option>
                <option>San Lorenzo Municipio, Puerto Rico</option>
                <option>San Sebastián Municipio, Puerto Rico</option>
                <option>Santa Isabel Municipio, Puerto Rico</option>
                <option>Toa Alta Municipio, Puerto Rico</option>
                <option>Toa Baja Municipio, Puerto Rico</option>
                <option>Trujillo Alto Municipio, Puerto Rico</option>
                <option>Utuado Municipio, Puerto Rico</option>
                <option>Vega Alta Municipio, Puerto Rico</option>
                <option>Vega Baja Municipio, Puerto Rico</option>
                <option>Vieques Municipio, Puerto Rico</option>
                <option>Villalba Municipio, Puerto Rico</option>
                <option>Yabucoa Municipio, Puerto Rico</option>
                <option>Yauco Municipio, Puerto Rico</option>
            </Input>

        )
    }

    return list[props.stateCode];
}