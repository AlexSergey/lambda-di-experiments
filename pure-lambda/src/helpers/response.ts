import { APIGatewayProxyResult } from 'aws-lambda';

const stringify = (data: unknown) => {
  return JSON.stringify({
    message: typeof data !== 'undefined' ? data : '',
  })
}

export const ok = (data?: unknown): APIGatewayProxyResult => {
  return {
    statusCode: 200,
    body: stringify(data)
  }
}

export const fail = (errorMessage?: string, code = 400): APIGatewayProxyResult => {
  return {
    statusCode: code,
    body: stringify(errorMessage)
  }
}
