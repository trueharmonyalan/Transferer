import { IRoomRegistry } from "@shared/shared";
import { WebSocket } from "@shared/shared"

 export class RoomRegistry implements IRoomRegistry {

    private rooms = new Map <string, Set<WebSocket>> ()

    createRoom(roomKey: string, socket: WebSocket): void {

        if (this.rooms.has(roomKey)) {
            return
        }
        
        const room = new Set<WebSocket>()
        room.add(socket)
        this.rooms.set(roomKey, room)
    }

    joinRoom(roomKey: string, socket: WebSocket): void {

        let room = this.rooms.get(roomKey)
        if (!room){
            room = new Set<WebSocket>()
            this.rooms.set(roomKey,room)
        }
        room.add(socket)
        
    }


    getOtherPeer(roomKey: string, socket: WebSocket): WebSocket | undefined {

        const room = this.rooms.get(roomKey)
        if (!room) return undefined
        const peers = [...room]

        return peers.find(peer => peer !== socket)

    
    }

}



