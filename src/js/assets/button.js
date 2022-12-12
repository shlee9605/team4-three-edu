import * as THREE from 'three'

class Button{
    constructor(){
        this.mesh = new THREE.Mesh( new THREE.PlaneGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );

        this.button9 = new THREE.Mesh( new THREE.CylinderGeometry(1,1,1,100), new THREE.MeshPhongMaterial({color: 0x007700, specular: 0x00ff00, shininess: 100}));
        this.button12 = new THREE.Mesh( new THREE.CylinderGeometry(1,1,1,100), new THREE.MeshPhongMaterial({color: 0x007700, specular: 0x00ff00, shininess: 100}));
        this.button10 = new THREE.Mesh( new THREE.CylinderGeometry(1,1,1,100), new THREE.MeshPhongMaterial({color: 0x007700, specular: 0x00ff00, shininess: 100}));
        this.button13 = new THREE.Mesh( new THREE.CylinderGeometry(1,1,1,100), new THREE.MeshPhongMaterial({color: 0x007700, specular: 0x00ff00, shininess: 100}));
        this.button11 = new THREE.Mesh( new THREE.CylinderGeometry(1,1,1,100), new THREE.MeshPhongMaterial({color: 0x007700, specular: 0x00ff00, shininess: 100}));
        
        this.cube1 = new THREE.Mesh( new THREE.BoxGeometry(3,1,3), new THREE.MeshPhongMaterial({color: 0x666666, specular: 0x00ff00, shininess: 100}));
        this.cube2 = new THREE.Mesh( new THREE.BoxGeometry(3,1,3), new THREE.MeshPhongMaterial({color: 0x666666, specular: 0x00ff00, shininess: 100}));
        this.cube3 = new THREE.Mesh( new THREE.BoxGeometry(3,1,3), new THREE.MeshPhongMaterial({color: 0x666666, specular: 0x00ff00, shininess: 100}));
        this.cube4 = new THREE.Mesh( new THREE.BoxGeometry(3,1,3), new THREE.MeshPhongMaterial({color: 0x666666, specular: 0x00ff00, shininess: 100}));
        this.cube5 = new THREE.Mesh( new THREE.BoxGeometry(3,1,3), new THREE.MeshPhongMaterial({color: 0x666666, specular: 0x00ff00, shininess: 100}));
        
        this.setButton();
    }

    setButton(){
        this.mesh.rotation.x = - Math.PI / 2;
        this.mesh.receiveShadow = true;

        this.button9.rotateY(- (Math.PI/2))
        this.button9.name="1호기"
        this.button9.position.x-=15
        this.button9.position.y+=0.5
        this.button9.position.z+=16
        this.button9.layers.enable(1);

        this.button12.rotateY(- (Math.PI/2))
        this.button12.name="SEN 1"
        this.button12.position.x-=10
        this.button12.position.y+=0.5
        this.button12.position.z+=16
        this.button12.layers.enable(1);

        this.button10.rotateY(- (Math.PI/2))
        this.button10.name="2호기"
        this.button10.position.x-=5
        this.button10.position.y+=0.5
        this.button10.position.z+=16
        this.button10.layers.enable(1);

        this.button13.rotateY(- (Math.PI/2))
        this.button13.name="SEN 2"
        this.button13.position.x-=0
        this.button13.position.y+=0.5
        this.button13.position.z+=16
        this.button13.layers.enable(1);

        this.button11.rotateY(- (Math.PI/2))
        this.button11.name="3호기"
        this.button11.position.x+=5
        this.button11.position.y+=0.5
        this.button11.position.z+=16
        this.button11.layers.enable(1);

        this.cube1.name="1호기버튼"
        this.cube1.position.x+=-15
        this.cube1.position.y+=-0.5
        this.cube1.position.z+=16

        this.cube2.name="SEN1 버튼"
        this.cube2.position.x+=-10
        this.cube2.position.y+=-0.5
        this.cube2.position.z+=16
        
        this.cube3.name="2호기버튼"
        this.cube3.position.x+=5
        this.cube3.position.y+=-0.5
        this.cube3.position.z+=16
        
        this.cube4.name="SEN2 버튼"
        this.cube4.position.x+=0
        this.cube4.position.y+=-0.5
        this.cube4.position.z+=16

        this.cube5.name="3호기버튼"
        this.cube5.position.x+=-5
        this.cube5.position.y+=-0.5
        this.cube5.position.z+=16


    }
}

export { Button };