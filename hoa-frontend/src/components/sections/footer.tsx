import { Building, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-community-navy text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Building className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold">CommunityCare</h3>
                <p className="text-sm text-blue-200">Harmony Heights Subdivision</p>
              </div>
            </div>
            <p className="text-blue-200 leading-relaxed mb-6">
              A premier residential community committed to excellence in governance, 
              security, and quality living for all our residents.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-community-green" />
                <span>123 Harmony Heights Drive, Community City</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-community-green" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-community-green" />
                <span>admin@harmonyheights.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-blue-200">
              <li><a href="#" className="hover:text-white transition-smooth">Resident Portal</a></li>
              <li><a href="#" className="hover:text-white transition-smooth">Pay Dues Online</a></li>
              <li><a href="#" className="hover:text-white transition-smooth">Book Facilities</a></li>
              <li><a href="#" className="hover:text-white transition-smooth">Report Issues</a></li>
              <li><a href="#" className="hover:text-white transition-smooth">Emergency Contacts</a></li>
            </ul>
          </div>

          {/* Documents */}
          <div>
            <h4 className="font-semibold mb-4">Documents</h4>
            <ul className="space-y-2 text-sm text-blue-200">
              <li><a href="#" className="hover:text-white transition-smooth">By-Laws & Policies</a></li>
              <li><a href="#" className="hover:text-white transition-smooth">Financial Reports</a></li>
              <li><a href="#" className="hover:text-white transition-smooth">Meeting Minutes</a></li>
              <li><a href="#" className="hover:text-white transition-smooth">Community Guidelines</a></li>
              <li><a href="#" className="hover:text-white transition-smooth">Forms & Applications</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-8 text-center text-sm text-blue-200">
          <p>&copy; 2024 Harmony Heights Subdivision. All rights reserved. | Managed with CommunityCare Platform</p>
        </div>
      </div>
    </footer>
  );
}