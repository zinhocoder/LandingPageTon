"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  CreditCard,
  Shield,
  Zap,
  Phone,
  Mail,
  MapPin,
  Star,
  Clock,
  Smartphone,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Wifi,
  Receipt,
  Percent,
  Truck,
  Calendar,
  Printer,
  Cpu,
  Battery,
  MonitorSmartphone,
  HeartHandshake,
  Headphones,
  Gift,
  Package,
  Award,
  BadgeDollarSign,
} from "lucide-react"

import { useState, useEffect, useRef } from "react"

// Componente para o seletor de planos
const PlanSelector = ({ currentPlan, onChange, plans = ["Ton Pro", "Ton Mega", "Ton Super"], className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center justify-between">
        <button
          className="flex items-center text-left w-full"
          onClick={() => onChange(currentPlan === plans[0] ? plans[1] : plans[0])}
        >
          <ChevronRight className="h-5 w-5 text-[#00C06B] mr-1 transform rotate-180" />
          <span className="text-[#00C06B] font-bold">{currentPlan}</span>
        </button>
        <button
          className="flex items-center text-left"
          onClick={() =>
            onChange(currentPlan === plans[plans.length - 1] ? plans[plans.length - 2] : plans[plans.length - 1])
          }
        >
          <span className="text-[#00C06B] font-bold sr-only">{currentPlan}</span>
          <ChevronRight className="h-5 w-5 text-[#00C06B] ml-1" />
        </button>
      </div>
    </div>
  )
}

// Componente para o seletor de recebimento
const ReceivingSelector = ({ currentOption, onChange }) => {
  const options = ["No mesmo dia", "Em até 1 dia útil"]

  return (
    <div className="relative">
      <button
        className="flex items-center text-[#00C06B] font-bold text-sm"
        onClick={() => onChange(currentOption === options[0] ? options[1] : options[0])}
      >
        {currentOption}
        <ChevronDown className="h-4 w-4 ml-1" />
      </button>
    </div>
  )
}

// Componente para o badge de característica
const FeatureBadge = ({ icon, text }) => {
  return (
    <div className="flex items-center gap-2 bg-[#E6F9F1] rounded-full py-1 px-3 text-xs font-medium text-[#00C06B]">
      {icon}
      <span>{text}</span>
    </div>
  )
}

