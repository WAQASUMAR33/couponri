import CompanyList from "../../../app/user/components/CompanyList";
import Image from "next/image";
import CustomerRootLayout from "../../../app/user/layout";


export default function Home() {
  return (
    <CustomerRootLayout>
    <CompanyList/>
    </CustomerRootLayout>
    
  );
}
