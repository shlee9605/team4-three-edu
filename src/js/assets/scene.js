/**
 * Three.js의 Scene을 셋팅하는 파트입니다
 */
import * as THREE from "three";
import { Resource } from "./resource";
import { Camera } from "./camera";
import { Light } from "./light";
import { Button } from "./button";

class Scene{
    constructor(file = null){
        this.scene = new THREE.Scene();

        this.resource = new Resource(file);
        this.camera = new Camera();
        this.light = new Light();
        this.button = new Button();
        this.setScene();
        this.setMesh();
        this.setGrid();
    }

    setScene(){
        this.scene.background = new THREE.Color( 0x101010 );

        this.scene.add(this.resource.obj)
    
    this.scene.add(this.light.ambientLight)

    this.scene.add(this.camera.camera)

    this.scene.add(this.light.dirLight)
    }
    
    setMesh(){
        this.scene.add(this.button.mesh);

        this.scene.add(this.button.button9)
        this.scene.add(this.button.button12)
        this.scene.add(this.button.button10)
        this.scene.add(this.button.button13)
        this.scene.add(this.button.button11);
    }

    setGrid(){
        this.grid = new THREE.GridHelper( 2000, 300, 0x000000, 0x000000 );
        this.grid.material.opacity = .3;
        this.grid.material.transparent = true;
        
        this.scene.add(this.grid);
    }

    setLight(){
        this.scene.add(this.light.dirLight);
    }

    setLightHelper(){
        this.helper = new THREE.CameraHelper(this.light.dirLight.shadow.camera);
        this.scene.add(this.helper);
    }

    removeHelper(){
        this.scene.remove(this.helper);
    }

    setCameraHelper(){
        this.helper = new THREE.CameraHelper(this.camera.cameraElement);
        this.scene.add(this.helper);
    }

    get sceneElement(){
        return this.scene;
    }
}

export { Scene };