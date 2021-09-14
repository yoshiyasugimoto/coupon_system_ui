import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const Get: React.FC = () => {
	const [downloadFiles, setDownloadFiles] = useState([]);

	useEffect(() => {
		const getDownloadFiles = async () => {
			const { data } = await axios.get(process.env.NEXT_PUBLIC_BUCKET_LIST);
			console.log(data);
			setDownloadFiles(data);
		};
		getDownloadFiles();
	}, []);

	const handleDownloadCsv = async (file) => {
		console.log(file);
		const { data } = await axios.get(
			`${process.env.NEXT_PUBLIC_DOWNLOAD_CSV}/${file}`
		);
		console.log(data);
		const csvBuffer = Buffer.from(data, "base64");
		const blob = new Blob([csvBuffer], { type: "text/csv" });
		console.log(blob);
		let url = (window.URL || window.webkitURL).createObjectURL(blob);
		let link = document.createElement("a");
		link.download = file;
		link.href = url;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};
	return (
		<>
			<h1>1日毎の顧客位置情報収集ファイル</h1>
			<div className="Form">
				{downloadFiles.map((file) => (
					<div className="Form-Item" key={file.id}>
						<p className="Form-Item-Label">{file.substr(0, 10)}</p>
						<a
							className="Form-Item-Download"
							onClick={() => handleDownloadCsv(file)}
						>
							{file}
						</a>
					</div>
				))}
				<Link href="/">
					<a type="submit" className="Form-Btn">
						戻る
					</a>
				</Link>
			</div>
		</>
	);
};

export default Get;
