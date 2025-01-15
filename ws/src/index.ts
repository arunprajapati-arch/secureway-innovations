import { WebSocketServer } from 'ws';
import { data } from './inMemoryStore/store';

const wss = new WebSocketServer({ port: 3001 });

const cacheData = data;
console.log(cacheData);


wss.on('connection', async function connection(ws) {
    // await loadInMemoryStore
    ws.on('message', async (data) => {
        const parsedData = await JSON.parse(data.toString());
        console.log(parsedData);
        
        if(parsedData.payload.id === cacheData){
            const outgoingMessage = {
                "access": "granted"
            }
            ws.send(JSON.stringify(outgoingMessage));
        }
        else{
            const outgoingMessage = {
                "access": "blocked"
            }
            ws.send(JSON.stringify(outgoingMessage));
        }
    })
  console.log("User connected")
  ws.on('error', console.error);

  ws.on('close', () => {
   
  });
});