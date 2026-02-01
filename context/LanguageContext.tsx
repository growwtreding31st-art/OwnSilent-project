"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type LanguageCode =
  | "en"
  | "es"
  | "de"
  | "fr"
  | "it"
  | "ar"
  | "zh"
  | "pt"
  | "ru"
  | "ja";

export const availableLanguages = [
  { code: "en", label: "English", nativeName: "English" },
  { code: "es", label: "Spanish", nativeName: "Español" },
  { code: "de", label: "German", nativeName: "Deutsch" },
  { code: "fr", label: "French", nativeName: "Français" },
  { code: "it", label: "Italian", nativeName: "Italiano" },
  { code: "ar", label: "Arabic", nativeName: "العربية" },
  { code: "zh", label: "Chinese", nativeName: "简体中文" },
  { code: "pt", label: "Portuguese", nativeName: "Português" },
  { code: "ru", label: "Russian", nativeName: "Русский" },
  { code: "ja", label: "Japanese", nativeName: "日本語" },
] as const;

// ==========================================
// 1. ENGLISH
// ==========================================
const enTranslations = {
  "nav.shop": "Shop",
  "nav.about": "About Us",
  "nav.blogs": "Blogs",
  "nav.news": "News",
  "nav.contact": "Contact Us",
  "nav.home": "Home",
  "nav.cart": "Cart",
  "nav.account": "Account",
  "nav.rotors": "Carbon-Ceramic Rotors",
  "auth.login": "Login",
  "auth.signup": "Sign Up",
  "auth.logout": "Logout",
  "common.currency": "Currency",
  "common.language": "Language",
  "common.viewMore": "View More",
  "hero.welcome": "Welcome to",
  "hero.desc":
    "A Hong Kong–based luxury automotive tuning and global trading company, renowned for its expertise in high-performance components and bespoke vehicle solutions.",
  "hero.s1.t": "Carbon-Ceramic Braking Systems",
  "hero.s1.d":
    "Engineered for maximum stopping power and unmatched thermal stability.",
  "hero.s2.t": "Carbon Fiber Components",
  "hero.s2.d":
    "Complete body kits, aerodynamic parts, and luxury interior components.",
  "hero.s3.t": "Complete Vehicle Conversions",
  "hero.s3.d": "Bespoke design and fitment solutions for high-end vehicles.",
  "hero.box.t": "Global Expertise & Precision Manufacturing",
  "hero.box.d":
    "We design, develop, and manufacture our products to OEM precision standards, testing for quality and safety before dispatch.",
  "hero.list1": "In-house 3D design & development",
  "hero.list2": "Global installation partner network",
  "hero.list3": "Worldwide sea and air cargo",
  "hero.footer":
    "Driven by innovation, craftsmanship, and performance, we shape the future of luxury car tuning.",
  "feat.choose.t": "Why",
  "feat.choose.h": "Choose Us?",
  "feat.choose.d":
    "We are committed to providing you with the best service and highest quality products, every single time.",
  "feat.work.t": "Why",
  "feat.work.h": "Work With Us?",
  "feat.work.d":
    "Join a dynamic team at the forefront of automotive innovation and build a rewarding career.",
  "feat.contact": "Contact Our Team",
  "feat.c.shipping.t": "Fast & Reliable Shipping",
  "feat.c.shipping.d": "Orders dispatched promptly to your doorstep.",
  "feat.c.coverage.t": "Nationwide Coverage",
  "feat.c.coverage.d": "Delivering across every corner of India.",
  "feat.c.quality.t": "Quality You Can Trust",
  "feat.c.quality.d": "Our #1 priority is offering premium quality.",
  "feat.c.support.t": "Dedicated Expert Support",
  "feat.c.support.d": "Our team is here to help, 9am - 5pm.",
  "feat.w.innovate.t": "Innovative Environment",
  "feat.w.innovate.d":
    "Work with state-of-the-art technology and cutting-edge automotive manufacturing processes.",
  "feat.w.global.t": "Global Exposure",
  "feat.w.global.d":
    "Be part of a company that ships and collaborates with partners worldwide.",
  "feat.w.growth.t": "Professional Growth",
  "feat.w.growth.d":
    "Opportunities for training, skill development, and career advancement in the automotive industry.",
  "feat.w.roles.t": "Diverse Roles",
  "feat.w.roles.d":
    "From engineering and R&D to sales, marketing, logistics, and customer support.",
  "feat.w.impact.t": "Impactful Work",
  "feat.w.impact.d":
    "Contribute to creating premium solutions for luxury cars, SUVs, and supercars.",
  "about.title": "Driving Your Journey",
  "about.titleHighlight": "Forward",
  "about.intro":
    "At OwnSilent, we don't just sell auto parts—we build relationships based on trust, quality, and an unmatched passion for all things automotive.",
  "about.mission":
    "Our mission is simple: to provide enthusiasts and drivers with the highest quality parts, paired with expert advice and unwavering support.",
  "about.f.quality.title": "Quality",
  "about.f.quality.desc":
    "Rigorously tested for superior quality and durability.",
  "about.f.shipping.title": "Shipping",
  "about.f.shipping.desc":
    "Parts arrive quickly and safely to get you back on the road.",
  "about.f.support.title": "Support",
  "about.f.support.desc": "Our knowledgeable team is always here to help you.",
  "blog.title": "Latest from Our",
  "blog.highlight": "Blog",
  "blog.subtitle":
    "Stay updated with trends, technologies, and stories from the automotive world.",
  "blog.viewAll": "View All Blogs",
  "cat.explore": "Explore Our Collections",
  "cat.featured": "Featured Categories",
  "cat.subtitle":
    "Discover curated collections for every part of your vehicle.",
  "cat.noContent": "No featured content available.",

  // Footer
  "footer.company": "Company",
  "footer.support": "Support",
  "footer.categories": "Shop by Category",
  "footer.disclaimer": "Disclaimer",
  "footer.rights":
    "© {year} Own Silent International Limited – All Rights Reserved.",
  "footer.weShip": "We ship worldwide.",
  "footer.email": "Email",
  "footer.website": "Website",
  "footer.reg": "Company Registration",

  // Company Links
  "footer.link.rotors": "Carbon-Ceramic Rotors",
  "footer.link.shop": "Shop",
  "footer.link.about": "About Us",
  "footer.link.blog": "Blog",
  "footer.link.news": "News",
  "footer.link.contact": "Contact Us",

  // Support Links
  "footer.link.shipping": "Shipping & Returns",
  "footer.link.privacy": "Privacy Policy",
  "footer.link.dealer": "Become a Dealer",
  "footer.link.disclaimer": "Full Disclaimer",

  // Category Links
  "footer.cat.engine": "Engine Parts",
  "footer.cat.suspension": "Suspension",
  "footer.cat.brakes": "Brakes & Rotors",
  "footer.cat.exhaust": "Exhaust Systems",
  "footer.cat.body": "Body Kits",
  "footer.cat.lighting": "Lighting",

  // Carbon Ceramic Page
  "ccr.page.title": "Carbon-Ceramic Rotors",
  "ccr.find.title": "Find Your Perfect Carbon Ceramic Rotor",
  "ccr.find.sub":
    "Select your vehicle to discover premium rotors designed for maximum performance.",
  "ccr.noProducts.title": "No Matching Products",
  "ccr.noProducts.sub":
    "Your selection did not match any products. Please try a different filter.",
  "ccr.hero.sub": "Ultimate Braking Technology",
  "ccr.hero.title": "Carbon-Ceramic Rotors",
  "ccr.hero.desc":
    "The pinnacle of motorsport braking technology, engineered for the street. Experience unparalleled stopping power, minimal fade, and a significant reduction in weight.",
  "ccr.feature1": "Lightweight Construction",
  "ccr.feature2": "Superior Heat Dissipation",
  "ccr.feature3": "Extended Lifespan",
  "ccr.faq.title": "Your Questions, Answered",
  "ccr.faq1.q":
    "What makes carbon ceramic rotors better than standard iron rotors?",
  "ccr.faq1.a":
    "Carbon ceramic rotors are up to 60% lighter, significantly reducing unsprung mass. They deliver superior heat resistance, virtually zero fade up to 1400°C, and exceptional durability.",
  "ccr.faq2.q": "Are OWNSILENT carbon ceramic kits suitable for daily driving?",
  "ccr.faq2.a":
    "Yes. While designed for motorsport, our kits are fully optimized for street use, offering silent operation and smooth braking in everyday conditions.",
  "ccr.faq3.q": "Do carbon ceramic brakes require special maintenance?",
  "ccr.faq3.a":
    "Maintenance is minimal — they produce almost no brake dust, resist corrosion, and last significantly longer. Routine checks are recommended.",
  // ===================================
  // ENGLISH (en) - For About Us Page
  // ===================================
  "aboutPage.meta": "About OwnSilent",
  "aboutPage.title": "Driving the Future of Automotive Performance",
  "aboutPage.subtitle":
    "Since 2015, we've been the global benchmark for quality and trust in high-performance auto parts and bespoke vehicle customizations.",
  "aboutPage.exploreBtn": "Explore Our Products",
  "aboutPage.story.meta": "Our Story",
  "aboutPage.story.title": "Driven by Passion, Built on Trust",
  "aboutPage.story.p1":
    "OwnSilent was born from a simple passion: to make finding the perfect component a simple, transparent, and satisfying experience for every enthusiast and everyday driver.",
  "aboutPage.story.p2":
    "Each purchase from us is more than a transaction; it's a step towards maintaining and upgrading your vehicle with complete confidence and world-class quality.",
  "aboutPage.principles.meta": "Our Principles",
  "aboutPage.principles.title": "Our Commitment to You",
  "aboutPage.principles.sub":
    "We are built on a foundation of core values that guide every decision we make and every interaction we have with our global community.",
  "aboutPage.value1.t": "Uncompromising Quality",
  "aboutPage.value1.d":
    "We are dedicated to bringing you the finest parts, ensuring every component meets our rigorous standards of excellence.",
  "aboutPage.value2.t": "Expertise & Passion",
  "aboutPage.value2.d":
    "Our team consists of automotive enthusiasts and experts ready to guide you through your journey with confidence and skill.",
  "aboutPage.value3.t": "Trust & Transparency",
  "aboutPage.value3.d":
    "Customer satisfaction is our priority. We operate with integrity to build lasting relationships with every driver we serve.",
  "aboutPage.careers.meta": "Careers",
  "aboutPage.careers.title": "Join a Global Leader in Automotive Innovation",
  "aboutPage.careers.sub":
    "We are always looking for talented individuals to join our mission of delivering world-class automotive solutions.",
  "aboutPage.careers.why.t": "Why Work With Us?",
  "aboutPage.careers.why.l1":
    "Work with state-of-the-art technology and cutting-edge automotive processes.",
  "aboutPage.careers.why.l2":
    "Be part of a company that collaborates with partners and clients worldwide.",
  "aboutPage.careers.why.l3":
    "Access opportunities for training, skill development, and career advancement.",
  "aboutPage.careers.why.l4":
    "Contribute to creating premium solutions for luxury cars, SUVs, and supercars.",
  "aboutPage.careers.open.t": "Open Areas of Expertise",
  "aboutPage.careers.open.sub":
    "We welcome applications across multiple business areas. If you have the skills and passion, we want to hear from you.",
  "aboutPage.careers.cat1": "Engineering & Manufacturing",
  "aboutPage.careers.cat2": "Research & Development",
  "aboutPage.careers.cat3": "Sales & Dealer Relations",
  "aboutPage.careers.cat4": "Marketing & Communications",
  "aboutPage.careers.cat5": "Operations & Logistics",
  "aboutPage.careers.cat6": "Customer & Technical Support",

  "home.banner.title": "Experience Peak Performance",
  "home.banner.desc":
    "Elevate your vehicle with our world-class carbon components and precision engineering.",
  "home.banner.btn": "View Collection",
  // News Page
  "newsPage.loading": "Loading Articles...",
  "newsPage.title": "News & Insights",
  "newsPage.subtitle":
    "Your source for the latest in auto parts and performance.",
  "newsPage.filter.title": "Filter Articles",
  "newsPage.filter.brand": "Car Brand",
  "newsPage.filter.allBrands": "All Brands",
  "newsPage.filter.model": "Car Model",
  "newsPage.filter.allModels": "All Models",
  "newsPage.filter.reset": "Reset All Filters",
  "newsPage.readMore": "Read More",
  "newsPage.noArticles.title": "No Articles Found",
  "newsPage.noArticles.sub": "Try adjusting your filters or check back later.",
  "newsPage.noArticles.resetBtn": "Reset Filters",
  // Contact Us Page
  "contact.hero.meta": "24/7 Support Available",
  "contact.hero.title": "Get in Touch",
  "contact.hero.sub":
    "Need a specific part or have a question about your order? We're here to help you get back on the road.",
  "contact.info.title": "Contact Info",
  "contact.info.email.title": "Email Us",
  "contact.info.email.sub": "For general inquiries & sales",
  "contact.info.phone.title": "Call Us",
  "contact.info.phone.sub": "Mon-Fri from 9am to 5pm",
  "contact.info.addr.title": "Visit Us",
  "contact.help.title": "Need Instant Help?",
  "contact.help.sub": "Check our frequently asked questions for quick answers.",
  "contact.help.btn": "Visit Help Center",
  "contact.tab.request": "Request a Part",
  "contact.tab.support": "Help & Support",
  "contact.form.s1.title": "Your Contact Details",
  "contact.form.s2.request.title": "Part & Shipping Details",
  "contact.form.s2.support.title": "How can we help?",
  "contact.form.fullName": "Full Name",
  "contact.form.email": "Email Address",
  "contact.form.phone": "Phone Number",
  "contact.form.partName": "Part Name / Description",
  "contact.form.brand": "Car Brand",
  "contact.form.model": "Car Model",
  "contact.form.year": "Car Year",
  "contact.form.address": "Shipping Address",
  "contact.form.street": "Street Address",
  "contact.form.city": "City",
  "contact.form.state": "State",
  "contact.form.zip": "ZIP Code",
  "contact.form.subject": "Subject",
  "contact.form.message": "Additional Message",
  "contact.form.submitBtn": "Submit Request",
  "contact.form.submitting": "Submitting...",
  "contact.form.success.title": "Thank You!",
  "contact.form.success.sub":
    "We have received your message. Our team will get back to you shortly.",
  "contact.form.success.btn": "Continue Shopping",
  // Shop Page
  "shop.loading": "Loading Products...",
  "shop.title": "Shop All Parts",
  "shop.subtitle":
    "Premium auto parts sourced from top manufacturers worldwide.",
  "shop.search.placeholder": "Search by product name, SKU, or part number...",
  "shop.filter.title": "Filters",
  "shop.filter.reset": "Reset",
  "shop.filter.resetAll": "Reset All",
  "shop.filter.showResults": "Show Results",
  "shop.filter.categories": "Categories",
  "shop.filter.brands": "Brands",
  "shop.filter.models": "Models",
  "shop.filter.searchPlaceholder": "Search {title}...",
  "shop.filter.noCategories": "No categories match.",
  "shop.filter.noBrands": "No brands match.",
  "shop.filter.noModels": "No models found for this brand.",
  "shop.results.showing": "Showing",
  "shop.results.of": "of",
  "shop.results.results": "results",
  "shop.sort.latest": "Sort by latest",
  "shop.noProducts.title": "No Products Found",
  "shop.noProducts.sub":
    "We couldn't find any products matching your filters. Try adjusting your search.",
  "shop.noProducts.clearBtn": "Clear Filters",
  "shop.cart.addSuccess": "Added to cart!",
  "shop.cart.addError": "Could not add to cart.",
  "shop.cart.loginError": "Please login to add items to your cart.",
  // ENGLISH (en)//disclamer
  "footer.disclaimer.p1":
    "All brand names, logos, and trademarks displayed on this website are for reference only. Own Silent International Limited is not affiliated, endorsed, or authorized by any vehicle manufacturers. All product names, numbers, and images are for identification and compatibility purposes only.",
  "footer.disclaimer.p2":
    "We manufacture and trade aftermarket, genuine, and custom automotive parts worldwide. Customers are responsible for ensuring legal compliance, safe installation, and proper use of all products. Own Silent International Limited is not liable for damages, vehicle modifications, or warranty impacts resulting from use of our products.",
  "footer.disclaimer.p3":
    "Use of this website and purchase of products constitutes acceptance of our full disclaimer. For complete legal terms, see our",
  "footer.disclaimer.link": "Full Disclaimer Page",
  "footer.copyright.short":
    "All brands, logos, and trademarks are for reference only; we are not affiliated or endorsed by any manufacturer. Products are aftermarket, genuine, or custom; use at your own risk. See our {link} for details.",
  "footer.copyright.link": "Full Disclaimer",

  // Showcase
  "showcase.series": "High Performance Series",
  "showcase.stats": "Engineering Stats",
  "showcase.status": "Showcase",
  "showcase.paused": "Paused",
  "showcase.auto": "Auto",
  "showcase.osPerformance": "OS PERFORMANCE",
  "showcase.est": "EST. 1998",
  "showcase.aerospace": "AEROSPACE GRADE",
  "showcase.discover": "DISCOVER UNLIMITED POWER",

  "showcase.part1.name": "Carbon Matrix Rotors",
  "showcase.part1.headline": "Thermal Mastery in Every Stop.",
  "showcase.part1.desc":
    "Our carbon ceramic matrix rotors provide unmatched heat dissipation and zero brake fade, even under extreme track conditions.",
  "showcase.part1.bgText": "POWER",
  "showcase.part1.s1.l": "Material",
  "showcase.part1.s1.v": "Carbon-Silicon",
  "showcase.part1.s2.l": "Heat Limit",
  "showcase.part1.s2.v": "1200°C",
  "showcase.part1.s3.l": "Weight Red.",
  "showcase.part1.s3.v": "45%",

  "showcase.part2.name": "Forged Aero-S Wheels",
  "showcase.part2.headline": "Lightweight. Forged. Unstoppable.",
  "showcase.part2.desc":
    "Precision engineered from aerospace-grade 6061-T6 aluminum, the Aero-S series significantly reduces unsprung mass for superior handling.",
  "showcase.part2.bgText": "LIGHT",
  "showcase.part2.s1.l": "Process",
  "showcase.part2.s1.v": "8000T Forged",
  "showcase.part2.s2.l": "Load Rating",
  "showcase.part2.s2.v": "950kg",
  "showcase.part2.s3.l": "Wheel Weight",
  "showcase.part2.s3.v": "8.2kg",

  "showcase.part3.name": "Adaptive Nitro Coilovers",
  "showcase.part3.headline": "Precision Perfected.",
  "showcase.part3.desc":
    "Ultra-fast response nitrogen-charged dampers with 32-way adjustment, offering the perfect balance between track rigidity and road comfort.",
  "showcase.part3.bgText": "GLIDE",
  "showcase.part3.s1.l": "Adjustment",
  "showcase.part3.s1.v": "32-Way Click",
  "showcase.part3.s2.l": "Gas Type",
  "showcase.part3.s2.v": "High-Purity N2",
  "showcase.part3.s3.l": "Stroke",
  "showcase.part3.s3.v": "110mm",

  "showcase.part4.name": "Matrix LASER Headlights",
  "showcase.part4.headline": "Illuminating the Path Ahead.",
  "showcase.part4.desc":
    "High-definition laser projection system with adaptive beam technology, providing up to 600m of crystal clear visibility.",
  "showcase.part4.bgText": "LIGHT",
  "showcase.part4.s1.l": "Range",
  "showcase.part4.s1.v": "600m",
  "showcase.part4.s2.l": "Tech",
  "showcase.part4.s2.v": "Laser Matrix",
  "showcase.part4.s3.l": "Efficiency",
  "showcase.part4.s3.v": "A+++",

  "showcase.part5.name": "Forged Carbon Aero Kit",
  "showcase.part5.headline": "Aerodynamics Redefined.",
  "showcase.part5.desc":
    "Ultra-lightweight forged carbon fiber components designed for maximum downforce and aggressive aesthetics.",
  "showcase.part5.bgText": "AERO",
  "showcase.part5.s1.l": "Material",
  "showcase.part5.s1.v": "Forged Carbon",
  "showcase.part5.s2.l": "Downforce",
  "showcase.part5.s2.v": "+120kg",
  "showcase.part5.s3.l": "Weight Red.",
  "showcase.part5.s3.v": "-15kg",

  // What We Do Section
  "whatWeDo.badge": "Our Services",
  "whatWeDo.title": "What We",
  "whatWeDo.titleHighlight": "Do",
  "whatWeDo.subtitle":
    "We deliver premium automotive solutions with precision engineering and unmatched quality.",
  "whatWeDo.feature1.title": "Premium Parts Supply",
  "whatWeDo.feature1.desc":
    "High-performance components sourced from top manufacturers worldwide.",
  "whatWeDo.feature2.title": "Quality Assurance",
  "whatWeDo.feature2.desc":
    "Every part is rigorously tested to meet OEM standards and beyond.",
  "whatWeDo.feature3.title": "Expert Installation",
  "whatWeDo.feature3.desc":
    "Professional fitting services through our global partner network.",
  "whatWeDo.feature4.title": "Worldwide Shipping",
  "whatWeDo.feature4.desc":
    "Fast and reliable delivery to customers across the globe.",

  // Premium Parts Categories
  "categories.badge": "Shop by Category",
  "categories.title": "Choose From Premium Parts For",
  "categories.titleHighlight": "Your Car",
  "categories.subtitle":
    "Explore our curated selection of high-performance automotive components.",
  "categories.brakes.title": "Brakes & Rotors",
  "categories.engine.title": "Engine Parts",
  "categories.suspension.title": "Suspension",
  "categories.exhaust.title": "Exhaust Systems",
  "categories.body.title": "Body Kits",
  "categories.lighting.title": "Lighting",
  "categories.viewAll": "View All Categories",

  // Our Gallery
  "gallery.badge": "Our Work",
  "gallery.title": "Our",
  "gallery.titleHighlight": "Gallery",
  "gallery.subtitle":
    "Explore our portfolio of premium builds and installations.",
  "gallery.img1.alt": "Premium carbon ceramic brake installation",
  "gallery.img2.alt": "Custom body kit fitment",
  "gallery.img3.alt": "High-performance exhaust system",
  "gallery.img4.alt": "Luxury interior upgrade",
  "gallery.img5.alt": "Forged wheel installation",
  "gallery.img6.alt": "Carbon fiber components",
  "gallery.img7.alt": "Complete vehicle transformation",
  "gallery.img8.alt": "Professional detailing work",

  // Latest Articles
  "articles.badge": "Insights & Updates",
  "articles.title": "Latest",
  "articles.titleHighlight": "Articles",
  "articles.subtitle":
    "Stay informed with the latest trends and technologies in automotive performance.",
  "articles.article1.title": "The Future of Carbon-Ceramic Braking Technology",
  "articles.article1.excerpt":
    "Discover how carbon-ceramic rotors are revolutionizing high-performance braking systems with superior heat management and durability.",
  "articles.article1.author": "James Chen",
  "articles.article1.date": "Jan 28, 2026",
  "articles.article2.title": "Choosing the Right Suspension for Your Vehicle",
  "articles.article2.excerpt":
    "A comprehensive guide to selecting suspension components that match your driving style and performance goals.",
  "articles.article2.author": "Sarah Williams",
  "articles.article2.date": "Jan 25, 2026",
  "articles.article3.title": "Aerodynamics: How Body Kits Improve Performance",
  "articles.article3.excerpt":
    "Learn how properly designed body kits can enhance downforce, reduce drag, and improve overall vehicle dynamics.",
  "articles.article3.author": "Michael Torres",
  "articles.article3.date": "Jan 22, 2026",
  "articles.readMore": "Read More",
  "articles.viewAll": "View All Articles",

  // How We Work
  "howWeWork.badge": "Our Process",
  "howWeWork.title": "How We",
  "howWeWork.titleHighlight": "Work",
  "howWeWork.subtitle":
    "A simple, transparent process from selection to installation.",
  "howWeWork.step1.title": "Browse & Select",
  "howWeWork.step1.desc":
    "Explore our extensive catalog and find the perfect parts for your vehicle.",
  "howWeWork.step2.title": "Place Your Order",
  "howWeWork.step2.desc":
    "Secure checkout with multiple payment options and instant confirmation.",
  "howWeWork.step3.title": "Fast Delivery",
  "howWeWork.step3.desc":
    "Your parts are carefully packaged and shipped directly to your location.",
  "howWeWork.step4.title": "Install & Enjoy",
  "howWeWork.step4.desc":
    "Professional installation or DIY - we support you every step of the way.",
  "howWeWork.cta.text": "Ready to upgrade your vehicle?",
  "howWeWork.cta.button": "Start Shopping",

  // Contact Process
  "contactProcess.badge": "Get in Touch",
  "contactProcess.title": "Contact",
  "contactProcess.titleHighlight": "Us",
  "contactProcess.subtitle":
    "Have questions? Our expert team is here to help you find the perfect solution.",
  "contactProcess.email.title": "Email Us",
  "contactProcess.phone.title": "Call Us",
  "contactProcess.phone.hours": "Mon-Fri, 9am - 5pm HKT",
  "contactProcess.address.title": "Visit Us",
  "contactProcess.form.name": "Full Name",
  "contactProcess.form.namePlaceholder": "Enter your name",
  "contactProcess.form.email": "Email Address",
  "contactProcess.form.emailPlaceholder": "your@email.com",
  "contactProcess.form.phone": "Phone Number",
  "contactProcess.form.phonePlaceholder": "+1 (555) 000-0000",
  "contactProcess.form.subject": "Subject",
  "contactProcess.form.subjectPlaceholder": "How can we help?",
  "contactProcess.form.message": "Message",
  "contactProcess.form.messagePlaceholder":
    "Tell us more about your inquiry...",
  "contactProcess.form.submit": "Send Message",
  "contactProcess.form.submitting": "Sending...",
  "contactProcess.success":
    "Thank you! We've received your message and will respond shortly.",

  // Reviews
  "reviews.badge": "Testimonials",
  "reviews.title": "What Our Customers",
  "reviews.titleHighlight": "Say",
  "reviews.subtitle":
    "Real feedback from drivers who trust us with their vehicles.",
  "reviews.review1.name": "Marcus Rodriguez",
  "reviews.review1.car": "Porsche 911 GT3 RS",
  "reviews.review1.feedback":
    "The carbon-ceramic rotors completely transformed my braking performance. Incredible stopping power with zero fade on the track. OwnSilent's quality is unmatched.",
  "reviews.review1.location": "Miami, USA",
  "reviews.review2.name": "Sophie Laurent",
  "reviews.review2.car": "Ferrari 488 Pista",
  "reviews.review2.feedback":
    "Outstanding service from start to finish. The team helped me select the perfect exhaust system, and the installation was flawless. My Ferrari sounds and performs better than ever.",
  "reviews.review2.location": "Paris, France",
  "reviews.review3.name": "Kenji Tanaka",
  "reviews.review3.car": "Lamborghini Huracán",
  "reviews.review3.feedback":
    "Premium quality parts with exceptional customer support. The body kit fitment was perfect, and shipping to Japan was faster than expected. Highly recommended!",
  "reviews.review3.location": "Tokyo, Japan",
  "reviews.review4.name": "Alexander Müller",
  "reviews.review4.car": "Audi RS6 Avant",
  "reviews.review4.feedback":
    "Professional expertise and genuine passion for automotive excellence. The suspension upgrade has completely changed how my RS6 handles. Worth every penny.",
  "reviews.review4.location": "Munich, Germany",

  // Footer Payment Methods
  "footer.payment.title": "Secure Payments",
  "footer.payment.subtitle":
    "We accept secure payments through PayPal, major credit & debit cards, and bank transfer.",
  "footer.payment.bank": "Bank Transfer",

  // Common UI Text
  "common.learnMore": "Learn More",
  "common.exploreMore": "Explore premium parts",
};

