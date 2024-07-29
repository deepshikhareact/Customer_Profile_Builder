/* eslint-disable react/prop-types */

import "./style.scss"
import { useState } from "react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
// import { getFormsData } from "@/utils/api"
import { toast } from "react-toastify"
import { createProfileHandler } from "@/utils/api"
import { Link, useParams } from "react-router-dom"
import FormDataComponent from "@/components/ui/FormData"

const Form_Page = () => {
    const { id } = useParams()
    const [data, setData] = useState(null)
    const { register, handleSubmit } = useForm();

    // async function getData() {
    //     try {
    //         const res = await getFormsData()
    //         if (res.data.success) {
    //             const { activeForm, forms } = res.data.data
    //             const getActiveForm = forms.filter(val => val._id === activeForm)
    //             setData(getActiveForm[0])
    //         }
    //     } catch (error) {
    //         toast.error(error.message)
    //     }
    // }

    async function getDummyData() {
        const x = await fetch("http://localhost:3000/forms/" + id, { method: "GET" })
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

    const onSubmit = async (data) => {
        try {
            const createProfile = await createProfileHandler(data)
            if (createProfile.data.success) {
                toast.success("Profile create")
            }
            else {
                toast.error("error")

            }
            console.log("createProfile", createProfile);
        } catch (error) {
            console.log(error.message);
        }

    }
    return (
        <div className="Create_Profile_Form">
            <Link className="back" style={{ color: "#000" }} to={"/dashboard/forms"}>
                <i className="pi pi-arrow-left"></i>
            </Link>
            <div className="header">
                <div className="title">
                    <h3>{data.title}</h3>
                </div>
            </div>
            <form className="userProfile" onSubmit={handleSubmit(onSubmit)}>
                <FormDataComponent register={register} formData={data} />
                <div className="buttons">
                    <button type="submit">Create Profile</button>
                    <button type="button">Save Data</button>
                </div>
            </form>
        </div>
    )
}



export default Form_Page