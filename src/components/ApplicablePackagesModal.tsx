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
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Applicable Packages</DialogTitle>
          <DialogDescription>
            Coupon Code: {couponCode}
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
              <p className="text-gray-600">This coupon is applicable to all available packages.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {allPackages.map((pkg) => (
                  <Badge key={pkg.slug} variant="secondary">
                    {pkg.name}
                  </Badge>
                ))}
              </div>
            </div>
          ) : Array.isArray(applicablePackages) && applicablePackages.length > 0 ? (
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Package className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Selected Packages</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {applicablePackages.map((slug) => {
                  const pkg = allPackages.find((p) => p.slug === slug);
                  return (
                    <Badge key={slug} variant="secondary">
                      {pkg?.name || slug}
                    </Badge>
                  );
                })}
              </div>
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
