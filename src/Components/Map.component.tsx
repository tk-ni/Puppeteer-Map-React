import React from 'react';
import * as THREE from 'three';
import Loading from './Loading.component';
import io from "socket.io-client";
import { Server } from './../Core/env';
import Visit from './../Models/Visit.model';
import Log from '../Models/Log.model';

interface Props {
    loading: boolean
}
interface State {
    loading: boolean,
    socket: SocketIOClient.Socket,
    visits: Visit[],
    logs: Log[],
}

export default class Map extends React.Component<Props, State> {

    state: State = {
        loading: this.props.loading ? true : false,
        socket: io.connect(Server),
        visits: [],
        logs: [],
    }

    private canvasRef = React.createRef();
    private loadingManager: THREE.LoadingManager = new THREE.LoadingManager();
    private renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
    private camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera();
    private scene: THREE.Scene = new THREE.Scene();



    componentDidMount() {
        this.initSocket();
        this.initScene();
    }

    private initSocket = () => {
        this.state.socket.on('visits', (data: object) => {
            this.setState({ visits: data }, () => {
                this.setState({ loading: false }, () => {})
            })
        })

        this.state.socket.on('logs', (data: object) =>{
            this.setState({logs: data}, ()=>{})
        })
        
    }

    private updateScene = () => {

    }

    private initScene = () => {
        this.loadingManager.onLoad = () => {
            this.setState({ loading: false }, () => { })
        }
    }

    render() {
        return (<>
            <div className="three-container" ref={this.canvasRef}></div>
            <div>{this.state.visits.length}</div>
            <div>{this.state.logs.map(l => <p>{l.string}</p>)}</div>
            {this.state.loading ? <Loading /> : ''}
        </>)
    }
}