import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import CommentCard from "../../components/cards/comment-card";
import { useState } from "react";

const dummyComments = [
  {
    text: "I absolutely love the cozy atmosphere of this coffee shop! The aroma of freshly brewed coffee always draws me in. Plus, their pastries are to die for!",
    author: "Emily Johnson",
    occupation: "Writer",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    text: "This coffee shop has become my go-to spot for meetings with clients. The Wi-Fi is reliable, the coffee is fantastic, and the staff is always friendly and accommodating.",
    author: "Michael Smith",
    occupation: "Business Consultant",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    text: "As a coffee aficionado, I'm always on the lookout for new and exciting blends. This coffee shop never disappoints! Their baristas really know their stuff.",
    author: "Sophia Rodriguez",
    occupation: "Barista",
    image:
      "https://plus.unsplash.com/premium_photo-1664298528358-790433ba0815?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function HomeComments() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const nextProducts = () => {
    setCurrentIndex((currentIndex + 1) % dummyComments.length);
  };

  const prevProducts = () => {
    setCurrentIndex(
      (currentIndex - 1 + dummyComments.length) % dummyComments.length
    );
  };

  const isLeftArrowActive = currentIndex !== 0;
  const isRightArrowActive = currentIndex !== dummyComments.length - 2;
  return (
    <section className="pb-12 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-semibold text-end mb-8">
          See what <br /> 
          <span className="text-[#EC8B1E]">others are saying</span>
        </h1>
        <div className="flex justify-center gap-8">
          <div className="flex place-content-end items-center">
            <FaArrowLeft
              size={24}
              onClick={prevProducts}
              className={`cursor-pointer hover:scale-110 ${
                isLeftArrowActive ? "" : "opacity-50 pointer-events-none"
              }`}
            />
          </div>
          <div className="flex flex-wrap xl:flex-nowrap justify-center gap-8">
            {dummyComments.slice(currentIndex, currentIndex + 2).map((comment, index) => (
              <CommentCard key={index} comment={comment} />
            ))}
          </div>
          <div className="flex place-content-start items-center">
            <FaArrowRight
              size={24}
              onClick={nextProducts}
              className={`cursor-pointer hover:scale-110 ${
                isRightArrowActive ? "" : "opacity-50 pointer-events-none"
              }`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
