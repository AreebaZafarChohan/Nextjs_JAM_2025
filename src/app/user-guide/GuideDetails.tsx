import { PortableText } from "@portabletext/react";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/designComponents/ui/breadcrumb";
import Link from "next/link";
import { GuideDetailsProps } from "../../../types/components"; 
import { TypedObject } from "@portabletext/types";

export interface Guide {
  title: string;
  content: TypedObject[]; // Change from string[] to TypedObject[]
}

const GuideDetails = ({ guide }: GuideDetailsProps) => {
  return (
    <div className="">
      <div className="">
        <Breadcrumb className="ml-[90px] mt-[-30px]">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Link href="/helpCenter" className="font-satoshi">
                  Help Center
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                <Link href="/user-guide" className="font-satoshi">
                  User Guide
                </Link>
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex justify-center items-center w-full mx-auto flex-col">
        <h1 className="text-3xl font-bold my-4 font-integralCf tracking-wider">
          {guide.title}
        </h1>
        <div className="prose max-w-none mt-3">
          <PortableText
            value={guide.content}
            components={{
              block: {
                h1: ({ children }) => (
                  <h1 className="text-4xl font-bold font-satoshiBold">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-semibold font-satoshiBold">
                    {children}
                  </h2>
                ),
                normal: ({ children }) => (
                  <p className="text-gray-700 font-satoshi">{children}</p>
                ),
              },
              list: {
                bullet: ({ children }) => (
                  <ul className="list-disc ml-6 font-satoshi">{children}</ul>
                ),
                number: ({ children }) => (
                  <ol className="list-decimal ml-6 font-satoshi">{children}</ol>
                ),
              },
              marks: {
                strong: ({ children }) => (
                  <strong className="font-bold font-satoshi">{children}</strong>
                ),
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default GuideDetails;
