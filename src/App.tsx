import { useState } from "react";
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";
import {
  Accordion,
  AccordionItem,
  Card,
  Divider,
  Button,
  Dropdown,
  Avatar,
  Badge,
  Input,
  Switch,
  Select,
  Slider,
  Skeleton,
  SkeletonText,
  ToastContainer,
  useToast,
  Tooltip,
} from "./components";

type ThemeName = "paper" | "notebook" | "blueprint";

const THEME_TOKENS: Record<
  ThemeName,
  {
    pageBg: string;
    pageText: string;
    mutedText: string;
    surfaceBg: string;
    surfaceBorder: string;
    navBg: string;
    navBorder: string;
    footerBg: string;
    footerText: string;
    newsletterBg: string;
    newsletterText: string;
    newsletterMuted: string;
  }
> = {
  paper: {
    pageBg: "#faf7f0",
    pageText: "#2a2a2a",
    mutedText: "#6b6460",
    surfaceBg: "#fffdf8",
    surfaceBorder: "#e8e0d0",
    navBg: "#faf7f0",
    navBorder: "#e8e0d0",
    footerBg: "#faf7f0",
    footerText: "#5a5248",
    newsletterBg: "#2a2a2a",
    newsletterText: "#faf7f0",
    newsletterMuted: "#a09890",
  },
  notebook: {
    pageBg: "#fff8ea",
    pageText: "#2e241a",
    mutedText: "#6e6154",
    surfaceBg: "#fffef8",
    surfaceBorder: "#e6d4b9",
    navBg: "#fff9ee",
    navBorder: "#e0cda9",
    footerBg: "#fff9ee",
    footerText: "#6b5d50",
    newsletterBg: "#3a2f27",
    newsletterText: "#fff9ef",
    newsletterMuted: "#d0bfae",
  },
  blueprint: {
    pageBg: "#1f2735",
    pageText: "#f5f7fb",
    mutedText: "#c4cfdf",
    surfaceBg: "#273244",
    surfaceBorder: "#506078",
    navBg: "#232d3d",
    navBorder: "#44576f",
    footerBg: "#232d3d",
    footerText: "#d6deea",
    newsletterBg: "#121824",
    newsletterText: "#f1f4fa",
    newsletterMuted: "#aebbd0",
  },
};

