import * as THREE from 'three';
import Visit from '../../Models/Visit.model';

export default class Dot{
    vertex: THREE.Vector2;
    visit: Visit;
    constructor(vertex: THREE.Vector2, visit: Visit){
        this.vertex = vertex;
        this.visit = visit;
    }

    getVisit = () =>{
        return this.visit;
    }

    create = () =>{

        let geometry = new THREE.CircleGeometry(1, 16);
        let material = new THREE.MeshBasicMaterial( { color: 0x8ab304} );

        let mesh = new THREE.Mesh(geometry, material);

        mesh.position.x = this.vertex.x;
        mesh.position.y = this.vertex.y;
        
        return mesh;
    }
}
