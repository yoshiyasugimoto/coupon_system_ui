import Head from "next/head";
import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Paper } from "@material-ui/core";



const Home: React.FC = () => {
  const [couponTitle, setCouponTile] = useState('')
  const [couponInfo, setCouponInfo] = useState([])
  const [couponTitles, setCouponTitles] = useState([])

  useEffect(() => {
    const couponList = async () => {
      const couponList = await fetch(process.env.NEXT_PUBLIC_FETCH_COUPON_URL);  
      const data = await couponList.json();
      setCouponInfo(data)
      const selectOptions = data.map((coupon) => {
        
        return {
          "label": coupon['title'],
          "value": coupon['id']
        }
      })
      setCouponTitles(selectOptions)
    };
    couponList()

  },[couponInfo])

  return (
    <>
      
      <Head>
        <title>クーポン一覧</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>クーポンの一覧</h1>

        <Select options={couponTitles} placeholder={'クーポンのタイトル'} onChange={(e) => {
          setCouponTile(e.value)
        }} />

        <TableContainer component={Paper} style={{ marginBottom: 30 }}>
        <Table className='cityRentMarkePrice' aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell >ID</TableCell>
              <TableCell >タイトル</TableCell>
              <TableCell >説明</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {couponInfo.map((item) => (
              <TableRow key={item.id}>
                <TableCell component="th" scope="row">{item.id}</TableCell>
                <TableCell >{item['title']}</TableCell>
                <TableCell >{item['description']}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </TableContainer>

      </main>

    </>
  );
}

export default Home
