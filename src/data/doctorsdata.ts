export interface SettlementData {
  doctorEmail: string;
  doctorId: string;
  doctorName: string;
  doctorImage: string;
  doctorCbu: string; 
  doctorAlias: string;
  totalAppointments: number; 
  totalGross: number; 
  platformFee: number; 
  netAmount: number; 
  status: 'PENDING' | 'PAID';
  lastPaymentDate?: string;
}


// --- MOCK DATA ---
export const MOCK_SETTLEMENTS: SettlementData[] = [
  {
    doctorId: '1', doctorName: 'Dr. Gregory House', doctorImage: '', doctorAlias: 'HOUSE.MEDICINA.MP', totalAppointments: 12, totalGross: 120000, platformFee: 24000, netAmount: 96000, status: 'PENDING', lastPaymentDate: '10/11/2023',
    doctorCbu: '21321414',
    doctorEmail: ''
  },
  {
    doctorId: '2', doctorName: 'Dra. Meredith Grey', doctorImage: '', doctorAlias: 'MEREDITH.GREY.GAL', totalAppointments: 8, totalGross: 80000, platformFee: 16000, netAmount: 64000, status: 'PENDING', lastPaymentDate: '10/11/2023',
    doctorCbu: '545234523',
    doctorEmail: ''
  },
  {
    doctorId: '3', doctorName: 'Dr. Strange', doctorImage: '', doctorAlias: 'STRANGE.NEURO.CAP', totalAppointments: 20, totalGross: 200000, platformFee: 40000, netAmount: 160000, status: 'PAID', lastPaymentDate: '17/11/2023',
    doctorCbu: '325445',
    doctorEmail: ''
  },
  {
    doctorId: '4', doctorName: 'Dra. Cristina Yang', doctorImage: '', doctorAlias: 'YANG.CARDIO.SEA', totalAppointments: 15, totalGross: 150000, platformFee: 30000, netAmount: 120000, status: 'PENDING', lastPaymentDate: '03/11/2023',
    doctorCbu: '23523542354',
    doctorEmail: ''
  },
  {
    doctorId: '5', doctorName: 'Dr. House Junior', doctorImage: '', doctorAlias: 'HOUSEJR.PEDIATRIA', totalAppointments: 5, totalGross: 50000, platformFee: 10000, netAmount: 40000, status: 'PAID', lastPaymentDate: '01/11/2023',
    doctorCbu: '453542354',
    doctorEmail: ''
  },
];