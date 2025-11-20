import { useState } from 'react';
import { 
  Box, Button, Grid, Typography, InputBase, IconButton 
} from '@mui/material';
import { Add, Search } from '@mui/icons-material';
import Header from '../../components/Header';
// import { CreateSpecialityModal } from '../../components/CreateSpecialityModal.component';
import { DoctorSpeciality, SpecialityUI } from '../../types/doctorSpeciality.type';
import { SpecialityCard } from '../../components/SpecialityCard';
import { ModalView } from '../../components/Modal';
import { CreateSpeciality } from '../../components/CreateSpecialityForm';


// --- MOCK DATA INICIAL ---
const INITIAL_DATA: SpecialityUI[] = [
    { id: '1', name: 'Cardiología', description: 'Enfermedades del corazón y sistema circulatorio.', doctorCount: 5, createdAt: new Date() },
    { id: '2', name: 'Pediatría', description: 'Atención médica de bebés, niños y adolescentes.', doctorCount: 12, createdAt: new Date() },
    { id: '3', name: 'Neurología', description: 'Trastornos del sistema nervioso.', doctorCount: 1, createdAt: new Date() }, // Alerta baja cobertura
];

export const Specialities = () => {
    
    // Estado local para la lista (Simulando DB)
    const [specialities, setSpecialities] = useState<SpecialityUI[]>(INITIAL_DATA);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Handler para crear (Optimistic UI Local)
    const handleCreate = (newSpec: DoctorSpeciality) => {
        const newItem: SpecialityUI = {
            ...newSpec,
            doctorCount: 0, // Empieza sin doctores
            createdAt: new Date()
        };
        setSpecialities([...specialities, newItem]);
    };

    // Filtrado simple
    const filteredData = specialities.filter(s => 
        s.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Box m="20px">
            {/* HEADER & ACTIONS */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4} flexWrap="wrap" gap={2}>
                <Header title="ESPECIALIDADES" subtitle="Gestión del catálogo médico" />
                
                <Box display="flex" gap={2}>
                    {/* BARRA BUSQUEDA */}
                    <Box 
                        display="flex" 
                        bgcolor="background.paper" 
                        borderRadius="8px"
                        height="40px"
                        px={2}
                        alignItems="center"
                        border="1px solid"
                        borderColor="divider"
                    >
                        <InputBase 
                            placeholder="Buscar..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            sx={{ color: 'text.primary' }}
                        />
                        <IconButton type="button" sx={{ p: 1 }}>
                            <Search />
                        </IconButton>
                    </Box>

                    <Button 
                        variant="contained" 
                        color="secondary" 
                        startIcon={<Add />}
                        onClick={() => setIsModalOpen(true)}
                    >
                        Nueva Especialidad
                    </Button>
                </Box>
            </Box>

            {/* GRID DE ESPECIALIDADES */}
            <Grid container spacing={3}>
                {filteredData.map((spec) => (
                    <SpecialityCard key={spec.id} data={spec} />
                ))}
                
                {filteredData.length === 0 && (
                     <Grid size={{ xs: 12 }}>
                        <Typography variant="h6" color="text.secondary" textAlign="center" mt={4}>
                            No se encontraron especialidades.
                        </Typography>
                     </Grid>
                )}
            </Grid>

          <ModalView
    isOpen={isModalOpen} 
    onClose={() => setIsModalOpen(false)}
>
    <CreateSpeciality
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreate}
    />
</ModalView>

        </Box>
    );
};