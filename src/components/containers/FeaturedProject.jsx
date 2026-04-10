"use client";

import { motion } from "framer-motion";
import {
  blurFadeLeft,
  blurFadeRight,
  staggerContainer,
  staggerScaleItem,
  fadeUp,
} from "@/lib/motion";
import i18next from "i18next";
import { useEffect, useState } from "react";
import {
  RiExternalLinkLine,
  RiSmartphoneLine,
  RiBarChartBoxLine,
  RiShieldCheckLine,
  RiCloudLine,
  RiMoneyDollarCircleLine,
  RiRobot2Line,
} from "react-icons/ri";

const features = {
  en: [
    { icon: RiRobot2Line, label: "AI Expense Tracking" },
    { icon: RiMoneyDollarCircleLine, label: "Budget Planning" },
    { icon: RiBarChartBoxLine, label: "Financial Analytics" },
    { icon: RiSmartphoneLine, label: "Cross-Platform" },
    { icon: RiCloudLine, label: "Cloud Sync" },
    { icon: RiShieldCheckLine, label: "Bank-Level Security" },
  ],
  jp: [
    { icon: RiRobot2Line, label: "AI経費追跡" },
    { icon: RiMoneyDollarCircleLine, label: "予算管理" },
    { icon: RiBarChartBoxLine, label: "財務分析" },
    { icon: RiSmartphoneLine, label: "クロスプラットフォーム" },
    { icon: RiCloudLine, label: "クラウド同期" },
    { icon: RiShieldCheckLine, label: "銀行レベルのセキュリティ" },
  ],
};

const techStack = [
  "C#",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "PostgreSQL",
  "DynamoDB",
  "Cognito",
  "EC2",
  "ECR",
  "Amplify",
  "Route53",
  "CloudFront",
  "ACM",
  "EventBridge",
  "SQS",
  "Lambda",
  "S3",
  "CloudWatch",
];

const FeaturedProject = () => {
  const [lng, setLng] = useState(i18next.language || "jp");

  useEffect(() => {
    const handleLangChange = (lng) => setLng(lng);
    i18next.on("languageChanged", handleLangChange);
    return () => i18next.off("languageChanged", handleLangChange);
  }, []);

  const t = (key) => i18next.t(key, { lng, ns: "common" });
  const currentFeatures = features[lng] || features.en;

  return (
    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
      {/* Left: Browser mockup */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={blurFadeLeft}
        className="relative"
      >
        <div className="relative mx-auto max-w-[540px]">
          <div
            className="absolute inset-0 -m-8 rounded-3xl opacity-20 blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(16,185,129,0.3) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          <div className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-grey-lighten shadow-2xl shadow-primary/5">
            <div className="flex items-center gap-2 border-b border-white/[0.06] bg-grey-darken px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 flex-1 rounded-md bg-white/[0.06] px-3 py-1 text-xs text-body/40">
                usespendio.com
              </span>
            </div>

            <div className="relative px-6 py-8 text-center sm:px-10 sm:py-12">
              <div className="gradient-orb gradient-orb--primary absolute -top-10 -right-10 h-40 w-40 opacity-30" />

              <h3 className="mb-2 text-2xl font-bold text-heading sm:text-3xl">
                <span className="gradient-text">Spendio</span>
              </h3>
              <p className="mb-6 text-sm text-body/50">
                {lng === "jp"
                  ? "パーソナルファイナンスの未来"
                  : "The Future of Personal Finance"}
              </p>

              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-3 backdrop-blur">
                  <p className="text-xs text-body/40">
                    {lng === "jp" ? "今月の支出" : "This Month"}
                  </p>
                  <p className="text-lg font-bold text-primary">¥245,800</p>
                </div>
                <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-3 backdrop-blur">
                  <p className="text-xs text-body/40">
                    {lng === "jp" ? "予算残高" : "Budget Left"}
                  </p>
                  <p className="text-lg font-bold text-emerald-400">¥54,200</p>
                </div>
                <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-3 backdrop-blur">
                  <p className="text-xs text-body/40">
                    {lng === "jp" ? "節約率" : "Savings"}
                  </p>
                  <p className="text-lg font-bold text-accent">18%</p>
                </div>
              </div>

              <div className="mt-6 flex items-end justify-center gap-2">
                {[40, 65, 45, 80, 55, 70, 50].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}px` }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: 0.8 + i * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="w-6 rounded-t-md bg-gradient-to-t from-primary/40 to-primary sm:w-8"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Right: Info */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={blurFadeRight}
      >
        <span className="mb-3 inline-block rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-primary">
          {t("featuredproject")}
        </span>

        <h3 className="mb-2 text-3xl font-bold lg:text-4xl">
          <span className="gradient-text">Spendio</span>
        </h3>

        <p className="mb-6 text-lg leading-relaxed text-body">
          {lng === "jp"
            ? "支出を追跡し、予算を管理し、AIを活用した最も直感的な経費追跡アプリで財務目標を達成しましょう。美しいチャートと分析で支出パターンを理解できます。"
            : "Track expenses, manage budgets, and achieve your financial goals with the most intuitive AI-powered expense tracking app. Understand your spending patterns with beautiful charts and analytics."}
        </p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer(0.06)}
          className="mb-6 flex flex-wrap gap-2"
        >
          {currentFeatures.map((feat, i) => (
            <motion.span
              key={i}
              variants={staggerScaleItem}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-sm text-body backdrop-blur-sm transition-colors duration-300 hover:border-primary/30 hover:text-primary"
            >
              <feat.icon className="text-primary" />
              {feat.label}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-8"
        >
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-body/60">
            {lng === "jp" ? "技術スタック" : "Built With"}
          </p>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-white/[0.06] bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-heading"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        <a
          href="https://www.usespendio.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn inline-flex items-center gap-2"
        >
          <span>{lng === "jp" ? "Spendioを見る" : "Visit Spendio"}</span>
          <RiExternalLinkLine className="relative z-10" />
        </a>
      </motion.div>
    </div>
  );
};

export default FeaturedProject;
