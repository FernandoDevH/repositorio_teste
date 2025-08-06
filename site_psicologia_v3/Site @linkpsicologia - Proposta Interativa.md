# Site @linkpsicologia - Proposta Interativa

Um site moderno e responsivo desenvolvido para apresentar a proposta interativa da @linkpsicologia, especializada em psicologia infantil e atendimento a crianças com autismo em Belo Horizonte.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Características](#características)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Como Usar](#como-usar)
- [Funcionalidades](#funcionalidades)
- [Responsividade](#responsividade)
- [Manutenção](#manutenção)
- [Contato](#contato)

## 🎯 Sobre o Projeto

Este site foi desenvolvido para apresentar de forma interativa e moderna a proposta comercial da @linkpsicologia. O projeto inclui análise de concorrentes, estratégia de Meta Ads, proposta comercial e diferenciais do serviço, tudo apresentado em um layout atrativo e funcional.

## ✨ Características

- **Design Moderno**: Layout clean com gradientes, cards e animações suaves
- **Menu Sanfonado**: Seção de análise de concorrentes com accordion interativo
- **Responsivo**: Adaptado para desktop, tablet e mobile
- **Botão WhatsApp**: Botão flutuante para contato direto
- **Animações**: Efeitos de entrada, hover e scroll suave
- **Navegação Intuitiva**: Menu fixo com indicação da seção ativa

## 🛠 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Estilos modernos com Flexbox, Grid e animações
- **JavaScript**: Funcionalidades interativas e animações
- **Font Awesome**: Ícones vetoriais
- **Google Fonts**: Tipografia Inter

## 📁 Estrutura do Projeto

```
linkpsicologia-site/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # JavaScript
└── README.md           # Documentação
```

### Descrição dos Arquivos

#### `index.html`
Contém toda a estrutura HTML do site, organizada em seções:
- Header com navegação
- Seção Hero com estatísticas
- Apresentação da @linkpsicologia
- Análise de concorrentes (accordion)
- Estratégia Meta Ads + Funil de Vendas
- Proposta comercial
- Diferenciais do serviço
- Seção de contato
- Botão flutuante do WhatsApp

#### `styles.css`
Arquivo CSS organizado em seções comentadas:
- Reset e configurações básicas
- Header e navegação
- Seção Hero
- Cards de conteúdo
- Accordion (menu sanfonado)
- Funil de vendas
- Proposta comercial
- Diferenciais
- Botão WhatsApp
- Responsividade

#### `script.js`
JavaScript com funcionalidades:
- Navegação mobile
- Accordion interativo
- Scroll suave
- Animações de entrada
- Contadores animados
- Efeitos hover
- Destaque do link ativo

## 🚀 Como Usar

### 1. Hospedagem Local
```bash
# Navegue até o diretório do projeto
cd linkpsicologia-site

# Abra o arquivo index.html em um navegador
# Ou use um servidor local como Live Server (VS Code)
```

### 2. Hospedagem Web
1. Faça upload dos arquivos para seu servidor web
2. Certifique-se de que o `index.html` está na raiz
3. Acesse o site através do seu domínio

### 3. Personalização
- **Cores**: Modifique as variáveis de cor no CSS
- **Conteúdo**: Edite o texto diretamente no HTML
- **Imagens**: Adicione imagens na pasta e referencie no CSS/HTML
- **WhatsApp**: Altere o número no link do botão flutuante

## 🎮 Funcionalidades

### Menu Sanfonado (Accordion)
- Clique nos headers para expandir/contrair
- Apenas um item pode estar aberto por vez
- Animação suave de abertura/fechamento
- Ícones indicativos de estado

### Navegação
- Menu fixo no topo
- Scroll suave entre seções
- Destaque da seção ativa
- Menu hambúrguer para mobile

### Botão WhatsApp
- Posicionado no canto inferior direito
- Link direto para WhatsApp com mensagem pré-definida
- Animação de pulso para chamar atenção
- Responsivo para diferentes tamanhos de tela

### Animações
- Fade-in dos elementos ao entrar na tela
- Contadores animados na seção hero
- Efeitos hover nos cards
- Parallax sutil no banner

## 📱 Responsividade

O site é totalmente responsivo com breakpoints para:

- **Desktop**: 1024px+ (3 colunas no funil)
- **Tablet**: 768px-1024px (2 colunas no funil)
- **Mobile**: <768px (1 coluna, menu hambúrguer)
- **Mobile Pequeno**: <480px (ajustes adicionais)

## 🔧 Manutenção

### Atualizando Conteúdo

#### Modificar Texto
1. Abra o `index.html`
2. Localize a seção desejada pelos comentários
3. Edite o texto mantendo a estrutura HTML

#### Adicionar/Remover Concorrentes
1. No `index.html`, localize a seção `<!-- Container do accordion -->`
2. Copie um item existente como modelo
3. Modifique o conteúdo conforme necessário
4. Mantenha a estrutura de classes CSS

#### Alterar Cores
1. No `styles.css`, localize as variáveis de cor
2. Modifique os valores hexadecimais
3. Cores principais: `#2563eb` (azul), `#667eea` (azul claro)

#### Atualizar WhatsApp
1. No `index.html`, localize `<!-- Botão flutuante do WhatsApp -->`
2. Modifique o número no link `href="https://wa.me/NUMERO"`
3. Altere a mensagem pré-definida se necessário

### Adicionando Novas Seções
1. Crie a estrutura HTML seguindo o padrão existente
2. Adicione os estilos CSS correspondentes
3. Inclua o link na navegação
4. Teste a responsividade

### Otimização
- **Imagens**: Comprima imagens antes de adicionar
- **CSS**: Minifique para produção
- **JavaScript**: Considere minificação para sites grandes
- **Fonts**: Use `font-display: swap` para melhor performance

## 📞 Contato

Para dúvidas sobre o desenvolvimento ou manutenção do site:

- **E-mail**: analuizacunhagt@gmail.com
- **WhatsApp**: (31) 99934-7385

---

**Desenvolvido com ❤️ para @linkpsicologia**

