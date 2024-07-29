import { useForm, useFieldArray, Controller } from 'react-hook-form';
import "./styles.scss"
import SectionFields from './jsx/Form_Section';

const Create_Form_Page = () => {

    const { control, handleSubmit } = useForm({
        defaultValues: {}
    });

    const { fields: sectionFields, append: appendSection, remove: removeSection } = useFieldArray({
        control,
        name: 'sections'
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className='form-container'>
            <form onSubmit={handleSubmit(onSubmit)}>
                {sectionFields.map((section, sectionIndex) => (
                    <div className='section' key={section.id}>
                        <input type="checkbox" name="sectionToggler" id={`section - ${sectionIndex + 1}`} />
                        <label className='toggler' htmlFor={`section - ${sectionIndex + 1}`}> <i className='pi pi-angle-down'></i> </label>
                        <p className='legend'>Section - {sectionIndex + 1}</p>
                        {sectionIndex > 1 && <button type="button" onClick={() => removeSection(sectionIndex)}>Remove Section</button>}
                        <div className="flex-column section-title">
                            <label>Section Title</label>
                            <Controller
                                name={`sections[${sectionIndex}].title`}
                                control={control}
                                render={({ field }) => <input {...field} placeholder="Section Title" />}
                            />
                        </div>
                        <div className="sectionsList">
                            <SectionFields control={control} sectionIndex={sectionIndex} section={section} />
                        </div>
                    </div>
                ))}
                <div className="actions">
                    <button type="button" onClick={() => appendSection({ title: '', fields: [] })}>Add Section</button>
                    <button type="submit">Create</button>
                </div>
            </form>
        </div>

    );
};

export default Create_Form_Page