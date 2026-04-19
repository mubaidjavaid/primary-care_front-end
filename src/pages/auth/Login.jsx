import { motion } from "framer-motion";
import { Bolt, Building2, ShieldCheck } from "lucide-react";
import LoginForm from "../../components/auth/LoginForm";

const features = [
  {
    Icon: ShieldCheck,
    text: "Grounded in MoH Guidelines",
    iconClass: "text-emerald-200",
  },
  { Icon: Bolt, text: "Instant Triage Decisions", iconClass: "text-amber-200" },
  {
    Icon: Building2,
    text: "Built for BHUs and RHCs",
    iconClass: "text-sky-200",
  },
];

export default function Login() {
  return (
    <div className="grid min-h-[calc(100vh-112px)] overflow-hidden rounded-card border border-medical-border bg-white shadow-card md:grid-cols-5">
      <motion.section
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="relative col-span-2 hidden bg-navy-900 p-10 text-white md:block"
      >
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(255,255,255,.12) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />
        <div className="relative">
          <h1 className="font-display text-5xl text-white">Triage AI</h1>
          <p className="mt-3 text-sm text-blue-100">
            Pakistan Primary Care Decision Support
          </p>
          <div className="mt-8 space-y-3 text-sm">
            {features.map(({ Icon, text, iconClass }) => (
              <div
                key={text}
                className="flex items-center gap-2 rounded-badge border border-blue-400/40 bg-blue-500/10 px-4 py-2"
              >
                <Icon size={16} className={iconClass} />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <section className="col-span-3 grid place-items-center p-6 md:p-10">
        <LoginForm />
      </section>
    </div>
  );
}
