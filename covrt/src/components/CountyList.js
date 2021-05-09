import { Input } from 'reactstrap'

export default function CountyList(props) {

    let list = {
        WA: (
            <Input type="select" name="county" className="w-auto" defaultValue={props.selection}>
                <option>Adams</option>
                <option>Asotin</option>
                <option>Benton</option>
                <option>Chelan</option>
                <option>Clallam</option>
                <option>Clark</option>
                <option>Columbia</option>
                <option>Cowlitz</option>
                <option>Douglas</option>
                <option>Ferry</option>
                <option>Franklin</option>
                <option>Garfield</option>
                <option>Grant</option>
                <option>Grays Harbor</option>
                <option>Island</option>
                <option>Jefferson</option>
                <option>King</option>
                <option>Kitsap</option>
                <option>Kittitas</option>
                <option>Klickitat</option>
                <option>Lewis</option>
                <option>Lincoln</option>
                <option>Mason</option>
                <option>Okanogan</option>
                <option>Pacific</option>
                <option>Pend Oreille</option>
                <option>Pierce</option>
                <option>San Juan</option>
                <option>Skagit</option>
                <option>Skamania</option>
                <option>Snohomish</option>
                <option>Spokane</option>
                <option>Stevens</option>
                <option>Thurston</option>
                <option>Wahkiakum</option>
                <option>Walla Walla</option>
                <option>Whatcom</option>
                <option>Whitman</option>
                <option>Yakima</option>
            </Input>
        )
    }

    let countyOptions = <h1>ERROR</h1>;
    if (list.hasOwnProperty(props.stateCode)) {
        countyOptions = list[props.stateCode];
    } else {
        countyOptions = list["TEST"];
    }

    return (
        {countyOptions}
    );
}