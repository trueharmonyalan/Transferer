import { expect, it, describe, beforeEach, afterEach } from '@jest/globals'
import { RoomRegistry } from "@websocket/src/roomRegistery/roomRegister"
import { WebSocket } from "@shared/shared"

describe("getOtherPeer test cases", () => {
  let registry: any
  let sockets: WebSocket[] = []

  beforeEach(() => {
    registry = new RoomRegistry()
    sockets = []
  })

  afterEach(() => {
    sockets.forEach(s => {
      s.on('error', () => {}) // ignore errors during cleanup
      s.close()
    })
  })

  it("returns the other peer", () => {
    const socket1 = new WebSocket("ws://localhost:9010")
    const socket2 = new WebSocket("ws://localhost:9010")
    sockets.push(socket1, socket2)

    registry.joinRoom("room1", socket1)
    registry.joinRoom("room1", socket2)

    expect(registry.getOtherPeer("room1", socket1)).toBe(socket2)
  })

  it("returns undefined if room does not exist", () => {
    const socket1 = new WebSocket("ws://localhost:9010")
    sockets.push(socket1)
    expect(registry.getOtherPeer("room1", socket1)).toBeUndefined()
  })
})