// Componente para o card de produto
const ProductCard = ({
  model,
  title,
  discount,
  originalPrice,
  discountPrice,
  installmentValue,
  features,
  defaultPlan = "Ton Mega",
  defaultReceiving = "No mesmo dia",
  isFeatured = false,
  isApp = false,
}) => {
  const [selectedPlan, setSelectedPlan] = useState(defaultPlan)
  const [receivingOption, setReceivingOption] = useState(defaultReceiving)

  // Taxas que mudam de acordo com o plano
  const rates = {
    "Ton Pro": { debit: "2,39%", credit: "5,59%", creditInstallment: "17,99%" },
    "Ton Mega": { debit: "1,98%", credit: "4,86%", creditInstallment: "16,22%" },
    "Ton Super": { debit: "1,79%", credit: "4,49%", creditInstallment: "15,49%" },
    TapTon: { debit: "0,99%", credit: "3,09%", creditInstallment: "10,49%" },
  }

  // Seleciona as taxas corretas com base no plano
  const currentRates = isApp ? rates["TapTon"] : rates[selectedPlan]

  return (
    <div
      className={`bg-white rounded-3xl overflow-hidden border ${isFeatured ? "border-[#00C06B] shadow-xl scale-105 z-10" : "border-gray-100 shadow-lg"} hover:shadow-2xl transition-all duration-300 hover:translate-y-[-5px] group relative`}
    >
      {/* Discount Tag */}
      {discount && (
        <div className="absolute -right-2 -top-2 z-20">
          <div className="bg-[#00C06B] text-white font-bold py-1.5 px-3 rounded-lg shadow-lg transform rotate-2 flex items-center justify-center">
            <span className="text-xl mr-1">{discount}</span>
            <span className="text-xs leading-none">
              % DE
              <br />
              DESCONTO
            </span>
          </div>
        </div>
      )}

      {/* Popular Badge */}
      {isFeatured && (
        <div className="absolute top-0 left-0 right-0 bg-[#00C06B] text-white py-1.5 px-3 text-sm font-medium text-center">
          Mais Popular
        </div>
      )}

      {/* Header */}
      <div className={`relative ${isFeatured ? "pt-10" : "pt-6"} pb-4 px-5`}>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold">{model}</h3>
            <p className="text-[#00C06B] font-medium">{isApp ? "TapTon" : title}</p>
          </div>
          <div className="w-20 h-20 relative">
            <Image
              src="/images/tondiversas.png"
              alt={`Maquininha ${model}`}
              width={80}
              height={80}
              className="object-contain drop-shadow-xl"
              style={{
                filter: "drop-shadow(0 10px 10px rgba(0, 192, 107, 0.15))",
                mixBlendMode: "multiply",
              }}
            />
          </div>
        </div>

        {/* Price */}
        {isApp ? (
          <div className="mt-4 flex items-center justify-center">
            <span className="text-3xl font-bold text-[#00C06B]">Grátis</span>
          </div>
        ) : (
          <>
            <div className="mt-4 flex items-baseline">
              <div className="flex flex-col items-start">
                <span className="text-xs text-gray-500 line-through">R$ {originalPrice}</span>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-gray-900">R$ {discountPrice}</span>
                  <span className="text-xs text-gray-500 ml-2">à vista ou</span>
                </div>
              </div>
            </div>

            <div className="mt-2 flex items-center">
              <span className="text-xs text-gray-500">12x</span>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold text-[#00C06B] mx-1">{installmentValue.split(",")[0]}</span>
                {installmentValue.includes(",") && (
                  <span className="text-xs text-gray-500 self-start mt-1">,{installmentValue.split(",")[1]}</span>
                )}
              </div>
            </div>
          </>
        )}

        {/* Features Badge */}
        <div className="mt-4 flex flex-wrap gap-2">
          {features.map((feature, index) => (
            <FeatureBadge key={index} icon={feature.icon} text={feature.text} />
          ))}
        </div>
      </div>

      {/* Plan Type */}
      <div
        className={`${isFeatured ? "bg-[#E6F9F1] border-y border-[#00C06B]/20" : "bg-gray-50 border-y border-gray-100"} py-3 px-5`}
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500">Plano:</p>
            {isApp ? (
              <p className="text-[#00C06B] font-bold">TapTon</p>
            ) : (
              <PlanSelector currentPlan={selectedPlan} onChange={setSelectedPlan} />
            )}
          </div>
          <div>
            <p className="text-xs text-gray-500">Recebimento das vendas:</p>
            <ReceivingSelector currentOption={receivingOption} onChange={setReceivingOption} />
          </div>
        </div>
      </div>

      {/* Rates */}
      <div className="py-4 px-5">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-xs text-gray-500">DÉBITO</p>
            <p className="text-[#00C06B] font-bold text-lg">{currentRates.debit}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">CRÉDITO</p>
            <p className="text-[#00C06B] font-bold text-lg">{currentRates.credit}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">CRÉDITO 6X</p>
            <p className="text-[#00C06B] font-bold text-lg">{currentRates.creditInstallment}</p>
          </div>
        </div>
        <p className="text-xs text-gray-500 text-center mt-3">Sem mínimo de vendas</p>
      </div>

      {/* CTA Button */}
      <div className="px-5 pb-5">
        <button className="w-full py-3 bg-[#00C06B] hover:bg-[#00A868] text-white font-medium rounded-full transition-colors duration-300 shadow-lg shadow-green-200/30 hover:shadow-green-200/50">
          {isApp ? "Venda pelo celular" : `Pedir ${model} ${selectedPlan}`}
        </button>
      </div>

      {/* Features List */}
      <div className="px-5 pb-6 space-y-2.5">
        <div className="flex items-start gap-2.5">
          <Truck className="h-4 w-4 text-[#00C06B] mt-0.5 flex-shrink-0" />
          <p className="text-sm text-gray-700">Frete e troca grátis para todo o Brasil</p>
        </div>
        <div className="flex items-start gap-2.5">
          <Percent className="h-4 w-4 text-[#00C06B] mt-0.5 flex-shrink-0" />
          <p className="text-sm text-gray-700">Taxa 0% por 30 dias no Pix na Maquininha</p>
        </div>

        {model === "T1" && (
          <>
            <div className="flex items-start gap-2.5">
              <Smartphone className="h-4 w-4 text-[#00C06B] mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-700">Precisa de celular com internet</p>
            </div>
            <div className="flex items-start gap-2.5">
              <Receipt className="h-4 w-4 text-[#00C06B] mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-700">Comprovante por SMS</p>
            </div>
          </>
        )}

        {(model === "T3" || model === "T2") && (
          <>
            <div className="flex items-start gap-2.5">
              <Wifi className="h-4 w-4 text-[#00C06B] mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-700">Com Chip 3G e Wi-Fi</p>
            </div>
            <div className="flex items-start gap-2.5">
              <Receipt className="h-4 w-4 text-[#00C06B] mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-700">
                {model === "T3" ? "Comprovante impresso ou SMS" : "Comprovante por SMS"}
              </p>
            </div>
          </>
        )}

        {model === "T3 Smart" && (
          <>
            <div className="flex items-start gap-2.5">
              <Wifi className="h-4 w-4 text-[#00C06B] mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-700">Com Chip 4G e Wi-Fi</p>
            </div>
            <div className="flex items-start gap-2.5">
              <Receipt className="h-4 w-4 text-[#00C06B] mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-700">Comprovante impresso ou SMS</p>
            </div>
            <div className="flex items-start gap-2.5">
              <Battery className="h-4 w-4 text-[#00C06B] mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-700">Bateria de longa duração</p>
            </div>
            <div className="flex items-start gap-2.5">
              <MonitorSmartphone className="h-4 w-4 text-[#00C06B] mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-700">Sistema Android com Visor Touchscreen</p>
            </div>
          </>
        )}

        {isApp && (
          <>
            <div className="flex items-start gap-2.5">
              <Smartphone className="h-4 w-4 text-[#00C06B] mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-700">Venda na hora pelo App Ton</p>
            </div>
            <div className="flex items-start gap-2.5">
              <CreditCard className="h-4 w-4 text-[#00C06B] mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-700">Pix Grátis na Super Conta Ton</p>
            </div>
            <div className="flex items-start gap-2.5">
              <Calendar className="h-4 w-4 text-[#00C06B] mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-700">Parcele em até 12x</p>
            </div>
          </>
        )}

        <div className="flex items-start gap-2.5">
          <CreditCard className="h-4 w-4 text-[#00C06B] mt-0.5 flex-shrink-0" />
          <p className="text-sm text-gray-700">Aceite Pix na Maquininha</p>
        </div>

        {!isApp && (
          <div className="flex items-start gap-2.5">
            <Zap className="h-4 w-4 text-[#00C06B] mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-700">Receba por aproximação (NFC)</p>
          </div>
        )}
      </div>
    </div>
  )
}

// Componente para o card de benefício animado
const AnimatedFeatureCard = ({ icon, title, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div
      className={`bg-white rounded-xl p-6 shadow-lg border border-[#E6F9F1] hover:border-[#00C06B] transition-all duration-500 hover:shadow-xl hover:translate-y-[-5px] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex flex-col items-center text-center">
        <div className="bg-[#E6F9F1] p-4 rounded-full mb-4 group-hover:bg-[#00C06B] transition-colors duration-300">
          {icon}
        </div>
        <h3 className="font-bold text-lg mb-2 text-gray-900">{title}</h3>
      </div>
    </div>
  )
}

// Substitua o componente principal TonLandingPage com esta versão atualizada que inclui a animação
export default function TonLandingPage() {
  const heroRef = useRef(null)

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 flex h-16 md:h-20 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-center">
              <span className="text-xs font-medium text-[#00C06B] -mb-1">PARCEIRA</span>
              <div className="text-2xl md:text-3xl font-bold text-[#00C06B]">
                <span>ton</span>
                <span className="text-xs md:text-sm align-text-top ml-1">®</span>
              </div>
            </div>
          </div>
          <nav className="hidden md:flex gap-6 lg:gap-8 absolute left-1/2 transform -translate-x-1/2">
            <Link
              href="#maquininha"
              className="text-sm font-medium text-[#00C06B] hover:text-[#00A868] transition-colors"
            >
              Maquininha
            </Link>
            <Link
              href="#vantagens"
              className="text-sm font-medium text-gray-600 hover:text-[#00C06B] transition-colors"
            >
              Vantagens
            </Link>
            <Link href="#planos" className="text-sm font-medium text-gray-600 hover:text-[#00C06B] transition-colors">
              Planos
            </Link>
            <Link
              href="#depoimentos"
              className="text-sm font-medium text-gray-600 hover:text-[#00C06B] transition-colors"
            >
              Depoimentos
            </Link>
            <Link href="#contato" className="text-sm font-medium text-gray-600 hover:text-[#00C06B] transition-colors">
              Contato
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="#comprar"
              className="hidden md:inline-flex h-10 items-center justify-center rounded-full bg-[#00C06B] px-4 py-2 text-sm font-medium text-white shadow-lg shadow-green-200/50 hover:bg-[#00A868] transition-all duration-300 hover:shadow-green-200/80"
            >
              Comprar agora
            </Link>
            <Button variant="outline" size="icon" className="md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section id="hero" ref={heroRef} className="w-full py-12 md:py-16 lg:py-24 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[#E6F9F1] via-white to-white z-0"></div>

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid gap-8 md:gap-12 lg:grid-cols-2 items-center">
              <div className="flex flex-col justify-center space-y-4 md:space-y-6 order-2 lg:order-1">
                <div className="inline-flex items-center rounded-full border border-[#00C06B]/20 bg-[#E6F9F1] px-3 py-1 text-sm text-[#00C06B] w-fit">
                  <Star className="mr-1 h-3.5 w-3.5" />
                  <span>Líder em vendas no Brasil</span>
                </div>
                <div className="space-y-3 md:space-y-4">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tighter bg-gradient-to-r from-[#00C06B] to-[#00A868] bg-clip-text text-transparent">
                    Maquininha Ton
                  </h1>
                  <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-[600px]">
                    Transforme seu negócio com a solução de pagamentos mais{" "}
                    <span className="font-semibold text-[#00C06B]">moderna</span> e{" "}
                    <span className="font-semibold text-[#00C06B]">completa</span> do mercado. Taxas imbatíveis e
                    recebimento no mesmo dia.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mt-2 md:mt-4">
                  <Link
                    href="#comprar"
                    className="inline-flex h-12 items-center justify-center rounded-full bg-[#00C06B] px-6 md:px-8 text-base font-medium text-white shadow-lg shadow-green-200/50 hover:bg-[#00A868] transition-all duration-300 hover:shadow-green-200/80 hover:translate-y-[-2px]"
                  >
                    Comprar agora
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                  <Link
                    href="#saiba-mais"
                    className="inline-flex h-12 items-center justify-center rounded-full border border-gray-200 bg-white px-6 md:px-8 text-base font-medium text-gray-900 shadow-sm transition-all hover:bg-gray-50 hover:text-[#00C06B] hover:border-[#00C06B]/30 duration-300"
                  >
                    Saiba mais
                  </Link>
                </div>
                <div className="flex items-center gap-4 md:gap-6 mt-4 md:mt-8">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="inline-block h-6 w-6 md:h-8 md:w-8 rounded-full border-2 border-white bg-gray-200"
                      ></div>
                    ))}
                  </div>
                  <p className="text-xs md:text-sm text-gray-600">
                    <span className="font-semibold text-[#00C06B]">+10.000</span> empreendedores satisfeitos
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center order-1 lg:order-2">
                <div className="relative w-full max-w-[400px] mx-auto">
                  <Image
                    src="/images/tondiversas.png"
                    alt="Especialista Ton"
                    width={500}
                    height={600}
                    className="rounded-2xl shadow-lg object-cover w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00C06B]/20 to-transparent rounded-2xl"></div>
                </div>
              </div>
            </div>

            {/* Brands */}
            {/* Brands Carousel */}
            <div className="mt-12 md:mt-16 border-t border-gray-200 pt-6 md:pt-8">
              <p className="text-center text-xs md:text-sm text-gray-500 mb-4 md:mb-6">
                UTILIZADA POR MILHARES DE EMPRESAS EM TODO O BRASIL
              </p>
              <div className="relative overflow-hidden w-full">
                <div className="logos-slide-track flex animate-scroll">
                  {/* Logos das empresas */}
                  <div className="flex items-center justify-center mx-4 md:mx-8 min-w-[120px] md:min-w-[150px]">
                    <Image
                      src="/images/logo-magalu.png"
                      alt="Magazine Luiza"
                      width={120}
                      height={40}
                      className="h-8 md:h-10 w-auto object-contain"
                    />
                  </div>
                  <div className="flex items-center justify-center mx-4 md:mx-8 min-w-[120px] md:min-w-[150px]">
                    <Image
                      src="/images/logo-lojas-americanas-2048.png"
                      alt="Americanas"
                      width={120}
                      height={80}
                      className="h-16 md:h-10 w-auto object-contain"
                    />
                  </div>
                  <div className="flex items-center justify-center mx-4 md:mx-8 min-w-[120px] md:min-w-[150px]">
                    <Image
                      src="/images/logo-renner.png"
                      alt="Renner"
                      width={120}
                      height={40}
                      className="h-8 md:h-10 w-auto object-contain"
                    />
                  </div>
                  <div className="flex items-center justify-center mx-4 md:mx-8 min-w-[120px] md:min-w-[150px]">
                    <Image
                      src="/images/logo-riachuelo.png"
                      alt="Riachuelo"
                      width={120}
                      height={40}
                      className="h-8 md:h-10 w-auto object-contain"
                    />
                  </div>
                  <div className="flex items-center justify-center mx-4 md:mx-8 min-w-[120px] md:min-w-[150px]">
                    <Image
                      src="/images/logo-carrefour.png"
                      alt="Carrefour"
                      width={120}
                      height={40}
                      className="h-8 md:h-10 w-auto object-contain"
                    />
                  </div>
                  <div className="flex items-center justify-center mx-4 md:mx-8 min-w-[120px] md:min-w-[150px]">
                    <Image
                      src="/images/logo-natura.png"
                      alt="Natura"
                      width={120}
                      height={40}
                      className="h-8 md:h-10 w-auto object-contain"
                    />
                  </div>
                  <div className="flex items-center justify-center mx-4 md:mx-8 min-w-[120px] md:min-w-[150px]">
                    <Image
                      src="/images/magalu-logo-0.png"
                      alt="Magazine Luiza"
                      width={120}
                      height={40}
                      className="h-8 md:h-10 w-auto object-contain"
                    />
                  </div>
                  <div className="flex items-center justify-center mx-4 md:mx-8 min-w-[120px] md:min-w-[150px]">
                    <Image
                      src="/images/lojas-americanas.png"
                      alt="Americanas"
                      width={120}
                      height={40}
                      className="h-8 md: h-10 w-auto object-contain"
                    />
                  </div>
                  <div className="flex items-center justify-center mx-4 md:mx-8 min-w-[120px] md:min-w-[150px]">
                    <Image
                      src="/images/logo-renner-2048.png"
                      alt="Renner"
                      width={120}
                      height={40}
                      className="h-8 md:h-10 w-auto object-contain"
                    />
                  </div>
                  <div className="flex items-center justify-center mx-4 md:mx-8 min-w-[120px] md:min-w-[150px]">
                    <Image
                      src="/images/Riachuelo_logo_2013.png"
                      alt="Riachuelo"
                      width={120}
                      height={40}
                      className="h-8 md:h-10 w-auto object-contain"
                    />
                  </div>
                  <div className="flex items-center justify-center mx-4 md:mx-8 min-w-[120px] md:min-w-[150px]">
                    <Image
                      src="/images/carrefour-logo-1.png"
                      alt="Carrefour"
                      width={120}
                      height={40}
                      className="h-8 md:h-10 w-auto object-contain"
                    />
                  </div>
                  <div className="flex items-center justify-center mx-4 md:mx-8 min-w-[120px] md:min-w-[150px]">
                    <Image
                      src="/images/natura-108.png"
                      alt="Natura"
                      width={120}
                      height={40}
                      className="h-8 md:h-10 w-auto object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="maquininha" className="w-full py-16 md:py-20 lg:py-28 bg-white relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#F5FFFA] to-white"></div>
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12 md:mb-16">
              <div className="space-y-2 max-w-3xl">
                <div className="inline-block rounded-full bg-[#E6F9F1] px-3 py-1 text-sm text-[#00C06B] font-medium">
                  Tecnologia de Ponta
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-tighter text-gray-900">
                  A Maquininha que Revoluciona seu Negócio
                </h2>
                <p className="text-base md:text-lg lg:text-xl text-gray-600 mx-auto max-w-[800px] mt-4">
                  Design moderno com tecnologia avançada para oferecer a melhor experiência em pagamentos para você e
                  seus clientes.
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="grid gap-6 md:gap-8">
                  <div className="bg-[#F9FEFC] p-5 md:p-6 rounded-2xl border border-[#E6F9F1] hover:shadow-lg transition-all duration-300 hover:border-[#00C06B]/30 group">
                    <div className="flex gap-4">
                      <div className="bg-[#E6F9F1] rounded-xl p-3 group-hover:bg-[#00C06B] transition-colors duration-300 flex-shrink-0">
                        <CreditCard className="h-5 w-5 md:h-6 md:w-6 text-[#00C06B] group-hover:text-white transition-colors duration-300" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg md:text-xl mb-2 group-hover:text-[#00C06B] transition-colors duration-300">
                          Aceita Todas as Bandeiras
                        </h3>
                        <p className="text-sm md:text-base text-gray-600">
                          Visa, Mastercard, Elo, American Express e muito mais. Ofereça todas as opções para seus
                          clientes.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#F9FEFC] p-5 md:p-6 rounded-2xl border border-[#E6F9F1] hover:shadow-lg transition-all duration-300 hover:border-[#00C06B]/30 group">
                    <div className="flex gap-4">
                      <div className="bg-[#E6F9F1] rounded-xl p-3 group-hover:bg-[#00C06B] transition-colors duration-300 flex-shrink-0">
                        <Smartphone className="h-5 w-5 md:h-6 md:w-6 text-[#00C06B] group-hover:text-white transition-colors duration-300" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg md:text-xl mb-2 group-hover:text-[#00C06B] transition-colors duration-300">
                          Pix na Maquininha
                        </h3>
                        <p className="text-sm md:text-base text-gray-600">
                          Receba pagamentos via Pix diretamente na maquininha, com QR code e confirmação instantânea.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#F9FEFC] p-5 md:p-6 rounded-2xl border border-[#E6F9F1] hover:shadow-lg transition-all duration-300 hover:border-[#00C06B]/30 group">
                    <div className="flex gap-4">
                      <div className="bg-[#E6F9F1] rounded-xl p-3 group-hover:bg-[#00C06B] transition-colors duration-300 flex-shrink-0">
                        <Clock className="h-5 w-5 md:h-6 md:w-6 text-[#00C06B] group-hover:text-white transition-colors duration-300" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg md:text-xl mb-2 group-hover:text-[#00C06B] transition-colors duration-300">
                          Recebimento Rápido
                        </h3>
                        <p className="text-sm md:text-base text-gray-600">
                          Receba suas vendas em até 1 dia útil ou opte pelo recebimento no mesmo dia com taxa reduzida.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#F9FEFC] p-5 md:p-6 rounded-2xl border border-[#E6F9F1] hover:shadow-lg transition-all duration-300 hover:border-[#00C06B]/30 group">
                    <div className="flex gap-4">
                      <div className="bg-[#E6F9F1] rounded-xl p-3 group-hover:bg-[#00C06B] transition-colors duration-300 flex-shrink-0">
                        <Shield className="h-5 w-5 md:h-6 md:w-6 text-[#00C06B] group-hover:text-white transition-colors duration-300" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg md:text-xl mb-2 group-hover:text-[#00C06B] transition-colors duration-300">
                          Segurança Total
                        </h3>
                        <p className="text-sm md:text-base text-gray-600">
                          Proteção de dados e criptografia avançada em todas as transações, garantindo segurança para
                          você e seus clientes.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2 flex justify-center relative">
                <div className="absolute w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-gradient-to-r from-[#00C06B]/10 to-[#00C06B]/5 rounded-full blur-3xl opacity-70"></div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00C06B]/20 to-[#00C06B]/10 rounded-3xl blur-xl -m-4"></div>
                  <Image
                    src="/images/t2.png"
                    alt="Maquininha Ton Detalhes"
                    width={300}
                    height={400}
                    className="object-contain relative z-10 drop-shadow-2xl"
                    style={{
                      filter: "drop-shadow(0 25px 25px rgba(0, 192, 107, 0.15))",
                      mixBlendMode: "multiply",
                    }}
                  />
                  <div className="absolute -right-4 -bottom-[30%] bg-white rounded-2xl p-4 shadow-xl border border-gray-100 z-20 max-w-[180px] md:max-w-[200px]">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-3 w-3 bg-[#00C06B] rounded-full"></div>
                      <p className="text-xs md:text-sm font-medium">Aprovação Instantânea</p>
                    </div>
                    <p className="text-xs text-gray-600">
                      Transações aprovadas em segundos com confirmação visual e sonora
                    </p>
                  </div>
                  <div className="absolute -left-9 top-[-30%] bg-white rounded-2xl p-4 shadow-xl border border-gray-100 z-20 max-w-[180px] md:max-w-[200px]">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-3 w-3 bg-[#00C06B] rounded-full"></div>
                      <p className="text-xs md:text-sm font-medium">Conexão 4G e WiFi</p>
                    </div>
                    <p className="text-xs text-gray-600">
                      Conectividade garantida em qualquer lugar do seu estabelecimento
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="vantagens" className="w-full py-16 md:py-20 lg:py-28 bg-[#F9FEFC] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=600&width=600')] bg-no-repeat bg-right-top opacity-5"></div>
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12 md:mb-16">
              <div className="space-y-2 max-w-3xl">
                <div className="inline-block rounded-full bg-[#E6F9F1] px-3 py-1 text-sm text-[#00C06B] font-medium">
                  Vantagens Exclusivas
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-tighter text-gray-900">
                  Por que escolher a Ton?
                </h2>
                <p className="text-base md:text-lg lg:text-xl text-gray-600 mx-auto max-w-[800px] mt-4">
                  Descubra os benefícios que fazem da Ton a escolha ideal para empreendedores e empresas de todos os
                  tamanhos.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] bg-white overflow-hidden group">
                <div className="h-2 bg-[#00C06B] w-full"></div>
                <CardContent className="p-6 md:p-8">
                  <div className="rounded-full bg-[#E6F9F1] p-4 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center mb-6 group-hover:bg-[#00C06B] transition-colors duration-300">
                    <CreditCard className="h-6 w-6 md:h-8 md:w-8 text-[#00C06B] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-4 group-hover:text-[#00C06B] transition-colors duration-300">
                    Taxas Imbatíveis
                  </h3>
                  <p className="text-sm md:text-base text-gray-600">
                    As melhores taxas do mercado, sem surpresas ou custos ocultos. Economize em cada transação.
                  </p>
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs md:text-sm text-gray-500">Taxa de débito a partir de</p>
                        <p className="text-xl md:text-2xl font-bold text-[#00C06B]">1,79%</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-[#00C06B] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] bg-white overflow-hidden group">
                <div className="h-2 bg-[#00C06B] w-full"></div>
                <CardContent className="p-6 md:p-8">
                  <div className="rounded-full bg-[#E6F9F1] p-4 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center mb-6 group-hover:bg-[#00C06B] transition-colors duration-300">
                    <Zap className="h-6 w-6 md:h-8 md:w-8 text-[#00C06B] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-4 group-hover:text-[#00C06B] transition-colors duration-300">
                    Recebimento Rápido
                  </h3>
                  <p className="text-sm md:text-base text-gray-600">
                    Receba o valor das suas vendas em até 1 dia útil, sem taxa adicional. Opção de recebimento no mesmo
                    dia.
                  </p>
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs md:text-sm text-gray-500">Receba em até</p>
                        <p className="text-xl md:text-2xl font-bold text-[#00C06B]">1 dia útil</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-[#00C06B] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] bg-white overflow-hidden group">
                <div className="h-2 bg-[#00C06B] w-full"></div>
                <CardContent className="p-6 md:p-8">
                  <div className="rounded-full bg-[#E6F9F1] p-4 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center mb-6 group-hover:bg-[#00C06B] transition-colors duration-300">
                    <Shield className="h-6 w-6 md:h-8 md:w-8 text-[#00C06B] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-4 group-hover:text-[#00C06B] transition-colors duration-300">
                    Suporte Dedicado
                  </h3>
                  <p className="text-sm md:text-base text-gray-600">
                    Atendimento especializado para resolver qualquer dúvida ou problema, disponível todos os dias.
                  </p>
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs md:text-sm text-gray-500">Atendimento</p>
                        <p className="text-xl md:text-2xl font-bold text-[#00C06B]">7 dias/semana</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-[#00C06B] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 md:mt-16 flex justify-center">
              <Link
                href="#planos"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#00C06B] px-6 md:px-8 text-base font-medium text-white shadow-lg shadow-green-200/50 hover:bg-[#00A868] transition-all duration-300 hover:shadow-green-200/80 hover:translate-y-[-2px]"
              >
                Ver planos disponíveis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Por que comprar comigo? Section */}
        <section id="comprar-comigo" className="w-full py-16 md:py-20 lg:py-28 bg-white relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#F9FEFC] to-white"></div>
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12 md:mb-16">
              <div className="space-y-2 max-w-3xl">
                <div className="inline-block rounded-full bg-[#E6F9F1] px-3 py-1 text-sm text-[#00C06B] font-medium">
                  Benefícios Exclusivos
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-tighter text-gray-900">
                  Por que comprar comigo?
                </h2>
                <p className="text-base md:text-lg lg:text-xl text-gray-600 mx-auto max-w-[800px] mt-4">
                  Como parceira oficial Ton, ofereço vantagens exclusivas para você e seu negócio.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
              <AnimatedFeatureCard
                icon={<HeartHandshake className="h-6 w-6 md:h-8 md:w-8 text-[#00C06B]" />}
                title="Atendimento personalizado"
                delay={100}
              />
              <AnimatedFeatureCard
                icon={<Headphones className="h-6 w-6 md:h-8 md:w-8 text-[#00C06B]" />}
                title="Suporte total"
                delay={200}
              />
              <AnimatedFeatureCard
                icon={<Gift className="h-6 w-6 md:h-8 md:w-8 text-[#00C06B]" />}
                title="Promoções exclusivas"
                delay={300}
              />
              <AnimatedFeatureCard
                icon={<Package className="h-6 w-6 md:h-8 md:w-8 text-[#00C06B]" />}
                title="Entrega rápida"
                delay={400}
              />
              <AnimatedFeatureCard
                icon={<Award className="h-6 w-6 md:h-8 md:w-8 text-[#00C06B]" />}
                title="Garantia vitalícia"
                delay={500}
              />
              <AnimatedFeatureCard
                icon={<BadgeDollarSign className="h-6 w-6 md:h-8 md:w-8 text-[#00C06B]" />}
                title="Menor taxa do mercado"
                delay={600}
              />
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 bg-[#F9FEFC] rounded-3xl p-6 md:p-8 border border-[#E6F9F1] shadow-lg">
              <div className="lg:w-1/2 relative">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-04-02%20at%2017.35.20_41e2fcb4.jpg-QjR1DV7FOgriALo26wjRLGkxtr7QYQ.jpeg"
                  alt="Especialista Ton"
                  width={500}
                  height={500}
                  className="rounded-2xl shadow-lg object-cover w-full h-auto"
                />
              </div>
              <div className="lg:w-1/2 space-y-4 md:space-y-6">
                <div className="flex flex-col items-start">
                  <span className="text-xs font-medium text-[#00C06B] -mb-1">PARCEIRA</span>
                  <div className="text-xl md:text-2xl font-bold text-[#00C06B]">
                    <span>ton</span>
                    <span className="text-xs md:text-sm align-text-top ml-1">®</span>
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold">Conte com uma especialista certificada</h3>
                <p className="text-sm md:text-base text-gray-600">
                  Como parceira oficial Ton, estou aqui para oferecer o melhor atendimento e as melhores condições para
                  o seu negócio. Tenho acesso a promoções exclusivas e posso garantir um suporte personalizado em todas
                  as etapas.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 bg-[#00C06B] rounded-full"></div>
                    <p className="text-xs md:text-sm font-medium">Atendimento 7 dias por semana</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 bg-[#00C06B] rounded-full"></div>
                    <p className="text-xs md:text-sm font-medium">Suporte pós-venda</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 bg-[#00C06B] rounded-full"></div>
                    <p className="text-xs md:text-sm font-medium">Descontos exclusivos</p>
                  </div>
                </div>
                <Button className="rounded-full bg-[#00C06B] hover:bg-[#00A868] transition-all duration-300 shadow-lg shadow-green-200/30 hover:shadow-green-200/50 px-6">
                  Fale comigo agora
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="planos" className="w-full py-16 md:py-20 lg:py-28 bg-white relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#F9FEFC] to-white"></div>
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12 md:mb-16">
              <div className="space-y-2 max-w-3xl">
                <div className="inline-block rounded-full bg-[#E6F9F1] px-3 py-1 text-sm text-[#00C06B] font-medium">
                  Planos Flexíveis
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-tighter text-gray-900">
                  Escolha a Maquininha Ideal para Você
                </h2>
                <p className="text-base md:text-lg lg:text-xl text-gray-600 mx-auto max-w-[800px] mt-4">
                  Opções flexíveis que se adaptam ao tamanho e às necessidades do seu negócio, com preços acessíveis.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-[1400px] mx-auto">
              {/* T1 */}
              <ProductCard
                model="T1"
                title="Maquininha Compacta"
                discount="30"
                originalPrice="32,57"
                discountPrice="21,66"
                installmentValue="1,81"
                features={[{ icon: <Smartphone className="h-3 w-3" />, text: "Precisa de celular" }]}
              />

              {/* T3 */}
              <ProductCard
                model="T3"
                title="Maquininha Completa"
                discount="40"
                originalPrice="258,00"
                discountPrice="147,06"
                installmentValue="12,26"
                features={[
                  { icon: <Printer className="h-3 w-3" />, text: "Impressora bobina" },
                  { icon: <Cpu className="h-3 w-3" />, text: "Com chip" },
                ]}
                isFeatured={true}
              />

              {/* T3 Smart */}
              <ProductCard
                model="T3 Smart"
                title="Maquininha Premium"
                discount="50"
                originalPrice="357,50"
                discountPrice="169,86"
                installmentValue="14,16"
                features={[
                  { icon: <Battery className="h-3 w-3" />, text: "+2 bateria" },
                  { icon: <MonitorSmartphone className="h-3 w-3" />, text: "Touch screen" },
                ]}
              />

              {/* T2 */}
              <ProductCard
                model="T2"
                title="Maquininha Intermediária"
                discount="30"
                originalPrice="99,43"
                discountPrice="66,12"
                installmentValue="5,51"
                features={[
                  { icon: <Wifi className="h-3 w-3" />, text: "Conexão 3G" },
                  { icon: <Cpu className="h-3 w-3" />, text: "Com chip" },
                ]}
              />

              {/* TapTon */}
              <ProductCard
                model="TapTon"
                title="App de Pagamentos"
                discount=""
                originalPrice=""
                discountPrice=""
                installmentValue=""
                features={[{ icon: <Smartphone className="h-3 w-3" />, text: "Venda pelo celular" }]}
                defaultPlan="TapTon"
                isApp={true}
              />
            </div>

            <div className="mt-12 md:mt-16 bg-[#F9FEFC] rounded-3xl p-6 md:p-8 border border-[#E6F9F1] max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                <div className="md:w-1/2">
                  <h3 className="text-xl md:text-2xl font-bold mb-3  md:mb-4">Ainda com dúvidas?</h3>
                  <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                    Nossos consultores estão prontos para ajudar você a escolher o plano ideal para o seu negócio.
                  </p>
                  <Button className="rounded-full bg-[#00C06B] hover:bg-[#00A868] transition-all duration-300 shadow-lg shadow-green-200/30 hover:shadow-green-200/50 px-6">
                    Fale com especialista
                  </Button>
                </div>
                <div className="md:w-1/2 relative">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-04-02%20at%2017.35.20_41e2fcb4.jpg-QjR1DV7FOgriALo26wjRLGkxtr7QYQ.jpeg"
                    alt="Especialista Ton"
                    width={200}
                    height={250}
                    className="object-cover mx-auto rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="depoimentos" className="w-full py-16 md:py-20 lg:py-28 bg-[#F9FEFC] relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=600')] bg-repeat opacity-5"></div>
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12 md:mb-16">
              <div className="space-y-2 max-w-3xl">
                <div className="inline-block rounded-full bg-[#E6F9F1] px-3 py-1 text-sm text-[#00C06B] font-medium">
                  Depoimentos
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-tighter text-gray-900">
                  O que nossos clientes dizem
                </h2>
                <p className="text-base md:text-lg lg:text-xl text-gray-600 mx-auto max-w-[800px] mt-4">
                  Histórias reais de empreendedores que transformaram seus negócios com a Maquininha Ton.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
              <Card className="border-none shadow-xl rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:translate-y-[-5px] bg-white">
                <CardContent className="p-6 md:p-8">
                  <div className="flex flex-col space-y-4 md:space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 md:h-16 md:w-16 rounded-full bg-gray-200 flex-shrink-0"></div>
                      <div>
                        <h3 className="font-bold text-base md:text-lg">Carlos Silva</h3>
                        <p className="text-xs md:text-sm text-gray-600">Restaurante Sabor & Arte</p>
                      </div>
                    </div>
                    <div className="flex text-[#00C06B]">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="h-4 w-4 md:h-5 md:w-5 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs md:text-sm text-gray-600 italic">
                      "A Maquininha Ton revolucionou meu restaurante. Agora recebo os pagamentos no mesmo dia e as taxas
                      são muito mais justas. O atendimento ao cliente é excelente!"
                    </p>
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                      <p className="text-xs md:text-sm text-gray-500">Cliente desde 2022</p>
                      <div className="bg-[#E6F9F1] p-2 rounded-full">
                        <CreditCard className="h-3 w-3 md:h-4 md:w-4 text-[#00C06B]" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:translate-y-[-5px] bg-white">
                <CardContent className="p-6 md:p-8">
                  <div className="flex flex-col space-y-4 md:space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 md:h-16 md:w-16 rounded-full bg-gray-200 flex-shrink-0"></div>
                      <div>
                        <h3 className="font-bold text-base md:text-lg">Ana Oliveira</h3>
                        <p className="text-xs md:text-sm text-gray-600">Boutique Elegance</p>
                      </div>
                    </div>
                    <div className="flex text-[#00C06B]">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="h-4 w-4 md:h-5 md:w-5 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs md:text-sm text-gray-600 italic">
                      "Desde que comecei a usar a Ton, minhas vendas aumentaram 30%. Os clientes adoram a praticidade e
                      eu amo as taxas baixas e o recebimento rápido!"
                    </p>
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                      <p className="text-xs md:text-sm text-gray-500">Cliente desde 2021</p>
                      <div className="bg-[#E6F9F1] p-2 rounded-full">
                        <CreditCard className="h-3 w-3 md:h-4 md:w-4 text-[#00C06B]" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:translate-y-[-5px] bg-white">
                <CardContent className="p-6 md:p-8">
                  <div className="flex flex-col space-y-4 md:space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 md:h-16 md:w-16 rounded-full bg-gray-200 flex-shrink-0"></div>
                      <div>
                        <h3 className="font-bold text-base md:text-lg">Marcos Santos</h3>
                        <p className="text-xs md:text-sm text-gray-600">Barbearia Vintage</p>
                      </div>
                    </div>
                    <div className="flex text-[#00C06B]">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="h-4 w-4 md:h-5 md:w-5 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs md:text-sm text-gray-600 italic">
                      "A maquininha é super fácil de usar e o aplicativo me dá total controle sobre minhas vendas. O
                      suporte técnico é rápido e eficiente quando preciso."
                    </p>
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                      <p className="text-xs md:text-sm text-gray-500">Cliente desde 2023</p>
                      <div className="bg-[#E6F9F1] p-2 rounded-full">
                        <CreditCard className="h-3 w-3 md:h-4 md:w-4 text-[#00C06B]" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="comprar" className="w-full py-16 md:py-20 lg:py-28 bg-[#00C06B] relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=600')] bg-repeat opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#00C06B] to-[#00A868]"></div>
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
              <div>
                <div className="inline-block rounded-full bg-white/20 px-3 py-1 text-sm text-white font-medium mb-4 md:mb-6">
                  Oferta Especial
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
                  Pronto para impulsionar seu negócio?
                </h2>
                <p className="text-base md:text-lg lg:text-xl text-white/90 mb-6 md:mb-8 max-w-xl">
                  Adquira sua Maquininha Ton hoje mesmo e comece a aceitar pagamentos com as melhores taxas do mercado.
                </p>

                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-4 md:p-6 border border-white/20 mb-6 md:mb-8">
                  <div className="flex flex-col md:flex-row gap-4 items-center">
                    <div className="flex-1">
                      <p className="text-sm md:text-base text-white font-medium mb-2">Oferta por tempo limitado:</p>
                      <div className="flex items-baseline">
                        <span className="text-2xl md:text-4xl font-bold text-white">R$99</span>
                        <span className="text-white/80 ml-1">,90</span>
                        <span className="text-white/80 ml-2 line-through">R$149,90</span>
                      </div>
                    </div>
                    <div className="bg-white text-[#00C06B] px-3 py-1 md:px-4 md:py-2 rounded-full font-bold text-sm md:text-base">
                      33% OFF
                    </div>
                  </div>
                </div>

                <form className="flex flex-col sm:flex-row gap-4 max-w-xl">
                  <Input
                    type="tel"
                    placeholder="Digite seu telefone"
                    className="flex-1 bg-white/90 border-white/20 h-12 md:h-14 rounded-full text-gray-900 placeholder:text-gray-500"
                  />
                  <Button
                    type="submit"
                    className="h-12 md:h-14 rounded-full bg-white text-[#00C06B] hover:bg-gray-100 transition-all duration-300 px-6 md:px-8 font-medium text-base shadow-lg"
                  >
                    Quero comprar
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
                <p className="text-white/70 text-xs md:text-sm mt-4">
                  Ao informar meus dados, concordo com a{" "}
                  <Link href="#" className="underline underline-offset-2 hover:text-white transition-colors">
                    Política de Privacidade
                  </Link>
                </p>
              </div>

              <div className="relative hidden lg:block">
                <div className="absolute inset-0 bg-white/10 rounded-full blur-3xl opacity-30"></div>
                <div className="relative z-10 transform transition-all duration-500 hover:scale-105 hover:rotate-1">
                  <Image
                    src="/images/t1.png"
                    alt="Maquininha Ton"
                    width={400}
                    height={500}
                    className="object-contain drop-shadow-2xl"
                    style={{
                      filter: "drop-shadow(0 25px 25px rgba(0, 192, 107, 0.15))",
                      mixBlendMode: "multiply",
                    }}
                  />
                  <div className="absolute -right-4 top-1/4 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 z-20 max-w-[200px]">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-3 w-3 bg-[#00C06B] rounded-full"></div>
                      <p className="text-sm font-medium">Entrega Rápida</p>
                    </div>
                    <p className="text-xs text-gray-600">Receba em até 3 dias úteis em todo Brasil</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contato" className="w-full py-16 md:py-20 lg:py-28 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-8 md:gap-10 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="space-y-4 md:space-y-6">
                <div className="inline-block rounded-full bg-[#E6F9F1] px-3 py-1 text-sm text-[#00C06B] font-medium">
                  Contato
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-tighter">
                  Estamos aqui para ajudar
                </h2>
                <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-[600px]">
                  Tem dúvidas sobre nossos produtos ou serviços? Entre em contato conosco e teremos prazer em ajudar.
                </p>
                <div className="space-y-4 md:space-y-6 mt-6 md:mt-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#E6F9F1] p-3 rounded-full flex-shrink-0">
                      <Phone className="h-5 w-5 md:h-6 md:w-6 text-[#00C06B]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base md:text-lg">Telefone</h3>
                      <p className="text-sm md:text-base text-gray-600">0800 123 4567</p>
                      <p className="text-xs md:text-sm text-gray-500 mt-1">Seg-Sex: 8h às 20h | Sáb: 8h às 16h</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-[#E6F9F1] p-3 rounded-full flex-shrink-0">
                      <Mail className="h-5 w-5 md:h-6 md:w-6 text-[#00C06B]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base md:text-lg">Email</h3>
                      <p className="text-sm md:text-base text-gray-600">contato@ton.com.br</p>
                      <p className="text-xs md:text-sm text-gray-500 mt-1">Respondemos em até 24h</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-[#E6F9F1] p-3 rounded-full flex-shrink-0">
                      <MapPin className="h-5 w-5 md:h-6 md:w-6 text-[#00C06B]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base md:text-lg">Endereço</h3>
                      <p className="text-sm md:text-base text-gray-600">
                        AV. Doutora Ruth Cardoso, 20º andar, Pinheiros, São Paulo, SP.
                      </p>
                      <p className="text-xs md:text-sm text-gray-500 mt-1">CEP: 05425-070</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Card className="border-none shadow-xl rounded-3xl overflow-hidden">
                  <CardContent className="p-6 md:p-8">
                    <h3 className="font-bold text-xl md:text-2xl mb-4 md:mb-6">Envie uma mensagem</h3>
                    <form className="space-y-4 md:space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-xs md:text-sm font-medium">
                            Nome
                          </label>
                          <Input id="name" placeholder="Digite seu nome" className="h-10 md:h-12 rounded-xl" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-xs md:text-sm font-medium">
                            Email
                          </label>
                          <Input id="email" placeholder="Digite seu email" className="h-10 md:h-12 rounded-xl" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-xs md:text-sm font-medium">
                          Telefone
                        </label>
                        <Input id="phone" placeholder="Digite seu telefone" className="h-10 md:h-12 rounded-xl" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-xs md:text-sm font-medium">
                          Mensagem
                        </label>
                        <textarea
                          id="message"
                          className="flex min-h-[100px] md:min-h-[120px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Digite sua mensagem"
                        />
                      </div>
                      <Button className="w-full h-10 md:h-12 rounded-full bg-[#00C06B] hover:bg-[#00A868] transition-all duration-300 shadow-lg shadow-green-200/30 hover:shadow-green-200/50">
                        Enviar mensagem
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Localizacao Section */}
        <section id="localizacao" className="w-full py-16 md:py-20 lg:py-28 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12 md:mb-16">
              <div className="space-y-2 max-w-3xl">
                <div className="inline-block rounded-full bg-[#E6F9F1] px-3 py-1 text-sm text-[#00C06B] font-medium">
                  Onde Estamos
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-tighter text-gray-900">
                  Nossa Localização
                </h2>
                <p className="text-base md:text-lg lg:text-xl text-gray-600 mx-auto max-w-[800px] mt-4">
                  Visite nossa sede ou entre em contato para mais informações sobre nossos produtos e serviços.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center max-w-6xl mx-auto">
              <div className="bg-[#F9FEFC] p-6 md:p-8 rounded-3xl border border-[#E6F9F1] shadow-lg">
                <div className="flex flex-col space-y-4 md:space-y-6">
                  <div className="flex flex-col items-center md:items-start">
                    <span className="text-xs font-medium text-[#00C06B] -mb-1">PARCEIRA</span>
                    <div className="text-xl md:text-2xl font-bold text-[#00C06B]">
                      <span>ton</span>
                      <span className="text-xs md:text-sm align-text-top ml-1">®</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl md:text-2xl font-bold text-[#00C06B]">AV. Doutora Ruth Cardoso</h3>
                    <p className="text-lg md:text-xl text-gray-700">20º andar, Pinheiros</p>
                    <p className="text-lg md:text-xl text-gray-700">São Paulo, SP</p>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm md:text-base text-gray-600">
                      Horário de funcionamento: Segunda a Sexta, das 9h às 18h
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button className="rounded-full bg-[#00C06B] hover:bg-[#00A868] transition-all duration-300 shadow-lg shadow-green-200/30 hover:shadow-green-200/50">
                      Como chegar
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-full border-[#00C06B] text-[#00C06B] hover:bg-[#E6F9F1]"
                    >
                      Agendar visita
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-[#F9FEFC] p-6 md:p-8 rounded-3xl border border-[#E6F9F1] shadow-lg h-[300px] md:h-[400px] flex items-center justify-center">
                <div className="text-center space-y-4">
                  <MapPin className="h-12 w-12 md:h-16 md:w-16 text-[#00C06B] mx-auto" />
                  <p className="text-sm md:text-base text-gray-600">
                    Mapa de localização disponível. Utilize um aplicativo de mapas para navegar até nosso endereço.
                  </p>
                  <Button variant="outline" className="rounded-full border-[#00C06B] text-[#00C06B] hover:bg-[#E6F9F1]">
                    Abrir no Google Maps
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#F9FEFC] py-8 md:py-12 border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 md:mb-12">
            <div className="space-y-4">
              <div className="flex flex-col items-center md:items-start">
                <span className="text-xs font-medium text-[#00C06B] -mb-1">PARCEIRA</span>
                <div className="text-2xl md:text-3xl font-bold text-[#00C06B]">
                  <span>ton</span>
                  <span className="text-xs md:text-sm align-text-top ml-1">®</span>
                </div>
              </div>
              <p className="text-sm md:text-base text-gray-600">
                A solução completa para o seu negócio aceitar pagamentos com as melhores taxas do mercado.
              </p>
              <div className="flex gap-4">
                <Link href="#" className="text-gray-400 hover:text-[#00C06B] transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-[#00C06B] transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-[#00C06B] transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                  <span className="sr-only">Twitter</span>
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Produtos</h3>
              <ul className="space-y-2 md:space-y-3">
                <li>
                  <Link href="#" className="text-sm md:text-base text-gray-600 hover:text-[#00C06B] transition-colors">
                    Maquininha Ton
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm md:text-base text-gray-600 hover:text-[#00C06B] transition-colors">
                    Conta Digital
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm md:text-base text-gray-600 hover:text-[#00C06B] transition-colors">
                    Link de Pagamento
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm md:text-base text-gray-600 hover:text-[#00C06B] transition-colors">
                    Ton Tap
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Empresa</h3>
              <ul className="space-y-2 md:space-y-3">
                <li>
                  <Link href="#" className="text-sm md:text-base text-gray-600 hover:text-[#00C06B] transition-colors">
                    Sobre nós
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm md:text-base text-gray-600 hover:text-[#00C06B] transition-colors">
                    Carreiras
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm md:text-base text-gray-600 hover:text-[#00C06B] transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm md:text-base text-gray-600 hover:text-[#00C06B] transition-colors">
                    Imprensa
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Suporte</h3>
              <ul className="space-y-2 md:space-y-3">
                <li>
                  <Link href="#" className="text-sm md:text-base text-gray-600 hover:text-[#00C06B] transition-colors">
                    Central de Ajuda
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm md:text-base text-gray-600 hover:text-[#00C06B] transition-colors">
                    Fale Conosco
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm md:text-base text-gray-600 hover:text-[#00C06B] transition-colors">
                    Política de Privacidade
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm md:text-base text-gray-600 hover:text-[#00C06B] transition-colors">
                    Termos de Uso
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-center text-xs md:text-sm text-gray-600 md:text-left mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Ton. Todos os direitos reservados.
            </p>
            <div className="flex gap-4 md:gap-6">
              <Link href="#" className="text-xs md:text-sm text-gray-600 hover:text-[#00C06B] transition-colors">
                Política de Privacidade
              </Link>
              <Link href="#" className="text-xs md:text-sm text-gray-600 hover:text-[#00C06B] transition-colors">
                Termos de Serviço
              </Link>
              <Link href="#" className="text-xs md:text-sm text-gray-600 hover:text-[#00C06B] transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
