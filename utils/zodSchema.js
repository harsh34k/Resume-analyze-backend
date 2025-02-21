const { z } = require("zod");

const educationSchema = z.object({
    Degree: z.string().trim().min(1),
    Branch: z.string().trim().min(1),
    Institution: z.string().trim().min(1),
    Year: z.string().trim().regex(/^\d{4}$/)
});

const experienceSchema = z.object({
    JobTitle: z.string().trim().min(1),
    Company: z.string().trim().min(1),
    StartDate: z.string().trim(),
    EndDate: z.string().trim().optional()
});

const applicantSchema = z.object({
    Name: z.string().trim().transform(str => str.toLowerCase()),
    Email: z.array(z.string().trim().toLowerCase().email()).nonempty(),
    Education: z.array(educationSchema).optional(),
    Experience: z.array(experienceSchema).optional(),
    Skills: z.array(z.string().trim().min(1)).optional(),
    Summary: z.string().trim().optional()
});

const processResumeSchema = z.object({
    url: z.string().url()
});

module.exports = { applicantSchema, processResumeSchema };
