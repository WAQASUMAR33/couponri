import CustomerRootLayout from "../../user/layout";
import { TfiFaceSad } from "react-icons/tfi";
export default function ErrorPage(){
    return(
        <>
        <CustomerRootLayout>
        <div className="w-full h-[60vh] flex justify-center items-center">
            <h1 className="flex flex-col justify-center items-center text-6xl font-[800]">
                <span className="text-blue-800 text-8xl">
                    <TfiFaceSad/>
                </span>
                <span className="text-red-500">
                    404 Error
                </span>
                <span className="text-yellow-500">
               Invalid Url.
                </span>
            </h1>
        </div>
        </CustomerRootLayout>
        </>
    )
}