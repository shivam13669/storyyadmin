import { Link } from "react-router-dom";
import { Mail, MessageSquare, Phone, Ticket, X } from "lucide-react";

interface GetInTouchModalProps {
  open: boolean;
  onClose: () => void;
}

const GetInTouchModal = ({ open, onClose }: GetInTouchModalProps) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-[742px] max-w-full overflow-y-auto rounded-[24px] bg-[#f8f9fb]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky White Header + 1px Divider */}
        <div className="sticky top-0 z-[5] flex items-start justify-between gap-4 rounded-t-[24px] bg-white p-[20px]">
          <h2 className="text-[20px] font-bold leading-[28px] text-[#202020]">
            Get in Touch
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full px-2 py-1 text-[#68686a] transition hover:bg-black/5"
          >
            <X className="h-[22px] w-[22px]" />
          </button>
        </div>
        <div className="h-px bg-[#e8e8eb]" />

        {/* Option Cards List */}
        <div className="flex flex-col gap-[20px] p-[20px]">
          {/* 1. Chat via WhatsApp */}
          <div className="flex flex-col justify-between gap-4 rounded-[16px] border border-[#e8e8eb] bg-white p-[24px] sm:flex-row sm:items-center md:border-0">
            <div className="flex items-start gap-3.5">
              <MessageSquare className="mt-0.5 h-[22px] w-[22px] shrink-0 text-[#202020]" />
              <div>
                <h3 className="text-[14px] font-semibold leading-[20px] text-[#202020]">
                  Chat via WhatsApp
                </h3>
                <p className="mt-1 text-[14px] font-medium leading-[20px] text-[#89898b]">
                  Perfect for quick questions and urgent queries
                </p>
                <p className="mt-2 text-[12px] font-normal leading-[20px] text-[#0c5a18]">
                  Response Time: Instant
                </p>
              </div>
            </div>
            <a
              href="https://wa.me/916205129118"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-[40px] min-w-[80px] shrink-0 items-center justify-center rounded-[12px] border-[1.5px] border-[#f36812] bg-transparent px-[20px] text-[14px] font-semibold leading-[20px] text-[#e9610c] transition hover:bg-[#FFF5EE]"
            >
              Start Chat
            </a>
          </div>

          {/* 2. Submit a Ticket */}
          <div className="flex flex-col justify-between gap-4 rounded-[16px] border border-[#e8e8eb] bg-white p-[24px] sm:flex-row sm:items-center md:border-0">
            <div className="flex items-start gap-3.5">
              <Ticket className="mt-0.5 h-[22px] w-[22px] shrink-0 text-[#202020]" />
              <div>
                <h3 className="text-[14px] font-semibold leading-[20px] text-[#202020]">
                  Submit a Ticket
                </h3>
                <p className="mt-1 text-[14px] font-medium leading-[20px] text-[#89898b]">
                  Submit a ticket for faster and detailed assistance.
                </p>
                <p className="mt-2 text-[12px] font-normal leading-[20px] text-[#0c5a18]">
                  Response Time: 12-24 hours
                </p>
              </div>
            </div>
            <Link
              to="/support/category/feedback-complaints/subcategory/raise-complaint#submit-ticket-form"
              onClick={onClose}
              className="inline-flex h-[40px] min-w-[80px] shrink-0 items-center justify-center rounded-[12px] border-[1.5px] border-[#f36812] bg-transparent px-[20px] text-[14px] font-semibold leading-[20px] text-[#e9610c] transition hover:bg-[#FFF5EE]"
            >
              Submit a ticket
            </Link>
          </div>

          {/* 3. Email Support */}
          <div className="flex flex-col justify-between gap-4 rounded-[16px] border border-[#e8e8eb] bg-white p-[24px] sm:flex-row sm:items-center md:border-0">
            <div className="flex items-start gap-3.5">
              <Mail className="mt-0.5 h-[22px] w-[22px] shrink-0 text-[#202020]" />
              <div>
                <h3 className="text-[14px] font-semibold leading-[20px] text-[#202020]">
                  Email Support
                </h3>
                <p className="mt-1 text-[14px] font-medium leading-[20px] text-[#89898b]">
                  Drop us an email, and one of our support agents will get back to you
                </p>
                <p className="mt-2 text-[12px] font-normal leading-[20px] text-[#0c5a18]">
                  Response Time: 24-48 hours
                </p>
              </div>
            </div>
            <a
              href="mailto:contact@storiesbyfoot.com"
              className="inline-flex h-[40px] min-w-[80px] shrink-0 items-center justify-center rounded-[12px] border-[1.5px] border-[#f36812] bg-transparent px-[20px] text-[14px] font-semibold leading-[20px] text-[#e9610c] transition hover:bg-[#FFF5EE]"
            >
              Email us
            </a>
          </div>

          {/* 4. Call Support */}
          <div className="flex flex-col justify-between gap-4 rounded-[16px] border border-[#e8e8eb] bg-white p-[24px] sm:flex-row sm:items-center md:border-0">
            <div className="flex items-start gap-3.5">
              <Phone className="mt-0.5 h-[22px] w-[22px] shrink-0 text-[#202020]" />
              <div>
                <h3 className="text-[14px] font-semibold leading-[20px] text-[#202020]">
                  Call Support
                </h3>
                <p className="mt-1 text-[14px] font-medium leading-[20px] text-[#89898b]">
                  Our support team is just a call away for urgent queries
                </p>
                <p className="mt-2 text-[12px] font-normal leading-[20px] text-[#0c5a18]">
                  Response Time: Instant
                </p>
              </div>
            </div>
            <div className="flex shrink-0 flex-col items-stretch gap-[8px] sm:min-w-[160px] sm:items-end">
              <a
                href="tel:+916205129118"
                className="inline-flex h-[40px] min-w-[80px] items-center justify-center rounded-[12px] border-[1.5px] border-[#f36812] bg-transparent px-[20px] text-[14px] font-semibold leading-[20px] text-[#e9610c] transition hover:bg-[#FFF5EE]"
              >
                Call Now
              </a>
              <span className="text-center text-[12px] font-medium leading-[16px] text-[#68686a] sm:text-right">
                Available only for active trip
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetInTouchModal;
