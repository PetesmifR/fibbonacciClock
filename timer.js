function digitObject_show() {
  var text = this.mask.indexOf('HH')+1 ? (this.H<10 ? "0":"")+this.H+":" : this.mask.indexOf('H')+1 ? this.H+":" : ''
  text += this.mask.indexOf('MM')+1 ? (this.M<10 ? "0":"")+this.M+":" : this.mask.indexOf('M')+1 ? this.M+":" : ''
  text += this.mask.indexOf('SS')+1 ? (this.S<10 ? "0":"")+this.S : this.mask.indexOf('S')+1 ? this.S : ''
  this.ID.innerHTML=text
 }
 
function digitObject_decrement() {
  this.S--
  if (this.S<0) {this.S=59; this.M--}
  if (this.M<0) {this.M=59; this.H--}
  if (this.H<0) {this.H=0;this.M=0;this.S=0}
}

function digitObject_increment() {
  this.S++
  if (this.S>59) {this.S=0; this.M++}
  if (this.M>59) {this.M=0; this.H++}
  if (this.H>99)  this.H=0
}

function digitObject_reset() {
  this.H=this.duration ? this.duration.H : 0
  this.M=this.duration ? this.duration.M : 0
  this.S=this.duration ? this.duration.S : 0
  //this.ID.style.color="rgb(0,0,0)"
  this.show()
}

function digitObject_updateDuration(duration) {
  this.duration.H = Math.floor(duration / 60)
  this.duration.M = duration % 60
  this.duration.S = 0
}
  
function digitObject_outOfTime() {
chosenOption('')
}

function timerObject_getTime() {
  var time=new Date()
  with (time) var currentTime =(getHours()*3600+getMinutes()*60+getSeconds())
  return currentTime
}

function timerObject_start(interval) {
  this.lastTime = this.getTime()
  interval = interval || 50  
  this.tick=setInterval(this.ID+'.update()',interval)
}
 
function timerObject_reset() {
  this.lastTime = this.getTime()
  if (this.elapsed) this.elapsed.reset()
  if (this.remaining) this.remaining.reset()
  if (this.real) this.real.show()
}

function timerObject_stop() {
  clearInterval(this.tick)
  this.tick=false
}
    
function timerObject_startStop() {this.running = this.running ? false : true}

function timerObject_update() {
  var timePassed=this.getTime()
  if (timePassed-this.lastTime)
    {
    if (this.real) with(this.real){increment(); show()}
    if (this.running)
      {
      if (this.elapsed) with(this.elapsed){increment(); show()}
      if (this.remaining) with(this.remaining) {decrement(); show(); if(H+M+S==0) outOfTime()}
      }
    this.lastTime=timePassed
    }

}

function timerObject(data) {
  this.ID=data.ID
  this.lastTime=0
  this.running=false
  
  this.getTime=timerObject_getTime
  var timePassed=this.getTime()
  
  if (data.elapsed) this.elapsed={ID:data.elapsed, mask:data.mask, increment:digitObject_increment, show:digitObject_show, reset:digitObject_reset}
  if (data.remaining) this.remaining={ID:data.remaining, mask:data.mask, duration:data.duration, H:data.duration.H, M:data.duration.M, S:data.duration.S, decrement:digitObject_decrement, show:digitObject_show, reset:digitObject_reset, updateDuration:digitObject_updateDuration, outOfTime:digitObject_outOfTime}
  if (data.real) this.real={ID:data.real, mask:data.mask, H:Math.floor(timePassed / 3600), M:Math.floor(timePassed % 3600 / 60), S:Math.floor(timePassed % 3600 % 60), increment:digitObject_increment, show:digitObject_show, reset:digitObject_reset}
  this.start=timerObject_start
  this.stop=timerObject_stop
  this.reset=timerObject_reset
  this.update=timerObject_update
  this.startStop=timerObject_startStop
   
  this.reset()
}
  
