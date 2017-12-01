import React from 'react';
import {getPaymentData} from '../utils/api';
import {getPaymentObject} from "../utils/common";
import PaymentTable from "./table/paymenttable";

class Payment extends React.Component {

    constructor() {
        super();

        this.state = {
            payments: []
        };
    }

    getPayments() {
        getPaymentData().then((payments) => {
            let newPayment = this.mapJsonToObject(payments);
            this.setState({
                payments: newPayment
            });
        });
    }

    addPayments(payment) {
        const payments = this.state.payments;
        payments.push(payment);
        this.setState({
            payments
        });
    }

    setPaymentState(payments) {
        this.setState({
            payments
        });
    }

    mapJsonToObject(payments) {

        if(payments === undefined){
            return [getPaymentObject()];
        }

        let mapper = Object.keys(payments).map(function (key) {

            let payment = getPaymentObject();
            payment.paymentId.value = payments[key].paymentId;
            payment.roomId.value = payments[key].roomId;
            payment.occupantId.value = payments[key].occupantId;
            payment.amount.value = payments[key].amount;
            payment.due.value = payments[key].due;
            payment.forMonth.value = payments[key].forMonth;
            payment.receivedDate.value = payments[key].receivedDate;

            return payment;
        });
        return mapper;
    }

    componentDidMount() {
        this.getPayments();
    }

    render() {
        return (
            <PaymentTable payments={this.state.payments} title={'Payment Details'}
                          addPayment={this.addPayments.bind(this)}/>
        );
    }
}

export default Payment;