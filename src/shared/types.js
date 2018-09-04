export type ConverterState = {
  loading: boolean,
  query: string,
  results: Array<string>
}

type ConversionRequestPayload = {
  query: string
}

type ConversionResponsePayload = {
  results: Array<string>
}

export type AsyncRequestAction = {
  type: 'ASYNC_REQUEST',
  payload: ConversionRequestPayload
}

export type AsyncResponseAction = {
  type: 'ASYNC_RESPONSE',
  payload: ConversionResponsePayload
}

export type GenericRequestAction = {
  type: 'SET_QUERY',
  payload: ConversionRequestPayload
}

export type Action =
  | AsyncRequestAction
  | AsyncResponseAction
  | GenericRequestAction

export type NumberPadRowEntry = {
  number: number, // The number to be displayed in the entry
  subtext?: string // The subtext to be placed below the number. Can be textual or HTML Char code
}
export type NumberPadRow = Array<NumberPadRowEntry>
export type NumberPadData = {
  rows: Array<NumberPadRow>
}
