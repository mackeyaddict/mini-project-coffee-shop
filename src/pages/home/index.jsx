import HomeBanner from "./home-banner";
import HomeComments from "./home-comments";
import HomeCompanyDesc from "./home-company-desc";
import HomeNewsletter from "./home-newsletter";
import HomeProducts from "./home-products";
import HomeRequestPrivate from "./home-request-private";


export default function Home() {
  return (
    <>
      <HomeBanner/>
      <HomeCompanyDesc/>
      <HomeProducts/>
      <HomeRequestPrivate/>
      <HomeComments/>
      <HomeNewsletter/>
    </>
  )
}