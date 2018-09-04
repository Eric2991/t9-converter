import type { Node } from 'api/src/dictionary_creator'

const assert = require('assert')
const dictLib = require('api/src/dictionary_creator')
const t9Lib = require('api/src/t9_conversion')

const { createDictionary } = dictLib
const { retrieveWordsInternal } = t9Lib

const dictionary: Promise<Node> = createDictionary('assets/dictionary.txt')

describe('T9 Conversion', () => {
  describe('retrieveWordsInternal', () => {
    it('should retrieve all words from valid string', async () => {
      const input = '2255'
      const expectedOutput = ['balk', 'ball', 'calk', 'call']
      const output: Array<string> = await retrieveWordsInternal(
        input,
        dictionary
      )

      assert.deepEqual(output, expectedOutput)
    })
    it('should return an empty array on invalid string', async () => {
      const input = '1234'
      const expectedOutput = []
      const output: Array<string> = await retrieveWordsInternal(
        input,
        dictionary
      )

      assert.deepEqual(output, expectedOutput)
    })
  })
})
