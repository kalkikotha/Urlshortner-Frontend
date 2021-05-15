import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router';
import axios from 'axios';

export default function Home() {

    const history = useHistory();
    const params = useParams()

    let [fullUrl, setfullUrl] = useState("")
    let [shortURL, setshortURL] = useState("")

    let [data, setdata] = useState([]);

    // useEffect(() => {
    async function fetchData() {
        let response = await axios.get(`https://urlshortnerdemo.herokuapp.com/urls/${params.id}`, {
            headers: {
                Accept: 'application/json',
                Authorization: window.localStorage.getItem('app_token')
            }
        })
        return setdata(response.data.links);
    }
    // }, [params.id])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            let passdata = { fullUrl: fullUrl }
            let res = await axios.post(`https://urlshortnerdemo.herokuapp.com/urls/${params.id}`, passdata, {
                headers: {
                    Accept: 'application/json',
                    Authorization: window.localStorage.getItem('app_token')
                }
            })
            setdata([])
            setshortURL(res.data.shortURL)
            setfullUrl("");
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleFetch = () => {
        fetchData()
    }

    const handlelogout = () => {
        window.localStorage.removeItem("app_token");
        history.push('/login');
    }

    return (
        <div className="container">
            <h1 style={{
                color: "white",
                backgroundColor: "red",
                padding: '20px'
            }}>URL-Shrinker
                <button style={{ float: 'right' }} onClick={handlelogout}>logout</button>
                <button style={{ float: 'right', marginRight: '10px' }} onClick={handleFetch}>Fetch Data</button>
            </h1>

            <form onSubmit={handleSubmit} style={{ paddingTop: '20px' }}>
                <label htmlFor="fullUrl" style={{ color: 'blue', fontWeight: 'bold' }}>Enter Url below</label>
                <input placeholder="URL" type="url" name="fullUrl" value={fullUrl} onChange={(e) => setfullUrl(e.target.value)} />
                <button type="submit">Shrink</button>
            </form>

            <h2 href="">{shortURL}</h2>


            <table style={{
                marginTop: '10px',
                marginRight: 'auto',
                marginLeft: 'auto',
                border: "1px solid black",
            }}>
                <thead>
                    <tr style={{
                        border: "1px solid black"
                    }}>
                        <th style={{
                            border: "1px solid black"
                        }}>URL</th>
                        <th style={{
                            border: "1px solid black"
                        }}>Shortened URL</th>
                    </tr>
                </thead>
                {
                    data.length !== 0 && data.map((data, index) => (
                        <tbody>

                            <tr style={{
                                border: "1px solid black"
                            }}>
                                <td style={{
                                    border: "1px solid black"
                                }}>{data.longUrl} </td>
                                <td style={{
                                    border: "1px solid black"
                                }}><a href={data.longUrl}>{data.shortURL}</a></td>
                            </tr>


                        </tbody>
                    ))
                }
            </table>



        </div >
    )
}
