const buttonhandler = { 
    

    //connecting button
    buttonConnect(start, stop, reset){
        this.buttonReset(start, stop, reset)
        start.classList.add('btn-success');
        stop.classList.add('btn-success');
        reset.classList.add('btn-warning');
        start.style.pointerEvents = 'auto'
        stop.style.pointerEvents = 'auto'
        reset.style.pointerEvents = 'auto'
    },

    //button classList삭제해주고 다시 class넣기위한 함수
    buttonReset(start, stop, reset){
        start.classList.remove("btn-success","btn-danger","btn-warning");
        stop.classList.remove("btn-success","btn-danger","btn-warning");
        reset.classList.remove("btn-success","btn-danger","btn-warning");
        //classList삭제해주고 다시 class넣기
    },

    //Starting button styles
    Start(start, stop, reset){
        this.buttonReset(start, stop, reset);
        start.classList.add('btn-danger');
        stop.classList.add('btn-success');
        reset.classList.add('btn-danger');
        start.style.pointerEvents = 'none'
        stop.style.pointerEvents = 'auto'
        reset.style.pointerEvents = 'none'
    },
    //Stopping button styles
    Stop(start, stop, reset){
        this.buttonReset(start, stop, reset);
        start.classList.add('btn', 'btn-success');
        stop.classList.add('btn', 'btn-danger');
        reset.classList.add('btn', 'btn-success');
        start.style.pointerEvents = 'auto'
        stop.style.pointerEvents = 'none'
        reset.style.pointerEvents = 'auto'
    },
    //resetting button styles
    Reset(start, stop, reset){
        this.buttonReset(start, stop, reset);
        start.classList.add('btn', 'btn-success');
        stop.classList.add('btn', 'btn-danger');
        reset.classList.add('btn', 'btn-danger');
        start.style.pointerEvents = 'auto'
        stop.style.pointerEvents = 'none'
        reset.style.pointerEvents = 'none'
    }
}

export default buttonhandler