"use client";

import React, { useEffect, useState } from "react";

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

// 해커 코드 회피 게임
function HackerGame() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [playerX, setPlayerX] = useState(50); // 화면 중앙 (퍼센트)
  const [codes, setCodes] = useState<Array<{ id: number; x: number; y: number; text: string }>>([]);
  const [rankings, setRankings] = useState<Array<{ score: number; date: string }>>([]);
  const gameRef = React.useRef<HTMLDivElement>(null);
  const animationFrameRef = React.useRef<number | undefined>(undefined);
  const lastTimeRef = React.useRef<number>(0);

  // 로컬 스토리지에서 랭킹 불러오기
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("hackerGameRankings");
      if (saved) {
        setRankings(JSON.parse(saved));
      }
    }
  }, []);

  // 코드 생성 함수
  const generateCode = () => {
    const codeTexts = [
      "hack()", "exploit", "vulnerability", "malware", "trojan",
      "phishing", "ddos", "sql_injection", "xss", "csrf",
      "rootkit", "backdoor", "keylogger", "ransomware", "botnet"
    ];
    return {
      id: Date.now() + Math.random(),
      x: Math.random() * 80 + 10, // 10%~90% 범위
      y: -5,
      text: codeTexts[Math.floor(Math.random() * codeTexts.length)]
    };
  };

  // 게임 시작
  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setPlayerX(50);
    setCodes([]);
    lastTimeRef.current = Date.now();
  };

  // 게임 종료
  const endGame = () => {
    setGameOver(true);
    setGameStarted(false);
    
    // 랭킹 저장
    if (typeof window !== "undefined") {
      const newRankings = [...rankings, { score, date: new Date().toLocaleDateString() }]
        .sort((a, b) => b.score - a.score)
        .slice(0, 10); // 상위 10개만 저장
      setRankings(newRankings);
      localStorage.setItem("hackerGameRankings", JSON.stringify(newRankings));
    }
  };

  // 키보드 입력 처리
  useEffect(() => {
    if (!gameStarted) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        setPlayerX((prev) => Math.max(10, prev - 5));
      } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        setPlayerX((prev) => Math.min(90, prev + 5));
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [gameStarted]);

  // 게임 루프
  useEffect(() => {
    if (!gameStarted) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    const gameLoop = () => {
      const now = Date.now();
      const deltaTime = now - lastTimeRef.current;
      
      // 1초마다 점수 증가
      if (deltaTime >= 1000) {
        setScore((prev) => prev + 1);
        lastTimeRef.current = now;
      }

      // 코드 생성 (랜덤하게)
      if (Math.random() < 0.05) {
        setCodes((prev) => [...prev, generateCode()]);
      }

      // 코드 이동
      setCodes((prev) =>
        prev
          .map((code) => ({
            ...code,
            y: code.y + 2 + score * 0.01, // 점수에 따라 속도 증가
          }))
          .filter((code) => {
            // 충돌 검사
            const playerLeft = playerX - 5;
            const playerRight = playerX + 5;
            const codeLeft = code.x;
            const codeRight = code.x + 10;
            const playerTop = 85;
            const playerBottom = 95;
            const codeTop = code.y;
            const codeBottom = code.y + 5;

            if (
              codeTop < playerBottom &&
              codeBottom > playerTop &&
              codeLeft < playerRight &&
              codeRight > playerLeft
            ) {
              endGame();
              return false;
            }

            // 화면 밖으로 나간 코드 제거
            return code.y < 100;
          })
      );

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameStarted, score, playerX]);

  return (
    <div className="mb-16 rounded-2xl border border-zinc-200 bg-white/80 p-8 shadow-xl backdrop-blur-sm dark:border-green-500/30 dark:bg-zinc-900/80 sm:p-12">
      <h2 className="mb-6 text-center font-mono text-3xl font-bold text-black dark:text-green-400">
        <GlitchText>플레이</GlitchText>
      </h2>
      
      {!gameStarted && !gameOver && (
        <div className="text-center">
          <p className="mb-6 font-mono text-zinc-700 dark:text-zinc-300">
            해커의 코드를 피하세요! 좌우 화살표 키 또는 A/D 키로 이동합니다.
          </p>
          <button
            onClick={startGame}
            className="rounded-full border border-green-500 bg-green-500 px-8 py-3 font-mono font-bold text-white transition-all hover:bg-green-600 hover:shadow-lg hover:shadow-green-500/50 dark:bg-green-600 dark:hover:bg-green-500"
          >
            게임 시작
          </button>
        </div>
      )}

      {gameOver && (
        <div className="text-center">
          <p className="mb-4 font-mono text-2xl font-bold text-red-500">
            게임 오버!
          </p>
          <p className="mb-6 font-mono text-xl text-zinc-700 dark:text-zinc-300">
            점수: {score}점
          </p>
          <button
            onClick={startGame}
            className="rounded-full border border-green-500 bg-green-500 px-8 py-3 font-mono font-bold text-white transition-all hover:bg-green-600 hover:shadow-lg hover:shadow-green-500/50 dark:bg-green-600 dark:hover:bg-green-500"
          >
            다시 시작
          </button>
        </div>
      )}

      {gameStarted && (
        <div className="space-y-4">
          <div className="flex justify-between font-mono text-lg text-zinc-700 dark:text-zinc-300">
            <span>점수: {score}</span>
            <span>생존 시간: {Math.floor(score)}초</span>
          </div>
          <div
            ref={gameRef}
            className="relative h-96 overflow-hidden rounded-lg border-2 border-green-500/50 bg-zinc-950"
            style={{ minHeight: "400px" }}
          >
            {/* 떨어지는 코드들 */}
            {codes.map((code) => (
              <div
                key={code.id}
                className="absolute font-mono text-xs text-red-500"
                style={{
                  left: `${code.x}%`,
                  top: `${code.y}%`,
                  textShadow: "0 0 10px rgba(239, 68, 68, 0.8)",
                }}
              >
                {code.text}
              </div>
            ))}

            {/* 플레이어 */}
            <div
              className="absolute bottom-4 font-mono text-lg text-green-400 transition-all"
              style={{
                left: `${playerX}%`,
                transform: "translateX(-50%)",
                textShadow: "0 0 20px rgba(34, 197, 94, 1)",
              }}
            >
              &gt;_&lt;
            </div>

            {/* 안내 텍스트 */}
            <div className="absolute left-4 top-4 font-mono text-xs text-zinc-500">
              좌우 화살표 키 또는 A/D로 이동
            </div>
          </div>
        </div>
      )}

      {/* 랭킹 */}
      {rankings.length > 0 && (
        <div className="mt-8">
          <h3 className="mb-4 font-mono text-xl font-bold text-black dark:text-green-400">
            랭킹
          </h3>
          <div className="space-y-2">
            {rankings.slice(0, 5).map((ranking, index) => (
              <div
                key={index}
                className="flex justify-between rounded-lg border border-zinc-300 bg-white/60 p-3 font-mono text-sm dark:border-zinc-700 dark:bg-zinc-800/60"
              >
                <span className="text-zinc-700 dark:text-zinc-300">
                  {index + 1}위
                </span>
                <span className="font-bold text-green-600 dark:text-green-400">
                  {ranking.score}점
                </span>
                <span className="text-xs text-zinc-500">
                  {ranking.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
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
                { name: "GitHub", href: "https://github.com/peka1011-dev/peka-vibecoding", icon: "💻" },
                { name: "Blog", href: "https://butter0057.tistory.com/", icon: "📝" },
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

          {/* 플레이 게임 */}
          <div className={`transition-all duration-1000 delay-1100 ${mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            <HackerGame />
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
