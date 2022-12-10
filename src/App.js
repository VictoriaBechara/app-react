import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/home/Home";
import Contact from "./components/pages/contact/Contact";
import Company from "./components/pages/company/Company";
import NewProject from "./components/pages/newproject/NewProject";
import Projects from "./components/pages/project/Projects";
import Container from "./components/layout/Container";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Container customClass="min_height">
        <Routes>
          <Route exact="true" path="/" element={<Home />}></Route>
          <Route exact="true" path="/projects" element={<Projects />}></Route>
          <Route exact="true" path="/contact" element={<Contact />}></Route>
          <Route exact="true" path="/company" element={<Company />}></Route>
          <Route
            exact="true"
            path="/newproject"
            element={<NewProject />}
          ></Route>
        </Routes>
      </Container>
      <Footer/>
    </Router>
  );
}

export default App;
