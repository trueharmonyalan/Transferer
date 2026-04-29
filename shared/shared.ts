// types of env
export type ProjectENV = {
  PORT: string;
};

// types and interfaces for key related logic.
export type RoomKeyResponse = {
  key: string;
  status?: true | false;
  error?: string | undefined;
};

export interface Key {
  value: number;
}

export interface KeyGenerator {
  getRandomBytes(length: number): Uint8Array;
}

export interface keyValidator {
  dbKeyCheck(key: string): Promise<boolean>;
}

export interface logger {
  logs(message: string): string;
}

// Websocket and WebRTC types and its interfaces

// export { WebSocket, WebSocketServer } from "ws"
import { WebSocket as WsWebSocket, WebSocketServer as WsWebSocketServer } from "ws";

export { WsWebSocket as WebSocket, WsWebSocketServer as WebSocketServer };


export type MessageType =
  | "join"
  | "offer"
  | "answer"
  | "ice-candidate"
  | "create";

export interface JoinInterface {
  type: "join";
  payload: { roomKey: string };
}

export interface OfferInterface {
  type: "offer";
  payload: { roomKey: string; sdp: string };
}

export interface AnswerInterface {
  type: "answer";
  payload: { roomKey: string; sdp: string };
}

interface IceCandidate {
  candidate: string;
  sdpMid: string;
  sdpMLineIndex: number;
}

export interface IceCandidateInterface {
  type: "ice-candidate";
  payload: { roomKey: string; icecandidate: IceCandidate };
}

export interface CreateInterface {
  type: "create";
  payload: { roomKey: string };
}

export interface MessageHandler<T> {
  handle(message: T, socket: WsWebSocket): void;
}




export type IncomingMessage =
  | JoinInterface
  | OfferInterface
  | AnswerInterface
  | IceCandidateInterface
  | CreateInterface;


export interface IRoomRegistry {
  createRoom(roomKey: string, socket: WsWebSocket): void
  joinRoom(roomKey: string, socket: WsWebSocket): void
  getOtherPeer(roomKey: string, socket: WsWebSocket): WsWebSocket | undefined
}


export interface IDispatcher {
  register(type: MessageType, handler: MessageHandler<IncomingMessage>): void
  dispatch(raw: string, socket: WsWebSocket): void
}
