import Head from "next/head";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Paper } from "@material-ui/core";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

const Home: React.FC = () => {
	const [couponId, setCouponId] = useState("");
	const [couponInfo, setCouponInfo] = useState([]);
	const [couponTitles, setCouponTitles] = useState([]);
	const router = useRouter();

	useEffect(() => {
		const couponList = async () => {
			const { data } = await axios.get(
				process.env.NEXT_PUBLIC_FETCH_COUPON_URL
			);

			const filterCouponTilesData = couponInfo.filter((coupon) => {
				if (coupon["id"] === couponId) {
					return coupon;
				}
			});

			setCouponInfo(
				filterCouponTilesData.length === 0 ? data : filterCouponTilesData
			);
			const selectOptions = data.map((coupon) => {
				return {
					label: coupon["title"],
					value: coupon["id"],
				};
			});
			setCouponTitles(selectOptions);
		};
		couponList();
	}, [couponId]);

	return (
		<>
			<Head>
				<title>クーポン一覧</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<h1>クーポンの一覧</h1>
				<Link href="/post">
					<a className="Post-Page-Link">クーポンの新規登録ページ</a>
				</Link>
				<Select
					options={couponTitles}
					placeholder={"クーポンのタイトル"}
					onChange={(e) => {
						setCouponId(e.value);
					}}
				/>

				<TableContainer component={Paper} style={{ marginBottom: 30 }}>
					<Table className="cityRentMarkePrice" aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>ID</TableCell>
								<TableCell>タイトル</TableCell>
								<TableCell>説明</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{couponInfo.map((item) => (
								<TableRow key={item.id}>
									<TableCell component="th" scope="row">
										<a
											onClick={() => {
												router.push({
													pathname: `/get/${item.id}`,
													query: { id: item.id, title: item.title },
												});
											}}
										>
											{item.id}
										</a>
									</TableCell>

									<TableCell>{item["title"]}</TableCell>
									<TableCell>{item["description"]}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</main>
		</>
	);
};

export default Home;
