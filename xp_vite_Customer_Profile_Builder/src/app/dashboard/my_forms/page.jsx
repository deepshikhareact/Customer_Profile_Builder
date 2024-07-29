
import { useEffect, useState } from "react"
import "./style.scss"
import { formatDate } from "@/utils/timeFormatter"
import { Link } from "react-router-dom"

const MyForms = () => {
    const [data, setData] = useState(null)

    async function getDummyData() {
        const x = await fetch("http://localhost:3000/forms", { method: "GET" })
        const res = await x.json()
        setData(res)
    }

    useEffect(() => {
        // getData()
        getDummyData()
    }, [])

    if (!data) {
        return <p>Loading....</p>
    }
    const x = [...data, ...data]
    const time = new Date().toISOString()

    return (
        <div className="my_forms">
            <div className="header">
                <div className="title">
                    <h3>
                        My Forms
                    </h3>
                    <Link className="create" to={"create_form"}>Create</Link>
                </div>
            </div>
            <ul className="ul">
                {x.map((form, i) => {
                    return <li key={i} className="item">
                        <div className="top">
                            <p>Last update: {formatDate(time)}</p>
                            <img height={64} width={64} src="/assets/dashboard/form.png" alt="form" />
                            <div className="info">
                                <h4>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio ipsum aperiam perspiciatis recusandae amet ipsam, voluptas saepe libero sapiente nostrum cum minus.{form.title}</h4>
                            </div>
                        </div>
                        <div className="action">
                            <Link className="link_btn" to={"form/" + form.id}>View/Use</Link>
                            <Link className="link_btn" to={"update_form"}>Update</Link>
                            <button className="link_btn">Activate</button>
                        </div>
                    </li>
                })}
            </ul>
        </div>
    )
}

export default MyForms