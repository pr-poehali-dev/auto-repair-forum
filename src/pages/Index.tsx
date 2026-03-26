import { useState } from "react";
import Icon from "@/components/ui/icon";

const BRANDS = [
  { id: "vaz", name: "ВАЗ / Lada", icon: "🚗", topics: 1243 },
  { id: "toyota", name: "Toyota", icon: "🚙", topics: 987 },
  { id: "bmw", name: "BMW", icon: "🏎️", topics: 756 },
  { id: "mercedes", name: "Mercedes", icon: "🚘", topics: 634 },
  { id: "kia", name: "KIA / Hyundai", icon: "🚕", topics: 521 },
  { id: "ford", name: "Ford", icon: "🛻", topics: 412 },
];

const CATEGORIES = [
  { id: "engine", name: "Двигатель", icon: "Settings", topics: 2341, desc: "Замена масла, ремонт ГРМ, турбины" },
  { id: "suspension", name: "Ходовая часть", icon: "Gauge", topics: 1876, desc: "Амортизаторы, рулевая, подшипники" },
  { id: "body", name: "Кузов и ЛКП", icon: "Shield", topics: 1432, desc: "Антикор, покраска, рихтовка" },
  { id: "electrics", name: "Электрика", icon: "Zap", topics: 1098, desc: "Проводка, диагностика, ЭБУ" },
  { id: "transmission", name: "КПП и АКПП", icon: "Cog", topics: 876, desc: "Ремонт коробки, замена масла" },
  { id: "tires", name: "Шины и диски", icon: "Circle", topics: 654, desc: "Выбор резины, балансировка" },
];

const RECENT_TOPICS = [
  { id: 1, title: "Стук в двигателе ВАЗ 2114 — что это?", author: "Михаил К.", time: "5 мин назад", replies: 12, views: 234, hot: true },
  { id: 2, title: "Замена амортизаторов Toyota Camry V50 своими руками", author: "Сергей Т.", time: "23 мин назад", replies: 8, views: 187, hot: false },
  { id: 3, title: "BMW E46 — расход 18л/100км, ищу причину", author: "Антон П.", time: "1 час назад", replies: 31, views: 512, hot: true },
  { id: 4, title: "Покраска бампера Mercedes C200 — цвет 040", author: "Ирина В.", time: "2 часа назад", replies: 5, views: 98, hot: false },
  { id: 5, title: "АКПП Hyundai Sonata — дёргается при переключении", author: "Дмитрий Л.", time: "3 часа назад", replies: 17, views: 341, hot: false },
];

const INITIAL_MESSAGES = [
  { id: 1, user: "МастерСаня", avatar: "М", color: "#f97316", time: "14:22", text: "Всем привет! Кто знает, где в Москве хорошо делают турбины на BMW?" },
  { id: 2, user: "АвтоКот", avatar: "А", color: "#3b82f6", time: "14:24", text: "На Нагатинской есть хороший сервис, брал там — доволен" },
  { id: 3, user: "Вован76", avatar: "В", color: "#22c55e", time: "14:25", text: "Ребят, а кто перебирал ВАЗовский мотор? Сколько берут за работу в 2025?" },
  { id: 4, user: "МастерСаня", avatar: "М", color: "#f97316", time: "14:27", text: "Вован, у нас в городе около 15-20к за полный перебор. Смотря что менять" },
  { id: 5, user: "ТехникПро", avatar: "Т", color: "#a855f7", time: "14:31", text: "Всем рекомендую диагностику делать перед ремонтом, экономит деньги!" },
];

type View = "main" | "category" | "chat";

