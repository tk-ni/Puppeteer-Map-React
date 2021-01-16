import React from 'react';
import './Styles/Main.css';
import Map from './Components/Map.component';
import { Server } from './Core/env';
import io from "socket.io-client";
import Visit from './Models/Visit.model';
import Log from './Models/Log.model';

interface State{
  socket: SocketIOClient.Socket,
  visits: Visit[],
  logs: Log[]

};

export default class App extends React.Component<State> {

  state: State ={
    socket: io.connect(Server),
    visits: [],
    logs: []
  }

  componentDidMount(){
    this.initSocket();
  }

  private initSocket = () => {
    this.state.socket.on('visits', (data: object) => {
        this.setState({ visits: data }, () => {
            this.setState({ loading: false }, () => { })
        })
    })

    this.state.socket.on('logs', (data: object) => {
        this.setState({ logs: data }, () => { })
    })

}

  render() {
    return (<>
      <Map loading={true} visits={[...this.state.visits]}/>
    </>)
  }
}
