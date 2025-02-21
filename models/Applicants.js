const mongoose = require("mongoose");
const educationSchema = new mongoose.Schema({
    Degree: String,
    Branch: String,
    Institution: String,
    Year: String
}, { _id: false });

const experienceSchema = new mongoose.Schema({
    JobTitle: String,
    Company: String,
    StartDate: String,
    EndDate: String
}, { _id: false });

const applicantSchema = new mongoose.Schema({
    Name: String,
    Email: [String],
    Education: [educationSchema],
    Experience: [experienceSchema],
    Skills: [String],
    Summary: String
});

module.exports = mongoose.model("Applicants", applicantSchema);
