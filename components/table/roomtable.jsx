import React from 'react';
import {Button, Collapse, Popconfirm, Radio, Table} from "antd";
import EditableCell from "./editcell";
import {updateRoomData} from "../../utils/api";
import {getRoomObject} from "../../utils/common";

const Panel = Collapse.Panel;

class RoomTable extends React.Component {


    getColumns() {
        return [{
            title: 'Room',
            dataIndex: 'roomId.value',
            render: (text, record, index) => this.renderColumns(this.props.rooms, index, 'roomId', text),
        }, {
            title: 'Occupant',
            dataIndex: 'occupant.value',
            render: (text, record, index) => this.renderColumns(this.props.rooms, index, 'occupant', text),
        }, {
            title: 'Rent Status',
            dataIndex: 'status.value',
            render: (text, record, index) => this.renderColumns(this.props.rooms, index, 'status', text),
        }, {
            title: 'Rent',
            dataIndex: 'rent.value',
            render: (text, record, index) => this.renderColumns(this.props.rooms, index, 'rent', text),
        }, {
            title: 'Type',
            dataIndex: 'type.value',
            render: (text, record, index) => this.renderColumns(this.props.rooms, index, 'type', text),
        }, {
            title: 'Electricity',
            dataIndex: 'electricity.value',
            render: (text, record, index) => this.renderColumns(this.props.rooms, index, 'electricity', text),
        }, {
            title: 'Extra Charges',
            dataIndex: 'extraCharges.value',
            render: (text, record, index) => this.renderColumns(this.props.rooms, index, 'extraCharges', text),
        }, {
            title: 'Operation',
            dataIndex: 'Operation',
            render: (text, record, index) => {
                const {editable} = this.props.rooms[index].occupant;
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
        const {rooms} = this.props;
        rooms[index][key].value = value;
        this.setState({rooms});
    }

    edit(index) {
        const {rooms} = this.props;
        Object.keys(rooms[index]).forEach((item) => {
            // console.log("In Edit ", rooms[index][item]);
            if (rooms[index][item] && typeof rooms[index][item].editable !== 'undefined') {
                rooms[index][item].editable = true;
            }
        });
        this.setState({rooms});
    }

    editDone(index, type) {
        const {rooms} = this.props;
        Object.keys(rooms[index]).forEach((item) => {
            if (rooms[index][item] && typeof rooms[index][item].editable !== 'undefined') {
                rooms[index][item].editable = false;
                rooms[index][item].status = type;
            }
        });

        if (type === 'save') {
            updateRoomData(rooms[index]);
        }

        this.setState({rooms}, () => {
            Object.keys(rooms[index]).forEach((item) => {
                if (rooms[index][item] && typeof rooms[index][item].editable !== 'undefined') {
                    delete rooms[index][item].status;
                }
            });
        });
    }

    handleAdd() {
        let count = this.props.rooms.length;
        const newData = getRoomObject();
        newData.roomId.value = count + 1;
        this.props.addRoom(newData);
    }

    render() {
        const size = "middle";
        return (
            <div>
                <div className={"tableTitle"}><h1>{this.props.title}</h1></div>
                <Button className="editable-add-btn" onClick={this.handleAdd.bind(this)}>Add</Button>
                <Table bordered={true} rowKey={room => room.roomId.value}
                       dataSource={this.props.rooms} size={size}
                       columns={this.getColumns()}/>
            </div>
        );
    }
}

export default RoomTable;