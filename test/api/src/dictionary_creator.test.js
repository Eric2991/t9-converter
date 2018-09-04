import type { Node } from 'api/src/dictionary_creator'

const assert = require('assert')
const dictionaryCreator = require('api/src/dictionary_creator')

const { createDictionary, createEntry, createNode } = dictionaryCreator

const createMockDictionary = (words: Array<string>): Promise<Node> => {
  const dictionary: Node = createNode()

  words.forEach((word: string) => {
    createEntry(dictionary, word)
  })

  return new Promise(resolve => resolve(dictionary))
}

describe('DictionaryCreator', () => {
  describe('createNode', () => {
    it('should create a new Node with isWord set to false', () => {
      const node: Node = {
        children: new Map(),
        isWord: false
      }

      assert.deepEqual(createNode(), node)
    })

    it('should create a new Node with isWord set to true', () => {
      const node: Node = {
        children: new Map(),
        isWord: true
      }

      assert.deepEqual(createNode(true), node)
    })
  })

  describe('createEntry', () => {
    it('should create a new dictionary entry successfully', () => {
      const dictionary: Node = createNode()
      createEntry(dictionary, 'h')

      const expected: Node = createNode()
      expected.children.set('h', createNode(true))

      assert.deepEqual(dictionary, expected)
    })

    it('should create a multi-letter dictionary entry successfully', () => {
      const dictionary: Node = createNode()
      createEntry(dictionary, 'hi')

      const expected = createNode()
      const nestedExpected = createNode()

      nestedExpected.children.set('i', createNode(true))
      expected.children.set('h', nestedExpected)

      assert.deepEqual(dictionary, expected)
    })
  })

  describe('createDictionary', () => {
    it('should create a dictionary successfully', async () => {
      const pathToTestDictionary = 'assets/test_dictionary.txt'
      const dictionary: Promise<Node> = await createDictionary(
        pathToTestDictionary
      )

      const testWords = ['apple', 'apricot', 'pear', 'zucchini']
      const expectedDictionary: Promise<Node> = await createMockDictionary(
        testWords
      )

      assert.deepEqual(dictionary, expectedDictionary)
    })
  })
})
