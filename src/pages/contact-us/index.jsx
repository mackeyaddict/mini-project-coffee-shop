import emailjs from "@emailjs/browser";
import { useRef } from "react";
import { toast } from "react-toastify";
import Button from "../../components/button";

export default function ContactUs() {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_zigso8u", "template_u9fhqc9", form.current, {
        publicKey: "22LugzGN-11pkOo3x",
      })
      .then(
        (result) => {
          console.log(result.text);
          toast.success("Message has been sended");
        },
        (error) => {
          console.error(error.text);
          toast.error("Message has not been sended");
        }
      );
  };

  return (
    <section className="h-screen flex flex-col justify-center items-center">
      <div className="container mx-auto px-4">
        <h1 className="text-6xl font-semibold text-center mb-8 text-gray-800">
          Let&rsquo;s Get in Touch
        </h1>
        <form onSubmit={sendEmail} className="flex flex-col justify-center">
          <div className="mb-4">
            <input
              type="text"
              name="user_name"
              placeholder="Enter your name"
              className="input"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="user_email"
              placeholder="Enter your email"
              className="input"
            />
          </div>
          <div className="mb-4">
            <textarea
              name="message"
              rows="4"
              placeholder="Enter your message"
              className="input"
            ></textarea>
          </div>
          <div className="self-start">
            <Button variant="secondary" size="md" type="submit">
              Send Message
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
