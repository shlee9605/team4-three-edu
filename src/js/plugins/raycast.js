const calculate = {
    ray(event, renderer){
        const cx = event.clientX
        const cy = event.clientY
        const tx = event.offsetX
        const ty = event.offsetY

        const bx = cx - tx
        const by = cy - ty
        const rx = cx - bx
        const ry = cy - by
        
        const width = renderer.domElement.clientWidth
        const height = renderer.domElement.clientHeight

        const wx = rx/width
        const wy = ry/height

        const x = wx * 2 - 1
        const y = -wy * 2 + 1
        return {x, y}
    }
}

export default calculate