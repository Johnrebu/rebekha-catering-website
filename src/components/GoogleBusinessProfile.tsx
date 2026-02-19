import { MapPin, Phone, Globe, Clock, MapIcon } from "lucide-react";

const GoogleBusinessProfile = () => {
  const businessInfo = {
    name: "Rebekha Catering Services",
    phone: "+91-XXXXXXXXXX", // Replace with your actual phone number
    website: "https://rebekhacaterers.online",
    googleBusinessUrl: "https://www.google.com/maps/place/Rebekha+Catering+Services+Chennai", // Update after creating profile
    address: "West Tambaram, Chennai, Tamil Nadu 600045, India",
    latitude: 12.9226,
    longitude: 80.1275,
    hours: {
      monday: "9:00 AM - 9:00 PM",
      tuesday: "9:00 AM - 9:00 PM",
      wednesday: "9:00 AM - 9:00 PM",
      thursday: "9:00 AM - 9:00 PM",
      friday: "9:00 AM - 9:00 PM",
      saturday: "9:00 AM - 9:00 PM",
      sunday: "9:00 AM - 9:00 PM",
    },
  };

  return (
    <div className="space-y-8">
      {/* Google Map Embed */}
      <div className="rounded-lg overflow-hidden shadow-lg h-96">
        <iframe
          src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.823656231!2d${businessInfo.longitude}!3d${businessInfo.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0x0!2sRebekha+Catering+Services!5e0!3m2!1sen!2sin!4v1`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Rebekha Catering Services Location"
        />
      </div>

      {/* Business Info Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Contact Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-[hsl(30,20%,15%)] mb-4">Contact Information</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-[hsl(43,76%,58%)] mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-600">Call Us</p>
                <a href="tel:+91XXXXXXXXXX" className="text-lg font-semibold text-[hsl(30,20%,15%)] hover:text-[hsl(43,76%,58%)]">
                  {businessInfo.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-[hsl(43,76%,58%)] mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-600">Address</p>
                <p className="text-[hsl(30,20%,15%)] font-medium">{businessInfo.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Globe className="h-5 w-5 text-[hsl(43,76%,58%)] mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-600">Website</p>
                <a href={businessInfo.website} className="text-[hsl(30,20%,15%)] font-medium hover:text-[hsl(43,76%,58%)]">
                  {businessInfo.website}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Business Hours Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-[hsl(30,20%,15%)] mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-[hsl(43,76%,58%)]" />
            Business Hours
          </h3>
          <div className="space-y-2 text-sm">
            {Object.entries(businessInfo.hours).map(([day, hours]) => (
              <div key={day} className="flex justify-between py-1 border-b last:border-b-0">
                <span className="capitalize text-gray-600">{day}</span>
                <span className="font-semibold text-[hsl(30,20%,15%)]">{hours}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Google Business Profile CTA */}
      <div className="bg-[hsl(43,76%,58%)] rounded-lg p-8 text-center">
        <h3 className="text-2xl font-bold text-[hsl(30,20%,15%)] mb-3">
          Visit Us on Google
        </h3>
        <p className="text-[hsl(30,20%,15%)] mb-6 max-w-2xl mx-auto">
          Check our ratings, reviews, photos, and more on our official Google Business Profile
        </p>
        <a
          href={businessInfo.googleBusinessUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[hsl(43,76%,58%)] font-bold rounded-lg hover:bg-gray-100 transition-colors"
        >
          <MapIcon className="h-5 w-5" />
          View on Google Maps
        </a>
      </div>

      {/* Why Google Business Profile */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h4 className="font-bold text-[hsl(30,20%,15%)] mb-3">Why Choose Google Business Profile?</h4>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>✓ Appear on Google Search & Google Maps</li>
          <li>✓ Build trust with customer reviews & ratings</li>
          <li>✓ Share photos, menus, and updates</li>
          <li>✓ Respond to customer reviews</li>
          <li>✓ Get insights on how customers find you</li>
          <li>✓ Improve local SEO rankings</li>
        </ul>
      </div>
    </div>
  );
};

export default GoogleBusinessProfile;
