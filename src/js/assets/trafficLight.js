import * as THREE from 'three'

class TrafficLight{
    constructor(){
        this.trafficLight1 = new THREE.Mesh( new THREE.CylinderGeometry(0.90,0.90,1,100), new THREE.MeshPhongMaterial({color: 0x003300, specular: 0x00ff00, shininess: 100}));
        this.trafficLight2 = new THREE.Mesh( new THREE.CylinderGeometry(0.90,0.90,1,100), new THREE.MeshPhongMaterial({color: 0x996600, specular: 0x00ff00, shininess: 100}));
        this.trafficLight3 = new THREE.Mesh( new THREE.CylinderGeometry(0.90,0.90,1,100), new THREE.MeshPhongMaterial({color: 0x660000, specular: 0xCC000, shininess: 100}));
        this.pillarTop1 = new THREE.Mesh( new THREE.CylinderGeometry(0.9,0.90,0.3,100), new THREE.MeshPhongMaterial({color: 0xffffcc, specular: 0x00ff00, shininess: 100}));
        this.pillarTop2 = new THREE.Mesh( new THREE.CylinderGeometry(0.9,0.60,1,100), new THREE.MeshPhongMaterial({color: 0xffffcc, specular: 0x00ff00, shininess: 100}));
        this.pillarFloor = new THREE.Mesh( new THREE.CylinderGeometry(0.7,0.90,1,100), new THREE.MeshPhongMaterial({color: 0x666666, specular: 0x00ff00, shininess: 100}));
        this.pillar = new THREE.Mesh( new THREE.CylinderGeometry(0.30,0.30,10,100), new THREE.MeshPhongMaterial({color: 0x666666, specular: 0x00ff00, shininess: 100}));
        // 밝은 초록 00FF00 밝은 빨강 FF0000 노랑 FFFF00
        this.trafficLight();
    }

    trafficLight(){
        this.trafficLight1.rotateY(- (Math.PI/2))
        this.trafficLight1.name="초록불"
        this.trafficLight1.position.x-=-14
        this.trafficLight1.position.y+=10
        this.trafficLight1.position.z+=2

        this.trafficLight2.rotateY(- (Math.PI/2))
        this.trafficLight2.name="노랑불"
        this.trafficLight2.position.x-=-14
        this.trafficLight2.position.y+=11
        this.trafficLight2.position.z+=2

        this.trafficLight3.rotateY(- (Math.PI/2))
        this.trafficLight3.name="빨간불"
        this.trafficLight3.position.x-=-14
        this.trafficLight3.position.y+=12
        this.trafficLight3.position.z+=2
        
        this.pillarTop1.rotateY(- (Math.PI/2))
        this.pillarTop1.name="기둥머리1"
        this.pillarTop1.position.x-=-14
        this.pillarTop1.position.y+=12.7
        this.pillarTop1.position.z+=2

        this.pillarTop2.rotateY(- (Math.PI/2))
        this.pillarTop2.name="기둥머리2"
        this.pillarTop2.position.x-=-14
        this.pillarTop2.position.y+=9
        this.pillarTop2.position.z+=2

        this.pillarFloor.rotateY(- (Math.PI/2))
        this.pillarFloor.name="기둥바닥"
        this.pillarFloor.position.x-=-14
        this.pillarFloor.position.y+=0
        this.pillarFloor.position.z+=2

        this.pillar.rotateY(- (Math.PI/2))
        this.pillar.name="기둥"
        this.pillar.position.x-=-14
        this.pillar.position.y+=5
        this.pillar.position.z+=2
    }
}

export { TrafficLight };