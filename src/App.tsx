import React from 'react';
import './Styles/Main.css';
import Map from './Components/Map.component';

interface State{

};

export default class App extends React.Component<State> {

  state: State ={
 
  }

  render() {
    return (<>
      <Map loading={true}/>
    </>)
  }
}