// ==========================================
// 2. SPANISH
// ==========================================
const esTranslations = {
  "nav.shop": "Tienda",
  "nav.about": "Nosotros",
  "nav.blogs": "Blogs",
  "nav.news": "Noticias",
  "nav.contact": "Contacto",
  "nav.home": "Inicio",
  "nav.cart": "Carrito",
  "nav.account": "Cuenta",
  "nav.rotors": "Rotores Carbono-Cerámicos",
  "auth.login": "Acceso",
  "auth.signup": "Registro",
  "auth.logout": "Salir",
  "common.currency": "Moneda",
  "common.language": "Idioma",
  "common.viewMore": "Ver Más",
  "hero.welcome": "Bienvenido a",
  "hero.desc":
    "Una empresa de tuning automotriz de lujo y comercio global con sede en Hong Kong, reconocida por su experiencia en componentes de alto rendimiento y soluciones personalizadas.",
  "hero.s1.t": "Sistemas de Frenos Carbono-Cerámicos",
  "hero.s1.d":
    "Diseñados para máxima potencia de frenado y estabilidad térmica inigualable.",
  "hero.s2.t": "Componentes de Fibra de Carbono",
  "hero.s2.d":
    "Kits de carrocería completos, piezas aerodinámicas y componentes interiores de lujo.",
  "hero.s3.t": "Conversiones Completas de Vehículos",
  "hero.s3.d":
    "Diseño a medida y soluciones de ajuste para vehículos de alta gama.",
  "hero.box.t": "Experiencia Global y Fabricación de Precisión",
  "hero.box.d":
    "Diseñamos, desarrollamos y fabricamos nuestros productos con estándares de precisión OEM, probando calidad y seguridad antes del envío.",
  "hero.list1": "Diseño y desarrollo 3D interno",
  "hero.list2": "Red global de socios de instalación",
  "hero.list3": "Carga marítima y aérea mundial",
  "hero.footer":
    "Impulsados por la innovación, la artesanía y el rendimiento, damos forma al futuro del tuning de lujo.",
  "feat.choose.t": "Por Qué",
  "feat.choose.h": "Elegirnos?",
  "feat.choose.d":
    "Estamos comprometidos a brindarle el mejor servicio y productos de la más alta calidad, cada vez.",
  "feat.work.t": "Por Qué",
  "feat.work.h": "Trabajar con Nosotros?",
  "feat.work.d":
    "Únase a un equipo dinámico a la vanguardia de la innovación automotriz y construya una carrera gratificante.",
  "feat.contact": "Contactar al Equipo",
  "feat.c.shipping.t": "Envío Rápido y Confiable",
  "feat.c.shipping.d": "Pedidos enviados puntualmente a su puerta.",
  "feat.c.coverage.t": "Cobertura Nacional",
  "feat.c.coverage.d": "Entregando en cada rincón.",
  "feat.c.quality.t": "Calidad en la que Puede Confiar",
  "feat.c.quality.d": "Nuestra prioridad #1 es ofrecer calidad premium.",
  "feat.c.support.t": "Soporte Experto Dedicado",
  "feat.c.support.d": "Nuestro equipo está aquí para ayudar, 9am - 5pm.",
  "feat.w.innovate.t": "Entorno Innovador",
  "feat.w.innovate.d":
    "Trabaje con tecnología de punta y procesos de fabricación automotriz de vanguardia.",
  "feat.w.global.t": "Exposición Global",
  "feat.w.global.d":
    "Sea parte de una empresa que envía y colabora con socios en todo el mundo.",
  "feat.w.growth.t": "Crecimiento Profesional",
  "feat.w.growth.d":
    "Oportunidades de capacitación, desarrollo de habilidades y avance profesional en la industria automotriz.",
  "feat.w.roles.t": "Roles Diversos",
  "feat.w.roles.d":
    "Desde ingeniería e I+D hasta ventas, marketing, logística y atención al cliente.",
  "feat.w.impact.t": "Trabajo Impactante",
  "feat.w.impact.d":
    "Contribuya a crear soluciones premium para autos de lujo, SUV y superdeportivos.",
  "about.title": "Impulsando tu Viaje",
  "about.titleHighlight": "Hacia Adelante",
  "about.intro":
    "En OwnSilent, no solo vendemos autopartes, construimos relaciones basadas en confianza, calidad y una pasión inigualable por todo lo automotriz.",
  "about.mission":
    "Nuestra misión es simple: proporcionar a los entusiastas y conductores las piezas de la más alta calidad, junto con asesoramiento experto y apoyo inquebrantable.",
  "about.f.quality.title": "Calidad",
  "about.f.quality.desc":
    "Probado rigurosamente para una calidad y durabilidad superiores.",
  "about.f.shipping.title": "Envío",
  "about.f.shipping.desc":
    "Las piezas llegan de forma rápida y segura para que vuelva a la carretera.",
  "about.f.support.title": "Soporte",
  "about.f.support.desc":
    "Nuestro equipo experto siempre está aquí para ayudarle.",
  "blog.title": "Lo último de nuestro",
  "blog.highlight": "Blog",
  "blog.subtitle":
    "Manténgase actualizado con tendencias, tecnologías e historias del mundo automotriz.",
  "blog.viewAll": "Ver Todos los Blogs",
  "cat.explore": "Explora Nuestras Colecciones",
  "cat.featured": "Categorías Destacadas",
  "cat.subtitle":
    "Descubre colecciones seleccionadas para cada parte de tu vehículo.",
  "cat.noContent": "No hay contenido destacado disponible.",
  // Footer
  "footer.company": "Empresa",
  "footer.support": "Soporte",
  "footer.categories": "Comprar por Categoría",
  "footer.disclaimer": "Descargo de responsabilidad",
  "footer.rights":
    "© {year} Own Silent International Limited – Todos los derechos reservados.",
  "footer.weShip": "Enviamos a todo el mundo.",
  "footer.email": "Correo electrónico",
  "footer.website": "Sitio web",
  "footer.reg": "Registro de empresa",

  // Company Links
  "footer.link.rotors": "Rotores Carbono-Cerámicos",
  "footer.link.shop": "Tienda",
  "footer.link.about": "Sobre Nosotros",
  "footer.link.blog": "Blog",
  "footer.link.news": "Noticias",
  "footer.link.contact": "Contáctenos",

  // Support Links
  "footer.link.shipping": "Envíos y Devoluciones",
  "footer.link.privacy": "Política de Privacidad",
  "footer.link.dealer": "Conviértase en Distribuidor",
  "footer.link.disclaimer": "Descargo de responsabilidad completo",

  // Category Links
  "footer.cat.engine": "Partes del Motor",
  "footer.cat.suspension": "Suspensión",
  "footer.cat.brakes": "Frenos y Rotores",
  "footer.cat.exhaust": "Sistemas de Escape",
  "footer.cat.body": "Kits de Carrocería",
  "footer.cat.lighting": "Iluminación",
  // Carbon Ceramic Page
  "ccr.page.title": "Rotores Carbono-Cerámicos",
  "ccr.find.title": "Encuentre su Rotor Carbono-Cerámico Perfecto",
  "ccr.find.sub":
    "Seleccione su vehículo para descubrir rotores premium diseñados para el máximo rendimiento.",
  "ccr.noProducts.title": "No se encontraron productos",
  "ccr.noProducts.sub":
    "Su selección no coincide con ningún producto. Pruebe un filtro diferente.",
  "ccr.hero.sub": "Tecnología de Frenado Definitiva",
  "ccr.hero.title": "Rotores Carbono-Cerámicos",
  "ccr.hero.desc":
    "La cima de la tecnología de frenado de competición, diseñada para la calle. Experimente una potencia de frenado inigualable, un desvanecimiento mínimo y una reducción significativa de peso.",
  "ccr.feature1": "Construcción Ligera",
  "ccr.feature2": "Disipación de Calor Superior",
  "ccr.feature3": "Vida Útil Prolongada",
  "ccr.faq.title": "Sus Preguntas, Respondidas",
  "ccr.faq1.q":
    "¿Qué hace que los rotores de carbono-cerámica sean mejores que los de hierro estándar?",
  "ccr.faq1.a":
    "Los rotores de carbono-cerámica son hasta un 60% más ligeros. Ofrecen una resistencia superior al calor, prácticamente cero desvanecimiento hasta 1400°C y una durabilidad excepcional.",
  "ccr.faq2.q":
    "¿Son los kits de carbono-cerámica OWNSILENT adecuados para la conducción diaria?",
  "ccr.faq2.a":
    "Sí. Aunque están diseñados para la competición, nuestros kits están optimizados para el uso en la calle, ofreciendo un funcionamiento silencioso y un frenado suave.",
  "ccr.faq3.q":
    "¿Requieren los frenos de carbono-cerámica un mantenimiento especial?",
  "ccr.faq3.a":
    "El mantenimiento es mínimo: casi no producen polvo de freno, resisten la corrosión y duran mucho más. Se recomiendan revisiones de rutina.",
  // SPANISH (es) - For About Us Page
  // ===================================
  "aboutPage.meta": "Sobre OwnSilent",
  "aboutPage.title": "Impulsando el Futuro del Rendimiento Automotriz",
  "aboutPage.subtitle":
    "Desde 2015, somos el referente mundial en calidad y confianza en piezas de alto rendimiento y personalizaciones de vehículos.",
  "aboutPage.exploreBtn": "Explorar Nuestros Productos",
  "aboutPage.story.meta": "Nuestra Historia",
  "aboutPage.story.title":
    "Impulsados por la Pasión, Construidos sobre la Confianza",
  "aboutPage.story.p1":
    "OwnSilent nació de una simple pasión: hacer que encontrar el componente perfecto sea una experiencia simple, transparente y satisfactoria.",
  "aboutPage.story.p2":
    "Cada compra es un paso hacia la mejora de su vehículo con total confianza y calidad mundial.",
  "aboutPage.principles.meta": "Nuestros Principios",
  "aboutPage.principles.title": "Nuestro Compromiso Contigo",
  "aboutPage.principles.sub":
    "Nos basamos en valores fundamentales que guían cada decisión que tomamos.",
  "aboutPage.value1.t": "Calidad Incomprometible",
  "aboutPage.value1.d":
    "Nos dedicamos a ofrecerte las mejores piezas, asegurando que cada componente cumpla nuestros rigurosos estándares.",
  "aboutPage.value2.t": "Experiencia y Pasión",
  "aboutPage.value2.d":
    "Nuestro equipo está formado por entusiastas y expertos del automóvil listos para guiarte.",
  "aboutPage.value3.t": "Confianza y Transparencia",
  "aboutPage.value3.d":
    "La satisfacción del cliente es nuestra prioridad. Operamos con integridad para construir relaciones duraderas.",
  "aboutPage.careers.meta": "Carreras",
  "aboutPage.careers.title":
    "Únase a un Líder Mundial en Innovación Automotriz",
  "aboutPage.careers.sub":
    "Siempre buscamos personas con talento para unirse a nuestra misión de ofrecer soluciones automotrices de clase mundial.",
  "aboutPage.careers.why.t": "¿Por Qué Trabajar con Nosotros?",
  "aboutPage.careers.why.l1":
    "Trabaje con tecnología de vanguardia y procesos automotrices de última generación.",
  "aboutPage.careers.why.l2":
    "Sea parte de una empresa que colabora con socios y clientes en todo el mundo.",
  "aboutPage.careers.why.l3":
    "Acceda a oportunidades de formación, desarrollo de habilidades y promoción profesional.",
  "aboutPage.careers.why.l4":
    "Contribuya a crear soluciones premium para autos de lujo, SUV y superdeportivos.",
  "aboutPage.careers.open.t": "Áreas Abiertas de Especialización",
  "aboutPage.careers.open.sub":
    "Aceptamos solicitudes en múltiples áreas de negocio. Si tiene las habilidades y la pasión, queremos saber de usted.",
  "aboutPage.careers.cat1": "Ingeniería y Fabricación",
  "aboutPage.careers.cat2": "Investigación y Desarrollo",
  "aboutPage.careers.cat3": "Ventas y Relaciones con Distribuidores",
  "aboutPage.careers.cat4": "Marketing y Comunicaciones",
  "aboutPage.careers.cat5": "Operaciones y Logística",
  "aboutPage.careers.cat6": "Soporte Técnico y al Cliente",

  "home.banner.title": "Experimenta el Máximo Rendimiento",
  "home.banner.desc":
    "Eleva tu vehículo con nuestros componentes de carbono de clase mundial y tecnología de precisión.",
  "home.banner.btn": "Ver Colección",
  // new page // ===================================
  "newsPage.loading": "Cargando Artículos...",
  "newsPage.title": "Noticias y Perspectivas",
  "newsPage.subtitle":
    "Tu fuente de lo último en repuestos y rendimiento de automóviles.",
  "newsPage.filter.title": "Filtrar Artículos",
  "newsPage.filter.brand": "Marca de Coche",
  "newsPage.filter.allBrands": "Todas las Marcas",
  "newsPage.filter.model": "Modelo de Coche",
  "newsPage.filter.allModels": "Todos los Modelos",
  "newsPage.filter.reset": "Restablecer Filtros",
  "newsPage.readMore": "Leer Más",
  "newsPage.noArticles.title": "No se encontraron Artículos",
  "newsPage.noArticles.sub": "Intenta ajustar tus filtros o vuelve más tarde.",
  "newsPage.noArticles.resetBtn": "Restablecer Filtros",
  // SPANISH (es) - For Shop Page
  // ===================================
  "shop.loading": "Cargando Productos...",
  "shop.title": "Comprar Todas las Piezas",
  "shop.subtitle":
    "Piezas de automóviles premium de los mejores fabricantes del mundo.",
  "shop.search.placeholder":
    "Buscar por nombre de producto, SKU o número de pieza...",
  "shop.filter.title": "Filtros",
  "shop.filter.reset": "Restablecer",
  "shop.filter.resetAll": "Restablecer Todo",
  "shop.filter.showResults": "Mostrar Resultados",
  "shop.filter.categories": "Categorías",
  "shop.filter.brands": "Marcas",
  "shop.filter.models": "Modulos",
  "shop.filter.searchPlaceholder": "Buscar {title}...",
  "shop.filter.noCategories": "No hay categorías que coincidan.",
  "shop.filter.noBrands": "No hay marcas que coincidan.",
  "shop.filter.noModels": "No se encontraron modelos para esta marca.",
  "shop.results.showing": "Mostrando",
  "shop.results.of": "de",
  "shop.results.results": "resultados",
  "shop.sort.latest": "Ordenar por más reciente",
  "shop.noProducts.title": "No se encontraron productos",
  "shop.noProducts.sub":
    "No pudimos encontrar ningún producto que coincida con sus filtros. Intente ajustar su búsqueda.",
  "shop.noProducts.clearBtn": "Limpiar Filtros",
  "shop.cart.addSuccess": "¡Añadido al carrito!",
  "shop.cart.addError": "No se pudo añadir al carrito.",
  "shop.cart.loginError":
    "Por favor, inicie sesión para añadir artículos a su carrito.",
  //dislaimer
  // SPANISH (es)
  "footer.disclaimer.p1":
    "Todos los nombres de marcas, logotipos y marcas comerciales que se muestran en este sitio web son solo de referencia. Own Silent International Limited no está afiliada, respaldada ni autorizada por ningún fabricante de vehículos. Todos los nombres de productos, números y imágenes son solo para fines de identificación y compatibilidad.",
  "footer.disclaimer.p2":
    "Fabricamos y comercializamos piezas de automoción de posventa, originales y personalizadas en todo el mundo. Los clientes son responsables de garantizar el cumplimiento legal y el uso adecuado de todos los productos. Own Silent International Limited no es responsable de daños, modificaciones de vehículos o impactos en la garantía resultantes del uso de nuestros productos.",
  "footer.disclaimer.p3":
    "El uso de este sitio web y la compra de productos constituye la aceptación de nuestro descargo de responsabilidad completo. Para los términos legales completos, consulte nuestra",
  "footer.disclaimer.link": "Página de descargo de responsabilidad completo",
  "footer.copyright.short":
    "Todas las marcas son solo de referencia; no estamos afiliados a ningún fabricante. El uso de los productos es bajo su propio riesgo. Consulte nuestro {link} para más detalles.",
  "footer.copyright.link": "Descargo de responsabilidad completo",

  // Showcase
  "showcase.series": "Serie de Alto Rendimiento",
  "showcase.stats": "Estadísticas de Ingeniería",
  "showcase.status": "Escaparate",
  "showcase.paused": "Pausado",
  "showcase.auto": "Auto",
  "showcase.osPerformance": "RENDIMIENTO OS",
  "showcase.est": "EST. 1998",
  "showcase.aerospace": "GRADO AEROESPACIAL",
  "showcase.discover": "DESCUBRE EL PODER ILIMITADO",

  "showcase.part1.name": "Rotores de Matriz de Carbono",
  "showcase.part1.headline": "Maestría Térmica en Cada Parada.",
  "showcase.part1.desc":
    "Nuestros rotores de matriz cerámica de carbono proporcionan una disipación de calor inigualable y cero fatiga de frenos, incluso en condiciones extremas de pista.",
  "showcase.part1.bgText": "PODER",
  "showcase.part1.s1.l": "Material",
  "showcase.part1.s1.v": "Carbono-Silicio",
  "showcase.part1.s2.l": "Límite de Calor",
  "showcase.part1.s2.v": "1200°C",
  "showcase.part1.s3.l": "Red. de Peso",
  "showcase.part1.s3.v": "45%",

  "showcase.part2.name": "Llantas Forjadas Aero-S",
  "showcase.part2.headline": "Ligero. Forjado. Imparable.",
  "showcase.part2.desc":
    "Diseñadas con precisión a partir de aluminio 6061-T6 de grado aeroespacial, la serie Aero-S reduce significativamente la masa no suspendida para un manejo superior.",
  "showcase.part2.bgText": "LIGERO",
  "showcase.part2.s1.l": "Proceso",
  "showcase.part2.s1.v": "8000T Forjado",
  "showcase.part2.s2.l": "Capacidad de Carga",
  "showcase.part2.s2.v": "950kg",
  "showcase.part2.s3.l": "Peso de Llanta",
  "showcase.part2.s3.v": "8.2kg",

  "showcase.part3.name": "Coilovers de Nitro Adaptativos",
  "showcase.part3.headline": "Precisión Perfeccionada.",
  "showcase.part3.desc":
    "Amortiguadores cargados con nitrógeno de respuesta ultra rápida con ajuste de 32 vías, ofreciendo el equilibrio perfecto entre rigidez de pista y comodidad en carretera.",
  "showcase.part3.bgText": "DESLICE",
  "showcase.part3.s1.l": "Ajuste",
  "showcase.part3.s1.v": "32 vías",
  "showcase.part3.s2.l": "Tipo de Gas",
  "showcase.part3.s2.v": "N2 de alta pureza",
  "showcase.part3.s3.l": "Carrera",
  "showcase.part3.s3.v": "110mm",

  "showcase.part4.name": "Faros LASER de Matriz",
  "showcase.part4.headline": "Iluminando el camino por delante.",
  "showcase.part4.desc":
    "Sistema de proyección láser de alta definición con tecnología de haz adaptativo, que proporciona hasta 600 m de visibilidad clara.",
  "showcase.part4.bgText": "LUZ",
  "showcase.part4.s1.l": "Alcance",
  "showcase.part4.s1.v": "600m",
  "showcase.part4.s2.l": "Tecnología",
  "showcase.part4.s2.v": "Matriz Láser",
  "showcase.part4.s3.l": "Eficiencia",
  "showcase.part4.s3.v": "A+++",

  "showcase.part5.name": "Kit Aero de Carbono Forjado",
  "showcase.part5.headline": "Aerodinámica Redefinida.",
  "showcase.part5.desc":
    "Componentes de fibra de carbono forjada ultraligeros diseñados para una carga aerodinámica máxima y una estética agresiva.",
  "showcase.part5.bgText": "AERO",
  "showcase.part5.s1.l": "Material",
  "showcase.part5.s1.v": "Carbono Forjado",
  "showcase.part5.s2.l": "Carga Aerod.",
  "showcase.part5.s2.v": "+120kg",
  "showcase.part5.s3.l": "Red. Peso",
  "showcase.part5.s3.v": "-15kg",

  // What We Do Section
  "whatWeDo.badge": "Nuestros Servicios",
  "whatWeDo.title": "Lo Que",
  "whatWeDo.titleHighlight": "Hacemos",
  "whatWeDo.subtitle":
    "Ofrecemos soluciones automotrices premium con ingeniería de precisión y calidad inigualable.",
  "whatWeDo.feature1.title": "Suministro de Piezas Premium",
  "whatWeDo.feature1.desc":
    "Componentes de alto rendimiento de los mejores fabricantes del mundo.",
  "whatWeDo.feature2.title": "Garantía de Calidad",
  "whatWeDo.feature2.desc":
    "Cada pieza se prueba rigurosamente para cumplir y superar los estándares OEM.",
  "whatWeDo.feature3.title": "Instalación Experta",
  "whatWeDo.feature3.desc":
    "Servicios de instalación profesional a través de nuestra red global de socios.",
  "whatWeDo.feature4.title": "Envío Mundial",
  "whatWeDo.feature4.desc":
    "Entrega rápida y confiable a clientes en todo el mundo.",

  // Premium Parts Categories
  "categories.badge": "Comprar por Categoría",
  "categories.title": "Elige Piezas Premium Para",
  "categories.titleHighlight": "Tu Auto",
  "categories.subtitle":
    "Explora nuestra selección curada de componentes automotrices de alto rendimiento.",
  "categories.viewAll": "Ver Todas las Categorías",

  // Our Gallery
  "gallery.badge": "Nuestro Trabajo",
  "gallery.title": "Nuestra",
  "gallery.titleHighlight": "Galería",
  "gallery.subtitle":
    "Explora nuestro portafolio de construcciones e instalaciones premium.",
  "gallery.img1.alt": "Instalación de frenos de cerámica carbono premium",
  "gallery.img2.alt": "Ajuste de kit de carrocería personalizado",
  "gallery.img3.alt": "Sistema de escape de alto rendimiento",
  "gallery.img4.alt": "Mejora de interior de lujo",
  "gallery.img5.alt": "Instalación de ruedas forjadas",
  "gallery.img6.alt": "Componentes de fibra de carbono",
  "gallery.img7.alt": "Transformación completa del vehículo",
  "gallery.img8.alt": "Trabajo de detallado profesional",

  // How We Work
  "howWeWork.badge": "Nuestro Proceso",
  "howWeWork.title": "Cómo",
  "howWeWork.titleHighlight": "Trabajamos",
  "howWeWork.subtitle":
    "Un proceso simple y transparente desde la selección hasta la instalación.",
  "howWeWork.step1.title": "Explorar y Seleccionar",
  "howWeWork.step1.desc":
    "Explora nuestro extenso catálogo y encuentra las piezas perfectas para tu vehículo.",
  "howWeWork.step2.title": "Realizar Pedido",
  "howWeWork.step2.desc":
    "Pago seguro con múltiples opciones de pago y confirmación instantánea.",
  "howWeWork.step3.title": "Entrega Rápida",
  "howWeWork.step3.desc":
    "Tus piezas se empaquetan cuidadosamente y se envían directamente a tu ubicación.",
  "howWeWork.step4.title": "Instalar y Disfrutar",
  "howWeWork.step4.desc":
    "Instalación profesional o hazlo tú mismo - te apoyamos en cada paso.",
  "howWeWork.cta.text": "¿Listo para mejorar tu vehículo?",
  "howWeWork.cta.button": "Comenzar a Comprar",

  // Reviews
  "reviews.badge": "Testimonios",
  "reviews.title": "Lo Que Dicen Nuestros",
  "reviews.titleHighlight": "Clientes",
  "reviews.subtitle":
    "Comentarios reales de conductores que confían en nosotros con sus vehículos.",
  "reviews.review1.name": "Marcus Rodríguez",
  "reviews.review1.car": "Porsche 911 GT3 RS",
  "reviews.review1.feedback":
    "Los rotores de cerámica carbono transformaron completamente mi rendimiento de frenado. Potencia de frenado increíble sin pérdida en la pista. La calidad de OwnSilent es inigualable.",
  "reviews.review1.location": "Miami, EE.UU.",
  "reviews.review2.name": "Sophie Laurent",
  "reviews.review2.car": "Ferrari 488 Pista",
  "reviews.review2.feedback":
    "Servicio excepcional de principio a fin. El equipo me ayudó a seleccionar el sistema de escape perfecto, y la instalación fue impecable. Mi Ferrari suena y funciona mejor que nunca.",
  "reviews.review2.location": "París, Francia",
  "reviews.review3.name": "Kenji Tanaka",
  "reviews.review3.car": "Lamborghini Huracán",
  "reviews.review3.feedback":
    "Piezas de calidad premium con soporte al cliente excepcional. El ajuste del kit de carrocería fue perfecto, y el envío a Japón fue más rápido de lo esperado. ¡Muy recomendado!",
  "reviews.review3.location": "Tokio, Japón",
  "reviews.review4.name": "Alexander Müller",
  "reviews.review4.car": "Audi RS6 Avant",
  "reviews.review4.feedback":
    "Experiencia profesional y pasión genuina por la excelencia automotriz. La mejora de suspensión ha cambiado completamente cómo maneja mi RS6. Vale cada centavo.",
  "reviews.review4.location": "Múnich, Alemania",

  // Footer Payment Methods
  "footer.payment.title": "Pagos Seguros",
  "footer.payment.subtitle":
    "Aceptamos pagos seguros a través de PayPal, tarjetas de crédito y débito principales, y transferencia bancaria.",
  "footer.payment.bank": "Transferencia Bancaria",

  // Common UI Text
  "common.learnMore": "Saber Más",
  "common.exploreMore": "Explorar piezas premium",
};

