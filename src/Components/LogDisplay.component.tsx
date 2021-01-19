import React from 'react';
import Log from '../Models/Log.model';
import Draggable from 'react-draggable';
import { Icon } from 'semantic-ui-react';

interface Props {
    logs: Log[]
}
interface State {
    logs: Log[],
    logsVisible: boolean,
}

export default class LogDisplay extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);
    }

    private divRef: any = React.createRef();

    state: State = {
        logs: [],
        logsVisible: true
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.logs != this.props.logs) {
            this.setState({ logs: nextProps.logs }, () => {
                this.updateScroll();
            })

        }
    }

    private updateScroll = () => {
        if (this.divRef.current) {
            this.divRef.current.scrollTop = this.divRef.current.scrollHeight;
        }
    }

    private handleLogsVisibleClick = () => {
        this.setState({ logsVisible: !this.state.logsVisible }, () => { })
    }

    render() {
        return (<Draggable handle={'.logs-container-header'} disabled={window.innerWidth < 1000 ? true : false}>
            <div className="logs-container" ref={this.divRef} style={{ height: this.state.logsVisible ? '300px' : '30px' }}>
                <div className="logs-container-header">Log <span style={{ position: 'relative', zIndex: 2 }} onClick={this.handleLogsVisibleClick}>{this.state.logsVisible ? <Icon className="logs-collapse" name={'angle up'} /> : <Icon className="logs-collapse" name={'angle down'} />}</span></div>
                {this.state.logs.length && this.state.logsVisible ? this.state.logs.map((l, idx) => {
                    if (l.string.includes('Fetching')) {
                        return <p key={idx}><span style={{ color: '#90b312' }}>{l.string.slice(0, 8)}</span> {l.string.slice(8, 50)}...</p>
                    } else if (l.string.includes('No links')) {
                        return <p key={idx}><span style={{ color: '#db2621' }}>{l.string.slice(0, 17)}</span> {l.string.slice(17, 50)}...</p>
                    } else if (l.string.includes('Resetting')) {
                        return <p key={idx} style={{ color: '#3b90ff' }}>{l.string.slice(0, 50)}...</p>
                    }
                }) : ''}
            </div>
        </Draggable>)
    }

}