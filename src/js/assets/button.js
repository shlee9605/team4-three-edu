import * as THREE from 'three'

class Button{
    constructor(){
        this.mesh = new THREE.Mesh( new THREE.PlaneGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );

        this.button9 = new THREE.Mesh( new THREE.CylinderGeometry(1.5,1.5,1,100), new THREE.MeshStandardMaterial({color: 0x00ff00}));
        this.button12 = new THREE.Mesh( new THREE.CylinderGeometry(1.5,1.5,1,100), new THREE.MeshStandardMaterial({color: 0x00ff00}));
        this.button10 = new THREE.Mesh( new THREE.CylinderGeometry(2,2,0.8,100), new THREE.MeshStandardMaterial({color: 0xff0000}));
        this.button13 = new THREE.Mesh( new THREE.CylinderGeometry(1.5,1.5,1,100), new THREE.MeshStandardMaterial({color: 0x00ff00}));
        this.button11 = new THREE.Mesh( new THREE.CylinderGeometry(1.5,1.5,1,100), new THREE.MeshStandardMaterial({color: 0x00ff00}));

        this.setButton();
    }

    setButton(){
        this.mesh.rotation.x = - Math.PI / 2;
        this.mesh.receiveShadow = true;        

        this.button9.rotateY(- (Math.PI/2))
        this.button9.position.x-=15
        this.button9.position.y+=0.5
        this.button9.position.z+=16

        this.button12.rotateY(- (Math.PI/2))
        this.button12.position.x-=10
        this.button12.position.y+=0.5
        this.button12.position.z+=16

        this.button10.rotateY(- (Math.PI/2))
        this.button10.position.x-=5
        this.button10.position.y+=0.4
        this.button10.position.z+=16

        this.button13.rotateY(- (Math.PI/2))
        this.button13.position.x-=0
        this.button13.position.y+=0.5
        this.button13.position.z+=16

        this.button11.rotateY(- (Math.PI/2))
        this.button11.position.x+=5
        this.button11.position.y+=0.5
        this.button11.position.z+=16
    }
}

export { Button };