// ==========================================
// 3. GERMAN
// ==========================================
const deTranslations = {
  "nav.shop": "Einkaufen",
  "nav.about": "Über uns",
  "nav.blogs": "Blogs",
  "nav.news": "Nachrichten",
  "nav.contact": "Kontakt",
  "nav.home": "Startseite",
  "nav.cart": "Warenkorb",
  "nav.account": "Konto",
  "nav.rotors": "Carbon-Keramik-Rotoren",
  "auth.login": "Anmelden",
  "auth.signup": "Registrieren",
  "auth.logout": "Abmelden",
  "common.currency": "Währung",
  "common.language": "Sprache",
  "common.viewMore": "Mehr sehen",
  "hero.welcome": "Willkommen bei",
  "hero.desc":
    "Ein in Hongkong ansässiges Unternehmen für Luxus-Automobil-Tuning und globalen Handel, bekannt für seine Expertise in Hochleistungskomponenten und maßgeschneiderten Fahrzeuglösungen.",
  "hero.s1.t": "Carbon-Keramik-Bremssysteme",
  "hero.s1.d":
    "Entwickelt für maximale Bremskraft und unübertroffene thermische Stabilität.",
  "hero.s2.t": "Kohlefaserkomponenten",
  "hero.s2.d":
    "Komplette Body-Kits, aerodynamische Teile und luxuriöse Innenraumkomponenten.",
  "hero.s3.t": "Komplette Fahrzeugumbauten",
  "hero.s3.d":
    "Maßgeschneiderte Design- und Einbaulösungen für High-End-Fahrzeuge.",
  "hero.box.t": "Globale Expertise & Präzisionsfertigung",
  "hero.box.d":
    "Wir entwerfen, entwickeln und fertigen unsere Produkte gemäß OEM-Präzisionsstandards und testen sie vor dem Versand auf Qualität und Sicherheit.",
  "hero.list1": "Internes 3D-Design & Entwicklung",
  "hero.list2": "Globales Netzwerk von Installationspartnern",
  "hero.list3": "Weltweiter See- und Luftfrachtverkehr",
  "hero.footer":
    "Angetrieben von Innovation, Handwerkskunst und Leistung gestalten wir die Zukunft des Luxusauto-Tunings.",
  "feat.choose.t": "Warum",
  "feat.choose.h": "Uns wählen?",
  "feat.choose.d":
    "Wir sind bestrebt, Ihnen jederzeit den besten Service und die hochwertigsten Produkte zu bieten.",
  "feat.work.t": "Warum",
  "feat.work.h": "Mit uns arbeiten?",
  "feat.work.d":
    "Werden Sie Teil eines dynamischen Teams an der Spitze der Automobilinnovation und bauen Sie eine lohnende Karriere auf.",
  "feat.contact": "Unser Team kontaktieren",
  "feat.c.shipping.t": "Schneller & Zuverlässiger Versand",
  "feat.c.shipping.d": "Bestellungen werden umgehend an Ihre Haustür versandt.",
  "feat.c.coverage.t": "Bundesweite Abdeckung",
  "feat.c.coverage.d": "Lieferung in jede Ecke Indiens.",
  "feat.c.quality.t": "Qualität, der Sie vertrauen können",
  "feat.c.quality.d":
    "Unsere #1-Priorität ist es, Premium-Qualität anzubieten.",
  "feat.c.support.t": "Engagierter Experten-Support",
  "feat.c.support.d": "Unser Team ist hier, um zu helfen, 9 - 17 Uhr.",
  "feat.w.innovate.t": "Innovatives Umfeld",
  "feat.w.innovate.d":
    "Arbeiten Sie mit modernster Technologie und innovativen Fertigungsprozessen.",
  "feat.w.global.t": "Globale Präsenz",
  "feat.w.global.d":
    "Werden Sie Teil eines Unternehmens, das weltweit liefert und mit Partnern zusammenarbeitet.",
  "feat.w.growth.t": "Berufliches Wachstum",
  "feat.w.growth.d":
    "Möglichkeiten für Schulungen, Kompetenzentwicklung und Karriereaufstieg.",
  "feat.w.roles.t": "Vielfältige Rollen",
  "feat.w.roles.d":
    "Von Engineering und F&E bis hin zu Vertrieb, Marketing und Logistik.",
  "feat.w.impact.t": "Wirkungsvolle Arbeit",
  "feat.w.impact.d":
    "Tragen Sie zur Entwicklung von Premium-Lösungen für Luxusautos bei.",
  "about.title": "Wir treiben Ihre Reise",
  "about.titleHighlight": "Voran",
  "about.intro":
    "Bei OwnSilent verkaufen wir nicht nur Autoteile – wir bauen Beziehungen auf, die auf Vertrauen und Qualität basieren.",
  "about.mission":
    "Unsere Mission ist einfach: Enthusiasten mit den hochwertigsten Teilen zu versorgen, gepaart mit kompetenter Beratung.",
  "about.f.quality.title": "Qualität",
  "about.f.quality.desc":
    "Sorgfältig auf überlegene Qualität und Haltbarkeit geprüft.",
  "about.f.shipping.title": "Versand",
  "about.f.shipping.desc": "Teile kommen schnell und sicher bei Ihnen an.",
  "about.f.support.title": "Unterstützung",
  "about.f.support.desc": "Unser kompetentes Team ist immer für Sie da.",
  "blog.title": "Neues aus unserem",
  "blog.highlight": "Blog",
  "blog.subtitle":
    "Bleiben Sie auf dem Laufenden über Trends und Technologien aus der Automobilwelt.",
  "blog.viewAll": "Alle Blogs anzeigen",
  "cat.explore": "Entdecken Sie unsere Kollektionen",
  "cat.featured": "Beliebte Kategorien",
  "cat.subtitle":
    "Entdecken Sie kuratierte Kollektionen für jeden Teil Ihres Fahrzeugs.",
  "cat.noContent": "Kein Inhalt für diese Kategorie verfügbar.",
  // ===================================
  "ccr.page.title": "Carbon-Keramik-Rotoren",
  "ccr.find.title": "Finden Sie Ihren perfekten Carbon-Keramik-Rotor",
  "ccr.find.sub":
    "Wählen Sie Ihr Fahrzeug, um Premium-Rotoren für maximale Leistung zu entdecken.",
  "ccr.noProducts.title": "Keine passenden Produkte",
  "ccr.noProducts.sub":
    "Ihre Auswahl ergab keine Treffer. Versuchen Sie einen anderen Filter.",
  "ccr.hero.sub": "Ultimative Bremstechnologie",
  "ccr.hero.title": "Carbon-Keramik-Rotoren",
  "ccr.hero.desc":
    "Die Spitze der Motorsport-Bremstechnologie, entwickelt für die Straße.",
  "ccr.feature1": "Leichtbauweise",
  "ccr.feature2": "Überlegene Wärmeableitung",
  "ccr.feature3": "Verlängerte Lebensdauer",
  "ccr.faq.title": "Ihre Fragen, beantwortet",
  "ccr.faq1.q":
    "Was macht Carbon-Keramik-Rotoren besser als Standard-Eisenrotoren?",
  "ccr.faq1.a":
    "Carbon-Keramik-Rotoren sind bis zu 60% leichter und bieten eine überlegene Hitzebeständigkeit.",
  "ccr.faq2.q":
    "Sind OWNSILENT Carbon-Keramik-Kits für den täglichen Gebrauch geeignet?",
  "ccr.faq2.a":
    "Ja. Unsere Kits sind für den Straßeneinsatz optimiert und bieten einen leisen Betrieb.",
  "ccr.faq3.q": "Benötigen Carbon-Keramik-Bremsen besondere Wartung?",
  "ccr.faq3.a":
    "Die Wartung ist minimal - sie produzieren fast keinen Bremsstaub und halten deutlich länger.",
  // GERMAN (de) - For About Us Page
  "aboutPage.meta": "Über OwnSilent",
  "aboutPage.title": "Die Zukunft der automobilen Leistung gestalten",
  "aboutPage.subtitle":
    "Seit 2015 sind wir der globale Maßstab für Qualität und Vertrauen bei Hochleistungs-Autoteilen und maßgeschneiderten Fahrzeuganpassungen.",
  "aboutPage.exploreBtn": "Unsere Produkte entdecken",
  "aboutPage.story.meta": "Unsere Geschichte",
  "aboutPage.story.title": "Angetrieben von Leidenschaft, gebaut auf Vertrauen",
  "aboutPage.story.p1":
    "OwnSilent entstand aus einer einfachen Leidenschaft: das Finden des perfekten Bauteils zu einem einfachen, transparenten und zufriedenstellenden Erlebnis für jeden Enthusiasten zu machen.",
  "aboutPage.story.p2":
    "Jeder Kauf bei uns ist mehr als eine Transaktion; es ist ein Schritt zur Wartung und Aufrüstung Ihres Fahrzeugs mit vollem Vertrauen und Weltklasse-Qualität.",
  "aboutPage.principles.meta": "Unsere Prinzipien",
  "aboutPage.principles.title": "Unser Versprechen an Sie",
  "aboutPage.principles.sub":
    "Wir bauen auf Grundwerten, die jede unserer Entscheidungen und Interaktionen mit unserer globalen Gemeinschaft leiten.",
  "aboutPage.value1.t": "Kompromisslose Qualität",
  "aboutPage.value1.d":
    "Wir sind bestrebt, Ihnen die besten Teile zu liefern und sicherzustellen, dass jede Komponente unseren strengen Qualitätsstandards entspricht.",
  "aboutPage.value2.t": "Expertise & Leidenschaft",
  "aboutPage.value2.d":
    "Unser Team besteht aus Auto-Enthusiasten und Experten, die bereit sind, Sie auf Ihrer Reise zu begleiten.",
  "aboutPage.value3.t": "Vertrauen & Transparenz",
  "aboutPage.value3.d":
    "Die Zufriedenheit unserer Kunden hat für uns Priorität. Wir handeln integer, um dauerhafte Beziehungen aufzubauen.",
  "aboutPage.careers.meta": "Karriere",
  "aboutPage.careers.title":
    "Werden Sie Teil eines globalen Führers für automobile Innovation",
  "aboutPage.careers.sub":
    "Wir sind immer auf der Suche nach talentierten Personen, die sich unserer Mission anschließen möchten.",
  "aboutPage.careers.why.t": "Warum bei uns arbeiten?",
  "aboutPage.careers.why.l1":
    "Arbeiten Sie mit modernster Technologie und innovativen Automobilprozessen.",
  "aboutPage.careers.why.l2":
    "Werden Sie Teil eines Unternehmens, das weltweit liefert und mit Partnern zusammenarbeitet.",
  "aboutPage.careers.why.l3":
    "Nutzen Sie Möglichkeiten für Schulungen, Kompetenzentwicklung und Karriereaufstieg.",
  "aboutPage.careers.why.l4":
    "Tragen Sie zur Entwicklung von Premium-Lösungen für Luxusautos bei.",
  "aboutPage.careers.open.t": "Offene Fachbereiche",
  "aboutPage.careers.open.sub":
    "Wir freuen uns über Bewerbungen in verschiedenen Geschäftsbereichen. Wenn Sie die Fähigkeiten und die Leidenschaft haben, möchten wir von Ihnen hören.",
  "aboutPage.careers.cat1": "Ingenieurwesen & Fertigung",
  "aboutPage.careers.cat2": "Forschung & Entwicklung",
  "aboutPage.careers.cat3": "Vertrieb & Händlerbeziehungen",
  "aboutPage.careers.cat4": "Marketing & Kommunikation",
  "aboutPage.careers.cat5": "Betrieb & Logistik",
  "aboutPage.careers.cat6": "Kunden- & technischer Support",

  "home.banner.title": "Erleben Sie Höchstleistung",
  "home.banner.desc":
    "Verbessern Sie Ihr Fahrzeug mit unseren erstklassigen Carbon-Komponenten und Präzisionstechnik.",
  "home.banner.btn": "Kollektion ansehen",
  //news page // ===================================
  "newsPage.loading": "Artikel werden geladen...",
  "newsPage.title": "Nachrichten & Einblicke",
  "newsPage.subtitle":
    "Ihre Quelle für das Neueste aus Autoteilen und Leistung.",
  "newsPage.filter.title": "Artikel filtern",
  "newsPage.filter.reset": "Alle Filter zurücksetzen",
  "newsPage.readMore": "Weiterlesen",
  "newsPage.noArticles.title": "Keine Artikel gefunden",
  // GERMAN (de) - For Contact Us Page
  // ===================================
  "contact.hero.meta": "24/7 Support verfügbar",
  "contact.hero.title": "Kontakt aufnehmen",
  "contact.hero.sub":
    "Benötigen Sie ein bestimmtes Teil oder haben Sie eine Frage zu Ihrer Bestellung? Wir sind hier, um Ihnen zu helfen.",
  "contact.info.title": "Kontaktinformationen",
  "contact.info.email.title": "E-Mail an uns",
  "contact.info.email.sub": "Für allgemeine Anfragen & Vertrieb",
  "contact.info.phone.title": "Rufen Sie uns an",
  "contact.info.phone.sub": "Mo-Fr von 9 bis 18 Uhr",
  "contact.info.addr.title": "Besuchen Sie uns",
  "contact.help.title": "Benötigen Sie sofortige Hilfe?",
  "contact.help.sub":
    "Lesen Sie unsere häufig gestellten Fragen für schnelle Antworten.",
  "contact.help.btn": "Hilfezentrum besuchen",
  "contact.tab.request": "Teil anfordern",
  "contact.tab.support": "Hilfe & Support",
  "contact.form.s1.title": "Ihre Kontaktdaten",
  "contact.form.s2.request.title": "Teile- & Versanddetails",
  "contact.form.s2.support.title": "Wie können wir helfen?",
  "contact.form.fullName": "Vollständiger Name",
  "contact.form.email": "E-Mail-Adresse",
  "contact.form.phone": "Telefonnummer",
  "contact.form.partName": "Teilename / Beschreibung",
  "contact.form.brand": "Automarke",
  "contact.form.model": "Automodell",
  "contact.form.year": "Baujahr",
  "contact.form.address": "Versandadresse",
  "contact.form.street": "Straße",
  "contact.form.city": "Stadt",
  "contact.form.state": "Bundesland",
  "contact.form.zip": "Postleitzahl",
  "contact.form.subject": "Betreff",
  "contact.form.message": "Zusätzliche Nachricht",
  "contact.form.submitBtn": "Anfrage senden",
  "contact.form.submitting": "Wird gesendet...",
  "contact.form.success.title": "Vielen Dank!",
  "contact.form.success.sub":
    "Wir haben Ihre Nachricht erhalten. Unser Team wird sie prüfen und sich in Kürze bei Ihnen melden.",
  "contact.form.success.btn": "Weiter einkaufen",
  // GERMAN (de) - For Shop Page
  // ===================================
  "shop.loading": "Produkte werden geladen...",
  "shop.title": "Alle Teile einkaufen",
  "shop.subtitle": "Premium-Autoteile von den besten Herstellern weltweit.",
  "shop.search.placeholder": "Suche nach Produktname, SKU oder Teilenummer...",
  "shop.filter.title": "Filter",
  "shop.filter.reset": "Zurücksetzen",
  "shop.filter.resetAll": "Alles zurücksetzen",
  "shop.filter.showResults": "Ergebnisse anzeigen",
  "shop.filter.categories": "Kategorien",
  "shop.filter.brands": "Marken",
  "shop.filter.models": "Modelle",
  "shop.filter.searchPlaceholder": "Suche {title}...",
  "shop.filter.noCategories": "Keine passenden Kategorien.",
  "shop.filter.noBrands": "Keine passenden Marken.",
  "shop.filter.noModels": "Keine Modelle für diese Marke gefunden.",
  "shop.results.showing": "Zeige",
  "shop.results.of": "von",
  "shop.results.results": "Ergebnissen",
  "shop.sort.latest": "Sortieren nach Neueste",
  "shop.noProducts.title": "Keine Produkte gefunden",
  "shop.noProducts.sub":
    "Wir konnten keine Produkte finden, die Ihren Filtern entsprechen. Versuchen Sie, Ihre Suche anzupassen.",
  "shop.noProducts.clearBtn": "Filter löschen",
  "shop.cart.addSuccess": "Zum Warenkorb hinzugefügt!",
  "shop.cart.addError": "Konnte nicht zum Warenkorb hinzugefügt werden.",
  "shop.cart.loginError":
    "Bitte melden Sie sich an, um Artikel in Ihren Warenkorb zu legen.",
  // GERMAN (de) - For Footer Disclaimer
  // ===================================
  "footer.disclaimer.p1":
    "Alle auf dieser Website angezeigten Markennamen, Logos und Warenzeichen dienen nur als Referenz. Own Silent International Limited ist nicht mit Fahrzeugherstellern verbunden, von diesen unterstützt oder autorisiert. Alle Produktnamen, Nummern und Bilder dienen nur zu Identifikations- und Kompatibilitätszwecken.",
  "footer.disclaimer.p2":
    "Wir produzieren und handeln weltweit mit Aftermarket-, Original- und kundenspezifischen Autoteilen. Die Kunden sind für die Einhaltung der gesetzlichen Bestimmungen, die sichere Installation und die ordnungsgemäße Verwendung aller Produkte. Own Silent International Limited haftet nicht für Schäden, Fahrzeugmodifikationen oder Garantieauswirkungen, die aus der Verwendung unserer Produkte resultieren.",
  "footer.disclaimer.p3":
    "Die Nutzung dieser Website und der Kauf von Produkten stellen die Annahme unseres vollständigen Haftungsausschlusses dar. Die vollständigen rechtlichen Bedingungen finden Sie auf unserer",
  "footer.disclaimer.link": "Vollständige Haftungsausschluss-Seite",
  "footer.copyright.short":
    "Alle Marken, Logos und Warenzeichen dienen nur als Referenz; wir sind nicht mit einem Hersteller verbunden oder von diesem unterstützt. Produkte sind Aftermarket, Original oder kundenspezifisch; Verwendung auf eigene Gefahr. Siehe unseren {link} für Details.",
  "footer.copyright.link": "Vollständigen Haftungsausschluss",

  // Showcase
  "showcase.series": "Hochleistungsserie",
  "showcase.stats": "Technische Daten",
  "showcase.status": "Showcase",
  "showcase.paused": "Pausiert",
  "showcase.auto": "Auto",
  "showcase.osPerformance": "OS PERFORMANCE",
  "showcase.est": "SEIT 1998",
  "showcase.aerospace": "AEROSPACE GRADE",
  "showcase.discover": "ENTDECKE GRENZENLOSE POWER",

  "showcase.part1.name": "Carbon-Matrix-Rotoren",
  "showcase.part1.headline": "Thermische Meisterschaft bei jedem Stopp.",
  "showcase.part1.desc":
    "Unsere Carbon-Keramik-Matrix-Rotoren bieten eine unerreichte Wärmeableitung und null Bremsfading, sogar unter extremen Rennstreckenbedingungen.",
  "showcase.part1.bgText": "POWER",
  "showcase.part1.s1.l": "Material",
  "showcase.part1.s1.v": "Carbon-Silizium",
  "showcase.part1.s2.l": "Hitzewert",
  "showcase.part1.s2.v": "1200°C",
  "showcase.part1.s3.l": "Gewichtsred.",
  "showcase.part1.s3.v": "45%",

  "showcase.part2.name": "Geschmiedete Aero-S Räder",
  "showcase.part2.headline": "Leichtgewicht. Geschmiedet. Unaufhaltsam.",
  "showcase.part2.desc":
    "Präzisionsgefertigt aus 6061-T6 Aluminium in Luftfahrtqualität, reduziert die Aero-S Serie die ungefederten Massen für überlegenes Handling erheblich.",
  "showcase.part2.bgText": "LEICHT",
  "showcase.part2.s1.l": "Verfahren",
  "showcase.part2.s1.v": "8000T Geschmiedet",
  "showcase.part2.s2.l": "Tragfähigkeit",
  "showcase.part2.s2.v": "950kg",
  "showcase.part2.s3.l": "Radgewicht",
  "showcase.part2.s3.v": "8.2kg",

  "showcase.part3.name": "Adaptive Nitro Gewindefahrwerke",
  "showcase.part3.headline": "Perfektionierte Präzision.",
  "showcase.part3.desc":
    "Ultraschnell ansprechende stickstoffgefüllte Dämpfer mit 32-facher Verstellung, die die perfekte Balance zwischen Steifigkeit auf der Rennstrecke und Komfort auf der Straße bieten.",
  "showcase.part3.bgText": "GLEITEN",
  "showcase.part3.s1.l": "Einstellung",
  "showcase.part3.s1.v": "32-fach Klick",
  "showcase.part3.s2.l": "Gastype",
  "showcase.part3.s2.v": "Hochreines N2",
  "showcase.part3.s3.l": "Hub",
  "showcase.part3.s3.v": "110mm",

  "showcase.part4.name": "Matrix LASER Scheinwerfer",
  "showcase.part4.headline": "Den Weg nach vorne beleuchten.",
  "showcase.part4.desc":
    "Hochauflösendes Laserprojektionssystem mit adaptiver Strahltechnologie, das bis zu 600 m kristallklare Sicht bietet.",
  "showcase.part4.bgText": "LICHT",
  "showcase.part4.s1.l": "Reichweite",
  "showcase.part4.s1.v": "600m",
  "showcase.part4.s2.l": "Technik",
  "showcase.part4.s2.v": "Laser Matrix",
  "showcase.part4.s3.l": "Effizienz",
  "showcase.part4.s3.v": "A+++",

  "showcase.part5.name": "Geschmiedetes Carbon Aero Kit",
  "showcase.part5.headline": "Aerodynamik neu definiert.",
  "showcase.part5.desc":
    "Ultraleichte Komponenten aus geschmiedeter Kohlefaser, entwickelt für maximalen Abtrieb und aggressive Ästhetik.",
  "showcase.part5.bgText": "AERO",
  "showcase.part5.s1.l": "Material",
  "showcase.part5.s1.v": "Schmiede-Carbon",
  "showcase.part5.s2.l": "Abtrieb",
  "showcase.part5.s2.v": "+120kg",
  "showcase.part5.s3.l": "Gewichtsred.",
  "showcase.part5.s3.v": "-15kg",

  // What We Do Section
  "whatWeDo.badge": "Unsere Dienstleistungen",
  "whatWeDo.title": "Was Wir",
  "whatWeDo.titleHighlight": "Tun",
  "whatWeDo.subtitle":
    "Wir liefern Premium-Automobilösungen mit Präzisionstechnik und unübertroffener Qualität.",
  "whatWeDo.feature1.title": "Premium-Teileversorgung",
  "whatWeDo.feature1.desc":
    "Hochleistungskomponenten von führenden Herstellern weltweit.",
  "whatWeDo.feature2.title": "Qualitätssicherung",
  "whatWeDo.feature2.desc":
    "Jedes Teil wird rigoros getestet, um OEM-Standards zu erfüllen und zu übertreffen.",
  "whatWeDo.feature3.title": "Fachgerechte Installation",
  "whatWeDo.feature3.desc":
    "Professionelle Einbaudienste durch unser globales Partnernetzwerk.",
  "whatWeDo.feature4.title": "Weltweiter Versand",
  "whatWeDo.feature4.desc":
    "Schnelle und zuverlässige Lieferung an Kunden weltweit.",

  // Premium Parts Categories
  "categories.badge": "Nach Kategorie Einkaufen",
  "categories.title": "Wählen Sie Premium-Teile Für",
  "categories.titleHighlight": "Ihr Auto",
  "categories.subtitle":
    "Entdecken Sie unsere kuratierte Auswahl an Hochleistungs-Automobilkomponenten.",
  "categories.viewAll": "Alle Kategorien Anzeigen",

  // Our Gallery
  "gallery.badge": "Unsere Arbeit",
  "gallery.title": "Unsere",
  "gallery.titleHighlight": "Galerie",
  "gallery.subtitle":
    "Erkunden Sie unser Portfolio an Premium-Builds und Installationen.",
  "gallery.img1.alt": "Premium Carbon-Keramik-Bremsinstallation",
  "gallery.img2.alt": "Maßgeschneiderter Karosserie-Kit-Einbau",
  "gallery.img3.alt": "Hochleistungs-Abgasanlage",
  "gallery.img4.alt": "Luxus-Innenraum-Upgrade",
  "gallery.img5.alt": "Geschmiedete Felgeninstallation",
  "gallery.img6.alt": "Carbon-Komponenten",
  "gallery.img7.alt": "Komplette Fahrzeugumwandlung",
  "gallery.img8.alt": "Professionelle Detailarbeit",

  // How We Work
  "howWeWork.badge": "Unser Prozess",
  "howWeWork.title": "Wie Wir",
  "howWeWork.titleHighlight": "Arbeiten",
  "howWeWork.subtitle":
    "Ein einfacher, transparenter Prozess von der Auswahl bis zur Installation.",
  "howWeWork.step1.title": "Durchsuchen & Auswählen",
  "howWeWork.step1.desc":
    "Erkunden Sie unseren umfangreichen Katalog und finden Sie die perfekten Teile für Ihr Fahrzeug.",
  "howWeWork.step2.title": "Bestellung Aufgeben",
  "howWeWork.step2.desc":
    "Sichere Bezahlung mit mehreren Zahlungsoptionen und sofortiger Bestätigung.",
  "howWeWork.step3.title": "Schnelle Lieferung",
  "howWeWork.step3.desc":
    "Ihre Teile werden sorgfältig verpackt und direkt an Ihren Standort versandt.",
  "howWeWork.step4.title": "Installieren & Genießen",
  "howWeWork.step4.desc":
    "Professionelle Installation oder Selbstmontage - wir unterstützen Sie bei jedem Schritt.",
  "howWeWork.cta.text": "Bereit, Ihr Fahrzeug aufzurüsten?",
  "howWeWork.cta.button": "Jetzt Einkaufen",

  // Reviews
  "reviews.badge": "Erfahrungsberichte",
  "reviews.title": "Was Unsere Kunden",
  "reviews.titleHighlight": "Sagen",
  "reviews.subtitle":
    "Echtes Feedback von Fahrern, die uns mit ihren Fahrzeugen vertrauen.",
  "reviews.review1.name": "Marcus Rodriguez",
  "reviews.review1.car": "Porsche 911 GT3 RS",
  "reviews.review1.feedback":
    "Die Carbon-Keramik-Rotoren haben meine Bremsleistung komplett transformiert. Unglaubliche Bremskraft ohne Fade auf der Rennstrecke. OwnSilents Qualität ist unübertroffen.",
  "reviews.review1.location": "Miami, USA",
  "reviews.review2.name": "Sophie Laurent",
  "reviews.review2.car": "Ferrari 488 Pista",
  "reviews.review2.feedback":
    "Hervorragender Service von Anfang bis Ende. Das Team half mir, das perfekte Abgassystem auszuwählen, und die Installation war makellos. Mein Ferrari klingt und fährt besser als je zuvor.",
  "reviews.review2.location": "Paris, Frankreich",
  "reviews.review3.name": "Kenji Tanaka",
  "reviews.review3.car": "Lamborghini Huracán",
  "reviews.review3.feedback":
    "Premium-Qualitätsteile mit außergewöhnlichem Kundenservice. Die Karosserie-Kit-Passform war perfekt, und der Versand nach Japan war schneller als erwartet. Sehr empfehlenswert!",
  "reviews.review3.location": "Tokio, Japan",
  "reviews.review4.name": "Alexander Müller",
  "reviews.review4.car": "Audi RS6 Avant",
  "reviews.review4.feedback":
    "Professionelle Expertise und echte Leidenschaft für automobile Exzellenz. Das Fahrwerks-Upgrade hat komplett verändert, wie mein RS6 fährt. Jeden Cent wert.",
  "reviews.review4.location": "München, Deutschland",

  // Footer Payment Methods
  "footer.payment.title": "Sichere Zahlungen",
  "footer.payment.subtitle":
    "Wir akzeptieren sichere Zahlungen über PayPal, gängige Kredit- und Debitkarten sowie Banküberweisung.",
  "footer.payment.bank": "Banküberweisung",

  // Common UI Text
  "common.learnMore": "Mehr Erfahren",
  "common.exploreMore": "Premium-Teile erkunden",
};

// ==========================================
// 4. FRENCH
// ==========================================
const frTranslations = {
  "nav.shop": "Boutique",
  "nav.about": "À propos",
  "nav.blogs": "Blog",
  "nav.news": "Actualités",
  "nav.contact": "Contact",
  "nav.home": "Accueil",
  "nav.cart": "Panier",
  "nav.account": "Compte",
  "nav.rotors": "Rotors Carbone-Céramique",
  "auth.login": "Connexion",
  "auth.signup": "Inscription",
  "auth.logout": "Déconnexion",
  "common.currency": "Devise",
  "common.language": "Langue",
  "common.viewMore": "Voir plus",
  "hero.welcome": "Bienvenue chez",
  "hero.desc":
    "Une société de tuning automobile de luxe et de commerce mondial basée à Hong Kong, réputée pour son expertise dans les composants haute performance et les solutions de véhicules sur mesure.",
  "hero.s1.t": "Systèmes de freinage carbone-céramique",
  "hero.s1.d":
    "Conçus pour une puissance de freinage maximale et une stabilité thermique inégalée.",
  "hero.s2.t": "Composants en fibre de carbone",
  "hero.s2.d":
    "Kits de carrosserie complets, pièces aérodynamiques et composants intérieurs de luxe.",
  "hero.s3.t": "Conversions complètes de véhicules",
  "hero.s3.d":
    "Solutions de conception et d'ajustement sur mesure pour les véhicules haut de gamme.",
  "hero.box.t": "Expertise mondiale et fabrication de précision",
  "hero.box.d":
    "Nous concevons, développons et fabriquons nos produits selon les normes de précision OEM, en testant la qualité et la sécurité avant l'expédition.",
  "hero.list1": "Conception et développement 3D en interne",
  "hero.list2": "Réseau mondial de partenaires d'installation",
  "hero.list3": "Fret maritime et aérien mondial",
  "hero.footer":
    "Poussés par l'innovation, l'artisanat et la performance, nous façonnons l'avenir du tuning de voitures de luxe.",
  "feat.choose.t": "Pourquoi",
  "feat.choose.h": "Nous choisir ?",
  "feat.choose.d":
    "Nous nous engageons à vous fournir le meilleur service et des produits de la plus haute qualité, à chaque fois.",
  "feat.work.t": "Pourquoi",
  "feat.work.h": "Travailler avec nous ?",
  "feat.work.d":
    "Rejoignez une équipe dynamique à la pointe de l'innovation automobile et construisez une carrière enrichissante.",
  "feat.contact": "Contacter notre équipe",
  "feat.c.shipping.t": "Livraison rapide et fiable",
  "feat.c.shipping.d": "Commandes expédiées rapidement à votre porte.",
  "feat.c.coverage.t": "Couverture nationale",
  "feat.c.coverage.d": "Livraison dans tous les coins de l'Inde.",
  "feat.c.quality.t": "Une qualité de confiance",
  "feat.c.quality.d": "Notre priorité n°1 est d'offrir une qualité supérieure.",
  "feat.c.support.t": "Support expert dédié",
  "feat.c.support.d": "Notre équipe est là pour vous aider, de 9h à 17h.",
  "feat.w.innovate.t": "Environnement innovant",
  "feat.w.innovate.d":
    "Travaillez avec des technologies de pointe et des processus de fabrication automobile de premier plan.",
  "feat.w.global.t": "Exposition mondiale",
  "feat.w.global.d":
    "Faites partie d'une entreprise qui expédie et collabore avec des partenaires du monde entier.",
  "feat.w.growth.t": "Croissance professionnelle",
  "feat.w.growth.d":
    "Opportunités de formation, de développement des compétences et d'avancement de carrière.",
  "feat.w.roles.t": "Rôles diversifiés",
  "feat.w.roles.d":
    "De l'ingénierie et de la R&D aux ventes, au marketing et à la logistique.",
  "feat.w.impact.t": "Travail percutant",
  "feat.w.impact.d":
    "Contribuez à la création de solutions haut de gamme pour les voitures de luxe.",
  "about.title": "Faire avancer votre",
  "about.titleHighlight": "Voyage",
  "about.intro":
    "Chez OwnSilent, nous ne vendons pas seulement des pièces automobiles, nous construisons des relations basées sur la confiance et la qualité.",
  "about.mission":
    "Notre mission est simple : fournir aux passionnés les pièces de la plus haute qualité, accompagnées de conseils d'experts.",
  "about.f.quality.title": "Qualité",
  "about.f.quality.desc":
    "Testé rigoureusement pour une qualité et une durabilité supérieures.",
  "about.f.shipping.title": "Expédition",
  "about.f.shipping.desc":
    "Les pièces arrivent rapidement et en toute sécurité.",
  "about.f.support.title": "Soutien",
  "about.f.support.desc":
    "Notre équipe compétente est toujours là pour vous aider.",
  "blog.title": "Dernières nouvelles de notre",
  "blog.highlight": "Blog",
  "blog.subtitle":
    "Restez à jour avec les tendances et les technologies du monde de l'automobile.",
  "blog.viewAll": "Voir tous les blogs",
  "cat.explore": "Explorez nos collections",
  "cat.featured": "Catégories en vedette",
  "cat.subtitle":
    "Découvrez des collections organisées pour chaque partie de votre véhicule.",
  "cat.noContent": "Aucun contenu en vedette disponible pour cette catégorie.",
  // ===================================
  "ccr.page.title": "Rotors Carbone-Céramique",
  "ccr.find.title": "Trouvez votre rotor en carbone-céramique parfait",
  "ccr.find.sub":
    "Sélectionnez votre véhicule pour découvrir des rotors haut de gamme conçus pour une performance maximale.",
  "ccr.noProducts.title": "Aucun produit correspondant",
  "ccr.noProducts.sub":
    "Votre sélection ne correspond à aucun produit. Essayez un autre filtre.",
  "ccr.hero.sub": "Technologie de freinage ultime",
  "ccr.hero.title": "Rotors Carbone-Céramique",
  "ccr.hero.desc":
    "Le summum de la technologie de freinage du sport automobile, conçu pour la route.",
  "ccr.feature1": "Construction légère",
  "ccr.feature2": "Dissipation thermique supérieure",
  "ccr.feature3": "Durée de vie prolongée",
  "ccr.faq.title": "Vos questions, nos réponses",
  "ccr.faq1.q":
    "Qu'est-ce qui rend les rotors en carbone-céramique meilleurs que les rotors en fer standard ,?",
  "ccr.faq1.a":
    "Les rotors en carbone-céramique sont jusqu'à 60 % plus légers et offrent une résistance supérieure à la chaleur.",
  "ccr.faq2.q":
    "Les kits en carbone-céramique OWNSILENT conviennent-ils à la conduite quotidienne ?",
  "ccr.faq2.a":
    "Oui. Nos kits sont entièrement optimisés pour un usage routier, offrant un fonctionnement silencieux.",
  "ccr.faq3.q":
    "Les freins en carbone-céramique nécessitent-ils un entretien particulier ?",
  "ccr.faq3.a":
    "L'entretien est minime - ils ne produisent presque pas de poussière de frein et durent beaucoup plus longtemps.",
  // FRENCH (fr) - For About Us Page
  // ===================================
  "aboutPage.meta": "À propos d'OwnSilent",
  "aboutPage.title": "Piloter l'avenir de la performance automobile",
  "aboutPage.subtitle":
    "Depuis 2015, nous sommes la référence mondiale en matière de qualité et de confiance pour les pièces automobiles haute performance et les personnalisations de véhicules sur mesure.",
  "aboutPage.exploreBtn": "Explorer nos produits",
  "aboutPage.story.meta": "Notre histoire",
  "aboutPage.story.title": "Poussé par la passion, bâti sur la confiance",
  "aboutPage.story.p1":
    "OwnSilent est né d'une passion simple : faire de la recherche du composant parfait une expérience simple, transparente et satisfaisante pour chaque passionné et conducteur.",
  "aboutPage.story.p2":
    "Chaque achat chez nous est plus qu'une transaction ; c'est un pas vers l'entretien et l'amélioration de votre véhicule en toute confiance et avec une qualité de classe mondiale.",
  "aboutPage.principles.meta": "Nos Principes",
  "aboutPage.principles.title": "Notre engagement envers vous",
  "aboutPage.principles.sub":
    "Nous sommes bâtis sur des valeurs fondamentales qui guident chaque décision que nous prenons et chaque interaction que nous avons.",
  "aboutPage.value1.t": "Qualité sans compromis",
  "aboutPage.value1.d":
    "Nous nous engageons à vous fournir les meilleures pièces, en veillant à ce que chaque composant réponde à nos normes d'excellence rigoureuses.",
  "aboutPage.value2.t": "Expertise & Passion",
  "aboutPage.value2.d":
    "Notre équipe est composée de passionnés et d'experts de l'automobile prêts à vous guider dans votre parcours.",
  "aboutPage.value3.t": "Confiance & Transparence",
  "aboutPage.value3.d":
    "La satisfaction du client est notre priorité. Nous opérons avec intégrité pour construire des relations durables.",
  "aboutPage.careers.meta": "Carrières",
  "aboutPage.careers.title":
    "Rejoignez un leader mondial de l'innovation automobile",
  "aboutPage.careers.sub":
    "Nous recherchons toujours des personnes talentueuses pour rejoindre notre mission de fournir des solutions automobiles de classe mondiale.",
  "aboutPage.careers.why.t": "Pourquoi travailler avec nous ?",
  "aboutPage.careers.why.l1":
    "Travaillez avec des technologies de pointe et des processus automobiles de premier plan.",
  "aboutPage.careers.why.l2":
    "Faites partie d'une entreprise qui collabore avec des partenaires du monde entier.",
  "aboutPage.careers.why.l3":
    "Accédez à des opportunités de formation, de développement des compétences et d'avancement de carrière.",
  "aboutPage.careers.why.l4":
    "Contribuez à la création de solutions haut de gamme pour les voitures de luxe, les VUS et les supercars.",
  "aboutPage.careers.open.t": "Domaines d'expertise ouverts",
  "aboutPage.careers.open.sub":
    "Nous acceptons les candidatures dans plusieurs domaines d'activité. Si vous avez les compétences et la passion, nous voulons vous entendre.",
  "aboutPage.careers.cat1": "Ingénierie et fabrication",
  "aboutPage.careers.cat2": "Recherche et développement",
  "aboutPage.careers.cat3": "Ventes et relations avec les concessionnaires",
  "aboutPage.careers.cat4": "Marketing et communications",
  "aboutPage.careers.cat5": "Opérations et logistique",
  "aboutPage.careers.cat6": "Support client et technique",

  "home.banner.title": "Découvrez des performances de pointe",
  "home.banner.desc":
    "Sublimez votre véhicule avec nos composants en carbone de classe mondiale et notre ingénierie de précision.",
  "home.banner.btn": "Voir la collection",
  //news// ===================================
  "newsPage.loading": "Chargement des articles...",
  "newsPage.title": "Actualités et Analyses",
  "newsPage.subtitle":
    "Votre source pour les dernières nouveautés en pièces automobiles et performances.",
  "newsPage.filter.title": "Filtrer les articles",
  "newsPage.filter.reset": "Réinitialiser les filtres",
  "newsPage.readMore": "Lire la suite",
  "newsPage.noArticles.title": "Aucun article trouvé",
  // FRENCH (fr) - For Contact Us Page
  // ===================================
  "contact.hero.meta": "Support disponible 24/7",
  "contact.hero.title": "Nous contacter",
  "contact.hero.sub":
    "Besoin d'une pièce spécifique ou une question sur votre commande ? Nous sommes là pour vous aider.",
  "contact.info.title": "Coordonnées",
  "contact.info.email.title": "Envoyez-nous un e-mail",
  "contact.info.email.sub": "Pour les demandes générales et les ventes",
  "contact.info.phone.title": "Appelez-nous",
  "contact.info.phone.sub": "Lun-Ven de 9h à 18h",
  "contact.info.addr.title": "Rendez-nous visite",
  "contact.help.title": "Besoin d'une aide instantanée ?",
  "contact.help.sub":
    "Consultez notre foire aux questions pour des réponses rapides.",
  "contact.help.btn": "Visitez le centre d'aide",
  "contact.tab.request": "Demander une pièce",
  "contact.tab.support": "Aide et support",
  "contact.form.s1.title": "Vos coordonnées",
  "contact.form.s2.request.title": "Détails de la pièce et de l'expédition",
  "contact.form.s2.support.title": "Comment pouvons-nous aider ?",
  "contact.form.fullName": "Nom complet",
  "contact.form.email": "Adresse e-mail",
  "contact.form.phone": "Numéro de téléphone",
  "contact.form.partName": "Nom / Description de la pièce",
  "contact.form.brand": "Marque de voiture",
  "contact.form.model": "Modèle de voiture",
  "contact.form.year": "Année de la voiture",
  "contact.form.address": "Adresse de livraison",
  "contact.form.street": "Adresse",
  "contact.form.city": "Ville",
  "contact.form.state": "État",
  "contact.form.zip": "Code postal",
  "contact.form.subject": "Sujet",
  "contact.form.message": "Message supplémentaire",
  "contact.form.submitBtn": "Envoyer la demande",
  "contact.form.submitting": "Envoi en cours...",
  "contact.form.success.title": "Merci !",
  "contact.form.success.sub":
    "Nous avons bien reçu votre message. Notre équipe l'examinera et vous répondra sous peu.",
  "contact.form.success.btn": "Continuer vos achats",
  // FRENCH (fr) - For Shop Page
  // ===================================
  "shop.loading": "Chargement des produits...",
  "shop.title": "Acheter toutes les pièces",
  "shop.subtitle":
    "Pièces automobiles haut de gamme provenant des meilleurs fabricants mondiaux.",
  "shop.search.placeholder":
    "Rechercher par nom de produit, SKU ou numéro de pièce...",
  "shop.filter.title": "Filtres",
  "shop.filter.reset": "Réinitialiser",
  "shop.filter.resetAll": "Tout réinitialiser",
  "shop.filter.showResults": "Afficher les résultats",
  "shop.filter.categories": "Catégories",
  "shop.filter.brands": "Marcas",
  "shop.filter.models": "Modèles",
  "shop.filter.searchPlaceholder": "Rechercher {title}...",
  "shop.filter.noCategories": "Aucune catégorie ne correspond.",
  "shop.filter.noBrands": "Aucune marque ne correspond.",
  "shop.filter.noModels": "Aucun modèle trouvé pour cette marque.",
  "shop.results.showing": "Affichage",
  "shop.results.of": "de",
  "shop.results.results": "résultats",
  "shop.sort.latest": "Trier par nouveauté",
  "shop.noProducts.title": "Aucun produit trouvé",
  "shop.noProducts.sub":
    "Nous n'avons trouvé aucun produit correspondant à vos filtres. Essayez d'ajuster votre recherche.",
  "shop.noProducts.clearBtn": "Effacer les filtres",
  "shop.cart.addSuccess": "Ajouté au panier !",
  "shop.cart.addError": "Impossible d'ajouter au panier.",
  "shop.cart.loginError":
    "Veuillez vous connecter pour ajouter des articles à votre panier.",
  // FRENCH (fr) - For Footer Disclaimer
  // ===================================
  "footer.disclaimer.p1":
    "Tous les noms de marque, logos et marques de commerce affichés sur ce site Web sont à titre de référence uniquement. Own Silent International Limited n'est affilié, approuvé ou autorisé par aucun constructeur de véhicules. Tous les noms de produits, numéros et images sont à des fins d'identification et de compatibilité uniquement.",
  "footer.disclaimer.p2":
    "Nous fabriquons et commercialisons des pièces automobiles de rechange, d'origine et personnalisées dans le monde entier. Les clients sont responsables de garantir la conformité légale, l'installation sûre et l'utilisation correcte de tous les produits. Own Silent International Limited n'est pas responsable des dommages, des modifications de véhicules ou des impacts sur la garantie résultant de l'utilisation de nos produits.",
  "footer.disclaimer.p3":
    "L'utilisation de ce site Web et l'achat de produits constituent l'acceptation de notre dénégation de responsabilité complète. Pour les termes légaux complets, consultez notre",
  "footer.disclaimer.link": "Page de dénégation de responsabilité complète",
  "footer.copyright.short":
    "Toutes les marques, logos et marques de commerce sont à titre de référence uniquement ; nous ne sommes affiliés ou approuvés par aucun fabricant. Les produits sont des pièces de rechange, d'origine ou personnalisées ; utilisez à vos propres risques. Consultez notre {link} pour plus de détails.",
  "footer.copyright.link": "Dénégation de responsabilité complète",

  // Showcase
  "showcase.series": "Série Haute Performance",
  "showcase.stats": "Stats d'Ingénierie",
  "showcase.status": "Présentation",
  "showcase.paused": "En pause",
  "showcase.auto": "Auto",
  "showcase.osPerformance": "PERFORMANCE OS",
  "showcase.est": "EST. 1998",
  "showcase.aerospace": "QUALITÉ AÉROSPATIALE",
  "showcase.discover": "DÉCOUVREZ UNE PUISSANCE ILLIMITÉE",

  "showcase.part1.name": "Rotors à Matrice en Carbone",
  "showcase.part1.headline": "Maîtrise Thermique à Chaque Arrêt.",
  "showcase.part1.desc":
    "Nos rotors à matrice carbone-céramique offrent une dissipation thermique inégalée et un évanouissement des freins nul, même dans des conditions de piste extrêmes.",
  "showcase.part1.bgText": "PUISSANCE",
  "showcase.part1.s1.l": "Matériau",
  "showcase.part1.s1.v": "Carbone-Silicium",
  "showcase.part1.s2.l": "Limite Therm.",
  "showcase.part1.s2.v": "1200°C",
  "showcase.part1.s3.l": "Réd. de Poids",
  "showcase.part1.s3.v": "45%",

  "showcase.part2.name": "Jantes Forgées Aero-S",
  "showcase.part2.headline": "Léger. Forgé. Inarrêtable.",
  "showcase.part2.desc":
    "Conçue avec précision à partir d'aluminium 6061-T6 de qualité aérospatiale, la série Aero-S réduit considérablement la masse non suspendue pour une maniabilité supérieure.",
  "showcase.part2.bgText": "LÉGER",
  "showcase.part2.s1.l": "Procédé",
  "showcase.part2.s1.v": "Forgé 8000T",
  "showcase.part2.s2.l": "Capacité Charge",
  "showcase.part2.s2.v": "950kg",
  "showcase.part2.s3.l": "Poids de Jante",
  "showcase.part2.s3.v": "8.2kg",

  "showcase.part3.name": "Combinés Adaptive Nitro",
  "showcase.part3.headline": "Précision Perfectionnée.",
  "showcase.part3.desc":
    "Amortisseurs à azote à réponse ultra-rapide avec réglage à 32 positions, offrant l'équilibre parfait entre rigidité sur piste et confort sur route.",
  "showcase.part3.bgText": "GLISSE",
  "showcase.part3.s1.l": "Réglage",
  "showcase.part3.s1.v": "32 positions",
  "showcase.part3.s2.l": "Type de Gaz",
  "showcase.part3.s2.v": "N2 Haute Pureté",
  "showcase.part3.s3.l": "Course",
  "showcase.part3.s3.v": "110mm",

  "showcase.part4.name": "Phares LASER à Matrice",
  "showcase.part4.headline": "Illuminer la route devant vous.",
  "showcase.part4.desc":
    "Système de projection laser haute définition avec technologie de faisceau adaptatif, offrant jusqu'à 600 m de visibilité cristalline.",
  "showcase.part4.bgText": "LUMIÈRE",
  "showcase.part4.s1.l": "Portée",
  "showcase.part4.s1.v": "600m",
  "showcase.part4.s2.l": "Tecno",
  "showcase.part4.s2.v": "Laser Matrix",
  "showcase.part4.s3.l": "Efficacité",
  "showcase.part4.s3.v": "A+++",

  "showcase.part5.name": "Kit Géo Aero en Carbone Forgé",
  "showcase.part5.headline": "L'aérodynamisme redéfini.",
  "showcase.part5.desc":
    "Composants en fibre de carbone forgée ultra-légers conçus pour un appui maximal et une esthétique aggressive.",
  "showcase.part5.bgText": "AERO",
  "showcase.part5.s1.l": "Matériau",
  "showcase.part5.s1.v": "Carbone Forgé",
  "showcase.part5.s2.l": "Appui",
  "showcase.part5.s2.v": "+120kg",
  "showcase.part5.s3.l": "Réd. de Poids",
  "showcase.part5.s3.v": "-15kg",

  // Footer Payment Methods
  "footer.payment.title": "Paiements Sécurisés",
  "footer.payment.subtitle":
    "Nous acceptons les paiements sécurisés via PayPal, les principales cartes de crédit et de débit, et le virement bancaire.",
  "footer.payment.bank": "Virement Bancaire",

  // Common UI Text
  "common.learnMore": "En Savoir Plus",
  "common.exploreMore": "Explorer les pièces premium",

  // What We Do Section
  "whatWeDo.badge": "Nos Services",
  "whatWeDo.title": "Ce Que Nous",
  "whatWeDo.titleHighlight": "Faisons",
  "whatWeDo.subtitle":
    "Nous fournissons des solutions automobiles premium avec une ingénierie de précision et une qualité inégalée.",
  "whatWeDo.feature1.title": "Fourniture de Pièces Premium",
  "whatWeDo.feature1.desc":
    "Composants haute performance des meilleurs fabricants mondiaux.",
  "whatWeDo.feature2.title": "Assurance Qualité",
  "whatWeDo.feature2.desc":
    "Chaque pièce est rigoureusement testée pour respecter et dépasser les normes OEM.",
  "whatWeDo.feature3.title": "Installation Experte",
  "whatWeDo.feature3.desc":
    "Services d'installation professionnels via notre réseau mondial de partenaires.",
  "whatWeDo.feature4.title": "Expédition Mondiale",
  "whatWeDo.feature4.desc":
    "Livraison rapide et fiable aux clients du monde entier.",

  // Premium Parts Categories
  "categories.badge": "Acheter par Catégorie",
  "categories.title": "Choisissez des Pièces Premium Pour",
  "categories.titleHighlight": "Votre Auto",
  "categories.subtitle":
    "Explorez notre sélection organisée de composants automobiles haute performance.",
  "categories.viewAll": "Voir Toutes les Catégories",

  // Our Gallery
  "gallery.badge": "Notre Travail",
  "gallery.title": "Notre",
  "gallery.titleHighlight": "Galerie",
  "gallery.subtitle":
    "Explorez notre portfolio de constructions et installations premium.",
  "gallery.img1.alt": "Installation de freins carbone-céramique premium",
  "gallery.img2.alt": "Ajustement de kit de carrosserie personnalisé",
  "gallery.img3.alt": "Système d'échappement haute performance",
  "gallery.img4.alt": "Amélioration d'intérieur de luxe",
  "gallery.img5.alt": "Installation de roues forgées",
  "gallery.img6.alt": "Composants en fibre de carbone",
  "gallery.img7.alt": "Transformation complète du véhicule",
  "gallery.img8.alt": "Travail de détail professionnel",

  // How We Work
  "howWeWork.badge": "Notre Processus",
  "howWeWork.title": "Comment Nous",
  "howWeWork.titleHighlight": "Travaillons",
  "howWeWork.subtitle":
    "Un processus simple et transparent de la sélection à l'installation.",
  "howWeWork.step1.title": "Parcourir et Sélectionner",
  "howWeWork.step1.desc":
    "Explorez notre vaste catalogue et trouvez les pièces parfaites pour votre véhicule.",
  "howWeWork.step2.title": "Passer Commande",
  "howWeWork.step2.desc":
    "Paiement sécurisé avec plusieurs options de paiement et confirmation instantanée.",
  "howWeWork.step3.title": "Livraison Rapide",
  "howWeWork.step3.desc":
    "Vos pièces sont soigneusement emballées et expédiées directement à votre emplacement.",
  "howWeWork.step4.title": "Installer et Profiter",
  "howWeWork.step4.desc":
    "Installation professionnelle ou bricolage - nous vous soutenons à chaque étape.",
  "howWeWork.cta.text": "Prêt à améliorer votre véhicule?",
  "howWeWork.cta.button": "Commencer à Acheter",

  // Reviews
  "reviews.badge": "Témoignages",
  "reviews.title": "Ce Que Disent Nos",
  "reviews.titleHighlight": "Clients",
  "reviews.subtitle":
    "Retours réels de conducteurs qui nous font confiance avec leurs véhicules.",
  "reviews.review1.name": "Marcus Rodriguez",
  "reviews.review1.car": "Porsche 911 GT3 RS",
  "reviews.review1.feedback":
    "Les rotors carbone-céramique ont complètement transformé mes performances de freinage. Puissance de freinage incroyable sans perte sur piste. La qualité d'OwnSilent est inégalée.",
  "reviews.review1.location": "Miami, USA",
  "reviews.review2.name": "Sophie Laurent",
  "reviews.review2.car": "Ferrari 488 Pista",
  "reviews.review2.feedback":
    "Service exceptionnel du début à la fin. L'équipe m'a aidé à sélectionner le système d'échappement parfait, et l'installation était impeccable. Ma Ferrari sonne et performe mieux que jamais.",
  "reviews.review2.location": "Paris, France",
  "reviews.review3.name": "Kenji Tanaka",
  "reviews.review3.car": "Lamborghini Huracán",
  "reviews.review3.feedback":
    "Pièces de qualité premium avec un support client exceptionnel. L'ajustement du kit de carrosserie était parfait, et l'expédition au Japon était plus rapide que prévu. Hautement recommandé!",
  "reviews.review3.location": "Tokyo, Japon",
  "reviews.review4.name": "Alexander Müller",
  "reviews.review4.car": "Audi RS6 Avant",
  "reviews.review4.feedback":
    "Expertise professionnelle et passion authentique pour l'excellence automobile. L'amélioration de la suspension a complètement changé la façon dont ma RS6 se comporte. Vaut chaque centime.",
  "reviews.review4.location": "Munich, Allemagne",
};

