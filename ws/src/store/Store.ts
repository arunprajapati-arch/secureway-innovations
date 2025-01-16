import prisma from "../db";
export class Store{
    
     students: Map<string,string> = new Map();
     static instance:Store;

     private constructor(){
        this.students = new Map();
        // load from db 
     }

     static getInstance() {
        if (!this.instance) {
            this.instance = new Store();
        }
        return this.instance;
    }

    

    public verifyStudent(rfId:string):boolean{
        if (this.students.has(rfId)) {
            return true;
        }
        // if (!this.students.has(rfId)) {
        //     // check in db if found append to store and return true 
            
        // }
        return false
    }

    public async loadStore(){
        try {
            // Query the database to get all students
            const students = await prisma.student.findMany({
                select: {
                  rfId: true,  // Select only the rfId field
                  rollNo: true // Select only the rollNo field
                }
              });
      
            // Populate the Map with student data (assuming id and name)
            students.forEach((student) => {
              this.students.set(student.rfId, student.rollNo);
            });
      
            console.log("Loaded students into the store.");
            
          } catch (error) {
            console.error("Error loading students from the database: ", error);
          }
    }

    
}

