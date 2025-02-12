"use client";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { ModalProps } from "../../../types/components"; 
import { ReviewSubmissionType } from "../../../types/components"; 
import { ReviewCardPropsTypes } from "../../../types/components";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/designComponents/ui/dialog";
import { Dialog } from "@/components/designComponents/ui/dialog";
import { useToast } from "./hooks/use-toast";
import { Button } from "./ui/button"; 
import { Label } from "./ui/label"; 
import { Input } from "./ui/input";

const Modal: React.FC<ModalProps> = ({ onClose, onSubmit, currentReview }) => {
  const { toast } = useToast();
  const [name, setName] = useState(currentReview?.name || "");
  const [description, setDescription] = useState(
    currentReview?.description || ""
  );
  useEffect(() => {
    if (currentReview) {
      setName(currentReview.name);
      setDescription(currentReview.description);
    }
  }, [currentReview]);
  const handleSubmit = async () => {
    if (!name || !description) {
      alert("Name and description are required.");
      return;
    }
    const newReview: ReviewSubmissionType = { 
      name,
      description,
      date: new Date().toISOString(),
      _id: currentReview?._id,
    };
    const reviewWithAllProps: ReviewCardPropsTypes = { 
      _id: newReview._id || uuidv4(), 
      name: newReview.name,
      description: newReview.description,
      date: newReview.date,
      comment: "",
      rating: "/images/rating-star.svg", 
      correct: "/images/correct-icon.svg",
      onEdit: () => {}, 
      onRemove: async () => {}, 
    };
    try {
      await onSubmit(reviewWithAllProps); 
      toast({
        description: currentReview
          ? "Review updated successfully"
          : "Your review has been submitted successfully.",
      });
      onClose();
    } catch (error) {
      console.error("Error submitting review:", error);
      toast({
        variant: "destructive",
        description: "Failed to submit review. Please try again.",
      });
    }
  };
  return (
    <Dialog open onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-satoshiBold">
            {currentReview ? "Edit Review" : "Write a Review"}
          </DialogTitle>
          <DialogDescription className="font-satoshi">
            Please provide your name and feedback below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right font-satoshi">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e: any) => setName(e.target.value)}
              placeholder="Enter your name"
              className="col-span-3 font-satoshi"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right font-satoshi">
              Description
            </Label>
            <Input
              id="description"
              value={description}
              onChange={(e: any) => setDescription(e.target.value)}
              placeholder="Enter your review"
              className="col-span-3 font-satoshi"
              required
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="font-satoshi">
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleSubmit}
            className="font-satoshi"
          >
            {currentReview ? "Save Changes" : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
