import { NextResponse } from 'next/server'
import logger, { LogEntry } from '@/lib/logger'
import { withAuth } from '@/lib/firebase/withAuth'

// export async function GET(req: NextRequest) {
export const GET = withAuth(async (req) => {
  const { readable, writable } = new TransformStream()
  const writer = writable.getWriter()

  writer.write(encode(`retry: 1000\n\n`))

  const unsubscribe = logger.onLog((log) => {
    writer.write(encodeLog(log))
  })

  req.signal.addEventListener('abort', () => {
    unsubscribe()
    writer.close()
  })

  return new NextResponse(readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
})

function encodeLog(log: LogEntry) {
  return encode(`data: ${JSON.stringify(log)}\n\n`)
}

function encode(str: string) {
  return new TextEncoder().encode(str)
}