// ==========================================
// 5. ITALIAN
// ==========================================
const itTranslations = {
  "nav.shop": "Negozio",
  "nav.about": "Chi siamo",
  "nav.blogs": "Blog",
  "nav.news": "Notizie",
  "nav.contact": "Contatto",
  "nav.home": "Home",
  "nav.cart": "Carrello",
  "nav.account": "Account",
  "nav.rotors": "Rotori Carbonio-Ceramici",
  "auth.login": "Accesso",
  "auth.signup": "Registrati",
  "auth.logout": "Esci",
  "common.currency": "Valuta",
  "common.language": "Lingua",
  "common.viewMore": "Vedi di più",
  "hero.welcome": "Benvenuto in",
  "hero.desc":
    "Un'azienda di tuning automobilistico di lusso e commercio globale con sede a Hong Kong, rinomata per la sua esperienza in componenti ad alte prestazioni e soluzioni per veicoli su misura.",
  "hero.s1.t": "Sistemi frenanti in carbonio-ceramica",
  "hero.s1.d":
    "Progettati per la massima potenza di arresto e una stabilità termica senza pari.",
  "hero.s2.t": "Componenti in fibra di carbonio",
  "hero.s2.d":
    "Kit carrozzeria completi, parti aerodinamiche e componenti interni di lusso.",
  "hero.s3.t": "Conversioni complete di veicoli",
  "hero.s3.d":
    "Soluzioni di design e montaggio su misura per veicoli di alta gamma.",
  "hero.box.t": "Competenza globale e produzione di precisione",
  "hero.box.d":
    "Progettiamo, sviluppiamo e produciamo i nostri prodotti secondo gli standard di precisione OEM, testando qualità e sicurezza prima della spedizione.",
  "hero.list1": "Progettazione e sviluppo 3D interni",
  "hero.list2": "Rete globale di partner di installazione",
  "hero.list3": "Trasporto marittimo e aereo mondiale",
  "hero.footer":
    "Guidati da innovazione, artigianalità e prestazioni, plasmiamo il futuro del tuning di auto di lusso.",
  "feat.choose.t": "Perché",
  "feat.choose.h": "Sceglierci?",
  "feat.choose.d":
    "Ci impegniamo a fornirti il miglior servizio e prodotti di altissima qualità, ogni singola volta.",
  "feat.work.t": "Perché",
  "feat.work.h": "Lavorare con noi?",
  "feat.work.d":
    "Unisciti a un team dinamico all'avanguardia dell'innovazione automobilistica e costruisci una carriera gratificante.",
  "feat.contact": "Contatta il nostro team",
  "feat.c.shipping.t": "Spedizione veloce e affidabile",
  "feat.c.shipping.d": "Ordini spediti tempestivamente a casa tua.",
  "feat.c.coverage.t": "Copertura nazionale",
  "feat.c.coverage.d": "Consegna in ogni angolo dell'India.",
  "feat.c.quality.t": "Qualità di cui ti puoi fidare",
  "feat.c.quality.d": "La nostra priorità n. 1 è offrire qualità premium.",
  "feat.c.support.t": "Supporto esperto dedicato",
  "feat.c.support.d":
    "Il nostro team è qui per aiutarti, dalle 9:00 alle 17:00.",
  "feat.w.innovate.t": "Ambiente innovativo",
  "feat.w.innovate.d":
    "Lavora con tecnologie all'avanguardia e processi di produzione automobilistica di punta.",
  "feat.w.global.t": "Esposizione globale",
  "feat.w.global.d":
    "Entra a far parte di un'azienda che spedisce e collabora con partner in tutto il mondo.",
  "feat.w.growth.t": "Crescita professionale",
  "feat.w.growth.d":
    "Opportunità di formazione, sviluppo delle competenze e avanzamento di carriera.",
  "feat.w.roles.t": "Ruoli diversi",
  "feat.w.roles.d":
    "Dall'ingegneria e ricerca e sviluppo alle vendite, al marketing e alla logistica.",
  "feat.w.impact.t": "Lavoro d'impatto",
  "feat.w.impact.d":
    "Contribuisci a creare soluzioni premium per auto di lusso.",
  "about.title": "Guidare il tuo viaggio",
  "about.titleHighlight": "Avanti",
  "about.intro":
    "Da OwnSilent, non vendiamo solo ricambi auto, ma costruiamo relazioni basate sulla fiducia e sulla qualità.",
  "about.mission":
    "La nostra missione è semplice: fornire agli appassionati i ricambi della massima qualità, abbinati a una consulenza esperta.",
  "about.f.quality.title": "Qualità",
  "about.f.quality.desc":
    "Testato rigorosamente per qualità e durata superiori.",
  "about.f.shipping.title": "Spedizione",
  "about.f.shipping.desc": "I ricambi arrivano rapidamente e in sicurezza.",
  "about.f.support.title": "Supporto",
  "about.f.support.desc":
    "Il nostro team competente è sempre qui per aiutarti.",
  "blog.title": "Ultime dal nostro",
  "blog.highlight": "Blog",
  "blog.subtitle":
    "Rimani aggiornato su tendenze e tecnologie del mondo automobilistico.",
  "blog.viewAll": "Vedi tutti i blog",
  "cat.explore": "Esplora le nostre collezioni",
  "cat.featured": "Categorie in evidenza",
  "cat.subtitle": "Scopri le collezioni curate per ogni parte del tuo veicolo.",
  "cat.noContent":
    "Nessun contenuto in evidenza disponibile per questa categoria.",
  // ===================================
  "ccr.page.title": "Rotori in Carbonio-Ceramica",
  "ccr.find.title": "Trova il tuo rotore in carbonio-ceramica perfetto",
  "ccr.find.sub":
    "Seleziona il tuo veicolo per scoprire rotori premium progettati per le massime prestazioni.",
  "ccr.noProducts.title": "Nessun prodotto corrispondente",
  "ccr.noProducts.sub":
    "La tua selezione non corrisponde a nessun prodotto. Prova un filtro diverso.",
  "ccr.hero.sub": "Tecnologia di frenata all'avanguardia",
  "ccr.hero.title": "Rotori in Carbonio-Ceramica",
  "ccr.hero.desc":
    "L'apice della tecnologia di frenata motorsport, progettata per la strada.",
  "ccr.feature1": "Costruzione leggera",
  "ccr.feature2": "Dissipazione del calore superiore",
  "ccr.feature3": "Durata prolungata",
  "ccr.faq.title": "Le tue domande, le nostre risposte",
  "ccr.faq1.q":
    "Cosa rende i rotori in carbonio-ceramica migliori dei rotori in ferro standard?",
  "ccr.faq1.a":
    "I rotori in carbonio-ceramica sono fino al 60% più leggeri e offrono una resistenza al calore superiore.",
  "ccr.faq2.q":
    "I kit in carbonio-ceramica OWNSILENT sono adatti alla guida quotidiana?",
  "ccr.faq2.a":
    "Sì. I nostri kit sono ottimizzati per l'uso stradale, offrendo un funzionamento silenzioso.",
  "ccr.faq3.q":
    "I freni in carbonio-ceramica richiedono una manutenzione speciale?",
  "ccr.faq3.a":
    "La manutenzione è minima: non producono quasi polvere dei freni e durano molto più a lungo.",
  // ITALIAN (it) - For About Us Page
  // ===================================
  "aboutPage.meta": "Riguardo a OwnSilent",
  "aboutPage.title": "Guidare il futuro delle prestazioni automobilistiche",
  "aboutPage.subtitle":
    "Dal 2015, siamo il punto di riferimento globale per qualità e fiducia nei ricambi auto ad alte prestazioni e nelle personalizzazioni di veicoli su misura.",
  "aboutPage.exploreBtn": "Esplora i nostri prodotti",
  "aboutPage.story.meta": "La nostra storia",
  "aboutPage.story.title": "Spinti dalla passione, costruiti sulla fiducia",
  "aboutPage.story.p1":
    "OwnSilent è nato da una semplice passione: rendere la ricerca del componente perfetto un'esperienza semplice, trasparente e soddisfacente per ogni appassionato.",
  "aboutPage.story.p2":
    "Ogni acquisto da noi è più di una transazione; è un passo verso la manutenzione e l'aggiornamento del tuo veicolo con completa fiducia e qualità di livello mondiale.",
  "aboutPage.principles.meta": "I nostri principi",
  "aboutPage.principles.title": "Il nostro impegno per te",
  "aboutPage.principles.sub":
    "Siamo costruiti su valori fondamentali che guidano ogni decisione che prendiamo e ogni interazione che abbiamo.",
  "aboutPage.value1.t": "Qualità senza compromessi",
  "aboutPage.value1.d":
    "Ci dedichiamo a fornirti i migliori ricambi, assicurando che ogni componente soddisfi i nostri rigorosi standard di eccellenza.",
  "aboutPage.value2.t": "Competenza e passione",
  "aboutPage.value2.d":
    "Il nostro team è composto da appassionati ed esperti di automobili pronti a guidarti nel tuo viaggio.",
  "aboutPage.value3.t": "Fiducia e trasparenza",
  "aboutPage.value3.d":
    "La soddisfazione del cliente è la nostra priorità. Operiamo con integrità per costruire relazioni durature.",
  "aboutPage.careers.meta": "Carriere",
  "aboutPage.careers.title":
    "Unisciti a un leader globale nell'innovazione automobilistica",
  "aboutPage.careers.sub":
    "Siamo sempre alla ricerca di persone di talento che si uniscano alla nostra missione di fornire soluzioni automobilistiche di livello mondiale.",
  "aboutPage.careers.why.t": "Perché lavorare con noi?",
  "aboutPage.careers.why.l1":
    "Lavora con tecnologie all'avanguardia e processi automobilistici di punta.",
  "aboutPage.careers.why.l2":
    "Entra a far parte di un'azienda che collabora con partner e clienti in tutto il mondo.",
  "aboutPage.careers.why.l3":
    "Accedi a opportunità di formazione, sviluppo delle competenze e avanzamento di carriera.",
  "aboutPage.careers.why.l4":
    "Contribuisci a creare soluzioni premium per auto di lusso, SUV e supercar.",
  "aboutPage.careers.open.t": "Aree di competenza aperte",
  "aboutPage.careers.open.sub":
    "Accogliamo candidature in diverse aree di business. Se hai le competenze e la passione, vogliamo sentirti.",
  "aboutPage.careers.cat1": "Ingegneria e produzione",
  "aboutPage.careers.cat2": "Ricerca e sviluppo",
  "aboutPage.careers.cat3": "Vendite e relazioni con i concessionari",
  "aboutPage.careers.cat4": "Marketing e comunicazioni",
  "aboutPage.careers.cat5": "Operazioni e logistica",
  "aboutPage.careers.cat6": "Assistenza clienti e tecnica",

  "home.banner.title": "Sperimenta Prestazioni al Top",
  "home.banner.desc":
    "Migliora il tuo veicolo con i nostri componenti in carbonio di classe mondiale e ingegneria di precisione.",
  "home.banner.btn": "Vedi Collezione",
  //news page
  "newsPage.loading": "Caricamento articoli...",
  "newsPage.title": "Notizie e Approfondimenti",
  "newsPage.subtitle":
    "La tua fonte per le ultime novità su ricambi auto e prestazioni.",
  "newsPage.filter.title": "Filtra articoli",
  "newsPage.filter.reset": "Reimposta filtri",
  "newsPage.readMore": "Leggi di più",
  "newsPage.noArticles.title": "Nessun articolo trovato",
  // ITALIAN (it) - For Contact Us Page
  // ===================================
  "contact.hero.meta": "Supporto disponibile 24/7",
  "contact.hero.title": "Contattaci",
  "contact.hero.sub":
    "Hai bisogno di un pezzo specifico o hai una domanda sul tuo ordine? Siamo qui per aiutarti.",
  "contact.info.title": "Informazioni di contatto",
  "contact.info.email.title": "Inviaci un'e-mail",
  "contact.info.email.sub": "Per richieste generali e vendite",
  "contact.info.phone.title": "Chiamaci",
  "contact.info.phone.sub": "Lun-Ven dalle 9:00 alle 18:00",
  "contact.info.addr.title": "Visitaci",
  "contact.help.title": "Hai bisogno di aiuto immediato?",
  "contact.help.sub":
    "Consulta le nostre domande frequenti per risposte rapide.",
  "contact.help.btn": "Visita il Centro Assistenza",
  "contact.tab.request": "Richiedi un pezzo",
  "contact.tab.support": "Aiuto e supporto",
  "contact.form.s1.title": "I tuoi dati di contatto",
  "contact.form.s2.request.title": "Dettagli del pezzo e della spedizione",
  "contact.form.s2.support.title": "Come possiamo aiutare?",
  "contact.form.fullName": "Nome e cognome",
  "contact.form.email": "Indirizzo email",
  "contact.form.phone": "Numero di telefono",
  "contact.form.partName": "Nome / Descrizione del pezzo",
  "contact.form.brand": "Marca auto",
  "contact.form.model": "Modello auto",
  "contact.form.year": "Anno auto",
  "contact.form.address": "Indirizzo di spedizione",
  "contact.form.street": "Indirizzo",
  "contact.form.city": "Città",
  "contact.form.state": "Stato",
  "contact.form.zip": "CAP",
  "contact.form.subject": "Oggetto",
  "contact.form.message": "Messaggio aggiuntivo",
  "contact.form.submitBtn": "Invia richiesta",
  "contact.form.submitting": "Invio in corso...",
  "contact.form.success.title": "Grazie!",
  "contact.form.success.sub":
    "Abbiamo ricevuto il tuo messaggio. Il nostro team lo esaminerà e ti risponderà a breve.",
  "contact.form.success.btn": "Continua lo shopping",
  // ITALIAN (it) - For Shop Page
  // ===================================
  "shop.loading": "Caricamento prodotti...",
  "shop.title": "Acquista tutti i ricambi",
  "shop.subtitle":
    "Ricambi auto di alta qualità provenienti dai migliori produttori mondiali.",
  "shop.search.placeholder":
    "Cerca per nome prodotto, SKU o codice ricambio...",
  "shop.filter.title": "Filtri",
  "shop.filter.reset": "Resetta",
  "shop.filter.resetAll": "Resetta tutto",
  "shop.filter.showResults": "Mostra risultati",
  "shop.filter.categories": "Categorie",
  "shop.filter.brands": "Marche",
  "shop.filter.models": "Modelli",
  "shop.filter.searchPlaceholder": "Cerca {title}...",
  "shop.filter.noCategories": "Nessuna categoria corrispondente.",
  "shop.filter.noBrands": "Nessuna marca corrispondente.",
  "shop.filter.noModels": "Nessun modello trovato per questa marca.",
  "shop.results.showing": "Mostrando",
  "shop.results.of": "di",
  "shop.results.results": "risultati",
  "shop.sort.latest": "Ordina per più recenti",
  "shop.noProducts.title": "Nessun prodotto trovato",
  "shop.noProducts.sub":
    "Non siamo riusciti a trovare prodotti che corrispondano ai tuoi filtri. Prova a modificare la ricerca.",
  "shop.noProducts.clearBtn": "Cancella filtri",
  "shop.cart.addSuccess": "Aggiunto al carrello!",
  "shop.cart.addError": "Impossibile aggiungere al carrello.",
  "shop.cart.loginError":
    "Effettua il login per aggiungere articoli al carrello.",
  // ITALIAN (it) - For Footer Disclaimer
  // ===================================
  "footer.disclaimer.p1":
    "Tutti i nomi di marchi, loghi e marchi di fabbrica visualizzati su questo sito Web sono solo di riferimento. Own Silent International Limited non è affiliata, approvata o autorizzata da alcun produttore di veicoli. Tutti i nomi, i numeri e le immagini dei prodotti sono solo a scopo di identificazione e compatibilità.",
  "footer.disclaimer.p2":
    "Produciamo e commercializziamo parti automobilistiche aftermarket, originali e personalizzate in tutto il mondo. I clienti sono responsabili di garantire la conformità legale, l'installazione sicura e l'uso corretto di tutti i prodotti. Own Silent International Limited non è responsabile per danni, modifiche al veicolo o impatti sulla garanzia derivanti dall'uso dei nostri prodotti.",
  "footer.disclaimer.p3":
    "L'uso di questo sito Web e l'acquisto di prodotti costituiscono l'accettazione del nostro disclaimer completo. Per i termini legali completi, consultare la nostra",
  "footer.disclaimer.link": "Pagina del disclaimer completo",
  "footer.copyright.short":
    "Tutti i marchi, loghi e marchi di fabbrica sono solo di riferimento; non siamo affiliati o approvati da alcun produttore. I prodotti sono aftermarket, originali o personalizzati; utilizzare a proprio rischio. Consultare il nostro {link} per i dettagli.",
  "footer.copyright.link": "Disclaimer completo",

  // Showcase
  "showcase.series": "Serie Alte Prestazioni",
  "showcase.stats": "Statistiche Ingegneria",
  "showcase.status": "Showcase",
  "showcase.paused": "In pausa",
  "showcase.auto": "Auto",
  "showcase.osPerformance": "PERFORMANCE OS",
  "showcase.est": "EST. 1998",
  "showcase.aerospace": "GRADO AEROSPAZIALE",
  "showcase.discover": "SCOPRI LA POTENZA ILLIMITATA",

  "showcase.part1.name": "Rotori a Matrice di Carbonio",
  "showcase.part1.headline": "Maestria Termica in Ogni Frenata.",
  "showcase.part1.desc":
    "I nostri rotori a matrice carboceramica offrono una dissipazione del calore senza pari e zero 'brake fade', anche in condizioni estreme in pista.",
  "showcase.part1.bgText": "POTENZA",
  "showcase.part1.s1.l": "Materiale",
  "showcase.part1.s1.v": "Carbonio-Silicio",
  "showcase.part1.s2.l": "Limite Calore",
  "showcase.part1.s2.v": "1200°C",
  "showcase.part1.s3.l": "Ridiz. Peso",
  "showcase.part1.s3.v": "45%",

  "showcase.part2.name": "Cerchi Forgiati Aero-S",
  "showcase.part2.headline": "Leggeri. Forgiati. Inarrestabili.",
  "showcase.part2.desc":
    "Progettati con precisione in alluminio aeronautico 6061-T6, i cerchi della serie Aero-S riducono significativamente le masse non sospese per una maneggevolezza superiore.",
  "showcase.part2.bgText": "LEGGERO",
  "showcase.part2.s1.l": "Processo",
  "showcase.part2.s1.v": "Forgiato 8000T",
  "showcase.part2.s2.l": "Carico Massimo",
  "showcase.part2.s2.v": "950kg",
  "showcase.part2.s3.l": "Peso Cerchio",
  "showcase.part2.s3.v": "8.2kg",

  "showcase.part3.name": "Assetto Adaptive Nitro",
  "showcase.part3.headline": "Precisione Perfezionata.",
  "showcase.part3.desc":
    "Ammortizzatori all'azoto a risposta ultra-rapida con regolazione a 32 vie, offrono il perfetto equilibrio tra rigidità in pista e comfort su strada.",
  "showcase.part3.bgText": "FLUIDO",
  "showcase.part3.s1.l": "Regolazione",
  "showcase.part3.s1.v": "32 Vie",
  "showcase.part3.s2.l": "Tipo Gas",
  "showcase.part3.s2.v": "N2 Alta Purezza",
  "showcase.part3.s3.l": "Corsa",
  "showcase.part3.s3.v": "110mm",

  "showcase.part4.name": "Fari LASER a Matrice",
  "showcase.part4.headline": "Illuminare la strada davanti a sé.",
  "showcase.part4.desc":
    "Sistema di proiezione laser ad alta definizione con tecnologia a fascio adattivo, che fornisce fino a 600 m di visibilità cristallina.",
  "showcase.part4.bgText": "LUCE",
  "showcase.part4.s1.l": "Portata",
  "showcase.part4.s1.v": "600m",
  "showcase.part4.s2.l": "Tecno",
  "showcase.part4.s2.v": "Laser Matrix",
  "showcase.part4.s3.l": "Efficienza",
  "showcase.part4.s3.v": "A+++",

  "showcase.part5.name": "Kit Aero in Carbonio Forgiato",
  "showcase.part5.headline": "Aerodinamica ridefinita.",
  "showcase.part5.desc":
    "Componenti in fibra di carbonio forgiata ultra-leggeri progettati per la massima deportanza e un'estetica aggressiva.",
  "showcase.part5.bgText": "AERO",
  "showcase.part5.s1.l": "Materiale",
  "showcase.part5.s1.v": "Carbonio Forgiato",
  "showcase.part5.s2.l": "Deportanza",
  "showcase.part5.s2.v": "+120kg",
  "showcase.part5.s3.l": "Riduzione Peso",
  "showcase.part5.s3.v": "-15kg",

  // Footer Payment Methods
  "footer.payment.title": "Pagamenti Sicuri",
  "footer.payment.subtitle":
    "Accettiamo pagamenti sicuri tramite PayPal, le principali carte di credito e debito, e bonifico bancario.",
  "footer.payment.bank": "Bonifico Bancario",

  // Common UI Text
  "common.learnMore": "Scopri di Più",
  "common.exploreMore": "Esplora parti premium",

  // What We Do Section
  "whatWeDo.badge": "I Nostri Servizi",
  "whatWeDo.title": "Cosa",
  "whatWeDo.titleHighlight": "Facciamo",
  "whatWeDo.subtitle":
    "Forniamo soluzioni automobilistiche premium con ingegneria di precisione e qualità senza pari.",
  "whatWeDo.feature1.title": "Fornitura di Parti Premium",
  "whatWeDo.feature1.desc":
    "Componenti ad alte prestazioni dai migliori produttori mondiali.",
  "whatWeDo.feature2.title": "Garanzia di Qualità",
  "whatWeDo.feature2.desc":
    "Ogni parte è rigorosamente testata per soddisfare e superare gli standard OEM.",
  "whatWeDo.feature3.title": "Installazione Esperta",
  "whatWeDo.feature3.desc":
    "Servizi di installazione professionale tramite la nostra rete globale di partner.",
  "whatWeDo.feature4.title": "Spedizione Mondiale",
  "whatWeDo.feature4.desc":
    "Consegna rapida e affidabile ai clienti di tutto il mondo.",

  // Premium Parts Categories
  "categories.badge": "Acquista per Categoria",
  "categories.title": "Scegli Parti Premium Per",
  "categories.titleHighlight": "La Tua Auto",
  "categories.subtitle":
    "Esplora la nostra selezione curata di componenti automobilistici ad alte prestazioni.",
  "categories.viewAll": "Vedi Tutte le Categorie",

  // Our Gallery
  "gallery.badge": "Il Nostro Lavoro",
  "gallery.title": "La Nostra",
  "gallery.titleHighlight": "Galleria",
  "gallery.subtitle":
    "Esplora il nostro portfolio di costruzioni e installazioni premium.",
  "gallery.img1.alt": "Installazione freni carbonio-ceramica premium",
  "gallery.img2.alt": "Montaggio kit carrozzeria personalizzato",
  "gallery.img3.alt": "Sistema di scarico ad alte prestazioni",
  "gallery.img4.alt": "Miglioramento interni di lusso",
  "gallery.img5.alt": "Installazione cerchi forgiati",
  "gallery.img6.alt": "Componenti in fibra di carbonio",
  "gallery.img7.alt": "Trasformazione completa del veicolo",
  "gallery.img8.alt": "Lavoro di dettaglio professionale",

  // How We Work
  "howWeWork.badge": "Il Nostro Processo",
  "howWeWork.title": "Come",
  "howWeWork.titleHighlight": "Lavoriamo",
  "howWeWork.subtitle":
    "Un processo semplice e trasparente dalla selezione all'installazione.",
  "howWeWork.step1.title": "Sfoglia e Seleziona",
  "howWeWork.step1.desc":
    "Esplora il nostro vasto catalogo e trova le parti perfette per il tuo veicolo.",
  "howWeWork.step2.title": "Effettua l'Ordine",
  "howWeWork.step2.desc":
    "Pagamento sicuro con molteplici opzioni di pagamento e conferma istantanea.",
  "howWeWork.step3.title": "Consegna Veloce",
  "howWeWork.step3.desc":
    "Le tue parti vengono accuratamente imballate e spedite direttamente alla tua posizione.",
  "howWeWork.step4.title": "Installa e Goditi",
  "howWeWork.step4.desc":
    "Installazione professionale o fai-da-te - ti supportiamo in ogni fase.",
  "howWeWork.cta.text": "Pronto a migliorare il tuo veicolo?",
  "howWeWork.cta.button": "Inizia ad Acquistare",

  // Reviews
  "reviews.badge": "Testimonianze",
  "reviews.title": "Cosa Dicono i Nostri",
  "reviews.titleHighlight": "Clienti",
  "reviews.subtitle":
    "Feedback reale da conducenti che si fidano di noi con i loro veicoli.",
  "reviews.review1.name": "Marcus Rodriguez",
  "reviews.review1.car": "Porsche 911 GT3 RS",
  "reviews.review1.feedback":
    "I rotori carbonio-ceramica hanno completamente trasformato le mie prestazioni di frenata. Potenza di arresto incredibile senza dissolvenza in pista. La qualità di OwnSilent è ineguagliabile.",
  "reviews.review1.location": "Miami, USA",
  "reviews.review2.name": "Sophie Laurent",
  "reviews.review2.car": "Ferrari 488 Pista",
  "reviews.review2.feedback":
    "Servizio eccezionale dall'inizio alla fine. Il team mi ha aiutato a selezionare il sistema di scarico perfetto e l'installazione è stata impeccabile. La mia Ferrari suona e si comporta meglio che mai.",
  "reviews.review2.location": "Parigi, Francia",
  "reviews.review3.name": "Kenji Tanaka",
  "reviews.review3.car": "Lamborghini Huracán",
  "reviews.review3.feedback":
    "Parti di qualità premium con un supporto clienti eccezionale. Il montaggio del kit carrozzeria era perfetto e la spedizione in Giappone è stata più veloce del previsto. Altamente raccomandato!",
  "reviews.review3.location": "Tokyo, Giappone",
  "reviews.review4.name": "Alexander Müller",
  "reviews.review4.car": "Audi RS6 Avant",
  "reviews.review4.feedback":
    "Competenza professionale e genuina passione per l'eccellenza automobilistica. L'aggiornamento delle sospensioni ha completamente cambiato il modo in cui si comporta la mia RS6. Vale ogni centesimo.",
  "reviews.review4.location": "Monaco, Germania",
};

