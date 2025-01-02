import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getAll, getById, update, remove } from '@/app/services/ordenes-pagos/iso/isoAudService'
import { toast } from 'react-toastify'

export const useIsoAud = () => {
  const [auditorias, setAuditorias] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()

  const fetchAuditorias = async () => {
    try {
      setLoading(true)
      const response = await getAll()
      setAuditorias(response.data)
    } catch (error) {
      setError(error.message)
      toast.error('Error al cargar las auditorías')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (data, isEdit = false) => {
    try {
      setLoading(true)
      if (isEdit) {
        await update(data.id, data)
        toast.success('Auditoría actualizada correctamente')
      } else {
        // Aquí iría la función create cuando se implemente
        toast.success('Auditoría creada correctamente')
      }
      router.push('/iso/auditorias')
    } catch (error) {
      setError(error.message)
      toast.error('Error al procesar la auditoría')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      setLoading(true)
      await remove(id)
      toast.success('Auditoría eliminada correctamente')
      fetchAuditorias()
    } catch (error) {
      setError(error.message)
      toast.error('Error al eliminar la auditoría')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAuditorias()
  }, [])

  return {
    auditorias,
    loading,
    error,
    handleSubmit,
    handleDelete,
    fetchAuditorias
  }
} 