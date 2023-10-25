import { Footer } from './Footer'
import { Header } from './Header'

interface Props {
  children: React.ReactNode
}

export const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col items-center justify-start">
      <Header />
      <div className="mt-20 flex justify-center items-center">{children}</div>
      <Footer />
    </div>
  )
}
