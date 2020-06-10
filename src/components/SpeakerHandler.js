import { isSpeakerAvailable } from "./AudioDescriptionTool";

//file:///home/student/Documents/pizarrabasica/index.html


let synth = window.speechSynthesis;
let enable = false
class SpeakerHandler
{

    speak(msg){
        if(!enable){
            return
        }
        if(!isSpeakerAvailable){
            return
        }
        console.log(msg)
        let utterThis = new SpeechSynthesisUtterance(msg);
        utterThis.voice = synth.getVoices().filter((value)=> {return (value.lang=='es-US')})[0]
        // utterThis.voice.localService = true
        // utterThis.voice.default = true
        synth.speak(utterThis);
    }

    enable(){
        enable = true
    }

    disable(){
        enable = false
    }
}

const speakerHandler = new SpeakerHandler
export default speakerHandler

