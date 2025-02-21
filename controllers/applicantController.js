const Applicant = require("../models/Applicants");
const { encryptData, decryptData } = require("../utils/encryption");
const searchApplicants = async (req, res) => {
    try {
        const { name } = req.query;
        console.log(`name${name}`);


        if (!name) {
            return res.status(400).json({ message: "Name query parameter is required" });
        }

        const encryptedQuery = encryptData(name.toLowerCase());
        console.log("encryptedQuery", encryptedQuery);

        // Find applicants by encrypted name or email
        const applicants = await Applicant.find({
            $or: [{ Name: encryptedQuery }, { Email: { $in: [encryptedQuery] } }]
        });
        console.log("applicants", applicants);

        // Decrypt before sending response
        const decryptedApplicants = applicants.map(applicant => ({
            ...applicant._doc,
            Name: decryptData(applicant.Name) || "Decryption failed",
            Email: applicant.Email.map(email => decryptData(email) || "Decryption failed")
        }));

        res.status(200).json({ success: true, data: decryptedApplicants });
    } catch (error) {
        console.error(" Error searching applicants:", error);
        res.status(500).json({ message: "Server error" });
    }
}





module.exports = { searchApplicants };


