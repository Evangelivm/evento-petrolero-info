"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ChevronRight,
  CheckCircle,
  Download,
  Loader2,
} from "lucide-react";
import RegistrationForm from "./components/registration-form";
import { useState } from "react";

export default function Home() {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const generateProgramPDF = async () => {
    setIsGeneratingPDF(true);

    try {
      // Importar dinámicamente jsPDF solo cuando se necesite
      const { jsPDF } = await import("jspdf");
      // @ts-ignore
      const autoTable = (await import("jspdf-autotable")).default;

      const doc = new jsPDF();

      // Añadir encabezado
      doc.setFillColor(245, 158, 11); // Color ámbar
      doc.rect(0, 0, 210, 40, "F");

      doc.setFont("helvetica", "bold");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(22);
      doc.text("REACTIVA-PETROL 2025", 105, 15, { align: "center" });

      doc.setFontSize(16);
      doc.text("PROGRAMA COMPLETO DEL EVENTO", 105, 25, { align: "center" });
      doc.setFontSize(12);
      doc.text("12 - 14 de Agosto, 2025 | Talara - Perú", 105, 35, {
        align: "center",
      });

      // Añadir subtítulo
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(14);
      doc.text("Reactivación Petrolera en la Región Piura", 105, 50, {
        align: "center",
      });

      // Día 1
      doc.setFontSize(16);
      doc.setTextColor(245, 158, 11); // Color ámbar
      doc.text("Día 1: Innovación y Tecnología", 20, 65);
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      doc.text("12 de Agosto, 2025", 20, 72);

      // Tabla para el día 1
      autoTable(doc, {
        startY: 75,
        head: [["Horario", "Actividad", "Ponente"]],
        body: [
          ["07:15 - 08:00", "Inscripción de participantes", ""],
          [
            "08:00 - 08:15",
            "Palabras de Bienvenida",
            "Luis Ernesto Neyra Leon, Gobernador Regional de Piura",
          ],
          [
            "08:15 - 08:30",
            "Inauguración del Foro",
            "Dina Ercilla Boluarte Zegarra, Presidente de la Republica del Perú",
          ],
          [
            "",
            "BLOQUE 1: Plan Reactivacion Petrolera en 47 nuevas Areas E&P",
            "",
          ],
          [
            "08:30 - 08:50",
            "Estabilidad Jurídica y Política para la Inversion en Hidrocarburos",
            "Pedro Chira Fernandez, Presidente del Directorio PERUPETRO SA",
          ],
          [
            "09:00 - 09:20",
            "Petroperu: Visión próximos 30 años (Upstream, Downstream y Midstream)",
            "Alejandro Narvaez Liceras, Presidente del Directorio PETROPERU SA",
          ],
          [
            "09:30 - 09:45",
            "FLASH DE PRODUCCION: Anuncio inversiones en Cuenca Talara",
            "",
          ],
          ["10:00 - 10:20", "COFFE BREACK", ""],
          [
            "10:30 - 10:50",
            "Estrategias para Revitalización de Campos Maduros",
            "Hugo Gustavo Pelilza, Consultor de Gestión en Petroleo y Gas",
          ],
          [
            "11:00 - 11:20",
            "Reactivacion Petrolera en 47 nuevas Areas Fase cero",
            "Asaid Bandach Gallegos, Gerente Tecnico PERUPETRO SA",
          ],
          [
            "11:20 - 12:30",
            "Panel de comentarios",
            "Manuel Farias (CAPPETROL), Tomas Díaz (Petroperu), Oscar Ferney (ACIPET), Segismundo Cruces (Gob. Tumbes). Moderador: Guillermo Morales (CIP Talara)",
          ],
          ["12:30 - 14:00", "ALMUERZO LIBRE", ""],
          [
            "14:00 - 14:20",
            "El Agua en la industria de Hidrocarburos",
            "Cesar Pabon Martínez, Ingeniero Senior Andes Operating Company",
          ],
          [
            "14:20 - 14:40",
            "Tema por confirmar",
            "Ricardo Andres Sarmiento, CEO Estrella International Energy Services",
          ],
          [
            "14:40 - 15:00",
            "Soluciones Off Shore/On Shore: Izaje y Amarre",
            "Ednaldo da Purificacao Silva, Director Tecnofextil",
          ],
          [
            "15:00 - 15:20",
            "Estrategias de Gestión para Reactivacion del Sector",
            "Rafael Reyes Vivas, Ex Vice Ministro de Hidrocarburos",
          ],
          [
            "15:20 - 15:40",
            "Rol de Peruperto, Ejecutivo y Legislativo en Piura",
            "Carlos Gonzales Avila, Director General Enerconsult",
          ],
          ["15:40 - 16:00", "COFFE BREACK", ""],
          [
            "16:00 - 16:20",
            "Tema por confirmar",
            "Efraín Gamarra Zegarra, Gerente General IMI Del Peru SAC",
          ],
          [
            "16:20 - 17:30",
            "PITCH COMERCIAL COMPAÑIAS PETROLERAS",
            "Andes, Rodatech, Estrella, IMI, Axure, Transber",
          ],
        ],
        theme: "grid",
        styles: { fontSize: 10, cellPadding: 5 },
        headStyles: { fillColor: [245, 158, 11], textColor: [255, 255, 255] },
        columnStyles: { 0: { cellWidth: 30 } },
        didParseCell: function (data) {
          if (data.row.index === 3 && data.section === "body") {
            data.cell.styles.fillColor = [229, 231, 235]; // bg-gray-200 equivalent
            data.cell.styles.fontStyle = "bold";
            data.cell.styles.halign = "center";
          }
        },
      });

      // Día 2
      doc.setFontSize(16);
      doc.setTextColor(245, 158, 11); // Color ámbar
      doc.text(
        "Día 2: Sostenibilidad y Medio Ambiente",
        20,
        doc.lastAutoTable.finalY + 20
      );
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      doc.text("13 de Agosto, 2025", 20, doc.lastAutoTable.finalY + 27);

      // Tabla para el día 2
      autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 30,
        head: [["Horario", "Actividad", "Ponente"]],
        body: [
          ["08:30 - 09:00", "Café de Bienvenida", ""],
          [
            "09:00 - 10:30",
            "Conferencia: Reducción de Emisiones en Operaciones",
            "Hugo G. Pelliza, YPF Argentina",
          ],
          [
            "10:45 - 12:15",
            "Panel: Estrategias ESG en el Sector Petrolero",
            "Varios Ponentes",
          ],
          ["12:30 - 14:00", "Almuerzo Networking", ""],
          [
            "14:15 - 15:45",
            "Taller: Certificaciones Ambientales",
            "Equipo de Certificación, EcoOil",
          ],
          [
            "16:00 - 17:30",
            "Conferencia: Economía Circular en la Industria",
            "Laura Vázquez, ALAP",
          ],
          ["17:45 - 19:00", "Cena de Gala (Solo para VIP)", ""],
        ],
        theme: "grid",
        styles: { fontSize: 10, cellPadding: 5 },
        headStyles: { fillColor: [245, 158, 11], textColor: [255, 255, 255] },
        columnStyles: { 0: { cellWidth: 30 } },
      });

      // Día 3
      doc.setFontSize(16);
      doc.setTextColor(245, 158, 11); // Color ámbar
      doc.text(
        "Día 3: Mercados y Regulación",
        20,
        doc.lastAutoTable.finalY + 20
      );
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      doc.text("14 de Agosto, 2025", 20, doc.lastAutoTable.finalY + 27);

      // Tabla para el día 3
      autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 30,
        head: [["Horario", "Actividad", "Ponente"]],
        body: [
          ["08:30 - 09:00", "Café de Bienvenida", ""],
          [
            "09:00 - 10:30",
            "Conferencia: Tendencias del Mercado Global",
            "Analista Senior, PetroMarket",
          ],
          [
            "10:45 - 12:15",
            "Panel: Regulación y Políticas Energéticas",
            "Representantes Gubernamentales",
          ],
          ["12:30 - 14:00", "Almuerzo Networking", ""],
          [
            "14:15 - 15:45",
            "Taller: Estrategias de Inversión en el Sector",
            "Consultores, Energy Capital",
          ],
          [
            "16:00 - 17:00",
            "Conferencia de Clausura",
            "Director General, Ministerio de Energía",
          ],
          ["17:00 - 18:00", "Ceremonia de Clausura y Despedida", ""],
        ],
        theme: "grid",
        styles: { fontSize: 10, cellPadding: 5 },
        headStyles: { fillColor: [245, 158, 11], textColor: [255, 255, 255] },
        columnStyles: { 0: { cellWidth: 30 } },
      });

      // Añadir pie de página
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text(
          `Página ${i} de ${pageCount} - Reactiva-Petrol 2025: Reactivación Petrolera en la Región Piura`,
          105,
          doc.internal.pageSize.height - 10,
          { align: "center" }
        );
      }

      // Guardar el PDF
      doc.save("Programa_ReactivaPetrol2025.pdf");
    } catch (error) {
      console.error("Error al generar el PDF:", error);
      alert(
        "Hubo un error al generar el PDF. Por favor, inténtelo de nuevo más tarde."
      );
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto sm:px-4 flex h-16 items-center justify-between px-2">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative h-8 w-8 sm:h-12 sm:w-12 overflow-hidden rounded-full border-2 border-amber-400 shadow-md">
              <Image
                src="/oil-pump-logo.png"
                alt="Reactiva-Petrol 2025 Logo"
                width={32}
                height={32}
                className="object-cover h-8 w-8 sm:h-12 sm:w-12"
              />
            </div>
            <span className="text-base sm:text-xl font-bold tracking-tight">
              Reactiva-Petrol <span className="text-amber-600">2025</span>
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#acerca"
              className="text-sm font-medium hover:text-amber-600 transition-colors"
            >
              Acerca del Evento
            </Link>
            <Link
              href="#ponentes"
              className="text-sm font-medium hover:text-amber-600 transition-colors"
            >
              Ponentes
            </Link>
            <Link
              href="#agenda"
              className="text-sm font-medium hover:text-amber-600 transition-colors"
            >
              Agenda
            </Link>
            <Link
              href="#patrocinadores"
              className="text-sm font-medium hover:text-amber-600 transition-colors"
            >
              Patrocinadores
            </Link>
          </nav>
          <div className="w-full max-w-[110px] md:max-w-none md:w-auto flex-shrink-0">
            <Button className="bg-amber-600 hover:bg-amber-700 w-full md:w-auto text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2 h-7 sm:h-10 min-h-0">
              <a href="https://evento.reactivapetroltalara.online/">
                <span className="block truncate sm:hidden">TICKETS</span>
                <span className="hidden sm:block truncate">
                  ADQUIERE TUS TICKETS
                </span>
              </a>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 z-0">
            <Image
              src="/hero-petroleum.png"
              alt="Plataforma petrolera"
              fill
              className="object-cover brightness-[0.4]"
              priority
            />
          </div>
          <div className="container relative z-10 py-12 sm:py-20 md:py-32 lg:py-40 mx-auto px-2 sm:px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Text Content */}
              <div className="max-w-3xl space-y-5">
                <div className="inline-block rounded-lg bg-amber-600 px-3 py-1 text-sm text-white">
                  12-14 de Agosto, 2025 | Talara - Perú
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                  Congreso Internacional:{" "}
                  <span className="text-amber-500">Reactivación Petrolera</span>{" "}
                  en las Regiones Piura y Tumbes
                </h1>
                <p className="text-xl text-gray-300">
                  Impulsando las Operaciones Offshore y OnShore en Cuencas
                  Talara y Tumbes. El evento más importante del sector
                  petrolero. Tres días de conferencias, networking y
                  exposiciones con los líderes de la industria.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    size="lg"
                    className="bg-amber-600 hover:bg-amber-700 w-full sm:w-auto text-base"
                  >
                    <a href="https://evento.reactivapetroltalara.online/">
                      Inscríbete Ahora
                    </a>
                  </Button>
                  {/* <Button
                    size="lg"
                    className="bg-amber-600 hover:bg-amber-700 group"
                    onClick={() => scrollToSection("agenda")}
                  >
                    Ver Programa Completo
                    <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button> */}
                </div>
              </div>
              {/* Promotional Image */}
              <div className="flex justify-center lg:justify-center mt-8 lg:mt-0">
                <div className="max-w-xs sm:max-w-md md:max-w-lg w-full">
                  <Image
                    src="flyer.webp"
                    alt="Congreso Internacional Reactivación Petrolera en la Región Piura - 12 al 14 Agosto 2025 - Hotel Pacifico Talara"
                    width={600}
                    height={450}
                    className="w-full h-auto rounded-lg shadow-lg border-2 border-amber-500"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Promotional Image Section */}

        {/* Acerca del Evento */}
        <section id="acerca" className="py-12 sm:py-16 bg-slate-50">
          <div className="container mx-auto px-2 sm:px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Acerca del Evento</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                ReactivaPetrol 2025, reúne a los principales actores de la
                industria petrolera para consensuar los desafíos actuales en 3
                dias de oportunidades de negocios para desarrollar el futuro
                energético del Perú.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              <Card className="border-none shadow-md">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-amber-100 p-3 rounded-full mb-4">
                      <Users className="h-8 w-8 text-amber-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">+300 Asistentes</h3>
                    <p className="text-gray-600">
                      Profesionales y ejecutivos de alto nivel de la industria
                      petrolera.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-amber-100 p-3 rounded-full mb-4">
                      <Calendar className="h-8 w-8 text-amber-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">3 Días</h3>
                    <p className="text-gray-600">
                      De conferencias, talleres, exposiciones y actividades de
                      networking.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-amber-100 p-3 rounded-full mb-4">
                      <MapPin className="h-8 w-8 text-amber-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                      Centro de Convenciones Hotel Pacifico
                    </h3>
                    <p className="text-gray-600">
                      Barrio Particular, Av. Aviación 441, Talara 20811
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-amber-100 p-3 rounded-full mb-4">
                      <Clock className="h-8 w-8 text-amber-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">+40 Horas</h3>
                    <p className="text-gray-600">
                      De contenido especializado sobre las últimas tendencias
                      del sector.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Beneficios de tu Entrada */}
        <section id="beneficios" className="py-12 sm:py-16">
          <div className="container mx-auto px-2 sm:px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4 text-amber-700">
                Beneficios de tu Entrada
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Todo lo que recibirás al participar en ReactivaPetrol 2025.
              </p>
            </div>
            <div className="max-w-2xl mx-auto">
              <ul className="grid gap-4 sm:grid-cols-2">
                {[
                  "Certificado de Participación",
                  "Credenciales y Folletos",
                  "Almuerzo Corporativo",
                  "2 Coffee Break",
                  "Networking",
                  "Acceso a la Zona VIP",
                  "Cocktail y Fiesta de Cierre",
                  "Acceso a los videos del evento desde la plataforma Online",
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 bg-amber-50 rounded-lg px-4 py-3 border border-amber-100"
                  >
                    <CheckCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span className="text-base text-gray-800">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Ponentes Destacados */}
        <section id="ponentes" className="py-12 sm:py-16">
          <div className="container mx-auto px-2 sm:px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Ponentes Destacados</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Líderes de la industria que compartirán sus conocimientos y
                experiencias en ReactivaPetrol 2025.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
              {[
                {
                  name: "George (Bud)",
                  role: "President & Senior Remediation Specialist, Ivey International Inc.",
                  image: "/george-bud-speaker.jpeg",
                  topic:
                    "Surfactant Enhanced In-Situ and Ex-Situ Remediation of Petroleum and Chlorinated Contaminated Soil and Groundwater",
                  isSpecial: false,
                  country: "Canadá",
                },
                {
                  name: "Hugo G. Pelliza",
                  role: "Geólogo, Consultor de Gestión en Petróleo y Gas",
                  image: "/hugo-pelliza-speaker.jpeg",
                  topic: "Estrategias para la Revitalización de Campos Maduros",
                  isSpecial: false,
                  country: "Argentina",
                },
                {
                  name: "Ednaldo da Purificação Silva",
                  role: "Director Comercial TECNOTEXTIL IND e COM",
                  image:
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-05-29%20at%205.47.24%20PM-7neEwzZdBGo0MCmEXZMnfEuz01WgxL.jpeg",
                  topic:
                    "Soluciones para el Mercado Offshore y Onshore para Izaje y Amarre de Cargas",
                  isSpecial: false,
                  country: "Brasil",
                },
                {
                  name: "Rafael Reyes Vivas",
                  role: "Ingeniero, Ex Viceministro de Hidrocarburos",
                  image: "/rafael-reyes-vivas-speaker.jpeg",
                  topic:
                    "Estrategias de Gestión para la Reactivación del Sector Hidrocarburos",
                  isSpecial: false,
                  country: "Perú",
                },
                {
                  name: "Ing. Rigoberto Rojas Gallo",
                  role: "Líder de Geociencias, Compañía Operadora GTG Petroleum",
                  image:
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-12%20at%206.28.05%20PM-UnKcamSgX44mjzxml1TrlzvXocAeeN.jpeg",
                  topic:
                    "Importancia de la Administración Integral de Yacimientos en el Desarrollo de los Campos de Hidrocarburos",
                  isSpecial: false,
                  country: "Perú",
                },
                {
                  name: "Ing. César Pabon Martínez",
                  role: "Senior de Operaciones, Compañía Operadora Andes Operating Company",
                  image:
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-13%20at%2012.23.29%20PM-WXhoyaZ8FZPOdGXdqWrRm8aFKZH6Xd.jpeg",
                  topic:
                    "El Agua, Agente Transformador en la Industria de los Hidrocarburos",
                  isSpecial: false,
                  country: "Colombia",
                },
                {
                  name: "Carlos Gonzales Ávila",
                  role: "Director General, Enerconsult SA",
                  image: "gonzalesavila.jpg",
                  topic:
                    "El Rol de Perupetro, El Ejecutivo y el Legislativo en la reactivación petrolera de la región Piura",
                  isSpecial: false,
                  country: "Perú",
                },
                {
                  name: "Dr.Eduardo Guevara Doods",
                  role: "Abogado, Socio de CMS Grau y ex Vice Ministro de Hidrocarburos",
                  image: "guevaradoods.jpg",
                  topic:
                    "Manejo Regulatorio para los Pasivos Ambientales en la Cuenca de Talara",
                  isSpecial: false,
                  country: "Perú",
                },
                {
                  name: "Daniel Hilario Villayonga",
                  role: "Magister, Director Regional de Energía y Minas del Goberino Regional de Tumbes",
                  image: "hilariovillayonga.webp",
                  topic:
                    "Reactivación de las Actividades de Hidrocarburos en la región Tumbes",
                  isSpecial: false,
                  country: "Perú",
                },
                {
                  name: "Oscar Díaz",
                  role: "CEO Viceversa Consulting SA",
                  image: "oscar_diaz.webp",
                  topic:
                    "Cómo prevenir Conflictos Sociales en el Sector Hidrocarburos",
                  isSpecial: false,
                  country: "Perú",
                },
                {
                  name: "Ing. Ricardo Sarmiento",
                  role: "CEO Estrella International Energy Services",
                  image: "ricardosarmiento.jpg",
                  topic: "Un Futuro Energético con Enfoque en Perú",
                  isSpecial: false,
                  country: "Colombia",
                },
                {
                  name: "Iván Miranda Zuzunaga",
                  role: "Magister Ingeneria de Petróleo y Consultor Internacional - IPIGPE",
                  image: "mirandazuzunaga.jpg",
                  topic:
                    "Oportunidades para acelerar la explotación de HC en el noroeste y la selva peruana dentro del proceso del cambio de la matriz energética",
                  isSpecial: false,
                  country: "Perú",
                },
                {
                  name: "Alexander Lopez Briceño",
                  role: "Ingeniero de Petroleos, Gerente de Perforación y Completamiento, Líder de Proyectos, Ingeniero Senior en Perforación Offshore y Onshore",
                  image: "lopezbri.jpg",
                  topic:
                    "Tecnología en Real Time Operacional, HSEQ, Toma de decisiones estrategicas para la industria petrolera",
                  isSpecial: false,
                  country: "Colombia",
                },
                {
                  name: "Ing. Ricardo Yam Camacho",
                  role: "Well Engineering & Project Management for the Enery Industry",
                  image: "yamcamacho.jpg",
                  topic:
                    "Pozos de Emergencia en Campos Maduros. Pauta para la Identificación de Áreas Potenciales con Reservas",
                  isSpecial: false,
                  country: "E.E.U.U.",
                },
              ].map((speaker, index) => (
                <Card
                  key={index}
                  className="overflow-hidden border-none shadow-md group"
                >
                  <div className="relative w-full">
                    <Image
                      src={speaker.image || "/placeholder.svg"}
                      alt={speaker.name}
                      width={400}
                      height={300}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                  <CardContent className="pt-6 pb-6">
                    <h3 className="text-xl font-bold">{speaker.name}</h3>
                    <p className="text-amber-600">{speaker.role}</p>
                    <p className="text-sm text-gray-600 mt-2">
                      <span className="font-medium">Tema:</span> {speaker.topic}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-10"></div>
          </div>
        </section>

        {/* Maestro de Ceremonia */}
        <section id="maestro-ceremonia" className="py-12 sm:py-16 bg-slate-50">
          <div className="container mx-auto px-2 sm:px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Maestro de Ceremonia</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Profesional destacado que dirigirá las ceremonias del evento
                ReactivaPetrol 2025.
              </p>
            </div>

            <div className="flex justify-center">
              <div className="max-w-md">
                <Card className="overflow-hidden border-none shadow-md group">
                  <div className="relative w-full">
                    <Image
                      src="presentador.webp"
                      alt="Oscar Díaz - Maestro de Ceremonia"
                      width={400}
                      height={300}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                  <CardContent className="pt-6 pb-6">
                    <h3 className="text-xl font-bold">{`Oscar Díaz`}</h3>
                    <p className="text-amber-600">
                      Director Programa TV Tierra Adentro
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      <span className="font-medium">Rol:</span> Maestro de
                      Ceremonia
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-medium">País:</span> Perú
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Agenda */}
        <section id="agenda" className="py-16 bg-slate-50">
          <div className="container mx-auto px-2 sm:px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Agenda del Evento</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Tres días de contenido especializado para profesionales del
                sector petrolero.
              </p>
            </div>

            <Tabs defaultValue="dia1" className="max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="dia1">Día 12 de Agosto</TabsTrigger>
                {/* <TabsTrigger value="dia2">Día 13 de Agosto</TabsTrigger>
                <TabsTrigger value="dia3">Día 14 de Agosto</TabsTrigger> */}
              </TabsList>

              <TabsContent
                value="dia1"
                className="border rounded-lg p-6 shadow-sm"
              >
                <h3 className="text-xl font-bold mb-4">
                  Día 1: Innovación y Tecnología
                </h3>
                <div className="space-y-6">
                  {[
                    {
                      time: "07:15 - 08:00",
                      title: "Inscripción de participantes",
                      speaker: "",
                    },
                    {
                      time: "08:00 - 08:15",
                      title: "Palabras de Bienvenida",
                      speaker:
                        "Luis Ernesto Neyra Leon, Gobernador Regional de Piura",
                    },
                    {
                      time: "08:15 - 08:30",
                      title: "Inauguración del Foro",
                      speaker:
                        "Dina Ercilla Boluarte Zegarra, Presidente de la Republica del Perú",
                    },
                    {
                      time: "",
                      title:
                        "BLOQUE 1: Plan Reactivacion Petrolera en 47 nuevas Areas E&P",
                      speaker: "",
                    },
                    {
                      time: "08:30 - 08:50",
                      title:
                        "Estabilidad Jurídica y Política para la Inversion en Hidrocarburos",
                      speaker:
                        "Pedro Chira Fernandez, Presidente del Directorio PERUPETRO SA",
                    },
                    {
                      time: "09:00 - 09:20",
                      title:
                        "Petroperu, Compañía Operadora Peruana: Visión para los próximos 30 años (Upstream, Downstream y Midstream)",
                      speaker:
                        "Alejandro Narvaez Liceras, Presidente del Directorio PETROPERU SA",
                    },
                    {
                      time: "09:30 - 09:45",
                      title:
                        "FLASH DE PRODUCCION: Anuncio Nacional Inversiones en Cuenca Talara Ingresa a Perú un nuevo E&P",
                      speaker: "",
                    },
                    {
                      time: "10:00 - 10:20",
                      title: "Coffee Break",
                      speaker: "",
                    },
                    {
                      time: "10:30 - 10:50",
                      title:
                        "Estrategias para la Revitalización de Campos Maduros",
                      speaker:
                        "Hugo Gustavo Pelilza, Consultor de Gestión en Petroleo y Gas",
                    },
                    {
                      time: "11:00 - 11:20",
                      title:
                        "Reactivacion Petrolera en 47 nuevas Areas Fase cero",
                      speaker:
                        "Asaid Bandach Gallegos, Gerente Tecnico y de Recursos de Información PERUPETRO SA",
                    },
                    {
                      time: "11:30 - 12:15",
                      title: "Panel de comentarios",
                      panelists: [
                        "Manuel Farias, Director de Perforacion CAPPETROL",
                        "Tomas Diaz, Gerente de Exploracion y Produccion, PETROPERU SA",
                        "Oscar Ferney, Director General, ACIPET",
                        "Segismundo Cruces, Gobernador Regional, Tumbes",
                      ],
                      moderator:
                        "Guillermo Morales, Presidente CIP - Comite Talara",
                    },
                    {
                      time: "12:15 - 14:00",
                      title: "Almuerzo Libre",
                      speaker: "",
                    },
                    {
                      time: "14:00 - 14:20",
                      title:
                        "El Agua, agente transformador en la industria de los Hidrocarburos",
                      speaker:
                        "Cesar Pabon Martínez, Ingeniero Senior de Operaciones Compañía Operadora Andes Operating Company EEUU (Colombia)",
                    },
                    {
                      time: "14:30 - 14:50",
                      title:
                        "Pozos de Emergencia en Campos Maduros. Pauta para la identificacion de Areas Potenciales con Reservas",
                      speaker:
                        "Ricardo Yam Camacho, Project Management Servicios Integrales Nuevo Santander (EEUU)",
                    },
                    {
                      time: "15:00 - 15:20",
                      title: "Un Futuro Energético con Enfoque en Perú",
                      speaker:
                        "Ricardo Andres Sarmiento, CEO Estrella International Energy Services (Argentina)",
                      id: "peru-energy",
                    },
                    {
                      time: "15:00 - 15:20",
                      title:
                        "Reactivación de las Actividades de Hidrocarburos en la Región Tumbes",
                      speaker:
                        "Daniel Hilario Villayonga, Director Regional de Energia y Minas (Perú)",
                      id: "tumbes-reactivation",
                    },
                    {
                      time: "15:30 - 15:50",
                      title:
                        "Tecnologia en Real Time Operacional, HSEQ, Toma de decisiones estrategicas para la Industria Petrolera",
                      speaker:
                        "Alexander Lopez Briceño, Gerente de Perforacion y Completacion de Pozos (Colombia)",
                    },
                    {
                      time: "16:00 - 16:20",
                      title: "Coffee Break",
                      speaker: "",
                    },
                    {
                      time: "16:30 - 16:50",
                      title:
                        "Soluciones para el Mercado Off Shore y On Shore para Izaje y Amarre de Cargas",
                      speaker:
                        "Ednaldo da Purificacao Silva, Director y Conferencista Tecnotextil IND e COM (Brasil)",
                    },
                    {
                      time: "17:00 - 18:00",
                      title: "PITCH COMERCIAL COMPAÑIAS PETROLERAS",
                      speaker:
                        "Andes Operating Company, Sains, Estrella Petrolera, Petrodynamic, Transber",
                    },
                  ].map((item, index, array) => {
                    // Check if this is the first of the two concurrent items
                    if (item.id === "peru-energy") {
                      const nextItem = array[index + 1]; // Get the next item
                      if (nextItem && nextItem.id === "tumbes-reactivation") {
                        return (
                          <div
                            key={index}
                            className="flex border-b pb-4 last:border-0 last:pb-0"
                          >
                            <div className="w-32 flex-shrink-0 font-medium text-amber-600">
                              {item.time}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                              {/* First concurrent item */}
                              <div className="md:border-r md:border-gray-300 md:pr-4">
                                <h4 className="font-bold">{item.title}</h4>
                                {item.speaker && (
                                  <p className="text-gray-600 text-sm">
                                    {item.speaker}
                                  </p>
                                )}
                              </div>
                              {/* Second concurrent item */}
                              <div className="md:pl-4">
                                <h4 className="font-bold">{nextItem.title}</h4>
                                {nextItem.speaker && (
                                  <p className="text-gray-600 text-sm">
                                    {nextItem.speaker}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      }
                    } else if (item.id === "tumbes-reactivation") {
                      // If this is the second concurrent item, it's already rendered by the first one, so skip it.
                      return null;
                    }
                    // Handle the "BLOQUE 1" item
                    else if (
                      item.title ===
                      "BLOQUE 1: Plan Reactivacion Petrolera en 47 nuevas Areas E&P"
                    ) {
                      return (
                        <div
                          key={index}
                          className="w-full text-center bg-gray-100 py-4 rounded-md shadow-sm"
                        >
                          <h4 className="font-bold text-lg text-gray-800">
                            {item.title}
                          </h4>
                        </div>
                      );
                    }
                    // Handle all other regular items
                    else {
                      return (
                        <div
                          key={index}
                          className="flex border-b pb-4 last:border-0 last:pb-0"
                        >
                          <div className="w-32 flex-shrink-0 font-medium text-amber-600">
                            {item.time}
                          </div>
                          <div>
                            <h4 className="font-bold">{item.title}</h4>

                            {item.speaker && (
                              <p className="text-gray-600 text-sm">
                                {item.speaker}
                              </p>
                            )}

                            {/* Renderizado especial para el panel */}
                            {item.title === "Panel de comentarios" && (
                              <div className="text-gray-600 text-sm mt-2">
                                <div className="font-semibold mb-1">
                                  Panelistas:
                                </div>
                                <ul className="list-disc pl-5 space-y-1">
                                  {item.panelists?.map((panelist, idx) => (
                                    <li key={idx}>{panelist}</li>
                                  ))}
                                </ul>
                                <div className="font-semibold mt-2">
                                  Moderador:
                                </div>
                                <p>{item.moderator}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </TabsContent>

              <TabsContent
                value="dia2"
                className="border rounded-lg p-6 shadow-sm"
              >
                <h3 className="text-xl font-bold mb-4">
                  Día 2: Sostenibilidad y Medio Ambiente
                </h3>
                <div className="space-y-6">
                  {[
                    { time: "08:30 - 09:00", title: "Café de Bienvenida" },
                    {
                      time: "09:00 - 10:30",
                      title:
                        "Conferencia: Reducción de Emisiones en Operaciones",
                      speaker: "Hugo G. Pelliza, YPF Argentina",
                    },
                    {
                      time: "10:45 - 12:15",
                      title: "Panel: Estrategias ESG en el Sector Petrolero",
                      speaker: "Varios Ponentes",
                    },
                    { time: "12:30 - 14:00", title: "Almuerzo Networking" },
                    {
                      time: "14:15 - 15:45",
                      title: "Taller: Certificaciones Ambientales",
                      speaker: "Equipo de Certificación, EcoOil",
                    },
                    {
                      time: "16:00 - 17:30",
                      title: "Conferencia: Economía Circular en la Industria",
                      speaker: "Laura Vázquez, ALAP",
                    },
                    {
                      time: "17:45 - 19:00",
                      title: "Cena de Gala (Solo para VIP)",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="w-32 flex-shrink-0 font-medium text-amber-600">
                        {item.time}
                      </div>
                      <div>
                        <h4 className="font-bold">{item.title}</h4>
                        {item.speaker && (
                          <p className="text-gray-600 text-sm">
                            {item.speaker}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent
                value="dia3"
                className="border rounded-lg p-6 shadow-sm"
              >
                <h3 className="text-xl font-bold mb-4">
                  Día 3: Mercados y Regulación
                </h3>
                <div className="space-y-6">
                  {[
                    { time: "08:30 - 09:00", title: "Café de Bienvenida" },
                    {
                      time: "09:00 - 10:30",
                      title: "Conferencia: Tendencias del Mercado Global",
                      speaker: "Analista Senior, PetroMarket",
                    },
                    {
                      time: "10:45 - 12:15",
                      title: "Panel: Regulación y Políticas Energéticas",
                      speaker: "Representantes Gubernamentales",
                    },
                    { time: "12:30 - 14:00", title: "Almuerzo Networking" },
                    {
                      time: "14:15 - 15:45",
                      title: "Taller: Estrategias de Inversión en el Sector",
                      speaker: "Consultores, Energy Capital",
                    },
                    {
                      time: "16:00 - 17:00",
                      title: "Conferencia de Clausura",
                      speaker: "Director General, Ministerio de Energía",
                    },
                    {
                      time: "17:00 - 18:00",
                      title: "Ceremonia de Clausura y Despedida",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="w-32 flex-shrink-0 font-medium text-amber-600">
                        {item.time}
                      </div>
                      <div>
                        <h4 className="font-bold">{item.title}</h4>
                        {item.speaker && (
                          <p className="text-gray-600 text-sm">
                            {item.speaker}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {/* <div className="flex justify-center mt-10">
              <Button
                className="bg-amber-600 hover:bg-amber-700 flex items-center justify-center gap-2 mx-auto"
                onClick={generateProgramPDF}
                disabled={isGeneratingPDF}
              >
                {isGeneratingPDF ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generando PDF...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    Descargar Programa Completo (PDF)
                  </>
                )}
              </Button>
            </div> */}
          </div>
        </section>

        {/* Organiza */}
        <section id="organiza" className="py-12 sm:py-16 bg-slate-50">
          <div className="container mx-auto px-2 sm:px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Organiza</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Entidades organizadoras del evento Reactiva-Petrol 2025.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {/* Primer organizador */}
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 w-full">
                <div className="flex flex-col items-center gap-6">
                  <div className="w-full flex justify-center">
                    <div className="relative w-40 h-40 overflow-hidden">
                      <Image
                        src="/tyl.jpg"
                        alt="T&L del Oriente - Energía Total"
                        width={160}
                        height={160}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="w-full text-center">
                    <h3 className="text-xl font-bold mb-2">T&L del Oriente</h3>
                    <p className="text-gray-600 mb-4">
                      Entidad líder en la promoción y desarrollo del sector
                      petrolero en la región Piura.
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <Button
                        variant="outline"
                        className="border-amber-600 text-amber-600 hover:bg-amber-50"
                      >
                        <Link href="#" className="flex items-center gap-2">
                          Conocer más
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Segundo organizador */}
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 w-full">
                <div className="flex flex-col items-center gap-6">
                  <div className="w-full flex justify-center">
                    <div className="relative w-40 h-40 overflow-hidden">
                      <Image
                        src="/cap.png"
                        alt="CAPPETROL - Cámara Peruana de Petróleo"
                        width={160}
                        height={160}
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>
                  <div className="w-full text-center">
                    <h3 className="text-xl font-bold mb-2">CAPPETROL</h3>
                    <p className="text-gray-600 mb-4">
                      Cámara Peruana de Petróleo, institución comprometida con
                      el desarrollo del sector petrolero nacional.
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <Button
                        variant="outline"
                        className="border-amber-600 text-amber-600 hover:bg-amber-50"
                      >
                        <Link href="#" className="flex items-center gap-2">
                          Conocer más
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Inscripción Duplicada */}
        {/* <section id="inscripcion-2" className="py-16 bg-slate-800 text-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                INSCRÍBETE COMO PATROCINADOR
              </h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                Asegura tu lugar en el evento más importante del sector
                petrolero en Latinoamérica.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div className="space-y-8">
                <div className="bg-slate-700 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold mb-4">¿Por qué asistir?</h3>
                  <ul className="space-y-3">
                    {[
                      "Networking con los principales actores de la industria",
                      "Acceso a las últimas tendencias y tecnologías del sector",
                      "Oportunidades de negocio y colaboración",
                      "Conferencias y talleres con expertos internacionales",
                      "Exposición de productos y servicios innovadores",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-700 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold mb-4 text-center">
                    Oportunidades de Auspicio
                  </h3>
                  <div className="flex justify-center">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/W-U2RlsalgWwdpwXsX07VCQochQZQ5Pt.jpeg"
                      alt="Oportunidad de Auspicio - Congreso Internacional Reactivación Petrolera en la Región Piura"
                      width={600}
                      height={800}
                      className="w-full h-auto rounded-lg shadow-lg max-w-lg"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white text-slate-900 p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-center">
                  Formulario de Inscripción
                </h3>
                <RegistrationForm />
              </div>
            </div>
          </div>
        </section> */}

        {/* Patrocinadores */}
        {/* Marco grande para imagen especial */}
        <div className="flex justify-center mt-10">
          <div className="bg-white rounded-2xl border-4 border-amber-700 shadow-xl p-6 max-w-3xl w-full flex items-center justify-center">
            <Image
              src="patrocinio.webp"
              alt="Patrocinador Especial"
              width={900}
              height={400}
              className="w-full h-auto object-contain rounded-xl"
            />
          </div>
        </div>
        <section id="patrocinadores" className="py-16">
          <div className="container mx-auto px-2 sm:px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Patrocinadores del Evento
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Empresas líderes que hacen posible PetroSummit 2025.
              </p>
            </div>

            <div className="space-y-10">
              <div>
                <h3 className="text-center text-xl font-semibold mb-6 text-amber-600">
                  Crudos Superligeros (54 API)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-center justify-items-center">
                  {["andesflyer.webp", "gtgflyer.webp", "pandaenergy.webp"].map(
                    (logo, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-lg border-2 border-amber-500 shadow-md hover:shadow-lg transition-all duration-300 w-fit max-w-full overflow-hidden group"
                      >
                        <Image
                          src={logo || "/placeholder.svg"}
                          alt={`Crudos Superligeros ${index + 1}`}
                          width={480}
                          height={140}
                          className="object-contain group-hover:scale-[1.03] transition-transform duration-300"
                        />
                      </div>
                    )
                  )}
                </div>
                {/* Agregar segunda fila con 3 recuadros adicionales */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-center justify-items-center mt-6">
                  {["/ivey.webp", "/axure.webp", "/tema.webp"].map(
                    (logo, index) => (
                      <div
                        key={index + 3}
                        className="bg-white rounded-lg border-2 border-amber-500 shadow-md hover:shadow-lg transition-all duration-300 w-fit max-w-full overflow-hidden group"
                      >
                        <Image
                          src={logo || "/placeholder.svg"}
                          alt={
                            index === 0
                              ? "Status International Petroleum Group"
                              : index === 1
                              ? "Holistic Go"
                              : "Vice Versa Consulting"
                          }
                          width={480}
                          height={140}
                          className="object-contain group-hover:scale-[1.03] transition-transform duration-300"
                        />
                      </div>
                    )
                  )}
                </div>
                {/* Agregar tercera fila con 3 recuadros adicionales */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8 items-center justify-items-center mt-6">
                  {["/petrodynamic.webp", "/sins.webp"].map((logo, index) => (
                    <div
                      key={index + 3}
                      className="bg-white rounded-lg border-2 border-amber-500 shadow-md hover:shadow-lg transition-all duration-300 w-fit max-w-full overflow-hidden group"
                    >
                      <Image
                        src={logo || "/placeholder.svg"}
                        alt={
                          index === 0
                            ? "Status International Petroleum Group"
                            : index === 1
                            ? "Holistic Go"
                            : "Vice Versa Consulting"
                        }
                        width={480}
                        height={140}
                        className="object-contain group-hover:scale-[1.03] transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
                {/* Agregar cuarta fila con 3 recuadros adicionales */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-center justify-items-center mt-6">
                  {[
                    "/gotaamarilla.jpg",
                    "/gotaamarilla.jpg",
                    "/gotaamarilla.jpg",
                  ].map((logo, index) => (
                    <div
                      key={index + 3}
                      className="bg-white rounded-lg border-2 border-amber-500 shadow-md hover:shadow-lg transition-all duration-300 w-full max-w-[280px] aspect-[3/1.5] flex items-center justify-center overflow-hidden group"
                    >
                      <Image
                        src={logo || "/placeholder.svg"}
                        alt={
                          index === 0
                            ? "Status International Petroleum Group"
                            : index === 1
                            ? "Holistic Go"
                            : "Vice Versa Consulting"
                        }
                        width={280}
                        height={140}
                        className="w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-center text-xl font-semibold mb-6 text-amber-800">
                  Crudos Ligeros (42 API)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8 items-center justify-items-center">
                  {["estrellapetrolera.webp", "rodatech.webp"].map(
                    (logo, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-lg border-2 border-amber-800 shadow-md hover:shadow-lg transition-all duration-300 w-fit max-w-full overflow-hidden group"
                      >
                        <Image
                          src={logo || "/placeholder.svg"}
                          alt={`Crudos Ligeros ${index + 1}`}
                          width={480}
                          height={140}
                          className="object-contain group-hover:scale-[1.03] transition-transform duration-300"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg";
                          }}
                        />
                      </div>
                    )
                  )}
                </div>
                {/* Segunda fila de patrocinadores Crudos Ligeros */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 items-center justify-items-center mt-6">
                  {[
                    "/gotaamarron.jpg",
                    "/gotaamarron.jpg",
                    "/gotaamarron.jpg",
                    "/gotaamarron.jpg",
                  ].map((logo, index) => (
                    <div
                      key={index + 4}
                      className="bg-white p-3 rounded-lg border-2 border-amber-800 shadow-md hover:shadow-lg transition-all duration-300 w-full max-w-[220px] aspect-[3/1.5] flex items-center justify-center overflow-hidden group"
                    >
                      <Image
                        src={logo || "/placeholder.svg"}
                        width={220}
                        height={110}
                        alt={`Crudos Ligeros ${index + 5}`}
                        className="w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg";
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-center text-xl font-semibold mb-6 text-black">
                  Crudos Pesados (22 API)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 items-center justify-items-center">
                  {[
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/centro1.jpg-nWF1NgHSV4sLjZnoxcj32yLrYtmpaB.jpeg",
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/north.jpg-S6NiYQ1WtmhOY6exa5GwWaQn01wQEy.jpeg",
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-05-24%20at%2012.11.07%20PM-ChEwWMrmx324rxZLyBWWjmQUBoU897.jpeg",
                  ].map((logo, index) =>
                    index === 0 ? (
                      <Link
                        key={"link-" + index}
                        href="https://www.facebook.com/CentrodeInvestigacionyDesarrolloCulturalPetrolero/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white rounded-lg border-2 border-black shadow-md hover:shadow-lg transition-all duration-300 w-full max-w-[200px] aspect-[3/1.5] flex items-center justify-center overflow-hidden group"
                      >
                        <Image
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gotanegra.jpg-40ebA5ePWKiRCQdO87K188y2O5zyLA.jpeg"
                          width={200}
                          height={100}
                          alt={`Crudos Pesados ${index + 1}`}
                          className="w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-300"
                        />
                      </Link>
                    ) : index === 1 ? (
                      <Link
                        key={"link-" + index}
                        href="https://pe.linkedin.com/company/north-oil-services-s.a.c."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white rounded-lg border-2 border-black shadow-md hover:shadow-lg transition-all duration-300 w-full max-w-[200px] aspect-[3/1.5] flex items-center justify-center overflow-hidden group"
                      >
                        <Image
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gotanegra.jpg-mfbKDLUDB4bQ7u7djqeG8oJmwO0HVm.jpeg"
                          width={200}
                          height={100}
                          alt="North Oil Services S.A.C."
                          className="w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-300"
                        />
                      </Link>
                    ) : index === 2 ? (
                      <Link
                        key={"link-" + index}
                        href="https://www.facebook.com/PetroenergiaEC/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white rounded-lg border-2 border-black shadow-md hover:shadow-lg transition-all duration-300 w-full max-w-[200px] aspect-[3/1.5] flex items-center justify-center overflow-hidden group"
                      >
                        <Image
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gotanegra.jpg-tTCiFd56VVdSTZXKn2eYxY96MoZ7iL.jpeg"
                          width={200}
                          height={100}
                          alt="Petroenergía"
                          className="w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-300"
                        />
                      </Link>
                    ) : index === 3 ? (
                      <Link
                        key={"link-" + index}
                        href="https://www.youtube.com/@tierraadentroperu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white rounded-lg border-2 border-black shadow-md hover:shadow-lg transition-all duration-300 w-full max-w-[200px] aspect-[3/1.5] flex items-center justify-center overflow-hidden group"
                      >
                        <Image
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gotanegra.jpg-ohX4n0ie5dOnmiSvjNG7XTjtqHryDg.jpeg"
                          width={200}
                          height={100}
                          alt="Tierra Adentro"
                          className="w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-300"
                        />
                      </Link>
                    ) : (
                      <div
                        key={index}
                        className="bg-white rounded-lg border-2 border-black shadow-md hover:shadow-lg transition-all duration-300 w-full max-w-[200px] aspect-[3/1.5] flex items-center justify-center overflow-hidden group"
                      >
                        <Image
                          src="/gotanegra.jpg"
                          width={200}
                          height={100}
                          alt={`Crudos Pesados - Patrocinador ${index + 1}`}
                          className="w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-300"
                        />
                      </div>
                    )
                  )}
                </div>
                {/* Segunda fila de patrocinadores Crudos Pesados */}
                {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 items-center justify-items-center mt-6">
                  {[
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gotanegra.jpg-ZziapayHpXt4TaT5DuEXnbkQW08tRQ.jpeg",
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gotanegra.jpg-ZziapayHpXt4TaT5DuEXnbkQW08tRQ.jpeg",
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gotanegra.jpg-ZziapayHpXt4TaT5DuEXnbkQW08tRQ.jpeg",
                  ].map((logo, index) => (
                    <div
                      key={index + 3}
                      className="bg-white rounded-lg border-2 border-black shadow-md hover:shadow-lg transition-all duration-300 w-full max-w-[200px] aspect-[3/1.5] flex items-center justify-center overflow-hidden group"
                    >
                      <Image
                        src="/gotanegra.jpg"
                        width={200}
                        height={100}
                        alt={`Crudos Pesados - Patrocinador ${index + 4}`}
                        className="w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div> */}
                {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 items-center justify-items-center mt-6">
                  {[
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gotanegra.jpg-ZziapayHpXt4TaT5DuEXnbkQW08tRQ.jpeg",
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gotanegra.jpg-ZziapayHpXt4TaT5DuEXnbkQW08tRQ.jpeg",
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gotanegra.jpg-ZziapayHpXt4TaT5DuEXnbkQW08tRQ.jpeg",
                  ].map((logo, index) => (
                    <div
                      key={index + 6}
                      className="bg-white rounded-lg border-2 border-black shadow-md hover:shadow-lg transition-all duration-300 w-full max-w-[200px] aspect-[3/1.5] flex items-center justify-center overflow-hidden group"
                    >
                      <Image
                        src="/gotanegra.jpg"
                        width={200}
                        height={100}
                        alt={`Crudos Pesados - Patrocinador ${index + 7}`}
                        className="w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div> */}
              </div>
            </div>
          </div>
        </section>

        {/* Auspiciadores del Evento */}
        <section id="auspiciadores" className="py-12 sm:py-16 bg-slate-50">
          <div className="container mx-auto px-2 sm:px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Auspiciadores del Evento
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Empresas líderes que hacen posible ReactivaPetrol 2025.
              </p>
            </div>

            <div className="space-y-10">
              <div>
                <h3 className="text-center text-xl font-semibold mb-6 text-amber-600">
                  Auspiciadores Crudos Superligeros (54 API)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 items-center justify-items-center">
                  {[
                    "se&vi.webp",
                    "alpha.webp",
                    "preco.webp",
                    "nexell.webp",
                    "towers.webp",
                    "transber.webp",
                  ].map((logo, index) => (
                    <div
                      key={index}
                      className={
                        index === 0
                          ? "bg-black rounded-lg border-2 border-amber-500 shadow-md hover:shadow-lg transition-all duration-300 w-full max-w-[280px] flex items-center justify-center overflow-hidden group"
                          : "bg-white rounded-lg border-2 border-amber-500 shadow-md hover:shadow-lg transition-all duration-300 w-full max-w-[280px] flex items-center justify-center overflow-hidden group"
                      }
                    >
                      {index === 0 ? (
                        <Link
                          href="https://www.facebook.com/CentrodeInvestigacionyDesarrolloCulturalPetrolero/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full h-full flex items-center justify-center"
                        >
                          <Image
                            src={logo || "/placeholder.svg"}
                            alt="Panda Energy"
                            width={280}
                            height={140}
                            className="w-auto h-auto max-w-full max-h-full object-contain group-hover:scale-[1.03] transition-transform duration-300"
                          />
                        </Link>
                      ) : index === 1 ? (
                        <Link
                          href="https://www.axuretechnologies.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full h-full flex items-center justify-center"
                        >
                          <Image
                            src={logo || "/placeholder.svg"}
                            alt="Axure Technologies"
                            width={280}
                            height={140}
                            className="w-auto h-auto max-w-full max-h-full object-contain group-hover:scale-[1.03] transition-transform duration-300"
                          />
                        </Link>
                      ) : index === 2 ? (
                        <Link
                          href="https://cwp.pe/?playlist=504ffb1&video=440aacb"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full h-full flex items-center justify-center"
                        >
                          <Image
                            src={logo || "/placeholder.svg"}
                            alt="Climber World Peru SAC"
                            width={280}
                            height={140}
                            className="w-auto h-auto max-w-full max-h-full object-contain group-hover:scale-[1.03] transition-transform duration-300"
                          />
                        </Link>
                      ) : index === 4 ? (
                        <Link
                          href="https://preco.com.pe/inicio"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full h-full flex items-center justify-center"
                        >
                          <Image
                            src={logo || "/placeholder.svg"}
                            alt="PRECO"
                            width={280}
                            height={140}
                            className="w-auto h-auto max-w-full max-h-full object-contain group-hover:scale-[1.03] transition-transform duration-300"
                          />
                        </Link>
                      ) : index === 5 ? (
                        <Link
                          href="https://www.nexellcorporation.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full h-full flex items-center justify-center"
                        >
                          <Image
                            src={logo || "/placeholder.svg"}
                            alt="Nexell Corporation"
                            width={280}
                            height={140}
                            className="w-auto h-auto max-w-full max-h-full object-contain group-hover:scale-[1.03] transition-transform duration-300"
                          />
                        </Link>
                      ) : (
                        <Image
                          src={logo || "/placeholder.svg"}
                          alt="Ipha Integral Service"
                          width={280}
                          height={140}
                          className="w-auto h-auto max-w-full max-h-full object-contain group-hover:scale-[1.03] transition-transform duration-300"
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Segunda fila */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 items-center justify-items-center mt-6">
                  {["statusipg.webp", "holisticgo.webp", "viceversa.webp"].map(
                    (logo, index) => (
                      <div
                        key={index + 6}
                        className="bg-white rounded-lg border-2 border-amber-500 shadow-md hover:shadow-lg transition-all duration-300 w-full max-w-[280px] flex items-center justify-center overflow-hidden group"
                      >
                        {index === 1 ? (
                          <Link
                            href="https://holisticgoinversiones.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full h-full flex items-center justify-center"
                          >
                            <Image
                              src={logo || "/placeholder.svg"}
                              alt="Holistic Go"
                              width={280}
                              height={140}
                              className="w-auto h-auto max-w-full max-h-full object-contain group-hover:scale-[1.03] transition-transform duration-300"
                            />
                          </Link>
                        ) : index === 2 ? (
                          <Link
                            href="https://www.viceversaconsulting.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full h-full flex items-center justify-center"
                          >
                            <Image
                              src={logo || "/placeholder.svg"}
                              alt="Vice Versa Consulting"
                              width={280}
                              height={140}
                              className="w-auto h-auto max-w-full max-h-full object-contain group-hover:scale-[1.03] transition-transform duration-300"
                            />
                          </Link>
                        ) : (
                          <Image
                            src={logo || "/placeholder.svg"}
                            alt="Status International Petroleum Group"
                            width={280}
                            height={140}
                            className="w-auto h-auto max-w-full max-h-full object-contain group-hover:scale-[1.03] transition-transform duration-300"
                          />
                        )}
                      </div>
                    )
                  )}
                </div>

                {/* Tercera fila */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 items-center justify-items-center mt-6">
                  {["clinicasanjuan.webp", "usn.webp", "bucanero.webp"].map(
                    (logo, index) => (
                      <div
                        key={index + 9}
                        className="bg-white rounded-lg border-2 border-amber-500 shadow-md hover:shadow-lg transition-all duration-300 w-full max-w-[280px] flex items-center justify-center overflow-hidden group"
                      >
                        {index === 0 ? (
                          <Link
                            href="https://clinicasanjuancorp.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full h-full flex items-center justify-center"
                          >
                            <Image
                              src={logo || "/placeholder.svg"}
                              width={280}
                              height={140}
                              alt="Clínica San Juan"
                              className="w-auto h-auto max-w-full max-h-full object-contain group-hover:scale-[1.03] transition-transform duration-300"
                            />
                          </Link>
                        ) : index === 2 ? (
                          <Link
                            href="https://www.socorrocargoexpress.sce-peru.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full h-full flex items-center justify-center"
                          >
                            <Image
                              src={logo || "/placeholder.svg"}
                              alt="Socorro Cargo Express"
                              width={280}
                              height={140}
                              className="w-auto h-auto max-w-full max-h-full object-contain group-hover:scale-[1.03] transition-transform duration-300"
                            />
                          </Link>
                        ) : (
                          <Image
                            src={logo || "/placeholder.svg"}
                            width={280}
                            height={140}
                            alt={
                              index === 1 ? "IVEY" : `Auspiciador ${index + 1}`
                            }
                            className="w-auto h-auto max-w-full max-h-full object-contain group-hover:scale-[1.03] transition-transform duration-300"
                          />
                        )}
                      </div>
                    )
                  )}
                </div>

                {/* Cuarta fila */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 items-center justify-items-center mt-6">
                  {[
                    "proactive.webp",
                    "industrial.webp",
                    "blcorredores.webp",
                    "tdm.webp",
                    "murgisa.webp",
                    "zaco.webp",
                  ].map((logo, index) => (
                    <div
                      key={index + 12}
                      className="bg-white rounded-lg border-2 border-amber-500 shadow-md hover:shadow-lg transition-all duration-300 w-full max-w-[280px] flex items-center justify-center overflow-hidden group"
                    >
                      <Image
                        src={logo || "/placeholder.svg"}
                        width={280}
                        height={140}
                        alt={
                          index === 0
                            ? "ProActive"
                            : index === 1
                            ? "Industrial Vox Analyzer"
                            : index === 2
                            ? "TRANSBER - Soluciones Logísticas Integradas"
                            : `Auspiciador Crudos Superligeros ${index + 13}`
                        }
                        className="w-auto h-auto max-w-full max-h-full object-contain group-hover:scale-[1.03] transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
                {/* Agregar cuarta fila con 3 recuadros adicionales */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 items-center justify-items-center mt-6">
                  {[
                    "huascaran.webp",
                    "vallenorte.webp",
                    "cwp_welcome.webp",
                  ].map((logo, index) => (
                    <div
                      key={index + 12}
                      className="bg-white rounded-lg border-2 border-amber-500 shadow-md hover:shadow-lg transition-all duration-300 w-full max-w-[280px] flex items-center justify-center overflow-hidden group"
                    >
                      <Image
                        src={logo || "/placeholder.svg"}
                        width={280}
                        height={140}
                        alt={
                          index === 0
                            ? "ProActive"
                            : index === 1
                            ? "Industrial Vox Analyzer"
                            : "TRANSBER - Soluciones Logísticas Integradas"
                        }
                        className="w-auto h-auto max-w-full max-h-full object-contain group-hover:scale-[1.03] transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
                {/* Agregar quinta fila con 3 recuadros adicionales */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 items-center justify-items-center mt-6">
                  {["igl.webp", "ksa.webp", "serfamed.webp"].map(
                    (logo, index) => (
                      <div
                        key={index + 12}
                        className="bg-white rounded-lg border-2 border-amber-500 shadow-md hover:shadow-lg transition-all duration-300 w-full max-w-[280px] flex items-center justify-center overflow-hidden group"
                      >
                        <Image
                          src={logo}
                          width={280}
                          height={140}
                          alt={
                            index === 0
                              ? "ProActive"
                              : index === 1
                              ? "Industrial Vox Analyzer"
                              : "TRANSBER - Soluciones Logísticas Integradas"
                          }
                          className="w-auto h-auto max-w-full max-h-full object-contain group-hover:scale-[1.03] transition-transform duration-300"
                        />
                      </div>
                    )
                  )}
                </div>
                {/* Agregar sexta fila con 3 recuadros adicionales */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 items-center justify-items-center mt-6">
                  {["guille.webp", "sanjoseobrero.webp"].map((logo, index) => (
                    <div
                      key={index + 12}
                      className="bg-white rounded-lg border-2 border-amber-500 shadow-md hover:shadow-lg transition-all duration-300 w-full max-w-[280px] flex items-center justify-center overflow-hidden group"
                    >
                      <Image
                        src={logo}
                        width={280}
                        height={140}
                        alt={
                          index === 0
                            ? "ProActive"
                            : index === 1
                            ? "Industrial Vox Analyzer"
                            : "TRANSBER - Soluciones Logísticas Integradas"
                        }
                        className="w-auto h-auto max-w-full max-h-full object-contain group-hover:scale-[1.03] transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
                {/* Agregar septima fila con 3 recuadros adicionales */}
                {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 items-center justify-items-center mt-6">
                  {["zaco.jpg"].map((logo, index) => (
                    <div
                      key={index + 12}
                      className="bg-white rounded-lg border-2 border-amber-500 shadow-md hover:shadow-lg transition-all duration-300 w-full max-w-[280px] flex items-center justify-center overflow-hidden group"
                    >
                      <Image
                        src={logo}
                        width={280}
                        height={140}
                        alt={
                          index === 0
                            ? "ProActive"
                            : index === 1
                            ? "Industrial Vox Analyzer"
                            : "TRANSBER - Soluciones Logísticas Integradas"
                        }
                        className="w-auto h-auto max-w-full max-h-full object-contain group-hover:scale-[1.03] transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div> */}
              </div>
            </div>
          </div>
        </section>

        {/* Media Partners */}
        <section id="media-partners" className="py-12 sm:py-16">
          <div className="container mx-auto px-2 sm:px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Media Partners</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Medios de comunicación aliados que difunden ReactivaPetrol 2025.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 items-center justify-items-center">
              {[
                "tierraadentro.webp",
                "petroenergia.webp",
                "northoil.webp",
                "centroinvest.webp",
                "spe.webp",
                "allpawara.webp",
                "energiaandina.webp",
                "amppuni.webp",
                "cntv.webp",
                "colegio_ing.webp",
                "institutoperuanoing.webp",
              ].map((logo, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg border-2 border-gray-300 shadow-md hover:shadow-lg transition-all duration-300 w-full max-w-[340px] flex items-center justify-center overflow-hidden group"
                >
                  {/* Condicionales para enlaces personalizados */}
                  {index === 0 ? (
                    <Link
                      href="https://www.facebook.com/tierraadentrope/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-full flex items-center justify-center"
                    >
                      <Image
                        src={logo || "/placeholder.svg"}
                        alt="Tierra Adentro"
                        width={340}
                        height={120}
                        className="w-auto h-auto max-w-full max-h-full object-contain group-hover:scale-[1.05] transition-transform duration-300"
                      />
                    </Link>
                  ) : index === 1 ? (
                    <Link
                      href="https://www.facebook.com/PetroenergiaEC/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-full flex items-center justify-center"
                    >
                      <Image
                        src={logo || "/placeholder.svg"}
                        alt="Petroenergía"
                        width={240}
                        height={120}
                        className="w-auto h-auto max-w-full max-h-full object-contain group-hover:scale-[1.03] transition-transform duration-300"
                      />
                    </Link>
                  ) : index === 6 ? (
                    <Image
                      src={logo || "/placeholder.svg"}
                      alt="ALPAVIRA Revista"
                      width={240}
                      height={120}
                      className="w-auto h-auto max-w-full max-h-full object-contain group-hover:scale-[1.03] transition-transform duration-300"
                    />
                  ) : index === 7 ? (
                    <Link
                      href="https://www.facebook.com/RevistaEnergiaAndina/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-full flex items-center justify-center"
                    >
                      <Image
                        src={logo || "/placeholder.svg"}
                        alt={`Media Partner ${index + 1}`}
                        width={240}
                        height={120}
                        className="w-auto h-auto max-w-full max-h-full object-contain group-hover:scale-[1.03] transition-transform duration-300"
                      />
                    </Link>
                  ) : (
                    <Image
                      src={logo || "/placeholder.svg"}
                      alt={
                        index === 8
                          ? "AMPP UNI Student Section - Universidad Nacional de Ingeniería"
                          : `Media Partner ${index + 1}`
                      }
                      width={240}
                      height={120}
                      className="w-auto h-auto max-w-full max-h-full object-contain group-hover:scale-[1.03] transition-transform duration-300"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Respaldo Gubernamental */}
        <section
          id="respaldo-gubernamental"
          className="py-12 sm:py-16 bg-slate-50"
        >
          <div className="container mx-auto px-2 sm:px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-blue-700">
                Respaldo Gubernamental
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                El evento cuenta con el respaldo de entidades gubernamentales
                clave del sector energético.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 items-center justify-items-center">
              {[
                "/gob_reg_tumbes.webp",
                "/dir_reg_tumbes.webp",
                "/gorepiura.webp",
              ].map((logo, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg border-2 border-blue-700 shadow-md hover:shadow-lg transition-all duration-300 w-fit max-w-full overflow-hidden group"
                >
                  <Image
                    src={logo}
                    alt={`Respaldo Gubernamental ${index + 1}`}
                    width={480}
                    height={140}
                    className="object-contain group-hover:scale-[1.03] transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Operaciones Offshore en Marcha */}
        <section id="offshore" className="py-12 sm:py-16 bg-slate-50">
          <div className="container mx-auto px-2 sm:px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-amber-700">
                Operaciones Offshore en Marcha
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Descubre cómo se desarrollan las operaciones offshore en las
                regiones Piura y Tumbes y su impacto en la industria petrolera
                nacional.
              </p>
            </div>
            <div className="flex justify-center">
              {/* Contenedor para el primer video */}
              <div className="bg-white rounded-xl shadow-lg border-2 border-amber-500 p-4 max-w-[380px] w-full flex flex-col items-center mr-6">
                <div className="relative w-[270px] h-[480px] rounded-lg overflow-hidden bg-black flex items-center justify-center">
                  <iframe
                    src="op_offshore.webm"
                    title="Operaciones Offshore en Marcha"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </div>
              {/* Contenedor para el segundo video */}
              <div className="bg-white rounded-xl shadow-lg border-2 border-amber-500 p-4 max-w-[380px] w-full flex flex-col items-center">
                <div className="relative w-[270px] h-[480px] rounded-lg overflow-hidden bg-black flex items-center justify-center">
                  <iframe
                    src="op_offshore_2.webm"
                    title="Operaciones Offshore en Marcha 2"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Noticias Petroleras */}
        <section id="noticias-petroleras" className="py-12 sm:py-16">
          <div className="container mx-auto px-2 sm:px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 text-amber-700">
                Noticias Petroleras
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Entérate de los comunicados y novedades más recientes del sector
                petrolero.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <div className="bg-white rounded-xl shadow-lg border-2 border-amber-500 p-4 max-w-xl w-full flex flex-col items-center">
                <Image
                  src="/comunicado_1.webp"
                  alt="Comunicado Petrolero 1"
                  width={600}
                  height={400}
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>
              <div className="bg-white rounded-xl shadow-lg border-2 border-amber-500 p-4 max-w-xl w-full flex flex-col items-center">
                <Image
                  src="/comunicado_2.jpg"
                  alt="Comunicado Petrolero 2"
                  width={600}
                  height={400}
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>
        {/* Footer */}
        <footer className="bg-slate-900 text-white py-12 sm:py-16">
          <div className="container mx-auto px-2 sm:px-4">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Logo y descripción */}
              <div className="lg:col-span-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-amber-400 shadow-md">
                    <Image
                      src="/oil-pump-logo.png"
                      alt="Reactiva-Petrol 2025 Logo"
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <span className="text-xl font-bold tracking-tight">
                    Reactiva-Petrol <span className="text-amber-500">2025</span>
                  </span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  El evento más importante del sector petrolero en
                  Latinoamérica.
                </p>
              </div>

              {/* Enlaces Rápidos */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="#acerca"
                      className="text-gray-300 hover:text-amber-500 transition-colors text-sm"
                    >
                      Acerca del Evento
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#ponentes"
                      className="text-gray-300 hover:text-amber-500 transition-colors text-sm"
                    >
                      Ponentes
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#agenda"
                      className="text-gray-300 hover:text-amber-500 transition-colors text-sm"
                    >
                      Agenda
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#patrocinadores"
                      className="text-gray-300 hover:text-amber-500 transition-colors text-sm"
                    >
                      Patrocinadores
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#inscripcion"
                      className="text-gray-300 hover:text-amber-500 transition-colors text-sm"
                    >
                      Inscripción
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#contacto"
                      className="text-gray-300 hover:text-amber-500 transition-colors text-sm"
                    >
                      Contacto
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Información de contacto */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Contacto</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">
                      Centro de Convenciones, Talara - Perú
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-300 text-sm">933685901</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-300 text-sm">
                      info@reactivapetrol.online
                    </span>
                  </div>
                </div>
              </div>

              {/* Suscripción */}
              {/* <div>
                <h3 className="text-lg font-semibold mb-4">Suscríbete</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Recibe actualizaciones sobre el evento y la industria
                  petrolera.
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Tu correo electrónico"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
                  />
                  <Button className="w-full bg-amber-600 hover:bg-amber-700 text-sm">
                    Enviar
                  </Button>
                </form>
              </div> */}
            </div>

            {/* Copyright */}
            <div className="border-t border-slate-800 mt-12 pt-8">
              <p className="text-center text-gray-400 text-sm">
                © 2025 Reactiva-Petrol 2025. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
