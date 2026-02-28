//handler para verificar el estado de la función (lambda) eb producción, esto es útil para monitoreo y para verificar que la función esté desplegada correctamente.
export const handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      status: "ok"
    })
  }
}