import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import SEO from "@/components/SEO";
import GetInTouchModal from "@/components/GetInTouchModal";
import SubmitTicketCard from "@/components/SubmitTicketCard";
import { SUPPORT_CATEGORIES } from "@/data/supportData";
import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  ThumbsDown,
  ThumbsUp,
  Ticket,
} from "lucide-react";

const SupportDetailPage = () => {
  const { categoryId, subcategorySlug } = useParams();
  const { hash } = useLocation();
  const category =
    SUPPORT_CATEGORIES.find((c) => c.id === categoryId) ?? SUPPORT_CATEGORIES[0];
  const subcategory = subcategorySlug
    ? category.items.find((item) => item.slug === subcategorySlug) ?? category.items[0]
    : null;

  const [openFaqMap, setOpenFaqMap] = useState<Record<number, boolean>>({ 0: true });
  const [feedbackMap, setFeedbackMap] = useState<Record<number, "up" | "down">>({});
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    setOpenFaqMap({ 0: true });
    setFeedbackMap({});
    if (hash === "#submit-ticket-form") {
      window.setTimeout(() => {
        document
          .getElementById("submit-ticket-form")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 60);
    } else {
      window.scrollTo(0, 0);
    }
  }, [categoryId, subcategorySlug, hash]);

  const otherSubcategories = subcategory
    ? category.items.filter((item) => item.slug !== subcategory.slug)
    : [];

  const pageTitle = subcategory
    ? `${subcategory.title} | ${category.title} | Stories by Foot Support`
    : `${category.title} | Help Centre | Stories by Foot`;

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf0e9] text-[#202020]">
      <SEO
        title={pageTitle}
        description={
          subcategory
            ? subcategory.answer
            : `Browse ${category.title} help topics and FAQs for Stories by Foot expeditions.`
        }
      />
      <Navigation />

      <main className="flex-grow pb-[48px]">
        {/* Compact Sunset Hero Banner */}
        <section
          className="relative pt-[96px] pb-[140px] sm:pt-[108px] sm:pb-[160px]"
          style={{
            background: "linear-gradient(105deg, #E87838 0%, #DF8255 52%, #C49B98 100%)",
          }}
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <svg
              aria-hidden="true"
              viewBox="0 0 1440 260"
              preserveAspectRatio="none"
              className="h-full w-full opacity-15"
            >
              <path
                d="M-60,70 C220,10 420,130 720,75 C1020,20 1220,120 1500,60"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />
              <path
                d="M-60,135 C240,75 460,195 760,135 C1060,75 1240,180 1500,120"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />
            </svg>
          </div>

          <div className="pointer-events-none absolute inset-x-0 -bottom-px overflow-hidden leading-none">
            <svg
              viewBox="0 0 1440 32"
              preserveAspectRatio="none"
              className="h-[24px] w-full sm:h-[28px]"
            >
              <path
                d="M0,32 C360,0 1080,0 1440,32 L1440,32 L0,32 Z"
                fill="#fbf0e9"
              />
            </svg>
          </div>
        </section>

        {/* Main White Content Container */}
        <section className="relative z-10 mx-auto -mt-[112px] max-w-[1128px] px-4 sm:-mt-[126px] sm:px-6 lg:px-0">
          <div className="rounded-[24px] border-[0.5px] border-[#e8e8eb] bg-white p-[20px] sm:p-[28px]">
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-1.5 text-[13px] font-medium"
            >
              <Link to="/support" className="text-[#E9610C] hover:underline">
                Help centre
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-[#68686A]" />
              {subcategory ? (
                <>
                  <Link
                    to={`/support/category/${category.id}`}
                    className="text-[#E9610C] hover:underline"
                  >
                    {category.title}
                  </Link>
                  <ChevronRight className="h-3.5 w-3.5 text-[#68686A]" />
                  <span className="text-[#202020]">{subcategory.title}</span>
                </>
              ) : (
                <span className="text-[#202020]">{category.title}</span>
              )}
            </nav>

            {/* Page Title */}
            <h1 className="mt-3 text-[22px] font-bold leading-[30px] text-[#202020] sm:text-[26px] sm:leading-[34px]">
              {subcategory ? subcategory.title : category.title}
            </h1>

            {/* Category View vs Subcategory View */}
            {!subcategory ? (
              <div className="mt-6 grid grid-cols-1 gap-[24px] lg:grid-cols-[1fr_340px] lg:items-start">
                {/* Left: Subcategory Rows */}
                <div className="space-y-3">
                  {category.items.map((item) => (
                    <Link
                      key={item.slug}
                      to={`/support/category/${category.id}/subcategory/${item.slug}`}
                      className="flex items-center justify-between gap-4 rounded-[12px] border border-[#e8e8eb] bg-white px-5 py-4 text-[14px] font-semibold text-[#202020] transition hover:border-[#F36812] hover:text-[#E9610C]"
                    >
                      <span>{item.title}</span>
                      <ChevronRight className="h-4 w-4 shrink-0 text-[#202020]" />
                    </Link>
                  ))}
                </div>

                {/* Right: "We're here for you" Box */}
                <div className="rounded-[16px] border border-[#e8e8eb] bg-white p-[20px]">
                  <h2 className="text-[16px] font-bold leading-[22px] text-[#202020]">
                    We&apos;re here for you
                  </h2>
                  <p className="mt-1.5 text-[13px] font-medium leading-[19px] text-[#68686A]">
                    Didn&apos;t find the answer you needed? No worries — our travel experts are ready to assist.
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-[10px]">
                    <Link
                      to="/support/category/feedback-complaints/subcategory/raise-complaint#submit-ticket-form"
                      className="inline-flex h-[40px] items-center justify-center gap-[8px] rounded-[12px] bg-[#F36812] px-[18px] text-[14px] font-semibold text-white transition hover:bg-[#E9610C]"
                    >
                      <Ticket className="h-4 w-4" />
                      Submit a ticket
                    </Link>
                    <button
                      type="button"
                      onClick={() => setIsContactModalOpen(true)}
                      className="inline-flex h-[40px] items-center justify-center rounded-[12px] border-[1.5px] border-[#F36812] bg-transparent px-[18px] text-[14px] font-semibold text-[#E9610C] transition hover:bg-[#FFF5EE]"
                    >
                      Contact Us
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-6 grid grid-cols-1 gap-[24px] lg:grid-cols-[1fr_320px] lg:items-start">
                {/* Left: FAQ Accordions */}
                <div className="space-y-3">
                  {subcategory.faqs.map((faq, idx) => {
                    const isOpen = !!openFaqMap[idx];
                    const feedback = feedbackMap[idx];

                    return (
                      <div
                        key={faq.question}
                        className="rounded-[14px] border border-[#e8e8eb] bg-white px-5 py-4"
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setOpenFaqMap((prev) => ({ ...prev, [idx]: !prev[idx] }))
                          }
                          className="flex w-full items-center justify-between gap-4 text-left text-[15px] font-bold leading-[22px] text-[#202020]"
                        >
                          <span>{faq.question}</span>
                          {isOpen ? (
                            <ChevronUp className="h-4 w-4 shrink-0 text-[#202020]" />
                          ) : (
                            <ChevronDown className="h-4 w-4 shrink-0 text-[#202020]" />
                          )}
                        </button>

                        {isOpen && (
                          <div className="mt-3">
                            <p className="whitespace-pre-line text-[14px] leading-[22px] text-[#4A4A4D]">
                              {faq.answer}
                            </p>

                            <div className="mt-4 flex flex-wrap items-center gap-3 pt-1">
                              <button
                                type="button"
                                aria-label="Not helpful"
                                onClick={() =>
                                  setFeedbackMap((prev) => ({
                                    ...prev,
                                    [idx]: prev[idx] === "down" ? undefined : "down",
                                  }))
                                }
                                className={`grid h-8 w-8 place-items-center rounded-[8px] border transition ${
                                  feedback === "down"
                                    ? "border-[#F36812] bg-[#FFF5EE] text-[#E9610C]"
                                    : "border-[#e8e8eb] text-[#4A4A4D] hover:bg-slate-50"
                                }`}
                              >
                                <ThumbsDown className="h-3.5 w-3.5" />
                              </button>
                              <button
                                type="button"
                                aria-label="Helpful"
                                onClick={() =>
                                  setFeedbackMap((prev) => ({
                                    ...prev,
                                    [idx]: prev[idx] === "up" ? undefined : "up",
                                  }))
                                }
                                className={`grid h-8 w-8 place-items-center rounded-[8px] border transition ${
                                  feedback === "up"
                                    ? "border-[#16a34a] bg-[#f0fdf4] text-[#16a34a]"
                                    : "border-[#e8e8eb] text-[#4A4A4D] hover:bg-slate-50"
                                }`}
                              >
                                <ThumbsUp className="h-3.5 w-3.5" />
                              </button>
                              <span className="text-[13px] font-medium text-[#68686A]">
                                {feedback
                                  ? "Thanks for your feedback!"
                                  : "Did this solve your issue?"}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Right: "More under this category" */}
                <div className="rounded-[16px] border border-[#e8e8eb] bg-white p-[20px]">
                  <h2 className="text-[15px] font-bold leading-[22px] text-[#202020]">
                    More under this category
                  </h2>
                  <ul className="mt-3 space-y-2.5">
                    {otherSubcategories.map((item) => (
                      <li key={item.slug}>
                        <Link
                          to={`/support/category/${category.id}/subcategory/${item.slug}`}
                          className="block text-[14px] font-medium text-[#E9610C] hover:underline"
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Full-width Bottom Card on Subcategory View */}
          {subcategory &&
            (subcategory.slug === "raise-complaint" ? (
              <SubmitTicketCard />
            ) : (
              <div className="mt-[24px] rounded-[24px] border-[0.5px] border-[#e8e8eb] bg-white p-[20px] py-8 text-center">
                <h2 className="text-[24px] font-bold leading-[32px] text-[#202020]">
                  We&apos;re here for you
                </h2>
                <p className="mx-auto mt-2 max-w-xl text-[14px] font-medium leading-[20px] text-[#68686A]">
                  Didn&apos;t find the answer you needed? No worries — our travel experts are ready to assist.
                </p>
                <div className="mt-5 flex flex-col items-center justify-center gap-[12px] sm:flex-row">
                  <Link
                    to="/support/category/feedback-complaints/subcategory/raise-complaint#submit-ticket-form"
                    className="inline-flex h-[40px] w-full items-center justify-center gap-[8px] rounded-[12px] bg-[#F36812] px-[20px] text-[14px] font-semibold text-white transition hover:bg-[#E9610C] sm:w-auto"
                  >
                    <Ticket className="h-4 w-4" />
                    Submit a ticket
                  </Link>
                  <button
                    type="button"
                    onClick={() => setIsContactModalOpen(true)}
                    className="inline-flex h-[40px] w-full items-center justify-center rounded-[12px] border-[1.5px] border-[#F36812] bg-transparent px-[20px] text-[14px] font-semibold text-[#E9610C] transition hover:bg-[#FFF5EE] sm:w-auto"
                  >
                    Contact Us
                  </button>
                </div>
              </div>
            ))}
        </section>
      </main>

      <GetInTouchModal
        open={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
};

export default SupportDetailPage;