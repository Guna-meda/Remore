import React from 'react';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Plan {
  name: string;
  price: string;
  period: string;
  features: string[];
  recommended?: boolean;
  cta: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
}

export interface Testimonial {
  name: string;
  location: string;
  avatarUrl: string;
  quote: string;
}