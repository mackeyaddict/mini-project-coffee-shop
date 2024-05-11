export default function CommentCard({ comment }) {
  return (
    <div className="w-[254px] h-[352px] rounded-[20px] border-[1px] border-[#D9D9D9] relative">
      <p className="pt-[30px] px-4 text-xl line-clamp-[7]">{comment.text}</p>
      <div className="absolute gap-4 bottom-0 flex flex-col rounded-b-[20px] bg-white px-[18px]">
        <button className="bg-transparent z-30 text-xs py-1 self-start">
          Read More
        </button>
        <div className="flex gap-3 pb-[25px]">
          <div className="bg-[#818181] rounded-full w-[45px]">
            <img
              src={comment.image}
              alt={comment.author}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div>
            <p className="text-base">{comment.author}</p>
            <p className="italic text-[#818181] font-light text-sm">
              {comment.occupation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
