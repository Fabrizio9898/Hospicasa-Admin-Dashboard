import axios from "axios";
import { ErrorHelper, verifyError } from "../../helpers/error/error.helper";
import { patientSchema, PatientType } from "../../types/patient.type";
import api from "../api";

export const getPatientById = async (id: string): Promise<PatientType> => {
  try {
    const { data } = await api.get(`/admin/patient/${id}`);
    return patientSchema.parse(data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = error.response.data.message || "Error desconocido";

      throw new ErrorHelper(
        verifyError(errorMessage),
        error.response.status.toString()
      );
    }

    throw error;
  }
};
