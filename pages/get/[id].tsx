import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

const Get: React.FC = () => {
	const [couponInfo, setCouponInfo] = useState({});

	const router = useRouter();

	useEffect(() => {
		const URL = `${process.env.NEXT_PUBLIC_FETCH_COUPON_URL}/${router.query.id}/${router.query.title}`;

		const getCouponData = async () => {
			const { data } = await axios.get(URL);
			console.log(data);
			data["title"] = decodeURIComponent(data["title"]);
			setCouponInfo(data);
		};
		getCouponData();
	}, []);

	return (
		<>
			<h1>クーポンの新規登録</h1>
			<div className="Form">
				<div className="Form-Item">
					<p className="Form-Item-Label">クーポンのタイトル</p>
					<div className="Form-Item-Input" placeholder="例)クーポン1">
						{couponInfo["title"]}
					</div>
				</div>
				<div className="Form-Item">
					<p className="Form-Item-Label">クーポン画像</p>
					<div className="Form-File-Output">
						<img src={couponInfo["base64CouponImg"]} alt="クーポン" />
					</div>
				</div>
				<div className="Form-Item">
					<p className="Form-Item-Label">QRコード画像</p>
					<div className="Form-File-Output">
						<img src={couponInfo["base64QrCodeImg"]} alt="QRコード" />
					</div>
				</div>
				<div className="Form-Item">
					<p className="Form-Item-Label isMsg">クーポンの詳細</p>
					<div className="Form-Item-Textarea" placeholder="200文字以内">
						{couponInfo["description"]}
					</div>
				</div>
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
