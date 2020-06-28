const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const ManagerProfile = require("./templates/ManagerProfile");
const EngineerProfile = require("./templates/EngineerProfile");
const InternProfile = require("./templates/InternProfile");
const TeamProfile = require("./templates/TeamProfile");
const inquirer = require("inquirer");
const http = require("http");
const fs = require("fs");
​
// const OUTPUT_DIR = path.resolve(__dirname, "output")
// const outputPath = path.join(OUTPUT_DIR, "team.html");
// ​
// const render = require("./lib/htmlRenderer");
class App {
    constructor() {
        this.db = {
            manager: null,
            engineers: [],
            interns: [],
        }
    }

    async getEmployeeInfo () {
        console.log("Please enter employee info")
        
        let employeeInfo = 
            await inquirer
            .prompt([
                {
                    type: "input",
                    message: "ID",
                    name: "id"
                },
                {
                    type: "input",
                    message: "Name",
                    name: "name"
                },
                {
                    type: "input",
                    message: "Title: ",
                    name: "title"
                }
            ]);
        
            switch (employeeInfo.title.toLowercase()) {
                case 'manager':
                    employeeInfo = await this.getOfficeNumber(employeeInfo);
                    break;
                case 'engineer':
                    employeeInfo = await this.GithubHandle(employeeInfo);
                    break;
                case 'intern':
                    employeeInfo = await this.getSchoolInfo(employeeInfo);
                    break;
                default:
                    break;
            }
            return employeeInfo;
    }

    async getOfficeNumber(employeeInfo) {
        const managerInfo = 
            await inquirer
                .prompt([
                    {
                        type: "input",
                        message: "Office Number:"   ,
                        name: "officeNumber"                 
                    }
                ])

        employeeInfo.officeNumber = await managerInfo.officeNumber;

        return employeeInfo;
    }

    async getGithubHandle(employeeInfo) {
        let engeerInfo =
            await inquirer  
                .prompt([
                    {
                        type: "input",
                        message: "Github Handle",
                        name: "github"
                    }
                ]);
            
        employeeInfo.github = await engineerInfo.github;

        return employeeInfo;
    }

    async getSchoolInfo(employeeInfo) {
        let internInfo =
            await inquirer  
                .prompt([
                    {
                        type: "input",
                        message: "School",
                        name: "school"
                    }
                ]);
        
        employeeInfo.school = internInfo.school;

        return employeeInfo;
    }
     
    createEmployee(employeeInfo) {
        let employee;
        const { id, name, email } = employeeInfo;
        switch (employeeInfo.title.toLowercase()) {
            case 'manager': 
                const manager = new Manager (name, id, email, employeeInfo.officeNumber);
                employee = manager;
                break;
            case 'engineer':
                const engineer = new Engineer (name, id, email, employeeInfo.github);
                employee = engineer;
                break;
            case 'intern':
                const intern = new Intern (name, id, email, employeeInfo.school);
                employee= intern;
                break;
            default:
                break;
        }

        return employee;
    }

    saveEmployeeToDb(employee) {
        switch (employee.getRole().toLowercase()) {
            case 'manager':
                this.db.manager = employee;
                break;
            case 'engineer':
                this.db.engineers.push(employee);
                break;
            case 'intern':
                this.db.interns.push(employee);
                break;
            default:
                break;
        }
    }

    createTeamRoster() {

        let managerProfile = '';
        let engineers = '';
        let interns = '';

        if (this.db.manager) {
            managerProfile = new ManagerProfile(this.db.manager);
            managerProfile = mamagerProfile.createProfile();
        }

        if (this.db.engineers) {
            for (const engineer of this.db.engineers) {
                let engineerProfile = new EngineerProfile(engineer);
                engineerProfile = engineerProfile.createProfile();

                engineers += engineerProfile;
            }
        }

        if (this.db.interns) {
            for (const intern of this.db.interns) {
                let internProfile = new InternProfile(intern);
                internProfile = internProfile.createProfile();

                interns += internProfile;
            }
        }

        const team = managerProfile + engineers + interns;

        let teamProfile = new TeamProfile(team);
        teamProfile = teamProfile.createTeamProfile();

        return teamProfile;
    }

    createServer(teamProfile) {

    fs.writeFile('./public/team.html', teamProfile, function (err) {
        if (err) throw err;
        console.log("saved");
    });

    http.createServer(function (req, res) {
        fs.readFile('./public/team.html', function(err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        });
    }).listen(8080);
}

async init() {
    let input = '';
    do {
        const employee = this.createEmployee(await this.getEmployeeInfo());
        this.saveEmployeeToDb(employee);

        input = 
            await inquirer  
                .prompt([
                    {
                        type: "input",
                        message: "type yes to exit",
                        name: "exit"
                    }
                ]);
    } while (!input.exit);

    const teamProfile = this.createTeamProfile();

    this.createServer(teamProfile);
}

}

const app = new App();

app.init();

// ​function runInquirer() {
//     const promptArray = [{
//         type: "input",
//         message: "what is your name?",
//         name: "name"
//     }, {
//         type: "input",
//         message: "What is your id?",
//         name: "id"
//     }, {
//         type: "input",
//         message: "What is your email?",
//         name: "email"
//     }, {
//         type: "list",
//         message: "What is your title?",
//         choices: ["Manager", "Engineer", "Intern"],
//         name: "title"
//     }];
//     return inquirer
//         .prompt(promptArray);
// }

// function runInquirerManager() {
//     const promptArray = [{
//             type: "input",
//             message: "What is your office number?",
//             name: "office number"
//     }];
//     return inquirer
//         .prompt(promptArray);
// }
// ​
// function runInquirerEngineer() {
//     const promptArray = [{
//         type: "input",
//         message: "What is your github?",
//         name: "github"
//     }];
//     return inquirer
//         .prompt(promptArray);
// }

// function runInquirerIntern() {
//     const promptArray = [{
//         type: "input",
//         message: "What school do you go to?",
//         name: "school"
//     }];
//     return inquirer
//         .prompt(promptArray);
// }

// async function run() {
//     let employeeArray = [];
//     const maxTimes = 4;
//     for (i = 0, i < maxTimes; i++) {
//         const promise = new Promise((resolve, reject) => {
//             runInquirer()
//                 .then(function({ name, id, email, title }) {

//                     if (title === "Manager") {
//                         runInquirerManager.then(function(officeNumber) {
//                             this.employee = new Engineer(name, id, email, officeNumber);
//                             console.log(officeNumber);
//                             employeeArray.push(employee);
//                             resolve("complete");
//                         });

//                     } else if (title === "Engineer") {
//                         runInquirerEngineer.then(function({ github }) {
//                             this.employee = new Manager(name, id, email, github);
//                             console.log(github);
//                             employeeArray.push(employee);
//                             resolve("complete");
//                         });
                    
//                     } else if (title === "Intern") {
//                         runInquirerIntern.then(function({ school }) {
//                             this.employee = new Manager(name, id, email, school);
//                             console.log(school);
//                             employeeArray.push(employee);
//                             resolve("complete");
//                         });
//                     }
//                 }).catch(function(err) {
//                     console.log("There was an error");
//                     console.log(err);
//                 });
//         });

//         const result = await promise;
//         console.log(result);
//     }

//     let html = `<!DOCTYPE html>
//     <html lang="en">`
// }

