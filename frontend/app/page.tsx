"use client";

import { useMemo, useState, type ReactNode } from "react";

type MaterialType = "Cartilha" | "Guia" | "Vídeo" | "Áudio";

type Material = {
  id: number;
  title: string;
  description: string;
  category: string;
  type: MaterialType;
  duration: string;
  color: "green" | "blue" | "coral" | "amber" | "purple";
};

const materials: Material[] = [
  {
    id: 1,
    title: "Como preparar a criança para uma consulta",
    description:
      "Orientações práticas para tornar a consulta mais previsível e tranquila.",
    category: "Orientação parental",
    type: "Cartilha",
    duration: "8 min",
    color: "green",
  },
  {
    id: 2,
    title: "Organizando a rotina em casa",
    description:
      "Estratégias simples para criar uma rotina mais organizada e previsível.",
    category: "Rotina",
    type: "Guia",
    duration: "10 min",
    color: "blue",
  },
  {
    id: 3,
    title: "Conhecendo a rede de atendimento",
    description:
      "Entenda os serviços e os caminhos disponíveis para acompanhamento.",
    category: "A rede",
    type: "Vídeo",
    duration: "6 min",
    color: "blue",
  },
  {
    id: 4,
    title: "Comunicação no dia a dia",
    description:
      "Estratégias para estimular a comunicação durante atividades cotidianas.",
    category: "Orientação parental",
    type: "Cartilha",
    duration: "12 min",
    color: "green",
  },
  {
    id: 5,
    title: "Conheça seus direitos",
    description:
      "Informações importantes sobre educação, saúde e assistência.",
    category: "Direitos",
    type: "Guia",
    duration: "15 min",
    color: "amber",
  },
  {
    id: 6,
    title: "Momentos de sobrecarga",
    description:
      "Como identificar sinais e organizar o ambiente nesses momentos.",
    category: "Rotina",
    type: "Cartilha",
    duration: "9 min",
    color: "coral",
  },
];

const categories = [
  "Todos",
  "Orientação parental",
  "Rotina",
  "Direitos",
  "A rede",
];

