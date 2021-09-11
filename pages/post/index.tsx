import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";

const POST_URL = process.env.NEXT_PUBLIC_POST_COUPON_URL_LOCAL;

const Post: React.FC = () => {
	const [couponTitle, setCouponTile] = useState("");
	const [couponImg, setCouponImg] = useState<string | ArrayBuffer>("");
	const [qrCodeImg, setQrCodeImg] = useState<string | ArrayBuffer>("");
	const [couponDescription, setCouponDescription] = useState("");

	const converBase64 = (e) => {
		const reader = new FileReader();
		reader.readAsDataURL(e.target.files[0]);
		reader.onload = function () {
			if (e.target.name === "couponImg") {
				setCouponImg(reader.result);
			} else if (e.target.name === "qrCodeImg") {
				setQrCodeImg(reader.result);
			}
		};
	};

	const handleChange = (e) => {
		if (e.target.name === "title") {
			setCouponTile(e.target.value);
		} else if (e.target.type === "file") {
			converBase64(e);
		} else if (e.target.name === "couponDescription") {
			setCouponDescription(e.target.value);
		}
	};

	const postCoupon = async () => {
		if (couponTitle && couponImg && qrCodeImg && couponDescription) {
			const body = {
				couponImg: couponImg,
				qrCodeImg: qrCodeImg,
				couponTitle: couponTitle,
				couponDescription: couponDescription,
			};
			const res = await axios.post(POST_URL, body);
			console.log(res);
			return true;
		} else {
			console.log("blank");
			return false;
		}
	};
	return (
		<>
			<h1>クーポンの新規登録</h1>
			<div className="Form">
				<div className="Form-Item">
					<p className="Form-Item-Label">
						<span className="Form-Item-Label-Required">必須</span>
						クーポンのタイトル
					</p>
					<input
						name="title"
						type="text"
						accept="image/*"
						className="Form-Item-Input"
						placeholder="例)クーポン1"
						onChange={handleChange}
					/>
				</div>
				<div className="Form-Item">
					<p className="Form-Item-Label">
						<span className="Form-Item-Label-Required">必須</span>クーポン画像
					</p>
					<input
						name="couponImg"
						type="file"
						className="Form-File-Input"
						onChange={handleChange}
					/>
				</div>
				<div className="Form-Item">
					<p className="Form-Item-Label">
						<span className="Form-Item-Label-Required">必須</span>QRコード画像
					</p>
					<input
						name="qrCodeImg"
						type="file"
						className="Form-File-Input"
						onChange={handleChange}
					/>
				</div>
				<div className="Form-Item">
					<p className="Form-Item-Label isMsg">
						<span className="Form-Item-Label-Required">必須</span>
						クーポンの詳細
					</p>
					<textarea
						name="couponDescription"
						className="Form-Item-Textarea"
						placeholder="200文字以内"
						onChange={handleChange}
					></textarea>
				</div>
				<Link href="/">
					<a type="submit" className="Form-Btn" onClick={postCoupon}>
						登録する
					</a>
				</Link>
			</div>
		</>
	);
};

export default Post;
