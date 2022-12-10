/**
 * 목표 기기의 실시간 정보를 연결하는 파트입니다
 * 방식은 자유지만 본 프로젝트에서는 mqtt를 사용함
 */
import mqtt from "mqtt";
import * as THREE from 'three'
import calculate from "../plugins/raycast"

class Event{
    constructor(element, renderer, scene){
        ////config///
        const publish_topic = "myFront";
        const subscribe_topic = "myEdukit";
        const port = '9001';
        const host = '192.168.0.106';
        const path = '';


        ////3D buttons////
        let button1 = true;
        let button2 = true;
        let button3 = true;
        let button4 = true;
        let button5 = true;

        const raycast = new THREE.Raycaster();
        raycast.layers.set(1);
        const pointer = new THREE.Vector2();
        
        renderer.domElement.addEventListener('pointerdown', event =>{
            const xy = calculate.ray(event, renderer)
            const x=xy.x;
            const y=xy.y;

            pointer.set(x, y);

            raycast.setFromCamera(pointer, scene.camera.cameraElement);
            const intersects = raycast.intersectObjects(scene.scene.children);

            if(intersects){
                const intersect = intersects[0]
                console.log(intersect.object.name)
                if(intersect.object.name=="1호기"){
                    if(button1==true){
                        intersect.object.material.color.set(0x770000)
                        this.sendMQTT(publish_topic, {tagId : '9', value : '0'});
                        button1=false
                    }
                    else{
                        intersect.object.material.color.set(0x007700)
                        this.sendMQTT(publish_topic, {tagId : '9', value : '1'});
                        button1=true
                    }
                }

                if(intersect.object.name=="SEN 1"){
                    if(button2==true){
                        intersect.object.material.color.set(0x770000)
                        this.sendMQTT(publish_topic, {tagId : '12', value : '0'});
                        button2=false
                    }
                    else{
                        intersect.object.material.color.set(0x007700)
                        this.sendMQTT(publish_topic, {tagId : '12', value : '1'});
                        button2=true
                    }
                }

                if(intersect.object.name=="2호기"){
                    if(button3==true){
                        intersect.object.material.color.set(0x770000)
                        this.sendMQTT(publish_topic, {tagId : '10', value : '0'});
                        button3=false
                    }
                    else{
                        intersect.object.material.color.set(0x007700)
                        this.sendMQTT(publish_topic, {tagId : '10', value : '1'});
                        button3=true
                    }
                }

                if(intersect.object.name=="SEN 2"){
                    if(button4==true){
                        intersect.object.material.color.set(0x770000)
                        this.sendMQTT(publish_topic, {tagId : '13', value : '0'});
                        button4=false
                    }
                    else{
                        intersect.object.material.color.set(0x007700)
                        this.sendMQTT(publish_topic, {tagId : '13', value : '1'});
                        button4=true
                    }
                }

                if(intersect.object.name=="3호기"){
                    if(button5==true){
                        intersect.object.material.color.set(0x770000)
                        this.sendMQTT(publish_topic, {tagId : '11', value : '0'});
                        button5=false
                    }
                    else{
                        intersect.object.material.color.set(0x007700)
                        this.sendMQTT(publish_topic, {tagId : '11', value : '1'});
                        button5=true
                    }
                }
            }
        })

        ////2D buttons////
        const eventElement = document.createElement("div");

        //connection check & reconnect
        const connectButton = eventElement.appendChild(document.createElement("button"));
        connectButton.innerText = "Connect"
        connectButton.style.position = 'relative'
        connectButton.style.right = '350%'
        connectButton.style.top = '25%'

        const statusElement = eventElement.appendChild(document.createElement("span"));
        statusElement.innerText = "연결";
        statusElement.style.color = "red";
        statusElement.style.position = 'relative'
        statusElement.style.right = '345%'
        statusElement.style.top = '18%'

        connectButton.addEventListener("click", () => {
            statusElement.style.color = "red";
            if(this.client) this.client.end();
            this.receiveMQTT(host, port, path, subscribe_topic, statusElement.style, startButton.style, scene.resource.edukit);
        });

        //start button
        const startButton = eventElement.appendChild(document.createElement("button"));
        startButton.innerText = "시작"
        startButton.style.position = 'relative'
        startButton.style.right = '240%'
        startButton.style.top = '18.5%'
        startButton.style.color = 'red'

        //stop button
        const stopButton = eventElement.appendChild(document.createElement("button"));
        stopButton.innerText = "정지"
        stopButton.style.position = 'relative'
        stopButton.style.right = '170%'
        stopButton.style.top = '15%'
        stopButton.style.color = 'red'

        //reset button
        const resetButton = eventElement.appendChild(document.createElement("button"));
        resetButton.innerText = "리셋"
        resetButton.style.position = 'relative'
        resetButton.style.right = '100%'
        resetButton.style.top = '11.5%'
        resetButton.style.color = 'red'

        //event listener
        startButton.addEventListener("click",()=>{
            startButton.style.color = "red";
            stopButton.style.color = "green";
            resetButton.style.color = "green";
            console.log("start")
            this.sendMQTT(publish_topic, {tagId : '1', value : '1'});
        });

        stopButton.addEventListener("click",()=>{
            stopButton.style.color = "red";
            startButton.style.color = "green";
            resetButton.style.color = "green";
            console.log("stop")
            this.sendMQTT(publish_topic, {tagId : '1', value : '0'});
        });

        resetButton.addEventListener("click",()=>{
            resetButton.style.color = "red";
            console.log("reset")
            this.sendMQTT(publish_topic, {tagId : '8', value : '0'});
        });

        //connect at start
        this.receiveMQTT(host, port, path, subscribe_topic, statusElement.style, startButton.style, scene.resource.edukit);

        element.appendChild(eventElement);
    }


    //Send to PLC
    sendMQTT(topic, mes){
        console.log(mes);
        this.client.publish(topic, JSON.stringify(mes));
    }

    //Recieve from PLC
    receiveMQTT(hostname, port, path, topic, status, start, edukit){
        const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
        this.client = mqtt.connect({
            clientId,
            protocol: "ws",
            reconnectPeriod: 1000,
            hostname: hostname,
            port: port,
            path: path,
        });

        this.client.on('connect', () => {
            console.log("MQTT Connected");
            status.color = "green";
            start.color = "green";

            this.client.subscribe([topic], () => {
                console.log(`토픽 연결 완료: ${topic}`);
            });

            this.client.on('message', (topic, payload)=>{
                // console.log(`토픽 ${topic}에서 전송된 메시지: ${payload.toString()}`);
                let message = JSON.parse(payload);
                let data = message.Wrapper.filter((p)=>p.tagId === "21" || p.tagId === "22");
                data = data.map((p)=>parseInt(p.value));

                edukit["yAxis"] = data[0];
                edukit["xAxis"] = data[1];
            })
        });
    }
}

export { Event };