import React, { useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import CollegeCard from "../components/CollegeCard";
import {
	computerStudiesPrograms,
	criminologyPrograms,
	educationPrograms,
	engineeringPrograms,
	medicinePrograms,
	nursingPrograms,
} from "../dummyData/programs";

import Logo from "../images/ccis_logo.png";
import Accis from "../images/Accis.jpg";

import Medicine1 from "../images/medicine/Medicine1.jpg";
import Medicine2 from "../images/medicine/Medicine2.png";
import DMD from "../images/medicine/DMD.jpg";
import MD from "../images/medicine/MD.png";
import MScCM from "../images/medicine/MScCM.jpg";

import Nursing1 from "../images/nursing/Nursing1.jpg";
import Nursing2 from "../images/nursing/Nursing2.jpg";
import BSNursing from "../images/nursing/BSNursing.jpg";

import Criminology1 from "../images/criminology/Criminology1.jpg";
import Criminology2 from "../images/criminology/Criminology2.jpg";
import BSCrim from "../images/criminology/BSCrim.jpg";

import Education1 from "../images/education/Education1.jpg";
import Education2 from "../images/education/Education2.jpg";
import BSEdBio from "../images/education/BSEdBio.png";
import BSEdMath from "../images/education/BSEdMath.jpg";
import BSEdScience from "../images/education/BSEdScience.jpg";

import Engineering1 from "../images/engineering/Engineering.jpg";
import Engineering2 from "../images/engineering/Engineering1.jpg";
import BSGE from "../images/engineering/Geodetic.png";
import BSME from "../images/engineering/Mining.jpg";
import BSCE from "../images/engineering/Civil.jpg";

import BSIS from "../images/computerStudies/BSIS.jpg";
import BSIT from "../images/computerStudies/BSIT.jpg";
import BSCS from "../images/computerStudies/BSCS.jpg";
import ComputerStudies from "../images/computerStudies/ComputerStudies.jpg";
import IT from "../images/computerStudies/IT.jpg";
// import { collection, onSnapshot, query } from "firebase/firestore";
// import { db } from "../firebaseConfig";

const loremipsum =
	"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.";

export default function HomeScreen() {
	// const [colleges, setColleges] = useState(null);

	useEffect(() => {
		window.scrollTo(0, 0);

		// const getColleges = () => {
		// 	const collegeCollectionQuery = query(collection(db, "colleges"));
		// 	onSnapshot(collegeCollectionQuery, (querySnapshot) => {
		// 		const restructuredData = querySnapshot.docs.map((doc) => {
		// 			const prog = { id: doc.id, ...doc.data() };
		// 			return prog;
		// 		});
		// 		setColleges(restructuredData);
		// 	});
		// };
		// getColleges();
	}, []);

	return (
		<Container style={{ paddingTop: "75px", textAlign: "center" }}>
			<Container>
				<Row>
					<Col>
						<Card className="bg-dark text-white">
							<Card.Img src={Accis} alt="Card image" />
						</Card>
					</Col>
					<Col>
						<img src={Logo} alt="logo" />
					</Col>
				</Row>
			</Container>
			<Container style={{ paddingBottom: "75px" }}>
				<Row style={{ paddingTop: "20px" }}>
					<Col>
						<CollegeCard
							title="College of Computer Studies"
							text={loremipsum}
							programs={computerStudiesPrograms}
							link="/college/College of Computer Studies"
							images={{
								collegeImg1: IT,
								collegeImg2: ComputerStudies,
								BSIS,
								BSIT,
								BSCS,
							}}
						/>
					</Col>
					<Col>
						<CollegeCard
							title="College of Engineering"
							text={loremipsum}
							programs={engineeringPrograms}
							link="/college/College of Engineering"
							images={{
								collegeImg1: Engineering1,
								collegeImg2: Engineering2,
								BSGE,
								BSCE,
								BSME,
							}}
						/>
					</Col>
					<Col>
						<CollegeCard
							title="College of Education"
							text={loremipsum}
							programs={educationPrograms}
							link="/college/College of Education"
							images={{
								collegeImg1: Education1,
								collegeImg2: Education2,
								BSEdBio,
								BSEdMath,
								BSEdScience,
							}}
						/>
					</Col>
				</Row>
				<Row style={{ paddingTop: "20px" }}>
					<Col>
						<CollegeCard
							title="College of Nursing"
							text={loremipsum}
							programs={nursingPrograms}
							link="/college/College of Nursing"
							images={{
								collegeImg1: Nursing1,
								collegeImg2: Nursing2,
								BSNursing,
							}}
						/>
					</Col>
					<Col>
						<CollegeCard
							title="College of Medicine"
							programs={medicinePrograms}
							text={loremipsum}
							link="/college/College of Medicine"
							images={{
								collegeImg1: Medicine1,
								collegeImg2: Medicine2,
								DMD,
								MD,
								MScCM,
							}}
						/>
					</Col>
					<Col>
						<CollegeCard
							title="College of Criminology"
							programs={criminologyPrograms}
							text={loremipsum}
							link="/college/College of Criminology"
							images={{
								collegeImg1: Criminology1,
								collegeImg2: Criminology2,
								BSCrim,
							}}
						/>
					</Col>
				</Row>
			</Container>
		</Container>
	);
}
