
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

interface ContactSectionProps {
  t: any;
}

const ContactSection = ({ t }: ContactSectionProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "መልዕክት ተላከ / Message Sent",
        description: "መልዕክትዎ በተሳካ ሁኔታ ተላኪዋል። በቅርቡ እናገናኝዎታለን። / Your message has been sent successfully. We will contact you soon.",
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "ስህተት / Error",
        description: "መልዕክት መላክ አልተቻለም። እባክዎ እንደገና ይሞክሩ። / Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "ስልክ / Phone",
      value: "+251 911 123 456",
      valueEn: "+251 911 123 456"
    },
    {
      icon: Mail,
      title: "ኢሜል / Email",
      value: "info@zehulu.com",
      valueEn: "info@zehulu.com"
    },
    {
      icon: MapPin,
      title: "አድራሻ / Address",
      value: "አዲስ አበባ፣ ኢትዮጵያ",
      valueEn: "Addis Ababa, Ethiopia"
    },
    {
      icon: Clock,
      title: "የስራ ሰዓት / Working Hours",
      value: "ሰኞ - ቅዳሜ: 8:00 - 17:00",
      valueEn: "Mon - Sat: 8:00 AM - 5:00 PM"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.contactTitle}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.contactSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">
                መልዕክት ይላኩ / Send Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">
                      {t.name} *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={`${t.name} ያስገቡ / Enter ${t.name}`}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-foreground">
                      {t.phone}
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder={`${t.phone} ያስገቡ / Enter ${t.phone}`}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    {t.email} *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={`${t.email} ያስገቡ / Enter ${t.email}`}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">
                    {t.message} *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={`${t.message} ያስገቡ / Enter ${t.message}`}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
                >
                  {isSubmitting ? t.loading : t.send}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">
                  የመገኛ መረጃ / Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {info.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {t === translations?.am ? info.value : info.valueEn}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <Card className="shadow-lg">
              <CardContent className="p-0">
                <div className="h-64 bg-gradient-to-br from-muted to-muted-foreground/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">
                      የካርታ አካባቢ / Map Area
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
