import PubNub from 'pubnub';


const CHANNELS = {
 TEST: 'TEST',
 BLOCKCHAIN: 'SOMECHAIN',
};


const credentials = {
 publishKey: '###',
 subscribeKey: '###',
 secretKey: '###',
 userId: 'ellabelle-somechain',
};


export default class Network {
 constructor({ blockchain }) {
   this.blockchain = blockchain;
   
   this.pubnub = new PubNub(credentials);
   this.pubnub.subscribe({ channels: Object.values(CHANNELS) });
   this.pubnub.addListener(this.handleMessage());
 }


 broadcast() {
   this.publish({
     channel: CHANNELS.BLOCKCHAIN,
     message: JSON.stringify(this.blockchain.chain),
   });
 }


 handleMessage() {
   return {
     message: (msgObject) => {
       const { channel, message } = msgObject;
       const msg = JSON.parse(message);
       console.log(
         `Meddelande har mottagits på kanal: ${channel}, meddelandet är ${message}`
       );


       if (channel === CHANNELS.BLOCKCHAIN) {
         this.blockchain.replaceChain(msg);
       }
     },
   };
 }


 publish({ channel, message }) {
   this.pubnub.publish({ channel, message });
 }
}
