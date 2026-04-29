import { WebSocketServer } from "@shared/shared";
import {server} from "../httpServer"
import { Dispatcher } from "./src/dispatcher/dispatcher";
import { CreateHandler, JoinHandler, OfferHandler, AnswerHandler, IceCandidateHandler } from "./src/handlers/handler";
import { RoomRegistry } from "./src/roomRegistery/roomRegister";

const registery = new RoomRegistry()
const dispatcher = new Dispatcher()

dispatcher.register("create",new CreateHandler(registery))
dispatcher.register("join",new JoinHandler(registery))
dispatcher.register("offer",new OfferHandler(registery))
dispatcher.register("answer",new AnswerHandler(registery))
dispatcher.register("ice-candidate",new IceCandidateHandler(registery))

const wss = new WebSocketServer({server})


wss.on("connection", (socket) => {
  socket.on("message",(raw) => {
    dispatcher.dispatch(raw.toString(), socket )
  })

  socket.on("close", () => {
    console.log("client disconnected")
  })

});
