import requestPrivateBg from "../../assets/images/request-private-bg.jpg";
import Button from "../../components/button";

export default function HomeRequestPrivate() {
  return (
    <section className="pb-12 px-4">
      <div
        className="container mx-auto bg-cover bg-center rounded-[30px] relative"
        style={{ backgroundImage: `url(${requestPrivateBg})` }}
      >
        <div className="flex flex-col py-[50px] px-[58px]">
          <h3 className="text-4xl font-semibold pb-[10px]">
            Request an order for your <br /> private party or event?
          </h3>
          <p className="text-base font-light pb-5">
            We are open to ordering party events such as <br /> weddings,
            celebrations, or other events
          </p>
          <div className="max-w-[146px]">
            <Button variant="primary" size="md">
              Booking Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
