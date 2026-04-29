import { MessageHandler } from "@shared/shared"
import { AnswerInterface, CreateInterface, IceCandidateInterface, IRoomRegistry, JoinInterface, OfferInterface } from "@shared/shared";
import { WebSocket } from "@shared/shared"

export class CreateHandler implements MessageHandler<CreateInterface> {

    constructor(private registery: IRoomRegistry){}

    handle(message: CreateInterface, socket: WebSocket): void {
        this.registery.createRoom(message.payload.roomKey,socket)
 }

}


export class JoinHandler implements MessageHandler<JoinInterface> {

    constructor(private registery: IRoomRegistry){}

    handle(message: JoinInterface, socket: WebSocket): void {
        this.registery.joinRoom(message.payload.roomKey,socket)
    }
} 


export class OfferHandler implements MessageHandler<OfferInterface> {

    constructor(private registery: IRoomRegistry){}

    handle(message: OfferInterface, socket: WebSocket): void {
        
        const peer = this.registery.getOtherPeer(message.payload.roomKey,socket)
        if (!peer) return
        peer.send(JSON.stringify(message))
    }
}

export class AnswerHandler implements MessageHandler<AnswerInterface> {

    constructor( private registery: IRoomRegistry) {}

    handle(message: AnswerInterface, socket: WebSocket): void {
        const peer = this.registery.getOtherPeer(message.payload.roomKey,socket)
        if(!peer) return
        peer.send(JSON.stringify(message))
    }
}


export class IceCandidateHandler implements MessageHandler<IceCandidateInterface> {
     constructor (private registery: IRoomRegistry){}

     handle(message: IceCandidateInterface, socket: WebSocket): void {
         const peer = this.registery.getOtherPeer(message.payload.roomKey,socket)
         if(!peer) return
         peer.send(JSON.stringify(message))
     }
}
