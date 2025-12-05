"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:from-black dark:via-zinc-950 dark:to-zinc-900">
      {/* 히어로 섹션 */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* 메인 타이틀 */}
          <div className={`mb-12 text-center transition-opacity duration-1000 ${mounted ? "opacity-100" : "opacity-0"}`}>
            <h1 className="mb-4 text-6xl font-bold tracking-tight text-black dark:text-white sm:text-7xl lg:text-8xl">
              PEKA
            </h1>
            <div className="mb-6 inline-block rounded-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 px-6 py-2 text-sm font-semibold text-white shadow-lg">
              <span className="animate-pulse">⚡</span> Ethical Hacker & Security Researcher
            </div>
            <p className="mx-auto max-w-2xl text-xl leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-2xl">
              보안을 통해 세상을 더 안전하게 만드는 것을 목표로 하는
              <br className="hidden sm:block" />
              <span className="font-semibold text-black dark:text-white">윤리적 해커</span>입니다.
            </p>
          </div>

          {/* 프로필 카드 */}
          <div className={`mb-16 transition-all duration-1000 delay-300 ${mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            <div className="rounded-2xl border border-zinc-200 bg-white/80 p-8 shadow-xl backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/80 sm:p-12">
              <div className="grid gap-8 md:grid-cols-2">
                {/* 소개 */}
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">About</h2>
                  <p className="leading-relaxed text-zinc-700 dark:text-zinc-300">
                    보안 취약점을 발견하고 수정하여 디지털 세계를 더 안전하게 만드는 것을
                    사명으로 삼고 있습니다. 다양한 보안 연구와 윤리적 해킹 프로젝트를 통해
                    기업과 개인의 보안을 강화하는 데 기여하고 있습니다.
                  </p>
                </div>

                {/* 전문 분야 */}
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">Expertise</h2>
                  <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      Penetration Testing
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      Vulnerability Assessment
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      Security Research
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      Bug Bounty Hunting
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      Security Consulting
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 기술 스택 */}
          <div className={`mb-16 transition-all duration-1000 delay-500 ${mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            <h2 className="mb-6 text-center text-3xl font-bold text-black dark:text-white">
              Skills & Tools
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
                  className="group rounded-lg border border-zinc-200 bg-white/60 p-4 text-center transition-all hover:scale-105 hover:border-green-500 hover:bg-green-50 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:bg-green-950/20"
                  style={{
                    transitionDelay: `${index * 50}ms`,
                  }}
                >
                  <span className="font-medium text-zinc-800 dark:text-zinc-200">{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 주요 성과 */}
          <div className={`mb-16 transition-all duration-1000 delay-700 ${mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            <h2 className="mb-6 text-center text-3xl font-bold text-black dark:text-white">
              Achievements
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
                  className="rounded-xl border border-zinc-200 bg-white/80 p-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900/80"
                >
                  <div className="mb-3 text-4xl">{achievement.icon}</div>
                  <h3 className="mb-2 text-xl font-bold text-black dark:text-white">
                    {achievement.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400">{achievement.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 연락처 */}
          <div className={`text-center transition-all duration-1000 delay-1000 ${mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            <h2 className="mb-6 text-3xl font-bold text-black dark:text-white">Get in Touch</h2>
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
                  className="group flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-6 py-3 font-medium text-zinc-800 transition-all hover:border-green-500 hover:bg-green-50 hover:text-green-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-green-500 dark:hover:bg-green-950/20 dark:hover:text-green-400"
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
