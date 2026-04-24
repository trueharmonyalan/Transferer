import { WebSocketServer } from "ws";
export const wss = new WebSocketServer({ port: 9011 });
console.log(wss);
wss.on("connection", (socket) => {
  //               ^^^^^^ what is the type of this?\\
  //
  console.log(typeof socket);
});
