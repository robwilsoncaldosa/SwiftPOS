import { PropsWithChildren } from "react"


const Layout = ({children}:PropsWithChildren) => {
  return (
    <main className="w-screen h-screen">
        {children}
    </main>
  )
}

export default Layout