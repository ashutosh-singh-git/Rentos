import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

function getRoomData() {
    const url = `${BASE_URL}/room`;
    return axios.get(url).then(response => response.data.row);
}

function getOccupantData() {
    const url = `${BASE_URL}/occupant`;
    return axios.get(url).then(response => response.data.row);
}

function getPaymentData() {
    const url = `${BASE_URL}/payment`;
    return axios.get(url).then(response => response.data.row);
}

function updateRoomData(room) {
    const url = `${BASE_URL}/room`;
    return axios.post(url, room).then(response => response.data);
}

function updateOccupantData(occupant) {
    const url = `${BASE_URL}/occupant`;
    return axios.post(url, occupant).then(response => response.data);
}

function updatePaymentData(payment) {
    const url = `${BASE_URL}/payment`;
    return axios.post(url, payment).then(response => response.data);
}

export {getRoomData, getOccupantData, getPaymentData, updateRoomData, updateOccupantData, updatePaymentData};
