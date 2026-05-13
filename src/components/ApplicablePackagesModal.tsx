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
            <div className="border-2 border-blue-100 bg-blue-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-200 rounded-lg">
                  <Package className="w-6 h-6 text-blue-700" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">All Packages</h3>
                  <p className="text-sm text-gray-600 mt-1">This coupon applies to every package</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {allPackages.map((pkg) => (
                  <div key={pkg.slug} className="bg-white rounded-lg p-4 border border-blue-200">
                    <p className="font-semibold text-gray-900 text-sm">{pkg.name}</p>
                    <p className="text-xs text-gray-600 mt-1">{pkg.destination}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : Array.isArray(applicablePackages) && applicablePackages.length > 0 ? (
            <div className="border-2 border-green-100 bg-green-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-200 rounded-lg">
                  <Package className="w-6 h-6 text-green-700" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Selected Packages</h3>
                  <p className="text-sm text-gray-600 mt-1">{applicablePackages.length} package{applicablePackages.length > 1 ? 's' : ''} selected</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {applicablePackages.map((slug) => {
                  const pkg = allPackages.find((p) => p.slug === slug);
                  return (
                    <div key={slug} className="bg-white rounded-lg p-4 border-2 border-green-300 shadow-sm">
                      <p className="font-semibold text-gray-900 text-sm">{pkg?.name || slug}</p>
                      <p className="text-xs text-gray-600 mt-1">{pkg?.destination || "—"}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="border-2 border-gray-200 bg-gray-50 rounded-xl p-12 text-center">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 font-medium">No packages specified</p>
              <p className="text-sm text-gray-500 mt-1">This coupon doesn't have specific packages selected</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
