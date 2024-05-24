
import inquirer from "inquirer";

class Student {
    static counter = 10000;

    id: number;
    name: string;
    courses: string[];
    balance: number;

    constructor(name: string) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 100;
    }

    // Method to enroll a student in a class
    enrollCourse(course: string) {
        this.courses.push(course);
    }

    // Method to view a student balance
    viewBalance() {
        console.log(`Balance for ${this.name}: ${this.balance}`);
    }

    // Method to pay student fee
    payFees(amount: number) {
        this.balance -= amount;
        console.log(`$${amount} fees paid successfully for ${this.name}`);
    }

    // Method to display student status
    showStatus() {
        console.log(`ID: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Courses: ${this.courses}`);
        console.log(`Balance: ${this.balance}`);
    }
}

// Defining a student manager class to manage students
class StudentManager {
    students: Student[];

    constructor() {
        this.students = [];
    }

    // Method to add a new student
    addStudent(name: string) {
        let student = new Student(name);
        this.students.push(student);
        console.log(`Student: ${name} added successfully. Student ID: ${student.id}`);
    }

    // Method to enroll a student in a course
    enrollStudent(studentId: number, course: string) {
        let student = this.findStudent(studentId);
        if (student) {
            student.enrollCourse(course);
            console.log(`${student.name} enrolled in ${course} successfully.`);
        } else {
            console.log("Student not found. Please enter a correct student ID.");
        }
    }

    // Method to view a student balance
    viewStudentBalance(studentId: number) {
        let student = this.findStudent(studentId);
        if (student) {
            student.viewBalance();
        } else {
            console.log("Student not found. Please enter a correct student ID.");
        }
    }

    // Method to pay student fee
    payStudentFee(studentId: number, amount: number) {
        let student = this.findStudent(studentId);
        if (student) {
            student.payFees(amount);
        } else {
            console.log("Student not found. Please enter a correct student ID.");
        }
    }

    // Method to display student status
    showStudentStatus(studentId: number) {
        let student = this.findStudent(studentId);
        if (student) {
            student.showStatus();
        } else {
            console.log("Student not found. Please enter a correct student ID.");
        }
    }

    // Method to find a student by student ID
    findStudent(studentId: number) {
        return this.students.find(std => std.id === studentId);
    }
}

// Main function to run the program
async function main() {
    console.log("Welcome to CodewithMomina - Student Management System");
    console.log("-".repeat(60));

    let studentManager = new StudentManager();

    // While loop to keep program running
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an option",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fees",
                    "Show Status",
                    "Exit"
                ]
            }
        ]);

        // Using switch case for user choice
        switch (choice.choice) {
            case "Add Student":
                let nameInput = await inquirer.prompt([
                    {
                        name: 'name',
                        type: "input",
                        message: "Enter student name"
                    }
                ]);
                studentManager.addStudent(nameInput.name);
                break;

            case "Enroll Student":
                let courseInput = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: 'number',
                        message: "Enter Student ID"
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter Course Name"
                    }
                ]);
                studentManager.enrollStudent(courseInput.student_id, courseInput.course);
                break;

            case "View Student Balance":
                let balanceInput = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter Student ID"
                    }
                ]);
                studentManager.viewStudentBalance(balanceInput.student_id);
                break;

            case "Pay Fees":
                let feesInput = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter Student ID"
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to pay"
                    }
                ]);
                studentManager.payStudentFee(feesInput.student_id, feesInput.amount);
                break;

            case "Show Status":
                let statusInput = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter Student ID"
                    }
                ]);
                studentManager.showStudentStatus(statusInput.student_id);
                break;

            case "Exit":
                console.log("Exiting...");
                process.exit();
        }
    }
}

main();
