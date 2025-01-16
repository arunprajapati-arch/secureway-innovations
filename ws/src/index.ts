import { WebSocketServer } from 'ws';
import { Store } from './store/Store';

const wss = new WebSocketServer({ port: 3001 });

let storeLoaded = false;

// Store.getInstance().loadStore().then(() => {
//     storeLoaded = true
//     console.log("Store Loaded Successfully");
    
// }).catch((error) => {
//     console.error("Failed Store Load", error);
// })

wss.on('connection', async function connection(ws) {
    // await loadInMemoryStore

    if(storeLoaded){
        ws.send("store is loaded");
    } 
    else{
        ws.send("loading the store");
        await Store.getInstance().loadStore();
        storeLoaded = true;
        ws.send("store load completed")
    }
    
    ws.on('message', async (data) => {
        const parsedData = await JSON.parse(data.toString());
        console.log(parsedData);
        
        if(Store.getInstance().verifyStudent(parsedData.payload.id) === true){
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