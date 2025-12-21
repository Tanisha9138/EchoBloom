import express from "express";
import fetch from "node-fetch";

const router = express.Router();

// Language code mapping
const languageCodeMap = {
  'Spanish': 'es',
  'Chinese': 'zh-CN',
  'Hindi': 'hi',
  'Arabic': 'ar',
  'French': 'fr',
  'German': 'de',
  'Japanese': 'ja',
  'Portuguese': 'pt',
  'Russian': 'ru',
  'Italian': 'it',
  'Korean': 'ko',
  'English': 'en'
};

router.post("/translate", async (req, res) => {
  try {
    const { text, targetLanguage } = req.body;

    // Validate input
    if (!text || !targetLanguage) {
      return res.status(400).json({
        success: false,
        message: "Text and target language are required"
      });
    }

    // Get language code
    const targetLangCode = languageCodeMap[targetLanguage] || targetLanguage.toLowerCase();

    console.log(`✨ Translating to ${targetLanguage} (${targetLangCode})...`);

    // Use MyMemory Translation API (free, no API key needed)
    const encodedText = encodeURIComponent(text);
    const url = `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=en|${targetLangCode}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.responseStatus === 200 && data.responseData) {
      console.log(`✅ Translation successful!`);
      
      return res.status(200).json({
        success: true,
        translation: data.responseData.translatedText
      });
    } else {
      throw new Error('Translation failed');
    }

  } catch (error) {
    console.error('❌ Translation error:', error.message);
    
    return res.status(500).json({
      success: false,
      message: "An error occurred during translation. Please try again.",
      error: error.message
    });
  }
});

export default router;