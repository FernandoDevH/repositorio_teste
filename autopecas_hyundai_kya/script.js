// ========================================
// FUNCIONALIDADES INTERATIVAS
// ========================================

// Aguarda o carregamento completo do DOM
document.addEventListener("DOMContentLoaded", () => {
  // ========================================
  // NAVEGAÇÃO MOBILE
  // ========================================

  const navToggle = document.getElementById("nav-toggle")
  const navMenu = document.getElementById("nav-menu")

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active")
    })

    // Fecha o menu ao clicar em um link
    const navLinks = document.querySelectorAll(".nav-link")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active")
      })
    })
  }

  // ========================================
  // ANIMAÇÃO DOS NÚMEROS (COUNTER)
  // ========================================

  function animateCounter(element, target, duration = 2000) {
    const start = 0
    const increment = target / (duration / 16)
    let current = start

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        current = target
        clearInterval(timer)
      }

      const prefix = element.dataset.prefix || ""
      const suffix = element.dataset.suffix || ""

      if (target >= 1000) {
        element.textContent = prefix + Math.floor(current / 1000) + "k" + suffix
      } else {
        element.textContent = prefix + Math.floor(current) + suffix
      }
    }, 16)
  }

  // Observador para animar números quando entram na tela
  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -100px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target
        const target = Number.parseInt(element.dataset.target)
        animateCounter(element, target)
        observer.unobserve(element)
      }
    })
  }, observerOptions)

  // Observa todos os elementos com data-target
  document.querySelectorAll("[data-target]").forEach((el) => {
    observer.observe(el)
  })

  // ========================================
  // GRÁFICO DE PROJEÇÃO
  // ========================================

  const canvas = document.getElementById("projectionChart")
  if (canvas) {
    const ctx = canvas.getContext("2d")

    // Dados do gráfico
    const data = {
      labels: ["Mês 1", "Mês 2", "Mês 3", "Mês 4", "Mês 5", "Mês 6"],
      datasets: [
        {
          label: "Leads Qualificados",
          data: [15, 25, 35, 45, 55, 65],
          borderColor: "#2563eb",
          backgroundColor: "rgba(37, 99, 235, 0.1)",
          tension: 0.4,
          fill: true,
        },
        {
          label: "Conversões",
          data: [3, 6, 10, 15, 22, 30],
          borderColor: "#10b981",
          backgroundColor: "rgba(16, 185, 129, 0.1)",
          tension: 0.4,
          fill: true,
        },
      ],
    }

    // Configuração do gráfico
    const config = {
      type: "line",
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Projeção de Resultados - 6 Meses",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: "rgba(0, 0, 0, 0.1)",
            },
          },
          x: {
            grid: {
              color: "rgba(0, 0, 0, 0.1)",
            },
          },
        },
      },
    }

    // Desenha o gráfico manualmente (versão simplificada)
    drawSimpleChart(ctx, canvas.width, canvas.height)
  }

  // ========================================
  // SCROLL SUAVE PARA SEÇÕES
  // ========================================

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        const headerHeight = document.querySelector(".header").offsetHeight
        const targetPosition = target.offsetTop - headerHeight - 20

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // ========================================
  // EFEITO PARALLAX NO HERO
  // ========================================

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const hero = document.querySelector(".hero")
    if (hero) {
      hero.style.transform = `translateY(${scrolled * 0.5}px)`
    }
  })
})

// ========================================
// FUNÇÃO PARA ACCORDION
// ========================================

function toggleAccordion(element) {
  const accordionItem = element.parentElement
  const content = accordionItem.querySelector(".accordion-content")
  const icon = element.querySelector(".accordion-icon")

  // Fecha todos os outros accordions
  document.querySelectorAll(".accordion-item").forEach((item) => {
    if (item !== accordionItem) {
      item.classList.remove("active")
    }
  })

  // Toggle do accordion atual
  accordionItem.classList.toggle("active")
}

// ========================================
// FUNÇÃO PARA DESENHAR GRÁFICO SIMPLES
// ========================================

function drawSimpleChart(ctx, width, height) {
  // Limpa o canvas
  ctx.clearRect(0, 0, width, height)

  // Configurações
  const padding = 60
  const chartWidth = width - padding * 2
  const chartHeight = height - padding * 2

  // Dados
  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"]
  const leads = [15, 25, 35, 45, 55, 65]
  const conversions = [3, 6, 10, 15, 22, 30]

  // Desenha os eixos
  ctx.strokeStyle = "#e5e7eb"
  ctx.lineWidth = 1

  // Eixo X
  ctx.beginPath()
  ctx.moveTo(padding, height - padding)
  ctx.lineTo(width - padding, height - padding)
  ctx.stroke()

  // Eixo Y
  ctx.beginPath()
  ctx.moveTo(padding, padding)
  ctx.lineTo(padding, height - padding)
  ctx.stroke()

  // Desenha as linhas dos dados
  const stepX = chartWidth / (months.length - 1)
  const maxValue = Math.max(...leads)

  // Linha de Leads
  ctx.strokeStyle = "#2563eb"
  ctx.lineWidth = 3
  ctx.beginPath()

  leads.forEach((value, index) => {
    const x = padding + index * stepX
    const y = height - padding - (value / maxValue) * chartHeight

    if (index === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  })
  ctx.stroke()

  // Linha de Conversões
  ctx.strokeStyle = "#10b981"
  ctx.lineWidth = 3
  ctx.beginPath()

  conversions.forEach((value, index) => {
    const x = padding + index * stepX
    const y = height - padding - (value / maxValue) * chartHeight

    if (index === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  })
  ctx.stroke()

  // Adiciona pontos
  leads.forEach((value, index) => {
    const x = padding + index * stepX
    const y = height - padding - (value / maxValue) * chartHeight

    ctx.fillStyle = "#2563eb"
    ctx.beginPath()
    ctx.arc(x, y, 4, 0, 2 * Math.PI)
    ctx.fill()
  })

  conversions.forEach((value, index) => {
    const x = padding + index * stepX
    const y = height - padding - (value / maxValue) * chartHeight

    ctx.fillStyle = "#10b981"
    ctx.beginPath()
    ctx.arc(x, y, 4, 0, 2 * Math.PI)
    ctx.fill()
  })

  // Adiciona labels dos meses
  ctx.fillStyle = "#6b7280"
  ctx.font = "12px Inter"
  ctx.textAlign = "center"

  months.forEach((month, index) => {
    const x = padding + index * stepX
    const y = height - padding + 20
    ctx.fillText(month, x, y)
  })

  // Legenda
  ctx.textAlign = "left"
  ctx.fillStyle = "#2563eb"
  ctx.fillRect(padding, 20, 15, 3)
  ctx.fillStyle = "#1f2937"
  ctx.fillText("Leads Qualificados", padding + 25, 30)

  ctx.fillStyle = "#10b981"
  ctx.fillRect(padding + 150, 20, 15, 3)
  ctx.fillStyle = "#1f2937"
  ctx.fillText("Conversões", padding + 175, 30)
}

// ========================================
// ANIMAÇÕES DE ENTRADA
// ========================================

// Observador para animações de entrada
const fadeInObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  },
)

// Aplica animação a elementos específicos
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".metric-card, .differential-item, .funnel-stage, .timeline-item")

  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    fadeInObserver.observe(el)
  })
})
