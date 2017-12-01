import React from 'react';
import {getRoomData} from '../utils/api';
import {getRoomObject} from "../utils/common";
import RoomTable from "./table/roomtable";

class Room extends React.Component {

    constructor() {
        super();

        this.state = {
            rooms: []
        };
    }

    getRooms() {
        getRoomData().then((rooms) => {
            let newRoom = this.mapJsonToObject(rooms);
            this.setState({
                rooms: newRoom
            });
        });
    }

    addRooms(room){
        const rooms = this.state.rooms;
        rooms.push(room);
        this.setState({
            rooms
        });
    }

    setRoomState(rooms) {
        this.setState({
            rooms
        });
    }

    mapJsonToObject(rooms) {

        if(rooms === undefined){
            return [getRoomObject()];
        }

        let mapper = Object.keys(rooms).map(function (key) {

            let room = getRoomObject();
            room.roomId.value = rooms[key].roomId;
            room.occupant.value = rooms[key].occupant;
            room.status.value = rooms[key].status;
            room.type.value = rooms[key].type;
            room.rent.value = rooms[key].rent;
            room.electricity.value = rooms[key].electricity;
            room.extraCharges.value = rooms[key].extraCharges;

            return room;
        });
        return mapper;
    }

    componentDidMount() {
        this.getRooms();
    }

    render() {
        return (
            <RoomTable rooms={this.state.rooms} title={'Room Details'} addRoom={this.addRooms.bind(this)}/>
        );
    }
}

export default Room;