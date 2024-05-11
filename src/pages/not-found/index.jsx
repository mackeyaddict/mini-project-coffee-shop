import notFoundBg from "../../assets/images/not-found-bg.jpg";

export default function NotFound() {
  return (
    <section className="h-screen">
      <div
        className="h-full w-full bg-cover bg-center flex items-center justify-center relative"
        style={{ backgroundImage: `url(${notFoundBg})` }}
      >
        <div className="bg-black absolute inset-0 w-full h-full opacity-45"></div>
        <div className="container mx-auto flex flex-col text-white text-center z-20 px-4">
          <h1 className="text-6xl font-semibold mb-4">404 Page Not Found</h1>
          <p className="text-lg">
            The page you are looking for is not available.
          </p>
        </div>
      </div>
    </section>
  );
}
