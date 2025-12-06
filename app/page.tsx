"use client";

import { useEffect, useState } from "react";

// 타이핑 효과 컴포넌트
function TypingText({ text, speed = 50 }: { text: string; speed?: number }) {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  // 커서 깜빡임 효과
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span>
      {displayedText}
      <span className={showCursor ? "opacity-100" : "opacity-0"}>_</span>
    </span>
  );
}

// 글리치 효과 컴포넌트
function GlitchText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <span
        className="absolute left-0 top-0 z-0 text-green-400 opacity-80 blur-[1px]"
        style={{
          clipPath: "inset(0 0 0 0)",
          transform: "translate(-2px, 2px)",
          animation: "glitch-1 2s infinite",
        }}
      >
        {children}
      </span>
      <span
        className="absolute left-0 top-0 z-0 text-emerald-400 opacity-80 blur-[1px]"
        style={{
          clipPath: "inset(0 0 0 0)",
          transform: "translate(2px, -2px)",
          animation: "glitch-2 2s infinite",
        }}
      >
        {children}
      </span>
    </span>
  );
}

// 매트릭스 스타일 배경 문자 애니메이션
function MatrixRain() {
  const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
  const [columns, setColumns] = useState<Array<{ id: number; chars: string[]; speeds: number[] }>>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const columnCount = Math.floor(window.innerWidth / 30);
    const newColumns = Array.from({ length: columnCount }, (_, i) => ({
      id: i,
      chars: Array.from({ length: 20 }, () => chars[Math.floor(Math.random() * chars.length)]),
      speeds: Array.from({ length: 20 }, () => Math.random() * 2 + 1),
    }));
    setColumns(newColumns);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden opacity-5 dark:opacity-10">
      {columns.map((column) => (
        <div
          key={column.id}
          className="absolute top-0 font-mono text-green-400"
          style={{
            left: `${(column.id * 100) / columns.length}%`,
            animation: `matrix-fall ${column.speeds[0]}s linear infinite`,
          }}
        >
          {column.chars.map((char, i) => (
            <div
              key={i}
              className="text-xs"
              style={{
                animationDelay: `${i * 0.1}s`,
                opacity: 1 - i * 0.05,
              }}
            >
              {char}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// 터미널 스타일 코드 스니펫
function TerminalCode({ code, delay = 0 }: { code: string; delay?: number }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`font-mono text-xs text-green-400 transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <span className="text-emerald-500">$</span> {code}
    </div>
  );
}

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:from-black dark:via-zinc-950 dark:to-zinc-900">
      {/* 매트릭스 배경 */}
      <MatrixRain />
      
      {/* 스캔라인 효과 */}
      <div className="pointer-events-none fixed inset-0 z-50">
        <div
          className="h-1 w-full bg-gradient-to-b from-green-400/20 to-transparent"
          style={{
            animation: "scan-line 8s linear infinite",
          }}
        ></div>
      </div>

      {/* 히어로 섹션 */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* 터미널 스타일 코드 스니펫 */}
          <div className="mb-8 space-y-2 font-mono">
            <TerminalCode code="whoami" delay={500} />
            <TerminalCode code="cat /etc/passwd | grep peka" delay={1000} />
            <TerminalCode code="nmap -sS -O localhost" delay={1500} />
          </div>

          {/* 메인 타이틀 */}
          <div className={`mb-12 text-center transition-opacity duration-1000 ${mounted ? "opacity-100" : "opacity-0"}`}>
            <h1 className="mb-4 font-mono text-6xl font-bold tracking-tight text-black dark:text-white sm:text-7xl lg:text-8xl">
              <GlitchText>
                <span className="dark:text-green-400" style={{ animation: "neon-pulse 2s ease-in-out infinite" }}>
                  PEKA
                </span>
              </GlitchText>
            </h1>
            <div className="mb-6 inline-block rounded-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 px-6 py-2 text-sm font-semibold text-white shadow-lg">
              <span className="animate-pulse">⚡</span> Ethical Hacker & Security Researcher
            </div>
            <p className="mx-auto max-w-2xl font-mono text-xl leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-2xl">
              <TypingText text="보안을 통해 세상을 더 안전하게 만드는 것을 목표로 하는" speed={30} />
              <br className="hidden sm:block" />
              <span className="font-semibold text-black dark:text-white dark:text-green-400">
                <TypingText text="윤리적 해커" speed={50} />
              </span>
              <TypingText text="입니다." speed={50} />
            </p>
          </div>

          {/* 프로필 카드 */}
          <div className={`mb-16 transition-all duration-1000 delay-300 ${mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            <div
              className="rounded-2xl border border-zinc-200 bg-white/80 p-8 shadow-xl backdrop-blur-sm dark:border-green-500/30 dark:bg-zinc-900/80 sm:p-12"
              style={{
                animation: "hack-glow 3s ease-in-out infinite",
              }}
            >
              <div className="grid gap-8 md:grid-cols-2">
                {/* 소개 */}
                <div>
                  <h2 className="mb-4 font-mono text-2xl font-bold text-black dark:text-green-400">
                    <GlitchText>About</GlitchText>
                  </h2>
                  <p className="font-mono leading-relaxed text-zinc-700 dark:text-zinc-300">
                    보안 취약점을 발견하고 수정하여 디지털 세계를 더 안전하게 만드는 것을
                    사명으로 삼고 있습니다. 다양한 보안 연구와 윤리적 해킹 프로젝트를 통해
                    기업과 개인의 보안을 강화하는 데 기여하고 있습니다.
                  </p>
                </div>

                {/* 전문 분야 */}
                <div>
                  <h2 className="mb-4 font-mono text-2xl font-bold text-black dark:text-green-400">
                    <GlitchText>Expertise</GlitchText>
                  </h2>
                  <ul className="space-y-2 font-mono text-zinc-700 dark:text-zinc-300">
                    <li className="flex items-center gap-2 transition-all hover:text-green-500 dark:hover:text-green-400">
                      <span className="text-green-500 animate-pulse">[+]</span>
                      Penetration Testing
                    </li>
                    <li className="flex items-center gap-2 transition-all hover:text-green-500 dark:hover:text-green-400">
                      <span className="text-green-500 animate-pulse">[+]</span>
                      Vulnerability Assessment
                    </li>
                    <li className="flex items-center gap-2 transition-all hover:text-green-500 dark:hover:text-green-400">
                      <span className="text-green-500 animate-pulse">[+]</span>
                      Security Research
                    </li>
                    <li className="flex items-center gap-2 transition-all hover:text-green-500 dark:hover:text-green-400">
                      <span className="text-green-500 animate-pulse">[+]</span>
                      Bug Bounty Hunting
                    </li>
                    <li className="flex items-center gap-2 transition-all hover:text-green-500 dark:hover:text-green-400">
                      <span className="text-green-500 animate-pulse">[+]</span>
                      Security Consulting
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 사이버 보안 가이드 - 정보성 컨텐츠 */}
          <div className={`mb-16 transition-all duration-1000 delay-400 ${mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            <div className="rounded-2xl border border-zinc-200 bg-white/80 p-8 shadow-xl backdrop-blur-sm dark:border-green-500/30 dark:bg-zinc-900/80 sm:p-12">
              <h2 className="mb-6 font-mono text-3xl font-bold text-black dark:text-green-400">
                <GlitchText>사이버 보안 기초 가이드</GlitchText>
              </h2>
              <div className="space-y-6 font-mono leading-relaxed text-zinc-700 dark:text-zinc-300">
                <div>
                  <h3 className="mb-3 text-xl font-bold text-black dark:text-white dark:text-green-400">
                    사이버 보안이란 무엇인가요?
                  </h3>
                  <p className="mb-4">
                    사이버 보안은 컴퓨터 시스템, 네트워크, 데이터를 보호하기 위한 실천 방법과 기술을 의미합니다. 
                    디지털 시대에 개인 정보, 금융 데이터, 기업 기밀 등 중요한 정보들이 인터넷을 통해 전송되고 저장되면서, 
                    이러한 정보를 보호하는 것이 점점 더 중요해지고 있습니다. 사이버 보안은 해커, 바이러스, 악성 소프트웨어 등 
                    다양한 위협으로부터 디지털 자산을 보호하는 종합적인 접근 방식을 포함합니다.
                  </p>
                </div>
                
                <div>
                  <h3 className="mb-3 text-xl font-bold text-black dark:text-white dark:text-green-400">
                    일반적인 사이버 위협 유형
                  </h3>
                  <p className="mb-4">
                    오늘날 가장 흔한 사이버 위협 중 하나는 피싱 공격입니다. 피싱은 악의적인 이메일이나 메시지를 통해 
                    개인 정보를 탈취하려는 시도입니다. 랜섬웨어는 컴퓨터의 파일을 암호화하고 몸값을 요구하는 악성 소프트웨어로, 
                    기업과 개인 모두에게 심각한 피해를 줄 수 있습니다. 또한 DDoS 공격은 서버에 과도한 트래픽을 보내 
                    정상적인 서비스를 방해하는 공격입니다. 소셜 엔지니어링은 사람의 심리적 약점을 이용해 보안 정보를 얻는 기법으로, 
                    기술적 결함보다 인간의 실수를 노린다는 점에서 더욱 교묘합니다.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-bold text-black dark:text-white dark:text-green-400">
                    개인을 위한 보안 실천 방법
                  </h3>
                  <p className="mb-4">
                    강력한 비밀번호 사용은 사이버 보안의 첫 번째 단계입니다. 최소 12자 이상의 복잡한 비밀번호를 사용하고, 
                    여러 계정에 동일한 비밀번호를 사용하지 않는 것이 중요합니다. 패스워드 매니저를 활용하면 안전하게 비밀번호를 관리할 수 있습니다. 
                    또한 2단계 인증(2FA)을 활성화하면 계정 보안을 크게 향상시킬 수 있습니다. 정기적인 소프트웨어 업데이트는 보안 패치를 적용하여 
                    알려진 취약점을 수정하므로 매우 중요합니다. 의심스러운 이메일이나 링크를 클릭하지 않고, 
                    공용 Wi-Fi에서는 VPN을 사용하는 것도 좋은 보안 습관입니다.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-bold text-black dark:text-white dark:text-green-400">
                    윤리적 해킹의 중요성
                  </h3>
                  <p className="mb-4">
                    윤리적 해킹은 합법적이고 합의된 범위 내에서 시스템의 보안 취약점을 찾아내는 과정입니다. 
                    악의적인 해커가 이용하기 전에 보안 취약점을 발견하고 수정함으로써 실제 피해를 예방할 수 있습니다. 
                    침투 테스트(Penetration Testing)는 시스템의 보안을 평가하는 체계적인 방법으로, 
                    기업들이 자신의 보안 수준을 파악하고 개선할 수 있도록 돕습니다. 버그 바운티 프로그램은 
                    보안 연구자들이 취약점을 발견하고 보고하면 보상을 제공하는 제도로, 
                    전 세계의 보안 전문가들과 협력하여 더 안전한 디지털 환경을 만들고 있습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 기술 스택 */}
          <div className={`mb-16 transition-all duration-1000 delay-500 ${mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            <h2 className="mb-6 text-center font-mono text-3xl font-bold text-black dark:text-white">
              <GlitchText>
                <span className="dark:text-green-400">Skills & Tools</span>
              </GlitchText>
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {[
                "Kali Linux",
                "Metasploit",
                "Burp Suite",
                "Wireshark",
                "Nmap",
                "OWASP",
                "Python",
                "JavaScript",
                "C/C++",
                "Go",
                "Docker",
                "Kubernetes",
              ].map((skill, index) => (
                <div
                  key={skill}
                  className="group rounded-lg border border-zinc-200 bg-white/60 p-4 text-center font-mono transition-all hover:scale-105 hover:border-green-500 hover:bg-green-50 hover:shadow-lg hover:shadow-green-500/50 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-green-500 dark:hover:bg-green-950/20 dark:hover:shadow-green-500/30"
                  style={{
                    transitionDelay: `${index * 50}ms`,
                    animation: mounted ? `hack-glow 3s ease-in-out infinite ${index * 0.2}s` : "none",
                  }}
                >
                  <span className="font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-green-600 dark:group-hover:text-green-400">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 주요 성과 */}
          <div className={`mb-16 transition-all duration-1000 delay-700 ${mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            <h2 className="mb-6 text-center font-mono text-3xl font-bold text-black dark:text-white">
              <GlitchText>
                <span className="dark:text-green-400">Achievements</span>
              </GlitchText>
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "보안 취약점 발견",
                  description: "다수의 기업에서 중요한 보안 취약점을 발견하고 보고",
                  icon: "🔒",
                },
                {
                  title: "버그 바운티",
                  description: "HackerOne, Bugcrowd 등에서 활발한 활동",
                  icon: "🏆",
                },
                {
                  title: "보안 연구",
                  description: "최신 보안 위협과 방어 기법에 대한 지속적인 연구",
                  icon: "🔬",
                },
              ].map((achievement, index) => (
                <div
                  key={achievement.title}
                  className="rounded-xl border border-zinc-200 bg-white/80 p-6 font-mono shadow-lg transition-all hover:scale-105 hover:border-green-500 hover:shadow-xl hover:shadow-green-500/30 dark:border-zinc-800 dark:bg-zinc-900/80 dark:hover:border-green-500"
                  style={{
                    animation: `hack-glow 4s ease-in-out infinite ${index * 0.3}s`,
                  }}
                >
                  <div className="mb-3 text-4xl">{achievement.icon}</div>
                  <h3 className="mb-2 text-xl font-bold text-black dark:text-white dark:text-green-400">
                    {achievement.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400">{achievement.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 연락처 */}
          <div className={`text-center transition-all duration-1000 delay-1000 ${mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            <h2 className="mb-6 font-mono text-3xl font-bold text-black dark:text-white">
              <GlitchText>
                <span className="dark:text-green-400">Get in Touch</span>
              </GlitchText>
            </h2>
            <p className="mb-8 text-lg text-zinc-600 dark:text-zinc-400">
              보안 관련 문의나 협업 제안을 환영합니다.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { name: "GitHub", href: "#", icon: "💻" },
                { name: "LinkedIn", href: "#", icon: "💼" },
                { name: "Email", href: "mailto:contact@peka.dev", icon: "📧" },
                { name: "Blog", href: "#", icon: "📝" },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="group flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-6 py-3 font-mono font-medium text-zinc-800 transition-all hover:border-green-500 hover:bg-green-50 hover:text-green-700 hover:shadow-lg hover:shadow-green-500/50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-green-500 dark:hover:bg-green-950/20 dark:hover:text-green-400 dark:hover:shadow-green-500/30"
                  style={{
                    animation: "hack-glow 3s ease-in-out infinite",
                  }}
                >
                  <span>{link.icon}</span>
                  <span>{link.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* 배경 장식 요소 */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-gradient-to-br from-green-400/20 to-emerald-400/20 blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-gradient-to-tr from-teal-400/20 to-cyan-400/20 blur-3xl"></div>
        </div>
      </section>
    </div>
  );
}
