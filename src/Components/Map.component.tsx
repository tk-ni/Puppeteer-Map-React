import React from 'react';
import * as THREE from 'three';
import Loading from './Loading.component';
import Line from './3D/Line.3d.component';
import Dot from './3D/Dot.3d.component';
import Visit from './../Models/Visit.model';
import { OrbitControls } from './../Controls/OrbitControls';
import { handleSceneResize, initEventListener } from '../Core/utils/screenResize';
import { Icon } from 'semantic-ui-react';

interface Props {
    loading: boolean,
    visits: Visit[]
}
interface State {
    loading: boolean,
    visits: Visit[],
}

export default class Map extends React.Component<Props, State> {

    state: State = {
        loading: this.props.loading ? true : false,
        visits: this.props.visits ? this.props.visits : [],
    }

    private canvasRef: any = React.createRef();
    private renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    private camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera();
    private scene: THREE.Scene = new THREE.Scene();

    componentDidMount() {
        this.initScene();
    }

    componentWillReceiveProps(newProps: Props) {
        //Clean the scene on database reset
        if (newProps.visits.length < this.state.visits.length) {
            while (this.scene.children.length > 0) {
                this.scene.remove(this.scene.children[0]);
            }
        }

        //Update the scene
        if (newProps.visits !== this.state.visits) {
            this.setState({ visits: newProps.visits, loading: false }, () => {
                this.updateScene(this.state.visits);
            })
        }
    }

    private updateScene = (visits: Visit[]) => {
        //Clean the scene
        while (this.scene.children.length > 0) {
            this.scene.remove(this.scene.children[0]);
        }

        //Draw Visits as Dots
        for (let i = 0; i < visits.length; i++) {
            if (!this.scene.getObjectByName(visits[i].url)) {
                let dot = new Dot(new THREE.Vector2(visits[i].vertex.x, visits[i].vertex.y), visits[i]);
                let dotMesh = dot.create();
                dotMesh.name = visits[i].url;
                this.scene.add(dotMesh);
            }
        }

        //Draw connections between dots
        for (let i = 0; i < visits.length; i++) {
            for (let j = 0; j < visits.length; j++) {
                if (visits[i] && visits[j] && visits[i].url.includes(visits[j].src)) {
                    let line = new Line(new THREE.Vector2(visits[i].vertex.x, visits[i].vertex.y), new THREE.Vector2(visits[j].vertex.x, visits[j].vertex.y));
                    this.scene.add(line.create());
                }
            }
        }
    }

    private initScene = () => {
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.autoClear = false;
        this.renderer.setClearColor(new THREE.Color(0x222222));
        this.renderer.setSize(this.canvasRef.current.offsetWidth, this.canvasRef.current.offsetHeight);
        this.canvasRef.current.appendChild(this.renderer.domElement);

        this.scene.background = new THREE.Color(0x000000);

        this.camera.aspect = this.canvasRef.current.offsetWidth / this.canvasRef.current.offsetHeight;
        this.camera.near = 0.1;
        this.camera.far = 1000;
        this.camera.position.z = 180;

        const controls = new OrbitControls(this.camera, this.renderer.domElement);
        controls.enableRotate = false;
        controls.enableDamping = true;
        controls.dampingFactor = 0.1;
        controls.enablePan = true;
        controls.screenSpacePanning = true;
        controls.maxDistance = 300;
        controls.minDistance = 50;

        //init Handle Resize
        handleSceneResize(window, this.camera, this.renderer)
        initEventListener(window);

        const animate = () => {
            requestAnimationFrame(animate);
            this.renderer.render(this.scene, this.camera);
            controls.update();
        }
        animate();
    }

    render() {
        return (<>
            <div className="three-container" ref={this.canvasRef}></div>
            <div className="credits"><a href="https://github.com/tk-ni" target="_blank">Puppeteer Scraper Map made by <Icon name="github" />tk-ni</a></div>
            {this.state.loading ? <Loading /> : ''}
        </>)
    }
}