export default function Store() {
  return (
    <section className="py-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center">
            <h1 className="text-6xl font-semibold text-center mb-8 text-gray-800">
              Our Location
            </h1>
            <p className="text-xl text-gray-700 mb-4 text-center">
              <span className="font-semibold">Homie Coffee House</span> <br />
              Jl. Sirojul Munir, RT.003/RW.001
              <br />
              Jatisari, Kec. Jatiasih <br />
              Kota Bekasi, Jawa Barat 17426
              <br />
            </p>
            <p className="text-lg text-gray-600 text-center">Opening Hours:</p>
            <ul className="text-gray-600 text-center list-none">
              <li>Monday - Saturday: 7:00pm- 1:00am</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
          <div className=" border border-black border-spacing-5">
            <iframe
              className="p-5"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.5159886694432!2d106.95553187603873!3d-6.327115061912657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6993c830c9b099%3A0xbe17845193ef648e!2sHOMIE%20COFFEE%20HOUSE!5e0!3m2!1sid!2sid!4v1714590338953!5m2!1sid!2sid"
              width="100%"
              height="600"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Homie Coffee House Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
