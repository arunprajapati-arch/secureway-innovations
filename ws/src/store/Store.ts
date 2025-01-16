import prisma from "../db";

interface Student{
    roll: string
    name: string
}

export class Store{
    
     students: Map<string,Student> = new Map();
     static instance:Store;

     private constructor(){
        this.students = new Map();
     }

     static getInstance() {
        if (!this.instance) {
            this.instance = new Store();
        }
        return this.instance;
    }

    

    public verifyStudent(rfId:string){
        return this.students.get(rfId)
        
    }

    public async loadStore(){
        try {
            // Query the database to get all students
            const students = await prisma.student.findMany({
                select: {
                  rfId: true,  // Select only the rfId field
                  rollNo: true,
                  username: true
                }
              });
      
            // Populate the Map with student data (assuming id and name)
            students.forEach((s) => {
                const student: Student = {
                    roll: s.rollNo,
                    name: s.username
                }
              this.students.set(s.rfId, student);
            });
            
            console.log("Loaded students into the store.");
            return true;
            
          } catch (error) {
            
            console.error("Error loading students from the database: ", error);
            return false;
          }
    }

    
}