// ==========================================
// 6. ARABIC
// ==========================================
const arTranslations = {
  "nav.shop": "متجر",
  "nav.about": "معلومات عنا",
  "nav.blogs": "مدونة",
  "nav.news": "أخبار",
  "nav.contact": "اتصل بنا",
  "nav.home": "الرئيسية",
  "nav.cart": "عربة التسوق",
  "nav.account": "حسابي",
  "nav.rotors": "دوارات الكربون والسيراميك",
  "auth.login": "تسجيل الدخول",
  "auth.signup": "التسجيل",
  "auth.logout": "تسجيل الخروج",
  "common.currency": "عملة",
  "common.language": "لغة",
  "common.viewMore": "عرض المزيد",
  "hero.welcome": "مرحبًا بك في",
  "hero.desc":
    "شركة تعديل سيارات فاخرة وتجارة عالمية مقرها هونغ كونغ، تشتهر بخبرتها في المكونات عالية الأداء وحلول المركبات المخصصة.",
  "hero.s1.t": "أنظمة فرامل من الكربون والسيراميك",
  "hero.s1.d": "مصممة لتحقيق أقصى قوة إيقاف واستقرار حراري لا مثيل له.",
  "hero.s2.t": "مكونات ألياف الكربون",
  "hero.s2.d":
    "مجموعات هيكل كاملة، وأجزاء ديناميكية هوائية، ومكونات داخلية فاخرة.",
  "hero.s3.t": "تحويلات كاملة للمركبات",
  "hero.s3.d": "حلول تصميم وتركيب مخصصة للمركبات الراقية.",
  "hero.box.t": "خبرة عالمية وتصنيع دقيق",
  "hero.box.d":
    "نقوم بتصميم وتطوير وتصنيع منتجاتنا وفقًا لمعايير الدقة لمصنعي المعدات الأصلية، مع اختبار الجودة والسلامة قبل الإرسال.",
  "hero.list1": "تصميم وتطوير ثلاثي الأبعاد داخلي",
  "hero.list2": "شبكة شركاء تركيب عالمية",
  "hero.list3": "شحن بحري وجوي عالمي",
  "hero.footer":
    "مدفوعين بالابتكار والحرفية والأداء، نشكل مستقبل تعديل السيارات الفاخرة.",
  "feat.choose.t": "لماذا",
  "feat.choose.h": "تختارنا؟",
  "feat.choose.d":
    "نحن ملتزمون بتزويدك بأفضل خدمة وأعلى جودة للمنتجات، في كل مرة.",
  "feat.work.t": "لماذا",
  "feat.work.h": "تعمل معنا؟",
  "feat.work.d":
    "انضم إلى فريق ديناميكي في طليعة ابتكارات السيارات وابنِ مسيرة مهنية مجزية.",
  "feat.contact": "اتصل بفريقنا",
  "feat.c.shipping.t": "شحن سريع وموثوق",
  "feat.c.shipping.d": "يتم إرسال الطلبات على الفور إلى عتبة داركم.",
  "feat.c.coverage.t": "تغطية على الصعيد الوطني",
  "feat.c.coverage.d": "التوصيل إلى كل ركن من أركان الهند.",
  "feat.c.quality.t": "جودة يمكنك الوثوق بها",
  "feat.c.quality.d": "أولويتنا الأولى هي تقديم جودة عالية.",
  "feat.c.support.t": "دعم خبراء متخصص",
  "feat.c.support.d": "فريقنا هنا للمساعدة، من 9 صباحًا إلى 5 مساءً.",
  "feat.w.innovate.t": "بيئة مبتكرة",
  "feat.w.innovate.d": "اعمل بأحدث التقنيات وعمليات تصنيع السيارات المتطورة.",
  "feat.w.global.t": "انتشار عالمي",
  "feat.w.global.d":
    "كن جزءًا من شركة تشحن وتتعاون مع شركاء في جميع أنحاء العالم.",
  "feat.w.growth.t": "نمو مهني",
  "feat.w.growth.d": "فرص للتدريب وتنمية المهارات والتقدم الوظيفي.",
  "feat.w.roles.t": "أدوار متنوعة",
  "feat.w.roles.d":
    "من الهندسة والبحث والتطوير إلى المبيعات والتسويق والخدمات اللوجستية.",
  "feat.w.impact.t": "عمل مؤثر",
  "feat.w.impact.d": "ساهم في إنشاء حلول متميزة للسيارات الفاخرة.",
  "about.title": "قيادة رحلتك",
  "about.titleHighlight": "إلى الأمام",
  "about.intro":
    "في OwnSilent، لا نبيع قطع غيار السيارات فحسب، بل نبني علاقات قائمة على الثقة والجودة.",
  "about.mission":
    "مهمتنا بسيطة: تزويد السائقين بأعلى جودة من القطع مع مشورة الخبراء.",
  "about.f.quality.title": "جودة",
  "about.f.quality.desc": "تم اختباره بدقة لضمان الجودة والمتانة الفائقة.",
  "about.f.shipping.title": "الشحن",
  "about.f.shipping.desc": "تصل القطع بسرعة وأمان.",
  "about.f.support.title": "الدعم",
  "about.f.support.desc": "فريقنا المتخصص دائمًا هنا للمساعدة.",
  "blog.title": "أحدث ما في",
  "blog.highlight": "المدونة",
  "blog.subtitle": "ابق على اطلاع على الاتجاهات والتقنيات في عالم السيارات.",
  "blog.viewAll": "عرض جميع المدونات",
  "cat.explore": "استكشف مجموعاتنا",
  "cat.featured": "فئات مميزة",
  "cat.subtitle": "اكتشف مجموعات منظمة لكل جزء من سيارتك.",
  "cat.noContent": "لا يوجد محتوى مميز متاح لهذه الفئة.",
  // ===================================
  "ccr.page.title": "دوارات الكربون والسيراميك",
  "ccr.find.title": "ابحث عن دوار الكربون والسيراميك المثالي",
  "ccr.find.sub": "اختر سيارتك لاكتشاف دوارات ممتازة مصممة لتحقيق أقصى أداء.",
  "ccr.noProducts.title": "لا توجد منتجات مطابقة",
  "ccr.noProducts.sub":
    "لم يتطابق اختيارك مع أي منتجات. يرجى تجربة فلتر مختلف.",
  "ccr.hero.sub": "تقنية الكبح القصوى",
  "ccr.hero.title": "دوارات الكربون والسيراميك",
  "ccr.hero.desc": "ذروة تكنولوجيا الكبح في رياضة السيارات، مصممة للطريق.",
  "ccr.feature1": "بناء خفيف الوزن",
  "ccr.feature2": "تبديد حرارة فائق",
  "ccr.feature3": "عمر افتراضي ممتد",
  "ccr.faq.title": "أسئلتكم، وإجاباتنا",
  "ccr.faq1.q":
    "ما الذي يجعل دوارات الكربون والسيراميك أفضل من دوارات الحديد القياسية؟",
  "ccr.faq1.a":
    "دوارات الكربون والسيراميك أخف بنسبة تصل إلى 60٪ وتوفر مقاومة فائقة للحرارة.",
  "ccr.faq2.q":
    "هل مجموعات الكربون والسيراميك من OWNSILENT مناسبة للقيادة اليومية؟",
  "ccr.faq2.a":
    "نعم. تم تحسين مجموعاتنا بالكامل للاستخدام على الطرقات، مما يوفر تشغيلاً صامتاً.",
  "ccr.faq3.q": "هل تحتاج فرامل الكربون والسيراميك إلى صيانة خاصة؟",
  "ccr.faq3.a":
    "الصيانة ضئيلة - فهي لا تنتج تقريبًا أي غبار فرامل وتدوم لفترة أطول بكثير.",
  // ARABIC (ar) - For About Us Page
  // ===================================
  "aboutPage.meta": "حول OwnSilent",
  "aboutPage.title": "قيادة مستقبل أداء السيارات",
  "aboutPage.subtitle":
    "منذ عام 2015، ونحن المعيار العالمي للجودة والثقة في قطع غيار السيارات عالية الأداء وتخصيصات المركبات المخصصة.",
  "aboutPage.exploreBtn": "استكشف منتجاتنا",
  "aboutPage.story.meta": "قصتنا",
  "aboutPage.story.title": "مدفوعون بالشغف، مبنيون على الثقة",
  "aboutPage.story.p1":
    "وُلدت OwnSilent من شغف بسيط: جعل العثور على المكون المثالي تجربة بسيطة وشفافة ومرضية لكل متحمس وسائق.",
  "aboutPage.story.p2":
    "كل عملية شراء منا هي أكثر من مجرد معاملة؛ إنها خطوة نحو صيانة وترقية سيارتك بثقة تامة وجودة عالمية.",
  "aboutPage.principles.meta": "مبادئنا",
  "aboutPage.principles.title": "التزامنا تجاهكم",
  "aboutPage.principles.sub":
    "نحن مبنيون على أساس من القيم الأساسية التي توجه كل قرار نتخذه وكل تفاعل لدينا مع مجتمعنا العالمي.",
  "aboutPage.value1.t": "جودة لا تقبل المساومة",
  "aboutPage.value1.d":
    "نحن ملتزمون بتقديم أفضل القطع، مع التأكد من أن كل مكون يلبي معايير التميز الصارمة لدينا.",
  "aboutPage.value2.t": "الخبرة والشغف",
  "aboutPage.value2.d":
    "يتكون فريقنا من عشاق السيارات والخبراء المستعدين لإرشادك خلال رحلتك.",
  "aboutPage.value3.t": "الثقة والشفافية",
  "aboutPage.value3.d":
    "رضا العملاء هو أولويتنا. نعمل بنزاهة لبناء علاقات دائمة.",
  "aboutPage.careers.meta": "وظائف",
  "aboutPage.careers.title": "انضم إلى شركة عالمية رائدة في ابتكار السيارات",
  "aboutPage.careers.sub":
    "نبحث دائمًا عن أفراد موهوبين للانضمام إلى مهمتنا في تقديم حلول سيارات عالمية المستوى.",
  "aboutPage.careers.why.t": "لماذا العمل معنا؟",
  "aboutPage.careers.why.l1": "اعمل بأحدث التقنيات وعمليات السيارات المتطورة.",
  "aboutPage.careers.why.l2":
    "كن جزءًا من شركة تتعاون مع شركاء وعملاء في جميع أنحاء العالم.",
  "aboutPage.careers.why.l3":
    "احصل على فرص للتدريب وتنمية المهارات والتقدم الوظيفي.",
  "aboutPage.careers.why.l4":
    "ساهم في إنشاء حلول متميزة للسيارات الفاخرة وسيارات الدفع الرباعي والسيارات الخارقة.",
  "aboutPage.careers.open.t": "مجالات الخبرة المفتوحة",
  "aboutPage.careers.open.sub":
    "نرحب بالطلبات في مجالات عمل متعددة. إذا كانت لديك المهارات والشغف، فنحن نريد أن نسمع منك.",
  "aboutPage.careers.cat1": "الهندسة والتصنيع",
  "aboutPage.careers.cat2": "البحث والتطوير",
  "aboutPage.careers.cat3": "المبيعات وعلاقات الوكلاء",
  "aboutPage.careers.cat4": "التسويق والاتصالات",
  "aboutPage.careers.cat5": "العمليات والخدمات اللوجستية",
  "aboutPage.careers.cat6": "دعم العملاء والدعم الفني",

  "home.banner.title": "جرب قمة الأداء",
  "home.banner.desc":
    "ارتقِ بمركبتك من خلال مكونات الكربون ذات المستوى العالمي والهندسة الدقيقة.",
  "home.banner.btn": "عرض المجموعة",
  //news page
  "newsPage.loading": "جار تحميل المقالات...",
  "newsPage.title": "الأخبار والرؤى",
  "newsPage.subtitle": "مصدرك لأحدث قطع غيار السيارات والأداء.",
  "newsPage.filter.title": "تصفية المقالات",
  "newsPage.filter.reset": "إعادة تعيين المرشحات",
  "newsPage.readMore": "اقرأ أكثر",
  "newsPage.noArticles.title": "لم يتم العثور على مقالات",
  // ARABIC (ar) - For Contact Us Page
  // ===================================
  "contact.hero.meta": "الدعم متاح 24/7",
  "contact.hero.title": "تواصل معنا",
  "contact.hero.sub":
    "هل تحتاج إلى قطعة معينة أو لديك سؤال حول طلبك؟ نحن هنا لمساعدتك.",
  "contact.info.title": "معلومات الاتصال",
  "contact.info.email.title": "راسلنا عبر البريد الإلكتروني",
  "contact.info.email.sub": " للاستفسارات العامة والمبيعات",
  "contact.info.phone.title": "اتصل بنا",
  "contact.info.phone.sub": "من الإثنين إلى الجمعة من 9 صباحًا حتى 6 مساءً",
  "contact.info.addr.title": "قم بزيارتنا",
  "contact.help.title": "هل تحتاج إلى مساعدة فورية؟",
  "contact.help.sub": "تحقق من الأسئلة الشائعة للحصول على إجابات سريعة.",
  "contact.help.btn": "زيارة مركز المساعدة",
  "contact.tab.request": "طلب قطعة",
  "contact.tab.support": "المساعدة والدعم",
  "contact.form.s1.title": "تفاصيل الاتصال الخاصة بك",
  "contact.form.s2.request.title": "تفاصيل القطعة والشحن",
  "contact.form.s2.support.title": "كيف يمكننا المساعدة؟",
  "contact.form.fullName": "الاسم الكامل",
  "contact.form.email": "عنوان البريد الإلكتروني",
  "contact.form.phone": "رقم الهاتف",
  "contact.form.partName": "اسم / وصف القطعة",
  "contact.form.brand": "ماركة السيارة",
  "contact.form.model": "طراز السيارة",
  "contact.form.year": "سنة السيارة",
  "contact.form.address": "عنوان الشحن",
  "contact.form.street": "عنوان الشارع",
  "contact.form.city": "المدينة",
  "contact.form.state": "الولاية",
  "contact.form.zip": "الرمز البريدي",
  "contact.form.subject": "الموضوع",
  "contact.form.message": "رسالة إضافية",
  "contact.form.submitBtn": "إرسال الطلب",
  "contact.form.submitting": "جارٍ الإرسال...",
  "contact.form.success.title": "شكرًا لك!",
  "contact.form.success.sub":
    "لقد تلقينا رسالتك. سيقوم فريقنا بمراجعتها والرد عليك قريبًا.",
  "contact.form.success.btn": "متابعة التسوق",
  // ARABIC (ar) - For Shop Page
  // ===================================
  "shop.loading": "جارٍ تحميل المنتجات...",
  "shop.title": "تسوق جميع القطع",
  "shop.subtitle":
    "قطع غيار سيارات فاخرة من أفضل المصنعين في جميع أنحاء العالم.",
  "shop.search.placeholder": "ابحث باسم المنتج أو SKU أو رقم القطعة...",
  "shop.filter.title": "مرشحات",
  "shop.filter.reset": "إعادة تعيين",
  "shop.filter.resetAll": "إعادة تعيين الكل",
  "shop.filter.showResults": "عرض النتائج",
  "shop.filter.categories": "فئات",
  "shop.filter.brands": "ماركات",
  "shop.filter.models": "موديلات",
  "shop.filter.searchPlaceholder": "ابحث في {title}...",
  "shop.filter.noCategories": "لا توجد فئات مطابقة.",
  "shop.filter.noBrands": "لا توجد ماركات مطابقة.",
  "shop.filter.noModels": "لم يتم العثور على موديلات لهذه الماركة.",
  "shop.results.showing": "عرض",
  "shop.results.of": "من",
  "shop.results.results": "نتائج",
  "shop.sort.latest": "فرز حسب الأحدث",
  "shop.noProducts.title": "لم يتم العثور على منتجات",
  "shop.noProducts.sub":
    "لم نتمكن من العثور على أي منتجات تطابق المرشحات الخاصة بك. حاول تعديل بحثك.",
  "shop.noProducts.clearBtn": "مسح المرشحات",
  "shop.cart.addSuccess": "أضيف إلى السلة!",
  "shop.cart.addError": "لا يمكن الإضافة إلى السلة.",
  "shop.cart.loginError": "يرجى تسجيل الدخول لإضافة عناصر إلى سلتك.",
  // ARABIC (ar) - For Footer Disclaimer
  // ===================================
  "footer.disclaimer.p1":
    "جميع أسماء العلامات التجارية والشعارات والعلامات التجارية المعروضة على هذا الموقع هي للإشارة فقط. شركة Own Silent International Limited ليست تابعة أو معتمدة أو مصرح بها من قبل أي من مصنعي المركبات. جميع أسماء المنتجات وأرقامها وصورها هي لأغراض التعريف والتوافق فقط.",
  "footer.disclaimer.p2":
    "نقوم بتصنيع وتجارة قطع غيار السيارات ما بعد البيع والأصلية والمخصصة في جميع أنحاء العالم. العملاء مسؤولون عن ضمان الامتثال القانوني والتركيب الآمن والاستخدام السليم لجميع المنتجات. لا تتحمل شركة Own Silent International Limited المسؤولية عن الأضرار أو تعديلات المركبات أو التأثيرات على الضمان الناتجة عن استخدام منتجاتنا.",
  "footer.disclaimer.p3":
    "يشكل استخدام هذا الموقع وشراء المنتجات قبولًا لإخلاء المسؤولية الكامل الخاص بنا. للاطلاع على الشروط القانونية الكاملة، راجع موقعنا",
  "footer.disclaimer.link": "صفحة إخلاء المسؤولية الكاملة",
  "footer.copyright.short":
    "جميع العلامات التجارية والشعارات والعلامات التجارية هي للإشارة فقط؛ نحن لسنا تابعين أو معتمدين من قبل أي مصنع. المنتجات هي ما بعد البيع أو أصلية أو مخصصة؛ استخدمها على مسؤوليتك الخاصة. راجع {link} الخاص بنا للحصول على التفاصيل.",
  "footer.copyright.link": "إخلاء المسؤولية الكامل",

  // Showcase
  "showcase.series": "سلسلة الأداء العالي",
  "showcase.stats": "إحصائيات الهندسة",
  "showcase.status": "العرض",
  "showcase.paused": "متوقف",
  "showcase.auto": "تلقائي",
  "showcase.osPerformance": "أداء OS",
  "showcase.est": "تأسست عام 1998",
  "showcase.aerospace": "درجة الطيران والفضاء",
  "showcase.discover": "اكتشف القوة غير المحدودة",

  "showcase.part1.name": "دوارات مصفوفة الكربون",
  "showcase.part1.headline": "إتقان حراري في كل توقف.",
  "showcase.part1.desc":
    "توفر دوارات مصفوفة الكربون والسيراميك الخاصة بنا تبديدًا لا مثيل له للحرارة وتلاشي الصفر للفرامل ، حتى في ظروف الحلبة القاسية.",
  "showcase.part1.bgText": "قوة",
  "showcase.part1.s1.l": "المادة",
  "showcase.part1.s1.v": "كربون-سيليكون",
  "showcase.part1.s2.l": "حد الحرارة",
  "showcase.part1.s2.v": "1200 درجة مئوية",
  "showcase.part1.s3.l": "تقليل الوزن",
  "showcase.part1.s3.v": "45%",

  "showcase.part2.name": "عجلات Aero-S المطروقة",
  "showcase.part2.headline": "خفيفة. مطروقة. لا يمكن إيقافها.",
  "showcase.part2.desc":
    "تم تصميم سلسلة Aero-S بدقة من ألومنيوم 6061-T6 المستخدم في صناعة الطيران ، وهي تقلل بشكل كبير من الكتلة غير المعلقة للتعامل الفائق.",
  "showcase.part2.bgText": "خفيف",
  "showcase.part2.s1.l": "العملية",
  "showcase.part2.s1.v": "طرق 8000 طن",
  "showcase.part2.s2.l": "تصنيف الحمل",
  "showcase.part2.s2.v": "950 كجم",
  "showcase.part2.s3.l": "وزن العجلة",
  "showcase.part2.s3.v": "8.2 كجم",

  "showcase.part3.name": "نظام التعليق Adaptive Nitro",
  "showcase.part3.headline": "دقة مثالية.",
  "showcase.part3.desc":
    "مخمدات مشحونة بالنيتروجين فائقة الاستجابة مع تعديل بـ 32 اتجاهاً ، مما يوفر التوازن المثالي بين صلابة المسار وراحة الطريق.",
  "showcase.part3.bgText": "انزلاق",
  "showcase.part3.s1.l": "التعديل",
  "showcase.part3.s1.v": "32 اتجاهًا",
  "showcase.part3.s2.l": "نوع الغاز",
  "showcase.part3.s2.v": "N2 عالي النقاء",
  "showcase.part3.s3.l": "الشوط",
  "showcase.part3.s3.v": "110 ملم",

  "showcase.part4.name": "مصابيح ليزر مصفوفة",
  "showcase.part4.headline": "إضاءة الطريق أمامك.",
  "showcase.part4.desc":
    "نظام إسقاط ليزر عالي الدقة مع تقنية الشعاع التكيفي ، مما يوفر رؤية بلورية واضحة تصل إلى 600 متر.",
  "showcase.part4.bgText": "ضوء",
  "showcase.part4.s1.l": "المدى",
  "showcase.part4.s1.v": "600 متر",
  "showcase.part4.s2.l": "التقنية",
  "showcase.part4.s2.v": "مصفوفة ليزر",
  "showcase.part4.s3.l": "الكفاءة",
  "showcase.part4.s3.v": "A+++",

  "showcase.part5.name": "طقم ايرو من الكربون المطروق",
  "showcase.part5.headline": "إعادة تعريف الديناميكا الهوائية.",
  "showcase.part5.desc":
    "مكونات ألياف كربونية مطروقة خفيفة الوزن للغاية مصممة لتوفير أقصى قوة سفلية وجماليات هجومية.",
  "showcase.part5.bgText": "ايرو",
  "showcase.part5.s1.l": "المادة",
  "showcase.part5.s1.v": "كربون مطروق",
  "showcase.part5.s2.l": "القوة السفلية",
  "showcase.part5.s2.v": "+120 كجم",
  "showcase.part5.s3.l": "تقليل الوزن",
  "showcase.part5.s3.v": "-15كجم",

  // Footer Payment Methods
  "footer.payment.title": "مدفوعات آمنة",
  "footer.payment.subtitle":
    "نقبل المدفوعات الآمنة عبر PayPal وبطاقات الائتمان والخصم الرئيسية والتحويل البنكي.",
  "footer.payment.bank": "تحويل بنكي",

  // Common UI Text
  "common.learnMore": "اعرف المزيد",
  "common.exploreMore": "استكشف القطع المتميزة",

  // What We Do Section
  "whatWeDo.badge": "خدماتنا",
  "whatWeDo.title": "ما",
  "whatWeDo.titleHighlight": "نفعله",
  "whatWeDo.subtitle":
    "نقدم حلولاً سيارات متميزة مع هندسة دقيقة وجودة لا مثيل لها.",
  "whatWeDo.feature1.title": "توريد قطع متميزة",
  "whatWeDo.feature1.desc":
    "مكونات عالية الأداء من أفضل الشركات المصنعة العالمية.",
  "whatWeDo.feature2.title": "ضمان الجودة",
  "whatWeDo.feature2.desc": "يتم اختبار كل قطعة بدقة لتلبية وتجاوز معايير OEM.",
  "whatWeDo.feature3.title": "تركيب خبير",
  "whatWeDo.feature3.desc":
    "خدمات تركيب احترافية عبر شبكتنا العالمية من الشركاء.",
  "whatWeDo.feature4.title": "شحن عالمي",
  "whatWeDo.feature4.desc": "توصيل سريع وموثوق للعملاء في جميع أنحاء العالم.",

  // Premium Parts Categories
  "categories.badge": "تسوق حسب الفئة",
  "categories.title": "اختر قطع متميزة لـ",
  "categories.titleHighlight": "سيارتك",
  "categories.subtitle":
    "استكشف مجموعتنا المنسقة من مكونات السيارات عالية الأداء.",
  "categories.viewAll": "عرض جميع الفئات",

  // Our Gallery
  "gallery.badge": "أعمالنا",
  "gallery.title": "معرض",
  "gallery.titleHighlight": "الصور",
  "gallery.subtitle": "استكشف مجموعة أعمالنا من التركيبات والبناءات المتميزة.",
  "gallery.img1.alt": "تركيب فرامل كربون-سيراميك متميزة",
  "gallery.img2.alt": "تركيب طقم هيكل مخصص",
  "gallery.img3.alt": "نظام عادم عالي الأداء",
  "gallery.img4.alt": "تحسين داخلي فاخر",
  "gallery.img5.alt": "تركيب عجلات مطروقة",
  "gallery.img6.alt": "مكونات ألياف الكربون",
  "gallery.img7.alt": "تحويل كامل للمركبة",
  "gallery.img8.alt": "عمل تفصيلي احترافي",

  // How We Work
  "howWeWork.badge": "عمليتنا",
  "howWeWork.title": "كيف",
  "howWeWork.titleHighlight": "نعمل",
  "howWeWork.subtitle": "عملية بسيطة وشفافة من الاختيار إلى التركيب.",
  "howWeWork.step1.title": "تصفح واختر",
  "howWeWork.step1.desc":
    "استكشف كتالوجنا الواسع واعثر على القطع المثالية لسيارتك.",
  "howWeWork.step2.title": "قدم الطلب",
  "howWeWork.step2.desc": "دفع آمن مع خيارات دفع متعددة وتأكيد فوري.",
  "howWeWork.step3.title": "توصيل سريع",
  "howWeWork.step3.desc": "يتم تعبئة قطعك بعناية وشحنها مباشرة إلى موقعك.",
  "howWeWork.step4.title": "ركب واستمتع",
  "howWeWork.step4.desc": "تركيب احترافي أو بنفسك - ندعمك في كل خطوة.",
  "howWeWork.cta.text": "هل أنت مستعد لترقية سيارتك؟",
  "howWeWork.cta.button": "ابدأ التسوق",

  // Reviews
  "reviews.badge": "شهادات العملاء",
  "reviews.title": "ما يقوله",
  "reviews.titleHighlight": "عملاؤنا",
  "reviews.subtitle": "تعليقات حقيقية من السائقين الذين يثقون بنا مع سياراتهم.",
  "reviews.review1.name": "ماركوس رودريغيز",
  "reviews.review1.car": "بورش 911 GT3 RS",
  "reviews.review1.feedback":
    "لقد غيرت دوارات الكربون-السيراميك أداء الفرامل تمامًا. قوة توقف مذهلة بدون تلاشي على الحلبة. جودة OwnSilent لا مثيل لها.",
  "reviews.review1.location": "ميامي، الولايات المتحدة",
  "reviews.review2.name": "صوفي لوران",
  "reviews.review2.car": "فيراري 488 بيستا",
  "reviews.review2.feedback":
    "خدمة استثنائية من البداية إلى النهاية. ساعدني الفريق في اختيار نظام العادم المثالي، وكان التركيب لا تشوبه شائبة. فيراري الخاصة بي تبدو وتؤدي أفضل من أي وقت مضى.",
  "reviews.review2.location": "باريس، فرنسا",
  "reviews.review3.name": "كينجي تاناكا",
  "reviews.review3.car": "لامبورغيني هوراكان",
  "reviews.review3.feedback":
    "قطع ذات جودة متميزة مع دعم عملاء استثنائي. كان تركيب طقم الهيكل مثاليًا، والشحن إلى اليابان كان أسرع من المتوقع. موصى به بشدة!",
  "reviews.review3.location": "طوكيو، اليابان",
  "reviews.review4.name": "ألكسندر مولر",
  "reviews.review4.car": "أودي RS6 أفانت",
  "reviews.review4.feedback":
    "خبرة احترافية وشغف حقيقي بالتميز في السيارات. لقد غيّر ترقية التعليق تمامًا طريقة تعامل RS6 الخاصة بي. يستحق كل قرش.",
  "reviews.review4.location": "ميونخ، ألمانيا",
};

