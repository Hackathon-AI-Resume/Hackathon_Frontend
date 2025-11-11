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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { PlusCircle, Trash2 } from "lucide-react"; // 导入新增和删除图标

// 工作经验表单的字段配置
const WORK_EXPERIENCE_FIELDS = [
    { key: "jobTitle", label: "Job Title", placeholder: "Software Engineer", type: "text", col: 2 },
    { key: "company", label: "Company/Organization", placeholder: "Google", type: "text", col: 2 },
    { key: "city", label: "City", placeholder: "Mountain View", type: "text", col: 1 },
    { key: "country", label: "Country", placeholder: "USA", type: "text", col: 1 },
    { key: "startDate", label: "Start Date", placeholder: "MM/YYYY", type: "text", col: 1 },
    { key: "endDate", label: "End Date (or Current)", placeholder: "MM/YYYY", type: "text", col: 1 },
    { key: "description", label: "Job Description/Achievements", placeholder: "Responsible for...", type: "textarea", col: 2 },
];

// 默认的空工作经验对象
const DEFAULT_EXPERIENCE = WORK_EXPERIENCE_FIELDS.reduce((acc, field) => {
    acc[field.key] = field.type === 'textarea' ? '' : ''; // 初始化为空字符串
    return acc;
}, {});


const WorkExperienceForm = ({ data, setData, initialData, setLocalData, onNext, onPrevious, isFirstStep, isLastStep }) => {
    const effectiveInitial = initialData ?? data ?? [DEFAULT_EXPERIENCE];
    const effectiveSet = setLocalData ?? setData ?? (() => {});

    const [experiences, setExperiences] = useState(Array.isArray(effectiveInitial) && effectiveInitial.length > 0 ? effectiveInitial : [DEFAULT_EXPERIENCE]);

    useEffect(() => {
        setExperiences(Array.isArray(effectiveInitial) && effectiveInitial.length > 0 ? effectiveInitial : [DEFAULT_EXPERIENCE]);
    }, [effectiveInitial]);

    const updateExperienceField = useCallback((index, key, value) => {
        setExperiences(prev => {
            const newExperiences = [...prev];
            newExperiences[index] = { ...newExperiences[index], [key]: value };
            return newExperiences;
        });
    }, []);

    const addExperience = useCallback(() => {
        setExperiences(prev => [...prev, DEFAULT_EXPERIENCE]);
    }, []);

    const removeExperience = useCallback((index) => {
        setExperiences(prev => {
            if (prev.length > 1) {
                return prev.filter((_, i) => i !== index);
            }
            return [DEFAULT_EXPERIENCE];
        });
    }, []);

    // 在本地 experiences 变化后将其同步到父组件（在渲染后执行，避免在 render 期间触发父 setState）
    useEffect(() => {
        if (typeof effectiveSet === 'function') {
            effectiveSet(experiences);
        }
    }, [experiences, effectiveSet]);

    return (
        <div className="w-full max-w-md pt-6 mx-auto">
            <FieldSet>
                <FieldLegend>Work Experience</FieldLegend>
                <FieldDescription>
                    List your professional work history, starting with the most recent.
                </FieldDescription>

                {experiences.map((experience, index) => (
                    <FieldGroup key={index} className="flex flex-col gap-4 mt-6 p-4 border rounded-lg">
                        
                        {/* 标题和删除按钮 */}
                        <div className="flex justify-between items-center pb-2 border-b">
                            <h3 className="text-lg font-semibold text-foreground">
                                Work {index + 1}: {experience.jobTitle || "New Entry"}
                            </h3>
                            {experiences.length > 1 && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeExperience(index)}
                                    className="text-red-500 hover:bg-red-500/10"
                                >
                                    <Trash2 className="w-4 h-4 mr-1" /> Remove
                                </Button>
                            )}
                        </div>

                        {/* 工作经验字段 */}
                        <div className="grid grid-cols-2 gap-4">
                            {WORK_EXPERIENCE_FIELDS.map(field => (
                                <Field key={field.key} className={field.col === 2 ? "col-span-2" : ""}>
                                    <FieldLabel htmlFor={`${field.key}-${index}`}>{field.label}</FieldLabel>
                                    
                                    {field.type === 'textarea' ? (
                                        <Textarea
                                            id={`${field.key}-${index}`}
                                            placeholder={field.placeholder}
                                            value={experience[field.key] || ""}
                                            onChange={e => updateExperienceField(index, field.key, e.target.value)}
                                            rows={4}
                                        />
                                    ) : (
                                        <Input
                                            id={`${field.key}-${index}`}
                                            type={field.type}
                                            placeholder={field.placeholder}
                                            value={experience[field.key] || ""}
                                            onChange={e => updateExperienceField(index, field.key, e.target.value)}
                                        />
                                    )}
                                </Field>
                            ))}
                        </div>
                    </FieldGroup>
                ))}
                
                {/* 增加按钮 */}
                <Button
                    type="button"
                    onClick={addExperience}
                    variant="outline"
                    className="w-full mt-4 flex items-center justify-center text-primary border-primary/50 hover:bg-primary/5"
                >
                    <PlusCircle className="w-4 h-4 mr-2" /> Add Another Experience
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

export default memo(WorkExperienceForm);