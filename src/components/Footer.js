import React from "react";
import { FaFacebook } from "react-icons/fa";
import { AiOutlineTwitter } from "react-icons/ai";

const iconStyle = {
	fontSize: "24px",
};

const aTagStyle = { textDecoration: "none", color: "#000", padding: "5px" };

export default function Footer() {
	const twitterLink = "https://twitter.com/thebosstope";
	const facebookLink = "https://www.facebook.com/christopheraaron.martinez";

	return (
		<div style={{ height: "120px", backgroundColor: "grey", textAlign: "center" }}>
			<div style={{ fontSize: "24px", fontWeight: "bold" }}>Follow us on</div>
			<div style={{ marginTop: "10px", marginBottom: "10px" }}>
				<a href={facebookLink} style={aTagStyle}>
					<FaFacebook style={iconStyle} />
				</a>
				<a href={twitterLink} style={aTagStyle}>
					<AiOutlineTwitter style={iconStyle} />
				</a>
			</div>
			<div>Copyright © 2022 by Martinez. All Rights Reserved</div>
		</div>
	);
}
