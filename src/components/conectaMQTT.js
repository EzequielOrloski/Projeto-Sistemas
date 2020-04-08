import MQTT from "mqtt";

class ConectaMQTT{
    constructor(callbackFunc){
        this.callbackFunc = callbackFunc;

        this.mensagens = (topic, message) => {
            let payload = message.toString();
            try{
                this.callbackFunc(JSON.parse(payload));
            }catch(error){
                console.log(error.message);
            }
        }
        let client = MQTT.connect("ws://broker.mqttdashboard.com:8000/mqtt");
        client.on('connect', function(){
            client.subscribe('projeto_beacon');
            client.publish('projeto_beacon_resp', 'Aguardando dados!');
        });
        client.on('message', this.mensagens.bind(this));
        client.on('error', function () {
            console.log("Algo inesperado ocorreu!");
        });
    }
}
export default ConectaMQTT;