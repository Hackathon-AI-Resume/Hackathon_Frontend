import React, { useState, useEffect, useCallback, memo } from 'react';
import { Button } from "../ui/button";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSet,
    FieldLegend,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

// The component now accepts data/setData (for saving skills) and navigation props.
const SkillsForm = ({ data, setData, initialData, setLocalData, onNext, onPrevious, isFirstStep, isLastStep }) => {
    const effectiveInitial = initialData ?? data ?? '';
    const effectiveSet = setLocalData ?? setData ?? (() => {});

    const [skillsString, setSkillsString] = useState(Array.isArray(effectiveInitial) ? effectiveInitial.join(', ') : (effectiveInitial || ''));

    useEffect(() => {
        setSkillsString(Array.isArray(effectiveInitial) ? effectiveInitial.join(', ') : (effectiveInitial || ''));
    }, [effectiveInitial]);

    const updateSkills = useCallback((value) => {
        setSkillsString(value);
    }, []);

    // 在本地 skillsString 变化后将其同步到父组件（在渲染后执行，避免在 render 期间触发父 setState）
    useEffect(() => {
        if (typeof effectiveSet === 'function') {
            effectiveSet(skillsString);
        }
    }, [skillsString, effectiveSet]);

    return (
        <div className="w-full max-w-md pt-6 mx-auto">
            <FieldSet>
                <FieldLegend>Skills</FieldLegend>
                <FieldDescription>
                    List your relevant hard and soft skills. Separate multiple skills with a comma (e.g., Python, SQL, Agile).
                </FieldDescription>
                
                <FieldGroup className="mt-4">
                    <Field>
                        <FieldLabel htmlFor="skills-list">What are you good at?</FieldLabel>
                        <Textarea
                            id="skills-list"
                            placeholder="e.g., JavaScript, React, PostgreSQL, Cloud Computing, Team Leadership"
                            value={skillsString}
                            onChange={(e) => updateSkills(e.target.value)}
                            rows={6}
                        />
                    </Field>
                </FieldGroup>

            </FieldSet>

            {/* Navigation Buttons */}
            <div className="my-6 flex justify-between">
                {/* Previous Button */}
                <Button 
                    onClick={onPrevious} 
                    variant="outline" 
                    disabled={isFirstStep}
                    className="flex items-center gap-1"
                >
                    &lt;&lt; Previous
                </Button>
                
                {/* Next Button */}
                <Button 
                    onClick={onNext}
                    className="flex items-center gap-1"
                >
                    {isLastStep ? "Finish & Save" : "Next >>"}
                </Button>
            </div>
        </div>
    );
}

export default memo(SkillsForm);