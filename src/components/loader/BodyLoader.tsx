import Image from "next/image";
import Loader from "@/assets/preloader.gif";

const BodyLoader = () => {
  return (
    <div className="body-lader">
      <Image
        width={100}
        height={100}
        alt="loader"
        src={Loader}
      />
    </div>
  )
}

export default BodyLoader;