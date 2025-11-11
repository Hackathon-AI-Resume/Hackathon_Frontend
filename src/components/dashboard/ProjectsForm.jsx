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
import { PlusCircle, Trash2, Zap } from "lucide-react"; // 导入新增、删除和 AI 图标

// 项目表单的字段配置
const PROJECT_FIELDS = [
    { key: "projectName", label: "Project Name", placeholder: "AI Resume Builder", type: "text", col: 2 },
    { key: "organization", label: "Organization/Context", placeholder: "Hackathon/Company Project", type: "text", col: 2 },
    { key: "startDate", label: "Start Date", placeholder: "MM/YYYY", type: "text", col: 1 },
    { key: "endDate", label: "End Date", placeholder: "MM/YYYY (or empty if current)", type: "text", col: 1 },
    { key: "projectLink", label: "Project Link", placeholder: "https://github.com/...", type: "url", col: 2 },
    { key: "description", label: "Description/Your Role", placeholder: "Developed the core backend service using...", type: "textarea", col: 2 },
];

// 默认的空项目对象
const DEFAULT_PROJECT = PROJECT_FIELDS.reduce((acc, field) => {
    acc[field.key] = field.type === 'textarea' ? '' : '';
    return acc;
}, {});

const ProjectsForm = ({ data, setData, initialData, setLocalData, onNext, onPrevious, isFirstStep, isLastStep }) => {
    // 兼容两种父组件接口：data/setData 或 initialData/setLocalData
    const effectiveInitial = initialData ?? data ?? [DEFAULT_PROJECT];
    const effectiveSet = setLocalData ?? setData ?? (() => {});

    // 本地状态，避免父组件频繁更新导致输入失焦
    const [projects, setProjects] = useState(Array.isArray(effectiveInitial) && effectiveInitial.length > 0 ? effectiveInitial : [DEFAULT_PROJECT]);

    useEffect(() => {
        setProjects(Array.isArray(effectiveInitial) && effectiveInitial.length > 0 ? effectiveInitial : [DEFAULT_PROJECT]);
    }, [effectiveInitial]);

    // 把本地变化同步到父组件（在渲染后执行，避免在 render 期间触发父 setState）
    useEffect(() => {
        effectiveSet(projects);
    }, [projects, effectiveSet]);

    // 更新特定项目项的特定字段（稳定回调）
    const updateProjectField = useCallback((index, key, value) => {
        setProjects(prev => {
            const next = [...prev];
            next[index] = { ...next[index], [key]: value };
            return next;
        });
    }, []);

    const addProject = useCallback(() => {
        setProjects(prev => [...prev, DEFAULT_PROJECT]);
    }, []);

    const removeProject = useCallback((index) => {
        setProjects(prev => {
            if (prev.length > 1) return prev.filter((_, i) => i !== index);
            return [DEFAULT_PROJECT];
        });
    }, []);
    
    // 假设 AI 智能填充按钮只是一个提示或未来功能，不包含实际逻辑
    const handleSmartFill = () => {
        alert("Smart fill (AI) feature coming soon! 10 credits required.");
    };


    return (
        <div className="w-full max-w-md pt-6 mx-auto">
            <FieldSet>
                <FieldLegend>Projects</FieldLegend>
                <FieldDescription>Showcase your independent work, school projects, or open-source contributions.</FieldDescription>

                {projects.map((project, index) => (
                    <FieldGroup key={index} className="flex flex-col gap-4 mt-6 p-4 border rounded-lg">
                        
                        {/* 标题、AI 按钮和删除按钮 */}
                        <div className="flex justify-between items-center pb-2 border-b">
                            <h3 className="text-lg font-semibold text-foreground">
                                Project {index + 1}: {project.projectName || "New Project"}
                            </h3>
                            <div className="flex gap-2">
                                {/* AI 智能填充按钮 */}
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleSmartFill}
                                    className="text-primary hover:bg-primary/10"
                                >
                                    <Zap className="w-3 h-3 mr-1 fill-primary" /> 
                                    Smart fill (AI)
                                </Button>

                                {/* 删除按钮 */}
                                {projects.length > 1 && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeProject(index)}
                                        className="text-red-500 hover:bg-red-500/10"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* 项目字段 */}
                        <div className="grid grid-cols-2 gap-4">
                            {PROJECT_FIELDS.map(field => (
                                <Field key={field.key} className={field.col === 2 ? "col-span-2" : ""}>
                                    <FieldLabel htmlFor={`${field.key}-${index}`}>{field.label}</FieldLabel>
                                    
                                    {field.type === 'textarea' ? (
                                        <Textarea
                                            id={`${field.key}-${index}`}
                                            placeholder={field.placeholder}
                                            value={project[field.key] || ""}
                                            onChange={e => updateProjectField(index, field.key, e.target.value)}
                                            rows={5}
                                        />
                                    ) : (
                                        <Input
                                            id={`${field.key}-${index}`}
                                            type={field.type}
                                            placeholder={field.placeholder}
                                            value={project[field.key] || ""}
                                            onChange={e => updateProjectField(index, field.key, e.target.value)}
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
                    onClick={addProject}
                    variant="outline"
                    className="w-full mt-4 flex items-center justify-center text-primary border-primary/50 hover:bg-primary/5"
                >
                    <PlusCircle className="w-4 h-4 mr-2" /> Add Another Project
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

export default memo(ProjectsForm);