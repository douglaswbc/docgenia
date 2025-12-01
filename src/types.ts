export interface Document {
  id: string;
  title: string;
  specialty: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  status: 'Draft' | 'Final' | 'Review';
}

export interface Specialty {
  id: string;
  name: string;
  description: string;
  icon: string;
  path: string;
}

export interface SubSpecialty {
  id: string;
  name: string;
  description: string;
  icon: string;
}