export default function App() {
  const [theme, setTheme] = useState<ThemeName>("paper");
  const [fontSize, setFontSize] = useState(16);
  const [notifications, setNotifications] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);

  const [newsletterEmail, setNewsletterEmail] = useState("");

  const { toasts, showToast, dismissToast } = useToast();
  const themeTokens = THEME_TOKENS[theme];

  /* handlers */
  const handleNewsletter = () => {
    if (!newsletterEmail) {
      showToast("Enter your email first.", "warning");
      return;
    }
    showToast("You are subscribed! Expect good things.", "success");
    setNewsletterEmail("");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: themeTokens.pageBg,
        color: themeTokens.pageText,
        transition: "background 240ms ease, color 240ms ease",
      }}
    >
      <ToastContainer
        toasts={toasts}
        onDismiss={dismissToast}
        position="top-right"
      />

      {/* NAV */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 48px",
          background: themeTokens.navBg,
          borderBottom: `2px solid ${themeTokens.navBorder}`,
          position: "sticky",
          top: 0,
          zIndex: 100,
          transition: "background 240ms ease, border-color 240ms ease",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img
            src="./logo.png"
            alt="Sketchbook UI Logo"
            style={{ width: "32px", height: "32px", objectFit: "contain" }}
          />
          <span
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: "1.75rem",
              fontWeight: 700,
            }}
          >
            <RoughNotation
              type="underline"
              show
              color="#3b82f6"
              strokeWidth={2.5}
              animationDelay={300}
            >
              Sketchbook UI
            </RoughNotation>
          </span>
          <Badge variant="warning" size="sm">
            Beta
          </Badge>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Button
            size="sm"
            onClick={() => {
              showToast("Star us on GitHub! ⭐", "info");
              setTimeout(() => {
                window.open(
                  "https://github.com/SarthakRawat-1/sketchbook-ui",
                  "_blank",
                );
              }, 2000);
            }}
          >
            GitHub
          </Button>
          <Dropdown
            customTrigger={
              <button
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  padding: 0,
                }}
              >
                <Avatar initials="S" size="sm" />
              </button>
            }
            items={[
              {
                label: "My account",
                icon: "settings",
                onClick: () =>
                  window.open("https://github.com/SarthakRawat-1", "_blank"),
              },
            ]}
          />
        </div>
      </nav>

      {/* HERO */}
      <section
        style={{
          maxWidth: 860,
          margin: "0 auto",
          padding: "96px 32px 72px",
          textAlign: "center",
          background: themeTokens.surfaceBg,
          border: `2px solid ${themeTokens.surfaceBorder}`,
          borderRadius: 32,
          boxShadow: "6px 8px 0px rgba(0,0,0,0.08)",
          transition: "background 240ms ease, border-color 240ms ease",
        }}
      >
        <span style={{ marginBottom: 20, display: "inline-block" }}>
          <Badge variant="success" size="sm">
            20 components
          </Badge>
        </span>
        <h1
          style={{
            fontFamily: "'Caveat', cursive",
            fontSize: "clamp(2.8rem, 6vw, 4.4rem)",
            fontWeight: 700,
            lineHeight: 1.1,
            margin: "0 0 24px",
            color: themeTokens.pageText,
          }}
        >
          <RoughNotationGroup show>
            A{" "}
            <RoughNotation
              type="highlight"
              color="#93c5fd"
              order={1}
              animationDelay={400}
              multiline
            >
              UI library
            </RoughNotation>{" "}
            that looks like
            <br />
            it was{" "}
            <RoughNotation
              type="highlight"
              color="#fde68a"
              order={2}
              animationDelay={800}
              multiline
            >
              drawn by hand.
            </RoughNotation>
          </RoughNotationGroup>
        </h1>
        <p
          style={{
            fontSize: "1.1rem",
            color: themeTokens.mutedText,
            lineHeight: 1.8,
            maxWidth: 540,
            margin: "0 auto 40px",
          }}
        >
          Sketchbook UI is a React component library with a hand-drawn
          aesthetic. Use it for side projects, landing pages, or anywhere you
          want to stand out from the sea of flat, sterile UIs.
        </p>
        <div
          style={{
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Button size="lg" onClick={() => window.open("./docs/", "_self")}>
            Get Started
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            gap: 40,
            justifyContent: "center",
            marginTop: 64,
            flexWrap: "wrap",
          }}
        >
          {[
            ["20", "Components"],
            ["100%", "TypeScript"],
            ["MIT", "Licensed"],
            ["< 70 kB", "Gzipped"],
          ].map(([stat, label]) => (
            <div key={label}>
              <div
                style={{
                  fontFamily: "'Caveat', cursive",
                  fontSize: "2rem",
                  fontWeight: 700,
                }}
              >
                {stat}
              </div>
              <div
                style={{
                  fontFamily: "'Caveat', cursive",
                  fontSize: "0.95rem",
                  color: themeTokens.mutedText,
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Divider style={{ maxWidth: 800, margin: "0 auto 72px" }} />

      {/* FEATURES */}
      <section
        style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px 88px" }}
      >
        <h2
          style={{
            fontFamily: "'Caveat', cursive",
            fontSize: "2.3rem",
            fontWeight: 700,
            textAlign: "center",
            marginBottom: 48,
            color: themeTokens.pageText,
          }}
        >
          Everything you need, nothing you do not have
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
            gap: 28,
          }}
        >
          {[
            {
              badge: "Stable",
              title: "20 battle-tested components",
              body: "From a simple button to multi-item accordions and portalled modals — we cover the full spectrum of what a modern app needs.",
            },
            {
              badge: "Unique",
              title: "Hand-drawn by default",
              body: "Every border, every shadow, every wobble is intentional. Tune the intensity from barely there to straight off a napkin.",
            },
            {
              badge: "DX",
              title: "TypeScript first",
              body: "Full prop types, exported interfaces, discriminated unions where it matters. Your IDE should give confidence, not guesses.",
            },
            {
              badge: "Performance",
              title: "Tiny by design",
              body: "No runtime dependencies beyond React. Tree-shake away anything you do not use. Everything ships in under 70 kB gzipped.",
            },
            {
              badge: "Flexible",
              title: "Fully themeable",
              body: "Override colors, fonts, stroke widths, and noise textures per component. Ship on-brand without fighting the defaults.",
            },
            {
              badge: "Docs",
              title: "Storybook included",
              body: "Every component ships with CSF3 stories covering all variants, sizes, and edge cases. Documentation as code.",
            },
          ].map(({ badge, title, body }) => (
            <Card key={title} style={{ padding: 28 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: 8,
                  marginBottom: 12,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Caveat', cursive",
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    lineHeight: 1.3,
                  }}
                >
                  {title}
                </span>
                <span style={{ flexShrink: 0 }}>
                  <Badge variant="default" size="sm">
                    {badge}
                  </Badge>
                </span>
              </div>
              <p
                style={{
                  fontSize: "0.92rem",
                  lineHeight: 1.7,
                  color: themeTokens.mutedText,
                  margin: 0,
                }}
              >
                {body}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section
        style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 32px" }}
      >
        <h2
          style={{
            fontFamily: "'Caveat', cursive",
            fontSize: "2.3rem",
            fontWeight: 700,
            textAlign: "center",
            marginBottom: 48,
            color: themeTokens.pageText,
          }}
        >
          What developers are saying
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 28,
          }}
        >
          {[0, 1, 2].map((i) => (
            <Card
              key={i}
              style={{
                padding: 28,
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              <SkeletonText lines={4} />
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Skeleton variant="avatar" height={40} />
                <div style={{ flex: 1 }}>
                  <Skeleton variant="text" width="60%" height={16} />
                  <Skeleton variant="text" width="40%" height={14} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <Divider style={{ maxWidth: 800, margin: "0 auto" }} />

      {/* PREFERENCES PANEL */}
      <section
        style={{
          maxWidth: 720,
          margin: "0 auto",
          padding: "80px 32px",
          background: themeTokens.surfaceBg,
          border: `2px solid ${themeTokens.surfaceBorder}`,
          borderRadius: 32,
          boxShadow: "4px 6px 0px rgba(0,0,0,0.06)",
          transition: "background 240ms ease, border-color 240ms ease",
        }}
      >
        <h2
          style={{
            fontFamily: "'Caveat', cursive",
            fontSize: "2.3rem",
            fontWeight: 700,
            margin: "0 0 12px",
            color: themeTokens.pageText,
          }}
        >
          Make it yours
        </h2>
        <p
          style={{
            color: themeTokens.mutedText,
            lineHeight: 1.75,
            margin: "0 0 40px",
          }}
        >
          Every control below is a live Sketchbook UI component. Tweak them —
          they actually work.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
          <div>
            <p
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: "1.1rem",
                margin: "0 0 10px",
                color: themeTokens.pageText,
              }}
            >
              Interface theme
            </p>
            <Select
              options={[
                { label: "Paper (light)", value: "paper" },
                { label: "Notebook (warm)", value: "notebook" },
                { label: "Blueprint (dark)", value: "blueprint" },
              ]}
              value={theme}
              onChange={(value) => setTheme(value as ThemeName)}
              placeholder="Choose a theme…"
            />
          </div>
          <div>
            <p
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: "1.1rem",
                margin: "0 0 10px",
                color: themeTokens.pageText,
              }}
            >
              Base font size — {fontSize} px
            </p>
            <Tooltip content={`${fontSize} px`} placement="top">
              <div>
                <Slider
                  min={12}
                  max={24}
                  step={1}
                  value={fontSize}
                  onChange={setFontSize}
                />
              </div>
            </Tooltip>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <p
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: "1.1rem",
                margin: "0 0 2px",
                color: themeTokens.pageText,
              }}
            >
              Notifications
            </p>
            <Switch
              label="Email notifications"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
            />
            <Switch
              label="Weekly digest"
              checked={weeklyDigest}
              onChange={(e) => setWeeklyDigest(e.target.checked)}
            />
            <Switch label="Experimental features" disabled />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        style={{
          maxWidth: 740,
          margin: "0 auto",
          padding: "80px 32px",
          background: themeTokens.surfaceBg,
          border: `2px solid ${themeTokens.surfaceBorder}`,
          borderRadius: 32,
          boxShadow: "4px 6px 0px rgba(0,0,0,0.06)",
          transition: "background 240ms ease, border-color 240ms ease",
        }}
      >
        <h2
          style={{
            fontFamily: "'Caveat', cursive",
            fontSize: "2.3rem",
            fontWeight: 700,
            marginBottom: 40,
            color: themeTokens.pageText,
          }}
        >
          Frequently asked questions
        </h2>
        <Accordion>
          <AccordionItem title="Is Sketchbook UI production-ready?">
            <p style={{ lineHeight: 1.75, margin: 0, color: themeTokens.pageText }}>
              It is in beta but stable enough for side projects and non-critical
              production use. We follow semantic versioning, no surprise
              breaking changes. It will soon be ready for production use.
            </p>
          </AccordionItem>
          <AccordionItem title="Does it work with Next.js, Vite, or Remix?">
            <p style={{ lineHeight: 1.75, margin: 0, color: themeTokens.pageText }}>
              Yes. Sketchbook UI is framework-agnostic React. It works with any
              build tool that supports JSX — Vite, Next.js, Remix, Parcel, or a
              plain CRA setup.
            </p>
          </AccordionItem>
          <AccordionItem title="Can I use it without Tailwind CSS?">
            <p style={{ lineHeight: 1.75, margin: 0, color: themeTokens.pageText }}>
              Sketchbook UI ships with its own CSS that has no Tailwind runtime
              dependency. Tailwind is only used internally during library
              development. Your consumers do not need Tailwind installed.
            </p>
          </AccordionItem>
          <AccordionItem title="How do I customise the hand-drawn intensity?">
            <p style={{ lineHeight: 1.75, margin: 0, color: themeTokens.pageText }}>
              Currently, the sketch intensity (wobble and noise) is built into
              the SVG paths and internal primitives to ensure a consistent
              aesthetic. You can toggle the sketchy borders off by passing{" "}
              <code>showBorder={`{false}`}</code>, or completely customise the
              colours using the <code>colors</code> prop.
            </p>
          </AccordionItem>
          <AccordionItem title="Is there a dark mode?">
            <p style={{ lineHeight: 1.75, margin: 0, color: themeTokens.pageText }}>
              Not yet, however, we are aware that it indeed is a necessary
              feature and hence will be added soon. In the meantime you can
              fully override the color tokens to ship your own dark theme.
            </p>
          </AccordionItem>
          <AccordionItem title="How can I use the components right now?">
            <p
              style={{
                lineHeight: 1.75,
                margin: "0 0 12px",
                color: themeTokens.pageText,
              }}
            >
              We are planning to release the npm package in 2 days and the CLI
              package next week. Soon, you will be able to simply install and
              import them directly into your projects!
            </p>
            <p
              style={{
                lineHeight: 1.75,
                margin: 0,
                color: themeTokens.pageText,
              }}
            >
              Until then, you can easily use them by copying the{" "}
              <code>src/components/</code> and <code>src/lib/</code> directories
              directly into your project, along with the{" "}
              <code>src/styles/globals.css</code> file for styling. Don't forget
              to wrap your app in the <code>{"<SketchProvider>"}</code>!
            </p>
          </AccordionItem>
        </Accordion>
      </section>

      {/* NEWSLETTER */}
      <section
        style={{
          background: themeTokens.newsletterBg,
          padding: "80px 32px",
          textAlign: "center",
          transition: "background 240ms ease",
        }}
      >
        <div style={{ maxWidth: 520, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: "2.3rem",
              fontWeight: 700,
              color: themeTokens.newsletterText,
              margin: "0 0 12px",
            }}
          >
            Stay in the loop
          </h2>
          <p
            style={{
              color: themeTokens.newsletterMuted,
              lineHeight: 1.75,
              margin: "0 0 32px",
            }}
          >
            Release notes, new components, and the occasional design tip — no
            more than twice a month. No spam, ever.
          </p>
          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Input
              placeholder="your@email.com"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              style={{ minWidth: 240 }}
            />
            <Button onClick={handleNewsletter}>Subscribe</Button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          padding: "40px 48px",
          background: themeTokens.footerBg,
          transition: "background 240ms ease",
        }}
      >
        <Divider style={{ marginBottom: 32 }} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <img
              src="./logo.png"
              alt="Sketchbook UI Logo"
              style={{ width: "24px", height: "24px", objectFit: "contain" }}
            />
            <span
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: "1.2rem",
                color: themeTokens.footerText,
              }}
            >
              Sketchbook UI · {new Date().getFullYear()}
            </span>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Badge variant="default" size="sm">
              Beta
            </Badge>
            <Badge variant="info" size="sm">
              Built with heart & wobble
            </Badge>
          </div>
        </div>
      </footer>
    </div>
  );
}
