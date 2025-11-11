import React, { useState, useEffect, useCallback, memo } from 'react'
import { Button } from "../ui/button";
import { Textarea } from "@/components/ui/textarea" // 导入 Textarea
import {
    Field, // 导入 Field 相关的组件
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSet,
    FieldLegend,
} from "@/components/ui/field";

// Summary 组件现在接收数据 (data/setData) 和导航 props
const Summary = ({ data, setData, initialData, setLocalData, onPrevious, onNext, isFirstStep, isLastStep }) => {
    const effectiveInitial = initialData ?? data ?? '';
    const effectiveSet = setLocalData ?? setData ?? (() => {});

    const [summaryText, setSummaryText] = useState(effectiveInitial || '');

    useEffect(() => {
        setSummaryText(effectiveInitial || '');
    }, [effectiveInitial]);

    const updateSummaryText = useCallback((value) => {
        setSummaryText(value);
    }, []);

    // 在本地 summaryText 变化后将其同步到父组件（在渲染后执行，避免在 render 期间触发父 setState）
    useEffect(() => {
        if (typeof effectiveSet === 'function') {
            effectiveSet(summaryText);
        }
    }, [summaryText, effectiveSet]);

    return (
        <div className="w-full max-w-md pt-6 mx-auto">
            <FieldSet>
                <FieldLegend>Professional Summary</FieldLegend>
                <FieldDescription>
                    Provide a compelling 2-4 sentence summary of your career highlights, skills, and goals. This will appear at the top of your resume.
                </FieldDescription>
                
                <FieldGroup className="mt-4">
                    <Field>
                        <FieldLabel htmlFor="summary-text">Your Professional Summary</FieldLabel>
                        <Textarea
                            id="summary-text"
                            placeholder="e.g., Highly motivated Full Stack Developer with 5 years of experience in high-growth startups..."
                                // data 是 summary 字符串
                                value={summaryText || ""} 
                                onChange={e => updateSummaryText(e.target.value)}
                            rows={6} 
                        />
                    </Field>
                </FieldGroup>
                
                <div className="mt-6 text-sm text-center text-muted-foreground">
                    Review your complete resume data on the right before clicking "Finish & Save".
                </div>

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
                    variant="default"
                    className="flex items-center gap-1"
                >
                    Print & Save
                </Button>
            </div>
        </div>
    )
}

export default memo(Summary);