import React from 'react';
import {Button, Col, Icon, Layout, Menu, Row} from "antd";
import {Link, Route} from "react-router-dom";
import Room from "./room.jsx";
import 'antd/dist/antd.css';
import '../css/style.css';
import Occupant from "./occupant";
import Payment from "./payment";

const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            key: "room"
        };
    }

    componentWillMount(){
        let key = this.props.location.pathname;
        this.setState({
            key: key
        })
    }

    render() {
        return (
            <div>
                <Layout style={{minHeight: '100vh'}}>
                    <Sider>
                        <div className="logo">
                            <Icon style={{fontSize: "30px"}} type="home"/>&nbsp;
                            <label>Rentos</label>
                        </div>
                        <Menu theme="dark" defaultSelectedKeys={[this.state.key]} mode="inline">
                            <Menu.Item key="/payment">
                                <Icon type="wallet"/>
                                <span>Payment</span>
                                <Link to="/payment"/>
                            </Menu.Item>
                            <Menu.Item key="/room">
                                <Link to="/room">
                                    <Icon type="database"/>
                                    <span>Room</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/occupant">
                                <Link to="/occupant">
                                    <Icon type="user"/>
                                    <span>Occupants</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/search">
                                <Link to="/search">
                                    <Icon type="search"/>
                                    <span>Search</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="10">
                                <Icon type="setting"/>
                                <span>Settings</span>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Content>
                            <div style={{padding: 24, background: '#fff', minHeight: 360}}>
                                <Route path="/room" component={Room}/>
                                <Route path="/payment" component={Payment}/>
                                <Route path="/occupant" component={Occupant}/>
                                <Route path="/search"/>
                                <Route path="/setting"/>
                            </div>
                        </Content>
                        <Footer style={{textAlign: 'center'}}>
                            Created By Ashutosh
                        </Footer>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default App;
