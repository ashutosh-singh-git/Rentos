import React from "react";
import {getOccupantData} from "../utils/api";
import OccupantTable from "./table/occupanttable";
import {getOccupantObject} from "../utils/common";

class Occupant extends React.Component {

    constructor() {
        super();

        this.state = {
            occupants: []
        };
    }

    getOccupants() {
        getOccupantData().then((occupants) => {
            let newOccupant = this.mapJsonToObject(occupants);
            this.setState({
                occupants: newOccupant
            });
        });
    }

    addOccupants(occupant) {
        const occupants = this.state.occupants;
        occupants.push(occupant);
        this.setState({
            occupants
        });
    }

    mapJsonToObject(occupants) {

        if(occupants === undefined){
            return [getOccupantObject()];
        }

        let mapper = Object.keys(occupants).map(function (key) {

            let occupant = getOccupantObject();
            occupant.occupantId.value = occupants[key].occupantId;
            occupant.name.value = occupants[key].name;
            occupant.phone.value = occupants[key].phone;
            occupant.address.value = occupants[key].address;
            occupant.startDate.value = occupants[key].startDate;
            occupant.endDate.value = occupants[key].endDate;
            occupant.roomNo.value = occupants[key].roomNo;
            occupant.status.value = occupants[key].status;
            occupant.referenceName.value = occupants[key].referenceName;
            occupant.referencePhone.value = occupants[key].referencePhone;

            return occupant;
        });
        return mapper;
    }

    componentDidMount() {
        this.getOccupants();
    }

    render() {
        return (
            <OccupantTable occupants={this.state.occupants} title={'Occupant Details'} addOccupant={this.addOccupants.bind(this)}/>
        );
    }
}

export default Occupant;