// ==========================================
// 7. CHINESE
// ==========================================
const zhTranslations = {
  "nav.shop": "商店",
  "nav.about": "关于我们",
  "nav.blogs": "博客",
  "nav.news": "新闻",
  "nav.contact": "联系我们",
  "nav.home": "首页",
  "nav.cart": "购物车",
  "nav.account": "账户",
  "nav.rotors": "碳陶瓷转子",
  "auth.login": "登录",
  "auth.signup": "注册",
  "auth.logout": "登出",
  "common.currency": "货币",
  "common.language": "语言",
  "common.viewMore": "查看更多",
  "hero.welcome": "欢迎来到",
  "hero.desc":
    "一家总部位于香港的豪华汽车改装和全球贸易公司，以其在高性能组件和定制车辆解决方案方面的专业知识而闻名。",
  "hero.s1.t": "碳陶瓷制动系统",
  "hero.s1.d": "为最大制动力和无与倫比的热稳定性而设计。",
  "hero.s2.t": "碳纤维组件",
  "hero.s2.d": "完整的车身套件、空气动力学部件和豪华内饰组件。",
  "hero.s3.t": "整车改装",
  "hero.s3.d": "为高端车辆提供定制设计和装配解决方案。",
  "hero.box.t": "全球专业知识与精密制造",
  "hero.box.d":
    "我们按照OEM精度标准设计、开发和制造产品，在发货前测试质量和安全性。",
  "hero.list1": "内部3D设计与开发",
  "hero.list2": "全球安装合作伙伴网络",
  "hero.list3": "全球海运和空运",
  "hero.footer": "在创新、工艺和性能的驱动下，我们塑造了豪华汽车改装的未来。",
  "feat.choose.t": "为什么",
  "feat.choose.h": "选择我们？",
  "feat.choose.d": "我们致力于每一次都为您提供最好的服务和最高质量的产品。",
  "feat.work.t": "为什么",
  "feat.work.h": "加入我们？",
  "feat.work.d":
    "加入一个充满活力的团队，站在汽车创新的前沿，打造一个有价值的职业生涯。",
  "feat.contact": "联系我们的团队",
  "feat.c.shipping.t": "快速可靠的运输",
  "feat.c.shipping.d": "订单迅速派送到您家门口。",
  "feat.c.coverage.t": "全国覆盖",
  "feat.c.coverage.d": "配送到印度的每一个角落。",
  "feat.c.quality.t": "值得信赖的质量",
  "feat.c.quality.d": "我们的第一要务是提供优质品质。",
  "feat.c.support.t": "专属专家支持",
  "feat.c.support.d": "我们的团队随时为您服务，上午9点至下午5点。",
  "feat.w.innovate.t": "创新环境",
  "feat.w.innovate.d": "使用最先进的技术和尖端的汽车制造工艺。",
  "feat.w.global.t": "全球视野",
  "feat.w.global.d": "成为一家与全球合作伙伴合作并向全球发货的公司的一员。",
  "feat.w.growth.t": "职业发展",
  "feat.w.growth.d": "在汽车行业提供培训、技能发展和职业晋升的机会。",
  "feat.w.roles.t": "多样化的角色",
  "feat.w.roles.d": "从工程和研发到销售、营销和物流。",
  "feat.w.impact.t": "有影响力的工作",
  "feat.w.impact.d": "为豪华轿车、SUV和超级跑车创造优质解决方案。",
  "about.title": "推动您的旅程",
  "about.titleHighlight": "向前",
  "about.intro":
    "在OwnSilent，我们不仅销售汽车配件，我们还建立基于信任和质量的关系。",
  "about.mission": "我们的使命很简单：为爱好者提供最优质的零件和专家建议。",
  "about.f.quality.title": "质量",
  "about.f.quality.desc": "经过严格测试，具有卓越的质量和耐用性。",
  "about.f.shipping.title": "运输",
  "about.f.shipping.desc": "零件快速安全地送达。",
  "about.f.support.title": "支持",
  "about.f.support.desc": "我们知识渊博的团队随时为您提供帮助。",
  "blog.title": "最新来自我们的",
  "blog.highlight": "博客",
  "blog.subtitle": "随时了解汽车世界的趋势和技术。",
  "blog.viewAll": "查看所有博客",
  "cat.explore": "探索我们的系列",
  "cat.featured": "精选类别",
  "cat.subtitle": "发现适合您车辆每个部分的精选系列。",
  "cat.noContent": "该类别没有特色内容。",
  // ===================================
  "ccr.page.title": "碳陶瓷转子",
  "ccr.find.title": "寻找您完美的碳陶瓷转子",
  "ccr.find.sub": "选择您的车辆，发现为实现最佳性能而设计的高级转子。",
  "ccr.noProducts.title": "没有匹配的产品",
  "ccr.noProducts.sub": "您的选择与任何产品都不匹配。请尝试使用其他过滤器。",
  "ccr.hero.sub": "终极制动技术",
  "ccr.hero.title": "碳陶瓷转子",
  "ccr.hero.desc": "赛车制动技术的顶峰，专为街道设计。",
  "ccr.feature1": "轻量化结构",
  "ccr.feature2": "卓越的散热性能",
  "ccr.feature3": "更长的使用寿命",
  "ccr.faq.title": "您的问题，已解答",
  "ccr.faq1.q": "是什么让碳陶瓷转子优于标准铁质转子？",
  "ccr.faq1.a": "碳陶瓷转子重量减轻高达60%，并提供卓越的耐热性。",
  "ccr.faq2.q": "OWNSILENT碳陶瓷套件适合日常驾驶吗？",
  "ccr.faq2.a": "是的。我们的套件经过全面优化，适用于街道使用，提供静音操作。",
  "ccr.faq3.q": "碳陶瓷刹车需要特殊维护吗？",
  "ccr.faq3.a": "维护量极小——它们几乎不产生刹车粉尘，使用寿命更长。",
  // CHINESE (zh) - For About Us Page
  // ===================================
  "aboutPage.meta": "关于 OwnSilent",
  "aboutPage.title": "推动汽车性能的未来",
  "aboutPage.subtitle":
    "自2015年以来，我们一直是高性能汽车零部件和定制车辆领域的全球质量和信任基准。",
  "aboutPage.exploreBtn": "探索我们的产品",
  "aboutPage.story.meta": "我们的故事",
  "aboutPage.story.title": "激情驱动，信任铸就",
  "aboutPage.story.p1":
    "OwnSilent的诞生源于一个简单的热情：让每位爱好者和日常驾驶者都能简单、透明、满意地找到完美的组件。",
  "aboutPage.story.p2":
    "从我们这里购买的不仅仅是一笔交易；这是您满怀信心和世界一流品质维护和升级车辆的一步。",
  "aboutPage.principles.meta": "我们的原则",
  "aboutPage.principles.title": "我们对您的承诺",
  "aboutPage.principles.sub":
    "我们建立在核心价值观的基础上，这些价值观指导着我们做出的每一个决定以及我们与全球社区的每一次互动。",
  "aboutPage.value1.t": "不妥协的质量",
  "aboutPage.value1.d":
    "我们致力于为您带来最好的零件，确保每个组件都符合我们严格的卓越标准。",
  "aboutPage.value2.t": "专业知识与热情",
  "aboutPage.value2.d":
    "我们的团队由汽车爱好者和专家组成，随时准备引导您充满信心地完成您的旅程。",
  "aboutPage.value3.t": "信任与透明",
  "aboutPage.value3.d":
    "客户满意是我们的首要任务。我们以诚信经营，与我们服务的每一位司机建立持久的关系。",
  "aboutPage.careers.meta": "职业机会",
  "aboutPage.careers.title": "加入全球汽车创新领导者",
  "aboutPage.careers.sub":
    "我们一直在寻找有才华的人才加入我们的使命，为全球客户提供世界一流的汽车解决方案。",
  "aboutPage.careers.why.t": "为什么与我们合作？",
  "aboutPage.careers.why.l1": "使用最先进的技术和尖端的汽车制造工艺。",
  "aboutPage.careers.why.l2": "成为一家与全球合作伙伴和客户合作的公司的一员。",
  "aboutPage.careers.why.l3": "获得培训、技能发展和职业晋升的机会。",
  "aboutPage.careers.why.l4": "为豪华轿车、SUV和超级跑车创造优质解决方案。",
  "aboutPage.careers.open.t": "开放的专业领域",
  "aboutPage.careers.open.sub":
    "我们欢迎多个业务领域的申请。如果您有技能和热情，我们希望听到您的声音。",
  "aboutPage.careers.cat1": "工程与制造",
  "aboutPage.careers.cat2": "研究与开发",
  "aboutPage.careers.cat3": "销售与经销商关系",
  "aboutPage.careers.cat4": "市场营销与传播",
  "aboutPage.careers.cat5": "运营与物流",
  "aboutPage.careers.cat6": "客户与技术支持",

  "home.banner.title": "体验极致性能",
  "home.banner.desc": "通过我们的世界级碳组件和精密工程提升您的座驾。",
  "home.banner.btn": "查看系列",
  //news page
  // ===================================
  "newsPage.loading": "正在加载文章...",
  "newsPage.title": "新闻与见解",
  "newsPage.subtitle": "您获取最新汽车零部件和性能信息的来源。",
  "newsPage.filter.title": "筛选文章",
  "newsPage.filter.reset": "重置所有筛选器",
  "newsPage.readMore": "阅读更多",
  "newsPage.noArticles.title": "未找到文章",
  // CHINESE (zh) - For Contact Us Page
  // ===================================
  "contact.hero.meta": "提供24/7支持",
  "contact.hero.title": "联系我们",
  "contact.hero.sub": "需要特定零件或对您的订单有疑问？我们随时为您提供帮助。",
  "contact.info.title": "联系信息",
  "contact.info.email.title": "给我们发电子邮件",
  "contact.info.email.sub": "一般查询和销售",
  "contact.info.phone.title": "致电我们",
  "contact.info.phone.sub": "周一至周五上午9点至下午6点",
  "contact.info.addr.title": "访问我们",
  "contact.help.title": "需要即时帮助？",
  "contact.help.sub": "查看我们的常见问题以获取快速解答。",
  "contact.help.btn": "访问帮助中心",
  "contact.tab.request": "请求零件",
  "contact.tab.support": "帮助与支持",
  "contact.form.s1.title": "您的联系方式",
  "contact.form.s2.request.title": "零件和运输详情",
  "contact.form.s2.support.title": "我们能如何帮助您？",
  "contact.form.fullName": "全名",
  "contact.form.email": "电子邮件地址",
  "contact.form.phone": "电话号码",
  "contact.form.partName": "零件名称/描述",
  "contact.form.brand": "汽车品牌",
  "contact.form.model": "汽车型号",
  "contact.form.year": "汽车年份",
  "contact.form.address": "送货地址",
  "contact.form.street": "街道地址",
  "contact.form.city": "城市",
  "contact.form.state": "州",
  "contact.form.zip": "邮政编码",
  "contact.form.subject": "主题",
  "contact.form.message": "附加信息",
  "contact.form.submitBtn": "提交请求",
  "contact.form.submitting": "正在提交...",
  "contact.form.success.title": "谢谢！",
  "contact.form.success.sub":
    "我们已收到您的消息。我们的团队将进行审核并尽快与您联系。",
  "contact.form.success.btn": "继续购物",
  // CHINESE (zh) - For Shop Page
  // ===================================
  "shop.loading": "正在加载产品...",
  "shop.title": "选购所有零件",
  "shop.subtitle": "来自全球顶级制造商的优质汽车零件。",
  "shop.search.placeholder": "按产品名称、SKU或零件编号搜索...",
  "shop.filter.title": "筛选器",
  "shop.filter.reset": "重置",
  "shop.filter.resetAll": "全部重置",
  "shop.filter.showResults": "显示结果",
  "shop.filter.categories": "类别",
  "shop.filter.brands": "品牌",
  "shop.filter.models": "型号",
  "shop.filter.searchPlaceholder": "搜索 {title}...",
  "shop.filter.noCategories": "没有匹配的类别。",
  "shop.filter.noBrands": "没有匹配的品牌。",
  "shop.filter.noModels": "未找到该品牌的型号。",
  "shop.results.showing": "显示",
  "shop.results.of": "中的",
  "shop.results.results": "个结果",
  "shop.sort.latest": "按最新排序",
  "shop.noProducts.title": "未找到产品",
  "shop.noProducts.sub":
    "我们找不到与您的筛选器匹配的任何产品。请尝试调整您的搜索。",
  "shop.noProducts.clearBtn": "清除筛选器",
  "shop.cart.addSuccess": "已添加到购物车！",
  "shop.cart.addError": "无法添加到购物车。",
  "shop.cart.loginError": "请登录以将商品添加到您的购物车。",
  // CHINESE (zh) - For Footer Disclaimer
  // ===================================
  "footer.disclaimer.p1":
    "本网站上显示的所有品牌名称、徽标和商标仅供参考。Own Silent International Limited与任何汽车制造商均无附属、认可或授权关系。所有产品名称、编号和图像仅用于识别和兼容性目的。",
  "footer.disclaimer.p2":
    "我们在全球范围内制造和交易售后、原厂和定制汽车零件。客户有责任确保所有产品的合法合规、安全安装和正确使用。Own Silent International Limited对因使用我们的产品而造成的损害、车辆改装或保修影响不承担任何责任。",
  "footer.disclaimer.p3":
    "使用本网站和购买产品即表示接受我们的完整免责声明。有关完整的法律条款，请参阅我们的",
  "footer.disclaimer.link": "完整免责声明页面",
  "footer.copyright.short":
    "所有品牌、徽标和商标仅供参考；我们与任何制造商均无附属或认可关系。产品为售后、原厂或定制件；使用风险自负。有关详细信息，请参阅我们的{link}。",
  "footer.copyright.link": "完整免责声明",

  // Showcase
  "showcase.series": "高性能系列",
  "showcase.stats": "工程数据",
  "showcase.status": "展示",
  "showcase.paused": "已暂停",
  "showcase.auto": "自动",
  "showcase.osPerformance": "OS 性能",
  "showcase.est": "始于 1998",
  "showcase.aerospace": "航空航天级",
  "showcase.discover": "探索无限动力",

  "showcase.part1.name": "碳基矩阵制动盘",
  "showcase.part1.headline": "每一次制动，皆是热能主宰。",
  "showcase.part1.desc":
    "我们的碳陶瓷矩阵制动盘提供无与伦比的散热性能，即使在极端赛道条件下也能确保零热衰退。",
  "showcase.part1.bgText": "动力",
  "showcase.part1.s1.l": "材质",
  "showcase.part1.s1.v": "碳硅复合材料",
  "showcase.part1.s2.l": "热极限",
  "showcase.part1.s2.v": "1200°C",
  "showcase.part1.s3.l": "减重",
  "showcase.part1.s3.v": "45%",

  "showcase.part2.name": "Aero-S 锻造轮毂",
  "showcase.part2.headline": "轻量。锻造。势不可挡。",
  "showcase.part2.desc":
    "采用航空级 6061-T6 铝材精密制造，Aero-S 系列显著降低簧下质量，提供卓越的操控感。",
  "showcase.part2.bgText": "轻盈",
  "showcase.part2.s1.l": "工艺",
  "showcase.part2.s1.v": "8000吨锻造",
  "showcase.part2.s2.l": "载重指数",
  "showcase.part2.s2.v": "950kg",
  "showcase.part2.s3.l": "轮毂重量",
  "showcase.part2.s3.v": "8.2kg",

  "showcase.part3.name": "Adaptive Nitro 氮气避震",
  "showcase.part3.headline": "精准无暇。",
  "showcase.part3.desc":
    "超快响应的充氮减震器，具有 32 段阻尼调节，在赛道刚性与街道舒适度之间取得完美平衡。",
  "showcase.part3.bgText": "丝滑",
  "showcase.part3.s1.l": "调节",
  "showcase.part3.s1.v": "32 段可调",
  "showcase.part3.s2.l": "气体类型",
  "showcase.part3.s2.v": "高纯度氮气",
  "showcase.part3.s3.l": "行程",
  "showcase.part3.s3.v": "110mm",

  "showcase.part4.name": "激光矩阵大灯",
  "showcase.part4.headline": "照亮前行之路。",
  "showcase.part4.desc":
    "高清激光投影系统，采用自适应光束技术，可提供长达 600 米的清晰视野。",
  "showcase.part4.bgText": "光芒",
  "showcase.part4.s1.l": "照射范围",
  "showcase.part4.s1.v": "600米",
  "showcase.part4.s2.l": "技术",
  "showcase.part4.s2.v": "激光矩阵",
  "showcase.part4.s3.l": "效率",
  "showcase.part4.s3.v": "A+++",

  "showcase.part5.name": "锻造碳纤维气动组件",
  "showcase.part5.headline": "空气动力学新篇章。",
  "showcase.part5.desc":
    "超轻量锻造碳纤维组件，专为最大下压力和激进美学而设计。",
  "showcase.part5.bgText": "气动",
  "showcase.part5.s1.l": "材质",
  "showcase.part5.s1.v": "锻造碳纤维",
  "showcase.part5.s2.l": "下压力",
  "showcase.part5.s2.v": "+120kg",
  "showcase.part5.s3.l": "减重",
  "showcase.part5.s3.v": "-15公斤",

  // Footer Payment Methods
  "footer.payment.title": "安全支付",
  "footer.payment.subtitle":
    "我们接受通过PayPal、主要信用卡和借记卡以及银行转账进行的安全支付。",
  "footer.payment.bank": "银行转账",

  // Common UI Text
  "common.learnMore": "了解更多",
  "common.exploreMore": "探索优质零件",

  // What We Do Section
  "whatWeDo.badge": "我们的服务",
  "whatWeDo.title": "我们",
  "whatWeDo.titleHighlight": "做什么",
  "whatWeDo.subtitle": "我们提供具有精密工程和无与伦比质量的高级汽车解决方案。",
  "whatWeDo.feature1.title": "高级零件供应",
  "whatWeDo.feature1.desc": "来自全球顶级制造商的高性能组件。",
  "whatWeDo.feature2.title": "质量保证",
  "whatWeDo.feature2.desc": "每个零件都经过严格测试，以满足并超越OEM标准。",
  "whatWeDo.feature3.title": "专业安装",
  "whatWeDo.feature3.desc": "通过我们的全球合作伙伴网络提供专业安装服务。",
  "whatWeDo.feature4.title": "全球运输",
  "whatWeDo.feature4.desc": "快速可靠地向全球客户交付。",

  // Premium Parts Categories
  "categories.badge": "按类别购物",
  "categories.title": "为您的",
  "categories.titleHighlight": "汽车选择高级零件",
  "categories.subtitle": "探索我们精心挑选的高性能汽车组件系列。",
  "categories.viewAll": "查看所有类别",

  // Our Gallery
  "gallery.badge": "我们的作品",
  "gallery.title": "我们的",
  "gallery.titleHighlight": "画廊",
  "gallery.subtitle": "探索我们的高级建造和安装作品集。",
  "gallery.img1.alt": "高级碳陶瓷制动器安装",
  "gallery.img2.alt": "定制车身套件安装",
  "gallery.img3.alt": "高性能排气系统",
  "gallery.img4.alt": "豪华内饰升级",
  "gallery.img5.alt": "锻造轮毂安装",
  "gallery.img6.alt": "碳纤维组件",
  "gallery.img7.alt": "完整车辆改装",
  "gallery.img8.alt": "专业细节工作",

  // How We Work
  "howWeWork.badge": "我们的流程",
  "howWeWork.title": "我们如何",
  "howWeWork.titleHighlight": "工作",
  "howWeWork.subtitle": "从选择到安装的简单透明流程。",
  "howWeWork.step1.title": "浏览和选择",
  "howWeWork.step1.desc": "浏览我们广泛的目录，为您的车辆找到完美的零件。",
  "howWeWork.step2.title": "下订单",
  "howWeWork.step2.desc": "安全支付，多种支付选项，即时确认。",
  "howWeWork.step3.title": "快速交付",
  "howWeWork.step3.desc": "您的零件经过精心包装，直接运送到您的位置。",
  "howWeWork.step4.title": "安装和享受",
  "howWeWork.step4.desc": "专业安装或DIY - 我们在每一步都支持您。",
  "howWeWork.cta.text": "准备好升级您的车辆了吗？",
  "howWeWork.cta.button": "开始购物",

  // Reviews
  "reviews.badge": "客户评价",
  "reviews.title": "我们的客户",
  "reviews.titleHighlight": "怎么说",
  "reviews.subtitle": "来自信任我们的驾驶员的真实反馈。",
  "reviews.review1.name": "马库斯·罗德里格斯",
  "reviews.review1.car": "保时捷 911 GT3 RS",
  "reviews.review1.feedback":
    "碳陶瓷转子彻底改变了我的制动性能。令人难以置信的制动力，在赛道上零衰减。OwnSilent的质量无与伦比。",
  "reviews.review1.location": "迈阿密，美国",
  "reviews.review2.name": "索菲·洛朗",
  "reviews.review2.car": "法拉利 488 Pista",
  "reviews.review2.feedback":
    "从头到尾的卓越服务。团队帮助我选择了完美的排气系统，安装无可挑剔。我的法拉利听起来和表现都比以往任何时候都好。",
  "reviews.review2.location": "巴黎，法国",
  "reviews.review3.name": "田中健二",
  "reviews.review3.car": "兰博基尼 Huracán",
  "reviews.review3.feedback":
    "优质零件配合卓越的客户支持。车身套件安装完美，运送到日本比预期的要快。强烈推荐！",
  "reviews.review3.location": "东京，日本",
  "reviews.review4.name": "亚历山大·穆勒",
  "reviews.review4.car": "奥迪 RS6 Avant",
  "reviews.review4.feedback":
    "专业的专业知识和对汽车卓越的真正热情。悬挂升级完全改变了我的RS6的操控方式。物有所值。",
  "reviews.review4.location": "慕尼黑，德国",
};

