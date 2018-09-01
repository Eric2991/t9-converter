// @flow

// Create Trie of Words!!

export type Node = {
  children: Map<string, Node>,
  isWord: boolean
}

const createNode = (isWord: boolean = false) : Node => ({children: new Map(), isWord})

const createEntry = (dictionary: Node, word: string) => {
  let node = dictionary
  for (let i = 0; i < word.length; i++) {
    const letter = word[i];
    let temp: ?Node = null;

    // Check for node
    if (node === undefined) break;

    if (node.children.has(letter) && (temp = node.children.get(letter))) {
      // Check if we're at the end of the word
      if (i === word.length - 1) {
        // Update the node to be marked as word
        temp.isWord = true
        node.children.set(letter, temp)
      }

      // Set the new node
      node = node.children.get(letter)
    } else {
      // Create new node
      const newNode: Node = createNode(i === word.length - 1)
      
      // Insert the new node into the list of children
      node.children.set(letter, newNode)

      // Set the new node
      node = newNode
    }
  }
}

const createDictionary = (): Promise<Node> => {
  const readline = require('readline');
  const fs = require('fs');

  const rl = readline.createInterface({
    input: fs.createReadStream('dist/api/lib/dictionary.txt')
  });

  const dictionary = createNode()

  return new Promise((resolve, reject) => {
    rl.on('line', (word: string) => {
      createEntry(dictionary, word)
    });

    rl.on('close', () => {
      resolve(dictionary)
    })
  })
}

const dictionaryPromise = createDictionary()

module.exports = {dictionaryPromise}