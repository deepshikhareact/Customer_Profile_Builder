import { Controller, useFieldArray } from "react-hook-form";

const Values = ({ control, sectionIndex, fieldIndex }) => {
    const { fields: valueFields, append: appendValue, remove: removeValue } = useFieldArray({
        control,
        name: `sections[${sectionIndex}].fields[${fieldIndex}].values`
    });

    return (
        <>
            {valueFields.map((value, valueIndex) => (
                <div className='flex Value' key={value.id}>
                    <p className='legend'>Value {valueIndex + 1}</p>
                    <div className="flex-column">
                        <label>Value Label</label>
                        <Controller
                            name={`sections[${sectionIndex}].fields[${fieldIndex}].values[${valueIndex}].label`}
                            control={control}
                            render={({ field }) => <input {...field} placeholder="Value Label" />}
                        />
                    </div>
                    <div className="flex-column">
                        <label>Value</label>
                        <Controller
                            name={`sections[${sectionIndex}].fields[${fieldIndex}].values[${valueIndex}].value`}
                            control={control}
                            render={({ field }) => <input {...field} placeholder="Value" />}
                        />
                    </div>
                    <div className="flex-column">
                        <label>Icon URL</label>
                        <Controller
                            name={`sections[${sectionIndex}].fields[${fieldIndex}].values[${valueIndex}].iconURL`}
                            control={control}
                            render={({ field }) => <input {...field} placeholder="Icon URL" />}
                        />
                    </div>

                    <button type="button" onClick={() => removeValue(valueIndex)}>Remove Value</button>
                </div>
            ))}
            <button className='addBtn' type="button" onClick={() => appendValue({ label: '', value: '', iconURL: '' })}>Add Value</button>
        </>
    );
};

export default Values