import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import companyLogo from "../../assets/images/company-logo.png";

// Footer links data
const footerLinks = [
  {
    title: "Shop",
    links: ["Blog", "Product", "Booking"],
  },
  {
    title: "Legal",
    links: ["Terms of Service", "Privacy Policy", "Cookies Policy"],
  },
  {
    title: "Service",
    links: ["Sent with Courier", "Drive Thru", "In Place"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#2B2B2B]">
      <div className="container mx-auto px-4 flex justify-between items-center pt-12 pb-[10px]">
        <div className="flex flex-col justify-center items-center">
          <img src={companyLogo} alt="" className="w-[124px]" />
          <p className="text-white">homie@coffee.co.id</p>
          <p className="text-white">(+62) 895-4055-38475</p>
        </div>
        <div className="flex gap-[26px]">
          {footerLinks.map((section, index) => (
            <ul key={index} className="text-white text-base">
              <li className="font-semibold pb-[14px]">{section.title}</li>
              {section.links.map((link, idx) => (
                <li key={idx} className="font-light pb-2 cursor-pointer">
                  {link}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <div className="flex flex-col container mx-auto px-4 pb-5 gap-6">
        <hr />
        <div className="flex justify-between items-center">
          <p className="text-base font-light text-white">
            © 2024 Homie Coffee House. All Rights Reserved.
          </p>
          <div className="flex gap-[18px] text-white">
            <FaFacebook size={20} className="cursor-pointer" />
            <FaTiktok size={20} />
            <FaInstagram size={20} />
          </div>
        </div>
      </div>
    </footer>
  );
}
