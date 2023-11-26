import "./App.css";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
// import dayCards from "../images/weather/day";
// import nightCards from "../images/weather/night";

function App() {
  const date = new Date();
  const currentDate = date.toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const hours = date.getHours();
  const isNight = hours > 19 || hours < 6;
  const currentLocation = "Lake Charles";

  return (
    <div className="app">
      <Header date={currentDate} location={currentLocation}></Header>
      <Main isNight={isNight}></Main>
      <Footer></Footer>
    </div>
  );
}

export default App;
