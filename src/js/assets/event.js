/**
 * 목표 기기의 실시간 정보를 연결하는 파트입니다
 * 방식은 자유지만 본 프로젝트에서는 mqtt를 사용함
 */
import mqtt from "mqtt";
import * as THREE from 'three'
import calculate from "../plugins/raycast"

class Event{
    constructor(element, renderer, scene){
        ////config////
        const publish_topic = process.env.VUE_APP_PUBLISH_TOPIC
        const subscribe_topic = process.env.VUE_APP_SUBSCRIBE_TOPIC
        const port = process.env.VUE_APP_PORT2
        const host = process.env.VUE_APP_HOST2 
        const path = process.env.VUE_APP_PATH2;

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
                        scene.button.button9.position.y+=-0.5
                        this.sendMQTT(publish_topic, {tagId : '9', value : '0'});
                        button1=false
                    }
                    else{
                        intersect.object.material.color.set(0x007700)
                        this.sendMQTT(publish_topic, {tagId : '9', value : '1'});
                        scene.button.button9.position.y+=0.5
                        button1=true
                    }
                }

                if(intersect.object.name=="SEN 1"){
                    if(button2==true){
                        intersect.object.material.color.set(0x770000)
                        scene.button.button12.position.y+=-0.5
                        this.sendMQTT(publish_topic, {tagId : '12', value : '0'});
                        button2=false
                    }
                    else{
                        intersect.object.material.color.set(0x007700)
                        scene.button.button12.position.y+=0.5
                        this.sendMQTT(publish_topic, {tagId : '12', value : '1'});
                        button2=true
                    }
                }

                if(intersect.object.name=="2호기"){
                    if(button3==true){
                        intersect.object.material.color.set(0x770000)
                        scene.button.button10.position.y+=-0.5
                        this.sendMQTT(publish_topic, {tagId : '10', value : '0'});
                        button3=false
                    }
                    else{
                        intersect.object.material.color.set(0x007700)
                        scene.button.button10.position.y+=0.5
                        this.sendMQTT(publish_topic, {tagId : '10', value : '1'});
                        button3=true
                    }
                }

                if(intersect.object.name=="SEN 2"){
                    if(button4==true){
                        intersect.object.material.color.set(0x770000)
                        scene.button.button13.position.y+=-0.5
                        this.sendMQTT(publish_topic, {tagId : '13', value : '0'});
                        button4=false
                    }
                    else{
                        intersect.object.material.color.set(0x007700)
                        scene.button.button13.position.y+=0.5
                        this.sendMQTT(publish_topic, {tagId : '13', value : '1'});
                        button4=true
                    }
                }

                if(intersect.object.name=="3호기"){
                    if(button5==true){
                        intersect.object.material.color.set(0x770000)
                        scene.button.button11.position.y+=-0.5
                        this.sendMQTT(publish_topic, {tagId : '11', value : '0'});
                        button5=false
                    }
                    else{
                        intersect.object.material.color.set(0x007700)
                        scene.button.button11.position.y+=0.5
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
        connectButton.classList.add('btn', 'btn-primary');
        connectButton.style.position = 'relative'
        connectButton.style.right = '200%'
        connectButton.style.top = '20%'

        const statusElementt = eventElement.appendChild(document.createElement("pre"));
        statusElementt.innerText = "연결 상태 :";
        statusElementt.style.position = 'relative'
        statusElementt.style.right = '255%'
        statusElementt.style.top = '10%'

        const statusElement = eventElement.appendChild(document.createElement("span"));
        statusElement.innerText = "연결";
        statusElement.style.color = "red";
        statusElement.style.position = 'relative'
        statusElement.style.right = '170%'
        statusElement.style.top = '3.9%'

        connectButton.addEventListener("click", () => {
            statusElement.style.color = "red";
            this.ButtonConnect(startButton, stopButton, resetButton)
            if(this.client) this.client.end();
            this.receiveMQTT(host, port, path, subscribe_topic, statusElement.style, scene.resource.edukit);
        });
        
        //start button
        const startButton = eventElement.appendChild(document.createElement("button"));
        startButton.innerText = "시작"
        startButton.classList.add('btn', 'btn-success');
        startButton.style.position = 'relative'
        startButton.style.right = '270%'
        startButton.style.top = '18.5%'

        //stop button
        const stopButton = eventElement.appendChild(document.createElement("button"));
        stopButton.innerText = "정지"
        stopButton.classList.add('btn', 'btn-danger');
        stopButton.style.pointerEvents = 'none'
        stopButton.style.position = 'relative'
        stopButton.style.right = '170%'
        stopButton.style.top = '13.1%'

        //reset button
        const resetButton = eventElement.appendChild(document.createElement("button"));
        resetButton.innerText = "리셋"
        resetButton.classList.add('btn', 'btn-warning');
        resetButton.style.position = 'relative'
        resetButton.style.right = '103%'
        resetButton.style.top = '7.8%'

        
        const dice = eventElement.appendChild(document.createElement("pre"));
        dice.innerText = "주사위 상태 :";
        dice.style.position = 'relative'
        dice.style.right = '255%'
        dice.style.top = '15%'

        const diceStatus = eventElement.appendChild(document.createElement("span"));
        diceStatus.innerText = `나얀나`;
        diceStatus.style.color = "red";
        diceStatus.style.position = 'relative'
        diceStatus.style.right = '150%'
        diceStatus.style.top = '9.8%'

        const basket = eventElement.appendChild(document.createElement("pre"));
        basket.innerText = "바구니 상태 :";
        basket.style.position = 'relative'
        basket.style.right = '255%'
        basket.style.top = '10%'

        const basketStatus = eventElement.appendChild(document.createElement("span"));
        basketStatus.innerText = "waiting..";
        basketStatus.style.position = 'relative'
        basketStatus.style.right = '150%'
        basketStatus.style.top = '4.6%'
      
        //event listener
        startButton.addEventListener("click",()=>{
            this.START(startButton, stopButton, resetButton, publish_topic)
        });
        stopButton.addEventListener("click",()=>{
            this.STOP(startButton, stopButton, resetButton, publish_topic)
        });
        resetButton.addEventListener("click",()=>{
            this.RESET(startButton, stopButton, resetButton, publish_topic)
        });

        //connect at start
        this.receiveMQTT(host, port, path, subscribe_topic, statusElement.style, scene.resource.edukit, basketStatus, scene);
        
        element.appendChild(eventElement);
    }

    //Send to PLC
    sendMQTT(topic, mes){
        console.log(mes);
        this.client.publish(topic, JSON.stringify(mes));
    }

    //Recieve from PLC
    receiveMQTT(hostname, port, path, topic, status, edukit, basket, scene){
        const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
        this.client = mqtt.connect({
            clientId,
            protocol: "ws",
            reconnectPeriod: 1000,
            hostname: hostname,
            port: port,
            path: path,
        });

        //컵 색상 여부 알고리즘 변수
        let _cup = 0
        let _cup2 = 0
        let _cup_color = false
        
        this.client.on('connect', () => {
            console.log("MQTT Connected");
            status.color = "green";
            
            this.client.subscribe([topic], () => {
                console.log(`토픽 연결 완료: ${topic}`);
            });
            
            this.client.on('message', (topic, payload)=>{
                // console.log(`토픽 ${topic}에서 전송된 메시지: ${payload.toString()}`);
                let message = JSON.parse(payload);
                try{ 
                let data = message.Wrapper.filter((p)=>p.tagId === "21" || p.tagId === "22" || p.tagId === "3" || p.tagId === "4" || p.tagId === "5" || p.tagId === "6" || p.tagId === "18" || p.tagId === "19" || p.tagId === "20");


                // console.log(data);
                // data[0]1호기 작동여부 [1]2호기 작동여부 [2]3호기 작동 여부 [3] 비전센서 값
                // [4~5~6] 그린 옐로 레드 램프
                if(data[0].value == true){
                    _cup += 1
                    _cup_color=false
                    // basket.innerText = "start"
                    // console.log('시작', basket.innerText );
                }
                
                if(_cup != _cup2 && data[3].value === true){                    
                    _cup2+=1
                    _cup_color=true
                }
                
                if(data[1].value == true){
                    basket.innerText = "waiting..."
                    if(_cup_color==true){
                        basket.innerText = "흰색"
                        console.log("흰색")
                    }else if(_cup_color==false){
                        basket.innerText = "빨강색"
                        console.log("빨간색")
                    }
                }
                
                //light status
                if(data[4].value == true){
                    // console.log("green on")
                    scene.trafficLight.trafficLight1.material.color.set(0x00FF00)
                } else if(data[4].value == false){
                    scene.trafficLight.trafficLight1.material.color.set(0x003300)
                }
                if(data[5].value == true){
                    // console.log("yellow on")
                    scene.trafficLight.trafficLight2.material.color.set(0xFFFF00)
                } else if(data[5].value == false){
                    scene.trafficLight.trafficLight2.material.color.set(0x996600)
                }
                if(data[6].value == true){
                    // console.log("red on")
                    scene.trafficLight.trafficLight3.material.color.set(0xFF0000)
                } else if(data[6].value == false){
                    scene.trafficLight.trafficLight3.material.color.set(0x660000)
                }
                
                data = data.map((p)=>parseInt(p.value));
                edukit["yAxis"] = data[0];
                edukit["xAxis"] = data[1];
                }
                catch{
                    console.log("catching...")
                }
            })

        });
    }

    ButtonConnect(start, stop, reset){
        //start중에 커넥트버튼 누르면 실행되지 않게 return함
        // if(start.classList.value === 'btn btn-danger'){
        //     return
        // }
        this.ButtonReset(start, stop, reset)
        start.classList.add('btn-success');
        stop.classList.add('btn-success');
        reset.classList.add('btn-warning');
        start.style.pointerEvents = 'auto'
        stop.style.pointerEvents = 'auto'
        reset.style.pointerEvents = 'auto'
    }

    //button classList삭제해주고 다시 class넣기위한 함수
    ButtonReset(start, stop, reset){
        start.classList.remove("btn-success","btn-danger","btn-warning");
        stop.classList.remove("btn-success","btn-danger","btn-warning");
        reset.classList.remove("btn-success","btn-danger","btn-warning");
        //classList삭제해주고 다시 class넣기
    }

    //starting button styles
    START(start, stop, reset, topic){
        this.ButtonReset(start, stop, reset);
        start.classList.add('btn-danger');
        stop.classList.add('btn-success');
        reset.classList.add('btn-danger');
        console.log("edukit start")
        this.sendMQTT(topic, {tagId : '1', value : '1'});
        start.style.pointerEvents = 'none'
        stop.style.pointerEvents = 'auto'
        reset.style.pointerEvents = 'none'
    }

    //stopping button styles
    STOP(start, stop, reset, topic){
        this.ButtonReset(start, stop, reset);
        start.classList.add('btn', 'btn-success');
        stop.classList.add('btn', 'btn-danger');
        reset.classList.add('btn', 'btn-success');
        console.log("edukit stop")    
        this.sendMQTT(topic, {tagId : '1', value : '0'});
        start.style.pointerEvents = 'auto'
        stop.style.pointerEvents = 'none'
        reset.style.pointerEvents = 'auto'
    }

    //resetting button styles
    RESET(start, stop, reset, topic){
        this.ButtonReset(start, stop, reset);
        start.classList.add('btn', 'btn-success');
        stop.classList.add('btn', 'btn-danger');
        reset.classList.add('btn', 'btn-danger');
        console.log("edukit reset")
        this.sendMQTT(topic, {tagId : '8', value : '0'});
        start.style.pointerEvents = 'auto'
        stop.style.pointerEvents = 'none'
        reset.style.pointerEvents = 'none'
    }
}

export { Event };