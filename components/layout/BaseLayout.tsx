import Footer from "../generic/Footer"
import { CustomHead } from "../generic/CustomHead"
import Header from "../generic/Header"

type Props = {
  title?: string,
  children: React.ReactNode
}

const BaseLayout = ({
  title,
  children
}: Props) => {
  return (
    <div className="min-h-screen transition-colors text-gray-900 bg-primary-600">
      <CustomHead title={title} />
      <Header />
        { children }
      <Footer />
    </div>
  ) 
}

export default BaseLayout