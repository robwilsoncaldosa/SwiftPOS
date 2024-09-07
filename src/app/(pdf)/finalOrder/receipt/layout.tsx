import { PropsWithChildren, Suspense } from "react"

const layout = ({children}:PropsWithChildren) => {
  return (
   <Suspense fallback={
        <div>
            Loading...
        </div>
    }>
    {children}
   </Suspense>
  )
}

export default layout