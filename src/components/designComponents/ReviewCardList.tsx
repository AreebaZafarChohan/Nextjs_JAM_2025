"use client";
import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import Modal from "../designComponents/Modal";
import { v4 as uuidv4 } from "uuid";
import { ReviewCardPropsTypes } from "../../../types/components";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/designComponents/ui/dropdown-menu";
import { Button } from "./ui/button";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { CiEdit } from "react-icons/ci";
import { IoMdTrash } from "react-icons/io";
const ReviewsCard: React.FC<ReviewCardPropsTypes> = ({
  _id,
  name,
  comment,
  date,
  correct,
  onEdit,
  onRemove,
}) => {
  return (
    <div className="flex justify-center items-center sm:w-full mx-auto sm:px-5 w-[280px] xl:w-[570px] xxl:w-[610px]">
      <div className="md:w-[610px] xxl:w-[610px] xl:w-[570px] lg:w-[480px] md:h-[241.58px] sm:w-full h-[244px] p-[24px] rounded-[20px] border-black/10 border-[1px] md:py-[28px] md:px-[32px] ">
        <div className="md:h-[139.58px] xxl:w-[560px] xl:w-[520px] lg:w-[400px] flex justify-between sm:w-full w-[280px]">
          <div className="md:w-[522px] xxl:w-[560px] xl:w-[500px] lg:w-[400px] md:h-[139.58px] w-[300px] sm:w-full h-[176px] flex flex-col gap-[15px]">
            <Image
              src="/images/rating-star.svg"
              alt="rating"
              height={22.58}
              width={127}
              className="h-[22.58px] md:w-[127px] w-[107px]"
            />
            <div className="md:w-[522px] lg:w-[480px] md:h-[102px] flex flex-col gap-[12px]">
              <div className="md:w-[146px] md:h-[24px] flex gap-[4px] items-center whitespace-nowrap">
                <h1 className="md:text-[20px] text-[16px] font-bold text-black font-satoshiBold">
                  {name}
                </h1>
                <Image
                  src={correct}
                  alt="/images/correct-icon.svg"
                  height={24}
                  width={24}
                  className="md:h-[24px] md:w-[24px] h-[19px] w-[19px]"
                />
              </div>
              <p className="md:w-[522px] text-left md:h-[66px] lg:w-[400px] w-[250px] sm:w-full font-satoshi font-normal text-[12px] md:text-[16px] text-black/60">
                {comment}
              </p>
            </div>
          </div>

          {/* Dropdown Menu for Edit & Remove Actions */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="default"
                className="bg-white shadow-white hover:bg-white ml-[-30px]"
              >
                <PiDotsThreeOutlineFill className="h-[30px] w-[30px] text-black/80 " />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel className="font-satoshi text-buttonBlue">
                Actions
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              {/* Edit Button */}
              <DropdownMenuItem onClick={onEdit}>
                <div className="flex justify-between items-center w-full">
                  <span className="flex items-center gap-x-2 font-satoshi text-buttonBlue">
                    Edit
                  </span>
                  <CiEdit className="text-black/45 h-[20px] w-[20px]" />
                </div>
              </DropdownMenuItem>

              {/* Remove Button */}
              <DropdownMenuItem onClick={() => onRemove(_id)}>
                <div className="flex justify-between items-center w-full">
                  <span className="flex items-center gap-x-2 font-satoshi text-red-500">
                    Remove
                  </span>
                  <IoMdTrash className="text-red-500 h-[20px] w-[20px]" />
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <p className="font-satoshi text-left font-medium md:text-[16px] text-[12px] text-black/60 relative md:top-[25px]">
          Posted on {date}
        </p>
      </div>
    </div>
  );
};

const ReviewCardList = () => {
  const [reviewCardsData, setReviewCardsData] = useState<
    ReviewCardPropsTypes[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [currentReview, setCurrentReview] =
    useState<ReviewCardPropsTypes | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviews = await client.fetch(
          `*[_type == "customerReviews"]{
           name,
    comment,
    _id,
    date
          }`
        );
        const typedReviews = reviews as ReviewCardPropsTypes[];
        setReviewCardsData(typedReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, []);
  const handleAddReview = async (newReview: {
    name: string;
    comment: string;
    date: string;
  }) => {
    const reviewWithId: ReviewCardPropsTypes = {
      _id: uuidv4(),
      name: newReview.name,
      comment: newReview.comment,
      description: "",
      date: newReview.date,
      rating: "/images/rating-star.svg",
      correct: "/images/correct-icon.svg",
      onEdit: () => {},
      onRemove: async () => {},
    };
    try {
      await client.create({
        _type: "customerReviews",
        ...newReview,
      });
      setReviewCardsData((prevReviews) => [reviewWithId, ...prevReviews]);
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };
  const handleEditReview = async (updatedReview: ReviewCardPropsTypes) => {
    if (!currentReview) return;
    try {
      await client
        .patch(currentReview._id)
        .set({
          name: updatedReview.name,
          comment: updatedReview.comment,
          date: updatedReview.date,
        })
        .commit();
      setReviewCardsData((prevReviews) =>
        prevReviews.map((review) =>
          review._id === currentReview._id ? updatedReview : review
        )
      );
      setIsModalOpen(false);
      setIsEditModal(false);
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };
  const handleRemoveReview = async (id: string) => {
    try {
      await client.delete(id);
      setReviewCardsData((prevReviews) =>
        prevReviews.filter((review) => review._id !== id)
      );
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px] xl:gap-y-[20px] justify-items-center h-[800px] overflow-y-auto overflow-x-visible">
        {reviewCardsData.length > 0 ? (
          reviewCardsData.map((item) => (
            <ReviewsCard
              key={item._id}
              _id={item._id}
              name={item.name}
              description={item.description}
              comment={item.comment}
              date={new Date(item.date).toLocaleDateString()}
              rating={item.rating || "/images/rating-star.svg"}
              correct={item.correct || "/images/correct-icon.svg"}
              onEdit={() => {
                setCurrentReview(item);
                setIsEditModal(true);
                setIsModalOpen(true);
              }}
              onRemove={async (id) => await handleRemoveReview(id)}
            />
          ))
        ) : (
          <div className="font-satoshi text-buttonBlue">
            No reviews yet. Be the first to leave a review!
          </div>
        )}
      </div>

      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          onSubmit={isEditModal ? handleEditReview : handleAddReview}
          currentReview={currentReview}
        />
      )}
    </>
  );
};

export default ReviewCardList;
