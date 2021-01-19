import React from 'react';
import './Styles/Main.css';
import 'semantic-ui-css/semantic.min.css';
import Map from './Components/Map.component';
import { Server } from './Core/env';
import io from "socket.io-client";
import LogDisplay from './Components/LogDisplay.component';
import Loading from './Components/Loading.component';

interface State {
  socket: SocketIOClient.Socket,
  visits: any,
  logs: any,
  loading: boolean

};


export default class App extends React.Component<{}, State> {


  state: State = {
    socket: io(Server, { upgrade: false, transports: ['websocket'] }),
    visits: [],
    logs: [],
    loading: true
  }

  componentDidMount() {
    this.initSocket();
  }

  private initSocket = () => {
    this.state.socket.on('update', (data: object[])=>{
      console.log('socket');
      this.setState({visits: data[0], logs: data[1], loading: false}, ()=>{
        console.log('update');
      })
    })

  }

  componentWillUnmount(){
    this.state.socket.disconnect();
  }

  render() {
    if(this.state.loading){
      return <Loading/>
    }
    return (<>
      <Map visits={this.state.visits} />
      <LogDisplay logs={this.state.logs} />
    </>)
  }
}