export default function Index() {
  const [activeView, setActiveView] = useState<View>("main");
  const [activeBrand, setActiveBrand] = useState<string | null>(null);
  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState(INITIAL_MESSAGES);

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      user: "Вы",
      avatar: "Я",
      color: "#f97316",
      time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }),
      text: chatMessage.trim(),
    }]);
    setChatMessage("");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Фоновые свечения */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-5" style={{ background: "radial-gradient(circle, #f97316 0%, transparent 70%)" }} />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full opacity-5" style={{ background: "radial-gradient(circle, #fb923c 0%, transparent 70%)" }} />
      </div>

      {/* Шапка */}
      <header className="relative z-10 border-b border-border/50 backdrop-blur-md sticky top-0" style={{ background: "rgba(15, 18, 25, 0.95)" }}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #f97316, #ea580c)", boxShadow: "0 0 20px rgba(249,115,22,0.3)" }}>
              <Icon name="Wrench" size={18} className="text-white" />
            </div>
            <div>
              <span className="font-oswald text-xl font-bold tracking-wide text-gradient">АВТОРЕМОНТ</span>
              <span className="text-muted-foreground text-xs ml-2 hidden sm:inline">форум</span>
            </div>
          </div>

          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Поиск по форуму..."
                className="w-full bg-secondary/50 border border-border/50 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-orange-500/50 focus:bg-secondary transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveView("chat")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeView === "chat" ? "bg-orange-500/20 text-orange-400 border border-orange-500/30" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}`}
            >
              <Icon name="MessageCircle" size={16} />
              <span className="hidden sm:inline">Чат</span>
              <span className="w-2 h-2 rounded-full bg-green-500" style={{ boxShadow: "0 0 6px rgba(34,197,94,0.8)" }} />
            </button>
            <button className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90" style={{ background: "linear-gradient(135deg, #f97316, #ea580c)" }}>
              Войти
            </button>
          </div>
        </div>

        <nav className="max-w-7xl mx-auto px-4 pb-2 flex gap-1">
          {([
            { label: "Главная", view: "main" as View, icon: "Home" },
            { label: "Темы", view: "category" as View, icon: "LayoutGrid" },
            { label: "Чат", view: "chat" as View, icon: "MessageCircle" },
          ] as const).map(item => (
            <button
              key={item.view}
              onClick={() => setActiveView(item.view)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeView === item.view ? "text-orange-400 bg-orange-500/10" : "text-muted-foreground hover:text-foreground"}`}
            >
              <Icon name={item.icon} size={13} />
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      {/* Основной контент */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-6">

        {/* ГЛАВНАЯ */}
        {activeView === "main" && (
          <div className="space-y-8 animate-fade-in">
            {/* Hero */}
            <div className="rounded-2xl p-8 relative overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.15) 0%, rgba(220,38,38,0.05) 100%)", border: "1px solid rgba(249,115,22,0.2)" }}>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-green-500" style={{ boxShadow: "0 0 8px rgba(34,197,94,0.8)" }} />
                  <span className="text-green-400 text-xs font-medium">847 онлайн сейчас</span>
                </div>
                <h1 className="font-oswald text-4xl md:text-5xl font-bold mb-3 leading-tight">
                  <span className="text-gradient">ФОРУМ</span>
                  <br />
                  <span className="text-foreground">АВТОРЕМОНТА</span>
                </h1>
                <p className="text-muted-foreground text-base max-w-md">
                  Сообщество мастеров и автолюбителей. Советы по ремонту, диагностике и обслуживанию любых марок.
                </p>
                <div className="flex gap-3 mt-5">
                  <button className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 hover-lift" style={{ background: "linear-gradient(135deg, #f97316, #ea580c)" }}>
                    Задать вопрос
                  </button>
                  <button onClick={() => setActiveView("chat")} className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-border/60 text-foreground/80 hover:bg-secondary/50 transition-all">
                    Войти в чат
                  </button>
                </div>
              </div>
              <div className="absolute right-6 top-4 text-8xl opacity-10 select-none">🔧</div>
            </div>

            {/* Статистика */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Участников", value: "12 481", icon: "Users" },
                { label: "Тем", value: "34 206", icon: "FileText" },
                { label: "Ответов", value: "187 903", icon: "MessageSquare" },
              ].map(stat => (
                <div key={stat.label} className="glass-card rounded-xl p-4 text-center hover-lift transition-all">
                  <Icon name={stat.icon as never} size={20} className="text-orange-400 mx-auto mb-2" />
                  <div className="font-oswald text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-muted-foreground text-xs mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Марки авто */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-oswald text-xl font-bold text-foreground flex items-center gap-2">
                  <Icon name="Car" size={18} className="text-orange-400" />
                  По маркам
                </h2>
                <button className="text-orange-400 text-xs hover:text-orange-300 transition-colors">Все марки →</button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {BRANDS.map(brand => (
                  <button
                    key={brand.id}
                    onClick={() => { setActiveBrand(brand.id); setActiveView("category"); }}
                    className="glass-card rounded-xl p-4 text-left hover-lift transition-all group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{brand.icon}</span>
                      <Icon name="ChevronRight" size={14} className="text-muted-foreground group-hover:text-orange-400 transition-colors" />
                    </div>
                    <div className="font-semibold text-foreground text-sm">{brand.name}</div>
                    <div className="text-muted-foreground text-xs mt-0.5">{brand.topics.toLocaleString("ru")} тем</div>
                  </button>
                ))}
              </div>
            </section>

            {/* Свежие темы */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-oswald text-xl font-bold text-foreground flex items-center gap-2">
                  <Icon name="Flame" size={18} className="text-orange-400" />
                  Свежие темы
                </h2>
                <button onClick={() => setActiveView("category")} className="text-orange-400 text-xs hover:text-orange-300 transition-colors">Все темы →</button>
              </div>
              <div className="space-y-2">
                {RECENT_TOPICS.map(topic => (
                  <div key={topic.id} className="glass-card rounded-xl p-4 hover-lift transition-all cursor-pointer group">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {topic.hot && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: "rgba(249,115,22,0.15)", color: "#f97316", border: "1px solid rgba(249,115,22,0.3)" }}>
                              <Icon name="Flame" size={10} />
                              Горячее
                            </span>
                          )}
                        </div>
                        <p className="text-foreground text-sm font-medium group-hover:text-orange-300 transition-colors">{topic.title}</p>
                        <div className="flex items-center gap-3 mt-2 text-muted-foreground text-xs">
                          <span className="flex items-center gap-1"><Icon name="User" size={11} />{topic.author}</span>
                          <span className="flex items-center gap-1"><Icon name="Clock" size={11} />{topic.time}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground shrink-0">
                        <span className="flex items-center gap-1"><Icon name="MessageSquare" size={12} />{topic.replies}</span>
                        <span className="flex items-center gap-1"><Icon name="Eye" size={12} />{topic.views}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* КАТЕГОРИИ */}
        {activeView === "category" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3">
              <button onClick={() => setActiveView("main")} className="text-muted-foreground hover:text-foreground transition-colors">
                <Icon name="ArrowLeft" size={18} />
              </button>
              <h2 className="font-oswald text-2xl font-bold text-foreground">
                {activeBrand ? BRANDS.find(b => b.id === activeBrand)?.name : "Все категории"}
              </h2>
            </div>

            <div>
              <p className="text-muted-foreground text-xs font-medium uppercase tracking-widest mb-3">Марки авто</p>
              <div className="flex flex-wrap gap-2">
                {BRANDS.map(brand => (
                  <button
                    key={brand.id}
                    onClick={() => setActiveBrand(activeBrand === brand.id ? null : brand.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all border ${activeBrand === brand.id ? "border-orange-500/50 text-orange-400 bg-orange-500/10" : "border-border/50 text-muted-foreground hover:border-orange-500/30 hover:text-foreground"}`}
                  >
                    <span>{brand.icon}</span>
                    {brand.name}
                    <span className="text-xs opacity-60">({brand.topics})</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-muted-foreground text-xs font-medium uppercase tracking-widest mb-3">Типы работ</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {CATEGORIES.map(cat => (
                  <div key={cat.id} className="glass-card rounded-xl p-5 hover-lift transition-all cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all group-hover:scale-110" style={{ background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.2)" }}>
                        <Icon name={cat.icon as never} size={20} className="text-orange-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-foreground text-sm">{cat.name}</span>
                          <span className="text-muted-foreground text-xs">{cat.topics.toLocaleString("ru")} тем</span>
                        </div>
                        <p className="text-muted-foreground text-xs mt-0.5">{cat.desc}</p>
                      </div>
                      <Icon name="ChevronRight" size={14} className="text-muted-foreground group-hover:text-orange-400 transition-colors shrink-0" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-muted-foreground text-xs font-medium uppercase tracking-widest mb-3">Последние темы</p>
              <div className="space-y-2">
                {RECENT_TOPICS.map(topic => (
                  <div key={topic.id} className="glass-card rounded-xl p-4 hover-lift cursor-pointer group transition-all">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-foreground text-sm font-medium group-hover:text-orange-300 transition-colors">{topic.title}</p>
                        <div className="flex items-center gap-3 mt-1.5 text-muted-foreground text-xs">
                          <span>{topic.author}</span><span>·</span><span>{topic.time}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground shrink-0">
                        <span className="flex items-center gap-1"><Icon name="MessageSquare" size={11} />{topic.replies}</span>
                        <span className="flex items-center gap-1"><Icon name="Eye" size={11} />{topic.views}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full glass-card rounded-xl py-3 text-sm text-orange-400 hover:bg-orange-500/10 transition-all flex items-center justify-center gap-2">
              <Icon name="Plus" size={16} />
              Создать новую тему
            </button>
          </div>
        )}

        {/* ЧАТ */}
        {activeView === "chat" && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <button onClick={() => setActiveView("main")} className="text-muted-foreground hover:text-foreground transition-colors">
                <Icon name="ArrowLeft" size={18} />
              </button>
              <div>
                <h2 className="font-oswald text-xl font-bold text-foreground flex items-center gap-2">
                  <Icon name="MessageCircle" size={18} className="text-orange-400" />
                  Общий чат
                </h2>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-green-500" style={{ boxShadow: "0 0 6px rgba(34,197,94,0.8)" }} />
                  <span className="text-green-400 text-xs">847 онлайн</span>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(249,115,22,0.15)" }}>
              {/* Онлайн */}
              <div className="px-4 py-3 border-b border-border/30 flex items-center gap-2 overflow-x-auto scrollbar-thin">
                <span className="text-muted-foreground text-xs whitespace-nowrap">Онлайн:</span>
                {["МастерСаня", "АвтоКот", "Вован76", "ТехникПро", "АнтонМ"].map(user => (
                  <span key={user} className="flex items-center gap-1.5 px-2 py-1 rounded-full text-xs whitespace-nowrap" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    {user}
                  </span>
                ))}
              </div>

              {/* Сообщения */}
              <div className="h-96 overflow-y-auto p-4 space-y-4 scrollbar-thin">
                {messages.map(msg => (
                  <div key={msg.id} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: msg.color }}>
                      {msg.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold" style={{ color: msg.color }}>{msg.user}</span>
                        <span className="text-muted-foreground text-xs">{msg.time}</span>
                      </div>
                      <div className="text-sm text-foreground/90 rounded-xl rounded-tl-sm px-3 py-2" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                        {msg.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Ввод */}
              <div className="p-4 border-t border-border/30">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <input
                      value={chatMessage}
                      onChange={e => setChatMessage(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && handleSendMessage()}
                      placeholder="Написать в чат... (Enter для отправки)"
                      className="w-full bg-secondary/50 border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500/50 transition-all pr-12"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-all hover:scale-110"
                      style={{ background: chatMessage.trim() ? "linear-gradient(135deg, #f97316, #ea580c)" : "rgba(255,255,255,0.05)" }}
                    >
                      <Icon name="Send" size={16} className={chatMessage.trim() ? "text-white" : "text-muted-foreground"} />
                    </button>
                  </div>
                </div>
                <p className="text-muted-foreground text-xs mt-2 text-center">
                  Войдите, чтобы писать в чат •{" "}
                  <button className="text-orange-400 hover:underline">Войти</button>
                </p>
              </div>
            </div>

            {/* Личные сообщения */}
            <div className="mt-4">
              <p className="text-muted-foreground text-xs font-medium uppercase tracking-widest mb-3">Личные сообщения</p>
              <div className="space-y-2">
                {(["МастерСаня", "АвтоКот", "ТехникПро"] as const).map((user, i) => (
                  <div key={user} className="glass-card rounded-xl p-3 flex items-center gap-3 cursor-pointer hover-lift transition-all group">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0" style={{ background: (["#f97316", "#3b82f6", "#a855f7"] as const)[i] }}>
                      {user[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground group-hover:text-orange-300 transition-colors">{user}</p>
                      <p className="text-xs text-muted-foreground">Нажмите, чтобы написать...</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500" style={{ boxShadow: "0 0 6px rgba(34,197,94,0.6)" }} />
                      <Icon name="ChevronRight" size={14} className="text-muted-foreground group-hover:text-orange-400 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-3 glass-card rounded-xl py-3 text-sm text-orange-400 hover:bg-orange-500/10 transition-all flex items-center justify-center gap-2">
                <Icon name="Plus" size={16} />
                Новый чат
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Мобильная навигация */}
      <nav className="fixed bottom-0 left-0 right-0 z-20 md:hidden border-t border-border/50 backdrop-blur-md" style={{ background: "rgba(15,18,25,0.97)" }}>
        <div className="flex justify-around py-2">
          {([
            { label: "Главная", view: "main" as View, icon: "Home" },
            { label: "Темы", view: "category" as View, icon: "LayoutGrid" },
            { label: "Чат", view: "chat" as View, icon: "MessageCircle" },
          ] as const).map(item => (
            <button
              key={item.view}
              onClick={() => setActiveView(item.view)}
              className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-lg transition-all ${activeView === item.view ? "text-orange-400" : "text-muted-foreground"}`}
            >
              <Icon name={item.icon} size={20} />
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="h-20 md:h-0" />
    </div>
  );
}
