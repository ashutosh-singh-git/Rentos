import React from "react";
import {DatePicker, Input, Select} from "antd";
import moment from 'moment';

const Option = Select.Option;

class EditableCell extends React.Component {

    state = {
        value: this.props.value,
        editable: this.props.editable || false,
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.editable !== this.state.editable) {
            this.setState({editable: nextProps.editable});
            if (nextProps.editable) {
                this.cacheValue = this.state.value;
            }
        }
        if (nextProps.status && nextProps.status !== this.props.status) {
            if (nextProps.status === 'save') {
                this.props.onChange(this.state.value);
            } else if (nextProps.status === 'cancel') {
                this.setState({value: this.cacheValue});
                this.props.onChange(this.cacheValue);
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.editable !== this.state.editable ||
            nextState.value !== this.state.value;
    }

    handleChange(e) {
        const value = e.target.value;
        this.setState({value});
    }

    handleDateChange(date, value) {
        this.setState({value});
    }

    handleSelectChange(value) {
        this.setState({value});
    }

    getInput() {
        const {input, options} = this.props.data;
        const {value} = this.state;

        if (input !== undefined) {
            if (input === "select") {
                return (
                    <Select style={{width: 120}}
                            defaultValue={value}
                            onChange={e => this.handleSelectChange(e)}>
                        {
                            options.map(function (data) {
                                return (
                                    <Option key={data} value={data}>{data}</Option>
                                );
                            })
                        }
                    </Select>
                );
            } else if (input === "date") {
                if (options === "month") {
                    return <DatePicker.MonthPicker onChange={this.handleDateChange.bind(this)}
                                                   value={moment(value === "" ? moment() : value, 'YYYY-MM')}
                                                   placeholder="Select month"/>
                }
                return <DatePicker onChange={this.handleDateChange.bind(this)}
                                   value={moment(value === "" ? moment() : value, 'YYYY-MM-DD')}/>
            } else {
                return <Input type={input} value={value} onChange={e => this.handleChange(e)}/>;
            }
        }
    }

    render() {
        const {value, editable} = this.state;

        return (
            <div>
                {
                    editable ?
                        <div>
                            {this.getInput()}
                        </div>
                        :
                        <div className="editable-row-text">
                            {value.toString() || ' '}
                        </div>
                }
            </div>
        );
    }
}

export default EditableCell;