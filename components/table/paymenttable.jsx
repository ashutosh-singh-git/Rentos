import React from 'react';
import {Button, Collapse, Popconfirm, Radio, Table} from "antd";
import EditableCell from "./editcell";
import {updatePaymentData} from "../../utils/api";
import {getPaymentObject} from "../../utils/common";

const Panel = Collapse.Panel;

class PaymentTable extends React.Component {


    getColumns() {
        return [{
            title: 'Payment',
            dataIndex: 'paymentId.value',
            render: (text, record, index) => this.renderColumns(this.props.payments, index, 'paymentId', text),
        }, {
            title: 'Room No',
            dataIndex: 'roomId.value',
            render: (text, record, index) => this.renderColumns(this.props.payments, index, 'roomId', text),
        }, {
            title: 'Occupant Id',
            dataIndex: 'occupantId.value',
            render: (text, record, index) => this.renderColumns(this.props.payments, index, 'occupantId', text),
        }, {
            title: 'Amount',
            dataIndex: 'amount.value',
            render: (text, record, index) => this.renderColumns(this.props.payments, index, 'amount', text),
        }, {
            title: 'Due',
            dataIndex: 'due.value',
            render: (text, record, index) => this.renderColumns(this.props.payments, index, 'due', text),
        }, {
            title: 'For Month',
            dataIndex: 'forMonth.value',
            render: (text, record, index) => this.renderColumns(this.props.payments, index, 'forMonth', text),
        }, {
            title: 'Received Date',
            dataIndex: 'receivedDate.value',
            render: (text, record, index) => this.renderColumns(this.props.payments, index, 'receivedDate', text),
        }, {
            title: 'Operation',
            dataIndex: 'Operation',
            render: (text, record, index) => {
                const {editable} = this.props.payments[index].roomId;
                const size = "small";
                return (
                    <div className="editable-row-operations">
                        {
                            editable ?
                                <Radio.Group size={size}>
                                    <Radio.Button onClick={() => this.editDone(index, 'save')}
                                                  value="save">Save</Radio.Button>
                                    <Popconfirm title="Sure to cancel?"
                                                onConfirm={() => this.editDone(index, 'cancel')}>
                                        <Radio.Button value="cancel">Cancel</Radio.Button>
                                    </Popconfirm>
                                </Radio.Group>
                                :
                                <Button size={size} onClick={() => this.edit(index)}>
                                    Edit
                                </Button>
                        }
                    </div>
                );
            },
        }];
    }

    renderColumns(data, index, key, text) {
        const {editable, status} = data[index][key];
        if (typeof editable === 'undefined') {
            return text;
        }

        return (
            <EditableCell
                editable={editable}
                value={text}
                onChange={value => this.cellValueChange(key, index, value)}
                status={status}
                data={data[index][key]}/>
        );
    }

    cellValueChange(key, index, value) {
        const {payments} = this.props;
        payments[index][key].value = value;
        this.setState({payments});
    }

    edit(index) {
        const {payments} = this.props;
        Object.keys(payments[index]).forEach((item) => {
            // console.log("In Edit ", payments[index][item]);
            if (payments[index][item] && typeof payments[index][item].editable !== 'undefined') {
                payments[index][item].editable = true;
            }
        });
        this.setState({payments});
    }

    editDone(index, type) {
        const {payments} = this.props;
        Object.keys(payments[index]).forEach((item) => {
            if (payments[index][item] && typeof payments[index][item].editable !== 'undefined') {
                payments[index][item].editable = false;
                payments[index][item].status = type;
            }
        });

        if (type === 'save') {
            updatePaymentData(payments[index]);
        }

        this.setState({payments}, () => {
            Object.keys(payments[index]).forEach((item) => {
                if (payments[index][item] && typeof payments[index][item].editable !== 'undefined') {
                    delete payments[index][item].status;
                }
            });
        });
    }

    handleAdd() {
        let count = this.props.payments.length;
        const newData = getPaymentObject();
        newData.paymentId.value = count + 1;
        this.props.addPayment(newData);
    }

    render() {
        const size = "middle";
        return (
            <div>
                <div className={"tableTitle"}><h1>{this.props.title}</h1></div>
                <Button className="editable-add-btn" onClick={this.handleAdd.bind(this)}>Add</Button>
                <Table bordered={true} rowKey={payment => payment.paymentId.value}
                       dataSource={this.props.payments} size={size}
                       columns={this.getColumns()}/>
            </div>
        );
    }
}

export default PaymentTable;