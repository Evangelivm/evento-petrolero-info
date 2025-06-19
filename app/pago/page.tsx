"use client"

import type React from "react"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Copy, CheckCircle, AlertCircle, Upload, Building2, Smartphone } from "lucide-react"
import InscriptionHeader from "../components/inscription-header"

export default function PagoPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // Obtener datos de la URL
  const nombre = searchParams.get("nombre") || ""
  const apellido = searchParams.get("apellido") || ""
  const email = searchParams.get("email") || ""
  const tipoPase = searchParams.get("tipoPase") || "completo"

  const [metodoPago, setMetodoPago] = useState<string>("transferencia")
  const [activeTab, setActiveTab] = useState<string>("instrucciones")
  const [copiedText, setCopiedText] = useState<string | null>(null)
  const [fileUploaded, setFileUploaded] = useState<boolean>(false)
  const [fileName, setFileName] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [terminosAceptados, setTerminosAceptados] = useState<boolean>(false)

  // Función para obtener el precio según el tipo de pase
  const getPrecio = () => {
    switch (tipoPase) {
      case "completo":
        return "1,200.00"
      case "ejecutivo":
        return "800.00"
      case "virtual":
        return "350.00"
      default:
        return "0.00"
    }
  }

  // Función para copiar al portapapeles
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(type)
    setTimeout(() => setCopiedText(null), 2000)
  }

  // Función para manejar la subida de archivos
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileUploaded(true)
      setFileName(e.target.files[0].name)
    }
  }

  // Función para procesar el pago
  const handleSubmitPayment = () => {
    if (!terminosAceptados) {
      alert("Debes aceptar los términos y condiciones para continuar.")
      return
    }

    if ((metodoPago === "transferencia" || metodoPago === "yape" || metodoPago === "plin") && !fileUploaded) {
      alert("Debes subir un comprobante de pago para continuar.")
      return
    }

    setIsSubmitting(true)

    // Simulación de procesamiento de pago
    setTimeout(() => {
      // Redirigir a la página de confirmación
      router.push("/inscripciones/confirmacion")
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <InscriptionHeader />

      <main className="flex-1 py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <Link href="/inscripciones" className="text-amber-600 hover:underline flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" />
                Volver a Inscripciones
              </Link>
              <h1 className="text-3xl font-bold mt-4">Realizar Pago</h1>
              <p className="text-gray-600 mt-2">
                Selecciona tu método de pago preferido para completar tu inscripción a PetroSummit 2025.
              </p>
            </div>

            {/* Resumen de la inscripción */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Resumen de la Inscripción</CardTitle>
                <CardDescription>Revisa los detalles de tu inscripción antes de proceder al pago.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Nombre</h3>
                      <p>
                        {nombre} {apellido}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Email</h3>
                      <p>{email}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">
                          {tipoPase === "completo"
                            ? "Pase Completo"
                            : tipoPase === "ejecutivo"
                              ? "Pase Ejecutivo"
                              : "Pase Virtual"}
                        </h3>
                        <p className="text-sm text-gray-600">PetroSummit 2025 - 15-17 de Junio, 2025</p>
                      </div>
                      <p className="font-bold text-xl">${getPrecio()} USD</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Selección de método de pago */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Método de Pago</CardTitle>
                <CardDescription>Selecciona cómo deseas realizar el pago de tu inscripción.</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={metodoPago}
                  onValueChange={(value) => {
                    setMetodoPago(value)
                    setActiveTab("instrucciones")
                    setFileUploaded(false)
                    setFileName("")
                  }}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
                    <RadioGroupItem value="transferencia" id="transferencia" />
                    <Label htmlFor="transferencia" className="flex items-center gap-2 font-normal cursor-pointer">
                      <Building2 className="h-5 w-5 text-amber-600" />
                      Transferencia Bancaria
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
                    <RadioGroupItem value="yape" id="yape" />
                    <Label htmlFor="yape" className="flex items-center gap-2 font-normal cursor-pointer">
                      <Smartphone className="h-5 w-5 text-amber-600" />
                      Yape
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
                    <RadioGroupItem value="plin" id="plin" />
                    <Label htmlFor="plin" className="flex items-center gap-2 font-normal cursor-pointer">
                      <Smartphone className="h-5 w-5 text-amber-600" />
                      Plin
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Detalles del método de pago seleccionado */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>
                  {metodoPago === "transferencia"
                    ? "Transferencia Bancaria"
                    : metodoPago === "yape"
                      ? "Pago con Yape"
                      : "Pago con Plin"}
                </CardTitle>
                <CardDescription>
                  {metodoPago === "transferencia"
                    ? "Realiza una transferencia bancaria y sube el comprobante."
                    : metodoPago === "yape"
                      ? "Escanea el código QR o usa el número de teléfono para pagar con Yape."
                      : "Escanea el código QR o usa el número de teléfono para pagar con Plin."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="w-full grid grid-cols-2">
                    <TabsTrigger value="instrucciones">Instrucciones</TabsTrigger>
                    <TabsTrigger value="comprobante">Subir Comprobante</TabsTrigger>
                  </TabsList>

                  {/* Contenido de Transferencia Bancaria */}
                  {metodoPago === "transferencia" && (
                    <>
                      <TabsContent value="instrucciones" className="p-4 space-y-4">
                        <Alert>
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            Realiza la transferencia por el monto exacto y luego sube el comprobante de pago.
                          </AlertDescription>
                        </Alert>

                        <Card>
                          <CardContent className="pt-6">
                            <h4 className="font-medium mb-2">Datos para Transferencia Bancaria</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between items-center">
                                <span className="text-gray-500">Banco:</span>
                                <div className="flex items-center">
                                  <span className="font-medium">Banco de Crédito del Perú (BCP)</span>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 ml-2"
                                    onClick={() => copyToClipboard("Banco de Crédito del Perú (BCP)", "banco")}
                                  >
                                    {copiedText === "banco" ? (
                                      <CheckCircle className="h-4 w-4 text-green-500" />
                                    ) : (
                                      <Copy className="h-4 w-4" />
                                    )}
                                  </Button>
                                </div>
                              </div>

                              <div className="flex justify-between items-center">
                                <span className="text-gray-500">Titular:</span>
                                <div className="flex items-center">
                                  <span className="font-medium">PetroSummit Eventos S.A.C.</span>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 ml-2"
                                    onClick={() => copyToClipboard("PetroSummit Eventos S.A.C.", "titular")}
                                  >
                                    {copiedText === "titular" ? (
                                      <CheckCircle className="h-4 w-4 text-green-500" />
                                    ) : (
                                      <Copy className="h-4 w-4" />
                                    )}
                                  </Button>
                                </div>
                              </div>

                              <div className="flex justify-between items-center">
                                <span className="text-gray-500">Cuenta Corriente (USD):</span>
                                <div className="flex items-center">
                                  <span className="font-medium">193-2458792-1-25</span>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 ml-2"
                                    onClick={() => copyToClipboard("193-2458792-1-25", "cuenta")}
                                  >
                                    {copiedText === "cuenta" ? (
                                      <CheckCircle className="h-4 w-4 text-green-500" />
                                    ) : (
                                      <Copy className="h-4 w-4" />
                                    )}
                                  </Button>
                                </div>
                              </div>

                              <div className="flex justify-between items-center">
                                <span className="text-gray-500">CCI:</span>
                                <div className="flex items-center">
                                  <span className="font-medium">00219300245879212536</span>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 ml-2"
                                    onClick={() => copyToClipboard("00219300245879212536", "cci")}
                                  >
                                    {copiedText === "cci" ? (
                                      <CheckCircle className="h-4 w-4 text-green-500" />
                                    ) : (
                                      <Copy className="h-4 w-4" />
                                    )}
                                  </Button>
                                </div>
                              </div>

                              <div className="flex justify-between items-center">
                                <span className="text-gray-500">Monto:</span>
                                <div className="flex items-center">
                                  <span className="font-medium">${getPrecio()} USD</span>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 ml-2"
                                    onClick={() => copyToClipboard(`${getPrecio()} USD`, "monto")}
                                  >
                                    {copiedText === "monto" ? (
                                      <CheckCircle className="h-4 w-4 text-green-500" />
                                    ) : (
                                      <Copy className="h-4 w-4" />
                                    )}
                                  </Button>
                                </div>
                              </div>

                              <div className="flex justify-between items-center">
                                <span className="text-gray-500">Concepto:</span>
                                <div className="flex items-center">
                                  <span className="font-medium">
                                    PS2025-{nombre?.substring(0, 3).toUpperCase()}
                                    {apellido?.substring(0, 3).toUpperCase()}
                                  </span>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 ml-2"
                                    onClick={() =>
                                      copyToClipboard(
                                        `PS2025-${nombre?.substring(0, 3).toUpperCase()}${apellido
                                          ?.substring(0, 3)
                                          .toUpperCase()}`,
                                        "concepto",
                                      )
                                    }
                                  >
                                    {copiedText === "concepto" ? (
                                      <CheckCircle className="h-4 w-4 text-green-500" />
                                    ) : (
                                      <Copy className="h-4 w-4" />
                                    )}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <p className="text-sm text-gray-600">
                          Una vez realizada la transferencia, haz clic en "Subir Comprobante" para adjuntar el
                          comprobante de pago.
                        </p>

                        <Button type="button" className="w-full" onClick={() => setActiveTab("comprobante")}>
                          Continuar a Subir Comprobante
                        </Button>
                      </TabsContent>

                      <TabsContent value="comprobante" className="p-4 space-y-4">
                        <Alert>
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            Sube el comprobante de tu transferencia para verificar el pago.
                          </AlertDescription>
                        </Alert>

                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          {fileUploaded ? (
                            <div className="space-y-2">
                              <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
                              <p className="font-medium">¡Comprobante subido correctamente!</p>
                              <p className="text-sm text-gray-500">Archivo: {fileName}</p>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setFileUploaded(false)
                                  setFileName("")
                                }}
                              >
                                Cambiar archivo
                              </Button>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <input
                                type="file"
                                id="comprobante"
                                className="hidden"
                                accept="image/*,.pdf"
                                onChange={handleFileUpload}
                              />
                              <label htmlFor="comprobante" className="cursor-pointer block space-y-2">
                                <div className="mx-auto w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                                  <Upload className="h-6 w-6 text-amber-600" />
                                </div>
                                <p className="font-medium">Haz clic para subir tu comprobante</p>
                                <p className="text-sm text-gray-500">Soporta JPG, PNG o PDF (máx. 5MB)</p>
                              </label>
                            </div>
                          )}
                        </div>

                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setActiveTab("instrucciones")}
                          className="w-full"
                        >
                          Volver a Instrucciones
                        </Button>
                      </TabsContent>
                    </>
                  )}

                  {/* Contenido de Yape */}
                  {metodoPago === "yape" && (
                    <>
                      <TabsContent value="instrucciones" className="p-4 space-y-4">
                        <Alert>
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            Realiza el pago con Yape escaneando el código QR o usando el número de teléfono.
                          </AlertDescription>
                        </Alert>

                        <div className="flex flex-col md:flex-row gap-4 items-center">
                          <div className="flex-1 text-center">
                            <div className="bg-white p-2 border rounded-lg inline-block mb-2">
                              <Image
                                src="/yape-qr.png"
                                alt="Código QR de Yape"
                                width={200}
                                height={200}
                                className="mx-auto"
                              />
                            </div>
                            <p className="text-sm text-gray-600">Escanea este código QR con la app de Yape</p>
                          </div>

                          <div className="flex-1">
                            <Card>
                              <CardContent className="pt-6">
                                <h4 className="font-medium mb-2">Datos para Yape</h4>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between items-center">
                                    <span className="text-gray-500">Nombre:</span>
                                    <div className="flex items-center">
                                      <span className="font-medium">PetroSummit Eventos</span>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 ml-2"
                                        onClick={() => copyToClipboard("PetroSummit Eventos", "nombre-yape")}
                                      >
                                        {copiedText === "nombre-yape" ? (
                                          <CheckCircle className="h-4 w-4 text-green-500" />
                                        ) : (
                                          <Copy className="h-4 w-4" />
                                        )}
                                      </Button>
                                    </div>
                                  </div>

                                  <div className="flex justify-between items-center">
                                    <span className="text-gray-500">Teléfono:</span>
                                    <div className="flex items-center">
                                      <span className="font-medium">+51 987 654 321</span>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 ml-2"
                                        onClick={() => copyToClipboard("+51 987 654 321", "telefono-yape")}
                                      >
                                        {copiedText === "telefono-yape" ? (
                                          <CheckCircle className="h-4 w-4 text-green-500" />
                                        ) : (
                                          <Copy className="h-4 w-4" />
                                        )}
                                      </Button>
                                    </div>
                                  </div>

                                  <div className="flex justify-between items-center">
                                    <span className="text-gray-500">Monto:</span>
                                    <div className="flex items-center">
                                      <span className="font-medium">${getPrecio()} USD</span>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 ml-2"
                                        onClick={() => copyToClipboard(`${getPrecio()} USD`, "monto-yape")}
                                      >
                                        {copiedText === "monto-yape" ? (
                                          <CheckCircle className="h-4 w-4 text-green-500" />
                                        ) : (
                                          <Copy className="h-4 w-4" />
                                        )}
                                      </Button>
                                    </div>
                                  </div>

                                  <div className="flex justify-between items-center">
                                    <span className="text-gray-500">Descripción:</span>
                                    <div className="flex items-center">
                                      <span className="font-medium">
                                        PS2025-{nombre?.substring(0, 3).toUpperCase()}
                                        {apellido?.substring(0, 3).toUpperCase()}
                                      </span>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 ml-2"
                                        onClick={() =>
                                          copyToClipboard(
                                            `PS2025-${nombre?.substring(0, 3).toUpperCase()}${apellido
                                              ?.substring(0, 3)
                                              .toUpperCase()}`,
                                            "desc-yape",
                                          )
                                        }
                                      >
                                        {copiedText === "desc-yape" ? (
                                          <CheckCircle className="h-4 w-4 text-green-500" />
                                        ) : (
                                          <Copy className="h-4 w-4" />
                                        )}
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </div>

                        <p className="text-sm text-gray-600">
                          Una vez realizado el pago, haz clic en "Subir Comprobante" para adjuntar la captura de
                          pantalla del pago.
                        </p>

                        <Button type="button" className="w-full" onClick={() => setActiveTab("comprobante")}>
                          Continuar a Subir Comprobante
                        </Button>
                      </TabsContent>

                      <TabsContent value="comprobante" className="p-4 space-y-4">
                        <Alert>
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            Sube una captura de pantalla de tu pago por Yape para verificar la transacción.
                          </AlertDescription>
                        </Alert>

                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          {fileUploaded ? (
                            <div className="space-y-2">
                              <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
                              <p className="font-medium">¡Comprobante subido correctamente!</p>
                              <p className="text-sm text-gray-500">Archivo: {fileName}</p>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setFileUploaded(false)
                                  setFileName("")
                                }}
                              >
                                Cambiar archivo
                              </Button>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <input
                                type="file"
                                id="comprobante-yape"
                                className="hidden"
                                accept="image/*,.pdf"
                                onChange={handleFileUpload}
                              />
                              <label htmlFor="comprobante-yape" className="cursor-pointer block space-y-2">
                                <div className="mx-auto w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                                  <Upload className="h-6 w-6 text-amber-600" />
                                </div>
                                <p className="font-medium">Haz clic para subir tu comprobante</p>
                                <p className="text-sm text-gray-500">Soporta JPG, PNG o PDF (máx. 5MB)</p>
                              </label>
                            </div>
                          )}
                        </div>

                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setActiveTab("instrucciones")}
                          className="w-full"
                        >
                          Volver a Instrucciones
                        </Button>
                      </TabsContent>
                    </>
                  )}

                  {/* Contenido de Plin */}
                  {metodoPago === "plin" && (
                    <>
                      <TabsContent value="instrucciones" className="p-4 space-y-4">
                        <Alert>
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            Realiza el pago con Plin escaneando el código QR o usando el número de teléfono.
                          </AlertDescription>
                        </Alert>

                        <div className="flex flex-col md:flex-row gap-4 items-center">
                          <div className="flex-1 text-center">
                            <div className="bg-white p-2 border rounded-lg inline-block mb-2">
                              <Image
                                src="/plin-qr.png"
                                alt="Código QR de Plin"
                                width={200}
                                height={200}
                                className="mx-auto"
                              />
                            </div>
                            <p className="text-sm text-gray-600">Escanea este código QR con la app de Plin</p>
                          </div>

                          <div className="flex-1">
                            <Card>
                              <CardContent className="pt-6">
                                <h4 className="font-medium mb-2">Datos para Plin</h4>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between items-center">
                                    <span className="text-gray-500">Nombre:</span>
                                    <div className="flex items-center">
                                      <span className="font-medium">PetroSummit Eventos</span>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 ml-2"
                                        onClick={() => copyToClipboard("PetroSummit Eventos", "nombre-plin")}
                                      >
                                        {copiedText === "nombre-plin" ? (
                                          <CheckCircle className="h-4 w-4 text-green-500" />
                                        ) : (
                                          <Copy className="h-4 w-4" />
                                        )}
                                      </Button>
                                    </div>
                                  </div>

                                  <div className="flex justify-between items-center">
                                    <span className="text-gray-500">Teléfono:</span>
                                    <div className="flex items-center">
                                      <span className="font-medium">+51 912 345 678</span>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 ml-2"
                                        onClick={() => copyToClipboard("+51 912 345 678", "telefono-plin")}
                                      >
                                        {copiedText === "telefono-plin" ? (
                                          <CheckCircle className="h-4 w-4 text-green-500" />
                                        ) : (
                                          <Copy className="h-4 w-4" />
                                        )}
                                      </Button>
                                    </div>
                                  </div>

                                  <div className="flex justify-between items-center">
                                    <span className="text-gray-500">Monto:</span>
                                    <div className="flex items-center">
                                      <span className="font-medium">${getPrecio()} USD</span>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 ml-2"
                                        onClick={() => copyToClipboard(`${getPrecio()} USD`, "monto-plin")}
                                      >
                                        {copiedText === "monto-plin" ? (
                                          <CheckCircle className="h-4 w-4 text-green-500" />
                                        ) : (
                                          <Copy className="h-4 w-4" />
                                        )}
                                      </Button>
                                    </div>
                                  </div>

                                  <div className="flex justify-between items-center">
                                    <span className="text-gray-500">Descripción:</span>
                                    <div className="flex items-center">
                                      <span className="font-medium">
                                        PS2025-{nombre?.substring(0, 3).toUpperCase()}
                                        {apellido?.substring(0, 3).toUpperCase()}
                                      </span>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 ml-2"
                                        onClick={() =>
                                          copyToClipboard(
                                            `PS2025-${nombre?.substring(0, 3).toUpperCase()}${apellido
                                              ?.substring(0, 3)
                                              .toUpperCase()}`,
                                            "desc-plin",
                                          )
                                        }
                                      >
                                        {copiedText === "desc-plin" ? (
                                          <CheckCircle className="h-4 w-4 text-green-500" />
                                        ) : (
                                          <Copy className="h-4 w-4" />
                                        )}
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </div>

                        <p className="text-sm text-gray-600">
                          Una vez realizado el pago, haz clic en "Subir Comprobante" para adjuntar la captura de
                          pantalla del pago.
                        </p>

                        <Button type="button" className="w-full" onClick={() => setActiveTab("comprobante")}>
                          Continuar a Subir Comprobante
                        </Button>
                      </TabsContent>

                      <TabsContent value="comprobante" className="p-4 space-y-4">
                        <Alert>
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            Sube una captura de pantalla de tu pago por Plin para verificar la transacción.
                          </AlertDescription>
                        </Alert>

                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          {fileUploaded ? (
                            <div className="space-y-2">
                              <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
                              <p className="font-medium">¡Comprobante subido correctamente!</p>
                              <p className="text-sm text-gray-500">Archivo: {fileName}</p>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setFileUploaded(false)
                                  setFileName("")
                                }}
                              >
                                Cambiar archivo
                              </Button>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <input
                                type="file"
                                id="comprobante-plin"
                                className="hidden"
                                accept="image/*,.pdf"
                                onChange={handleFileUpload}
                              />
                              <label htmlFor="comprobante-plin" className="cursor-pointer block space-y-2">
                                <div className="mx-auto w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                                  <Upload className="h-6 w-6 text-amber-600" />
                                </div>
                                <p className="font-medium">Haz clic para subir tu comprobante</p>
                                <p className="text-sm text-gray-500">Soporta JPG, PNG o PDF (máx. 5MB)</p>
                              </label>
                            </div>
                          )}
                        </div>

                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setActiveTab("instrucciones")}
                          className="w-full"
                        >
                          Volver a Instrucciones
                        </Button>
                      </TabsContent>
                    </>
                  )}
                </Tabs>
              </CardContent>
            </Card>

            {/* Términos y condiciones */}
            <div className="mb-8 flex items-start space-x-3">
              <Checkbox
                id="terms"
                checked={terminosAceptados}
                onCheckedChange={(checked) => setTerminosAceptados(checked as boolean)}
              />
              <div className="space-y-1 leading-none">
                <Label htmlFor="terms">Acepto los términos y condiciones</Label>
                <p className="text-sm text-gray-500">
                  Al marcar esta casilla, acepto los{" "}
                  <Link href="/terminos" className="text-amber-600 hover:underline">
                    términos y condiciones
                  </Link>{" "}
                  y la{" "}
                  <Link href="/privacidad" className="text-amber-600 hover:underline">
                    política de privacidad
                  </Link>{" "}
                  del evento.
                </p>
              </div>
            </div>

            {/* Botón de finalizar pago */}
            <div className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/inscripciones">Cancelar</Link>
              </Button>
              <Button className="bg-amber-600 hover:bg-amber-700" onClick={handleSubmitPayment} disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Procesando...
                  </span>
                ) : (
                  "Finalizar Pago"
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Simple */}
      <footer className="bg-slate-900 text-white py-6">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Image
                src="/petro-summit-logo.png"
                alt="PetroSummit 2025 Logo"
                width={30}
                height={30}
                className="rounded"
              />
              <span className="text-lg font-bold">
                PetroSummit <span className="text-amber-600">2025</span>
              </span>
            </div>
            <div className="text-center md:text-right text-sm text-gray-400">
              <p>© {new Date().getFullYear()} PetroSummit 2025. Todos los derechos reservados.</p>
              <p className="mt-1">
                <Link href="/" className="hover:text-amber-500">
                  Inicio
                </Link>{" "}
                |
                <Link href="/terminos" className="hover:text-amber-500">
                  {" "}
                  Términos y Condiciones
                </Link>{" "}
                |
                <Link href="/privacidad" className="hover:text-amber-500">
                  {" "}
                  Política de Privacidad
                </Link>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