// ==========================================
// 8. PORTUGUESE
// ==========================================
const ptTranslations = {
  "nav.shop": "Loja",
  "nav.about": "Sobre nós",
  "nav.blogs": "Blog",
  "nav.news": "Notícias",
  "nav.contact": "Contato",
  "nav.home": "Início",
  "nav.cart": "Carrinho",
  "nav.account": "Conta",
  "nav.rotors": "Rotores de Carbono-Cerâmica",
  "auth.login": "Entrar",
  "auth.signup": "Cadastre-se",
  "auth.logout": "Sair",
  "common.currency": "Moeda",
  "common.language": "Idioma",
  "common.viewMore": "Ver mais",
  "hero.welcome": "Bem-vindo à",
  "hero.desc":
    "Uma empresa de tuning automotivo de luxo e comércio global com sede em Hong Kong, renomada por sua experiência em componentes de alto desempenho e soluções de veículos sob medida.",
  "hero.s1.t": "Sistemas de freio de carbono-cerâmica",
  "hero.s1.d":
    "Projetado para máxima potência de frenagem e estabilidade térmica incomparável.",
  "hero.s2.t": "Componentes de fibra de carbono",
  "hero.s2.d":
    "Kits de carroceria completos, peças aerodinâmicas e componentes internos de luxo.",
  "hero.s3.t": "Conversões completas de veículos",
  "hero.s3.d":
    "Soluções de design e ajuste sob medida para veículos de alta gama.",
  "hero.box.t": "Expertise global e fabricação de precisão",
  "hero.box.d":
    "Projetamos, desenvolvemos e fabricamos nossos produtos de acordo com os padrões de precisão OEM, testando a qualidade e a segurança antes do envio.",
  "hero.list1": "Design e desenvolvimento 3D internos",
  "hero.list2": "Rede global de parceiros de instalação",
  "hero.list3": "Carga marítima e aérea mundial",
  "hero.footer":
    "Impulsionados pela inovação, artesanato e desempenho, moldamos o futuro do tuning de carros de luxo.",
  "feat.choose.t": "Por Que",
  "feat.choose.h": "Nos Escolher?",
  "feat.choose.d":
    "Estamos empenhados em fornecer o melhor serviço e produtos da mais alta qualidade, sempre.",
  "feat.work.t": "Por Que",
  "feat.work.h": "Trabalhar Conosco?",
  "feat.work.d":
    "Junte-se a uma equipe dinâmica na vanguarda da inovação automotiva e construa uma carreira gratificante.",
  "feat.contact": "Contate nossa equipe",
  "feat.c.shipping.t": "Envio rápido e confiável",
  "feat.c.shipping.d": "Pedidos despachados prontamente para sua porta.",
  "feat.c.coverage.t": "Cobertura nacional",
  "feat.c.coverage.d": "Entregando em todos os cantos da Índia.",
  "feat.c.quality.t": "Qualidade em que você pode confiar",
  "feat.c.quality.d": "Nossa prioridade nº 1 é oferecer qualidade premium.",
  "feat.c.support.t": "Suporte especializado dedicado",
  "feat.c.support.d": "Nossa equipe está aqui para ajudar, das 9h às 17h.",
  "feat.w.innovate.t": "Ambiente inovador",
  "feat.w.innovate.d":
    "Trabalhe com tecnologia de ponta e processos de fabricação automotiva de vanguarda.",
  "feat.w.global.t": "Exposição global",
  "feat.w.global.d":
    "Faça parte de uma empresa que envia e colabora com parceiros em todo o mundo.",
  "feat.w.growth.t": "Crescimento profissional",
  "feat.w.growth.d":
    "Oportunidades de treinamento, desenvolvimento de habilidades e avanço na carreira.",
  "feat.w.roles.t": "Funções diversas",
  "feat.w.roles.d": "Da engenharia e P&D às vendas, marketing e logística.",
  "feat.w.impact.t": "Trabalho impactante",
  "feat.w.impact.d":
    "Contribua para a criação de soluções premium para carros de luxo.",
  "about.title": "Impulsionando sua jornada",
  "about.titleHighlight": "Para frente",
  "about.intro":
    "Na OwnSilent, não vendemos apenas autopeças, construímos relacionamentos baseados na confiança e na qualidade.",
  "about.mission":
    "Nossa missão é simples: fornecer aos entusiastas as peças da mais alta qualidade, juntamente com aconselhamento especializado.",
  "about.f.quality.title": "Qualidade",
  "about.f.quality.desc":
    "Rigorosamente testado para qualidade e durabilidade superiores.",
  "about.f.shipping.title": "Envio",
  "about.f.shipping.desc": "As peças chegam de forma rápida e segura.",
  "about.f.support.title": "Suporte",
  "about.f.support.desc":
    "Nossa equipe experiente está sempre aqui para ajudar.",
  "blog.title": "Últimas do nosso",
  "blog.highlight": "Blog",
  "blog.subtitle":
    "Mantenha-se atualizado com as tendências e tecnologias do mundo automotivo.",
  "blog.viewAll": "Ver todos os blogs",
  "cat.explore": "Explore nossas coleções",
  "cat.featured": "Categorias em destaque",
  "cat.subtitle":
    "Descubra coleções selecionadas para cada parte do seu veículo.",
  "cat.noContent":
    "Nenhum conteúdo em destaque disponível para esta categoria.",
  // ===================================
  "ccr.page.title": "Rotores de Carbono-Cerâmica",
  "ccr.find.title": "Encontre o seu Rotor de Carbono-Cerâmica Perfeito",
  "ccr.find.sub":
    "Selecione o seu veículo para descobrir rotores premium projetados para o máximo desempenho.",
  "ccr.noProducts.title": "Nenhum produto correspondente",
  "ccr.noProducts.sub":
    "A sua seleção não corresponde a nenhum produto. Por favor, tente um filtro diferente.",
  "ccr.hero.sub": "Tecnologia de Travagem de Ponta",
  "ccr.hero.title": "Rotores de Carbono-Cerâmica",
  "ccr.hero.desc":
    "O auge da tecnologia de travagem do desporto motorizado, projetada para a rua.",
  "ccr.feature1": "Construção Leve",
  "ccr.feature2": "Dissipação de Calor Superior",
  "ccr.feature3": "Vida Útil Prolongada",
  "ccr.faq.title": "As Suas Perguntas, Respondidas",
  "ccr.faq1.q":
    "O que torna os rotores de carbono-cerâmica melhores do que os rotores de ferro padrão?",
  "ccr.faq1.a":
    "Os rotores de carbono-cerâmica são até 60% mais leves e oferecem uma resistência superior ao calor.",
  "ccr.faq2.q":
    "Os kits de carbono-cerâmica da OWNSILENT são adequados para a condução diária?",
  "ccr.faq2.a":
    "Sim. Os nossos kits são otimizados para uso na rua, oferecendo uma operação silenciosa.",
  "ccr.faq3.q": "Os travões de carbono-cerâmica requerem manutenção especial?",
  "ccr.faq3.a":
    "A manutenção é mínima - eles quase não produzem pó de travão e duram significativamente mais.",
  // PORTUGUESE (pt) - For About Us Page
  // ===================================
  "aboutPage.meta": "Sobre a OwnSilent",
  "aboutPage.title": "Conduzindo o Futuro do Desempenho Automotivo",
  "aboutPage.subtitle":
    "Desde 2015, somos a referência global em qualidade e confiança em peças automotivas de alto desempenho e personalizações de veículos sob medida.",
  "aboutPage.exploreBtn": "Explore nossos produtos",
  "aboutPage.story.meta": "Nossa história",
  "aboutPage.story.title": "Movidos pela paixão, construídos na confiança",
  "aboutPage.story.p1":
    "A OwnSilent nasceu de uma paixão simples: tornar a busca pelo componente perfeito uma experiência simples, transparente e satisfatória para todos os entusiastas.",
  "aboutPage.story.p2":
    "Cada compra conosco é mais do que uma transação; é um passo para manter e atualizar seu veículo com total confiança e qualidade de classe mundial.",
  "aboutPage.principles.meta": "Nossos princípios",
  "aboutPage.principles.title": "Nosso compromisso com você",
  "aboutPage.principles.sub":
    "Somos construídos sobre uma base de valores fundamentais que orientam cada decisão que tomamos.",
  "aboutPage.value1.t": "Qualidade intransigente",
  "aboutPage.value1.d":
    "Dedicamo-nos a trazer as melhores peças, garantindo que cada componente atenda aos nossos rigorosos padrões de excelência.",
  "aboutPage.value2.t": "Expertise e paixão",
  "aboutPage.value2.d":
    "Nossa equipe é formada por entusiastas e especialistas automotivos prontos para guiá-lo em sua jornada.",
  "aboutPage.value3.t": "Confiança e transparência",
  "aboutPage.value3.d":
    "A satisfação do cliente é nossa prioridade. Operamos com integridade para construir relacionamentos duradouros.",
  "aboutPage.careers.meta": "Carreiras",
  "aboutPage.careers.title":
    "Junte-se a um líder global em inovação automotiva",
  "aboutPage.careers.sub":
    "Estamos sempre procurando por indivíduos talentosos para se juntarem à nossa missão de fornecer soluções automotivas de classe mundial.",
  "aboutPage.careers.why.t": "Por que trabalhar conosco?",
  "aboutPage.careers.why.l1":
    "Trabalhe com tecnologia de ponta e processos automotivos de vanguarda.",
  "aboutPage.careers.why.l2":
    "Faça parte de uma empresa que colabora com parceiros e clientes em todo o mundo.",
  "aboutPage.careers.why.l3":
    "Acesse oportunidades de treinamento, desenvolvimento de habilidades e avanço na carreira.",
  "aboutPage.careers.why.l4":
    "Contribua para a criação de soluções premium para carros de luxo, SUVs e supercarros.",
  "aboutPage.careers.open.t": "Áreas de especialização abertas",
  "aboutPage.careers.open.sub":
    "Aceitamos inscrições em várias áreas de negócios. Se você tem as habilidades e a paixão, queremos ouvi-lo.",
  "aboutPage.careers.cat1": "Engenharia e Manufatura",
  "aboutPage.careers.cat2": "Pesquisa e Desenvolvimento",
  "aboutPage.careers.cat3": "Vendas e Relações com Revendedores",
  "aboutPage.careers.cat4": "Marketing e Comunicações",
  "aboutPage.careers.cat5": "Operações e Logística",
  "aboutPage.careers.cat6": "Suporte ao Cliente e Técnico",

  "home.banner.title": "Experimente a Performance Máxima",
  "home.banner.desc":
    "Eleve o seu veículo com os nossos componentes de carbono de classe mundial e engenharia de precisão.",
  "home.banner.btn": "Ver Coleção",
  //news page
  "newsPage.loading": "Carregando artigos...",
  "newsPage.title": "Notícias e Insights",
  "newsPage.subtitle":
    "Sua fonte para o que há de mais recente em autopeças e desempenho.",
  "newsPage.filter.title": "Filtrar Artigos",
  "newsPage.filter.reset": "Redefinir Filtros",
  "newsPage.readMore": "Leia Mais",
  "newsPage.noArticles.title": "Nenhum artigo encontrado",
  // PORTUGUESE (pt) - For Contact Us Page
  // ===================================
  "contact.hero.meta": "Suporte disponível 24/7",
  "contact.hero.title": "Entre em contato",
  "contact.hero.sub":
    "Precisa de uma peça específica ou tem uma pergunta sobre o seu pedido? Estamos aqui para ajudar.",
  "contact.info.title": "Informações de Contato",
  "contact.info.email.title": "Envie-nos um e-mail",
  "contact.info.email.sub": "Para perguntas gerais e vendas",
  "contact.info.phone.title": "Ligue para nós",
  "contact.info.phone.sub": "Seg-Sex das 9h às 18h",
  "contact.info.addr.title": "Visite-nos",
  "contact.help.title": "Precisa de ajuda imediata?",
  "contact.help.sub":
    "Consulte as nossas perguntas frequentes para obter respostas rápidas.",
  "contact.help.btn": "Visite o Centro de Ajuda",
  "contact.tab.request": "Solicitar uma Peça",
  "contact.tab.support": "Ajuda e Suporte",
  "contact.form.s1.title": "Seus Detalhes de Contato",
  "contact.form.s2.request.title": "Detalhes da Peça e do Envio",
  "contact.form.s2.support.title": "Como podemos ajudar?",
  "contact.form.fullName": "Nome Completo",
  "contact.form.email": "Endereço de E-mail",
  "contact.form.phone": "Número de Telefone",
  "contact.form.partName": "Nome / Descrição da Peça",
  "contact.form.brand": "Marca do Carro",
  "contact.form.model": "Modelo do Carro",
  "contact.form.year": "Ano do Carro",
  "contact.form.address": "Endereço de Entrega",
  "contact.form.street": "Endereço",
  "contact.form.city": "Cidade",
  "contact.form.state": "Estado",
  "contact.form.zip": "CEP",
  "contact.form.subject": "Assunto",
  "contact.form.message": "Mensagem Adicional",
  "contact.form.submitBtn": "Enviar Pedido",
  "contact.form.submitting": "Enviando...",
  "contact.form.success.title": "Obrigado!",
  "contact.form.success.sub":
    "Recebemos a sua mensagem. A nossa equipe irá analisá-la e entrará em contato em breve.",
  "contact.form.success.btn": "Continuar Comprando",
  // PORTUGUESE (pt) - For Shop Page
  // ===================================
  "shop.loading": "Carregando produtos...",
  "shop.title": "Comprar Todas as Peças",
  "shop.subtitle":
    "Peças automotivas premium dos principais fabricantes mundiais.",
  "shop.search.placeholder":
    "Pesquisar por nome do produto, SKU ou número da peça...",
  "shop.filter.title": "Filtros",
  "shop.filter.reset": "Redefinir",
  "shop.filter.resetAll": "Redefinir Tudo",
  "shop.filter.showResults": "Mostrar Resultados",
  "shop.filter.categories": "Categorias",
  "shop.filter.brands": "Marcas",
  "shop.filter.models": "Modelos",
  "shop.filter.searchPlaceholder": "Pesquisar {title}...",
  "shop.filter.noCategories": "Nenhuma categoria corresponde.",
  "shop.filter.noBrands": "Nenhuma marca corresponde.",
  "shop.filter.noModels": "Nenhum modelo encontrado para esta marca.",
  "shop.results.showing": "Mostrando",
  "shop.results.of": "de",
  "shop.results.results": "resultados",
  "shop.sort.latest": "Ordenar por mais recente",
  "shop.noProducts.title": "Nenhum produto encontrado",
  "shop.noProducts.sub":
    "Não foi possível encontrar produtos que correspondam aos seus filtros. Tente ajustar a sua pesquisa.",
  "shop.noProducts.clearBtn": "Limpar Filtros",
  "shop.cart.addSuccess": "Adicionado ao carrinho!",
  "shop.cart.addError": "Não foi possível adicionar ao carrinho.",
  "shop.cart.loginError": "Faça login para adicionar itens ao seu carrinho.",
  // PORTUGUESE (pt) - For Footer Disclaimer
  // ===================================
  "footer.disclaimer.p1":
    "Todos os nomes de marcas, logotipos e marcas registradas exibidos neste site são apenas para referência. A Own Silent International Limited não é afiliada, endossada ou autorizada por nenhum fabricante de veículos. Todos os nomes, números e imagens de produtos são apenas para fins de identificação e compatibilidade.",
  "footer.disclaimer.p2":
    "Fabricamos e comercializamos peças automotivas de reposição, genuínas e personalizadas em todo o mundo. Os clientes são responsáveis por garantir a conformidade legal, a instalação segura e o uso adequado de todos os produtos. A Own Silent International Limited não se responsabiliza por danos, modificações no veículo ou impactos na garantia resultantes do uso de nossos produtos.",
  "footer.disclaimer.p3":
    "O uso deste site e a compra de produtos constituem a aceitação de nosso aviso legal completo. Para os termos legais completos, consulte nossa",
  "footer.disclaimer.link": "Página de Aviso Legal Completo",
  "footer.copyright.short":
    "Todas as marcas, logotipos e marcas registradas são apenas para referência; não somos afiliados ou endossados por nenhum fabricante. Os produtos são de reposição, genuínos ou personalizados; use por sua conta e risco. Consulte nosso {link} para obter detalhes.",
  "footer.copyright.link": "Aviso Legal Completo",

  // Showcase
  "showcase.series": "Série de Alta Performance",
  "showcase.stats": "Estatísticas de Engenharia",
  "showcase.status": "Vitrine",
  "showcase.paused": "Pausado",
  "showcase.auto": "Auto",
  "showcase.osPerformance": "PERFORMANCE OS",
  "showcase.est": "EST. 1998",
  "showcase.aerospace": "GRAU AEROESPACIAL",
  "showcase.discover": "DESCUBRA O PODER ILIMITADO",

  "showcase.part1.name": "Rotores de Matriz de Carbono",
  "showcase.part1.headline": "Maestria Térmica em Cada Parada.",
  "showcase.part1.desc":
    "Os nossos rotores de matriz de carbono-cerâmica proporcionam uma dissipação de calor inigualável e zero fadiga de travagem, mesmo em condições extremas de pista.",
  "showcase.part1.bgText": "PODER",
  "showcase.part1.s1.l": "Material",
  "showcase.part1.s1.v": "Carbono-Silício",
  "showcase.part1.s2.l": "Limite Calor",
  "showcase.part1.s2.v": "1200°C",
  "showcase.part1.s3.l": "Red. Peso",
  "showcase.part1.s3.v": "45%",

  "showcase.part2.name": "Jantes Forjadas Aero-S",
  "showcase.part2.headline": "Leve. Forjado. Imparável.",
  "showcase.part2.desc":
    "Concebida com precisão a partir de alumínio 6061-T6 de qualidade aeroespacial, a série Aero-S reduz significativamente a massa não suspensa para uma manobrabilidade superior.",
  "showcase.part2.bgText": "LEVE",
  "showcase.part2.s1.l": "Processo",
  "showcase.part2.s1.v": "8000T Forjado",
  "showcase.part2.s2.l": "Capacidade Carga",
  "showcase.part2.s2.v": "950kg",
  "showcase.part2.s3.l": "Peso Jante",
  "showcase.part2.s3.v": "8.2kg",

  "showcase.part3.name": "Coilovers Nitro Adaptáveis",
  "showcase.part3.headline": "Precisão Perfeccionada.",
  "showcase.part3.desc":
    "Amortecedores carregados com nitrogénio de resposta ultra-rápida com ajuste de 32 posições, oferecendo el equilibrio perfeito entre rigidez em pista e conforto na estrada.",
  "showcase.part3.bgText": "DESLIZE",
  "showcase.part3.s1.l": "Ajuste",
  "showcase.part3.s1.v": "32 Vias",
  "showcase.part3.s2.l": "Tipo Gás",
  "showcase.part3.s2.v": "N2 Alta Purezza",
  "showcase.part3.s3.l": "Curso",
  "showcase.part3.s3.v": "110mm",

  "showcase.part4.name": "Faróis LASER de Matriz",
  "showcase.part4.headline": "Iluminando o caminho à frente.",
  "showcase.part4.desc":
    "Sistema de projeção laser de alta definição com tecnologia de feixe adaptativo, proporcionando até 600 m de visibilidade cristalina.",
  "showcase.part4.bgText": "LUZ",
  "showcase.part4.s1.l": "Alcance",
  "showcase.part4.s1.v": "600m",
  "showcase.part4.s2.l": "Tecnologia",
  "showcase.part4.s2.v": "Matriz Laser",
  "showcase.part4.s3.l": "Eficiência",
  "showcase.part4.s3.v": "A+++",

  "showcase.part5.name": "Kit Aero de Carbono Forjado",
  "showcase.part5.headline": "Aerodinâmica redefinida.",
  "showcase.part5.desc":
    "Componentes de fibra de carbono forjada ultra-leves projetados para máxima força descendente e estética agressiva.",
  "showcase.part5.bgText": "AERO",
  "showcase.part5.s1.l": "Material",
  "showcase.part5.s1.v": "Carbono Forjado",
  "showcase.part5.s2.l": "Downforce",
  "showcase.part5.s2.v": "+120kg",
  "showcase.part5.s3.l": "Redução Peso",
  "showcase.part5.s3.v": "-15kg",

  // Footer Payment Methods
  "footer.payment.title": "Pagamentos Seguros",
  "footer.payment.subtitle":
    "Aceitamos pagamentos seguros através de PayPal, principais cartões de crédito e débito, e transferência bancária.",
  "footer.payment.bank": "Transferência Bancária",

  // Common UI Text
  "common.learnMore": "Saiba Mais",
  "common.exploreMore": "Explorar peças premium",

  // What We Do Section
  "whatWeDo.badge": "Nossos Serviços",
  "whatWeDo.title": "O Que",
  "whatWeDo.titleHighlight": "Fazemos",
  "whatWeDo.subtitle":
    "Fornecemos soluções automotivas premium com engenharia de precisão e qualidade incomparável.",
  "whatWeDo.feature1.title": "Fornecimento de Peças Premium",
  "whatWeDo.feature1.desc":
    "Componentes de alto desempenho dos melhores fabricantes mundiais.",
  "whatWeDo.feature2.title": "Garantia de Qualidade",
  "whatWeDo.feature2.desc":
    "Cada peça é rigorosamente testada para atender e superar os padrões OEM.",
  "whatWeDo.feature3.title": "Instalação Especializada",
  "whatWeDo.feature3.desc":
    "Serviços de instalação profissional através da nossa rede global de parceiros.",
  "whatWeDo.feature4.title": "Envio Mundial",
  "whatWeDo.feature4.desc":
    "Entrega rápida e confiável para clientes em todo o mundo.",

  // Premium Parts Categories
  "categories.badge": "Comprar por Categoria",
  "categories.title": "Escolha Peças Premium Para",
  "categories.titleHighlight": "Seu Carro",
  "categories.subtitle":
    "Explore nossa seleção curada de componentes automotivos de alto desempenho.",
  "categories.viewAll": "Ver Todas as Categorias",

  // Our Gallery
  "gallery.badge": "Nosso Trabalho",
  "gallery.title": "Nossa",
  "gallery.titleHighlight": "Galeria",
  "gallery.subtitle":
    "Explore nosso portfólio de construções e instalações premium.",
  "gallery.img1.alt": "Instalação de freios carbono-cerâmica premium",
  "gallery.img2.alt": "Montagem de kit de carroceria personalizado",
  "gallery.img3.alt": "Sistema de escape de alto desempenho",
  "gallery.img4.alt": "Melhoria de interior de luxo",
  "gallery.img5.alt": "Instalação de rodas forjadas",
  "gallery.img6.alt": "Componentes de fibra de carbono",
  "gallery.img7.alt": "Transformação completa do veículo",
  "gallery.img8.alt": "Trabalho de detalhamento profissional",

  // How We Work
  "howWeWork.badge": "Nosso Processo",
  "howWeWork.title": "Como",
  "howWeWork.titleHighlight": "Trabalhamos",
  "howWeWork.subtitle":
    "Um processo simples e transparente da seleção à instalação.",
  "howWeWork.step1.title": "Navegar e Selecionar",
  "howWeWork.step1.desc":
    "Explore nosso vasto catálogo e encontre as peças perfeitas para seu veículo.",
  "howWeWork.step2.title": "Fazer Pedido",
  "howWeWork.step2.desc":
    "Pagamento seguro com várias opções de pagamento e confirmação instantânea.",
  "howWeWork.step3.title": "Entrega Rápida",
  "howWeWork.step3.desc":
    "Suas peças são cuidadosamente embaladas e enviadas diretamente para sua localização.",
  "howWeWork.step4.title": "Instalar e Aproveitar",
  "howWeWork.step4.desc":
    "Instalação profissional ou faça você mesmo - apoiamos você em cada etapa.",
  "howWeWork.cta.text": "Pronto para melhorar seu veículo?",
  "howWeWork.cta.button": "Começar a Comprar",

  // Reviews
  "reviews.badge": "Depoimentos",
  "reviews.title": "O Que Nossos",
  "reviews.titleHighlight": "Clientes Dizem",
  "reviews.subtitle":
    "Feedback real de motoristas que confiam em nós com seus veículos.",
  "reviews.review1.name": "Marcus Rodriguez",
  "reviews.review1.car": "Porsche 911 GT3 RS",
  "reviews.review1.feedback":
    "Os rotores carbono-cerâmica transformaram completamente meu desempenho de frenagem. Poder de parada incrível sem fade na pista. A qualidade da OwnSilent é incomparável.",
  "reviews.review1.location": "Miami, EUA",
  "reviews.review2.name": "Sophie Laurent",
  "reviews.review2.car": "Ferrari 488 Pista",
  "reviews.review2.feedback":
    "Serviço excepcional do início ao fim. A equipe me ajudou a selecionar o sistema de escape perfeito, e a instalação foi impecável. Minha Ferrari soa e performa melhor do que nunca.",
  "reviews.review2.location": "Paris, França",
  "reviews.review3.name": "Kenji Tanaka",
  "reviews.review3.car": "Lamborghini Huracán",
  "reviews.review3.feedback":
    "Peças de qualidade premium com suporte ao cliente excepcional. O ajuste do kit de carroceria foi perfeito, e o envio para o Japão foi mais rápido do que o esperado. Altamente recomendado!",
  "reviews.review3.location": "Tóquio, Japão",
  "reviews.review4.name": "Alexander Müller",
  "reviews.review4.car": "Audi RS6 Avant",
  "reviews.review4.feedback":
    "Expertise profissional e paixão genuína pela excelência automotiva. A atualização da suspensão mudou completamente a forma como minha RS6 se comporta. Vale cada centavo.",
  "reviews.review4.location": "Munique, Alemanha",
};

// ==========================================
// 9. RUSSIAN
// ==========================================
const ruTranslations = {
  "nav.shop": "Магазин",
  "nav.about": "О нас",
  "nav.blogs": "Блог",
  "nav.news": "Новости",
  "nav.contact": "Контакты",
  "nav.home": "Главная",
  "nav.cart": "Корзина",
  "nav.account": "Аккаунт",
  "nav.rotors": "Карбон-керамические роторы",
  "auth.login": "Войти",
  "auth.signup": "Регистрация",
  "auth.logout": "Выйти",
  "common.currency": "Валюта",
  "common.language": "Язык",
  "common.viewMore": "Смотреть еще",
  "hero.welcome": "Добро пожаловать в",
  "hero.desc":
    "Гонконгская компания по тюнингу автомобилей класса люкс и мировой торговле, известная своим опытом в области высокопроизводительных компонентов и индивидуальных автомобильных решений.",
  "hero.s1.t": "Карбон-керамические тормозные системы",
  "hero.s1.d":
    "Разработано для максимальной тормозной мощности и непревзойденной термической стабильности.",
  "hero.s2.t": "Компоненты из углеродного волокна",
  "hero.s2.d":
    "Полные обвесы, аэродинамические детали и роскошные компоненты интерьера.",
  "hero.s3.t": "Полные переоборудования автомобилей",
  "hero.s3.d":
    "Индивидуальный дизайн и решения по установке для автомобилей высокого класса.",
  "hero.box.t": "Глобальный опыт и прецизионное производство",
  "hero.box.d":
    "Мы проектируем, разрабатываем и производим нашу продукцию в соответствии со стандартами точности OEM, проверяя качество и безопасность перед отправкой.",
  "hero.list1": "Собственное 3D-проектирование и разработка",
  "hero.list2": "Глобальная сеть партнеров по установке",
  "hero.list3": "Мировые морские и воздушные перевозки",
  "hero.footer":
    "Руководствуясь инновациями, мастерством и производительностью, мы формируем будущее тюнинга автомобилей класса люкс.",
  "feat.choose.t": "Почему",
  "feat.choose.h": "Выбирают нас?",
  "feat.choose.d":
    "Мы стремимся предоставлять вам лучший сервис и продукцию высочайшего качества каждый раз.",
  "feat.work.t": "Почему",
  "feat.work.h": "Работать с нами?",
  "feat.work.d":
    "Присоединяйтесь к динамичной команде, находящейся на переднем крае автомобильных инноваций, и постройте успешную карьеру.",
  "feat.contact": "Связаться с нашей командой",
  "feat.c.shipping.t": "Быстрая и надежная доставка",
  "feat.c.shipping.d": "Заказы оперативно отправляются к вашему порогу.",
  "feat.c.coverage.t": "Покрытие по всей стране",
  "feat.c.coverage.d": "Доставка в каждый уголок Индии.",
  "feat.c.quality.t": "Качество, которому можно доверять",
  "feat.c.quality.d": "Наш приоритет №1 — предлагать продукцию премиум-класса.",
  "feat.c.support.t": "Выделенная экспертная поддержка",
  "feat.c.support.d": "Наша команда готова помочь с 9 до 17.",
  "feat.w.innovate.t": "Инновационная среда",
  "feat.w.innovate.d":
    "Работайте с самыми современными технологиями и передовыми процессами автомобильного производства.",
  "feat.w.global.t": "Глобальное присутствие",
  "feat.w.global.d":
    "Станьте частью компании, которая поставляет продукцию и сотрудничает с партнерами по всему миру.",
  "feat.w.growth.t": "Профессиональный рост",
  "feat.w.growth.d":
    "Возможности для обучения, развития навыков и карьерного роста.",
  "feat.w.roles.t": "Разнообразные роли",
  "feat.w.roles.d": "От инжиниринга и НИОКР до продаж, маркетинга и логистики.",
  "feat.w.impact.t": "Значимая работа",
  "feat.w.impact.d":
    "Вносите вклад в создание премиальных решений для автомобилей класса люкс.",
  "about.title": "Двигаем ваше путешествие",
  "about.titleHighlight": "Вперед",
  "about.intro":
    "В OwnSilent мы не просто продаем автозапчасти, мы строим отношения, основанные на доверии и качестве.",
  "about.mission":
    "Наша миссия проста: предоставлять энтузиастам запчасти высочайшего качества и экспертные консультации.",
  "about.f.quality.title": "Качество",
  "about.f.quality.desc":
    "Тщательно проверено на превосходное качество и долговечность.",
  "about.f.shipping.title": "Доставка",
  "about.f.shipping.desc": "Запчасти доставляются быстро и безопасно.",
  "about.f.support.title": "Поддержка",
  "about.f.support.desc": "Наша знающая команда всегда готова помочь.",
  "blog.title": "Последнее из",
  "blog.highlight": "Блога",
  "blog.subtitle": "Будьте в курсе тенденций и технологий автомобильного мира.",
  "blog.viewAll": "Посмотреть все блоги",
  "cat.explore": "Изучите наши коллекции",
  "cat.featured": "Популярные категории",
  "cat.subtitle":
    "Откройте для себя подобранные коллекции для каждой части вашего автомобиля.",
  "cat.noContent": "Для этой категории нет избранного контента.",
  // ===================================
  "ccr.page.title": "Карбон-керамические роторы",
  "ccr.find.title": "Найдите свой идеальный карбон-керамический ротор",
  "ccr.find.sub":
    "Выберите свой автомобиль, чтобы найти премиальные роторы, разработанные для максимальной производительности.",
  "ccr.noProducts.title": "Нет подходящих продуктов",
  "ccr.noProducts.sub":
    "Ваш выбор не соответствует ни одному продукту. Попробуйте другой фильтр.",
  "ccr.hero.sub": "Совершенная тормозная технология",
  "ccr.hero.title": "Карбон-керамические роторы",
  "ccr.hero.desc":
    "Вершина тормозных технологий автоспорта, разработанная для улицы.",
  "ccr.feature1": "Легкая конструкция",
  "ccr.feature2": "Превосходное теплоотведение",
  "ccr.feature3": "Увеличенный срок службы",
  "ccr.faq.title": "Ваши вопросы, наши ответы",
  "ccr.faq1.q":
    "Что делает карбон-керамические роторы лучше стандартных железных роторов?",
  "ccr.faq1.a":
    "Карбон-керамические роторы на 60% легче и обеспечивают превосходную термостойкость.",
  "ccr.faq2.q":
    "Подходят ли карбон-керамические комплекты OWNSILENT для ежедневного вождения?",
  "ccr.faq2.a":
    "Да. Наши комплекты полностью оптимизированы для уличного использования, обеспечивая бесшумную работу.",
  "ccr.faq3.q":
    "Требуют ли карбон-керамические тормоза специального обслуживания?",
  "ccr.faq3.a":
    "Обслуживание минимально — они почти не производят тормозной пыли и служат значительно дольше.",
  // RUSSIAN (ru) - For About Us Page
  // ===================================
  "aboutPage.meta": "О OwnSilent",
  "aboutPage.title": "Управляя будущим автомобильной производительности",
  "aboutPage.subtitle":
    "С 2015 года мы являемся мировым эталоном качества и доверия в области высокопроизводительных автозапчастей и индивидуальных настроек автомобилей.",
  "aboutPage.exploreBtn": "Изучить наши продукты",
  "aboutPage.story.meta": "Наша история",
  "aboutPage.story.title": "Движимые страстью, построенные на доверии",
  "aboutPage.story.p1":
    "OwnSilent родился из простой страсти: сделать поиск идеального компонента простым, прозрачным и удовлетворительным опытом для каждого энтузиаста.",
  "aboutPage.story.p2":
    "Каждая покупка у нас — это больше, чем просто транзакция; это шаг к обслуживанию и обновлению вашего автомобиля с полной уверенностью и качеством мирового класса.",
  "aboutPage.principles.meta": "Наши принципы",
  "aboutPage.principles.title": "Наши обязательства перед вами",
  "aboutPage.principles.sub":
    "Мы строим свою деятельность на основе основных ценностей, которые определяют каждое наше решение.",
  "aboutPage.value1.t": "Бескомпромиссное качество",
  "aboutPage.value1.d":
    "Мы стремимся предоставить вам лучшие детали, гарантируя, что каждый компонент соответствует нашим строгим стандартам качества.",
  "aboutPage.value2.t": "Опыт и страсть",
  "aboutPage.value2.d":
    "Наша команда состоит из автомобильных энтузиастов и экспертов, готовых помочь вам в вашем путешествии.",
  "aboutPage.value3.t": "Доверие и прозрачность",
  "aboutPage.value3.d":
    "Удовлетворенность клиентов — наш приоритет. Мы работаем честно, чтобы строить долгосрочные отношения.",
  "aboutPage.careers.meta": "Карьера",
  "aboutPage.careers.title":
    "Присоединяйтесь к мировому лидеру в области автомобильных инноваций",
  "aboutPage.careers.sub":
    "Мы всегда ищем талантливых людей, чтобы присоединиться к нашей миссии по предоставлению автомобильных решений мирового класса.",
  "aboutPage.careers.why.t": "Почему работать с нами?",
  "aboutPage.careers.why.l1":
    "Работайте с самыми современными технологиями и передовыми автомобильными процессами.",
  "aboutPage.careers.why.l2":
    "Станьте частью компании, которая сотрудничает с партнерами и клиентами по всему миру.",
  "aboutPage.careers.why.l3":
    "Получите доступ к возможностям для обучения, развития навыков и карьерного роста.",
  "aboutPage.careers.why.l4":
    "Вносите вклад в создание премиальных решений для автомобилей класса люкс, внедорожников и суперкаров.",
  "aboutPage.careers.open.t": "Открытые области экспертизы",
  "aboutPage.careers.open.sub":
    "Мы принимаем заявки в различных областях бизнеса. Если у вас есть навыки и страсть, мы хотим услышать вас.",
  "aboutPage.careers.cat1": "Инжиниринг и производство",
  "aboutPage.careers.cat2": "Исследования и разработки",
  "aboutPage.careers.cat3": "Продажи и отношения с дилерами",
  "aboutPage.careers.cat4": "Маркетинг и коммуникации",
  "aboutPage.careers.cat5": "Операции и логистика",
  "aboutPage.careers.cat6": "Клиентская и техническая поддержка",

  "home.banner.title": "Испытайте пиковую производительность",
  "home.banner.desc":
    "Усовершенствуйте свой автомобиль с помощью наших углеродных компонентов мирового класса и точного инжиниринга.",
  "home.banner.btn": "Посмотреть коллекцию",
  //news page
  "newsPage.loading": "Загрузка статей...",
  "newsPage.title": "Новости и Аналитика",
  "newsPage.subtitle":
    "Ваш источник последних новостей в мире автозапчастей и производительности.",
  "newsPage.filter.title": "Фильтровать статьи",
  "newsPage.filter.reset": "Сбросить все фильтры",
  "newsPage.readMore": "Читать далее",
  "newsPage.noArticles.title": "Статьи не найдены",
  // RUSSIAN (ru) - For Contact Us Page
  // ===================================
  "contact.hero.meta": "Поддержка доступна 24/7",
  "contact.hero.title": "Свяжитесь с нами",
  "contact.hero.sub":
    "Нужна конкретная деталь или есть вопрос по вашему заказу? Мы здесь, чтобы помочь.",
  "contact.info.title": "Контактная информация",
  "contact.info.email.title": "Напишите нам",
  "contact.info.email.sub": "Для общих запросов и продаж",
  "contact.info.phone.title": "Позвоните нам",
  "contact.info.phone.sub": "Пн-Пт с 9 до 18",
  "contact.info.addr.title": "Посетите нас",
  "contact.help.title": "Нужна срочная помощь?",
  "contact.help.sub":
    "Ознакомьтесь с нашими часто задаваемыми вопросами для быстрых ответов.",
  "contact.help.btn": "Перейти в центр помощи",
  "contact.tab.request": "Запросить деталь",
  "contact.tab.support": "Помощь и поддержка",
  "contact.form.s1.title": "Ваши контактные данные",
  "contact.form.s2.request.title": "Детали запчасти и доставки",
  "contact.form.s2.support.title": "Чем мы можем помочь?",
  "contact.form.fullName": "Полное имя",
  "contact.form.email": "Адрес электронной почты",
  "contact.form.phone": "Номер телефона",
  "contact.form.partName": "Название / Описание детали",
  "contact.form.brand": "Марка автомобиля",
  "contact.form.model": "Модель автомобиля",
  "contact.form.year": "Год выпуска",
  "contact.form.address": "Адрес доставки",
  "contact.form.street": "Улица",
  "contact.form.city": "Город",
  "contact.form.state": "Штат",
  "contact.form.zip": "Почтовый индекс",
  "contact.form.subject": "Тема",
  "contact.form.message": "Дополнительное сообщение",
  "contact.form.submitBtn": "Отправить запрос",
  "contact.form.submitting": "Отправка...",
  "contact.form.success.title": "Спасибо!",
  "contact.form.success.sub":
    "Мы получили ваше сообщение. Наша команда рассмотрит его и свяжется с вами в ближайшее время.",
  "contact.form.success.btn": "Продолжить покупки",
  // RUSSIAN (ru) - For Shop Page
  // ===================================
  "shop.loading": "Загрузка товаров...",
  "shop.title": "Магазин запчастей",
  "shop.subtitle":
    "Премиальные автозапчасти от ведущих мировых производителей.",
  "shop.search.placeholder": "Поиск по названию, артикулу или номеру детали...",
  "shop.filter.title": "Фильтры",
  "shop.filter.reset": "Сбросить",
  "shop.filter.resetAll": "Сбросить все",
  "shop.filter.showResults": "Показать результаты",
  "shop.filter.categories": "Категории",
  "shop.filter.brands": "Бренды",
  "shop.filter.models": "Модели",
  "shop.filter.searchPlaceholder": "Поиск по {title}...",
  "shop.filter.noCategories": "Нет подходящих категорий.",
  "shop.filter.noBrands": "Нет подходящих брендов.",
  "shop.filter.noModels": "Для этого бренда не найдено моделей.",
  "shop.results.showing": "Показано",
  "shop.results.of": "из",
  "shop.results.results": "результатов",
  "shop.sort.latest": "Сортировать по последним",
  "shop.noProducts.title": "Товары не найдены",
  "shop.noProducts.sub":
    "Мы не смогли найти товары, соответствующие вашим фильтрам. Попробуйте изменить поиск.",
  "shop.noProducts.clearBtn": "Очистить фильтры",
  "shop.cart.addSuccess": "Добавлено в корзину!",
  "shop.cart.addError": "Не удалось добавить в корзину.",
  "shop.cart.loginError":
    "Пожалуйста, войдите, чтобы добавлять товары в корзину.",
  // RUSSIAN (ru) - For Footer Disclaimer
  // ===================================
  "footer.disclaimer.p1":
    "Все названия брендов, логотипы и товарные знаки, отображаемые на этом веб-сайте, предназначены только для справки. Own Silent International Limited не является аффилированным лицом, не поддерживается и не авторизована ни одним из производителей транспортных средств. Все названия, номера и изображения продуктов предназначены только для целей идентификации и совместимости.",
  "footer.disclaimer.p2":
    "Мы производим и продаем послепродажные, оригинальные и заказные автомобильные запчасти по всему миру. Клиенты несут ответственность за обеспечение соблюдения законодательства, безопасную установку и правильное использование всех продуктов. Own Silent International Limited не несет ответственности за ущерб, модификации транспортных средств или влияние на гарантию в результате использования нашей продукции.",
  "footer.disclaimer.p3":
    "Использование этого веб-сайта и покупка продуктов означает принятие нашего полного отказа от ответственности. Полные юридические условия см. на нашей",
  "footer.disclaimer.link": "Странице полного отказа от ответственности",
  "footer.copyright.short":
    "Все бренды, логотипы и товарные знаки предназначены только для справки; мы не являемся аффилированными лицами и не поддерживаемся ни одним производителем. Продукты являются послепродажными, оригинальными или заказными; используйте на свой страх и риск. Подробности см. в нашем {link}.",
  "footer.copyright.link": "Полном отказе от ответственности",

  // Showcase
  "showcase.series": "Высокопроизводительная серия",
  "showcase.stats": "Инженерные данные",
  "showcase.status": "Шоукейс",
  "showcase.paused": "Пауза",
  "showcase.auto": "Авто",
  "showcase.osPerformance": "PERFORMANCE OS",
  "showcase.est": "ОСН. В 1998",
  "showcase.aerospace": "АЭРОКОСМИЧЕСКИЙ КЛАСС",
  "showcase.discover": "ОТКРОЙТЕ БЕЗГРАНИЧНУЮ МОЩЬ",

  "showcase.part1.name": "Углеродно-матричные роторы",
  "showcase.part1.headline": "Термическое мастерство при каждой остановке.",
  "showcase.part1.desc":
    "Наши карбон-керамические матричные роторы обеспечивают непревзойденный отвод тепла и полное отсутствие потери эффективности тормозов даже в экстремальных трековых условиях.",
  "showcase.part1.bgText": "МОЩЬ",
  "showcase.part1.s1.l": "Материал",
  "showcase.part1.s1.v": "Углерод-кремний",
  "showcase.part1.s2.l": "Темп. лимит",
  "showcase.part1.s2.v": "1200°C",
  "showcase.part1.s3.l": "Сниж. веса",
  "showcase.part1.s3.v": "45%",

  "showcase.part2.name": "Кованые диски Aero-S",
  "showcase.part2.headline": "Легкость. Прочность. Скорость.",
  "showcase.part2.desc":
    "Прецизионно изготовленные из аэрокосмического алюминия 6061-T6, диски серии Aero-S значительно снижают неподрессоренную массу для превосходной управляемости.",
  "showcase.part2.bgText": "ЛЕГКОСТЬ",
  "showcase.part2.s1.l": "Процесс",
  "showcase.part2.s1.v": "Ковка 8000T",
  "showcase.part2.s2.l": "Нагрузка",
  "showcase.part2.s2.v": "950 кг",
  "showcase.part2.s3.l": "Вес диска",
  "showcase.part2.s3.v": "8.2 кг",

  "showcase.part3.name": "Адаптивные койловеры Nitro",
  "showcase.part3.headline": "Совершенная точность.",
  "showcase.part3.desc":
    "Сверхбыстрые азотонаполненные амортизаторы с 32-ступенчатой регулировкой обеспечивают идеальный баланс между жесткостью на треке и комфортом на дороге.",
  "showcase.part3.bgText": "ГЛАДКОСТЬ",
  "showcase.part3.s1.l": "Регулировка",
  "showcase.part3.s1.v": "32 клика",
  "showcase.part3.s2.l": "Тип газа",
  "showcase.part3.s2.v": "Азот N2",
  "showcase.part3.s3.l": "Ход",
  "showcase.part3.s3.v": "110 мм",

  "showcase.part4.name": "Матричные ЛАЗЕРНЫЕ фары",
  "showcase.part4.headline": "Освещая путь вперед.",
  "showcase.part4.desc":
    "Лазерная проекционная система высокого разрешения с технологией адаптивного луча, обеспечивающая кристально чистую видимость на расстоянии до 600 м.",
  "showcase.part4.bgText": "СВЕТ",
  "showcase.part4.s1.l": "Дальность",
  "showcase.part4.s1.v": "600м",
  "showcase.part4.s2.l": "Техно",
  "showcase.part4.s2.v": "Laser Matrix",
  "showcase.part4.s3.l": "Эффективность",
  "showcase.part4.s3.v": "A+++",

  "showcase.part5.name": "Аэро-кит из кованого карбона",
  "showcase.part5.headline": "Аэродинамика в новом прочтении.",
  "showcase.part5.desc":
    "Ультралегкие компоненты из кованого углеродного волокна, разработанные для максимальной прижимной силы и агрессивной эстетики.",
  "showcase.part5.bgText": "АЭРО",
  "showcase.part5.s1.l": "Материал",
  "showcase.part5.s1.v": "Кованый карбон",
  "showcase.part5.s2.l": "Прижим. сила",
  "showcase.part5.s2.v": "+120кг",
  "showcase.part5.s3.l": "Снижение веса",
  "showcase.part5.s3.v": "-15кг",

  // Footer Payment Methods
  "footer.payment.title": "Безопасные Платежи",
  "footer.payment.subtitle":
    "Мы принимаем безопасные платежи через PayPal, основные кредитные и дебетовые карты, а также банковский перевод.",
  "footer.payment.bank": "Банковский Перевод",

  // Common UI Text
  "common.learnMore": "Узнать Больше",
  "common.exploreMore": "Изучить премиум детали",

  // What We Do Section
  "whatWeDo.badge": "Наши Услуги",
  "whatWeDo.title": "Что Мы",
  "whatWeDo.titleHighlight": "Делаем",
  "whatWeDo.subtitle":
    "Мы предоставляем премиальные автомобильные решения с точной инженерией и непревзойденным качеством.",
  "whatWeDo.feature1.title": "Поставка Премиальных Деталей",
  "whatWeDo.feature1.desc":
    "Высокопроизводительные компоненты от лучших мировых производителей.",
  "whatWeDo.feature2.title": "Гарантия Качества",
  "whatWeDo.feature2.desc":
    "Каждая деталь тщательно тестируется для соответствия и превышения стандартов OEM.",
  "whatWeDo.feature3.title": "Экспертная Установка",
  "whatWeDo.feature3.desc":
    "Профессиональные услуги по установке через нашу глобальную сеть партнеров.",
  "whatWeDo.feature4.title": "Мировая Доставка",
  "whatWeDo.feature4.desc":
    "Быстрая и надежная доставка клиентам по всему миру.",

  // Premium Parts Categories
  "categories.badge": "Покупка по Категориям",
  "categories.title": "Выберите Премиальные Детали Для",
  "categories.titleHighlight": "Вашего Авто",
  "categories.subtitle":
    "Изучите нашу подборку высокопроизводительных автомобильных компонентов.",
  "categories.viewAll": "Посмотреть Все Категории",

  // Our Gallery
  "gallery.badge": "Наши Работы",
  "gallery.title": "Наша",
  "gallery.titleHighlight": "Галерея",
  "gallery.subtitle": "Изучите наше портфолио премиальных сборок и установок.",
  "gallery.img1.alt": "Установка премиальных карбон-керамических тормозов",
  "gallery.img2.alt": "Установка индивидуального обвеса",
  "gallery.img3.alt": "Высокопроизводительная выхлопная система",
  "gallery.img4.alt": "Роскошная модернизация интерьера",
  "gallery.img5.alt": "Установка кованых дисков",
  "gallery.img6.alt": "Компоненты из углеродного волокна",
  "gallery.img7.alt": "Полная трансформация автомобиля",
  "gallery.img8.alt": "Профессиональная детализация",

  // How We Work
  "howWeWork.badge": "Наш Процесс",
  "howWeWork.title": "Как Мы",
  "howWeWork.titleHighlight": "Работаем",
  "howWeWork.subtitle": "Простой и прозрачный процесс от выбора до установки.",
  "howWeWork.step1.title": "Просмотр и Выбор",
  "howWeWork.step1.desc":
    "Изучите наш обширный каталог и найдите идеальные детали для вашего автомобиля.",
  "howWeWork.step2.title": "Оформление Заказа",
  "howWeWork.step2.desc":
    "Безопасная оплата с несколькими вариантами оплаты и мгновенным подтверждением.",
  "howWeWork.step3.title": "Быстрая Доставка",
  "howWeWork.step3.desc":
    "Ваши детали тщательно упаковываются и отправляются прямо к вам.",
  "howWeWork.step4.title": "Установка и Наслаждение",
  "howWeWork.step4.desc":
    "Профессиональная установка или самостоятельно - мы поддерживаем вас на каждом этапе.",
  "howWeWork.cta.text": "Готовы улучшить свой автомобиль?",
  "howWeWork.cta.button": "Начать Покупки",

  // Reviews
  "reviews.badge": "Отзывы",
  "reviews.title": "Что Говорят Наши",
  "reviews.titleHighlight": "Клиенты",
  "reviews.subtitle":
    "Реальные отзывы от водителей, которые доверяют нам свои автомобили.",
  "reviews.review1.name": "Маркус Родригес",
  "reviews.review1.car": "Porsche 911 GT3 RS",
  "reviews.review1.feedback":
    "Карбон-керамические роторы полностью изменили мои тормозные характеристики. Невероятная тормозная мощность без потери эффективности на треке. Качество OwnSilent не имеет себе равных.",
  "reviews.review1.location": "Майами, США",
  "reviews.review2.name": "Софи Лоран",
  "reviews.review2.car": "Ferrari 488 Pista",
  "reviews.review2.feedback":
    "Исключительный сервис от начала до конца. Команда помогла мне выбрать идеальную выхлопную систему, а установка была безупречной. Моя Ferrari звучит и работает лучше, чем когда-либо.",
  "reviews.review2.location": "Париж, Франция",
  "reviews.review3.name": "Кендзи Танака",
  "reviews.review3.car": "Lamborghini Huracán",
  "reviews.review3.feedback":
    "Премиальные детали с исключительной поддержкой клиентов. Установка обвеса была идеальной, а доставка в Японию была быстрее, чем ожидалось. Настоятельно рекомендую!",
  "reviews.review3.location": "Токио, Япония",
  "reviews.review4.name": "Александр Мюллер",
  "reviews.review4.car": "Audi RS6 Avant",
  "reviews.review4.feedback":
    "Профессиональная экспертиза и искренняя страсть к автомобильному совершенству. Обновление подвески полностью изменило управляемость моей RS6. Стоит каждого цента.",
  "reviews.review4.location": "Мюнхен, Германия",
};

