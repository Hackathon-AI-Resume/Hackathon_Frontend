import React, { useState, useEffect, useCallback, memo } from "react";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSet,
    FieldLegend,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { PlusCircle, Trash2 } from "lucide-react";

// 教育背景表单的字段配置
const EDUCATION_FIELDS = [
    { key: "institution", label: "Institution Name", placeholder: "Massachusetts Institute of Technology (MIT)", type: "text", col: 2 },
    { key: "degree", label: "Degree/Qualification", placeholder: "Master of Science in Computer Science", type: "text", col: 2 },
    { key: "fieldOfStudy", label: "Field of Study", placeholder: "Computer Science", type: "text", col: 2 },
    { key: "city", label: "City", placeholder: "Cambridge", type: "text", col: 1 },
    { key: "country", label: "Country", placeholder: "USA", type: "text", col: 1 },
    { key: "startDate", label: "Start Date", placeholder: "MM/YYYY", type: "text", col: 1 },
    { key: "endDate", label: "End Date", placeholder: "MM/YYYY (or Expected)", type: "text", col: 1 },
    { key: "gpa", label: "GPA (Optional)", placeholder: "4.0/4.0", type: "text", col: 2 },
];

// 默认的空教育背景对象
const DEFAULT_EDUCATION = EDUCATION_FIELDS.reduce((acc, field) => {
    acc[field.key] = '';
    return acc;
}, {});

const EducationForm = ({ data, setData, initialData, setLocalData, onNext, onPrevious, isFirstStep, isLastStep }) => {
    const effectiveInitial = initialData ?? data ?? [DEFAULT_EDUCATION];
    const effectiveSet = setLocalData ?? setData ?? (() => {});

    const [educationEntries, setEducationEntries] = useState(Array.isArray(effectiveInitial) && effectiveInitial.length > 0 ? effectiveInitial : [DEFAULT_EDUCATION]);

    useEffect(() => {
        setEducationEntries(Array.isArray(effectiveInitial) && effectiveInitial.length > 0 ? effectiveInitial : [DEFAULT_EDUCATION]);
    }, [effectiveInitial]);

    const updateEducationField = useCallback((index, key, value) => {
        setEducationEntries(prev => {
            const next = [...prev];
            next[index] = { ...next[index], [key]: value };
            return next;
        });
    }, []);

    const addEducation = useCallback(() => {
        setEducationEntries(prev => [...prev, DEFAULT_EDUCATION]);
    }, []);

    const removeEducation = useCallback((index) => {
        setEducationEntries(prev => {
            if (prev.length > 1) {
                return prev.filter((_, i) => i !== index);
            }
            return [DEFAULT_EDUCATION];
        });
    }, []);

    // 在本地 educationEntries 变化后同步给父组件，避免在 render 期间触发父 setState
    useEffect(() => {
        if (typeof effectiveSet === 'function') {
            effectiveSet(educationEntries);
        }
    }, [educationEntries, effectiveSet]);

    return (
        <div className="w-full max-w-md pt-6 mx-auto">
            <FieldSet>
                <FieldLegend>Education History</FieldLegend>
                <FieldDescription>
                    Add your academic history, beginning with the highest degree obtained.
                </FieldDescription>

                {educationEntries.map((education, index) => (
                    <FieldGroup key={index} className="flex flex-col gap-4 mt-6 p-4 border rounded-lg">
                        
                        {/* 标题和删除按钮 */}
                        <div className="flex justify-between items-center pb-2 border-b">
                            <h3 className="text-lg font-semibold text-foreground">
                                Education {index + 1}: {education.degree || "New Degree"}
                            </h3>
                            {educationEntries.length > 1 && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeEducation(index)}
                                    className="text-red-500 hover:bg-red-500/10"
                                >
                                    <Trash2 className="w-4 h-4 mr-1" /> Remove
                                </Button>
                            )}
                        </div>

                        {/* 教育背景字段 */}
                        <div className="grid grid-cols-2 gap-4">
                            {EDUCATION_FIELDS.map(field => (
                                <Field key={field.key} className={field.col === 2 ? "col-span-2" : ""}>
                                    <FieldLabel htmlFor={`${field.key}-${index}`}>{field.label}</FieldLabel>
                                    
                                    <Input
                                        id={`${field.key}-${index}`}
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        value={education[field.key] || ""}
                                        onChange={e => updateEducationField(index, field.key, e.target.value)}
                                    />
                                </Field>
                            ))}
                        </div>
                    </FieldGroup>
                ))}
                
                {/* 增加按钮 */}
                <Button
                    type="button"
                    onClick={addEducation}
                    variant="outline"
                    className="w-full mt-4 flex items-center justify-center text-primary border-primary/50 hover:bg-primary/5"
                >
                    <PlusCircle className="w-4 h-4 mr-2" /> Add Another Education Entry
                </Button>

            </FieldSet>
            
            {/* 导航按钮区域 */}
            <div className="my-6 flex justify-between">
                <Button 
                    onClick={onPrevious} 
                    variant="outline" 
                    disabled={isFirstStep}
                    className="flex items-center gap-1"
                >
                    &lt;&lt; Previous
                </Button>
                <Button 
                    onClick={onNext}
                    className="flex items-center gap-1"
                >
                    {isLastStep ? "Finish & Save" : "Next >>"}
                </Button>
            </div>
        </div>
    );
};

export default memo(EducationForm);