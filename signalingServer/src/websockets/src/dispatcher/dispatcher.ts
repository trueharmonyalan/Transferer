import { WebSocket } from "@shared/shared"
import { IDispatcher, MessageType, MessageHandler } from "@shared/shared";
import { IncomingMessage } from "@shared/shared";


export class Dispatcher implements IDispatcher{

    private handler =  new Map <MessageType, MessageHandler<IncomingMessage>> ()

    register(type: MessageType, handler: MessageHandler<IncomingMessage>): void {
        this.handler.set(type, handler)
    }


    dispatch(raw: string, socket: WebSocket): void {

        try{
            const message: IncomingMessage = JSON.parse(raw) 
            
            if(this.handler.has(message.type)){
                const handler = this.handler.get(message.type)
                handler?.handle(message,socket)
            }

        } catch (e) {
            // log is applied on it. 
            return 

        }

        
    }





}