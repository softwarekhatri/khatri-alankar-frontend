import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Message sent!",
      description: "Thank you for your message! We will get back to you soon.",
    });

    setFormData({ name: '', email: '', phone: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-soft-gray">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-elegant-black mb-4">Get In Touch</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">Visit our showroom or contact us for personalized jewelry consultation</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* WhatsApp CTA */}
          <div className="relative overflow-hidden rounded-lg p-0 sm:p-0 min-h-[200px] flex flex-col items-center justify-center text-center custom-contact-bg">
            {/* Abstract gradient and floating shapes background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <svg width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="none" className="w-full h-full">
                <defs>
                  <radialGradient id="grad1" cx="70%" cy="30%" r="80%" fx="70%" fy="30%">
                    <stop offset="0%" stopColor="#e0ffe6" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#f7f7f7" stopOpacity="0.9" />
                  </radialGradient>
                  <radialGradient id="grad2" cx="20%" cy="80%" r="60%" fx="20%" fy="80%">
                    <stop offset="0%" stopColor="#d1f7ff" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#f7f7f7" stopOpacity="0.8" />
                  </radialGradient>
                  <radialGradient id="goldGrad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop offset="0%" stopColor="#FFD700" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#fffbe6" stopOpacity="0.2" />
                  </radialGradient>
                </defs>
                <rect x="0" y="0" width="400" height="200" fill="url(#grad1)" />
                <ellipse className="animate-float1" cx="320" cy="60" rx="60" ry="30" fill="#25D366" fillOpacity="0.10" />
                <ellipse className="animate-float2" cx="80" cy="170" rx="50" ry="18" fill="#128C7E" fillOpacity="0.10" />
                <ellipse className="animate-float3" cx="200" cy="100" rx="120" ry="60" fill="url(#grad2)" />
                {/* Gold accent for Khatri Alankar brand */}
                <ellipse className="animate-gold" cx="340" cy="160" rx="22" ry="10" fill="url(#goldGrad)" />
              </svg>
            </div>
            <div className="relative z-10 w-full flex flex-col items-center justify-center py-6 sm:py-8 px-4 sm:px-8">
              {/* Custom animation styles for SVG shapes */}
              <style>{`
                .animate-float1 {
                  animation: float1 6s ease-in-out infinite;
                }
                .animate-float2 {
                  animation: float2 7s ease-in-out infinite;
                }
                .animate-float3 {
                  animation: float3 8s ease-in-out infinite;
                }
                .animate-gold {
                  animation: goldmove 10s ease-in-out infinite;
                }
                @keyframes float1 {
                  0%, 100% { transform: translateY(0px); }
                  50% { transform: translateY(-18px) scale(1.05); }
                }
                @keyframes float2 {
                  0%, 100% { transform: translateX(0px); }
                  50% { transform: translateX(20px) scale(1.08); }
                }
                @keyframes float3 {
                  0%, 100% { transform: scale(1); }
                  50% { transform: scale(1.04) translateY(10px); }
                }
                @keyframes goldmove {
                  0%, 100% { transform: translateY(0px) scale(1); }
                  30% { transform: translateY(-10px) scale(1.1); }
                  60% { transform: translateY(8px) scale(0.95); }
                }
              `}</style>
              <h3 className="text-6xl sm:text-2xl font-playfair font-bold text-elegant-black mb-1 sm:mb-2 drop-shadow">Message us on WhatsApp</h3>
              <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base font-medium drop-shadow">Quick queries? Tap below to chat instantly.</p>
              <a
                href="https://wa.me/919934799534?text=Hi%20Khatri%20Alankar%2C%20I%20have%20a%20jewelry%20inquiry."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 py-2.5 bg-[#25D366] text-white rounded-full font-semibold text-base sm:text-lg shadow hover:bg-[#128C7E] transition-all duration-200 mb-1 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
                data-testid="button-whatsapp-cta"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A12.07 12.07 0 0012 0C5.37 0 0 5.37 0 12c0 2.12.55 4.19 1.6 6.01L0 24l6.18-1.62A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52zM12 22c-1.85 0-3.67-.5-5.24-1.44l-.37-.22-3.67.96.98-3.58-.24-.37A9.94 9.94 0 012 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.6c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.35-.01-.54-.01-.19 0-.5.07-.76.34-.26.27-1 1-.97 2.43.03 1.43 1.03 2.81 1.18 3.01.15.2 2.03 3.1 4.93 4.23.69.3 1.23.48 1.65.61.69.22 1.32.19 1.81.12.55-.08 1.65-.67 1.89-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z" /></svg>
                WhatsApp Chat
              </a>
              <span className="text-xs text-gray-600 mt-1">09:00 AM - 8:00 PM (Mon-Fri, Sun)</span>
            </div>
          </div>

          {/* Contact Information & Map */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-playfair font-bold text-elegant-black mb-6">Visit Our Showroom</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-luxury-gold bg-opacity-10 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-luxury-gold" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Address</p>
                    <p className="text-gray-600">Khatri Alankar, Main Market Road,
                      <br /> Rafiganj, Aurangabad
                      <br />Bihar, 824125</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-luxury-gold bg-opacity-10 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-luxury-gold" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Phone</p>
                    <p className="text-gray-600">+91 99347 99534<br />+91 72097 03947</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-luxury-gold bg-opacity-10 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-luxury-gold" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <p className="text-gray-600">info@khatrialankar.com<br />sales@khatrialankar.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-luxury-gold bg-opacity-10 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-luxury-gold" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
                      <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Business Hours</p>
                    <p className="text-gray-600">Mon-Fri: 09:00 AM - 8:00 PM<br />
                      Sunday: 09:00 AM - 8:00 PM<br />
                      Saturday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.9945729469754!2d72.82765371544204!3d19.007312087158684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce4c53fb4671%3A0x37d88be589b70b5b!2sZaveri%20Bazaar%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1633361234567!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-80"
                title="Khatri Alankar Store Location"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
