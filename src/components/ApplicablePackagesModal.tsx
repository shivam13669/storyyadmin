import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Package } from "lucide-react";

interface ApplicablePackagesModalProps {
  isOpen: boolean;
  couponCode: string;
  applicablePackages: "all" | string[];
  allPackages: any[];
  onClose: () => void;
}

export function ApplicablePackagesModal({
  isOpen,
  couponCode,
  applicablePackages,
  allPackages,
  onClose,
}: ApplicablePackagesModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Applicable Packages</DialogTitle>
          <DialogDescription className="text-base pt-2">
            <span className="font-semibold text-gray-900">Coupon Code:</span>
            <span className="ml-2 font-mono font-bold text-gray-900">{couponCode}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {applicablePackages === "all" ? (
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Package className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">All Packages</h3>
              </div>
              <p className="text-gray-600 mb-4">This coupon is applicable to all available packages.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {allPackages.map((pkg) => (
                  <div key={pkg.slug} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="font-medium text-gray-900">{pkg.name}</p>
                    <p className="text-sm text-gray-600 mt-1">{pkg.destination}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : Array.isArray(applicablePackages) && applicablePackages.length > 0 ? (
            <div className="space-y-6">
              {(() => {
                const groupedByDestination: Record<string, any[]> = {};

                applicablePackages.forEach((slug) => {
                  const pkg = allPackages.find((p) => p.slug === slug);
                  if (pkg) {
                    if (!groupedByDestination[pkg.destination]) {
                      groupedByDestination[pkg.destination] = [];
                    }
                    groupedByDestination[pkg.destination].push(pkg);
                  }
                });

                return Object.entries(groupedByDestination).map(([destination, packages]) => (
                  <div key={destination} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Package className="w-5 h-5 text-purple-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{destination}</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {packages.map((pkg) => (
                        <div key={pkg.slug} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                          <p className="font-medium text-gray-900">{pkg.name}</p>
                          <p className="text-sm text-gray-600 mt-1">{pkg.destination}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ));
              })()}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-600">
              <p>No packages specified</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
