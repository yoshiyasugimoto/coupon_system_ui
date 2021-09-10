import Link from "next/link";
import React from "react";

const Post: React.FC = () => {
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
						type="text"
						className="Form-Item-Input"
						placeholder="クーポン1"
					/>
				</div>
				<div className="Form-Item">
					<p className="Form-Item-Label">
						<span className="Form-Item-Label-Required">必須</span>クーポン画像
					</p>
					<input type="file" className="Form-File-Input" />
				</div>
				<div className="Form-Item">
					<p className="Form-Item-Label">
						<span className="Form-Item-Label-Required">必須</span>QRコード画像
					</p>
					<input type="file" className="Form-File-Input" />
				</div>
				<div className="Form-Item">
					<p className="Form-Item-Label isMsg">
						<span className="Form-Item-Label-Required">必須</span>
						クーポンの詳細
					</p>
					<textarea
						className="Form-Item-Textarea"
						placeholder="200文字以内"
					></textarea>
				</div>
				<Link href="/">
					<a type="submit" className="Form-Btn">
						登録する
					</a>
				</Link>
			</div>
		</>
	);
};

export default Post;
