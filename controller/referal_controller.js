const { PrismaClient } = require("@prisma/client");
const { referalnoti } = require("../config/mailers");
const prisma = new PrismaClient();

module.exports.create = async (req, res) => {
    try {
        const { referrerName, referrerEmail, refereeName, refereeEmail } = req.body;

        // Input validation
        if (!referrerName || !referrerEmail || !refereeName || !refereeEmail) {
            return res.status(400).json({
                message: "All fields are required!",
                success: false
            });
        }
        
        if(referrerEmail === refereeEmail){
            return res.status(402).json({
                message: "You can't refer your self!",
                success: false
            });
        }
        // Check if refereeEmail already exists
        const existingReferee = await prisma.referral.findFirst({
            where: {
                refereeEmail: refereeEmail
            }
        });

        if (existingReferee) {
            return res.status(401).json({
                message: "Referee with this email already exists!",
                success: false
            });
        }

        // Create new referral
        const newReferee = await prisma.referral.create({
            data: {
                referrerName,
                referrerEmail,
                refereeName,
                refereeEmail
            }
        });
        await referalnoti(newReferee.referrerName,newReferee.refereeName,newReferee.refereeEmail,newReferee.referrerEmail)
        return res.status(200).json({
            message: "User registered successfully!",
            success: true,
            Referee: newReferee
        });
        
    } catch (error) {
        console.error("Error in creating referral:", error);
        return res.status(500).json({
            message: "Internal server error in registering the user",
            error: error.message
        });
    } finally {
        await prisma.$disconnect(); // Disconnect Prisma Client after use
    }
};
