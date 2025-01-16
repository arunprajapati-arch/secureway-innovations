import { WebSocketServer } from 'ws';
import { Store } from './store/Store';

const wss = new WebSocketServer({ port: 3001 });

let storeLoaded = false;
interface outgoingMessage {
    access: string
    roll: string
    username?: string
}

// Store.getInstance().loadStore().then(() => {
//     storeLoaded = true
//     console.log("Store Loaded Successfully");
    
// }).catch((error) => {
//     console.error("Failed Store Load", error);
// })

wss.on('connection', async function connection(ws) {
    // await loadInMemoryStore

    if(storeLoaded){
        ws.send(JSON.stringify("store is loaded"));
    } 
    else{
        ws.send(JSON.stringify("loading the store"));
        const checkLoadStore = await Store.getInstance().loadStore();
        if(checkLoadStore){
            storeLoaded = true;
            ws.send(JSON.stringify("store load completed"))
        }
        else{
            ws.send("store load unsucessfull");
        }
        
    }
    
    ws.on('message', async (data) => {
        const parsedData = await JSON.parse(data.toString());
        console.log(parsedData);
        const rollNo = parsedData.payload.roll
        const verifyStudent = Store.getInstance().verifyStudent(parsedData.payload.id);
        if(verifyStudent){
            
            const outgoingMessage = {
                "access": "granted",
                "roll": verifyStudent.roll,
                "username": verifyStudent.name
            }
            broadcast(outgoingMessage);
        }
        else{
            const outgoingMessage = {
                "access": "blocked",
                "roll": rollNo
            }
            broadcast(outgoingMessage);
        }
    })
  console.log("User connected")
  ws.on('error', console.error);

  ws.on('close', () => {
   
  });
});

function broadcast(message: outgoingMessage) {
    wss.clients.forEach(client => {
        if (client.readyState === client.OPEN) {
            client.send(JSON.stringify(message));
        }
    });
}