import PolicyPage from "./PolicyPage";

const defaultContent = {
  "title": "Disclaimer",
  "legalEntity": "VRB PRODUCTS",
  "website": "www.yogyahar.com",
  "effectiveDate": "01 April 2026",
  "updatedOn": "01 April 2026",
  "intro": "This Disclaimer applies to the website www.yogyahar.com, products, services, communications, marketing materials and other content provided by YOGYAHAR, a brand operated by VRB PRODUCTS.\n\nBy accessing or using our website, purchasing our products, subscribing to our services, or relying on information provided by YOGYAHAR, you acknowledge and agree to this Disclaimer.",
  "sections": [
    {
      "heading": "General Information",
      "body": "YOGYAHAR provides fresh, natural, hygienic, tasty and authentic diet-food and beverage products intended to support convenient and healthier eating habits.\nOur products may include:\n- Fresh juices\n- Cold-pressed juices\n- Salad meals\n- Salad bowls\n- Sprouts salads\n- Fruit cuts\n- Detox water\n- Healthy snacks\n- Ready-to-eat products\n- Other food and beverage products introduced from time to time\nInformation provided by YOGYAHAR is intended primarily for general product, food, nutrition and wellness-related information."
    },
    {
      "heading": "Not Medical Advice",
      "body": "Information provided on the YOGYAHAR website, product materials, social-media pages, advertisements, blogs, messages, brochures, pamphlets or other communications is not medical advice.\nYOGYAHAR is a food and beverage business and is not a medical, clinical or healthcare service provider.\nNothing provided by YOGYAHAR should be interpreted as:\n- Medical diagnosis;\n- Medical treatment;\n- A prescription;\n- Professional medical advice;\n- A substitute for consultation with a qualified healthcare professional; or\n- A guarantee of treatment or recovery.\nIf you have a medical condition or specific health concern, you should consult an appropriately qualified healthcare professional before changing your diet or consuming any product for a health-related purpose."
    },
    {
      "heading": "No Guarantee of Health Outcomes",
      "body": "YOGYAHAR promotes healthier eating habits and provides diet-oriented food and beverage options.\nHowever, individual nutritional requirements, health conditions, lifestyle factors and responses to food vary.\nTherefore, YOGYAHAR does not guarantee or promise:\n- Weight loss;\n- Weight gain;\n- Disease prevention;\n- Disease treatment;\n- Disease reversal;\n- Reduction of blood sugar;\n- Reduction of blood pressure;\n- Reduction of cholesterol;\n- Improved immunity;\n- Improved digestion;\n- Treatment of any medical condition; or\n- Any specific health or medical outcome,\nunless expressly required under applicable law.\nAny statements regarding potential nutritional or wellness benefits are intended as general information and should not be interpreted as a medical claim unless specifically authorized and legally applicable."
    },
    {
      "heading": "Individual Nutritional Requirements",
      "body": "Different individuals have different nutritional requirements.\nFactors such as:\n- Age;\n- Gender;\n- Lifestyle;\n- Physical activity;\n- Existing health conditions;\n- Medication;\n- Allergies;\n- Dietary restrictions;\n- Pregnancy;\n- Personal tolerance; and\n- Other individual circumstances\nmay affect whether a particular food or beverage is suitable for an individual.\nCustomers are responsible for determining whether a product is appropriate for their personal circumstances.\nWhere appropriate, customers should seek advice from a qualified dietitian, nutritionist, doctor or other healthcare professional."
    },
    {
      "heading": "Health Conditions",
      "body": "Customers with existing or suspected health conditions should exercise appropriate caution before consuming diet-oriented products.\nThis includes, without limitation, individuals with:\n- Diabetes;\n- Hypertension;\n- Heart conditions;\n- Kidney conditions;\n- Liver conditions;\n- Digestive disorders;\n- Food allergies;\n- Food intolerances;\n- Pregnancy-related dietary requirements; or\n- Other medical conditions.\nYOGYAHAR does not claim that its products diagnose, prevent, cure or treat these conditions.\nA customer’s healthcare professional should determine whether a particular food or dietary product is suitable."
    },
    {
      "heading": "Food Allergies and Intolerances",
      "body": "YOGYAHAR products may contain or come into contact with various food ingredients.\nCustomers are responsible for informing YOGYAHAR about known food allergies, intolerances or dietary restrictions before ordering where relevant.\nIf you have a severe or potentially life-threatening allergy, please contact YOGYAHAR before placing an order.\nAlthough we take reasonable precautions regarding food preparation and hygiene, YOGYAHAR cannot guarantee that every product or production environment is completely free from traces of every possible allergen unless expressly stated.\nCustomers with serious allergies should make an informed decision and seek professional advice where appropriate."
    },
    {
      "heading": "Fresh and Perishable Products",
      "body": "Many YOGYAHAR products are fresh and perishable.\nThese products may include:\n- Fresh juices;\n- Salads;\n- Salad meals;\n- Sprouts;\n- Fruit cuts;\n- Detox water; and\n- Other freshly prepared food products.\nBecause these products are fresh:\n- Natural variations may occur;\n- Colour, taste, texture and appearance may vary;\n- Shelf life may be limited;\n- Refrigeration may be required;\n- Products may need to be consumed promptly.\nCustomers must follow the storage and consumption instructions provided with the product.\nYOGYAHAR is not responsible for deterioration caused by improper storage, handling or delayed consumption after delivery."
    },
    {
      "heading": "Natural Product Variation",
      "body": "YOGYAHAR uses natural food ingredients such as fruits, vegetables, sprouts and other ingredients.\nNatural ingredients can vary depending on:\n- Season;\n- Variety;\n- Source;\n- Ripeness;\n- Availability;\n- Weather;\n- Agricultural conditions; and\n- Other natural factors.\nTherefore, minor variations in taste, colour, aroma, texture, size and appearance do not necessarily indicate a product defect."
    },
    {
      "heading": "Seasonal and Regional Availability",
      "body": "Certain YOGYAHAR products may be based on regional or seasonal ingredients.\nAvailability may therefore vary depending on:\n- Season;\n- Supply;\n- Market availability;\n- Quality of raw materials;\n- Weather; and\n- Other operational factors.\nYOGYAHAR may modify or temporarily discontinue products when suitable ingredients are unavailable."
    },
    {
      "heading": "Product Information",
      "body": "We make reasonable efforts to provide accurate information regarding our products.\nHowever, product information may change from time to time.\nInformation displayed on the website may include:\n- Product descriptions;\n- Product photographs;\n- Ingredients;\n- Nutritional information, where provided;\n- Serving information;\n- Product availability;\n- Prices; and\n- Other product-related information.\nCustomers should review the information supplied with the actual product and contact YOGYAHAR if they require clarification before consumption."
    },
    {
      "heading": "Product Images",
      "body": "Photographs and images displayed on the website, social media, advertisements or other marketing materials are primarily for representation and illustration.\nActual products may differ slightly in:\n- Colour;\n- Size;\n- Shape;\n- Texture;\n- Presentation;\n- Packaging; or\n- Appearance.\nSuch differences may occur due to natural ingredients, seasonal variations, photography, screen settings or product availability."
    },
    {
      "heading": "Nutritional Information",
      "body": "Where nutritional or ingredient information is provided, it is intended for general informational purposes.\nNutritional values may vary depending on:\n- Ingredient variety;\n- Ingredient quantity;\n- Seasonal variation;\n- Preparation method;\n- Product formulation; and\n- Other factors.\nCustomers requiring precise nutritional information for medical or clinical purposes should consult an appropriately qualified professional."
    },
    {
      "heading": "RASAHAR Information",
      "body": "YOGYAHAR may provide information regarding RASAHAR, regional and seasonal food practices, fruits, vegetables, juices and traditional dietary concepts.\nSuch information may be based on traditional, educational or informational sources.\nThe Rasahar pamphlet supplied by YOGYAHAR describes Rasahar as a regional and seasonal juice concept and discusses various perceived dietary and wellness benefits.\nSuch information is not intended to constitute medical advice, diagnosis, treatment or a guarantee of health outcomes.\nCustomers should independently evaluate whether such products are appropriate for their individual dietary and health circumstances."
    },
    {
      "heading": "Ayurvedic or Traditional References",
      "body": "YOGYAHAR may refer to traditional Indian dietary practices, Ayurveda-inspired concepts or traditional wellness principles in its educational and marketing materials.\nSuch references are provided for informational and cultural context.\nThey should not be interpreted as a medical claim unless specifically authorized under applicable law.\nYOGYAHAR does not represent that traditional dietary practices or products will diagnose, cure, prevent or treat any medical condition."
    },
    {
      "heading": "Customer Responsibility",
      "body": "Customers are responsible for:\n- Reading product information;\n- Reviewing ingredients where relevant;\n- Informing YOGYAHAR about known allergies or dietary restrictions;\n- Following storage instructions;\n- Following consumption instructions;\n- Determining whether a product is suitable for their circumstances;\n- Seeking professional advice where necessary; and\n- Providing accurate information when placing an order."
    },
    {
      "heading": "Children",
      "body": "Parents or legal guardians are responsible for determining whether YOGYAHAR products are appropriate for children.\nYOGYAHAR does not provide individualized medical or nutritional advice for children through its website.\nParents or guardians should consult an appropriately qualified healthcare professional where a child has specific dietary, allergy or medical requirements."
    },
    {
      "heading": "Website Content",
      "body": "The information provided on www.yogyahar.com is intended to provide general information about YOGYAHAR, its products and services.\nAlthough we make reasonable efforts to maintain accurate information, we do not guarantee that every piece of information on the website will always be:\n- Complete;\n- Accurate;\n- Current;\n- Error-free; or\n- Continuously available.\nProduct availability, prices, menus, delivery areas and other information may change without prior notice where permitted by applicable law."
    },
    {
      "heading": "Third-party Information and Links",
      "body": "The YOGYAHAR website or communications may contain links to third-party websites, social-media platforms, payment services or other external resources.\nYOGYAHAR does not control third-party websites and does not necessarily endorse their content.\nWe are not responsible for:\n- Third-party content;\n- Accuracy of third-party information;\n- Third-party privacy practices;\n- Security of third-party websites;\n- Availability of third-party services; or\n- Any loss resulting from reliance on third-party information.\nUsers should review the applicable terms and privacy policies of third-party services."
    },
    {
      "heading": "Customer Testimonials and Experiences",
      "body": "Customer testimonials, reviews or experiences presented by YOGYAHAR may reflect individual experiences.\nIndividual customer results are not necessarily representative of the experience of every customer.\nTestimonials should not be interpreted as a guarantee of similar results."
    },
    {
      "heading": "No Professional Nutrition Consultation",
      "body": "Unless expressly stated otherwise for a particular service, YOGYAHAR does not provide individualized medical or clinical nutrition consultation.\nGeneral product recommendations provided by our team should not be treated as medical prescriptions.\nCustomers requiring individualized nutritional planning should consult an appropriately qualified dietitian, nutritionist or healthcare professional."
    },
    {
      "heading": "Food Safety",
      "body": "YOGYAHAR aims to maintain appropriate standards of hygiene, preparation, packaging and handling.\nHowever, customers must follow the storage and consumption instructions provided with each product.\nIf a product appears spoiled, contaminated, damaged or otherwise unsuitable for consumption, customers should not consume it and should contact YOGYAHAR promptly."
    },
    {
      "heading": "Delivery-related Disclaimer",
      "body": "YOGYAHAR makes reasonable efforts to deliver products according to the applicable delivery schedule.\nHowever, delivery may be affected by:\n- Weather;\n- Traffic;\n- Road restrictions;\n- Natural events;\n- Courier delays;\n- Supplier delays;\n- Operational limitations;\n- Government restrictions; or\n- Other circumstances beyond our reasonable control.\nDelivery times are estimates unless expressly confirmed otherwise.\nPlease refer to our Shipping & Delivery Policy for further information."
    },
    {
      "heading": "Refund and Cancellation Disclaimer",
      "body": "Because many YOGYAHAR products are fresh, made-to-order or perishable, cancellation and refund availability may be limited after preparation or dispatch.\nPlease refer to our Refund & Cancellation Policy for applicable conditions.\nNothing in this Disclaimer is intended to exclude any mandatory consumer rights or remedies available under applicable law."
    },
    {
      "heading": "No Guarantee of Uninterrupted Service",
      "body": "YOGYAHAR does not guarantee that:\n- The website will always be available;\n- All products will always be available;\n- All services will always be available;\n- Delivery will always occur at a particular time; or\n- The website will be completely free from errors or interruptions.\nWe will make reasonable efforts to maintain our website and services and address operational issues."
    },
    {
      "heading": "Limitation of Liability",
      "body": "To the maximum extent permitted by applicable law, YOGYAHAR and VRB PRODUCTS shall not be responsible for indirect, incidental, special or consequential losses arising from reliance on general information provided through the website or other communications.\nNothing in this Disclaimer shall:\n- Exclude liability that cannot legally be excluded;\n- Restrict mandatory consumer rights;\n- Exclude liability for matters that cannot legally be excluded; or\n- Prevent a customer from exercising rights available under applicable law."
    },
    {
      "heading": "Changes to This Disclaimer",
      "body": "YOGYAHAR may update this Disclaimer from time to time to reflect:\n- Changes in products;\n- Changes in services;\n- Changes in website content;\n- Changes in business practices;\n- Changes in applicable law; or\n- Changes in our communication practices.\nThe latest version will be published on:\nwww.yogyahar.com\nThe “Last Updated” date at the top of this Disclaimer will indicate when it was most recently revised."
    },
    {
      "heading": "Related Policies",
      "body": "This Disclaimer should be read together with:\n- Terms & Conditions\n- Privacy Policy\n- Refund & Cancellation Policy\n- Shipping & Delivery Policy\nThese documents collectively explain the terms applicable to the use of YOGYAHAR’s website and services."
    },
    {
      "heading": "Governing Law",
      "body": "This Disclaimer shall be governed by the applicable laws of India.\nNothing in this Disclaimer is intended to restrict any mandatory rights or remedies available to consumers under applicable law."
    },
    {
      "heading": "Contact Us",
      "body": "If you have questions regarding this Disclaimer, products, ingredients, dietary information or other YOGYAHAR services, please contact:\nYOGYAHAR\nLegal Entity: VRB PRODUCTS\nWebsite: www.yogyahar.com\nEmail: info.yogyahar@gmail.com\nPhone / WhatsApp: +91 74996 43234\nRegistered Address:\n11, Siddhivinayak,\nNear Sadguru Nagar,\nBehind Bhujbal Farm,\nNashik – 422009,\nMaharashtra, India."
    },
    {
      "heading": "Acknowledgement",
      "body": "By accessing or using the YOGYAHAR website, purchasing our products, subscribing to our services or relying on information provided by YOGYAHAR, you acknowledge that:\n- The information provided is primarily for general informational purposes;\n- YOGYAHAR does not provide medical diagnosis or treatment;\n- Individual dietary and health requirements may differ;\n- You are responsible for considering your individual circumstances;\n- You should seek professional advice where appropriate; and\n- You have had an opportunity to review this Disclaimer and our other applicable website policies."
    }
  ],
  "tagline": "YOGYAHAR – FOLLOW YOUR DIET WITH US.",
  "copyright": "© 2026 VRB PRODUCTS. All Rights Reserved."
};

export default function Disclaimer() {
  return <PolicyPage sectionKey="disclaimerPage" defaultContent={defaultContent} />;
}
