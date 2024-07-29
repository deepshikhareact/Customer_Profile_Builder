import Basic from "@/components/ui/Basic"

const Oldpage = () => {
    return (
        <div className="CustomerProfilePage">
            <div className="header">
                <div className="title">
                    <h3>
                        {" "}
                        <span>SMART INSIGHTS TO</span>
                        <br />
                        Transform Your Business
                    </h3>
                </div>
            </div>
            <div className="userProfile">
                <AccordionTab title={"Basic Information"}>
                    <Basic />
                </AccordionTab>
                <AccordionTab title={"How do they travel?"}>
                    <div className="flex-column">
                        <label>VISITOR’S VEHICLE</label>
                        <div className="flex">
                            <img className="icon round-md" height={60} width={60} src="/assets/customer_Profile/car.png" alt="car" />
                            <img className="icon round-md" height={60} width={60} src="/assets/customer_Profile/bike.png" alt="bike" />
                            <img className="icon round-md" height={60} width={60} src="/assets/customer_Profile/train.png" alt="other" />
                            <img className="icon round-md" height={60} width={60} src="/assets/customer_Profile/taxi.png" alt="other" />
                            <img className="icon round-md" height={60} width={60} src="/assets/customer_Profile/question.png" alt="other" />
                        </div>
                    </div>
                    <div className="flex-column">
                        <label>Vehicle Brand</label>
                        <div className="flex">
                            <img className="icon round-md" height={60} width={60} src="/assets/customer_Profile/bmw.png" alt="bmw" />
                            <img className="icon round-md" height={60} width={60} src="/assets/customer_Profile/benz.png" alt="benz" />
                            <img className="icon round-md" height={60} width={60} src="/assets/customer_Profile/audi.png" alt="audi" />
                            <img className="icon round-md" height={60} width={60} src="/assets/customer_Profile/jaguar.png" alt="jaguarr" />
                            <img className="icon round-md" height={60} width={60} src="/assets/customer_Profile/question.png" alt="other" />
                        </div>
                    </div>
                    <div className="flex-column">
                        <label>Vehicle Model</label>
                        <input type="text" placeholder="Model" />
                    </div>
                    <div className="flex-column">
                        <label>Vehicle Color</label>
                        <div className="flex">
                            <span className="age">Red</span>
                            <span className="age">Green</span>
                            <span className="age">Blue</span>
                            <span className="age">Yellow</span>
                            <span className="age">Black</span>
                            <span className="age">White</span>
                            <span className="age">Orange</span>
                        </div>
                    </div>
                    <button className="start ">Submit</button>
                </AccordionTab>
                <AccordionTab title={"Visiting with?"}>
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
                </AccordionTab>
                <AccordionTab title={"What do they wear?"}>
                    <div className="flex-column">
                        <label>What do they wear?</label>
                    </div>
                </AccordionTab>
                <AccordionTab title={"Customer Details"}>
                    <div className="flex-column">
                        <input type="text" placeholder="Full Name" />
                        <input type="text" placeholder="Phone Number" />
                        <input type="text" placeholder="Email ID" />
                        <input type="text" placeholder="Address" />
                        <input type="text" placeholder="City" />
                        <input type="text" placeholder="State" />
                    </div>
                    <button className="start ">Submit</button>
                </AccordionTab>
            </div>
        </div>
    )
}


function AccordionTab({ title, children }) {
    const date = new Date().toISOString()
    const id = "C-" + date + title.slice(0, 3)
    return <div className="tab">
        <input type="checkbox" id={id} />
        <label className="title" htmlFor={id}>{title}
            <i className="pi pi-minus open"></i>
            <i className="pi pi-minus close"></i>
        </label>
        <div className="content">
            <div className="data">
                {children}
            </div>
        </div>
    </div>
}
export default Oldpage