class TeamProfile {
    constructor(team) {
        this.team = team;

        this.html =
            `
            <!DOCTYPE html>
            <html lang="en">
            
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
                <link rel="stylesheet" href="style.css">
                <script src="https://kit.fontawesome.com/c502137733.js"></script>
                <title>My Team</title>
            
            </head>
            
            <body>
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-12 jumbotron mb-3 bg-danger text-white team-heading">
                            <h1 class="text-center">My Team</h1>
                        </div>
                    </div>
                </div>
                <div class="container">
                    <div class="row">
                    ${this.team}
                    </div>
                </div>
                <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
            </body>
            
            </html> 
        `;
    }

    createTeamProfile() {
        return this.html;
    }
}

module.exports = TeamProfile