import { useEffect, useState } from "react";

const Basic = () => {

    const [ageGroups, setAgeGroups] = useState(null)
    const [selectedAge, setSelectedAge] = useState(null)
    // const [selectGender, setSelectGender] = useState(null)

    useEffect(() => {
        setAgeGroups(generateAgeGroups())
    }, [])


    return (
        <>
            <div className="flex-column">
                <label htmlFor="Gender">Gender</label>
                <div className="flex">
                    <div className="flex-col">
                        <img className="icon" height={60} width={60} src="/assets/customer_Profile/man.png" alt="man" />
                        <label htmlFor="male">Male</label>
                    </div>
                    <div className="flex-col">
                        <img className="icon" height={60} width={60} src="/assets/customer_Profile/woman.png" alt="woman" />
                        <label >Female</label>
                    </div>
                    <div className="flex-col">
                        <img className="icon" height={60} width={60} src="/assets/customer_Profile/other.png" alt="other" />
                        <label >Other</label>
                    </div>
                </div>
            </div>
            <div className="flex-column">
                <label htmlFor="Group">Age Group</label>
                <div className="flex">
                    {ageGroups && ageGroups.map((group, index) => (
                        <span onClick={() => setSelectedAge(group)}
                            className={selectedAge === group ? "active age" : "age"} key={index}>{group}</span>
                    ))}
                    <span onClick={() => setSelectedAge("65+")}
                        className={selectedAge === "65+" ? "active age" : "age"} >65+</span>
                </div>

            </div>
            <div className="flex-column">
                <label htmlFor="Visit">
                    Visiting with
                </label>
                <div className="flex">
                    <div className="flex-col">
                        <img className="icon round-md" height={60} width={60} src="/assets/customer_Profile/person.png" alt="man" />
                        <label>Alone</label>
                    </div>
                    <div className="flex-col">
                        <img className="icon round-md" height={60} width={60} src="/assets/customer_Profile/couple.png" alt="woman" />
                        <label >Spouse</label>
                    </div>
                    <div className="flex-col">
                        <img className="icon round-md" height={60} width={60} src="/assets/customer_Profile/family.png" alt="other" />
                        <label >Family</label>
                    </div>
                    <div className="flex-col">
                        <img className="icon round-md" height={60} width={60} src="/assets/customer_Profile/friends.png" alt="other" />
                        <label >Friends</label>
                    </div>
                </div>
            </div>
            <button className="start ">Submit</button>
        </>
    )
}

function generateAgeGroups() {
    let ageGroups = [];

    for (let i = 15; i <= 60; i += 5) {
        let group = `${i} - ${i + 4}`;
        ageGroups.push(group);
    }

    return ageGroups;
}

export default Basic