import * as THREE from 'three';

export default class Line {
    startingVertex: THREE.Vector2;
    endingVertex: THREE.Vector2;

    constructor(startingVertex: THREE.Vector2 , endingVertex: THREE.Vector2){
        this.startingVertex = startingVertex;
        this.endingVertex = endingVertex;
    }
    create = () =>{
        const material = new THREE.LineBasicMaterial({
            color: 0xacd620,
            opacity: .1,
            transparent: true
        });
        
        const points = [this.startingVertex, this.endingVertex];
        
        const geometry = new THREE.BufferGeometry().setFromPoints( points );
        
        const line = new THREE.Line( geometry, material );
        return line;
    }
}