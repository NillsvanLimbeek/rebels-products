import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/wishlist/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/wishlist/$id"!</div>
}
