import Footer from "../generic/Footer"
import { CustomHead } from "../generic/CustomHead"
import Header from "../generic/Header"

type Props = {
  title?: string,
  children: React.ReactNode
}

const TwoSidedLayout = ({
  title,
  children
}: Props) => {
  return (
    <div className="min-h-screen bg-white flex">
        { children }
    </div>
  ) 
}

export default TwoSidedLayout