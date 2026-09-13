import "dotenv/config";
import { connectDB } from "./src/db.js";
import Section from "./src/models/Section.js";
import mongoose from "mongoose";

const WHATSAPP_PLANS_LINK =
  "https://wa.me/917499643234?text=" +
  encodeURIComponent("Hi Yogyahar, I'd like to know more about your subscription plans.");
const WHATSAPP_PRODUCTS_LINK =
  "https://wa.me/917499643234?text=" + encodeURIComponent("Hi Yogyahar, I'd like to know more.");

const sections = {
  header: {
    navLinks: [
      { label: "Home", href: "/", active: true },
      { label: "Products", href: "/products" },
      { label: "Services", href: "/services" },
      { label: "About Us", href: "/about" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  hero: {
    eyebrow: "YOGYAHAR — Follow Your Diet With Us!",
    headingLine1: "Fresh. Natural. Hygienic.",
    headingLine2: "Tasty. Authentic.",
    paragraph:
      "No preservatives, no chemicals, no artificial colors, no added sugar, only Pure Products.",
    heroBg: "/src/assets/hero-bg.png",
    features: [
      { icon: "🌿", title: "Fresh & Natural", sub: "No Chemicals" },
      { icon: "🚫", title: "No Preservatives", sub: "No Added Sugar" },
      { icon: "🚚", title: "Doorstep Delivery", sub: "Across Nashik" },
      { icon: "🥗", title: "100% Vegetarian", sub: "Made to Order" },
    ],
  },
  aboutUs: {
    eyebrow: "About Us",
    heading: "Good Health Starts with the Right Choice!",
    paragraph1:
      "Since 2018, YOGYAHAR makes fresh, natural, hygienic, tasty, authentic diet food — protein-packed salads, cold-pressed juices, and ready-to-eat/ready-to-cook meal kits. We believe in selling Taste, Time, Knowledge, Variety, and Consistency.",
    quote: "\"We Don't Just Serve Food, We Serve a Healthier You!\"",
    vision:
      "To make available Fresh, Natural, Hygienic, Tasty, and Authentic diet food anytime at possible location.",
    mission:
      "To create a healthy nation by serving diet food at an affordable cost with a sustainable business model.",
    backgroundImage: "",
  },
  ayurvedaQuote: {
    eyebrow: "Charak Samhita · Sutra 30.26",
    sanskrit: "स्वस्थस्य स्वास्थ्य रक्षणं । आतुरस्य विकार प्रशमनं च ॥",
    hindi:
      "आयुर्वेद का मुख्य उद्देश्य स्वस्थ लोगों के स्वास्थ्य को बनाए रखना और बीमार लोगों की बीमारी को ठीक करना है।",
    english:
      "\"The main purpose of Ayurveda is to maintain the health of the healthy and to cure the disease of the ill.\"",
    backgroundImage: "",
  },
  faq: {
    faqs: [
      {
        q: "What is YOGYAHAR and what do you offer?",
        a: "YOGYAHAR is Nashik's trusted diet food brand offering fresh, natural, hygienic, tasty, and authentic ready-to-eat meals, salads, and juices.",
      },
      {
        q: "Are your meals and juices really fresh and preservative-free?",
        a: "Absolutely, every made-to-order YOGYAHAR meal and juice is prepared fresh daily using natural ingredients. No preservatives, no artificial colors, and no added sugar.",
      },
      {
        q: "What types of subscriptions do you offer?",
        a: "We offer 6 days and 25 days subscriptions. You can also order a single serving to try before starting your subscription.",
      },
      {
        q: "What are your delivery hours?",
        a: "We deliver daily from 6:00 AM to 8:00 AM and 6 PM to 8 PM across Nashik City.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept UPI, Cash, and secure online payment links.",
      },
      {
        q: "Do you provide non-veg salad?",
        a: "No, YOGYAHAR purely focuses on vegetarian diet food.",
      },
      {
        q: "Can I customize my meals?",
        a: "Our meals are mainly pre-designed, but custom plans are possible via a WhatsApp request to +91 7499643234.",
      },
    ],
  },
  footer: {
    linkGroups: [
      {
        title: "Quick Links",
        links: [
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: "About Us", href: "/about" },
          { label: "FAQ", href: "/faq" },
          { label: "Contact Us", href: "/contact" },
        ],
      },
      {
        title: "Products",
        links: [
          { label: "Juices", href: "/products" },
          { label: "Detox Water", href: "/products" },
          { label: "Salads & Fruit Cuts", href: "/products" },
          { label: "Super Laddu", href: "/products" },
          { label: "Cold Pressed Oil", href: "/products" },
        ],
      },
    ],
    aboutText:
      "Nashik's trusted diet food brand since 2018. Follow Your Diet With Us — fresh, natural, hygienic, vegetarian meals, salads and juices, delivered to your doorstep.",
    whatsappNumber: "7499643234",
    hours: "🕐 6–8 AM & 6–8 PM daily",
    address: "📍 Nashik, Maharashtra, India",
    copyright: "© 2025 YOGYAHAR All Rights Reserved.",
    tagline: "Follow Your Diet With Us!",
  },
  howItWorks: {
    eyebrow: "How It Works",
    heading: "Clean Eating, Made Simple",
    paragraph: "We make healthy living easy with a simple and efficient process.",
    steps: [
      { num: 1, title: "Choose Your Plan", desc: "Trial, 6-day or 25-day subscription" },
      { num: 2, title: "Order on WhatsApp", desc: "Message us to place or customize your order" },
      { num: 3, title: "We Prepare Fresh", desc: "Made to order daily, no preservatives" },
      { num: 4, title: "Doorstep Delivery", desc: "6–8 AM and 6–8 PM across Nashik" },
      { num: 5, title: "Eat Healthy", desc: "Enjoy fresh, vegetarian, guilt-free food" },
    ],
  },
  newsletter: {
    eyebrow: "Stay Connected",
    heading: "Never miss a single news",
    paragraph:
      "Stay informed with updates on our products and services. Stay connected and follow your diet with us!",
    social: [
      { icon: "📷", label: "Instagram", href: "https://instagram.com/yogyahar" },
      { icon: "📘", label: "Facebook", href: "https://facebook.com/yogyahar" },
      { icon: "💬", label: "WhatsApp", href: "https://wa.me/917499643234" },
      { icon: "▶️", label: "YouTube", href: "https://youtube.com/@yogyahar" },
      { icon: "💼", label: "LinkedIn", href: "https://linkedin.com/company/yogyahar" },
      { icon: "🧵", label: "Threads", href: "https://threads.net/@yogyahar" },
    ],
  },
  plans: {
    eyebrow: "Subscription Programs",
    heading: "Follow Your Diet With Us",
    paragraph:
      "We offer 6-day and 25-day subscriptions, plus a single serving trial so you can try before you subscribe.",
    whatsappLink: WHATSAPP_PLANS_LINK,
    plans: [
      {
        icon: "🥤",
        name: "Single Serving Trial",
        sub: "Try before you subscribe",
        tag: "No commitment",
        features: ["One-time order", "Any juice or salad", "Order via WhatsApp"],
        popular: false,
      },
      {
        icon: "📅",
        name: "6 Days Subscription",
        sub: "A week of goodness",
        tag: "Great for beginners",
        features: ["Daily fresh delivery", "Choice of juices/salads", "Doorstep delivery"],
        popular: true,
      },
      {
        icon: "📆",
        name: "25 Days Subscription",
        sub: "Full month transformation",
        tag: "Best value",
        features: ["Daily fresh delivery", "Customizable diet plan", "Priority doorstep delivery"],
        popular: false,
      },
    ],
  },
  products: {
    intro: "All subscription-based products are available in Weekly and Monthly packages.",
    whatsappLink: WHATSAPP_PRODUCTS_LINK,
    juices: [
      {
        name: "Carrot Juice",
        tag: "Regular",
        availability: "Throughout the year",
        makingType: "Cold Pressed",
        suitableForFast: "Yes",
        ingredients: "Fresh Carrots, Touch of Ginger, Lemon Juice",
        benefits: "Rich in Vitamin A and Beta-Carotene. Boosts immunity, improves eye health, enhances skin glow, and aids digestion.",
        precautions: "Consult doctor if managing high potassium or kidney conditions.",
        notSuitableFor: "Infants under 1 year, or individuals with severe kidney conditions.",
        dietGoal: "General Health, Detox",
        deliverySlots: "Both",
        emoji: "🥕",
        thumb: "from-[#ffe2b8] to-[#ff9a3c]",
        status: "Active",
        stockStatus: "In Stock"
      },
      {
        name: "Amla Juice",
        tag: "Regular",
        availability: "Throughout the year",
        makingType: "Cold Pressed",
        suitableForFast: "Yes",
        ingredients: "Fresh Indian Gooseberry (Amla), Mint, Clean Water",
        benefits: "Loaded with Vitamin C and antioxidant power. Strengthens hair, purifies blood, boosts immunity, and promotes digestion.",
        precautions: "People with severe hyperacidity or low blood sugar should consume in moderation.",
        notSuitableFor: "People suffering from severe hyperacidity or acute diarrhea.",
        dietGoal: "Detox, Weight Loss",
        deliverySlots: "Morning",
        emoji: "🫒",
        thumb: "from-[#e4f2c2] to-[#9ec13a]",
        status: "Active",
        stockStatus: "In Stock"
      },
      {
        name: "Green Juice",
        tag: "Regular",
        availability: "Throughout the year",
        makingType: "Cold Pressed",
        suitableForFast: "Yes",
        ingredients: "Spinach, Cucumber, Bottle Gourd, Coriander, Mint, Lemon",
        benefits: "Alkalizes the body, rich in chlorophyll & iron, flushes toxins, and supports healthy weight loss.",
        precautions: "Individuals with kidney stones (oxalate sensitivity) should consult a physician.",
        notSuitableFor: "People prone to oxalate kidney stones.",
        dietGoal: "Weight Loss, Detox",
        deliverySlots: "Morning",
        emoji: "🥬",
        thumb: "from-[#d8f2c0] to-[#6bb03a]",
        status: "Active",
        stockStatus: "In Stock"
      },
      {
        name: "Mix Juice",
        tag: "Regular",
        availability: "Throughout the year",
        makingType: "Combination of Centrifugal and Cold Pressed",
        suitableForFast: "Yes",
        ingredients: "Seasonal Fruits & Vegetables blend (Carrot, Beetroot, Apple, Pomegranate)",
        benefits: "Balanced nutrient intake, natural energy boost, improves stamina, and enhances daily vitality.",
        precautions: "Diabetic patients should monitor carbohydrate intake.",
        notSuitableFor: "Individuals with advanced diabetes unless approved by a nutritionist.",
        dietGoal: "General Health, Muscle Gain",
        deliverySlots: "Both",
        emoji: "🍹",
        thumb: "from-[#ffe8b8] to-[#ff8a4c]",
        status: "Active",
        stockStatus: "In Stock"
      },
      {
        name: "Watermelon Juice",
        tag: "Seasonal",
        availability: "Summer",
        makingType: "Centrifugal",
        suitableForFast: "Yes",
        ingredients: "Fresh Watermelon, Mint Leaves, Rock Salt",
        benefits: "Deeply hydrating, rich in Lycopene and electrolyte potassium. Keeps the body cool and refreshed.",
        precautions: "Diabetics should consume with caution due to natural glycemic response.",
        notSuitableFor: "Diabetic individuals with high blood sugar fluctuations.",
        dietGoal: "Detox, General Health",
        deliverySlots: "Evening",
        emoji: "🍉",
        thumb: "from-[#ffd2d2] to-[#ff5c6c]",
        status: "Active",
        stockStatus: "In Stock"
      },
      {
        name: "Sugarcane Juice",
        tag: "Seasonal",
        availability: "Summer",
        makingType: "Centrifugal",
        suitableForFast: "Yes",
        ingredients: "Fresh Sugarcane Extract, Ginger, Lemon, Mint",
        benefits: "Instant energy booster, supports liver health, aids digestion, and replenishes natural minerals.",
        precautions: "Not recommended for diabetic individuals.",
        notSuitableFor: "Diabetic patients.",
        dietGoal: "General Health, Muscle Gain",
        deliverySlots: "Evening",
        emoji: "🌿",
        thumb: "from-[#d8f2c0] to-[#4a9a3a]",
        status: "Active",
        stockStatus: "In Stock"
      },
      {
        name: "Beetroot Juice",
        tag: "Seasonal",
        availability: "Winter",
        makingType: "Cold Pressed",
        suitableForFast: "No",
        ingredients: "Fresh Beetroot, Pomegranate, Lemon Juice",
        benefits: "Improves blood circulation, increases hemoglobin levels, enhances athletic stamina.",
        precautions: "People prone to oxalate kidney stones should consume in moderation.",
        notSuitableFor: "Individuals with severe kidney stone history.",
        dietGoal: "Muscle Gain, Weight Loss",
        deliverySlots: "Both",
        emoji: "🍠",
        thumb: "from-[#e6c2d8] to-[#7a1f4a]",
        status: "Active",
        stockStatus: "In Stock"
      },
      {
        name: "Combination Juice",
        tag: "Special",
        availability: "Throughout the year",
        makingType: "Combination of Centrifugal and Cold Pressed",
        suitableForFast: "Yes",
        ingredients: "Tailored combination of fresh fruit and vegetable extracts",
        benefits: "Comprehensive micronutrient booster, improves overall digestive health, and boosts immunity.",
        precautions: "Check specific ingredients if you have known food allergies.",
        notSuitableFor: "Individuals with specific raw fruit/vegetable allergies.",
        dietGoal: "General Health, Detox",
        deliverySlots: "Both",
        emoji: "🧃",
        thumb: "from-[#ffe0e0] to-[#ff7a7a]",
        status: "Active",
        stockStatus: "In Stock"
      },
      {
        name: "Red Juice",
        tag: "Special",
        availability: "Throughout the year",
        makingType: "Cold Pressed",
        suitableForFast: "Yes",
        ingredients: "Beetroot, Carrot, Apple, Pomegranate",
        benefits: "High in antioxidants, promotes radiant skin, purifies blood, and aids heart health.",
        precautions: "Diabetics and kidney stone patients should consult their doctor.",
        notSuitableFor: "Individuals managing advanced diabetes or chronic kidney conditions.",
        dietGoal: "Detox, Weight Loss",
        deliverySlots: "Both",
        emoji: "🍓",
        thumb: "from-[#ffd6d6] to-[#e0435c]",
        status: "Active",
        stockStatus: "In Stock"
      },
    ],
    salads: [
      {
        name: "Salad Meal",
        tag: "Regular",
        availability: "Throughout the year",
        makingType: "Raw",
        suitableForFast: "No",
        ingredients: "Cucumber, Tomatoes, Bell Peppers, Carrots, Paneer, Mixed Seeds, Lemon Vinaigrette",
        benefits: "Complete balanced diet meal high in dietary fiber, clean plant proteins, vitamins, and minerals.",
        precautions: "Not suitable for individuals with severe digestive inflammation or raw food intolerance.",
        notSuitableFor: "Individuals with severe raw food digestive intolerance or acute IBS.",
        dietGoal: "Weight Loss, Muscle Gain",
        deliverySlots: "Both",
        emoji: "🥗",
        thumb: "from-[#e2f0c8] to-[#7fae3a]",
        status: "Active",
        stockStatus: "In Stock"
      },
      {
        name: "Fruit Cuts",
        tag: "Seasonal",
        availability: "Throughout the year",
        makingType: "Raw",
        suitableForFast: "Yes",
        ingredients: "Assorted Fresh Seasonal Fruits (Apple, Papaya, Pomegranate, Kiwi, Muskmelon)",
        benefits: "Natural digestive enzymes, vital vitamins, minerals, and instant cellular hydration.",
        precautions: "Diabetic patients should monitor overall fruit sugar intake.",
        notSuitableFor: "Diabetic individuals with uncontrolled glucose levels.",
        dietGoal: "Detox, General Health",
        deliverySlots: "Morning",
        emoji: "🍎",
        thumb: "from-[#f7e8ee] to-[#f0d5e0]",
        status: "Active",
        stockStatus: "In Stock"
      },
      {
        name: "Salad Bowl",
        tag: "Special",
        availability: "Throughout the year",
        makingType: "Semi-Boiled",
        suitableForFast: "No",
        ingredients: "Blanched Broccoli, Steamed Sweet Corn, Sprouts, Cherry Tomatoes, Olive Oil Dressing",
        benefits: "Gentle on stomach, easy digestion, rich in micronutrients, antioxidants, and gut-friendly fiber.",
        precautions: "Check dressing components for seed allergies.",
        notSuitableFor: "People with known seed/dressing allergies.",
        dietGoal: "Weight Loss, Detox",
        deliverySlots: "Evening",
        emoji: "🥙",
        thumb: "from-[#ffe8b8] to-[#ff8a4c]",
        status: "Active",
        stockStatus: "In Stock"
      },
      {
        name: "Sprout Salad",
        tag: "Regular",
        availability: "Throughout the year",
        makingType: "Raw",
        suitableForFast: "Yes",
        ingredients: "Sprouted Mung Beans, Chana (Chickpeas), Pomegranate, Onion, Coriander, Lemon",
        benefits: "Powerhouse of living enzymes, high bioavailable protein, aids weight loss and gut health.",
        precautions: "May cause gas/bloating in people sensitive to raw legumes; consume moderate portions.",
        notSuitableFor: "People with highly sensitive stomachs prone to bloating from raw legumes.",
        dietGoal: "Muscle Gain, Weight Loss",
        deliverySlots: "Both",
        emoji: "🌱",
        thumb: "from-[#d8f2c0] to-[#6bb03a]",
        status: "Active",
        stockStatus: "In Stock"
      },
    ],
    nonSubItems: [
      { name: "Super Laddu", desc: "Made with natural, wholesome ingredients", emoji: "🍡", thumb: "from-[#e8d2a8] to-[#a87b3a]" },
      { name: "Cold Pressed Oil", desc: "Wood pressed & chemical free", emoji: "🫙", thumb: "from-[#fff0c8] to-[#d4952a]" },
    ],
    detoxHeading: "Detox Water",
    detoxSub: "Detox Water • Subscription-based",
    detoxText: "Cleanse, Hydrate, Refresh — your daily detox, made simple.",
    detoxImage: "",
  },
  statsBar: {
    stats: [
      { icon: "😊", number: "1400+", label: "Registered Happy Customers" },
      { icon: "🥗", number: "100+", label: "Salads and Juices" },
      { icon: "🛵", number: "180+", label: "Km of Daily Doorstep Delivery" },
      { icon: "🤝", number: "50+", label: "Direct-Indirect Employment" },
    ],
  },
  testimonials: {
    testimonials: [
      {
        initials: "RP",
        name: "Dr. Rupali Pade",
        role: "Dentist",
        text: "Yogyahar's juices make me feel fresh and rejuvenated every day — sugar-free and remarkably consistent service.",
        image: "",
      },
      {
        initials: "RS",
        name: "Rishikesh Sonawane",
        role: "Civil Engineer",
        text: "A promising start-up known for excellent service and timely delivery, every single day.",
        image: "",
      },
      {
        initials: "UP",
        name: "Ujjwala Kiran Petkar",
        role: "Banker",
        text: "Their morning delivery of health-promoting juice has genuinely become a part of my healthy routine.",
        image: "",
      },
      {
        initials: "RB",
        name: "Rahul Bhamre",
        role: "Advisory System Analyst",
        text: "Refreshed and fantastic! My 30-day juice cleanse with Yogyahar was a great experience.",
        image: "",
      },
    ],
  },
  contactUs: {
    title: "We'd Love to Hear From You!",
    description: "Have a question, feedback, or just want to say hello? We're here for you. Reach out to us and we'll get back to you as soon as possible.",
    locationName: "YOGYAHAR",
    address: "Nashik, Maharashtra, India",
    phone: "+91 12345 67890",
    phoneHours: "(Mon - Sat, 9 AM - 7 PM)",
    email1: "hello@yogyahar.com",
    email2: "wecare@yogyahar.com",
    workingDays: "Monday - Saturday",
    workingHours: "09:00 AM - 07:00 PM",
    backgroundImage: "",
  },
  aboutPage: {
    eyebrow: "ABOUT STANDALONE PAGE",
    heading: "Providing Wholesome Diet Nutrition Since 2018",
    paragraph1: "Welcome to our standalone About page! We make fresh, natural, hygienic, tasty, authentic diet food. We believe in selling Taste, Time, Knowledge, Variety, and Consistency.",
    quote: "\"Nourishing your body with local healthy products, delivered fresh daily.\"",
    mission: "To create a healthy nation by serving diet food at an affordable cost with a sustainable business model.",
    vision: "To make available Fresh, Natural, Hygienic, Tasty, and Authentic diet food anytime at possible location.",
    backgroundImage: "",
    storyImage: "",
    ctaHeading1: "Ready To Start Your",
    ctaHeading2: "Health Journey?",
    ctaDescription: "Join thousands of happy customers who trust YOGYAHAR to fuel their body and nourish their life.",
    ctaButtonText: "Explore Products",
    ctaButtonLink: "/products",
    ctaImage: "",
  },
  servicesPage: {
    heroHeading: "Tailored Plans for Your Health Goals",
    heroParagraph: "We deliver delicious, portion-controlled diet food across Nashik to fit your lifestyle.",
    heroImage: "",
    audienceCards: [
      {
        title: "Office Professionals",
        text: "Fuel your productive workdays with Yogyahar's desk-friendly meal plans. Convenient, nourishing, and delivered fresh to help corporate professionals maintain peak focus without the midday slump.",
        image: "",
      },
      {
        title: "Gym & Fitness Lovers",
        text: "Support your active lifestyle and workout recovery with Yogyahar's high-protein bowls and clean energy snacks. Carefully portioned and nutrient-dense fuel designed specifically for fitness enthusiasts.",
        image: "",
      },
      {
        title: "Weight Loss Followers",
        text: "Reach your weight management goals naturally with Yogyahar's low-calorie, high-fiber salads and detox programs. Enjoy calorie-conscious portions that are incredibly satisfying and delicious.",
        image: "",
      },
      {
        title: "Family & Seniors",
        text: "Bring wholesome nutrition to your dinner table. Yogyahar provides easy-to-digest, vitamin-rich fruit and veggie selections crafted to promote longevity, health, and vitality for your entire family.",
        image: "",
      },
    ],
    steps: [
      {
        step: "01",
        title: "Choose Your Plan",
        text: "Browse our menu and select a weekly or monthly subscription that matches your lifestyle.",
      },
      {
        step: "02",
        title: "Customize & Schedule",
        text: "Personalize ingredients and pick your delivery time slots for home or office.",
      },
      {
        step: "03",
        title: "Fresh Daily Delivery",
        text: "Our team prepares your meals fresh every morning and delivers them cold to your doorstep.",
      },
    ],
  },
  blogs: {
    eyebrow: "YOGYAHAR KNOWLEDGE HUB",
    heading: "Insights for Health & Wellness",
    paragraph: "Articles, recipes, detox guides, and Ayurvedic wellness wisdom to nourish your body and mind every day.",
    posts: [
      {
        id: "1",
        slug: "cold-pressed-juices-daily-detox",
        title: "Why Cold-Pressed Juices Are Superior for Daily Detox & Energy",
        excerpt: "Discover how cold-pressed extraction preserves vital living enzymes, vitamins, and antioxidants compared to conventional centrifugal blending.",
        category: "Detox & Cleanse",
        date: "July 20, 2025",
        readTime: "4 min read",
        author: "Dr. Ananya Sharma",
        authorTitle: "Ayurvedic Practitioner & Wellness Lead",
        image: "/images/healthy_juices_spotlight.png",
        thumbGradient: "from-[#e4f2c2] to-[#9ec13a]",
        featured: true,
        status: "Active",
        toc: [
          { label: "1. Introduction", href: "#" },
          { label: "2. Core Health Benefits", href: "#" },
          { label: "3. Ayurvedic Recommendations", href: "#" },
          { label: "4. Routine Incorporation", href: "#" }
        ],
        cta: {
          title: "Enjoyed this article?",
          text: "Subscribe to fresh cold-pressed juices and high-protein salad meals delivered daily in Nashik.",
          buttonText: "Explore Fresh Products",
          buttonLink: "/products"
        },
        content: `
          <p class="lead text-lg font-medium text-stone-700 mb-6">In recent years, cold-pressed juices have evolved from a trendy health wellness routine into a scientifically-proven nutritional staple. But what makes cold-pressed juicing fundamentally superior to traditional centrifugal juicers?</p>
          
          <h2 class="text-2xl font-bold text-[#1f2b12] mt-8 mb-4">The Science Behind Cold-Pressed Hydraulic Extraction</h2>
          <p class="mb-4 text-stone-600 leading-relaxed">Unlike traditional high-speed juicers whose spinning blades create heat friction and drag massive amounts of air into the liquid—causing rapid oxidation and heat degradation of delicate vitamins—cold-pressed hydraulic extraction gently presses fresh fruits and vegetables under tons of pressure without heat exposure.</p>
          
          <h3 class="text-xl font-bold text-[#2f4a1f] mt-6 mb-3">Key Health Benefits of Daily Juicing</h3>
          <ul class="space-y-2 mb-6 text-stone-600">
            <li class="flex items-start gap-2">✔ <strong>Maximum Bioavailability:</strong> Retains up to 3x more vitamins A, C, E, and plant antioxidants.</li>
            <li class="flex items-start gap-2">✔ <strong>Cellular Absorption:</strong> Allows your digestive system a resting window while delivering instant hydration directly into your bloodstream.</li>
            <li class="flex items-start gap-2">✔ <strong>100% Pure:</strong> No added refined sugar, artificial flavors, preservatives, or diluting concentrates.</li>
          </ul>

          <h2 class="text-2xl font-bold text-[#1f2b12] mt-8 mb-4">How to Integrate Cold-Pressed Juices into Your Life</h2>
          <p class="mb-4 text-stone-600 leading-relaxed">We recommend enjoying a 300ml bottle of fresh <em>Carrot-Beet-Ginger</em> or <em>Amla Green Juice</em> every morning on an empty stomach to kickstart your metabolism and boost immunity.</p>
        `
      },
      {
        id: "2",
        slug: "power-of-high-protein-salads",
        title: "The Power of High-Protein Salads in Sustainable Weight Loss",
        excerpt: "Learn how pairing raw microgreens, sprouts, organic seeds, and plant proteins keeps you satisfied, regulates blood sugar, and boosts metabolism.",
        category: "Nutrition & Diet",
        date: "July 15, 2025",
        readTime: "5 min read",
        author: "Chef Rohan Deshmukh",
        authorTitle: "Nutrition & Culinary Lead",
        image: "/src/assets/fitness_lovers.png",
        thumbGradient: "from-[#e2f0c8] to-[#7fae3a]",
        featured: false,
        status: "Active",
        toc: [
          { label: "1. Satiety & Energy", href: "#" },
          { label: "2. The Salad Blueprint", href: "#" },
          { label: "3. Smart Dressings", href: "#" }
        ],
        cta: {
          title: "Want to try our custom Salads?",
          text: "Order our customized high-protein bowls packed with seeds, sprouts, and premium vegetables.",
          buttonText: "Order Salads Now",
          buttonLink: "/products"
        },
        content: `
          <p class="lead text-lg font-medium text-stone-700 mb-6">Sustainable weight loss isn't about restrictive starvation; it's about supplying high-density micro-nutrients that satisfy your body's cellular hunger and stabilize energy.</p>
          
          <h2 class="text-2xl font-bold text-[#1f2b12] mt-8 mb-4">Anatomy of a High-Protein Salad Meal</h2>
          <p class="mb-4 text-stone-600 leading-relaxed">Combining sprouted grains, crisp seasonal greens, and cold-pressed seeds provides a complete amino-acid profile while offering rich dietary fiber.</p>

          <h3 class="text-xl font-bold text-[#2f4a1f] mt-6 mb-3">Key Ingredients for Satiety</h3>
          <ul class="space-y-2 mb-6 text-stone-600">
            <li class="flex items-start gap-2">✔ <strong>Sprouted Mung & Chickpeas:</strong> High-protein, easily digestible bio-active nutrients.</li>
            <li class="flex items-start gap-2">✔ <strong>Walnuts & Pumpkin Seeds:</strong> Healthy Omega-3 fats for brain clarity and heart health.</li>
            <li class="flex items-start gap-2">✔ <strong>Raw Leafy Greens:</strong> Loaded with natural chlorophyl and essential minerals.</li>
          </ul>
        `
      },
      {
        id: "3",
        slug: "ayurvedic-habits-for-natural-digestion",
        title: "5 Simple Ayurvedic Habits for Natural Digestion & High Energy",
        excerpt: "Integrate ancient Dinacharya wellness principles into modern daily schedules for improved Agni (digestive fire) and mental clarity.",
        category: "Ayurvedic Living",
        date: "July 08, 2025",
        readTime: "6 min read",
        author: "Vaidya Suresh Patil",
        authorTitle: "Ayurvedic Doctor",
        image: "/src/assets/family_seniors.png",
        thumbGradient: "from-[#ffe8b8] to-[#ff8a4c]",
        featured: false,
        status: "Active",
        toc: [
          { label: "1. Agni Principles", href: "#" },
          { label: "2. The 5 Daily Habits", href: "#" },
          { label: "3. Healthy Routine Planning", href: "#" }
        ],
        cta: {
          title: "Get Ayurvedic Consultation",
          text: "Connect with our certified practitioners to understand your body constitution (Dosha) and diet map.",
          buttonText: "Consult Now",
          buttonLink: "/contact"
        },
        content: `
          <p class="lead text-lg font-medium text-stone-700 mb-6">In Ayurveda, a strong <em>Agni</em> (digestive fire) is considered the cornerstone of physical longevity, clear skin, and vibrant mental clarity. Without balanced digestion, even the healthiest foods cannot be fully assimilated by the body's tissues.</p>

          <h2 class="text-2xl font-bold text-[#1f2b12] mt-8 mb-4">Understanding Agni: The Centerpiece of Health</h2>
          <p class="mb-4 text-stone-600 leading-relaxed">According to the classical text <em>Charak Samhita</em>, Agni governs not just digestion but also our internal heat, cellular intelligence, and mental energy. When Agni is weak (Mandagni), it creates a toxic metabolic byproduct known as <strong>Ama</strong>, which is the root cause of chronic sluggishness and physical discomfort.</p>

          <h2 class="text-2xl font-bold text-[#1f2b12] mt-8 mb-4">5 Habits to Practice Daily</h2>
          <ol class="list-decimal pl-6 space-y-3 text-stone-600 mb-6">
            <li><strong>Copper Vessel Water:</strong> Hydrate with copper-infused water (Tamra Jal) first thing in the morning to balance all three Doshas (Vata, Pitta, and Kapha).</li>
            <li><strong>Eat Fresh & Seasonal:</strong> Align your dietary choices with seasonal fruits and vegetables to keep your gut microbiome resilient.</li>
            <li><strong>Main Meal at Midday:</strong> Eat your largest meal when Agni is naturally strongest at noon, matching the highest position of the sun.</li>
            <li><strong>Mindful Chewing:</strong> Chew each bite thoroughly to initiate salivary digestive enzymes and prevent bloating.</li>
            <li><strong>Early Dinner Window:</strong> Finish dinner early (before 8 PM) to allow complete cellular healing and detoxification overnight.</li>
          </ol>

          <h2 class="text-2xl font-bold text-[#1f2b12] mt-8 mb-4">Healthy Routine Planning</h2>
          <p class="mb-4 text-stone-600 leading-relaxed">To transition into an Ayurvedic schedule, begin by drinking warm water with lemon and ginger slices in the morning to stimulate peristalsis. Next, replace heavy cold breakfasts with warm, freshly cooked grains or hot herbal teas. By respecting your body's circadian rhythm, you will experience natural weight regulation and sustained mental clarity throughout the day.</p>
        `
      },
      {
        id: "4",
        slug: "super-laddus-guilt-free-snacking",
        title: "Super Laddus: The Guilt-Free Energy Snack for Busy Professionals",
        excerpt: "Handcrafted from premium dry fruits, seeds, and wood-pressed ghee without refined sugar—the perfect healthy snack for active lifestyles.",
        category: "Healthy Recipes",
        date: "June 28, 2025",
        readTime: "4 min read",
        author: "Team Yogyahar",
        authorTitle: "Wellness & Nutrition Team",
        image: "/src/assets/weight_loss.png",
        thumbGradient: "from-[#e8d2a8] to-[#a87b3a]",
        featured: false,
        status: "Active",
        toc: [
          { label: "1. Midday Fatigue", href: "#" },
          { label: "2. Nutritional Profile", href: "#" },
          { label: "3. Delivery Information", href: "#" }
        ],
        cta: {
          title: "Try Our Fresh Super Laddus!",
          text: "Handcrafted with premium dates, dry fruits, seeds, and local wood-pressed ghee.",
          buttonText: "Browse Laddus",
          buttonLink: "/products"
        },
        content: `
          <p class="lead text-lg font-medium text-stone-700 mb-6">Mid-afternoon energy crashes often drive us toward processed sugary snacks. Yogyahar Super Laddus are handcrafted to deliver sustained vitality with zero guilt.</p>

          <h2 class="text-2xl font-bold text-[#1f2b12] mt-8 mb-4">Combating Midday Fatigue Naturally</h2>
          <p class="mb-4 text-stone-600 leading-relaxed">For most corporate professionals and active individuals, 4:00 PM is a challenging hour. Traditional options like caffeine, refined sugar cookies, and fried snacks cause quick insulin spikes followed by rapid exhaustion. Super Laddus solve this problem by leveraging complex plant-based carbohydrates and healthy fats that release energy slowly into your bloodstream.</p>

          <h2 class="text-2xl font-bold text-[#1f2b12] mt-8 mb-4">Nutritional Profile: What's Inside?</h2>
          <p class="mb-4 text-stone-600 leading-relaxed">Each Yogyahar Super Laddu is a compact power cell containing:</p>
          <ul class="list-disc pl-6 space-y-2 text-stone-600 mb-6">
            <li><strong>Premium Dry Fruits:</strong> Walnuts, almonds, and cashews packed with minerals.</li>
            <li><strong>Organic Seed Blend:</strong> Pumpkin seeds, flaxseeds, and sunflower seeds containing rich Omega-3 fatty acids.</li>
            <li><strong>Natural Sweeteners:</strong> Dates and raw figs with no refined cane sugar.</li>
            <li><strong>Local Wood-Pressed Ghee:</strong> Promotes lubricating joints and supports absorption of fat-soluble vitamins.</li>
          </ul>

          <h2 class="text-2xl font-bold text-[#1f2b12] mt-8 mb-4">Fresh Doorstep Delivery</h2>
          <p class="mb-4 text-stone-600 leading-relaxed">Prepared in small batches under hygienic conditions, our laddus are delivered directly across Nashik so you always have a pack of healthy fuel ready at your desk or home pantry.</p>
        `
      }
    ]
  },
  joinTeamPage: {
    status: "Active",
    eyebrow: "YOGYAHAR CAREERS",
    heroHeadingLine1: "Join Our Team &",
    heroHeadingLine2: "Grow With Us",
    heroParagraph: "Explore current job openings & detailed job descriptions. Build a meaningful career in Nashik's leading fresh wellness & nutrition brand.",
    stayUpdatedHeading: "Stay Updated with YOGYAHAR Careers",
    stayUpdatedSubtext: "Looking for upcoming roles? Contact our HR desk directly on WhatsApp for new position alerts.",
    stayUpdatedButtonText: "Get Job Alerts on WhatsApp",
    stayUpdatedWhatsappNumber: "917499643234",
    openingsSectionSubheading: "Current Opportunities in Nashik",
    openingsSectionHeading: "Job Descriptions & Openings",
    whyBuildCareerHeading: "Why Build Your Career With YOGYAHAR?",
    openings: [
      {
        id: "delivery",
        role: "Delivery Executive",
        type: "Full-time / Part-time · Field",
        location: "Nashik City",
        description: "Join our delivery team in Nashik! Deliver fresh, organic cold-pressed juices & fruit bowls to active subscribers every morning (6–9 AM) and evening (5–7 PM).",
        responsibilities: [
          "Ensure on-time doorstep delivery to active subscribers in designated Nashik routes",
          "Maintain cold-chain freshness and bottle handling safety",
          "Handle customer delivery acknowledgments and WhatsApp updates"
        ],
        requirements: [
          "Own two-wheeler & valid driving license",
          "Familiarity with Nashik city roads & locations",
          "Punctual, dependable, and courteous attitude",
          "Basic smartphone operation (WhatsApp & Google Maps)"
        ],
        perks: "Competitive daily/monthly pay + Fuel Allowance + Free Daily Healthy Meal + Monthly Incentives",
        color: "from-[#1f3717] to-[#12240e]",
        accent: "#cfe04a",
        status: "Active"
      },
      {
        id: "kitchen",
        role: "Kitchen Preparation Staff",
        type: "Full-time · Kitchen Hub",
        location: "Nashik Main Kitchen",
        description: "Prepare fresh organic fruit cuts, salads, and cold-pressed juices daily in our state-of-the-art hygienic kitchen hub.",
        responsibilities: [
          "Washing, peeling, and precision cutting of fresh fruits & vegetables",
          "Operating cold-press juice extractors maintaining 100% purity standards",
          "Hygienic eco-packaging, sealing, and batch labeling"
        ],
        requirements: [
          "High standard of personal cleanliness & hygiene",
          "Prior kitchen or food handling experience preferred",
          "Ability to start early morning shifts",
          "Team-oriented work ethic"
        ],
        perks: "Attractive Monthly Salary + Daily Free Healthy Meals + Paid Leave + Clean Workplace",
        color: "from-[#2f4a1f] to-[#1a2d12]",
        accent: "#cfe04a",
        status: "Active"
      },
      {
        id: "support",
        role: "Customer Relations & Operations",
        type: "Full-time · Office / Hybrid",
        location: "Nashik Office",
        description: "Manage subscriber queries, process daily delivery pause/resume requests, and coordinate with delivery teams to ensure 100% customer satisfaction.",
        responsibilities: [
          "Handling inbound subscriber inquiries via WhatsApp & Phone",
          "Managing daily subscription pause, resume, and plan modification logs",
          "Resolving delivery or quality feedback promptly"
        ],
        requirements: [
          "Fluent in Marathi & Hindi (English is a plus)",
          "Proficient in WhatsApp Business & basic spreadsheets",
          "Customer-first empathetic problem-solving skills"
        ],
        perks: "Competitive Monthly Fixed Salary + Performance Bonuses + Friendly Work Environment",
        color: "from-[#3a2028] to-[#1f0e13]",
        accent: "#ffb3c8",
        status: "Active"
      },
      {
        id: "marketing",
        role: "Sales & Local Outreach Associate",
        type: "Full-time · Field & Digital",
        location: "Nashik Region",
        description: "Drive YOGYAHAR's mission forward by establishing subscription tie-ups with corporate offices, fitness centers, gyms, and residential communities.",
        responsibilities: [
          "Building partnerships with local gyms, yoga studios, & corporate hubs in Nashik",
          "Organizing fresh trial sampling events and subscriber drive campaigns",
          "Managing local promotional channels and customer referrals"
        ],
        requirements: [
          "Energetic & persuasive communication skills",
          "Local networking familiarity in Nashik",
          "Passion for health, wellness, and organic living"
        ],
        perks: "Base Salary + High Commission per Subscription + Travel Allowance",
        color: "from-[#1a2e3b] to-[#0e1a24]",
        accent: "#7dd3fc",
        status: "Active"
      }
    ],
    values: [
      { title: "Health & Wellness Mission", text: "Work with a brand dedicated to delivering 100% natural, preservative-free fresh food.", status: "Active" },
      { title: "Supportive Culture", text: "Enjoy a positive, respectful work environment where every team member is valued.", status: "Active" },
      { title: "Free Healthy Meals", text: "Receive daily fresh organic meals and fruit juices as part of your team perks.", status: "Active" },
      { title: "Career Growth", text: "Opportunity to grow into leadership roles as YOGYAHAR expands across Maharashtra.", status: "Active" }
    ]
  }
};

async function run() {
  await connectDB();

  for (const [key, data] of Object.entries(sections)) {
    await Section.findOneAndUpdate({ key }, { key, data }, { upsert: true, new: true });
    console.log(`Seeded section: ${key}`);
  }

  await mongoose.disconnect();
  console.log("Done.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
