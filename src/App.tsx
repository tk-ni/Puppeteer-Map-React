import React from 'react';
import './Styles/Main.css';
import { State, Props } from './P_S_Interface';
import Map from './Components/Map.component';


export default class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (<>
      <Map />
    </>)
  }
}
