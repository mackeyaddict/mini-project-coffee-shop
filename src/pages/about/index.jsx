import AboutUsImg from "../../assets/images/about-us-img.jpg";

export default function About() {
  return (
    <section className="py-32">
      <div className="container mx-auto flex flex-col md:flex-row justify-center items-center gap-8 md:gap-40 px-4 md:px-8">
        <div className="shadow-2xl rounded-lg overflow-hidden">
          <img src={AboutUsImg} alt="about us" className="w-full" />
        </div>
        <div className="flex flex-col justify-center md:justify-start gap-6">
          <h1 className="font-semibold text-4xl md:text-6xl text-center md:text-left text-gray-800">About Us</h1>
          <h3 className="text-xl md:text-2xl text-center md:text-left text-gray-700">Crafting Coffee Stories with Passion</h3>
          <p className="text-sm md:text-base text-center md:text-left text-gray-600 leading-relaxed">At <b className="text-gray-800">Homie Coffee House</b>, coffee isn’t just a beverage; it’s a journey of discovery and passion. With roots deeply embedded in the artistry of coffee culture, we are dedicated to sourcing the finest beans, roasting them to perfection, and brewing unforgettable experiences, one cup at a time. Our commitment to quality and craftsmanship extends beyond the coffee itself; it’s about the people, the stories, and the communities we serve. Join us as we embark on this flavorful adventure, fueled by a love for coffee and a desire to share its magic with the world.</p>
        </div>
      </div>
    </section>
  );
}
