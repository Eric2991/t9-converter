// @flow
import type { Node } from './dictionary_creator'

const dictLib = require('./dictionary_creator')

const { dictionaryPromise } = dictLib

type QueueItem = [Node, string]
class Queue {
  data: Array<QueueItem>

  constructor() {
    this.data = []
  }

  isEmpty(): boolean {
    return !this.data.length
  }

  push(item: QueueItem) {
    this.data.unshift(item)
  }

  pop(): QueueItem {
    return this.data.pop()
  }

  size(): number {
    return this.data.length
  }
}

const createT9Map = (): Map<number, Array<string>> => {
  const result = new Map()

  result.set(2, ['a', 'b', 'c'])
  result.set(3, ['d', 'e', 'f'])
  result.set(4, ['g', 'h', 'i'])
  result.set(5, ['j', 'k', 'l'])
  result.set(6, ['m', 'n', 'o'])
  result.set(7, ['p', 'q', 'r', 's'])
  result.set(8, ['t', 'u', 'v'])
  result.set(9, ['w', 'x', 'y', 'z'])

  return result
}

const T9_MAP: Map<number, Array<string>> = createT9Map()

async function retrieveWords(input: string): Promise<Array<string>> {
  const result: Array<string> = []
  const queue: Queue = new Queue()

  await dictionaryPromise.then((dictionary: Node) => {
    queue.push([dictionary, ''])

    for (let i = 0; !queue.isEmpty() && i < input.length; i++) {
      const number = parseInt(input[i], 10)
      const letters: Array<string> = T9_MAP.get(number) || []

      const queueSize = queue.size()
      for (let j = 0; j < queueSize; j++) {
        const curr: QueueItem = queue.pop()
        const currNode = curr[0]
        const currStr = curr[1]

        for (let letterIdx = 0; letterIdx < letters.length; letterIdx++) {
          const letterIter = letters[letterIdx]
          const childNode = currNode.children.get(letterIter)

          if (childNode) {
            const newItem: QueueItem = [childNode, currStr + letterIter]

            queue.push(newItem)
          }
        }
      }
    }
  })

  while (!queue.isEmpty()) {
    const curr: QueueItem = queue.pop()
    const node: Node = curr[0]
    const word: string = curr[1]

    if (node.isWord) result.push(word)
  }

  return result
}

module.exports = { retrieveWords }
