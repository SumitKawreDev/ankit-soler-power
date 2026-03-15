ENTERPRISE SOLAR ENERGY WEB PLATFORM

Product Requirement Document (PRD)

ROLE & RESPONSIBILITY

You are a Senior Frontend Architect, Full-Stack Backend Engineer, and UI/UX Designer.

Build a production-ready, enterprise-grade solar energy web platform for a commercial solar infrastructure company.

This is NOT a demo website or landing page.

This platform must support:

• Commercial solar lead generation
• Residential solar inquiries
• Franchise expansion system
• Solar project portfolio showcase

The system must be scalable, secure, and production-ready.

PROJECT DETAILS

Project Name
Ankit Solar Power Platform

Industry
Solar Energy & Infrastructure

Website Type
Enterprise Solar Lead Generation & Portfolio Platform

Primary Business Focus
Commercial Solar Installation

Target Clients

• Hotels
• Factories
• Industrial plants
• Commercial buildings
• Housing societies

Secondary Services

• Residential solar installation
• Solar franchise expansion

STRICT TECHNOLOGY RULES (DO NOT CHANGE)

Frontend

Next.js
Tailwind CSS
Framer Motion (animations)
Swiper.js (carousel & sliders)

Backend

Node.js
Next.js API Routes

Database
MongoDB (Mongoose)

Image Delivery

Cloudinary CDN

Images must NOT be uploaded to the server.

Admin uploads images to Cloudinary and pastes the image URL inside the admin panel.

This ensures:

• CDN delivery
• Fast loading
• Reduced server load
• Optimized performance

DESIGN SYSTEM & BRANDING

Primary Brand Color
#023d2a

Secondary Color
#FFFFFF

Theme

Modern
Clean
Eco-energy focused
Professional corporate layout

UI Principles

• Minimal but premium
• High-quality solar visuals
• Smooth transitions
• Clear lead-generation CTAs

Animations must feel premium but lightweight.

NAVIGATION & HEADER (CRITICAL)

Main Navigation Menu

Home
Projects
Services
Franchise
About
Contact

Projects dropdown must include:

Commercial Projects
Residential Projects

A Get Quote CTA button must always remain visible in the header.

Header Behavior

• Sticky navigation
• Smooth scroll animation
• Mobile responsive menu
• Animated hamburger menu

HOME PAGE (VERY IMPORTANT)

The home page must communicate trust, credibility, and scale.

Hero Section

Solar themed background visuals

Content

Headline about solar power solutions
Short description of services

Primary CTA

Get Quote

Hero animations

• Smooth fade-in text
• Background motion effect
• Button hover animation

Company Overview Section

Brief introduction to:

• Ankit Solar Power
• Solar industry experience
• Core services

Services Section

Three main services:

Commercial Solar Installation
Residential Solar Installation
Solar Franchise Opportunities

Commercial solar must receive visual priority.

Projects Highlight Section

Showcase selected solar installations.

Each card must include:

Project name
Capacity
Location
Project photo

Hover animation required.

Statistics Section

Display company scale.

Examples

500+ Projects Installed
20 MW Installed Capacity
13+ Franchise Locations

Animated number counters.

Franchise Opportunity Section

Introduce the solar franchise model.

CTA

Apply for Franchise

Final CTA Section

Encourage visitors to submit solar inquiries.

Primary CTA

Get Solar Quote

PROJECTS MODULE (CORE BUSINESS LOGIC)

Projects page contains two categories:

Commercial Projects
Residential Projects

PROJECT LISTING SYSTEM

Projects must be loaded dynamically from backend.

Each project card must include:

Project Name
Short Description
Solar Capacity (KW / MW)
Location (State + District)
Project Image
View Details Button

PROJECT DETAIL PAGE

Each project page must include:

Project Name
Detailed description
Solar capacity
State
District
Solar images gallery
Embedded YouTube video (if available)

Map Integration

Google Maps location must be available.

CTA Button

Solar Installation Inquiry

SERVICES PAGE

Services must be displayed using card-based layout.

Service Types

Commercial Solar Installation
Residential Solar Installation
Solar Franchise Program

Commercial solar must appear as the primary service.

Cards must include:

Image
Title
Short description

Hover animation required.

FRANCHISE PAGE

The franchise page promotes solar business partnerships.

The page must display approximately 15 franchise locations.

Franchise Card Fields

Franchise Name
Location (State + District)
Photo
Google Maps Link
Contact Number

CTA

Apply For Franchise

ABOUT PAGE

Provide detailed company information.

Sections

Company Introduction
Solar expertise
Mission & Vision
Achievements
Industry experience

Optional Section

Team members

Photo
Name
Position
Short bio

CONTACT PAGE

The contact page must include category-based inquiry forms.

Inquiry Types

Commercial Solar Project
Residential Solar Project
Franchise Inquiry

CONTACT FORM FIELDS

Mandatory Fields

Name
Phone Number
Location

Optional Fields

