import React from 'react';

interface Props { }
interface State { }

export default class Loading extends React.Component<State, Props>{

    render() {
        return (<>
            <div className="loading">
                <div className="icon">
                    <div className="bull">&bull;</div>
                    <div className="dash">&mdash;</div>
                    <div className="bull">&bull;</div>
                </div>
                <p>Loading...</p>
                <div className="description">
                    <p>If the loading is taking a while, the server might have crashed.</p>
                    <p>Give it a few minutes, it will restart itself.</p>
                </div>

            </div>
       
        </>)
    }
}