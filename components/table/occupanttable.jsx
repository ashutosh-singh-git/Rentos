import React from 'react';
import {Button, Collapse, Popconfirm, Radio, Table} from "antd";
import EditableCell from "./editcell";
import {updateOccupantData} from "../../utils/api";
import {getOccupantObject} from "../../utils/common";

const Panel = Collapse.Panel;

class OccupantTable extends React.Component {


    getColumns() {
        return [{
            title: 'OccupantId',
            dataIndex: 'occupantId.value',
            render: (text, record, index) => this.renderColumns(this.props.occupants, index, 'occupantId', text),
        }, {
            title: 'Name',
            dataIndex: 'name.value',
            render: (text, record, index) => this.renderColumns(this.props.occupants, index, 'name', text),
        }, {
            title: 'Contact No',
            dataIndex: 'phone.value',
            render: (text, record, index) => this.renderColumns(this.props.occupants, index, 'phone', text),
        }, {
            title: 'Address',
            dataIndex: 'address.value',
            render: (text, record, index) => this.renderColumns(this.props.occupants, index, 'address', text),
        }, {
            title: 'Start Date',
            dataIndex: 'startDate.value',
            render: (text, record, index) => this.renderColumns(this.props.occupants, index, 'startDate', text),
        }, {
            title: 'End Date',
            dataIndex: 'endDate.value',
            render: (text, record, index) => this.renderColumns(this.props.occupants, index, 'endDate', text),
        }, {
            title: 'Room No',
            dataIndex: 'roomNo.value',
            render: (text, record, index) => this.renderColumns(this.props.occupants, index, 'roomNo', text),
        }, {
            title: 'Current Status',
            dataIndex: 'status.value',
            render: (text, record, index) => this.renderColumns(this.props.occupants, index, 'status', text),
        }, {
            title: 'Reference Name',
            dataIndex: 'referenceName.value',
            render: (text, record, index) => this.renderColumns(this.props.occupants, index, 'referenceName', text),
        }, {
            title: 'Reference Contact',
            dataIndex: 'referencePhone.value',
            render: (text, record, index) => this.renderColumns(this.props.occupants, index, 'referencePhone', text),
        }, {
            title: 'Operation',
            dataIndex: 'Operation',
            render: (text, record, index) => {
                const {editable} = this.props.occupants[index].name;
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
        const {occupants} = this.props;
        occupants[index][key].value = value;
        this.setState({occupants});
    }

    edit(index) {
        const {occupants} = this.props;
        Object.keys(occupants[index]).forEach((item) => {
            // console.log("In Edit ", occupants[index][item]);
            if (occupants[index][item] && typeof occupants[index][item].editable !== 'undefined') {
                occupants[index][item].editable = true;
            }
        });
        this.setState({occupants});
    }

    editDone(index, type) {
        const {occupants} = this.props;
        Object.keys(occupants[index]).forEach((item) => {
            if (occupants[index][item] && typeof occupants[index][item].editable !== 'undefined') {
                occupants[index][item].editable = false;
                occupants[index][item].status = type;
            }
        });

        if (type === 'save') {
            updateOccupantData(occupants[index]);
        }

        this.setState({occupants}, () => {
            Object.keys(occupants[index]).forEach((item) => {
                if (occupants[index][item] && typeof occupants[index][item].editable !== 'undefined') {
                    delete occupants[index][item].status;
                }
            });
        });
    }

    handleAdd() {
        let count = this.props.occupants.length;
        const newData = getOccupantObject();
        newData.occupantId.value = count + 1;
        this.props.addOccupant(newData);
    }

    render() {
        const size = "middle";
        return (
            <div>
                <div className={"tableTitle"}><h1>{this.props.title}</h1></div>
                <Button className="editable-add-btn" onClick={this.handleAdd.bind(this)}>Add</Button>
                <Table bordered={true} rowKey={occupant => occupant.occupantId.value}
                       dataSource={this.props.occupants} size={size}
                       columns={this.getColumns()}/>
            </div>
        );
    }
}

export default OccupantTable;