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
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-playfair font-bold text-elegant-black mb-6">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-all duration-300"
                  placeholder="Enter your full name"
                  required
                  data-testid="input-contact-name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-all duration-300"
                  placeholder="Enter your email address"
                  required
                  data-testid="input-contact-email"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-all duration-300"
                  placeholder="Enter your phone number"
                  data-testid="input-contact-phone"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition-all duration-300"
                  placeholder="Tell us about your jewelry requirements..."
                  required
                  data-testid="textarea-contact-message"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full gold-gradient text-black py-4 rounded-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none"
                data-testid="button-contact-submit"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
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
