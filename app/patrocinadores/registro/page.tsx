import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Building, CheckCircle } from "lucide-react"

export default function PatrocinadoresRegistro() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b py-4">
        <div className="container flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-amber-400 shadow-sm">
              <Image
                src="/oil-pump-logo.png"
                alt="Reactiva-Petrol 2025 Logo"
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Reactiva-Petrol <span className="text-amber-600">2025</span>
            </span>
          </Link>
          <Link href="/" className="text-sm text-gray-600 hover:text-amber-600 flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>
        </div>
      </header>

      <main className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-3">Programa de Patrocinadores</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Forme parte del evento más importante del sector petrolero en la Región Piura y conecte con los
              principales actores de la industria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                title: "Platino",
                price: "$5,000 USD",
                features: [
                  "Stand premium (6x4m)",
                  "Logo destacado en todos los materiales",
                  "6 pases completos al evento",
                  "Presentación de 30 minutos",
                  "Mención en ceremonias de apertura y clausura",
                  "Entrevista exclusiva para redes sociales",
                  "Base de datos de asistentes (con autorización)",
                ],
              },
              {
                title: "Oro",
                price: "$3,000 USD",
                features: [
                  "Stand estándar (4x3m)",
                  "Logo en materiales impresos y digitales",
                  "4 pases completos al evento",
                  "Presentación de 15 minutos",
                  "Mención en ceremonia de apertura",
                  "Publicación en redes sociales",
                ],
              },
              {
                title: "Plata",
                price: "$1,500 USD",
                features: [
                  "Espacio para banner y material promocional",
                  "Logo en página web y programa digital",
                  "2 pases completos al evento",
                  "Mención en redes sociales",
                ],
              },
            ].map((plan, index) => (
              <Card key={index} className={index === 0 ? "border-amber-400 shadow-lg" : ""}>
                <CardHeader className={index === 0 ? "bg-amber-50" : ""}>
                  <CardTitle className="text-xl font-bold">{plan.title}</CardTitle>
                  <CardDescription className="text-2xl font-bold text-amber-600 mt-2">{plan.price}</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className={index === 0 ? "w-full bg-amber-600 hover:bg-amber-700" : "w-full"}>
                    Seleccionar
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl">Formulario de Solicitud de Patrocinio</CardTitle>
              <CardDescription>
                Complete el siguiente formulario y nuestro equipo se pondrá en contacto con usted para discutir los
                detalles.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company">Nombre de la Empresa</Label>
                      <div className="relative">
                        <div className="absolute left-3 top-3 text-gray-400">
                          <Building className="h-5 w-5" />
                        </div>
                        <Input id="company" placeholder="Nombre de su empresa" className="pl-10" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Sitio Web</Label>
                      <Input id="website" placeholder="https://www.ejemplo.com" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contactName">Nombre de Contacto</Label>
                      <Input id="contactName" placeholder="Nombre completo" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position">Cargo</Label>
                      <Input id="position" placeholder="Su cargo en la empresa" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Correo Electrónico</Label>
                      <Input id="email" type="email" placeholder="correo@empresa.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input id="phone" placeholder="+51 123 456 789" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sponsorshipLevel">Nivel de Patrocinio de Interés</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un nivel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="platinum">Platino - $5,000 USD</SelectItem>
                        <SelectItem value="gold">Oro - $3,000 USD</SelectItem>
                        <SelectItem value="silver">Plata - $1,500 USD</SelectItem>
                        <SelectItem value="custom">Personalizado / Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Mensaje o Requerimientos Especiales</Label>
                    <Textarea
                      id="message"
                      placeholder="Indique cualquier requerimiento especial o pregunta que tenga sobre el patrocinio"
                      rows={4}
                    />
                  </div>

                  <div className="flex items-start space-x-2 pt-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms" className="text-sm leading-tight">
                      Acepto recibir información sobre el evento y entiendo que mis datos serán tratados de acuerdo con
                      la política de privacidad.
                    </Label>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end gap-4">
              <Button variant="outline">Cancelar</Button>
              <Button className="bg-amber-600 hover:bg-amber-700">Enviar Solicitud</Button>
            </CardFooter>
          </Card>

          <div className="mt-12 bg-amber-50 p-6 rounded-lg border border-amber-200">
            <h2 className="text-xl font-bold mb-4">¿Tiene preguntas sobre el patrocinio?</h2>
            <p className="mb-4">
              Nuestro equipo está disponible para responder cualquier pregunta que pueda tener sobre las oportunidades
              de patrocinio para Reactiva-Petrol 2025.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <div className="flex items-center gap-2">
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
                  className="h-5 w-5 text-amber-600"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span>+51 123 456 789</span>
              </div>
              <div className="flex items-center gap-2">
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
                  className="h-5 w-5 text-amber-600"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                <span>patrocinios@reactivapetrol.com</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
