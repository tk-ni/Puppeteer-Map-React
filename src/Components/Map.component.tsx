import React from 'react';
import * as THREE from 'three';
import Loading from './Loading.component';
import io from "socket.io-client";
import { Server } from './../Core/env';
import Line from './3D/Line.component';
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
    private renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    private camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera();
    private scene: THREE.Scene = new THREE.Scene();



    componentDidMount() {
        this.initSocket();
        this.initScene();
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

    private updateScene = () => {

    }

    private initScene = () => {
        this.loadingManager.onLoad = () => {
            this.setState({ loading: false }, () => { })
        }


        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.autoClear = false;
        this.renderer.setClearColor(new THREE.Color(0x222222));
        this.renderer.setSize(this.canvasRef.current.offsetWidth, this.canvasRef.current.offsetHeight);
        this.canvasRef.current.appendChild(this.renderer.domElement);

        this.scene.background = new THREE.Color(0x000000);

        this.camera.fov = 30;
        this.camera.aspect =  this.canvasRef.current.offsetWidth / this.canvasRef.current.offsetHeight;
        this.camera.near = 0.1;
        this.camera.far = 1000;
        this.camera.position.z = 50;

        let ambientLight = new THREE.AmbientLight(0x07215c);
        ambientLight.color.setRGB(0.02, 0.02, 0.07);
        ambientLight.intensity = 5;
        this.scene.add(ambientLight);

        //Directional Light
        let directionalLight = new THREE.DirectionalLight(0xe8f7ff, 1);
        directionalLight.position.set(1, 0, 5);
        this.scene.add(directionalLight);

        let line = new Line().create(new THREE.Vector2(0,0), new THREE.Vector2(1,1));
        this.scene.add(line);
        const animate = () => {
            requestAnimationFrame(animate);
            this.renderer.render(this.scene, this.camera);
        }
        animate();




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