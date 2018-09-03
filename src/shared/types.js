export type ConverterState = {
  loading: boolean,
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

export type Action = AsyncRequestAction | AsyncResponseAction

export type NumberPadRowEntry = {
  number: number,
  subtext?: string
}
export type NumberPadRow = Array<NumberPadRowEntry>
export type NumberPadData = {
  rows: Array<NumberPadRow>
}
