import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, UploadCloud } from "lucide-react";
import { SUPPORT_CATEGORIES } from "@/data/supportData";

const ISSUE_TYPES = [
  "Accommodation / Camp Issue",
  "Bike / Mechanical Issue",
  "Captain / Staff Behaviour",
  "Refund / Billing Discrepancy",
  "Itinerary / Schedule Change",
  "Safety / Emergency Concern",
  "Other",
];

interface FormSelectOption {
  value: string;
  label: string;
}

interface FormSelectProps {
  value: string;
  placeholder: string;
  options: FormSelectOption[];
  onChange: (value: string) => void;
}

const FormSelect = ({ value, placeholder, options, onChange }: FormSelectProps) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex h-[48px] w-full items-center justify-between gap-2 rounded-[8px] border-[1.5px] bg-white px-[12px] text-left text-[14px] transition ${
          open ? "border-[#f36812]" : "border-[#e8e8eb]"
        }`}
      >
        <span className={`truncate ${selected ? "font-medium text-[#202020]" : "text-[#89898b]"}`}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-[#202020] transition-transform duration-150 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full z-40 mt-1.5 max-h-60 overflow-y-auto rounded-[12px] border border-[#e8e8eb] bg-white py-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`block w-full px-4 py-2.5 text-left text-[14px] font-medium leading-[20px] text-[#202020] transition hover:bg-[#fbf0e9] ${
                  isSelected ? "bg-[#fbf0e9]" : "bg-transparent"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

const SubmitTicketCard = () => {
  const [categoryId, setCategoryId] = useState("feedback-complaints");
  const [subcategorySlug, setSubcategorySlug] = useState("raise-complaint");
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const selectedCategory = useMemo(
    () => SUPPORT_CATEGORIES.find((c) => c.id === categoryId) ?? SUPPORT_CATEGORIES[0],
    [categoryId]
  );

  const isValid = Boolean(
    categoryId && subcategorySlug && issueType && description.trim().length > 0
  );

  const handleCategoryChange = (nextId: string) => {
    setCategoryId(nextId);
    const cat = SUPPORT_CATEGORIES.find((c) => c.id === nextId);
    setSubcategorySlug(cat?.items[0]?.slug ?? "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    const refId = `SBF-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedId(refId);
    setIssueType("");
    setDescription("");
    setFileNames([]);
  };

  return (
    <div
      id="submit-ticket-form"
      className="mt-[24px] rounded-[24px] border-[0.5px] border-[#e8e8eb] bg-white p-[24px] sm:p-[28px]"
    >
      <div>
        <h2 className="text-[24px] font-bold leading-[32px] text-[#202020]">
          Submit a Ticket
        </h2>
        <p className="mt-1 text-[14px] font-medium leading-[20px] text-[#89898b]">
          Please fill out the form below to contact our support team.
        </p>
      </div>

      {submittedId && (
        <div className="mt-5 rounded-[12px] border border-[#bbf7d0] bg-[#f0fdf4] px-4 py-3 text-[14px] font-medium text-[#15803d]">
          Ticket <span className="font-bold">{submittedId}</span> submitted! Our support team will respond shortly.
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-[24px] lg:grid-cols-[minmax(0,1fr)_332px] lg:items-start">
        {/* Left: Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-[24px]">
          {/* Row 1: Category & Sub-category */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 flex items-center gap-1 text-[14px] font-semibold text-[#202020]">
                <span>Ticket category</span>
                <span className="font-bold text-[#ff4d00]">*</span>
              </label>
              <FormSelect
                value={categoryId}
                placeholder="Select category"
                options={SUPPORT_CATEGORIES.map((cat) => ({
                  value: cat.id,
                  label: cat.title,
                }))}
                onChange={handleCategoryChange}
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-1 text-[14px] font-semibold text-[#202020]">
                <span>Ticket sub-category</span>
                <span className="font-bold text-[#ff4d00]">*</span>
              </label>
              <FormSelect
                value={subcategorySlug}
                placeholder="Select SubCategory"
                options={selectedCategory.items.map((item) => ({
                  value: item.slug,
                  label: item.title,
                }))}
                onChange={setSubcategorySlug}
              />
            </div>
          </div>

          {/* Row 2: Issue type */}
          <div>
            <label className="mb-2 flex items-center gap-1 text-[14px] font-semibold text-[#202020]">
              <span>Issue type</span>
              <span className="font-bold text-[#ff4d00]">*</span>
            </label>
            <FormSelect
              value={issueType}
              placeholder="Select issue type"
              options={ISSUE_TYPES.map((type) => ({
                value: type,
                label: type,
              }))}
              onChange={setIssueType}
            />
          </div>

          {/* Row 3: Description */}
          <div>
            <label className="mb-2 flex items-center gap-1 text-[14px] font-semibold text-[#202020]">
              <span>Description</span>
              <span className="font-bold text-[#ff4d00]">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your issue"
              className="min-h-[120px] w-full resize-y rounded-[8px] border border-[#e0e0e0] bg-white px-[14px] py-[12px] text-[14px] font-normal text-[#202020] outline-none placeholder:text-[#89898b] focus:border-[#f36812]"
            />
          </div>

          {/* Row 4: File Upload Dropzone */}
          <div className="relative flex h-[72px] w-full items-center gap-3.5 rounded-[12px] border border-dashed border-[#d0d0d5] bg-[#f9f9fb] px-4 transition hover:border-[#f36812]">
            <UploadCloud className="h-[22px] w-[22px] shrink-0 text-[#202020]" />
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-semibold leading-[20px] text-[#202020]">
                {fileNames.length > 0 ? (
                  <span className="truncate text-[#e9610c]">
                    {fileNames.join(", ")}
                  </span>
                ) : (
                  <>
                    Drag and drop your files here or{" "}
                    <span className="font-semibold text-[#e9610c]">Browse Files</span>
                    <span className="font-normal text-[#8c8c8c]"> (Optional)</span>
                  </>
                )}
              </p>
              <p className="mt-[4px] text-[12px] font-medium leading-[16px] text-[#89898b]">
                Any JPG, JPEG, PNG, PDF, MP4 up to 20MB
              </p>
            </div>
            <input
              type="file"
              multiple
              accept=".jpg,.jpeg,.png,.pdf,.mp4"
              onChange={(e) => {
                const files = Array.from(e.target.files ?? []);
                setFileNames(files.map((f) => f.name));
              }}
              className="absolute inset-0 cursor-pointer opacity-0"
            />
          </div>

          {/* Row 5: Submit Button */}
          <div>
            <button
              type="submit"
              disabled={!isValid}
              className="inline-flex h-[36px] items-center justify-center rounded-[12px] bg-[#f36812] px-[12px] py-[8px] text-[14px] font-semibold leading-[20px] text-white shadow-[0_1px_4px_rgba(0,0,0,0.04)] transition hover:bg-[#e9610c] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Submit
            </button>
          </div>
        </form>

        {/* Right: ResponseTimePanel */}
        <div className="rounded-[16px] border border-[#e8e8eb] bg-white p-[20px] lg:mt-[28px]">
          <h3 className="mb-[12px] text-[18px] font-bold leading-[23.4px] text-[#111827] lg:whitespace-nowrap">
            When can I expect a response?
          </h3>
          <p className="text-[14px] font-normal leading-[21px] text-[#6b7280]">
            We respond to requests during weekday business hours, Monday - Friday from 8AM IST - 4PM IST.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubmitTicketCard;