// ==========================================
// 10. JAPANESE
// ==========================================
const jaTranslations = {
  "nav.shop": "ショップ",
  "nav.about": "私たちについて",
  "nav.blogs": "ブログ",
  "nav.news": "ニュース",
  "nav.contact": "お問い合わせ",
  "nav.home": "ホーム",
  "nav.cart": "カート",
  "nav.account": "アカウント",
  "nav.rotors": "カーボンセラミックローター",
  "auth.login": "ログイン",
  "auth.signup": "登録",
  "auth.logout": "ログアウト",
  "common.currency": "通貨",
  "common.language": "言語",
  "common.viewMore": "もっと見る",
  "hero.welcome": "ようこそ",
  "hero.desc":
    "香港を拠点とする高級自動車チューニングおよびグローバル貿易会社で、高性能コンポーネントとオーダーメイドの車両ソリューションに関する専門知識で知られています。",
  "hero.s1.t": "カーボンセラミックブレーキシステム",
  "hero.s1.d": "最大の制動力と比類のない熱安定性のために設計されています。",
  "hero.s2.t": "カーボンファイバーコンポーネント",
  "hero.s2.d": "完全なボディキット、空力パーツ、豪華な内装コンポーネント。",
  "hero.s3.t": "完全な車両改造",
  "hero.s3.d": "高級車向けのオーダーメイドのデザインと装備ソリューション。",
  "hero.box.t": "グローバルな専門知識と精密製造",
  "hero.box.d":
    "当社はOEMの精密基準に従って製品を設計、開発、製造し、出荷前に品質と安全性をテストしています。",
  "hero.list1": "社内3D設計と開発",
  "hero.list2": "グローバルな設置パートナーネットワーク",
  "hero.list3": "世界中の海上および航空貨物",
  "hero.footer":
    "革新、職人技、パフォーマンスに駆り立てられ、私たちは高級車チューニングの未来を形作ります。",
  "feat.choose.t": "なぜ",
  "feat.choose.h": "私たちを選ぶ？",
  "feat.choose.d":
    "私たちは常に最高のサービスと最高品質の製品を提供することをお約束します。",
  "feat.work.t": "なぜ",
  "feat.work.h": "私たちと働く？",
  "feat.work.d":
    "自動車革新の最前線にいるダイナミックなチームに参加し、やりがいのあるキャリアを築きましょう。",
  "feat.contact": "私たちのチームに連絡する",
  "feat.c.shipping.t": "迅速で信頼性の高い配送",
  "feat.c.shipping.d": "ご注文は迅速にお手元に発送されます。",
  "feat.c.coverage.t": "全国対応",
  "feat.c.coverage.d": "インドの隅々までお届けします。",
  "feat.c.quality.t": "信頼できる品質",
  "feat.c.quality.d":
    "私たちの最優先事項は、プレミアム品質を提供することです。",
  "feat.c.support.t": "専門家による専任サポート",
  "feat.c.support.d": "私たちのチームが午前9時から午後5時までお手伝いします。",
  "feat.w.innovate.t": "革新的な環境",
  "feat.w.innovate.d": "最先端の技術と最先端の自動車製造プロセスで作業します。",
  "feat.w.global.t": "グローバルな露出",
  "feat.w.global.d":
    "世界中のパートナーと協力して出荷する会社の一員になりましょう。",
  "feat.w.growth.t": "専門的な成長",
  "feat.w.growth.d":
    "自動車業界でのトレーニング、スキル開発、キャリアアップの機会。",
  "feat.w.roles.t": "多様な役割",
  "feat.w.roles.d":
    "エンジニアリングや研究開発から販売、マーケティング、ロジスティクスまで。",
  "feat.w.impact.t": "インパクトのある仕事",
  "feat.w.impact.d":
    "高級車、SUV、スーパーカー向けのプレミアムソリューションの作成に貢献します。",
  "about.title": "あなたの旅を",
  "about.titleHighlight": "前へ",
  "about.intro":
    "OwnSilentでは、自動車部品を販売するだけでなく、信頼と品質に基づいた関係を築きます。",
  "about.mission":
    "私たちの使命はシンプルです。愛好家に最高品質の部品と専門家のアドバイスを提供することです。",
  "about.f.quality.title": "品質",
  "about.f.quality.desc":
    "優れた品質と耐久性のために厳密にテストされています。",
  "about.f.shipping.title": "配送",
  "about.f.shipping.desc": "部品は迅速かつ安全に到着します。",
  "about.f.support.title": "サポート",
  "about.f.support.desc": "知識豊富なチームがいつでもお手伝いします。",
  "blog.title": "最新の",
  "blog.highlight": "ブログ",
  "blog.subtitle":
    "自動車業界のトレンドとテクノロジーの最新情報を入手してください。",
  "blog.viewAll": "すべてのブログを見る",
  "cat.explore": "コレクションを探索",
  "cat.featured": "注目のカテゴリー",
  "cat.subtitle":
    "あなたの車の各パーツに合わせた厳選されたコレクションをご覧ください。",
  "cat.noContent": "このカテゴリーには注目のコンテンツはありません。",
  // ===================================
  "ccr.page.title": "カーボンセラミックローター",
  "ccr.find.title": "完璧なカーボンセラミックローターを見つけよう",
  "ccr.find.sub":
    "あなたの車を選択して、最高のパフォーマンスを発揮するように設計されたプレミアムローターを見つけてください。",
  "ccr.noProducts.title": "該当する製品がありません",
  "ccr.noProducts.sub":
    "選択した製品は見つかりませんでした。別のフィルターをお試しください。",
  "ccr.hero.sub": "究極のブレーキ技術",
  "ccr.hero.title": "カーボンセラミックローター",
  "ccr.hero.desc":
    "モータースポーツのブレーキ技術の頂点、ストリート向けに設計。",
  "ccr.feature1": "軽量構造",
  "ccr.feature2": "優れた放熱性",
  "ccr.feature3": "長寿命",
  "ccr.faq.title": "あなたの質問に答えます",
  "ccr.faq1.q":
    "カーボンセラミックローターが標準の鉄製ローターより優れている点は何ですか？",
  "ccr.faq1.a":
    "カーボンセラミックローターは最大60%軽量で、優れた耐熱性を提供します。",
  "ccr.faq2.q":
    "OWNSILENTのカーボンセラミックキットは日常の運転に適していますか？",
  "ccr.faq2.a":
    "はい。当社のキットはストリートでの使用に完全に最適化されており、静かな操作を提供します。",
  "ccr.faq3.q":
    "カーボンセラミックブレーキには特別なメンテナンスが必要ですか？",
  "ccr.faq3.a":
    "メンテナンスは最小限です。ブレーキダストがほとんど発生せず、長持ちします。",
  // JAPANESE (ja) - For About Us Page
  // ===================================
  "aboutPage.meta": "OwnSilentについて",
  "aboutPage.title": "自動車性能の未来を駆動する",
  "aboutPage.subtitle":
    "2015年以来、私たちは高性能自動車部品とオーダーメイドの車両カスタマイズにおける品質と信頼のグローバルベンチマークです。",
  "aboutPage.exploreBtn": "製品を探す",
  "aboutPage.story.meta": "私たちの物語",
  "aboutPage.story.title": "情熱に駆られ、信頼の上に築かれる",
  "aboutPage.story.p1":
    "OwnSilentは、すべての愛好家や日常のドライバーにとって、完璧なコンポーネントを見つけることをシンプルで透明性のある、満足のいく体験にしたいという単純な情熱から生まれました。",
  "aboutPage.story.p2":
    "私たちからのご購入は単なる取引ではありません。完全な自信と世界クラスの品質であなたの車を維持し、アップグレードするための一歩です。",
  "aboutPage.principles.meta": "私たちの原則",
  "aboutPage.principles.title": "お客様へのコミットメント",
  "aboutPage.principles.sub":
    "私たちは、私たちが行うすべての決定と、グローバルコミュニティとのすべての対話を導くコアバリューの基盤の上に構築されています。",
  "aboutPage.value1.t": "妥協のない品質",
  "aboutPage.value1.d":
    "私たちは最高の部品をお届けすることに専念しており、すべてのコンポーネントが当社の厳格な卓越性の基準を満たしていることを保証します。",
  "aboutPage.value2.t": "専門知識と情熱",
  "aboutPage.value2.d":
    "私たちのチームは、あなたの旅を自信とスキルで導く準備ができている自動車愛好家と専門家で構成されています。",
  "aboutPage.value3.t": "信頼と透明性",
  "aboutPage.value3.d":
    "顧客満足は私たちの優先事項です。私たちは誠実に行動し、私たちがサービスを提供するすべてのドライバーと永続的な関係を築きます。",
  "aboutPage.careers.meta": "採用情報",
  "aboutPage.careers.title":
    "自動車イノベーションのグローバルリーダーに参加する",
  "aboutPage.careers.sub":
    "私たちは常に、世界クラスの自動車ソリューションを提供するという私たちの使命に参加する才能のある個人を探しています。",
  "aboutPage.careers.why.t": "なぜ私たちと働くのか？",
  "aboutPage.careers.why.l1":
    "最先端の技術と最先端の自動車プロセスで作業します。",
  "aboutPage.careers.why.l2":
    "世界中のパートナーやクライアントと協力する会社の一員になりましょう。",
  "aboutPage.careers.why.l3":
    "トレーニング、スキル開発、キャリアアップの機会にアクセスします。",
  "aboutPage.careers.why.l4":
    "高級車、SUV、スーパーカー向けのプレミアムソリューションの作成に貢献します。",
  "aboutPage.careers.open.t": "専門知識の公開分野",
  "aboutPage.careers.open.sub":
    "私たちは複数の事業分野での応募を歓迎します。スキルと情熱をお持ちの方は、ぜひご連絡ください。",
  "aboutPage.careers.cat1": "エンジニアリングと製造",
  "aboutPage.careers.cat2": "研究開発",
  "aboutPage.careers.cat3": "販売とディーラー関係",
  "aboutPage.careers.cat4": "マーケティングとコミュニケーション",
  "aboutPage.careers.cat5": "運営とロジスティクス",
  "aboutPage.careers.cat6": "顧客および技術サポート",

  "home.banner.title": "最高のパフォーマンスを体験",
  "home.banner.desc":
    "当社のワールドクラスのカーボンコンポーネントと精密エンジニアリングであなたの車をアップグレードしましょう。",
  "home.banner.btn": "コレクションを見る",
  //mews page
  "newsPage.loading": "記事を読み込んでいます...",
  "newsPage.title": "ニュースと洞察",
  "newsPage.subtitle": "自動車部品とパフォーマンスに関する最新情報源。",
  "newsPage.filter.title": "記事を絞り込む",
  "newsPage.filter.reset": "すべてのフィルターをリセット",
  "newsPage.readMore": "続きを読む",
  "newsPage.noArticles.title": "記事が見つかりません",
  // JAPANESE (ja) - For Contact Us Page
  // ===================================
  "contact.hero.meta": "24時間年中無休のサポート",
  "contact.hero.title": "お問い合わせ",
  "contact.hero.sub":
    "特定の部品が必要ですか、それともご注文について質問がありますか？私たちがサポートします。",
  "contact.info.title": "連絡先情報",
  "contact.info.email.title": "メールでお問い合わせ",
  "contact.info.email.sub": "一般的なお問い合わせと販売について",
  "contact.info.phone.title": "お電話でのお問い合わせ",
  "contact.info.phone.sub": "月〜金 午前9時〜午後6時",
  "contact.info.addr.title": "ご来店",
  "contact.help.title": "お急ぎですか？",
  "contact.help.sub": "よくある質問で迅速な回答をご確認ください。",
  "contact.help.btn": "ヘルプセンターへ",
  "contact.tab.request": "部品のリクエスト",
  "contact.tab.support": "ヘルプとサポート",
  "contact.form.s1.title": "あなたの連絡先詳細",
  "contact.form.s2.request.title": "部品と配送の詳細",
  "contact.form.s2.support.title": "どのようにお手伝いできますか？",
  "contact.form.fullName": "氏名",
  "contact.form.email": "メールアドレス",
  "contact.form.phone": "電話番号",
  "contact.form.partName": "部品名/説明",
  "contact.form.brand": "車種",
  "contact.form.model": "モデル",
  "contact.form.year": "年式",
  "contact.form.address": "配送先住所",
  "contact.form.street": "住所",
  "contact.form.city": "市",
  "contact.form.state": "州",
  "contact.form.zip": "郵便番号",
  "contact.form.subject": "件名",
  "contact.form.message": "追加メッセージ",
  "contact.form.submitBtn": "リクエストを送信",
  "contact.form.submitting": "送信中...",
  "contact.form.success.title": "ありがとうございます！",
  "contact.form.success.sub":
    "メッセージを受け取りました。私たちのチームが確認し、まもなくご連絡いたします。",
  "contact.form.success.btn": "買い物を続ける",
  // JAPANESE (ja) - For Shop Page
  // ===================================
  "shop.loading": "製品を読み込んでいます...",
  "shop.title": "すべての部品を見る",
  "shop.subtitle": "世界中のトップメーカーから調達したプレミアム自動車部品。",
  "shop.search.placeholder": "製品名、SKU、または部品番号で検索...",
  "shop.filter.title": "フィルター",
  "shop.filter.reset": "リセット",
  "shop.filter.resetAll": "すべてリセット",
  "shop.filter.showResults": "結果を表示",
  "shop.filter.categories": "カテゴリー",
  "shop.filter.brands": "ブランド",
  "shop.filter.models": "モデル",
  "shop.filter.searchPlaceholder": "{title}を検索...",
  "shop.filter.noCategories": "一致するカテゴリーはありません。",
  "shop.filter.noBrands": "一致するブランドはありません。",
  "shop.filter.noModels": "このブランドのモデルは見つかりませんでした。",
  "shop.results.showing": "表示中",
  "shop.results.of": "件中",
  "shop.results.results": "件",
  "shop.sort.latest": "新着順に並べ替え",
  "shop.noProducts.title": "製品が見つかりません",
  "shop.noProducts.sub":
    "フィルターに一致する製品が見つかりませんでした。検索を調整してみてください。",
  "shop.noProducts.clearBtn": "フィルターをクリア",
  "shop.cart.addSuccess": "カートに追加しました！",
  "shop.cart.addError": "カートに追加できませんでした。",
  "shop.cart.loginError": "カートに商品を追加するにはログインしてください。",
  // JAPANESE (ja) - For Footer Disclaimer
  // ===================================
  "footer.disclaimer.p1":
    "このウェブサイトに表示されているすべてのブランド名、ロゴ、および商標は参照用です。Own Silent International Limitedは、いかなる自動車メーカーとも提携、承認、または認可されていません。すべての製品名、番号、および画像は、識別および互換性の目的でのみ使用されます。",
  "footer.disclaimer.p2":
    "当社は、アフターマーケット、純正、およびカスタムの自動車部品を世界中で製造および取引しています。お客様は、すべての製品の法的遵守、安全な設置、および適切な使用を保証する責任があります。Own Silent International Limitedは、当社製品の使用に起因する損害、車両の改造、または保証への影響について責任を負いません。",
  "footer.disclaimer.p3":
    "このウェブサイトの使用および製品の購入は、当社の完全な免責事項への同意を構成します。完全な法的条件については、当社の",
  "footer.disclaimer.link": "完全な免責事項ページ",
  "footer.copyright.short":
    "すべてのブランド、ロゴ、商標は参照用です。当社はいかなるメーカーとも提携または承認されていません。製品はアフターマーケット品、純正品、またはカスタム品です。自己責任で使用してください。詳細については、{link}をご覧ください。",
  "footer.copyright.link": "完全な免責事項",

  // Showcase
  "showcase.series": "ハイパフォーマンスシリーズ",
  "showcase.stats": "エンジニアリング統計",
  "showcase.status": "ショーケース",
  "showcase.paused": "一時停止",
  "showcase.auto": "オート",
  "showcase.osPerformance": "OS パフォーマンス",
  "showcase.est": "EST. 1998",
  "showcase.aerospace": "航空宇宙グレード",
  "showcase.discover": "無限のパワーを解き放つ",

  "showcase.part1.name": "カーボンマトリックスローター",
  "showcase.part1.headline": "すべての停止に熱制御の極意を。",
  "showcase.part1.desc":
    "当社のカーボンセラミックマトリックスローターは、極限のトラック条件下でも、比類のない放熱性とブレーキフェードゼロを実現します。",
  "showcase.part1.bgText": "POWER",
  "showcase.part1.s1.l": "素材",
  "showcase.part1.s1.v": "カーボンシリコン",
  "showcase.part1.s2.l": "耐熱限界",
  "showcase.part1.s2.v": "1200°C",
  "showcase.part1.s3.l": "軽量化",
  "showcase.part1.s3.v": "45%",

  "showcase.part2.name": "Aero-S 鍛造ホイール",
  "showcase.part2.headline": "軽量。鍛造。無双。",
  "showcase.part2.desc":
    "航空宇宙グレードの6061-T6アルミニウムから精密に設計されたAero-Sシリーズは、バネ下重量を大幅に削減し、優れたハンドリングを実現します。",
  "showcase.part2.bgText": "LIGHT",
  "showcase.part2.s1.l": "製法",
  "showcase.part2.s1.v": "8000T鍛造",
  "showcase.part2.s2.l": "耐荷重",
  "showcase.part2.s2.v": "950kg",
  "showcase.part2.s3.l": "ホイール重量",
  "showcase.part2.s3.v": "8.2kg",

  "showcase.part3.name": "アダプティブ Nitro 車高調",
  "showcase.part3.headline": "究極の精度。",
  "showcase.part3.desc":
    "32段階調整が可能な超高速レスポンス窒素充填ダンパー。サーキットでの剛性と公道での快適性を完璧なバランスで両立します。",
  "showcase.part3.bgText": "GLIDE",
  "showcase.part3.s1.l": "調整",
  "showcase.part3.s1.v": "32段階",
  "showcase.part3.s2.l": "ガスタイプ",
  "showcase.part3.s2.v": "高純度窒素",
  "showcase.part3.s3.l": "ストローク",
  "showcase.part3.s3.v": "110mm",

  "showcase.part4.name": "マトリックス LASER ヘッドライト",
  "showcase.part4.headline": "進むべき道を照らす。",
  "showcase.part4.desc":
    "アダプティブビームテクノロジーを搭載した高精細レーザープロジェクションシステム。最大600m先までクリアな視界を提供します。",
  "showcase.part4.bgText": "LIGHT",
  "showcase.part4.s1.l": "照射範囲",
  "showcase.part4.s1.v": "600m",
  "showcase.part4.s2.l": "テクノロジー",
  "showcase.part4.s2.v": "レーザーマトリックス",
  "showcase.part4.s3.l": "効率",
  "showcase.part4.s3.v": "A+++",

  "showcase.part5.name": "フォージドカーボン エアロキット",
  "showcase.part5.headline": "空力特性の再定義。",
  "showcase.part5.desc":
    "最大ダウンフォースとアグレッシブな美学を追求して設計された、超軽量なフォージドカーボンファイバー製コンポーネント。",
  "showcase.part5.bgText": "AERO",
  "showcase.part5.s1.l": "素材",
  "showcase.part5.s1.v": "フォージドカーボン",
  "showcase.part5.s2.l": "ダウンフォース",
  "showcase.part5.s2.v": "+120kg",
  "showcase.part5.s3.l": "重量削減",
  "showcase.part5.s3.v": "-15kg",

  // Footer Payment Methods
  "footer.payment.title": "安全な支払い",
  "footer.payment.subtitle":
    "PayPal、主要なクレジットカードとデビットカード、銀行振込による安全な支払いを受け付けています。",
  "footer.payment.bank": "銀行振込",

  // Common UI Text
  "common.learnMore": "もっと詳しく",
  "common.exploreMore": "プレミアムパーツを探す",

  // What We Do Section
  "whatWeDo.badge": "私たちのサービス",
  "whatWeDo.title": "私たちが",
  "whatWeDo.titleHighlight": "すること",
  "whatWeDo.subtitle":
    "精密なエンジニアリングと比類のない品質で、プレミアムな自動車ソリューションを提供します。",
  "whatWeDo.feature1.title": "プレミアムパーツの供給",
  "whatWeDo.feature1.desc": "世界トップメーカーからの高性能コンポーネント。",
  "whatWeDo.feature2.title": "品質保証",
  "whatWeDo.feature2.desc":
    "すべてのパーツは、OEM基準を満たし、それを超えるように厳格にテストされています。",
  "whatWeDo.feature3.title": "エキスパート設置",
  "whatWeDo.feature3.desc":
    "グローバルパートナーネットワークを通じたプロフェッショナルな設置サービス。",
  "whatWeDo.feature4.title": "世界配送",
  "whatWeDo.feature4.desc": "世界中のお客様への迅速で信頼性の高い配送。",

  // Premium Parts Categories
  "categories.badge": "カテゴリー別に購入",
  "categories.title": "あなたの",
  "categories.titleHighlight": "車のためのプレミアムパーツを選ぶ",
  "categories.subtitle":
    "厳選された高性能自動車コンポーネントのコレクションをご覧ください。",
  "categories.viewAll": "すべてのカテゴリーを見る",

  // Our Gallery
  "gallery.badge": "私たちの仕事",
  "gallery.title": "私たちの",
  "gallery.titleHighlight": "ギャラリー",
  "gallery.subtitle":
    "プレミアムビルドとインストールのポートフォリオをご覧ください。",
  "gallery.img1.alt": "プレミアムカーボンセラミックブレーキの設置",
  "gallery.img2.alt": "カスタムボディキットの取り付け",
  "gallery.img3.alt": "高性能エキゾーストシステム",
  "gallery.img4.alt": "高級インテリアアップグレード",
  "gallery.img5.alt": "鍛造ホイールの設置",
  "gallery.img6.alt": "カーボンファイバーコンポーネント",
  "gallery.img7.alt": "完全な車両変換",
  "gallery.img8.alt": "プロフェッショナルディテーリング作業",

  // How We Work
  "howWeWork.badge": "私たちのプロセス",
  "howWeWork.title": "私たちの",
  "howWeWork.titleHighlight": "働き方",
  "howWeWork.subtitle": "選択から設置までのシンプルで透明なプロセス。",
  "howWeWork.step1.title": "閲覧と選択",
  "howWeWork.step1.desc":
    "広範なカタログを閲覧し、あなたの車に最適なパーツを見つけてください。",
  "howWeWork.step2.title": "注文する",
  "howWeWork.step2.desc":
    "複数の支払いオプションと即時確認による安全な支払い。",
  "howWeWork.step3.title": "迅速な配送",
  "howWeWork.step3.desc":
    "パーツは丁寧に梱包され、あなたの場所に直接発送されます。",
  "howWeWork.step4.title": "設置して楽しむ",
  "howWeWork.step4.desc":
    "プロフェッショナルな設置またはDIY - すべてのステップでサポートします。",
  "howWeWork.cta.text": "車をアップグレードする準備はできましたか？",
  "howWeWork.cta.button": "ショッピングを始める",

  // Reviews
  "reviews.badge": "お客様の声",
  "reviews.title": "お客様が",
  "reviews.titleHighlight": "語ること",
  "reviews.subtitle":
    "私たちを信頼してくれるドライバーからの本物のフィードバック。",
  "reviews.review1.name": "マーカス・ロドリゲス",
  "reviews.review1.car": "ポルシェ 911 GT3 RS",
  "reviews.review1.feedback":
    "カーボンセラミックローターは私のブレーキ性能を完全に変えました。トラックでのフェードゼロで信じられないほどの制動力。OwnSilentの品質は比類がありません。",
  "reviews.review1.location": "マイアミ、アメリカ",
  "reviews.review2.name": "ソフィー・ローラン",
  "reviews.review2.car": "フェラーリ 488 ピスタ",
  "reviews.review2.feedback":
    "最初から最後まで素晴らしいサービス。チームは完璧なエキゾーストシステムを選ぶのを手伝ってくれ、設置は完璧でした。私のフェラーリはこれまで以上に良い音と性能を発揮しています。",
  "reviews.review2.location": "パリ、フランス",
  "reviews.review3.name": "田中健二",
  "reviews.review3.car": "ランボルギーニ ウラカン",
  "reviews.review3.feedback":
    "優れた顧客サポートを備えたプレミアム品質のパーツ。ボディキットの取り付けは完璧で、日本への配送は予想よりも速かったです。強くお勧めします！",
  "reviews.review3.location": "東京、日本",
  "reviews.review4.name": "アレクサンダー・ミュラー",
  "reviews.review4.car": "アウディ RS6 アバント",
  "reviews.review4.feedback":
    "プロフェッショナルな専門知識と自動車の卓越性への真の情熱。サスペンションのアップグレードは、私のRS6のハンドリングを完全に変えました。すべてのペニーの価値があります。",
  "reviews.review4.location": "ミュンヘン、ドイツ",
};

// ==========================================
// FINAL MAP OF ALL LANGUAGES
// ==========================================
const translations: Record<LanguageCode, Record<string, string>> = {
  en: enTranslations,
  es: esTranslations,
  de: deTranslations,
  fr: frTranslations,
  it: itTranslations,
  ar: arTranslations,
  zh: zhTranslations,
  pt: ptTranslations,
  ru: ruTranslations,
  ja: jaTranslations,
};

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string, replacements?: { [key: string]: string | number }) => string;
  dir: "ltr" | "rtl";
  availableLanguages: typeof availableLanguages;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<LanguageCode>("en");

  useEffect(() => {
    const saved = localStorage.getItem("language") as LanguageCode;
    if (availableLanguages.some((l) => l.code === saved)) {
      setLanguageState(saved);
      document.documentElement.dir = saved === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = saved;
    }
  }, []);

  const setLanguage = (code: LanguageCode) => {
    setLanguageState(code);
    localStorage.setItem("language", code);
    document.documentElement.lang = code;
    document.documentElement.dir = code === "ar" ? "rtl" : "ltr";
  };

  // UPDATED 't' FUNCTION
  const t = (
    key: string,
    replacements?: { [key: string]: string | number },
  ): string => {
    let translation =
      translations[language]?.[key] || translations["en"]?.[key] || key;

    if (replacements) {
      Object.keys(replacements).forEach((placeholder) => {
        const value = replacements[placeholder];
        translation = translation.replace(`{${placeholder}}`, String(value));
      });
    }

    return translation;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        dir: language === "ar" ? "rtl" : "ltr",
        availableLanguages,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
