const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const { body, validationResult } = require("express-validator");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || ["http://localhost:3000", "http://localhost:5173"],
  credentials: true,
}));
app.use(express.json({ limit: "10kb" }));

/* MongoDB Connection */
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/portfolio")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err.message));

/* Schema with timestamps */
const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2 },
    email: { type: String, required: true, trim: true, lowercase: true },
    message: { type: String, required: true, trim: true, minlength: 10 },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);

/* Email transporter setup - uses environment variables for security */
const getEmailTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.warn("⚠️  Email credentials not configured. Contact form will save to DB only.");
    return null;
  }

  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

/* Validation middleware */
const validateContact = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters"),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),
  body("message")
    .trim()
    .isLength({ min: 10, max: 5000 })
    .withMessage("Message must be between 10 and 5000 characters")
    .escape(), // Sanitize to prevent XSS
];

/* Contact API */
app.post("/contact", validateContact, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const { name, email, message } = req.body;

    // Save to MongoDB
    const newMessage = new Contact({ name, email, message });
    await newMessage.save();

    // Try to send email if configured
    const transporter = getEmailTransporter();
    if (transporter) {
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_USER,
          replyTo: email,
          subject: `New Portfolio Contact from ${name}`,
          html: `
            <h2>New Contact Message</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, "<br>")}</p>
          `,
          text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        });
      } catch (emailError) {
        console.error("❌ Email sending failed:", emailError.message);
        // Message still saved to DB, so don't fail the request
      }
    }

    res.status(201).json({
      success: true,
      message: "Message received! We'll get back to you soon.",
      id: newMessage._id,
    });

  } catch (err) {
    console.error("❌ Contact Form Error:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to process your message. Please try again later.",
    });
  }
});

/* AI Chat Endpoint - Powered by OpenAI GPT (with Fallback) */
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message || typeof message !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid message format",
      });
    }

    // FALLBACK MODE: If OpenAI not configured, use intelligent keyword matching
    if (!process.env.OPENAI_API_KEY) {
      console.log("⚠️  OpenAI API key not configured. Using fallback mode.");
      const fallbackResponse = getFallbackResponse(message);
      return res.json({
        success: true,
        message: fallbackResponse,
        mode: "fallback",
      });
    }

    // PRIMARY MODE: Use OpenAI GPT
    // System prompt with portfolio context
    const systemPrompt = `You are Vera, Vishwas's AI Assistant, a female AI helper representing his professional portfolio. 
Key Information:
- Vishwas created this portfolio website
- He is a full-stack developer and UI/UX designer
- 5+ years of development experience
- Built 20+ projects including web apps, calculators, to-do lists, and more
- Technologies: React, Node.js, MongoDB, TypeScript, Tailwind CSS, Python, Express, Git, Docker, and more
- Services: Web development, UI/UX design, debugging, rapid prototyping, code optimization, security implementation, accessibility consulting
- Contact: vishwasnb@gmail.com
- GitHub: https://github.com/vishwasn-b
- Available for freelance projects and collaborations
- This portfolio features Vera (AI chatbot), animated sections, contact form with emails, and more

IMPORTANT: When someone asks "Who made this?" or "Who created this?", ALWAYS mention that Vishwas created it.
Be friendly, professional, and helpful. Use casual but professional tone. You are Vera, a female AI assistant.
Direct people to contact Vishwas via email or contact form for detailed project discussions.`;

    // Call OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: message,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("❌ OpenAI API Error:", errorData);
      
      // If API key is invalid, use fallback
      if (errorData.error?.type === "invalid_request_error") {
        console.log("🔄 Invalid API key detected. Using fallback mode.");
        const fallbackResponse = getFallbackResponse(message);
        return res.json({
          success: true,
          message: fallbackResponse,
          mode: "fallback",
        });
      }
      
      throw new Error(errorData.error?.message || "OpenAI API failed");
    }

    const data = await response.json();
    const botMessage = data.choices[0].message.content;

    res.json({
      success: true,
      message: botMessage,
      mode: "openai",
    });

  } catch (err) {
    console.error("❌ Chat Error:", err.message);
    
    // Last resort: Send fallback response
    const fallbackResponse = getFallbackResponse(req.body.message || "");
    res.status(200).json({
      success: true,
      message: fallbackResponse,
      mode: "fallback",
      error: err.message,
    });
  }
});

