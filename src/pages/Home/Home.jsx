import LayoutPage from "../../shared/LayoutPage";
import TitlePage from "../../shared/TitlePage";
import Carousel from "../../shared/Carousel";

export default function Home() {
  return (
    <LayoutPage>
      <TitlePage title="Les conférences du moment" />
      <p>Il y a t-il une conférence qui vous intéresse ?</p>
      <div className="my-10">
        <Carousel />
      </div>
    </LayoutPage>
  );
}
