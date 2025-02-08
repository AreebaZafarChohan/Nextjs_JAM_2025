import Link from "next/link";
import { FAQSectionProps } from "../../../types/components"; 
const FAQSection: React.FC<FAQSectionProps> = ({ faqs = [], query = "" }) => {
  const filteredFaqs = faqs.filter(
    (faq) => faq?.question?.toLowerCase().includes(query?.toLowerCase() || "")
  );
  return (
    <>
      <div className="flex flex-col divide-y sm:px-8 lg:px-12 px-5 xl:px-32 divide-gray-400 w-full">
        {filteredFaqs.map((faq, index) => (
          <details
            key={index}
            className="py-2 outline-none text-left cursor-pointer focus:underline font-satoshi text-[14px] xxl:text-[16px] md:text-[16px] text-darkPrimary"
          >
            <summary className="py-2 outline-none text-left cursor-pointer focus:underline font-satoshi text-[14px] xxl:text-[16px] md:text-[16px]">
              {faq.question}
            </summary>
            <div className="px-4 pb-4">
              <p className="font-satoshi text-[14px] md:text-[16px] text-left">
                {faq.answer}
              </p>
            </div>
          </details>
        ))}
      </div>
      <div className="mt-5 flex justify-center items-center w-full mx-auto py-9">
        <p className="font-satoshi text-darkPrimary  font-normal text-[14px] text-center">
          Have more questions?
        </p>
        <Link href="/contact" className="text-blue-500 underline ml-2 font-clash">
          Contact Us
        </Link>
      </div>
    </>
  );
};

export default FAQSection;
