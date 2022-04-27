import React from "react";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import DummyScreen from "./screens/DummyScreen";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import CollegeScreen from "./screens/CollegeScreen";
import ProgramScreen from "./screens/ProgramScreen";
import AdminScreen from "./screens/AdminScreen";
import NotAuthorized from "./screens/NotAuthorized";

export default function App() {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path="/" element={<HomeScreen />} />
				<Route path="/dummy" element={<DummyScreen />} />
				<Route path="/admin" element={<AdminScreen />} />
				<Route path="/college/:college" element={<CollegeScreen />} />
				<Route path="/college/:college/:program" element={<ProgramScreen />} />
				<Route path="/NotAuthorized" element={<NotAuthorized />} />
			</Routes>
			<Footer />
		</Router>
	);
}