Email
Message

ELECTRICITY BILL UPLOAD

Commercial and residential users must be able to upload electricity bills.

Purpose

Solar consumption estimation.

File requirements

Image or PDF.

Uploaded files must be stored and visible inside the admin leads dashboard.

GET QUOTE POPUP SYSTEM

A Get Quote button must appear across the website.

Clicking the button opens a popup inquiry form.

Users must select category:

Commercial
Residential
Franchise

Based on selection, the corresponding form appears.

ADMIN PANEL (PRODUCTION GRADE)

Admin access URL

/admin/login

AUTHENTICATION

JWT-based authentication.

Admin routes must be protected.

Login fields

User ID
Password

Password must be hashed.

ADMIN DASHBOARD

Dashboard must show:

Total Leads
Commercial Leads
Residential Leads
Franchise Leads
Total Projects
Total Franchise Locations

Also display

Recent Leads
Recent Projects

LEADS MANAGEMENT

Leads must be categorized.

Commercial Leads
Residential Leads
Franchise Leads

Lead Data Fields

Name
Phone Number
Email
Location
Message
Electricity Bill (if uploaded)
Date

Admin must be able to:

View leads
Delete leads

PROJECT MANAGEMENT

Admin must manage projects.

Categories

Commercial Projects
Residential Projects

Admin Features

Add project
Edit project
Delete project
View project list

Project Fields

Project Name
Description
Solar Capacity
Project Images (Cloudinary URLs)
YouTube Video URL
State
District
Google Maps URL

FRANCHISE MANAGEMENT

Admin can manage franchise partners.

Fields

Franchise Name
State
District
Google Map URL
Contact Number
Franchise Photo (Cloudinary URL)

Admin can

Add
Edit
Delete franchise entries.

ANIMATIONS & INTERACTIONS

The platform must include premium but optimized animations.

Required Animations

Scroll-based section reveals
Fade-in animations
Card hover effects
Smooth page transitions
Sticky navbar animation

Animations must remain lightweight and mobile-optimized.

RESPONSIVENESS & QUALITY

The platform must be fully responsive.

Supported Devices

Desktop
Tablet
Mobile

Requirements

Mobile-first UX
Touch-friendly buttons
Optimized layouts

Code quality must be production ready.

No console errors allowed.

FUTURE FEATURES (PHASE 2)

Possible upgrades

Solar savings calculator
Government subsidy information
Advanced analytics dashboard
SEO optimization system

19. Mobile Responsive Design

The website must be fully responsive and mobile-friendly.

It should work smoothly on all screen sizes including:

• Mobile Phones
• Tablets
• Laptops
• Desktop Screens

Responsive Requirements

The layout must automatically adjust for different devices.

Key considerations:

• Navigation should convert into a mobile hamburger menu.
• Buttons such as Get Quote, Inquiry, and Apply for Franchise must be easily clickable on mobile devices.
• Images and project cards must scale properly without breaking the layout.
• Forms should be optimized for mobile input.
• Text should remain readable on smaller screens.
• Sections should stack vertically on mobile screens.

Performance on Mobile

The website must load quickly on mobile networks by:

• Using optimized images (Cloudinary CDN)
• Minimizing heavy scripts
• Using responsive image sizes

Mobile UI Experience

Mobile users should experience:

• Smooth scrolling
• Clean layout
• Easy navigation
• Fast loading pages

The goal is to ensure the website works equally well on mobile and desktop devices.

20. SEO & Search Engine Optimization

Search Engine Optimization (SEO) is essential for improving the website’s visibility on search engines such as Google.

The platform must follow SEO best practices during development to support organic traffic and lead generation.

Technical SEO Requirements

• SEO-friendly page URLs
• Proper HTML semantic structure
• Correct heading hierarchy (H1, H2, H3)
• Meta titles and meta descriptions for each page

Each page should also support Open Graph metadata for better social media sharing.

Sitemap & Indexing

The website must generate:

• XML Sitemap
• Robots.txt

These files help search engines properly crawl and index website pages.

Structured Data

Structured data (Schema Markup) should be implemented where appropriate.

Recommended schema types include:

• Organization Schema
• Local Business Schema
• Project / Portfolio Schema

Performance Optimization

SEO performance must include fast page loading speed.

Optimization methods include:

• Image delivery through Cloudinary CDN
• Lazy loading of images and media
• Optimized JavaScript and CSS loading
• Efficient caching strategies

Local SEO

Since the company operates across multiple locations, the website should support local SEO strategies.

Project and franchise listings may include:

• State
• District
• Google Map location

This helps improve regional search visibility.

FINAL STRICT INSTRUCTIONS

Treat this project as a real enterprise solar company platform.

Do not treat it as a demo.

Follow production-grade standards.

Focus on:

Scalability
Security
Performance
Clean architecture

FINAL STATUS

This document represents the FINAL LOCKED REQUIREMENTS for the
Ankit Solar Power Enterprise Platform.