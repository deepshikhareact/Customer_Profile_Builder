import { Controller, useFieldArray } from "react-hook-form";
import Values from "./Form_FieldsValue";

const SectionFields = ({ control, sectionIndex, section }) => {
    const { fields: fieldFields, append: appendField, remove: removeField } = useFieldArray({
        control,
        name: `sections[${sectionIndex}].fields`
    });

    return (
        <>
            {fieldFields.map((field, fieldIndex) => (
                <div className='field' key={field.id}>
                    <p className='legend'>Field - {fieldIndex + 1}</p>
                    <div className="flex-column">
                        <label>Field Label</label>
                        <Controller
                            name={`sections[${sectionIndex}].fields[${fieldIndex}].label`}
                            control={control}
                            render={({ field }) => <input {...field} placeholder="Field Label" />}
                        />
                    </div>
                    <div className="flex-column">
                        <label>Field Key</label>
                        <Controller
                            name={`sections[${sectionIndex}].fields[${fieldIndex}].register_key`}
                            control={control}
                            render={({ field }) => <input {...field} placeholder="Field Key" />}
                        />
                    </div>
                    <div className="flex-column">
                        <label>View Type</label>
                        <Controller
                            name={`sections[${sectionIndex}].fields[${fieldIndex}].view_Type`}
                            control={control}
                            render={({ field }) => <input {...field} placeholder="View Type" />}
                        />
                    </div>
                    <div className="flex-column">
                        <label>Field Type</label>
                        <Controller
                            name={`sections[${sectionIndex}].fields[${fieldIndex}].field_Type`}
                            control={control}
                            render={({ field }) => <input {...field} placeholder="Field Type" />}
                        />
                    </div>
                    <button className='legend right delete' type="button" onClick={() => removeField(fieldIndex)}>Remove Field</button>
                    <Values control={control} sectionIndex={sectionIndex} fieldIndex={fieldIndex} />
                </div>
            ))}
            <button type="button" onClick={() => appendField({ label: '', register_key: '', view_Type: '', field_Type: '', values: [] })}>Add Field</button>
        </>
    );
};

export default SectionFields