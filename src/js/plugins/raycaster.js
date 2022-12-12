const ThreeButtonHandler = {
    // constructor(intersect, scene){
    //     let tagId = ''
    //     let value = ''
    //     this.Handling(intersect, scene)
    // }

    Handling(intersect, scene){
        if(intersect.object.name=="1호기"){
            if(scene.button.button9.position.y==0.5){
                intersect.object.material.color.set(0x770000)
                scene.button.button9.position.y-=0.5
                return {tagId : '9', value : '0'}
            }
            else{
                intersect.object.material.color.set(0x007700)
                scene.button.button9.position.y+=0.5
                return {tagId : '9', value : '1'}
            }
        }

        if(intersect.object.name=="SEN 1"){
            if(scene.button.button12.position.y==0.5){
                intersect.object.material.color.set(0x770000)
                scene.button.button12.position.y-=0.5
                return {tagId : '12', value : '0'}
            }
            else{
                intersect.object.material.color.set(0x007700)
                scene.button.button12.position.y+=0.5
                return {tagId : '12', value : '1'}
            }
        }

        if(intersect.object.name=="2호기"){
            if(scene.button.button10.position.y==0.5){
                intersect.object.material.color.set(0x770000)
                scene.button.button10.position.y-=0.5
                return {tagId : '10', value : '0'}
            }
            else{
                intersect.object.material.color.set(0x007700)
                scene.button.button10.position.y+=0.5
                return {tagId : '10', value : '1'}
            }
        }

        if(intersect.object.name=="SEN 2"){
            if(scene.button.button13.position.y==0.5){
                intersect.object.material.color.set(0x770000)
                scene.button.button13.position.y-=0.5
                return {tagId : '13', value : '0'}
            }
            else{
                intersect.object.material.color.set(0x007700)
                scene.button.button13.position.y+=0.5
                return {tagId : '13', value : '1'}
            }
        }

        if(intersect.object.name=="3호기"){
            if(scene.button.button11.position.y==0.5){
                intersect.object.material.color.set(0x770000)
                scene.button.button11.position.y-=0.5
                return {tagId : '11', value : '0'}
            }
            else{
                intersect.object.material.color.set(0x007700)
                scene.button.button11.position.y+=0.5
                return {tagId : '11', value : '1'}
            }
        }
    }

}

export default ThreeButtonHandler