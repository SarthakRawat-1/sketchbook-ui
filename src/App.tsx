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

const THEME_STYLES = {
  paper: {
    pageBg: "#faf7f0",
    pageText: "#2a2a2a",
    surfaceBg: "#faf7f0",
    surfaceAlt: "#fffdf8",
    border: "#e8e0d0",
  },
  notebook: {
    pageBg: "#f7f4ee",
    pageText: "#282420",
    surfaceBg: "#f7f4ee",
    surfaceAlt: "#fffef8",
    border: "#ddd5c6",
  },
  blueprint: {
    pageBg: "#172033",
    pageText: "#edf4ff",
    surfaceBg: "#1c2840",
    surfaceAlt: "#22314d",
    border: "#31496f",
  },
} as const;

export default function App() {
  const [theme, setTheme] = useState<keyof typeof THEME_STYLES>("paper");
  const [fontSize, setFontSize] = useState(16);
  const [wobble, setWobble] = useState(0.6);
  const [shadow, setShadow] = useState(0.55);
  const [noise, setNoise] = useState(0.2);
  const [strokeWeight, setStrokeWeight] = useState(2.2);
  const [notifications, setNotifications] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);

  const [newsletterEmail, setNewsletterEmail] = useState("");

  const { toasts, showToast, dismissToast } = useToast();
  const themeStyles = THEME_STYLES[theme];
  const wobbleDeg = (wobble - 0.5) * 1.8;
  const shadowStrength = 0.12 + shadow * 0.14;
  const noiseOpacity = 0.04 + noise * 0.18;
  const previewFrameStyle = {
    transform: `rotate(${wobbleDeg}deg)`,
    filter: `drop-shadow(${3 + shadow * 5}px ${4 + shadow * 6}px ${6 + shadow * 16}px rgba(0, 0, 0, ${shadowStrength}))`,
  } as const;

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
      style={{ minHeight: "100vh", background: "#faf7f0", color: "#2a2a2a" }}
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
          background: "#faf7f0",
          borderBottom: "2px solid #e8e0d0",
          position: "sticky",
          top: 0,
          zIndex: 100,
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
            color: "#1a1a1a",
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
            color: "#6b6460",
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
                  color: "#8a8078",
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
                  color: "#6b6460",
                  margin: 0,
                }}
              >
                {body}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* PLAYGROUND */}
      <section
        style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px 88px" }}
      >
        <h2
          style={{
            fontFamily: "'Caveat', cursive",
            fontSize: "2.3rem",
            fontWeight: 700,
            textAlign: "center",
            marginBottom: 16,
          }}
        >
          Sketch Intensity Playground
        </h2>
        <p
          style={{
            textAlign: "center",
            maxWidth: 760,
            margin: "0 auto 40px",
            lineHeight: 1.75,
            color: themeStyles.pageText,
            opacity: 0.74,
          }}
        >
          Tune the wobble, stroke, shadow, and paper noise in real time to see
          how the library feels when the sketch energy moves up or down.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(280px, 360px) minmax(0, 1fr)",
            gap: 28,
            alignItems: "start",
          }}
        >
          <Card style={{ padding: 28 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                marginBottom: 24,
              }}
            >
              <span
                style={{
                  fontFamily: "'Caveat', cursive",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                }}
              >
                Control panel
              </span>
              <Button
                size="sm"
                onClick={() => {
                  setWobble(0.6);
                  setShadow(0.55);
                  setNoise(0.2);
                  setStrokeWeight(2.2);
                }}
              >
                Reset
              </Button>
            </div>

            <div style={{ display: "grid", gap: 24 }}>
              <div>
                <p style={{ margin: "0 0 10px", color: "#5a5248" }}>
                  Wobble intensity
                </p>
                <Slider min={0} max={1} step={0.01} value={wobble} onChange={setWobble} />
              </div>
              <div>
                <p style={{ margin: "0 0 10px", color: "#5a5248" }}>
                  Shadow roughness
                </p>
                <Slider min={0} max={1} step={0.01} value={shadow} onChange={setShadow} />
              </div>
              <div>
                <p style={{ margin: "0 0 10px", color: "#5a5248" }}>
                  Paper noise
                </p>
                <Slider min={0} max={1} step={0.01} value={noise} onChange={setNoise} />
              </div>
              <div>
                <p style={{ margin: "0 0 10px", color: "#5a5248" }}>
                  Stroke thickness
                </p>
                <Slider
                  min={1.2}
                  max={4}
                  step={0.1}
                  value={strokeWeight}
                  onChange={setStrokeWeight}
                />
              </div>
            </div>
          </Card>

          <div style={{ display: "grid", gap: 24 }}>
            <Card style={{ padding: 28 }}>
              <div
                style={{
                  ...previewFrameStyle,
                  background: `linear-gradient(135deg, rgba(255,255,255,${noiseOpacity}), rgba(255,255,255,${noiseOpacity / 2}))`,
                  border: `${strokeWeight}px solid ${themeStyles.border}`,
                  borderRadius: 24,
                  padding: 24,
                  display: "grid",
                  gap: 18,
                }}
              >
                <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                  <Button
                    size="md"
                    style={{
                      transform: `rotate(${wobbleDeg * 0.6}deg)`,
                      filter: `drop-shadow(${2 + shadow * 3}px ${3 + shadow * 4}px ${5 + shadow * 8}px rgba(0,0,0,${shadowStrength}))`,
                    }}
                  >
                    Live button
                  </Button>
                  <div
                    style={{
                      transform: `rotate(${-wobbleDeg * 0.5}deg)`,
                      boxShadow: `0 0 0 ${strokeWeight - 1}px ${themeStyles.border}`,
                      borderRadius: 999,
                    }}
                  >
                    <Badge variant="info" size="sm">
                      {strokeWeight.toFixed(1)} px stroke
                    </Badge>
                  </div>
                </div>
                <Input
                  label="Preview note"
                  defaultValue="This is what the texture feels like."
                  style={{
                    width: "100%",
                    maxWidth: 420,
                    transform: `rotate(${wobbleDeg * 0.35}deg)`,
                  }}
                />
              </div>
            </Card>

            <Card style={{ padding: 28 }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: 16,
                }}
              >
                {[
                  ["Wobble", `${(wobble * 100).toFixed(0)}%`],
                  ["Shadow", `${(shadow * 100).toFixed(0)}%`],
                  ["Noise", `${(noise * 100).toFixed(0)}%`],
                  ["Stroke", `${strokeWeight.toFixed(1)} px`],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    style={{
                      padding: 16,
                      border: `2px dashed ${themeStyles.border}`,
                      borderRadius: 18,
                      background: themeStyles.surfaceAlt,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Caveat', cursive",
                        fontSize: "1.3rem",
                        fontWeight: 700,
                        marginBottom: 4,
                      }}
                    >
                      {label}
                    </div>
                    <div style={{ opacity: 0.75 }}>{value}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
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
        style={{ maxWidth: 720, margin: "0 auto", padding: "80px 32px" }}
      >
        <h2
          style={{
            fontFamily: "'Caveat', cursive",
            fontSize: "2.3rem",
            fontWeight: 700,
            margin: "0 0 12px",
          }}
        >
          Make it yours
        </h2>
        <p style={{ color: "#6b6460", lineHeight: 1.75, margin: "0 0 40px" }}>
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
                color: "#5a5248",
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
              defaultValue={theme}
              onChange={(value) =>
                setTheme(value as keyof typeof THEME_STYLES)
              }
              placeholder="Choose a theme…"
            />
          </div>
          <div>
            <p
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: "1.1rem",
                margin: "0 0 10px",
                color: "#5a5248",
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
                color: "#5a5248",
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
        style={{ maxWidth: 740, margin: "0 auto", padding: "80px 32px" }}
      >
        <h2
          style={{
            fontFamily: "'Caveat', cursive",
            fontSize: "2.3rem",
            fontWeight: 700,
            marginBottom: 40,
          }}
        >
          Frequently asked questions
        </h2>
        <Accordion>
          <AccordionItem title="Is Sketchbook UI production-ready?">
            <p style={{ lineHeight: 1.75, margin: 0 }}>
              It is in beta but stable enough for side projects and non-critical
              production use. We follow semantic versioning, no surprise
              breaking changes. It will soon be ready for production use.
            </p>
          </AccordionItem>
          <AccordionItem title="Does it work with Next.js, Vite, or Remix?">
            <p style={{ lineHeight: 1.75, margin: 0 }}>
              Yes. Sketchbook UI is framework-agnostic React. It works with any
              build tool that supports JSX — Vite, Next.js, Remix, Parcel, or a
              plain CRA setup.
            </p>
          </AccordionItem>
          <AccordionItem title="Can I use it without Tailwind CSS?">
            <p style={{ lineHeight: 1.75, margin: 0 }}>
              Sketchbook UI ships with its own CSS that has no Tailwind runtime
              dependency. Tailwind is only used internally during library
              development. Your consumers do not need Tailwind installed.
            </p>
          </AccordionItem>
          <AccordionItem title="How do I customise the hand-drawn intensity?">
            <p style={{ lineHeight: 1.75, margin: 0 }}>
              Currently, the sketch intensity (wobble and noise) is built into
              the SVG paths and internal primitives to ensure a consistent
              aesthetic. You can toggle the sketchy borders off by passing{" "}
              <code>showBorder={`{false}`}</code>, or completely customise the
              colours using the <code>colors</code> prop.
            </p>
          </AccordionItem>
          <AccordionItem title="Is there a dark mode?">
            <p style={{ lineHeight: 1.75, margin: 0 }}>
              Not yet, however, we are aware that it indeed is a necessary
              feature and hence will be added soon. In the meantime you can
              fully override the color tokens to ship your own dark theme.
            </p>
          </AccordionItem>
          <AccordionItem title="How can I use the components right now?">
            <p style={{ lineHeight: 1.75, margin: "0 0 12px" }}>
              We are planning to release the npm package in 2 days and the CLI
              package next week. Soon, you will be able to simply install and
              import them directly into your projects!
            </p>
            <p style={{ lineHeight: 1.75, margin: 0 }}>
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
          background: "#2a2a2a",
          padding: "80px 32px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 520, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: "2.3rem",
              fontWeight: 700,
              color: "#faf7f0",
              margin: "0 0 12px",
            }}
          >
            Stay in the loop
          </h2>
          <p style={{ color: "#a09890", lineHeight: 1.75, margin: "0 0 32px" }}>
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
      <footer style={{ padding: "40px 48px", background: "#faf7f0" }}>
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
                color: "#5a5248",
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
