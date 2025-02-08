"use client";
import { useEffect, useState } from 'react';
import FAQSection from './FAQSection';
import SearchBar from './Searchbar';
import { client } from '@/sanity/lib/client';
import {   Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator, } from '@/components/designComponents/ui/breadcrumb';
import Link from "next/link";
const FAQPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [faqs, setFaqs] = useState([]);
  useEffect(() => {
    const fetchFAQs = async () => {
      const data = await client.fetch(`*[_type == "faq"]{
        question,
        answer
      }`);
      setFaqs(data);
    };
    fetchFAQs();
  }, []);
  return (
    <div>
      <div className="flex"> 
        <div className="absolute top-[130px] left-[100px]"> 
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Link href="/helpCenter" className="font-satoshi text-darkPrimary">
                    Help Center
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  <Link href="/faq" className="font-satoshi text-darkPrimary">
                   FAQs
                  </Link>
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div> 
      <div className="flex justify-center items-center flex-col gap-y-[20px] w-full mt-28 md:mt-32 lg:mt-32">
        <h1 className="font-clash text-center w-full text-[23px] sm:text-[27px] xxl:text-[38px] lg:text-[32px] text-darkPrimary  font-extrabold tracking-wider ">
          Frequently Asked Questions
        </h1>
        <SearchBar onSearch={setSearchQuery} />
        <FAQSection faqs={faqs} query={searchQuery} />
      </div>
    </div>
  );
};

export default FAQPage;