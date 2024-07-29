/* eslint-disable react/prop-types */

// eslint-disable-next-line react/prop-types
const Orgnazations = ({ register, errors, businessType, isCreatingAccount, setBusinessType }) => {
    const icons = [
        { name: "Restaurant", icon: "restaurant.svg" },
        { name: "Retail", icon: "fmcg-products-icon.svg" },
        { name: "Fashion", icon: "cloth-store-icon.svg" },
        { name: "Lifestyle", icon: "healthy-lifestyle-icon.svg" },
        { name: "Health", icon: "clinic-icon.svg" },
        { name: "Fintech", icon: "fintech-icon.svg" },
        { name: "Services", icon: "services-icon.svg" },]
    const subCategories = {
        "Restaurant": ["Dining", "Cafe", "Fast Food", "Fine Dining", "Food Truck"],
        "Retail": ["Clothing", "Electronics", "Home Goods", "Sporting Goods", "Books"],
        "Fashion": ["Apparel", "Accessories", "Footwear", "Jewelry", "Handbags"],
        "Lifestyle": ["Fitness", "Travel", "Beauty", "Home Decor", "Outdoor"],
        "Health": ["Medical", "Fitness Centers", "Nutrition", "Mental Health", "Pharmacies"],
        "Fintech": ["Payments", "Lending", "Investments", "Blockchain", "Insurance"],
        "Services": ["Consulting", "Cleaning", "Legal", "Marketing", "Event Planning"]
    };

    return (
        <>
            <div data-state={isCreatingAccount} className="radio-btn">
                {icons.map((category, ind) => {
                    const isActive = businessType === category.name ? true : false;
                    return <div data-tooltip={category.name} onClick={() => setBusinessType(category.name)} key={ind} className="box">
                        <img height={60} width={60} src={"/assets/account/" + category.icon} alt={category.name} />
                        {isActive && <i
                            style={{ color: "var(--star-color)" }}
                            className="pi pi-check-circle"
                        ></i>}
                    </div>
                })}
            </div>
            {businessType == null && (
                <span
                    style={{ fontSize: ".7rem", fontWeight: "700", color: "red" }}
                >
                    Organisation is Required
                </span>
            )}
            <div id="subCategory" data-state={isCreatingAccount} className="flex-column">
                <label>Organisation Sub Category:</label>
                <div className="items">
                    {!businessType &&
                        <div className="item" >
                            <input type="radio" defaultChecked={true} value={""} />
                            <label >Select Organization</label>
                        </div>}
                    {businessType && subCategories[businessType]?.map((category, index) => (
                        <div className="item" key={index}>
                            <input id={category} type="radio" value={category} {...register('organization_SubCategory')} />
                            <label htmlFor={category} className="r-label"></label>
                            <label htmlFor={category}>{category}</label>
                        </div>
                    ))}
                </div>
                {/* <select {...register('organization_SubCategory', {
                    required: "Organization Category is required",
                })}>
                    {!businessType && <option value="">Select organization sub category</option>}
                    {businessType && subCategories[businessType]?.map((org) => (
                        <option key={org} value={org}>
                            {org}
                        </option>
                    ))}
                </select> */}
                {errors?.organization_SubCategory && (
                    <span
                        style={{ fontSize: ".7rem", fontWeight: "700", color: "red" }}
                    >
                        {errors.organization_SubCategory.message || "Validation Error"}
                    </span>
                )}
            </div>
        </>
    )
}

export default Orgnazations