/* Fallback Response Generator - Works without OpenAI API */
const getFallbackResponse = (userMessage) => {
  const message = userMessage.toLowerCase();
  
  // Who created it / Made it / Built it
  if (message.includes("who") && (message.includes("made") || message.includes("created") || message.includes("built"))) {
    return "Vishwas created this amazing portfolio! It showcases his full-stack development expertise with React, Node.js, MongoDB, TypeScript, Tailwind CSS, and beautiful animations like me! 🚀";
  }
  
  // Services
  if (message.includes("service") || message.includes("what can you do") || message.includes("offer")) {
    return "Vishwas offers: Web development, UI/UX design, debugging, rapid prototyping, code optimization, security implementation, and accessibility consulting. He has 5+ years of experience and is available for freelance projects! 💼";
  }
  
  // Projects
  if (message.includes("project") || message.includes("work") || message.includes("portfolio")) {
    return "Vishwas has built 20+ projects including web applications, calculators, to-do lists, and full-stack applications using React, Node.js, MongoDB, and more. Each project showcases different technologies and problem-solving skills! 🎯";
  }
  
  // Skills / Technologies / Tech Stack
  if (message.includes("skill") || message.includes("tech") || message.includes("technology") || message.includes("language")) {
    return "Vishwas's tech stack includes: Frontend (React, TypeScript, Tailwind CSS), Backend (Node.js, Express, MongoDB), Tools (Git, Docker, Mongoose), and Languages (JavaScript, Python, HTML/CSS). He's constantly learning new technologies! 🔧";
  }
  
  // Experience
  if (message.includes("experience") || message.includes("background") || message.includes("journey") || message.includes("years")) {
    return "Vishwas has 5+ years of development experience, starting from fundamentals and evolving into building production-ready full-stack applications. He's worked on 20+ projects and continues to grow his expertise in modern web technologies! 📈";
  }
  
  // Contact / How to reach
  if (message.includes("contact") || message.includes("reach") || message.includes("email") || message.includes("connect")) {
    return "You can reach Vishwas via:\n📧 Email: vishwasnb@gmail.com\n💼 GitHub: https://github.com/vishwasn-b\n📝 Contact form on this portfolio\n\nHe responds to inquiries within 24 hours! 🚀";
  }
  
  // Available / Hire / Freelance
  if (message.includes("available") || message.includes("hire") || message.includes("freelance") || message.includes("work together")) {
    return "Yes! Vishwas is available for freelance projects and collaborations. He's open to discussing new opportunities and helping turn your ideas into reality. Contact him at vishwasnb@gmail.com or use the contact form! 💪";
  }
  
  // About / Who is
  if (message.includes("about") || message.includes("who is")) {
    return "Vishwas is a full-stack developer and UI/UX designer with 5+ years of experience. He specializes in building beautiful, animated web applications using modern technologies. He created this portfolio as a showcase of his skills! ✨";
  }
  
  // Thanks / Thank you / Appreciate
  if (message.includes("thank") || message.includes("appreciate") || message.includes("thank you")) {
    return "You're welcome! I'm here to help answer any questions about Vishwas, his work, and his services. Feel free to ask me anything! 😊";
  }
  
  // Hello / Hi / Greetings
  if (message.includes("hello") || message.includes("hi") || message.includes("hey") || message.includes("greetings")) {
    return "Hi there! 👋 I'm Vera, Vishwas's AI Assistant. I'm here to answer any questions about his portfolio, skills, projects, services, or anything else you'd like to know. What can I help you with? 😊";
  }
  
  // How are you / How's it going
  if (message.includes("how are you") || message.includes("how's") || message.includes("how are")) {
    return "I'm doing great! 😄 Thanks for asking! I'm an AI assistant named Vera, here to help answer your questions about Vishwas's amazing portfolio and services. What would you like to know?";
  }
  
  // Joke / Funny / Laugh
  if (message.includes("joke") || message.includes("funny") || message.includes("laugh") || message.includes("humor")) {
    const jokes = [
      "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
      "How many programmers does it take to change a light bulb? None, that's a hardware problem! 💡",
      "Why do Java developers wear glasses? Because they don't C#! 👓",
      "Why did the developer go broke? Because he used up all his cache! 💰",
      "How do you know if someone's a JavaScript developer? Don't worry, they'll tell you! 😄"
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  }
  
  // Default response
  return "That's an interesting question! I can tell you about Vishwas's work, skills, projects, services, experience, or how to contact him. What would you like to know? Feel free to ask anything! 🤔";
};

/* Health check endpoint */
app.get("/health", (req, res) => {
  res.json({ status: "✅ Server is running", timestamp: new Date() });
});

/* 404 handler */
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Endpoint not found" });
});

/* Error handling middleware */
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});