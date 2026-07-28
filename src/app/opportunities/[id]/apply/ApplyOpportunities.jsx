'use client';
import React from 'react';
import { Form, Button, TextField, Label, Input, Description, TextArea } from '@heroui/react';
import { submitApplication } from '@/lib/actions/application';

const ApplyOpportunities = ({ opportunity, applicant }) => {

    console.log('applicant', applicant);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const submissionData = {
            jobId: formData.get("jobId"),
            jobTitle: formData.get("jobTitle"),
            companyName: formData.get("companyName"),
            applicantId: formData.get("applicantId"), // হিডেন ফিল্ড থেকে আসছে
            applicantName: formData.get("applicantName"), // হিডেন ফিল্ড থেকে আসছে
            applicantEmail: formData.get("applicantEmail"), // হিডেন ফিল্ড থেকে আসছে
            resumeLink: formData.get("resumeLink"),
            portfolioLink: formData.get("portfolioLink"),
            optionalInfo: formData.get("optionalInfo"),
            status: formData.get("status"), // হিডেন ফিল্ড থেকে আসছে
        };

        console.log("Application Submitted:", submissionData);

        const res = await submitApplication(submissionData);
        if (res.success) {
            alert("Application submitted successfully!");
        } else {
            alert("Error submitting application");
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Apply for {opportunity.title}</h1>

            <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* হিডেন ফিল্ডস: অটোমেটিক ডাটা */}
                <input type="hidden" name="jobId" value={opportunity._id} />
                <input type="hidden" name="jobTitle" value={opportunity.title} />
                <input type="hidden" name="companyName" value={opportunity.companyName} />
                <input type="hidden" name="applicantName" value={applicant?.name || "Unknown"} />
                <input type="hidden" name="applicantEmail" value={applicant?.email || "N/A"} />
                <input type="hidden" name="applicantId" value={applicant?.id || ""} />
                <input type="hidden" name="status" value='applied' />

                {/* শুধুমাত্র ইউজার ইনপুট ফিল্ডগুলো */}
                <TextField isRequired name="resumeLink" className="flex flex-col gap-1">
                    <Label className="font-medium">Resume Link</Label>
                    <Input type="url" name="resumeLink" placeholder="https://drive.google.com/..." />
                </TextField>

                <TextField name="portfolioLink" className="flex flex-col gap-1">
                    <Label className="font-medium">Portfolio Link (Optional)</Label>
                    <Input type="url" name="portfolioLink" placeholder="https://yourportfolio.com" />
                </TextField>

                <TextField name="optionalInfo" className="flex flex-col gap-1">
                    <Label className="font-medium">Additional Information (Optional)</Label>
                    <TextArea name="optionalInfo" className="h-32 w-full p-2 border rounded-lg" />
                </TextField>

                <div className="flex gap-4 mt-4">
                    <Button type="submit" color="primary">Submit Application</Button>
                </div>
            </Form>
        </div>
    );
};

export default ApplyOpportunities;