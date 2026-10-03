export type AccountStatus = 'active' | 'inactive';
export interface PatientAccount { id:string; name:string; email:string; phone:string; gender:string; age:number; registered:string; status:AccountStatus; }
export interface DoctorAccount { id:string; name:string; specialization:string; email:string; phone:string; experience:number; registered:string; status:AccountStatus; }

export const initialPatients: PatientAccount[] = [
 {id:'P0001',name:'Rahul Sharma',email:'rahul@gmail.com',phone:'9876543210',gender:'Male',age:28,registered:'01 Oct 2026',status:'active'},
 {id:'P0002',name:'Priya Das',email:'priya@gmail.com',phone:'9123456780',gender:'Female',age:32,registered:'29 Sep 2026',status:'active'},
 {id:'P0003',name:'Amit Roy',email:'amit@gmail.com',phone:'9831122334',gender:'Male',age:45,registered:'28 Sep 2026',status:'active'},
 {id:'P0004',name:'Sneha Gupta',email:'sneha@gmail.com',phone:'7894561230',gender:'Female',age:27,registered:'27 Sep 2026',status:'active'},
 {id:'P0005',name:'Karan Mehta',email:'karan@gmail.com',phone:'9988776655',gender:'Male',age:38,registered:'25 Sep 2026',status:'active'},
];
export const initialDoctors: DoctorAccount[] = [
 {id:'D0001',name:'Dr. Ananya Sen',specialization:'Cardiologist',email:'ananya@gmail.com',phone:'9876543210',experience:8,registered:'01 Oct 2026',status:'active'},
 {id:'D0002',name:'Dr. Rahul Verma',specialization:'General Physician',email:'rahulv@gmail.com',phone:'9123456780',experience:5,registered:'29 Sep 2026',status:'active'},
 {id:'D0003',name:'Dr. Priyanka Das',specialization:'Dermatologist',email:'priyanka@gmail.com',phone:'9831122334',experience:6,registered:'28 Sep 2026',status:'active'},
 {id:'D0004',name:'Dr. Saurabh Roy',specialization:'Orthopedic',email:'saurabh@gmail.com',phone:'7894561230',experience:10,registered:'27 Sep 2026',status:'active'},
 {id:'D0005',name:'Dr. Neha Kapoor',specialization:'Pediatrician',email:'neha@gmail.com',phone:'9988776655',experience:7,registered:'25 Sep 2026',status:'active'},
];
