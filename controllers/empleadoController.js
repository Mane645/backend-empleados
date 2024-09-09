import empleadoRepository from "../repositories/empleadoRepository.js";
import authService from "../services/authService.js";

const empleadoController = {
    createEmpleado: async (req, res) => {
        try {
            const empleado = req.body
            empleado.contrasena = authService.hashPassword(empleado.contrasena)
            const created = await empleadoRepository.createEmpleado(empleado)
            const id = created.id
            res.status(201).json({
                success: true,
                id
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    },
    loginEmpleado: async (req, res) => {
        try {
            const { correo, contrasena } = req.body
            const existsCorreo = await empleadoRepository.getEmpleadoByCorreo(correo)
            if (!existsCorreo){
                return res.status(500).json({
                    success: false,
                    message: 'Empleado no existe'
                })
            }
            const empleado = existsCorreo.data()
            if (!authService.comparePassword(contrasena, empleado.contrasena)){
                return res.status(500).json({
                    success: false,
                    message: 'Contrasena invalida'
                })
            }
            const token = authService.generateToken(empleado)
            res.status(201).json({
                token
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    },
    obtenerEmpleados: async (req, res) => {
        try {
            const empleadosDocs = await empleadoRepository.obtenerEmpleados()
            if (empleadosDocs.length === 0) {
                res.status(404).json({
                    success: false,
                    message: 'No hay empleados'
                })
            }

            const empleados = empleadosDocs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))

            return res.status(201).json({
                success: true,
                message: empleados
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
}

export default empleadoController