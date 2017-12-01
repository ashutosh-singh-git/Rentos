let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('mydb.db');

let express = require('express');
let cors = require('cors');
let restapi = express();
let bodyParser = require('body-parser');

restapi.use(bodyParser.json()); // support json encoded bodies
restapi.use(bodyParser.urlencoded({extended: true}));
restapi.use(cors());

restapi.get('/room', function (req, res) {
    db.all("SELECT * FROM room", function (err, row) {
        res.json({
            row
        });
    });
});

restapi.get('/occupant', function (req, res) {
    db.all("SELECT * FROM occupant", function (err, row) {
        res.json({
            row
        });
    });
});

restapi.get('/payment', function (req, res) {
    db.all("SELECT * FROM payment", function (err, row) {
        res.json({
            row
        });
    });
});

restapi.post('/room', function (req, res) {
    let room = req.body;

    db.run("Insert or replace into room (roomId ,occupant ,status ,type ,rent ,electricity ,extraCharges) values " +
        "(?, ?, ?, ?, ?, ? ,?)",
        [
            room.roomId.value,
            room.occupant.value,
            room.status.value,
            room.type.value,
            room.rent.value,
            room.electricity.value,
            room.extraCharges.value,
        ], function (err, row) {

            if (err) {
                console.log(err);
                res.status(500);
            } else {
                res.status(202);
            }
            res.end();
        });
});


restapi.post('/occupant', function (req, res) {
    let occupant = req.body;

    db.run("Insert or replace into occupant (occupantId, name, phone, address, startDate, endDate, roomNo, status, " +
        "referenceName, referencePhone) values (?, ?, ?, ?, ?, ? ,?, ?, ?, ?)",
        [
            occupant.occupantId.value,
            occupant.name.value,
            occupant.phone.value,
            occupant.address.value,
            occupant.startDate.value,
            occupant.endDate.value,
            occupant.roomNo.value,
            occupant.status.value,
            occupant.referenceName.value,
            occupant.referencePhone.value,
        ], function (err, row) {

            if (err) {
                console.log(err);
                res.status(500);
            } else {
                res.status(202);
            }
            res.end();
        });
});

restapi.post('/payment', function (req, res) {
    let payment = req.body;

    db.run("Insert or replace into payment (paymentId, roomId, occupantId, amount, due, forMonth, receivedDate) " +
        " values (?, ?, ?, ?, ?, ? ,?)",
        [
            payment.paymentId.value,
            payment.roomId.value,
            payment.occupantId.value,
            payment.amount.value,
            payment.due.value,
            payment.forMonth.value,
            payment.receivedDate.value,

        ], function (err, row) {

            if (err) {
                console.log(err);
                res.status(500);
            } else {
                res.status(202);
            }
            res.end();
        });
});


restapi.listen(3000);

console.log("Submit GET or POST to http://localhost:3000/room");