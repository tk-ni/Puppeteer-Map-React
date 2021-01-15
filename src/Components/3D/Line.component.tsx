import * as THREE from 'three';

export default class Line {
    create = (startingVertex: THREE.Vector2 , endingVertex: THREE.Vector2) =>{
        const material = new THREE.LineBasicMaterial({
            color: 0x0000ff
        });
        
        const points = [startingVertex, endingVertex];
        
        const geometry = new THREE.BufferGeometry().setFromPoints( points );
        
        const line = new THREE.Line( geometry, material );
        return line;
    }
}