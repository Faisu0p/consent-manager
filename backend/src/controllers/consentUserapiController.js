import consentUserapiModel from '../models/consentUserapiModel.js';

export const getUsersWhoGaveConsent = async (req, res) => {
    try {
        const users = await consentUserapiModel.getUsersWithConsent();
        res.status(200).json({ success: true, users });
    } catch (error) {
        console.error('Error fetching users with consent:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const getUsersWhoDidNotGiveConsent = async (req, res) => {
    try {
        const users = await consentUserapiModel.getUsersWithoutConsent();
        res.status(200).json({ success: true, users });
    } catch (error) {
        console.error('Error fetching users without consent:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
