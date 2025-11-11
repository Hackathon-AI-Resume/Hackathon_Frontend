import React, { useState, useEffect, useCallback, memo } from "react";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSet,
    FieldLegend,
} from "@/components/ui/field";
// 🌟 假设您已经修复或替换了 Input/Textarea，这里暂时使用您的原始导入
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { Button } from "../ui/button";

// 字段配置 (保持不变)
const fields = [
    { key: "firstName", label: "First Name", placeholder: "Alan", type: "text", col: 1 },
    { key: "lastName", label: "Last Name", placeholder: "Turing", type: "text", col: 1 },
    { key: "jobTitle", label: "Job Title", placeholder: "Full Stack Engineer", type: "text", col: 2 },
    { key: "city", label: "City", placeholder: "San Francisco", type: "text", col: 1 },
    { key: "country", label: "Country", placeholder: "United States", type: "text", col: 1 },
    { key: "phone", label: "Phone", placeholder: "+1 123 456 7890", type: "tel", col: 1 },
    { key: "email", label: "Email", placeholder: "example@mail.com", type: "email", col: 1 },
    { key: "linkedin", label: "LinkedIn URL", placeholder: "https://linkedin.com/in/username", type: "url", col: 2 },
    { key: "portfolio", label: "Portfolio URL", placeholder: "https://portfolio.com", type: "url", col: 2 },
    { key: "other", label: "Other URL", placeholder: "https://example.com", type: "url", col: 2 },
];


// 接收 initialData 和 setLocalData
const PersonalInfoFormComponent = ({ initialData = {}, setLocalData, onNext, onPrevious, isFirstStep, isLastStep }) => {
    
    // 🌟 关键：使用本地状态 localDataState 管理输入，完全与父组件的全局状态解耦
    const [localData, setLocalDataState] = useState(initialData || {});

    // 🌟 关键：每次 initialData 变化（即切换步骤时），重置本地状态以加载新数据
    useEffect(() => {
        setLocalDataState(initialData || {});
    }, [initialData]);

    // 🚀 更新本地状态，并通知父组件更新本地缓冲区
    const updateField = useCallback((key, value) => {
        setLocalDataState(prev => {
            const newData = { ...prev, [key]: value };
            // 注意：不要在渲染阶段直接触发父组件更新（会导致 React 警告）。
            // 统一在下面的 useEffect 中将 localData 同步到父组件。
            return newData;
        });
    }, [setLocalData]); // 依赖于 setLocalData (来自父组件的稳定 prop)

    // 当 localData 发生变化时（输入发生），通过稳定的 setLocalData 回调将数据同步到父组件。
    // useEffect 在渲染后运行，避免在子组件渲染期间更新父组件状态，修复 "Cannot update a component while rendering a different component" 错误。
    useEffect(() => {
        if (typeof setLocalData === 'function') {
            setLocalData(localData);
        }
    }, [localData, setLocalData]);

    return (
        <div className="w-full max-w-md pt-6 mx-auto">
            <FieldSet>
                <FieldLegend>Personal Info</FieldLegend>
                <FieldDescription>Tell us about yourself and how recruiters can contact you.</FieldDescription>
                
                <FieldGroup className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        {fields.map(field => (
                            <Field key={field.key} className={field.col === 2 ? "col-span-2" : ""}>
                                <FieldLabel htmlFor={field.key}>{field.label}</FieldLabel>
                                
                                {
                                    field.type === 'textarea' ? (
                                        <Textarea
                                            id={field.key}
                                            placeholder={field.placeholder}
                                            // 绑定到本地状态
                                            value={localData[field.key] || ""}
                                            onChange={e => updateField(field.key, e.target.value)}
                                            rows={3}
                                        />
                                    ) : (
                                        <Input
                                            id={field.key}
                                            type={field.type}
                                            placeholder={field.placeholder}
                                            // 绑定到本地状态
                                            value={localData[field.key] || ""} 
                                            onChange={e => updateField(field.key, e.target.value)}
                                        />
                                    )
                                }
                            </Field>
                        ))}
                    </div>
                </FieldGroup>
            </FieldSet>

            {/* 导航按钮区域 */}
            <div className="my-6 flex justify-between">
                <Button onClick={onPrevious} variant="outline" disabled={isFirstStep} className="flex items-center gap-1">
                    &lt;&lt; Previous
                </Button>
                
                <Button onClick={onNext} className="flex items-center gap-1">
                    {isLastStep ? "Finish & Save" : "Next >>"}
                </Button>
            </div>
        </div>
    );
};

// 使用 memo 优化
const PersonalInfoForm = memo(PersonalInfoFormComponent);
export default PersonalInfoForm;