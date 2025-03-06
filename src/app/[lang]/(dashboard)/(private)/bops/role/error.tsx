'use client'

export default function ErrorBoundary({ error }: { error: Error }) {
  return <div>Error fetch Role , {error.message}</div>
}
