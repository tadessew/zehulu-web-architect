import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { translations } from '@/utils/translations';

interface EstimatorSectionProps {
  t: any;
}

const EstimatorSection = ({ t }: EstimatorSectionProps) => {
  const [serviceType, setServiceType] = useState('');
  const [roomSize, setRoomSize] = useState('');
  const [finishType, setFinishType] = useState('');
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const { toast } = useToast();

  const serviceTypes = [
    { value: 'furniture', label: 'የቤት እቃዎች', labelEn: 'Furniture', basePrice: 15000 },
    { value: 'painting', label: 'ዋል ፔንቲንግ', labelEn: 'Wall Painting', basePrice: 5000 },
    { value: 'flooring', label: 'ወለል መስኪያ', labelEn: 'Flooring', basePrice: 8000 },
    { value: 'complete', label: 'ሙሉ ፊኒሺንግ', labelEn: 'Complete Finishing', basePrice: 25000 }
  ];

  const roomSizes = [
    { value: 'small', label: 'ትንሽ (10-15 ካሬ ሜትር)', labelEn: 'Small (10-15 sqm)', multiplier: 1 },
    { value: 'medium', label: 'መካከለኛ (15-25 ካሬ ሜትር)', labelEn: 'Medium (15-25 sqm)', multiplier: 1.5 },
    { value: 'large', label: 'ትልቅ (25-40 ካሬ ሜትር)', labelEn: 'Large (25-40 sqm)', multiplier: 2 },
    { value: 'extra-large', label: 'በጣም ትልቅ (40+ ካሬ ሜትር)', labelEn: 'Extra Large (40+ sqm)', multiplier: 2.5 }
  ];

  const finishTypes = [
    { value: 'basic', label: 'መሰረታዊ', labelEn: 'Basic', multiplier: 1 },
    { value: 'standard', label: 'መደበኛ', labelEn: 'Standard', multiplier: 1.3 },
    { value: 'premium', label: 'ከፍተኛ ጥራት', labelEn: 'Premium', multiplier: 1.7 },
    { value: 'luxury', label: 'የቅንጦት', labelEn: 'Luxury', multiplier: 2.2 }
  ];

  const calculateEstimate = () => {
    if (!serviceType || !roomSize || !finishType) {
      toast({
        title: "ስህተት / Error",
        description: "እባክዎ ሁሉንም መስኮች ይሙሉ / Please fill all fields",
        variant: "destructive"
      });
      return;
    }

    const service = serviceTypes.find(s => s.value === serviceType);
    const room = roomSizes.find(r => r.value === roomSize);
    const finish = finishTypes.find(f => f.value === finishType);

    if (service && room && finish) {
      const estimate = Math.round(service.basePrice * room.multiplier * finish.multiplier);
      setEstimatedPrice(estimate);
      
      toast({
        title: "ግምት ተሰልቷል / Estimate Calculated",
        description: `${estimate.toLocaleString()} ብር / ETB`,
      });
    }
  };

  return (
    <section id="estimator" className="py-20 bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-950/10 dark:to-orange-950/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.estimatorTitle}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.estimatorSubtitle}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                {t.estimatorTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Service Type */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    {t.serviceType}
                  </label>
                  <Select value={serviceType} onValueChange={setServiceType}>
                    <SelectTrigger>
                      <SelectValue placeholder={`${t.serviceType} ይምረጡ / Select ${t.serviceType}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceTypes.map((service) => (
                        <SelectItem key={service.value} value={service.value}>
                          {t === translations?.am ? service.label : service.labelEn}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Room Size */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    {t.roomSize}
                  </label>
                  <Select value={roomSize} onValueChange={setRoomSize}>
                    <SelectTrigger>
                      <SelectValue placeholder={`${t.roomSize} ይምረጡ / Select ${t.roomSize}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {roomSizes.map((room) => (
                        <SelectItem key={room.value} value={room.value}>
                          {t === translations?.am ? room.label : room.labelEn}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Finish Type */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    {t.finishType}
                  </label>
                  <Select value={finishType} onValueChange={setFinishType}>
                    <SelectTrigger>
                      <SelectValue placeholder={`${t.finishType} ይምረጡ / Select ${t.finishType}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {finishTypes.map((finish) => (
                        <SelectItem key={finish.value} value={finish.value}>
                          {t === translations?.am ? finish.label : finish.labelEn}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="text-center space-y-4">
                <Button 
                  onClick={calculateEstimate}
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-3"
                >
                  {t.calculate}
                </Button>

                {estimatedPrice && (
                  <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg border-2 border-green-200 dark:border-green-800">
                    <p className="text-sm text-muted-foreground mb-2">
                      {t.estimatedPrice}
                    </p>
                    <p className="text-4xl font-bold text-green-600 dark:text-green-400">
                      {estimatedPrice.toLocaleString()} ብር
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      * ይህ ግምት አጠቃላይ ሀሳብ ብቻ ነው / This is an approximate estimate only
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EstimatorSection;
