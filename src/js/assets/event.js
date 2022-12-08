/**
 * 목표 기기의 실시간 정보를 연결하는 파트입니다
 * 방식은 자유지만 본 프로젝트에서는 mqtt를 사용함
 */
import mqtt from "mqtt";

class Event{
    constructor(element, edukit){
        const publish_topic = "myFront";
        const subscribe_topic = "myEdukit";
        const port = '9001';
        const host = 'localhost';
        const path = '';

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
            this.setMQTT(host, port, path, subscribe_topic, statusElement.style, edukit);
            startButton.style.color = 'green';
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
            let meg = {
                tagId : '1',
                value : '1'
            }
            startButton.style.color = "red";
            stopButton.style.color = "green";
            resetButton.style.color = "green";
            this.setStart(publish_topic, meg);
        });

        stopButton.addEventListener("click",()=>{
            let meg = {
                tagId : '1',
                value : '0'
            }
            stopButton.style.color = "red";
            startButton.style.color = "green";
            resetButton.style.color = "green";
            this.setStop(publish_topic, meg);
        });

        resetButton.addEventListener("click",()=>{
            let meg = {
                tagId : '8',
                value : '0'
            }
            resetButton.style.color = "red";
            this.setReset(publish_topic, meg);
        });

        //connect at start
        this.setMQTT(host, port, path, subscribe_topic, statusElement.style, startButton.style, edukit);

        element.appendChild(eventElement);
    }

    //Event handler
    setStart(topic, mes){
        let { tagId, value } = mes;
        console.log(tagId, value);
        this.client.publish(topic, JSON.stringify(mes));
    }

    setStop(topic, mes){
        let { tagId, value } = mes;
        console.log(tagId, value);
        this.client.publish(topic, JSON.stringify(mes));
    }

    setReset(topic, mes){
        let { tagId, value } = mes;
        console.log(tagId, value);
        this.client.publish(topic, JSON.stringify(mes));
    }

    //connect at start
    setMQTT(hostname, port, path, topic, status, start, edukit){
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