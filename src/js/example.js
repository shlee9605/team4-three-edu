/**
 * 모든 파트를 통합하는 메인 파일입니다
 * 매개변수: 3D 렌더링을 등록 할 Element Type Instance
 * 반환: 3D 렌더링이 등록된 Element Type Instance
*/
import { Scene } from "./assets/scene"
import { Renderer } from "./assets/renderer"
import { Control } from "./assets/control"
import { Render } from "./assets/render";
import { Event } from "./assets/event";

// import * as THREE from "three";

import { Gui } from "./plugins/gui"

export default async (element) => {
    element.style.width = "700px";
    element.style.height = "700px";

    // Scene Setting
    let scene = new Scene("edukit");
    let cameraElement = scene.camera.cameraElement;
    let sceneElement = scene.sceneElement;

    // Renderer Setting
    let renderer = new Renderer(element);
    let renderElement = renderer.domElement;
    let rendererElement = renderer.rendererElement;

    // Control Setting
    let control = new Control(cameraElement, renderElement);
    let controlElement = control.controlElement;
    
    // Render Setting
    let render = new Render;
    render.element = element;
    render.controls = controlElement;
    render.scene = sceneElement;
    render.edukit = scene.resource.edukit;
    render.camera = cameraElement;
    render.renderer = rendererElement;

    // Rendering Start
    render.start();

    // WebGL Context Lost Handling
    renderElement.addEventListener("webglcontextlost", event => {
        event.preventDefault();
        render.stop();
    }, false);

    // WebGL Context Restored Handling
    renderElement.addEventListener("webglcontextrestored", () => {
        render.start();
    }, false);

    // Dat.GUI Setting
    let gui = new Gui(element);
    let options = {
        "yAxis": -27,
        "xAxis": -4375,
    }
    gui.addOptions(options);
    gui.addFolder("Example");

    gui.addExample("yAxis", -27, 1301828, scene.resource.edukit);
    gui.addExample("xAxis", -4375, 25021563, scene.resource.edukit);

    // MQTT Event Setting
    new Event(element, renderer, scene);
    
    // const raycast = new THREE.Raycaster();
    // raycast.layers.set(1);
    // const pointer = new THREE.Vector2();
    // renderElement.addEventListener('pointerdown', event =>{
    //     const cx = event.clientX
    //     const cy = event.clientY
    //     const tx = event.offsetX
    //     const ty = event.offsetY

    //     const bx = cx - tx
    //     const by = cy - ty
    //     const rx = cx - bx
    //     const ry = cy - by
        
    //     const width = renderer.domElement.clientWidth
    //     const height = renderer.domElement.clientHeight

    //     const wx = rx/width
    //     const wy = ry/height

    //     const x = wx * 2 - 1
    //     const y = -wy * 2 + 1

    //     pointer.set(x, y);

    //     raycast.setFromCamera(pointer, cameraElement);
    //     const intersects = raycast.intersectObjects(scene.scene.children);

    //     if(intersects){
    //         const intersect = intersects[0]
    //         // console.log(intersect)
    //         intersect.object.material.color.set(0x770000)
    //         // this.event.setStart('myFront', {tagId : '1', value : '0'});
    //         // intersect.object.material.color.set(THREE.MathUtils.randInt(0x000000,0xffffff))
    //     }
    // })

    return element;
}