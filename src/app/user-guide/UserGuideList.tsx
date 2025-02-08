import React from "react";
import { MdArrowOutward } from "react-icons/md";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/designComponents/ui/breadcrumb";
import Link from "next/link";
import { UserGuideListProps } from "../../../types/components";
const UserGuideList: React.FC<UserGuideListProps> = ({
  guides,
  onGuideClick,
}) => {
  return (
    <>
      <Breadcrumb className="ml-[90px] mt-[-20px]">
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
      <div className="user-guide-list">
        {" "}
        <h1 className="text-center text-3xl font-bold tracking-wide font-clash  mb-6 text-darkPrimary">
          User Guides
        </h1>
        <div className="flex justify-center w-full">
          <ul className="flex flex-col justify-center gap-4 w-full max-w-md">
            {guides &&
              guides.map((guide) => (
                <div
                  className="guide-item flex justify-between items-center px-6 py-3 text-darkPrimary bg-bgLightGrayColor bg-opacity-20 hover:bg-opacity-30 cursor-pointer transition-all duration-200 ease-in-out"
                  key={guide.slug.current}
                  onClick={() => onGuideClick(guide)}
                >
                  <li className="text-gray-800 font-medium font-satoshi">
                    {guide.title}
                  </li>
                  <MdArrowOutward className="h-5 w-5 text-black/70" />
                </div>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default UserGuideList;