export default function Home() {
  const [section, setSection] = useState("inicio");

  const [category, setCategory] = useState("Todos");

  const [search, setSearch] = useState("");

  const [selectedMaterial, setSelectedMaterial] =
    useState<Material | null>(null);

  const [modal, setModal] = useState<
    | "appointments"
    | "tasks"
    | "notifications"
    | "profile"
    | "contact"
    | null
  >(null);

  const filteredMaterials = useMemo(() => {
    return materials.filter((material) => {
      const categoryMatch =
        category === "Todos" || material.category === category;

      const text = `
        ${material.title}
        ${material.description}
        ${material.category}
        ${material.type}
      `.toLowerCase();

      return categoryMatch && text.includes(search.toLowerCase());
    });
  }, [category, search]);

  function goToSection(target: string) {
    setSection(target);

    setTimeout(() => {
      document.getElementById(target)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  }

  function openContentCategory(targetCategory: string) {
    setCategory(targetCategory);
    goToSection("conteudos");
  }

  return (
    <main className="min-h-screen bg-[#E9EEEC] text-[#10244A]">

      {/* APLICAÇÃO */}

      <div className="mx-auto min-h-screen w-full max-w-[1280px] bg-[#F8FAF9] shadow-[0_18px_60px_rgba(15,76,74,0.12)] lg:my-6 lg:min-h-[calc(100vh-48px)] lg:rounded-[30px]">

        {/* HEADER */}

        <header className="sticky top-0 z-40 border-b border-[#E2E9E6] bg-[#F8FAF9]/95 backdrop-blur">

          <div className="mx-auto flex h-[76px] items-center justify-between px-5 sm:px-8 lg:px-10">

            {/* LOGO */}

            <button
              onClick={() => goToSection("inicio")}
              className="flex items-center gap-3 text-left"
            >

              <BrandMark />

              <div>
                <p className="text-[17px] font-extrabold leading-5 text-[#10244A]">
                  CERTEA
                </p>

                <p className="text-[15px] font-semibold leading-5 text-[#55708A]">
                  em Rede
                </p>
              </div>

            </button>

            {/* NAVEGAÇÃO DESKTOP */}

            <nav className="hidden items-center gap-1 lg:flex">

              <HeaderButton
                active={section === "inicio"}
                onClick={() => goToSection("inicio")}
              >
                Início
              </HeaderButton>

              <HeaderButton
                active={section === "conteudos"}
                onClick={() => goToSection("conteudos")}
              >
                Conteúdos
              </HeaderButton>

              <HeaderButton
                active={section === "rede"}
                onClick={() => goToSection("rede")}
              >
                Rede
              </HeaderButton>

              <HeaderButton
                active={section === "comunicacao"}
                onClick={() => goToSection("comunicacao")}
              >
                Comunicação
              </HeaderButton>

            </nav>

            {/* AÇÕES DO USUÁRIO */}

            <div className="flex items-center gap-2">

              <button
                onClick={() => setModal("notifications")}
                aria-label="Notificações"
                className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#17365F] shadow-sm ring-1 ring-[#E0E8E5] transition hover:-translate-y-0.5"
              >
                <BellIcon />

                <span className="absolute right-[8px] top-[7px] h-[7px] w-[7px] rounded-full bg-[#D83C55]" />
              </button>

              <button
                onClick={() => setModal("profile")}
                aria-label="Perfil"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#DDE8E5] text-sm font-bold text-[#17365F]"
              >
                <UserIcon />
              </button>

            </div>

          </div>

        </header>

        {/* CONTEÚDO PRINCIPAL */}

        <div className="px-5 pb-28 pt-6 sm:px-8 sm:pt-8 lg:px-10">

          {/* ===================================================== */}
          {/* INÍCIO */}
          {/* ===================================================== */}

          <section id="inicio" className="scroll-mt-28">

            {/* HERO */}

            <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#EEF8F4] via-white to-[#EDF5FC] p-6 sm:p-8 lg:p-10">

              <div className="relative z-10 max-w-[700px]">

                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1D8A78]">
                  CERTEA em Rede
                </p>

                <h1 className="mt-3 text-[31px] font-extrabold leading-[1.08] tracking-[-0.03em] text-[#10244A] sm:text-[43px]">
                  Cuidado, orientação
                  <br />
                  e informação para
                  <br />
                  sua jornada.
                </h1>

                <p className="mt-4 max-w-[570px] text-[15px] leading-6 text-[#5B7189] sm:text-base">
                  Um espaço para encontrar informações,
                  materiais educativos e orientações para
                  você e sua família.
                </p>

                <button
                  onClick={() => goToSection("conteudos")}
                  className="mt-6 inline-flex items-center gap-3 rounded-xl bg-[#168B77] px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#107665]"
                >
                  Explorar conteúdos
                  <ChevronRightIcon />
                </button>

              </div>

              {/* ELEMENTOS VISUAIS */}

              <div className="absolute right-[-70px] top-[-90px] hidden h-[330px] w-[330px] rounded-full bg-[#CDEDE4] md:block" />

              <div className="absolute right-[40px] top-[60px] hidden h-[210px] w-[210px] rounded-full bg-[#DCEBFA] md:block" />

              <div className="absolute bottom-[-80px] right-[180px] hidden h-[180px] w-[180px] rounded-full bg-[#FBE6B8] md:block" />

            </div>

            {/* ================================================= */}
            {/* CARDS PRINCIPAIS */}
            {/* ================================================= */}

            <div className="mt-5 grid gap-4 md:grid-cols-3">

              {/* SEUS AGENDAMENTOS */}

              <SummaryCard
                icon={<CalendarIcon />}
                color="green"
                label="Seus agendamentos"
                title="Próximo atendimento"
                detail="Terapia Ocupacional · 12/09 · 14h00"
                onClick={() => setModal("appointments")}
              />

              {/* TAREFAS */}

              <SummaryCard
                icon={<TaskIcon />}
                color="blue"
                label="Suas tarefas"
                title="2 pendências"
                detail="Confira o que precisa fazer"
                onClick={() => setModal("tasks")}
              />

              {/* DICA */}

              <SummaryCard
                icon={<TipIcon />}
                color="amber"
                label="Dica do dia"
                title="Rotina mais previsível"
                detail="Veja uma orientação rápida"
                onClick={() => setSelectedMaterial(materials[1])}
              />

            </div>

            {/* ================================================= */}
            {/* ACESSO RÁPIDO */}
            {/* ================================================= */}

            <section className="mt-12">

              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#1B8A78]">
                Acesso rápido
              </p>

              <h2 className="mt-1 text-[25px] font-extrabold tracking-tight text-[#10244A]">
                O que você precisa hoje?
              </h2>

              <p className="mt-1 text-sm text-[#657A90]">
                Acesse rapidamente as principais áreas.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">

                <QuickCard
                  icon={<BookIcon />}
                  title="Orientações"
                  description="Informações de forma simples"
                  color="green"
                  onClick={() =>
                    openContentCategory("Orientação parental")
                  }
                />

                <QuickCard
                  icon={<NetworkIcon />}
                  title="Fluxos da rede"
                  description="Entenda os próximos passos"
                  color="blue"
                  onClick={() => goToSection("rede")}
                />

                <QuickCard
                  icon={<VideoIcon />}
                  title="Conteúdos"
                  description="Vídeos, cartilhas e guias"
                  color="coral"
                  onClick={() => goToSection("conteudos")}
                />

                <QuickCard
                  icon={<TipIcon />}
                  title="Dicas do dia"
                  description="Rotina e bem-estar"
                  color="amber"
                  onClick={() =>
                    setSelectedMaterial(materials[1])
                  }
                />

              </div>

            </section>

          </section>

          {/* ===================================================== */}
          {/* CONTEÚDOS */}
          {/* ===================================================== */}

          <section
            id="conteudos"
            className="mt-14 scroll-mt-28"
          >

            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

              <div>

                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#1B8A78]">
                  Biblioteca educativa
                </p>

                <h2 className="mt-1 text-[26px] font-extrabold tracking-tight text-[#10244A]">
                  Conteúdos para você
                </h2>

                <p className="mt-1 text-sm text-[#657A90]">
                  Materiais preparados para apoiar sua família.
                </p>

              </div>

              <button
                onClick={() => {
                  setCategory("Todos");
                  setSearch("");
                }}
                className="self-start rounded-xl border border-[#D5E1DD] bg-white px-4 py-2.5 text-xs font-bold text-[#155F58] sm:self-auto"
              >
                Ver todos
              </button>

            </div>

            {/* PESQUISA */}

            <div className="mt-5 flex items-center gap-3 rounded-xl border border-[#DCE6E2] bg-white px-4 py-3 shadow-sm">

              <SearchIcon />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Buscar materiais educativos..."
                className="w-full bg-transparent text-sm text-[#10244A] outline-none placeholder:text-[#91A0AC]"
              />

            </div>

            {/* FILTROS */}

            <div className="mt-4 flex gap-2 overflow-x-auto pb-1">

              {categories.map((item) => (

                <button
                  key={item}
                  onClick={() => setCategory(item)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition ${
                    category === item
                      ? "bg-[#123F55] text-white"
                      : "border border-[#DCE6E2] bg-white text-[#63778A] hover:border-[#9EBBB4]"
                  }`}
                >
                  {item}
                </button>

              ))}

            </div>

            {/* LISTA DE MATERIAIS */}

            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">

              {filteredMaterials.map((material) => (

                <MaterialCard
                  key={material.id}
                  material={material}
                  onClick={() =>
                    setSelectedMaterial(material)
                  }
                />

              ))}

            </div>

            {filteredMaterials.length === 0 && (

              <div className="mt-5 rounded-2xl border border-dashed border-[#CBD9D5] bg-white p-10 text-center">

                <p className="text-sm font-bold text-[#123F55]">
                  Nenhum material encontrado
                </p>

                <p className="mt-1 text-xs text-[#71828D]">
                  Tente alterar a busca ou o filtro selecionado.
                </p>

              </div>

            )}

          </section>

          {/* ===================================================== */}
          {/* NOVIDADES */}
          {/* ===================================================== */}

          <section className="mt-14">

            <div className="flex items-end justify-between">

              <div>

                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#1B8A78]">
                  Atualizações
                </p>

                <h2 className="mt-1 text-[25px] font-extrabold text-[#10244A]">
                  Novidades para você
                </h2>

              </div>

              <button
                onClick={() => goToSection("conteudos")}
                className="text-sm font-bold text-[#167CC4]"
              >
                Ver todas
              </button>

            </div>

            <button
              onClick={() => setSelectedMaterial(materials[3])}
              className="mt-5 flex w-full flex-col overflow-hidden rounded-[22px] border border-[#E0E8E5] bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:flex-row"
            >

              <div className="flex h-[170px] w-full items-center justify-center bg-[#FBE7E8] sm:h-auto sm:w-[220px]">

                <div className="flex h-20 w-20 items-center justify-center rounded-[24px] bg-[#F6B7C0] text-[#A8324A]">
                  <BookIcon />
                </div>

              </div>

              <div className="flex flex-1 items-center justify-between gap-5 p-5 sm:p-6">

                <div>

                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#B53C53]">
                    Novo conteúdo
                  </span>

                  <h3 className="mt-2 text-lg font-extrabold text-[#10244A]">
                    Comunicação no dia a dia
                  </h3>

                  <p className="mt-2 max-w-[600px] text-sm leading-6 text-[#647A8E]">
                    Estratégias simples para estimular a
                    comunicação durante atividades cotidianas.
                  </p>

                </div>

                <ChevronRightIcon />

              </div>

            </button>

          </section>

          {/* ===================================================== */}
          {/* REDE */}
          {/* ===================================================== */}

          <section
            id="rede"
            className="mt-14 scroll-mt-28"
          >

            <div className="rounded-[26px] bg-[#EAF4F8] p-6 sm:p-8">

              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#2573A5]">
                Rede de atendimento
              </p>

              <h2 className="mt-1 text-[25px] font-extrabold text-[#10244A]">
                Entenda como a rede funciona
              </h2>

              <p className="mt-2 max-w-[650px] text-sm leading-6 text-[#5F7489]">
                Conheça os caminhos de atendimento e entenda
                como os diferentes serviços podem participar
                do acompanhamento.
              </p>

              <div className="mt-6 grid gap-3 md:grid-cols-3">

                <NetworkCard
                  number="01"
                  title="Informação"
                  description="Conheça os serviços e informações disponíveis."
                />

                <NetworkCard
                  number="02"
                  title="Acolhimento"
                  description="Encontre orientação para compreender os próximos passos."
                />

                <NetworkCard
                  number="03"
                  title="Acompanhamento"
                  description="Conheça as possibilidades de acompanhamento."
                />

              </div>

            </div>

          </section>

          {/* ===================================================== */}
          {/* COMUNICAÇÃO */}
          {/* ===================================================== */}

          <section
            id="comunicacao"
            className="mt-14 scroll-mt-28"
          >

            <div className="flex flex-col gap-5 rounded-[26px] bg-[#EEF6FC] p-6 sm:flex-row sm:items-center sm:p-8">

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#D5E9FA] text-[#167CC4]">
                <MessageIcon />
              </div>

              <div className="flex-1">

                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#2677AE]">
                  Comunicação
                </p>

                <h2 className="mt-1 text-xl font-extrabold text-[#10244A]">
                  Fale com o CERTEA
                </h2>

                <p className="mt-1 text-sm text-[#62788D]">
                  Envie uma dúvida para nossa equipe.
                </p>

              </div>

              <button
                onClick={() => setModal("contact")}
                className="rounded-xl bg-[#167CC4] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1069A8]"
              >
                Entrar em contato
              </button>

            </div>

          </section>

        </div>

        {/* ===================================================== */}
        {/* MENU MOBILE */}
        {/* ===================================================== */}

        <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#DCE6E2] bg-[#F8FAF9]/95 backdrop-blur lg:hidden">

          <div className="mx-auto grid max-w-[600px] grid-cols-4">

            <MobileButton
              icon={<HomeIcon />}
              label="Início"
              active={section === "inicio"}
              onClick={() => goToSection("inicio")}
            />

            <MobileButton
              icon={<BookIcon />}
              label="Conteúdos"
              active={section === "conteudos"}
              onClick={() => goToSection("conteudos")}
            />

            <MobileButton
              icon={<NetworkIcon />}
              label="Rede"
              active={section === "rede"}
              onClick={() => goToSection("rede")}
            />

            <MobileButton
              icon={<MessageIcon />}
              label="Contato"
              active={section === "comunicacao"}
              onClick={() => setModal("contact")}
            />

          </div>

        </nav>

      </div>

      {/* ===================================================== */}
      {/* MODAL - SEUS AGENDAMENTOS */}
      {/* ===================================================== */}

      {modal === "appointments" && (

        <Modal onClose={() => setModal(null)}>

          <ModalTitle
            icon={<CalendarIcon />}
            title="Seus agendamentos"
            description="Confira seus próximos atendimentos e os detalhes de cada agendamento."
          />

          <div className="mt-6 space-y-3">

            {/* AGENDAMENTO 1 */}

            <button className="w-full rounded-2xl border border-[#DCE8E3] bg-[#F0F8F5] p-5 text-left transition hover:border-[#A8CFC4]">

              <div className="flex items-start justify-between gap-4">

                <div>

                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#16866F]">
                    Próximo atendimento
                  </span>

                  <h3 className="mt-2 text-lg font-extrabold text-[#123F55]">
                    Terapia Ocupacional
                  </h3>

                </div>

                <ChevronRightIcon />

              </div>

              <div className="mt-5 space-y-3 text-sm text-[#46625C]">

                <div className="flex items-center gap-3">
                  <CalendarIcon />
                  <span>12 de setembro de 2026</span>
                </div>

                <div className="flex items-center gap-3">
                  <ClockIcon />
                  <span>14h00</span>
                </div>

              </div>

            </button>

            {/* AGENDAMENTO 2 */}

            <button className="w-full rounded-2xl border border-[#E1E7EB] bg-white p-5 text-left transition hover:border-[#B9C9D4]">

              <div className="flex items-start justify-between gap-4">

                <div>

                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#55708A]">
                    Próximo atendimento
                  </span>

                  <h3 className="mt-2 text-lg font-extrabold text-[#123F55]">
                    Acompanhamento familiar
                  </h3>

                </div>

                <ChevronRightIcon />

              </div>

              <div className="mt-5 space-y-3 text-sm text-[#5D7282]">

                <div className="flex items-center gap-3">
                  <CalendarIcon />
                  <span>19 de setembro de 2026</span>
                </div>

                <div className="flex items-center gap-3">
                  <ClockIcon />
                  <span>10h30</span>
                </div>

              </div>

            </button>

          </div>

          <PrimaryButton onClick={() => setModal(null)}>
            Fechar
          </PrimaryButton>

        </Modal>

      )}

      {/* ===================================================== */}
      {/* MODAL - MATERIAL */}
      {/* ===================================================== */}

      {selectedMaterial && (

        <Modal onClose={() => setSelectedMaterial(null)}>

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E7F1EE] text-[#0F4C4A]">

            {selectedMaterial.type === "Cartilha" && <BookIcon />}
            {selectedMaterial.type === "Guia" && <GuideIcon />}
            {selectedMaterial.type === "Vídeo" && <VideoIcon />}
            {selectedMaterial.type === "Áudio" && <AudioIcon />}

          </div>

          <div className="mt-5 flex flex-wrap gap-2">

            <span className="rounded-full bg-[#E7F1EE] px-3 py-1 text-[10px] font-bold text-[#0F4C4A]">
              {selectedMaterial.type}
            </span>

            <span className="rounded-full bg-[#F1F4F3] px-3 py-1 text-[10px] font-bold text-[#60736E]">
              {selectedMaterial.category}
            </span>

          </div>

          <h2 className="mt-4 text-[25px] font-extrabold leading-tight text-[#10244A]">
            {selectedMaterial.title}
          </h2>

          <p className="mt-3 text-sm leading-6 text-[#61778A]">
            {selectedMaterial.description}
          </p>

          <div className="mt-5 rounded-2xl bg-[#F3F7F5] p-5">

            <p className="text-[10px] font-bold uppercase tracking-wider text-[#71827D]">
              Sobre o conteúdo
            </p>

            <p className="mt-2 text-sm leading-6 text-[#405A55]">
              Este espaço poderá apresentar o conteúdo
              completo do material educativo, arquivos,
              orientações, vídeos e outros recursos
              disponibilizados pelo CERTEA.
            </p>

          </div>

          <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#657873]">
            <ClockIcon />
            <span>{selectedMaterial.duration}</span>
          </div>

          <button
            onClick={() => setSelectedMaterial(null)}
            className="mt-6 w-full rounded-xl bg-[#123F55] py-3 text-sm font-bold text-white"
          >
            Fechar
          </button>

        </Modal>

      )}

      {/* ===================================================== */}
      {/* MODAL - TAREFAS */}
      {/* ===================================================== */}

      {modal === "tasks" && (

        <Modal onClose={() => setModal(null)}>

          <ModalTitle
            icon={<TaskIcon />}
            title="Suas tarefas"
            description="Confira as atividades que aguardam sua atenção."
          />

          <div className="mt-6 space-y-3">

            <TaskRow text="Responder questionário de acompanhamento" />

            <TaskRow text="Confirmar próximo atendimento" />

          </div>

          <PrimaryButton onClick={() => setModal(null)}>
            Fechar
          </PrimaryButton>

        </Modal>

      )}

      {/* ===================================================== */}
      {/* MODAL - NOTIFICAÇÕES */}
      {/* ===================================================== */}

      {modal === "notifications" && (

        <Modal onClose={() => setModal(null)}>

          <ModalTitle
            icon={<BellIcon />}
            title="Notificações"
            description="Confira as novidades disponíveis para você."
          />

          <div className="mt-6 space-y-3">

            <NotificationRow
              title="Novo material disponível"
              description="Foi publicada uma nova cartilha na biblioteca."
            />

            <NotificationRow
              title="Atendimento próximo"
              description="Seu próximo atendimento está agendado."
            />

          </div>

          <PrimaryButton onClick={() => setModal(null)}>
            Fechar
          </PrimaryButton>

        </Modal>

      )}

      {/* ===================================================== */}
      {/* MODAL - PERFIL */}
      {/* ===================================================== */}

      {modal === "profile" && (

        <Modal onClose={() => setModal(null)}>

          <ModalTitle
            icon={<UserIcon />}
            title="Minha conta"
            description="Informações do seu perfil."
          />

          <div className="mt-6 rounded-2xl bg-[#F1F5F3] p-5">

            <p className="text-[10px] font-bold uppercase tracking-wider text-[#71827D]">
              Perfil
            </p>

            <p className="mt-2 text-lg font-bold text-[#123F55]">
              Usuário CERTEA
            </p>

            <p className="mt-1 text-sm text-[#667B89]">
              Família
            </p>

          </div>

          <PrimaryButton onClick={() => setModal(null)}>
            Fechar
          </PrimaryButton>

        </Modal>

      )}

      {/* ===================================================== */}
      {/* MODAL - CONTATO */}
      {/* ===================================================== */}

      {modal === "contact" && (

        <Modal onClose={() => setModal(null)}>

          <ModalTitle
            icon={<MessageIcon />}
            title="Fale com o CERTEA"
            description="Envie sua dúvida para nossa equipe."
          />

          <label className="mt-6 block">

            <span className="text-sm font-bold text-[#123F55]">
              Sua mensagem
            </span>

            <textarea
              rows={5}
              placeholder="Digite sua dúvida..."
              className="mt-2 w-full resize-none rounded-2xl border border-[#DCE6E2] bg-[#F8FAF9] p-4 text-sm outline-none focus:border-[#168B77]"
            />

          </label>

          <button
            onClick={() => {
              setModal(null);
              window.alert("Mensagem enviada com sucesso.");
            }}
            className="mt-5 w-full rounded-xl bg-[#168B77] py-3 text-sm font-bold text-white"
          >
            Enviar mensagem
          </button>

        </Modal>

      )}

    </main>
  );
}


/* ========================================================= */
/* COMPONENTES                                               */
/* ========================================================= */

function HeaderButton({
  children,
  active,
  onClick,
}: {
  children: ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl px-4 py-2.5 text-xs font-bold transition ${
        active
          ? "bg-[#E7F1EE] text-[#0F4C4A]"
          : "text-[#63778A] hover:bg-white hover:text-[#123F55]"
      }`}
    >
      {children}
    </button>
  );
}


function SummaryCard({
  icon,
  color,
  label,
  title,
  detail,
  onClick,
}: {
  icon: ReactNode;
  color: "green" | "blue" | "amber";
  label: string;
  title: string;
  detail: string;
  onClick: () => void;
}) {
  const colors = {
    green: "bg-[#E6F4EE] text-[#16866F]",
    blue: "bg-[#E8F2FA] text-[#277BB4]",
    amber: "bg-[#FFF4DB] text-[#D18A0B]",
  };

  return (
    <button
      onClick={onClick}
      className="group rounded-[22px] border border-[#E0E8E5] bg-white p-4 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >

      <div className="flex items-center gap-3">

        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${colors[color]}`}
        >
          {icon}
        </div>

        <div className="min-w-0 flex-1">

          <p className="text-[10px] font-bold uppercase tracking-wider text-[#7A8B96]">
            {label}
          </p>

          <p className="mt-1 truncate text-[15px] font-extrabold text-[#123F55]">
            {title}
          </p>

          <p className="mt-1 text-xs text-[#657B8C]">
            {detail}
          </p>

        </div>

        <ChevronRightIcon />

      </div>

    </button>
  );
}


function QuickCard({
  icon,
  title,
  description,
  color,
  onClick,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  color: "green" | "blue" | "coral" | "amber";
  onClick: () => void;
}) {
  const colors = {
    green: "bg-[#E7F5EF] text-[#16886F]",
    blue: "bg-[#E8F2FB] text-[#267DBB]",
    coral: "bg-[#FBE9E9] text-[#C33E59]",
    amber: "bg-[#FFF3D8] text-[#D28A0A]",
  };

  return (
    <button
      onClick={onClick}
      className="rounded-[22px] border border-[#E0E8E5] bg-white p-4 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-5"
    >

      <div
        className={`flex h-12 w-12 items-center justify-center rounded-full ${colors[color]}`}
      >
        {icon}
      </div>

      <h3 className="mt-4 text-sm font-extrabold text-[#10244A] sm:text-base">
        {title}
      </h3>

      <p className="mt-1 text-xs leading-5 text-[#647A8E]">
        {description}
      </p>

      <div className="mt-4 flex items-center justify-between text-xs font-bold text-[#315A70]">

        <span>Acessar</span>

        <ChevronRightIcon />

      </div>

    </button>
  );
}


function MaterialCard({
  material,
  onClick,
}: {
  material: Material;
  onClick: () => void;
}) {
  const backgrounds = {
    green: "bg-[#E8F5F0]",
    blue: "bg-[#E9F3FA]",
    coral: "bg-[#FBE9EA]",
    amber: "bg-[#FFF4DC]",
    purple: "bg-[#F0EBFA]",
  };

  return (
    <button
      onClick={onClick}
      className="overflow-hidden rounded-[22px] border border-[#E0E8E5] bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >

      <div
        className={`flex h-[125px] items-center justify-center ${backgrounds[material.color]}`}
      >

        <div className="flex h-16 w-16 items-center justify-center rounded-[22px] bg-white/80 text-[#123F55]">

          {material.type === "Cartilha" && <BookIcon />}
          {material.type === "Guia" && <GuideIcon />}
          {material.type === "Vídeo" && <VideoIcon />}
          {material.type === "Áudio" && <AudioIcon />}

        </div>

      </div>

      <div className="p-4">

        <div className="flex items-center justify-between gap-2">

          <span className="rounded-full bg-[#EEF4F1] px-2.5 py-1 text-[10px] font-bold text-[#276258]">
            {material.type}
          </span>

          <span className="text-[10px] font-medium text-[#81909A]">
            {material.duration}
          </span>

        </div>

        <h3 className="mt-3 text-[15px] font-extrabold leading-5 text-[#10244A]">
          {material.title}
        </h3>

        <p className="mt-2 line-clamp-3 text-xs leading-5 text-[#647A8E]">
          {material.description}
        </p>

        <div className="mt-4 flex items-center gap-2 text-xs font-bold text-[#176B62]">

          <span>Ver material</span>

          <ChevronRightIcon />

        </div>

      </div>

    </button>
  );
}


function NetworkCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-[#D6E4EA] bg-white p-5">

      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#123F55] text-[10px] font-bold text-white">
        {number}
      </div>

      <h3 className="mt-4 text-sm font-extrabold text-[#123F55]">
        {title}
      </h3>

      <p className="mt-1 text-xs leading-5 text-[#657B8D]">
        {description}
      </p>

    </div>
  );
}


function MobileButton({
  icon,
  label,
  active,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 py-2.5 text-[10px] ${
        active
          ? "font-bold text-[#167CC4]"
          : "text-[#718494]"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}


function Modal({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#10244A]/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >

      <div
        onClick={(event) => event.stopPropagation()}
        className="max-h-[90vh] w-full max-w-[500px] overflow-y-auto rounded-[26px] bg-white p-6 shadow-2xl sm:p-7"
      >

        <div className="flex justify-end">

          <button
            onClick={onClose}
            aria-label="Fechar"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F0F4F2] text-[#60736E]"
          >
            <CloseIcon />
          </button>

        </div>

        {children}

      </div>

    </div>
  );
}


function ModalTitle({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <>
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E8F4F0] text-[#0F4C4A]">
        {icon}
      </div>

      <h2 className="mt-5 text-[25px] font-extrabold text-[#10244A]">
        {title}
      </h2>

      <p className="mt-2 text-sm leading-6 text-[#647A8E]">
        {description}
      </p>
    </>
  );
}


function PrimaryButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="mt-6 w-full rounded-xl bg-[#123F55] py-3 text-sm font-bold text-white"
    >
      {children}
    </button>
  );
}


function TaskRow({ text }: { text: string }) {
  return (
    <button className="flex w-full items-center gap-3 rounded-2xl border border-[#E0E8E5] p-4 text-left">

      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E7F4EF] text-[#16886F]">
        <CheckIcon />
      </span>

      <span className="text-sm font-semibold text-[#123F55]">
        {text}
      </span>

    </button>
  );
}


function NotificationRow({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <button className="w-full rounded-2xl border border-[#E0E8E5] p-4 text-left transition hover:bg-[#F5F8F7]">

      <p className="text-sm font-bold text-[#123F55]">
        {title}
      </p>

      <p className="mt-1 text-xs leading-5 text-[#6A7F8E]">
        {description}
      </p>

    </button>
  );
}


/* ========================================================= */
/* ÍCONES SVG                                                 */
/* ========================================================= */

function SvgIcon({ children }: { children: ReactNode }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}


function BrandMark() {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#E7F4EF]">

      <svg
        width="30"
        height="30"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
      >

        <circle cx="16" cy="7" r="5" fill="#168B77" />

        <circle cx="8" cy="13" r="5" fill="#2B82D4" />

        <circle cx="24" cy="13" r="5" fill="#2B82D4" />

        <circle cx="11" cy="21" r="5" fill="#E95C70" />

        <circle cx="21" cy="21" r="5" fill="#F0A91E" />

        <path
          d="M16 12c-4.5 0-8 3.1-8 7 0 3.8 3.5 6 8 9 4.5-3 8-5.2 8-9 0-3.9-3.5-7-8-7Z"
          fill="#1E7A6F"
        />

      </svg>

    </div>
  );
}


function HomeIcon() {
  return (
    <SvgIcon>
      <path d="m3.5 10 8.5-7 8.5 7" />
      <path d="M5.5 9v11h13V9" />
      <path d="M9.5 20v-6h5v6" />
    </SvgIcon>
  );
}


function BookIcon() {
  return (
    <SvgIcon>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H12v18H6.5A2.5 2.5 0 0 1 4 18.5Z" />
      <path d="M12 3h5.5A2.5 2.5 0 0 1 20 5.5v13a2.5 2.5 0 0 1-2.5 2.5H12" />
      <path d="M7.5 7h2.5M7.5 10h2.5" />
    </SvgIcon>
  );
}


function GuideIcon() {
  return (
    <SvgIcon>
      <rect x="5" y="3.5" width="14" height="17" rx="2" />
      <path d="M9 8h6M9 12h6M9 16h3" />
    </SvgIcon>
  );
}


function VideoIcon() {
  return (
    <SvgIcon>
      <rect x="3.5" y="5" width="17" height="14" rx="3" />
      <path
        d="m10 9 5 3-5 3Z"
        fill="currentColor"
        stroke="none"
      />
    </SvgIcon>
  );
}


function AudioIcon() {
  return (
    <SvgIcon>
      <path d="M7 10v4a5 5 0 0 0 10 0v-4" />
      <path d="M9 20h6M12 19v-3" />
      <rect x="9" y="3" width="6" height="11" rx="3" />
    </SvgIcon>
  );
}


function NetworkIcon() {
  return (
    <SvgIcon>
      <circle cx="5" cy="12" r="2.5" />
      <circle cx="19" cy="6" r="2.5" />
      <circle cx="19" cy="18" r="2.5" />
      <path d="m7.3 11 9.2-4" />
      <path d="m7.3 13 9.2 4" />
    </SvgIcon>
  );
}


function MessageIcon() {
  return (
    <SvgIcon>
      <path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.5 8.5 0 0 1-4-.9L4 20l1.4-3.3A7.2 7.2 0 0 1 4 12c0-4.1 3.6-7.5 8-7.5s8 3.1 8 7Z" />
    </SvgIcon>
  );
}


function BellIcon() {
  return (
    <SvgIcon>
      <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M10 21h4" />
    </SvgIcon>
  );
}


function UserIcon() {
  return (
    <SvgIcon>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c.7-3.3 3.2-5 7-5s6.3 1.7 7 5" />
    </SvgIcon>
  );
}


function CalendarIcon() {
  return (
    <SvgIcon>
      <rect x="3.5" y="5" width="17" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3.5 10h17" />
      <path d="M8 14h3M8 17h5" />
    </SvgIcon>
  );
}


function ClockIcon() {
  return (
    <SvgIcon>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5l3.5 2" />
    </SvgIcon>
  );
}


function TaskIcon() {
  return (
    <SvgIcon>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M8.5 9h7M8.5 13h7M8.5 17h4" />
    </SvgIcon>
  );
}


function TipIcon() {
  return (
    <SvgIcon>
      <path d="M9 18h6" />
      <path d="M10 21h4" />
      <path d="M8.5 14.5A6 6 0 1 1 15.5 14c-.9.8-1.5 1.7-1.5 3h-4c0-1.2-.5-1.8-1.5-2.5Z" />
    </SvgIcon>
  );
}


function SearchIcon() {
  return (
    <SvgIcon>
      <circle cx="10.8" cy="10.8" r="6.3" />
      <path d="m15.5 15.5 4.5 4.5" />
    </SvgIcon>
  );
}


function ChevronRightIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m9 5 7 7-7 7" />
    </svg>
  );
}


function CloseIcon() {
  return (
    <SvgIcon>
      <path d="m7 7 10 10M17 7 7 17" />
    </SvgIcon>
  );
}


function CheckIcon() {
  return (
    <SvgIcon>
      <path d="m5.5 12 4 4 9-9" />
    </SvgIcon>
  );
}