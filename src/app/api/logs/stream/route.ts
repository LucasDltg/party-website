import { NextRequest } from 'next/server'
import logger, { LogEntry } from '@/lib/logger'

export async function GET(req: NextRequest) {
  const { readable, writable } = new TransformStream()
  const writer = writable.getWriter()

  writer.write(encode(`retry: 1000\n\n`))

  const logs = await logger.getLastLogs()
  logs.forEach((log) => writer.write(encodeLog(log)))

  const unsubscribe = logger.onLog((log) => {
    writer.write(encodeLog(log))
  })

  req.signal.addEventListener('abort', () => {
    unsubscribe()
    writer.close()
  })

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}

function encodeLog(log: LogEntry) {
  return encode(`data: ${JSON.stringify(log)}\n\n`)
}

function encode(str: string) {
  return new TextEncoder().encode(str)
}
