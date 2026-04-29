import { WebSocket } from "@shared/shared";


const peerA = new WebSocket("ws://localhost:9010")
const peerB = new WebSocket("ws://localhost:9010")


const sampleData = {
  type: "create",
  payload: {roomKey: "934ut459"}
}


peerA.on("open", () => {
  console.log("Peer A is now have a socket.")
  peerA.send(JSON.stringify(sampleData))

})


peerA.on("message",(rawMsg) => {
  console.log("message comes to A: ",rawMsg.toString())

})

peerA.on("error", (err) => {
  console.log("this is the error: ",err)
})





const sampleData2 = {
  type: "join",
  payload: {roomKey: "934ut459"}
}


peerB.on("open",() => {

  setTimeout(() => {
    console.log("Peer B is now sending the join request...");
    peerB.send(JSON.stringify(sampleData2));
  }, 500);

})

peerB.on("message",(raw) => {
  console.log("peer B msg: ", raw.toString())
})

peerB.on("error",(err) => {
  console.log(err)
})