import { Link } from "react-router-dom";
import chatBotImg from "../../assets/images/chatbot-img.png";
import Button from "../../components/button";
import { PAGE_URL } from "../../utils/constant";

export default function HomeChatbot() {
  return (
    <section className="pb-12 px-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="w-[386px] hidden md:block">
          <img src={chatBotImg} alt="Chatbot Img" />
        </div>
        <div className="flex flex-col gap-3 items-center md:items-end"> 
          <h1 className="text-5xl font-semibold text-center md:text-end">
            Wanna know anything <br /> about coffee?
          </h1>
          <div className="max-w-xs">
            <Link to={PAGE_URL.CHATBOT}>            
              <Button variant="secondary" size="xl">
                Ask Roastmaster
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
