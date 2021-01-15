import React from 'react';

interface Props{}
interface State{}

export default class Loading extends React.Component<State, Props>{

    render(){
        return(<>
        <div className="loading">
            <p>Loading...</p>
        </div>
        </>)
    }
}