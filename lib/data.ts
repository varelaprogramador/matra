// Fallback data for when database is not available
const fallbackProdutos = [
  {
    id: "1",
    nome: "Spotform",
    descricao:
      "Crie formularios interativos e pesquisas com alta taxa de conversao. Interface intuitiva e analise avancada de dados.",
    descricaoLonga: "O Spotform e a solucao completa para criacao de formularios inteligentes. Com uma interface drag-and-drop intuitiva, voce pode criar desde simples formularios de contato ate pesquisas complexas com logica condicional.\n\nRecursos principais:\n- Editor visual drag-and-drop\n- Logica condicional avancada\n- Integracao com APIs externas\n- Dashboard de analytics em tempo real\n- Templates profissionais prontos para uso",
    icone: "📝",
    imagem: null,
    imagens: [],
    link: null,
    tecnologias: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
    destaque: true,
    ordem: 0,
    ativo: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    nome: "MATRA CRM",
    descricao:
      "Gestao de relacionamento com clientes potencializada por IA. Automacao inteligente e insights preditivos.",
    descricaoLonga: "MATRA CRM e uma plataforma completa de gestao de relacionamento com clientes, desenvolvida para empresas que buscam excelencia no atendimento e vendas.\n\nCom inteligencia artificial integrada, o sistema aprende com suas interacoes e oferece insights valiosos para aumentar suas conversoes.",
    icone: "🤖",
    imagem: null,
    imagens: [],
    link: null,
    tecnologias: ["React", "Node.js", "MongoDB", "OpenAI"],
    destaque: true,
    ordem: 1,
    ativo: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    nome: "SpotCRM",
    descricao:
      "Solucao leve e objetiva para equipes que precisam de agilidade sem complexidade desnecessaria.",
    descricaoLonga: null,
    icone: "⚡",
    imagem: null,
    imagens: [],
    link: null,
    tecnologias: ["Vue.js", "Firebase"],
    destaque: false,
    ordem: 2,
    ativo: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    nome: "Firebank",
    descricao:
      "Controle suas financas empresariais com dashboards inteligentes e automacao de processos financeiros.",
    descricaoLonga: null,
    icone: "💰",
    imagem: null,
    imagens: [],
    link: null,
    tecnologias: ["Next.js", "Supabase", "Chart.js"],
    destaque: false,
    ordem: 3,
    ativo: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const fallbackClientes = [
  { id: "1", nome: "Dr Atende Tudo", logo: null, site: null, ordem: 0, ativo: true, createdAt: new Date(), updatedAt: new Date() },
  { id: "2", nome: "Anjos Colchoes", logo: null, site: null, ordem: 1, ativo: true, createdAt: new Date(), updatedAt: new Date() },
  { id: "3", nome: "Tokeland", logo: null, site: null, ordem: 2, ativo: true, createdAt: new Date(), updatedAt: new Date() },
  { id: "4", nome: "Lucas Chaccon", logo: null, site: null, ordem: 3, ativo: true, createdAt: new Date(), updatedAt: new Date() },
  { id: "5", nome: "V7", logo: null, site: null, ordem: 4, ativo: true, createdAt: new Date(), updatedAt: new Date() },
  { id: "6", nome: "Decol", logo: null, site: null, ordem: 5, ativo: true, createdAt: new Date(), updatedAt: new Date() },
  { id: "7", nome: "Dr Jose Guilherme", logo: null, site: null, ordem: 6, ativo: true, createdAt: new Date(), updatedAt: new Date() },
  { id: "8", nome: "RG Producoes", logo: null, site: null, ordem: 7, ativo: true, createdAt: new Date(), updatedAt: new Date() },
];

const fallbackDepoimentos = [
  {
    id: "1",
    nome: "Cliente",
    cargo: "Diretor",
    empresa: "Dr Atende Tudo",
    texto:
      "A MATRA desenvolveu nossa plataforma EAD do zero. Sistema robusto, escalavel e que atende milhares de alunos diariamente.",
    avatar: null,
    nota: 5,
    ordem: 0,
    ativo: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    nome: "Cliente",
    cargo: "Gerente de Operacoes",
    empresa: "RG Producoes",
    texto:
      "O sistema de eventos que criaram revolucionou nossa operacao. Gestao completa, do cadastro ao check-in, tudo automatizado.",
    avatar: null,
    nota: 5,
    ordem: 1,
    ativo: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    nome: "Cliente",
    cargo: "CEO",
    empresa: "Tokeland",
    texto:
      "Landing pages que realmente convertem. O time entende de marketing e tecnologia — raro encontrar os dois juntos.",
    avatar: null,
    nota: 5,
    ordem: 2,
    ativo: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export async function getProdutosAtivos() {
  // Check if DATABASE_URL is configured
  if (!process.env.DATABASE_URL) {
    console.log("[getProdutosAtivos] No DATABASE_URL, using fallback");
    return fallbackProdutos;
  }

  try {
    const { prisma } = await import("./prisma");
    const produtos = await prisma.produto.findMany({
      where: { ativo: true },
      orderBy: { ordem: "asc" },
    });
    console.log("[getProdutosAtivos] Found", produtos.length, "products from DB");
    return produtos.length > 0 ? produtos : fallbackProdutos;
  } catch (error) {
    console.error("[getProdutosAtivos] Error:", error);
    return fallbackProdutos;
  }
}

export async function getClientesAtivos() {
  if (!process.env.DATABASE_URL) {
    return fallbackClientes;
  }

  try {
    const { prisma } = await import("./prisma");
    const clientes = await prisma.cliente.findMany({
      where: { ativo: true },
      orderBy: { ordem: "asc" },
    });
    return clientes.length > 0 ? clientes : fallbackClientes;
  } catch {
    return fallbackClientes;
  }
}

export async function getDepoimentosAtivos() {
  if (!process.env.DATABASE_URL) {
    return fallbackDepoimentos;
  }

  try {
    const { prisma } = await import("./prisma");
    const depoimentos = await prisma.depoimento.findMany({
      where: { ativo: true },
      orderBy: { ordem: "asc" },
    });
    return depoimentos.length > 0 ? depoimentos : fallbackDepoimentos;
  } catch {
    return fallbackDepoimentos;
  }
}

const fallbackEquipe = [
  {
    id: "1",
    nome: "Equipe MATRA",
    cargo: "Desenvolvimento",
    descricao: "Nossa equipe de desenvolvimento trabalha com as mais modernas tecnologias para entregar solucoes de alta qualidade.",
    foto: null,
    linkedin: null,
    github: null,
    email: null,
    ordem: 0,
    ativo: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export async function getMembrosEquipeAtivos() {
  if (!process.env.DATABASE_URL) {
    return fallbackEquipe;
  }

  try {
    const { prisma } = await import("./prisma");
    const membros = await prisma.membroEquipe.findMany({
      where: { ativo: true },
      orderBy: { ordem: "asc" },
    });
    return membros.length > 0 ? membros : fallbackEquipe;
  } catch {
    return fallbackEquipe;
  }
}
